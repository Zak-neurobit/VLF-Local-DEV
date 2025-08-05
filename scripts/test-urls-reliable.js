#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { XMLParser } = require('fast-xml-parser');
const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:3000';
const CONCURRENT_REQUESTS = 5; // Lower concurrency for reliability
const TIMEOUT = 30000;
const RETRY_ATTEMPTS = 2;
const RETRY_DELAY = 2000;

// Results
const results = {
  total: 0,
  tested: 0,
  passed: 0,
  failed: 0,
  errors: [],
  startTime: Date.now(),
};

// Load all URLs from all sitemaps
async function loadAllUrls() {
  const urls = new Set();
  const parser = new XMLParser();

  // List of all sitemap files
  const sitemapFiles = [
    'sitemap-complete.xml',
    'sitemap-locations.xml',
    'sitemap-practice-areas.xml',
    'sitemap-blog.xml',
    'sitemap-near-me.xml',
    'sitemap-attorneys.xml',
    'sitemap-en.xml',
    'sitemap-es.xml',
  ];

  for (const file of sitemapFiles) {
    try {
      const content = await fs.readFile(path.join(process.cwd(), 'public', file), 'utf-8');
      const result = parser.parse(content);

      if (result.urlset && result.urlset.url) {
        const urlEntries = Array.isArray(result.urlset.url)
          ? result.urlset.url
          : [result.urlset.url];

        urlEntries.forEach(entry => {
          if (entry.loc) {
            urls.add(entry.loc);
          }
        });
      }

      console.log(`✅ Loaded ${file}`);
    } catch (e) {
      console.log(`⚠️  Could not load ${file}`);
    }
  }

  return Array.from(urls);
}

// Test URL with retries
async function testUrl(url, attempt = 1) {
  const urlPath = url.replace('https://www.vasquezlawnc.com', '');
  const testUrl = BASE_URL + urlPath;

  return new Promise(resolve => {
    const startTime = Date.now();

    const req = http.get(testUrl, { timeout: TIMEOUT }, res => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        const duration = Date.now() - startTime;
        results.tested++;

        if (res.statusCode === 200) {
          results.passed++;
          process.stdout.write('.');
          resolve({ url: urlPath, status: 200, success: true, duration });
        } else if (res.statusCode >= 300 && res.statusCode < 400) {
          results.passed++;
          process.stdout.write('R');
          resolve({
            url: urlPath,
            status: res.statusCode,
            redirect: true,
            success: true,
            duration,
          });
        } else {
          results.failed++;
          results.errors.push({ url: urlPath, status: res.statusCode });
          process.stdout.write('F');
          resolve({ url: urlPath, status: res.statusCode, success: false, duration });
        }

        if (results.tested % 50 === 0) {
          showProgress();
        }
      });
    });

    req.on('error', async err => {
      if (attempt < RETRY_ATTEMPTS) {
        process.stdout.write('r');
        await new Promise(r => setTimeout(r, RETRY_DELAY));
        resolve(await testUrl(url, attempt + 1));
      } else {
        results.tested++;
        results.failed++;
        results.errors.push({ url: urlPath, error: err.message });
        process.stdout.write('X');
        resolve({ url: urlPath, error: err.message, success: false });
      }
    });

    req.on('timeout', async () => {
      req.destroy();
      if (attempt < RETRY_ATTEMPTS) {
        process.stdout.write('t');
        await new Promise(r => setTimeout(r, RETRY_DELAY));
        resolve(await testUrl(url, attempt + 1));
      } else {
        results.tested++;
        results.failed++;
        results.errors.push({ url: urlPath, error: 'Timeout' });
        process.stdout.write('T');
        resolve({ url: urlPath, error: 'Timeout', success: false });
      }
    });
  });
}

// Show progress
function showProgress() {
  const elapsed = ((Date.now() - results.startTime) / 1000).toFixed(0);
  const rate = (results.tested / elapsed).toFixed(1);
  const progress = ((results.tested / results.total) * 100).toFixed(1);
  const eta = Math.ceil((results.total - results.tested) / rate / 60);

  process.stdout.write(
    `\n[${results.tested}/${results.total}] ${progress}% | ✅ ${results.passed} ❌ ${results.failed} | ${rate}/sec | ETA: ${eta}min\n`
  );
}

