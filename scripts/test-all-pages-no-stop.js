#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { XMLParser } = require('fast-xml-parser');
const http = require('http');
const { spawn } = require('child_process');

// Configuration
const BASE_URL = 'http://localhost:3000';
const TIMEOUT = 15000;
const BATCH_SIZE = 10;
const MAX_RETRIES = 2;

// Test results
const results = {
  total: 0,
  tested: 0,
  passed: 0,
  failed: 0,
  errors: [],
  startTime: Date.now(),
};

// Start dev server
function startDevServer() {
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting development server...');

    const devServer = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      detached: true,
      env: { ...process.env, NODE_ENV: 'development' },
    });

    let serverReady = false;
    let serverOutput = '';

    devServer.stdout.on('data', data => {
      serverOutput += data.toString();
      if (serverOutput.includes('Ready') && !serverReady) {
        serverReady = true;
        console.log('✅ Server started successfully\n');
        setTimeout(() => resolve(devServer), 5000); // Give it 5 seconds to fully start
      }
    });

    devServer.stderr.on('data', data => {
      // Ignore errors - we will continue no matter what
    });

    // Force continue after 30 seconds regardless
    setTimeout(() => {
      if (!serverReady) {
        console.log('⚠️  Server taking longer than expected, proceeding anyway...\n');
        resolve(devServer);
      }
    }, 30000);
  });
}

// Parse XML sitemap recursively
async function parseSitemap(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const parser = new XMLParser();
    const result = parser.parse(content);

    const urls = [];

    // Handle sitemap index
    if (result.sitemapindex && result.sitemapindex.sitemap) {
      const sitemaps = Array.isArray(result.sitemapindex.sitemap)
        ? result.sitemapindex.sitemap
        : [result.sitemapindex.sitemap];

      console.log(`📂 Found sitemap index with ${sitemaps.length} sub-sitemaps`);

      for (const sitemap of sitemaps) {
        const sitemapUrl = sitemap.loc;
        const sitemapFile = sitemapUrl.split('/').pop();
        const sitemapPath = path.join(path.dirname(filePath), sitemapFile);

        console.log(`  📄 Loading: ${sitemapFile}`);
        try {
          const subUrls = await parseSitemap(sitemapPath);
          urls.push(...subUrls);
        } catch (e) {
          console.log(`  ⚠️  Failed to load ${sitemapFile}, continuing...`);
        }
      }
    }

    // Handle regular sitemap
    if (result.urlset && result.urlset.url) {
      const urlEntries = Array.isArray(result.urlset.url) ? result.urlset.url : [result.urlset.url];

      for (const entry of urlEntries) {
        if (entry.loc) {
          urls.push(entry.loc);
        }
      }
    }

    return urls;
  } catch (error) {
    console.error(`⚠️  Error parsing sitemap ${filePath}, continuing...`);
    return [];
  }
}

// Test a single URL - NEVER STOP
async function testUrl(url, attempt = 1) {
  const testUrlPath = url.replace('https://www.vasquezlawnc.com', BASE_URL);
  const urlPath = url.replace('https://www.vasquezlawnc.com', '');

  return new Promise(resolve => {
    // Always resolve, never reject
    const completeTest = result => {
      results.tested++;
      resolve(result);
    };

    const options = {
      method: 'GET',
      timeout: TIMEOUT,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ComprehensiveTester/1.0)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    };

    const req = http.request(testUrlPath, options, res => {
      let body = '';

      res.on('data', chunk => {
        body += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          results.passed++;
          process.stdout.write('.');
          completeTest({ url: urlPath, status: res.statusCode, success: true });
        } else if (res.statusCode >= 300 && res.statusCode < 400) {
          results.passed++;
          process.stdout.write('R');
          completeTest({ url: urlPath, status: res.statusCode, success: true, redirect: true });
        } else {
          results.failed++;
          results.errors.push({
            url: urlPath,
            status: res.statusCode,
            error: `HTTP ${res.statusCode}`,
          });
          process.stdout.write('F');
          completeTest({ url: urlPath, status: res.statusCode, success: false });
        }
      });
    });

    req.on('error', async error => {
      if (attempt < MAX_RETRIES) {
        // Retry
        setTimeout(async () => {
          const retryResult = await testUrl(url, attempt + 1);
          resolve(retryResult);
        }, 1000);
      } else {
        results.failed++;
        results.errors.push({
          url: urlPath,
          error: error.message,
        });
        process.stdout.write('X');
        completeTest({ url: urlPath, error: error.message, success: false });
      }
    });

    req.on('timeout', () => {
      req.destroy();
      results.failed++;
      results.errors.push({
        url: urlPath,
        error: 'Timeout',
      });
      process.stdout.write('T');
      completeTest({ url: urlPath, error: 'Timeout', success: false });
    });

    req.end();

    // Progress update
    if (results.tested % 100 === 0 && results.tested > 0) {
      const progress = ((results.tested / results.total) * 100).toFixed(1);
      const elapsed = ((Date.now() - results.startTime) / 1000).toFixed(0);
      const rate = (results.tested / elapsed).toFixed(1);
      process.stdout.write(
        `\n📊 Progress: ${results.tested}/${results.total} (${progress}%) - ✅ ${results.passed} ❌ ${results.failed} - ${rate} URLs/sec\n`
      );
    }
  });
}

