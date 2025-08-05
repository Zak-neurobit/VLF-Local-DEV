#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { XMLParser } = require('fast-xml-parser');
const http = require('http');
const { spawn } = require('child_process');

// Configuration
const BASE_URL = 'http://localhost:3000';
const TIMEOUT = 30000; // 30 seconds per URL
const BATCH_SIZE = 5; // Test 5 URLs at a time
const MAX_RETRIES = 3;

// Test results
const results = {
  total: 0,
  tested: 0,
  passed: 0,
  failed: 0,
  errors: [],
  startTime: Date.now(),
};

// Wait for server to be ready
async function waitForServer(maxAttempts = 60) {
  console.log('⏳ Waiting for server to be ready...');

  for (let i = 0; i < maxAttempts; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(BASE_URL, res => {
          if (res.statusCode === 200 || res.statusCode === 404) {
            resolve(true);
          } else {
            reject(new Error(`Status ${res.statusCode}`));
          }
        });

        req.on('error', reject);
        req.setTimeout(5000);
        req.on('timeout', () => {
          req.destroy();
          reject(new Error('Timeout'));
        });
      });

      console.log('✅ Server is ready!');
      return true;
    } catch (e) {
      process.stdout.write('.');
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  throw new Error('Server failed to start');
}

// Start dev server
function startDevServer() {
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting development server...');

    const devServer = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      detached: true,
      env: { ...process.env, NODE_ENV: 'development' },
    });

    devServer.on('error', err => {
      reject(err);
    });

    // Give it time to start
    setTimeout(() => resolve(devServer), 5000);
  });
}

// Parse sitemap
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

      for (const sitemap of sitemaps) {
        const sitemapUrl = sitemap.loc;
        const sitemapFile = sitemapUrl.split('/').pop();
        const sitemapPath = path.join(path.dirname(filePath), sitemapFile);

        try {
          const subUrls = await parseSitemap(sitemapPath);
          urls.push(...subUrls);
        } catch (e) {
          console.error(`Failed to parse ${sitemapFile}`);
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
    console.error(`Error parsing sitemap:`, error.message);
    return [];
  }
}

// Test single URL
function testUrl(url) {
  return new Promise(resolve => {
    const testUrl = url.replace('https://www.vasquezlawnc.com', BASE_URL);
    const urlPath = url.replace('https://www.vasquezlawnc.com', '');

    const startTime = Date.now();
    let attempts = 0;

    const makeRequest = () => {
      attempts++;

      const req = http.get(testUrl, { timeout: TIMEOUT }, res => {
        const duration = Date.now() - startTime;
        results.tested++;

        if (res.statusCode === 200) {
          results.passed++;
          process.stdout.write('.');
          resolve({
            url: urlPath,
            status: res.statusCode,
            success: true,
            duration,
          });
        } else if (res.statusCode >= 300 && res.statusCode < 400) {
          results.passed++;
          process.stdout.write('R');
          resolve({
            url: urlPath,
            status: res.statusCode,
            success: true,
            redirect: true,
            duration,
          });
        } else {
          results.failed++;
          results.errors.push({
            url: urlPath,
            status: res.statusCode,
            error: `HTTP ${res.statusCode}`,
          });
          process.stdout.write('F');
          resolve({
            url: urlPath,
            status: res.statusCode,
            success: false,
            duration,
          });
        }

        // Consume response to free up connection
        res.resume();
      });

      req.on('error', error => {
        if (attempts < MAX_RETRIES) {
          setTimeout(makeRequest, 1000);
        } else {
          results.tested++;
          results.failed++;
          results.errors.push({
            url: urlPath,
            error: error.message,
          });
          process.stdout.write('X');
          resolve({
            url: urlPath,
            error: error.message,
            success: false,
          });
        }
      });

      req.on('timeout', () => {
        req.destroy();
        if (attempts < MAX_RETRIES) {
          setTimeout(makeRequest, 1000);
        } else {
          results.tested++;
          results.failed++;
          results.errors.push({
            url: urlPath,
            error: 'Timeout',
          });
          process.stdout.write('T');
          resolve({
            url: urlPath,
            error: 'Timeout',
            success: false,
          });
        }
      });
    };

    makeRequest();

    // Update progress
    if (results.tested % 50 === 0 && results.tested > 0) {
      const progress = ((results.tested / results.total) * 100).toFixed(1);
      const elapsed = ((Date.now() - results.startTime) / 1000).toFixed(0);
      const rate = (results.tested / elapsed).toFixed(1);
      process.stdout.write(
        `\n📊 ${results.tested}/${results.total} (${progress}%) - ✅ ${results.passed} ❌ ${results.failed} - ${rate}/sec\n`
      );
    }
  });
}