// Process URLs with controlled concurrency
async function processUrls(urls) {
  const queue = [...urls];
  const active = new Map();

  while (queue.length > 0 || active.size > 0) {
    // Start new requests up to limit
    while (active.size < CONCURRENT_REQUESTS && queue.length > 0) {
      const url = queue.shift();
      const promise = testUrl(url);
      active.set(promise, url);

      promise.then(() => {
        active.delete(promise);
      });
    }

    // Wait a bit before checking again
    await new Promise(r => setTimeout(r, 100));
  }
}

// Generate report
async function generateReport() {
  const duration = ((Date.now() - results.startTime) / 1000).toFixed(1);
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

  await fs.writeFile('reliable-test-report.json', JSON.stringify(report, null, 2));

  if (results.errors.length > 0) {
    const errorList = results.errors
      .map(e => `${e.url} | ${e.error || `HTTP ${e.status}`}`)
      .join('\n');
    await fs.writeFile('failed-urls-reliable.txt', errorList);
  }

  return report;
}

// Main
async function main() {
  console.log('🚀 RELIABLE COMPREHENSIVE URL TEST');
  console.log('==================================\n');

  // Check server
  console.log('🔍 Checking server...');
  let serverReady = false;
  for (let i = 0; i < 30; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(BASE_URL, res => {
          res.on('data', () => {});
          res.on('end', () => resolve());
        });
        req.on('error', reject);
        req.setTimeout(5000);
      });
      serverReady = true;
      break;
    } catch (e) {
      process.stdout.write('.');
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  if (!serverReady) {
    console.error('\n❌ Server not responding!');
    process.exit(1);
  }

  console.log('\n✅ Server ready\n');

  // Wait a bit for server to stabilize
  console.log('⏳ Warming up server...');
  await new Promise(r => setTimeout(r, 3000));

  // Load URLs
  console.log('\n📥 Loading all sitemap URLs...');
  const urls = await loadAllUrls();
  results.total = urls.length;

  console.log(`\n✅ Found ${results.total} total unique URLs`);
  console.log(`⚙️  Testing with ${CONCURRENT_REQUESTS} concurrent requests`);
  console.log(`🔄 Retry attempts: ${RETRY_ATTEMPTS}`);
  console.log(`⏱️  Estimated time: ${Math.ceil(results.total / 5 / 60)} minutes\n`);

  console.log('🧪 Testing all URLs...');
  console.log('Legend: . = OK, R = Redirect, F = Failed, X = Error, T = Timeout');
  console.log('        r = retrying, t = timeout retry\n');

  // Test all URLs
  await processUrls(urls);

  // Final progress
  showProgress();

  // Generate report
  console.log('\n\n📋 Generating report...');
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
  console.log('='.repeat(60));

  if (results.errors.length > 0) {
    // Group errors
    const errorTypes = {};
    results.errors.forEach(e => {
      const key = e.error || `HTTP ${e.status}`;
      if (!errorTypes[key]) errorTypes[key] = 0;
      errorTypes[key]++;
    });

    console.log('\n📊 ERROR BREAKDOWN:');
    Object.entries(errorTypes)
      .sort((a, b) => b[1] - a[1])
      .forEach(([type, count]) => {
        console.log(`  ${type}: ${count} URLs`);
      });

    console.log('\n❌ First 10 failed URLs:');
    results.errors.slice(0, 10).forEach(e => {
      console.log(`  ${e.url} - ${e.error || `HTTP ${e.status}`}`);
    });
  }

  console.log('\n✅ Reports saved:');
  console.log('  - reliable-test-report.json');
  if (results.errors.length > 0) {
    console.log('  - failed-urls-reliable.txt');
  }

  if (results.failed === 0) {
    console.log('\n🎉 PERFECT! All URLs passed!');
  } else {
    console.log(`\n⚠️  ${results.failed} URLs need attention`);
  }
}

// Run
main().catch(console.error);