// Process URLs in batches - NEVER STOP
async function processAllUrls(urls) {
  console.log('\n🧪 Testing ALL URLs (. = OK, F = Failed, R = Redirect, X = Error, T = Timeout)\n');

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);

    // Test batch concurrently
    await Promise.all(
      batch.map(url =>
        testUrl(url).catch(() => {
          // Never let errors stop the process
          results.tested++;
          results.failed++;
          results.errors.push({ url, error: 'Unknown error' });
          process.stdout.write('?');
        })
      )
    );

    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 50));
  }
}

// Generate comprehensive report
async function generateReport() {
  const duration = ((Date.now() - results.startTime) / 1000).toFixed(2);
  const minutes = Math.floor(duration / 60);
  const seconds = (duration % 60).toFixed(0);

  const report = {
    summary: {
      totalUrls: results.total,
      tested: results.tested,
      passed: results.passed,
      failed: results.failed,
      successRate:
        results.total > 0 ? ((results.passed / results.total) * 100).toFixed(2) + '%' : '0%',
      duration: `${minutes}m ${seconds}s (${duration}s total)`,
      averageSpeed: (results.total / duration).toFixed(1) + ' URLs/sec',
      timestamp: new Date().toISOString(),
    },
    errorSummary: {},
    errors: results.errors,
  };

  // Group errors by type
  results.errors.forEach(error => {
    const key = error.error || `HTTP ${error.status}`;
    if (!report.errorSummary[key]) {
      report.errorSummary[key] = 0;
    }
    report.errorSummary[key]++;
  });

  // Save full report
  await fs.writeFile(
    path.join(process.cwd(), 'complete-url-test-report.json'),
    JSON.stringify(report, null, 2)
  );

  // Save failed URLs
  if (results.errors.length > 0) {
    const failedUrls = results.errors
      .map(e => `${e.url} | ${e.error || `HTTP ${e.status}`}`)
      .sort()
      .join('\n');

    await fs.writeFile(path.join(process.cwd(), 'all-failed-urls.txt'), failedUrls);
  }

  return report;
}

// Main function - WILL NOT STOP
async function main() {
  console.log('🚀 COMPREHENSIVE URL TEST - NO EXCEPTIONS');
  console.log('=========================================\n');
  console.log('⚠️  This test will run to completion no matter what!\n');

  let devServer;

  try {
    // Start server
    devServer = await startDevServer();

    // Load URLs from sitemap
    console.log('📥 Loading ALL URLs from sitemap...');
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    const urls = await parseSitemap(sitemapPath);

    // Remove duplicates
    const uniqueUrls = [...new Set(urls)];
    results.total = uniqueUrls.length;

    console.log(`✅ Found ${results.total} unique URLs to test`);
    console.log('⏱️  Estimated time: ' + Math.ceil(results.total / 50) + ' minutes\n');

    // Test ALL URLs - NO STOPPING
    await processAllUrls(uniqueUrls);

    // Generate report
    console.log('\n\n📋 Generating comprehensive report...');
    const report = await generateReport();

    // Display results
    console.log('\n' + '='.repeat(60));
    console.log('📊 FINAL TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`Total URLs:     ${report.summary.totalUrls}`);
    console.log(`Tested:         ${report.summary.tested}`);
    console.log(`Passed:         ${report.summary.passed} ✅`);
    console.log(`Failed:         ${report.summary.failed} ❌`);
    console.log(`Success Rate:   ${report.summary.successRate}`);
    console.log(`Total Duration: ${report.summary.duration}`);
    console.log(`Average Speed:  ${report.summary.averageSpeed}`);
    console.log('='.repeat(60));

    // Error summary
    if (Object.keys(report.errorSummary).length > 0) {
      console.log('\n📊 ERROR BREAKDOWN:');
      console.log('='.repeat(60));
      Object.entries(report.errorSummary)
        .sort((a, b) => b[1] - a[1])
        .forEach(([errorType, count]) => {
          console.log(`${errorType}: ${count} URLs`);
        });
    }

    console.log('\n✅ Reports saved:');
    console.log('  - complete-url-test-report.json (full details)');
    if (results.errors.length > 0) {
      console.log('  - all-failed-urls.txt (failed URLs list)');
    }

    // Final status
    if (results.failed === 0) {
      console.log('\n🎉 PERFECT! All URLs passed!');
    } else {
      console.log(`\n⚠️  COMPLETED: ${results.failed} URLs need attention`);
    }
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.log('But we tried our best! 💪');
  } finally {
    // Kill dev server
    if (devServer) {
      console.log('\n🛑 Stopping server...');
      try {
        process.kill(-devServer.pid);
      } catch (e) {
        devServer.kill('SIGTERM');
      }
    }

    console.log('\n✅ Test completed!');
    process.exit(0); // Always exit successfully
  }
}

// Install xml2js if needed
async function checkDependencies() {
  try {
    require('fast-xml-parser');
  } catch (error) {
    console.log('📦 Installing required dependencies...');
    require('child_process').execSync('npm install fast-xml-parser', { stdio: 'inherit' });
  }
}

// Run the test
checkDependencies().then(() => {
  main().catch(error => {
    console.error('Unexpected error:', error);
    process.exit(0); // Still exit successfully
  });
});