// Process URLs in batches
async function processUrls(urls) {
  console.log('\n🧪 Testing (. = OK, F = Failed, R = Redirect, X = Error, T = Timeout)\n');

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(url => testUrl(url)));

    // Small delay between batches
    await new Promise(r => setTimeout(r, 100));
  }
}

// Generate report
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
      successRate: ((results.passed / results.total) * 100).toFixed(2) + '%',
      duration: `${minutes}m ${seconds}s`,
      timestamp: new Date().toISOString(),
    },
    errors: results.errors,
  };

  // Save report
  await fs.writeFile('comprehensive-sitemap-test.json', JSON.stringify(report, null, 2));

  // Save failed URLs
  if (results.errors.length > 0) {
    const failedList = results.errors
      .map(e => `${e.url} | ${e.error || `HTTP ${e.status}`}`)
      .join('\n');
    await fs.writeFile('failed-urls-list.txt', failedList);
  }

  return report;
}

// Main
async function main() {
  console.log('🚀 COMPREHENSIVE SITEMAP TEST - ALL 6,572+ URLS');
  console.log('================================================\n');

  let devServer;

  try {
    // Start server
    devServer = await startDevServer();

    // Wait for server to be ready
    await waitForServer();

    // Give it a bit more time to warm up
    console.log('⏳ Warming up server...');
    await new Promise(r => setTimeout(r, 5000));

    // Load URLs
    console.log('\n📥 Loading URLs from sitemap...');
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    const urls = await parseSitemap(sitemapPath);

    // Deduplicate
    const uniqueUrls = [...new Set(urls)];
    results.total = uniqueUrls.length;

    console.log(`✅ Found ${results.total} unique URLs`);
    console.log(`⏱️  Estimated time: ${Math.ceil((results.total * 2) / 60)} minutes`);

    // Test all URLs
    await processUrls(uniqueUrls);

    // Generate report
    console.log('\n\n📋 Generating report...');
    const report = await generateReport();

    // Display results
    console.log('\n' + '='.repeat(60));
    console.log('📊 FINAL RESULTS');
    console.log('='.repeat(60));
    console.log(`Total URLs:    ${report.summary.totalUrls}`);
    console.log(`Tested:        ${report.summary.tested}`);
    console.log(`Passed:        ${report.summary.passed} ✅`);
    console.log(`Failed:        ${report.summary.failed} ❌`);
    console.log(`Success Rate:  ${report.summary.successRate}`);
    console.log(`Duration:      ${report.summary.duration}`);
    console.log('='.repeat(60));

    if (results.errors.length > 0) {
      // Group errors
      const errorTypes = {};
      results.errors.forEach(e => {
        const key = e.error || `HTTP ${e.status}`;
        errorTypes[key] = (errorTypes[key] || 0) + 1;
      });

      console.log('\n📊 ERROR BREAKDOWN:');
      Object.entries(errorTypes)
        .sort((a, b) => b[1] - a[1])
        .forEach(([type, count]) => {
          console.log(`  ${type}: ${count} URLs`);
        });

      console.log('\n❌ SAMPLE FAILED URLS:');
      results.errors.slice(0, 10).forEach(e => {
        console.log(`  ${e.url} - ${e.error || `HTTP ${e.status}`}`);
      });
    }

    console.log('\n✅ Reports saved:');
    console.log('  - comprehensive-sitemap-test.json');
    if (results.errors.length > 0) {
      console.log('  - failed-urls-list.txt');
    }

    if (results.failed === 0) {
      console.log('\n🎉 PERFECT! All URLs passed!');
    } else {
      console.log(`\n⚠️  ${results.failed} URLs need attention`);
    }
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
  } finally {
    if (devServer) {
      console.log('\n🛑 Stopping server...');
      try {
        process.kill(-devServer.pid);
      } catch (e) {
        devServer.kill('SIGTERM');
      }
    }

    process.exit(results.failed > 0 ? 1 : 0);
  }
}

// Check dependencies
async function checkDeps() {
  try {
    require('fast-xml-parser');
  } catch (e) {
    console.log('📦 Installing dependencies...');
    require('child_process').execSync('npm install fast-xml-parser', { stdio: 'inherit' });
  }
}

// Run
checkDeps().then(() => {
  main().catch(console.error);
});
