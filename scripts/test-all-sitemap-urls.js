#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { XMLParser } = require('fast-xml-parser');
const http = require('http');
const https = require('https');

// Configuration
const BASE_URL = 'http://localhost:3000';
const TIMEOUT = 10000;
const BATCH_SIZE = 5;
const RETRY_ATTEMPTS = 2;

// Test results
const results = {
  total: 0,
  tested: 0,
  passed: 0,
  failed: 0,
  errors: [],
  startTime: Date.now(),
};

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
        const subUrls = await parseSitemap(sitemapPath);
        urls.push(...subUrls);
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
    console.error(`❌ Error parsing sitemap ${filePath}:`, error.message);
    return [];
  }
}

// Test a single URL with retry
async function testUrl(url, attempt = 1) {
  return new Promise(resolve => {
    const testUrl = url.replace('https://www.vasquezlawnc.com', BASE_URL);
    const urlPath = url.replace('https://www.vasquezlawnc.com', '');

    const options = {
      method: 'GET',
      timeout: TIMEOUT,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SitemapTester/1.0)',
      },
    };

    const req = http.request(testUrl, options, res => {
      results.tested++;

      if (res.statusCode === 200) {
        results.passed++;
        process.stdout.write('.');
        resolve({ url: urlPath, status: res.statusCode, success: true });
      } else if (
        res.statusCode === 301 ||
        res.statusCode === 302 ||
        res.statusCode === 307 ||
        res.statusCode === 308
      ) {
        // Redirects are acceptable
        results.passed++;
        process.stdout.write('R');
        resolve({ url: urlPath, status: res.statusCode, success: true, redirect: true });
      } else {
        results.failed++;
        results.errors.push({
          url: urlPath,
          status: res.statusCode,
          error: `HTTP ${res.statusCode}`,
        });
        process.stdout.write('F');
        resolve({ url: urlPath, status: res.statusCode, success: false });
      }

      // Progress update every 100 URLs
      if (results.tested % 100 === 0) {
        const progress = ((results.tested / results.total) * 100).toFixed(1);
        process.stdout.write(
          `\n📊 Progress: ${results.tested}/${results.total} (${progress}%) - ✅ ${results.passed} ❌ ${results.failed}\n`
        );
      }
    });

    req.on('error', async error => {
      if (attempt < RETRY_ATTEMPTS) {
        await new Promise(r => setTimeout(r, 1000));
        resolve(await testUrl(url, attempt + 1));
      } else {
        results.tested++;
        results.failed++;
        results.errors.push({
          url: urlPath,
          error: error.message,
        });
        process.stdout.write('X');
        resolve({ url: urlPath, error: error.message, success: false });
      }
    });

    req.on('timeout', () => {
      req.destroy();
    });

    req.end();
  });
}

// Process URLs in batches
async function processUrlBatch(urls) {
  const results = [];

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(batch.map(url => testUrl(url)));
    results.push(...batchResults);

    // Small delay between batches to avoid overwhelming the server
    if (i + BATCH_SIZE < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return results;
}

// Check if server is running
async function checkServer() {
  return new Promise((resolve, reject) => {
    http
      .get(BASE_URL, res => {
        if (res.statusCode === 200 || res.statusCode === 404) {
          resolve(true);
        } else {
          reject(new Error(`Server returned ${res.statusCode}`));
        }
      })
      .on('error', err => {
        reject(err);
      })
      .setTimeout(5000);
  });
}

// Generate report
async function generateReport() {
  const duration = ((Date.now() - results.startTime) / 1000).toFixed(2);

  const report = {
    summary: {
      totalUrls: results.total,
      tested: results.tested,
      passed: results.passed,
      failed: results.failed,
      successRate:
        results.total > 0 ? ((results.passed / results.total) * 100).toFixed(2) + '%' : '0%',
      duration: duration + ' seconds',
      timestamp: new Date().toISOString(),
    },
    errors: results.errors.sort((a, b) => a.url.localeCompare(b.url)),
  };

  // Save JSON report
  await fs.writeFile(
    path.join(process.cwd(), 'sitemap-test-report.json'),
    JSON.stringify(report, null, 2)
  );

  // Save failed URLs for easy re-testing
  if (results.errors.length > 0) {
    const failedUrls = results.errors
      .map(e => `${e.url} - ${e.error || `HTTP ${e.status}`}`)
      .join('\n');
    await fs.writeFile(path.join(process.cwd(), 'failed-sitemap-urls.txt'), failedUrls);
  }

  return report;
}

// Main function
async function main() {
  console.log('🚀 Sitemap URL Test');
  console.log('==================\n');

  try {
    // Check server
    console.log('🔍 Checking server...');
    await checkServer();
    console.log('✅ Server is running at', BASE_URL);
  } catch (error) {
    console.error('❌ Server is not running at', BASE_URL);
    console.log('💡 Please start the server with: npm run dev');
    process.exit(1);
  }

  // Load URLs from sitemap
  console.log('\n📥 Loading URLs from sitemap...');
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const urls = await parseSitemap(sitemapPath);

  if (urls.length === 0) {
    console.error('❌ No URLs found in sitemap');
    process.exit(1);
  }

  // Remove duplicates
  const uniqueUrls = [...new Set(urls)];
  results.total = uniqueUrls.length;

  console.log(`✅ Found ${results.total} unique URLs to test\n`);
  console.log('🧪 Testing all URLs...');
  console.log('Legend: . = success, F = failed, R = redirect, X = error\n');

  // Test all URLs
  await processUrlBatch(uniqueUrls);

  // Generate report
  console.log('\n\n📋 Generating report...');
  const report = await generateReport();

  // Display summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total URLs:    ${report.summary.totalUrls}`);
  console.log(`Tested:        ${report.summary.tested}`);
  console.log(`Passed:        ${report.summary.passed} ✅`);
  console.log(`Failed:        ${report.summary.failed} ❌`);
  console.log(`Success Rate:  ${report.summary.successRate}`);
  console.log(`Duration:      ${report.summary.duration}`);
  console.log('='.repeat(50));

  // Show failed URLs
  if (results.errors.length > 0) {
    console.log('\n❌ FAILED URLS:');
    console.log('='.repeat(50));

    // Group errors by type
    const errorsByType = {};
    results.errors.forEach(error => {
      const key = error.error || `HTTP ${error.status}`;
      if (!errorsByType[key]) {
        errorsByType[key] = [];
      }
      errorsByType[key].push(error.url);
    });

    // Display grouped errors
    Object.entries(errorsByType).forEach(([errorType, urls]) => {
      console.log(`\n${errorType} (${urls.length} URLs):`);
      urls.slice(0, 5).forEach(url => {
        console.log(`  - ${url}`);
      });
      if (urls.length > 5) {
        console.log(`  ... and ${urls.length - 5} more`);
      }
    });
  }

  console.log('\n✅ Reports saved:');
  console.log('  - sitemap-test-report.json');
  if (results.errors.length > 0) {
    console.log('  - failed-sitemap-urls.txt');
  }

  // Exit with appropriate code
  if (results.failed > 0) {
    console.log(`\n❌ TEST FAILED: ${results.failed} URLs returned errors`);
    process.exit(1);
  } else {
    console.log('\n✅ TEST PASSED: All URLs returned successful responses!');
    process.exit(0);
  }
}

// Run the test
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
