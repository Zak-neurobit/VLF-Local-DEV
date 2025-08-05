#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { XMLParser } = require('fast-xml-parser');
const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:3000';
const CONCURRENT_REQUESTS = 50; // Increased for faster testing
const TIMEOUT = 10000; // Reduced timeout
const BATCH_SIZE = 100;

// Results
const results = {
  total: 0,
  tested: 0,
  passed: 0,
  failed: 0,
  errors: [],
  startTime: Date.now(),
};

// Parse all sitemaps
async function loadAllUrls() {
  const urls = new Set();
  const parser = new XMLParser();

  // Load main sitemap
  const mainSitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml.backup-static');
  try {
    const mainContent = await fs.readFile(mainSitemapPath, 'utf-8');
    const mainResult = parser.parse(mainContent);

    if (mainResult.sitemapindex && mainResult.sitemapindex.sitemap) {
      const sitemaps = Array.isArray(mainResult.sitemapindex.sitemap)
        ? mainResult.sitemapindex.sitemap
        : [mainResult.sitemapindex.sitemap];

      // Load each sub-sitemap
      for (const sitemap of sitemaps) {
        const sitemapFile = sitemap.loc.split('/').pop();
        const sitemapPath = path.join(process.cwd(), 'public', sitemapFile);

        try {
          const content = await fs.readFile(sitemapPath, 'utf-8');
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
        } catch (e) {
          console.log(`⚠️  Could not load ${sitemapFile}`);
        }
      }
    }
  } catch (e) {
    console.log('⚠️  Could not load main sitemap');
  }

  return Array.from(urls);
}

// Test URL
function testUrl(url) {
  return new Promise(resolve => {
    const urlPath = url.replace('https://www.vasquezlawnc.com', '');
    const testUrl = BASE_URL + urlPath;

    const req = http.get(testUrl, { timeout: TIMEOUT }, res => {
      res.on('data', () => {});
      res.on('end', () => {
        results.tested++;

        if (res.statusCode === 200 || (res.statusCode >= 300 && res.statusCode < 400)) {
          results.passed++;
          process.stdout.write('.');
        } else {
          results.failed++;
          results.errors.push({ url: urlPath, status: res.statusCode });
          process.stdout.write('F');
        }

        if (results.tested % 100 === 0) {
          showProgress();
        }

        resolve();
      });
    });

    req.on('error', () => {
      results.tested++;
      results.failed++;
      results.errors.push({ url: urlPath, error: 'Connection error' });
      process.stdout.write('X');
      resolve();
    });

    req.on('timeout', () => {
      req.destroy();
      results.tested++;
      results.failed++;
      results.errors.push({ url: urlPath, error: 'Timeout' });
      process.stdout.write('T');
      resolve();
    });
  });
}

// Show progress
function showProgress() {
  const elapsed = ((Date.now() - results.startTime) / 1000).toFixed(0);
  const rate = (results.tested / elapsed).toFixed(1);
  const progress = ((results.tested / results.total) * 100).toFixed(1);

  process.stdout.write(
    `\n[${results.tested}/${results.total}] ${progress}% | ✅ ${results.passed} ❌ ${results.failed} | ${rate}/sec\n`
  );
}

// Process in batches
async function processUrls(urls) {
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const promises = [];

    // Create all promises for the batch
    for (const url of batch) {
      promises.push(testUrl(url));
    }

    // Wait for entire batch to complete
    await Promise.all(promises);

    // Small delay between batches
    await new Promise(r => setTimeout(r, 100));
  }
}

// Main
async function main() {
  console.log('🚀 FAST COMPREHENSIVE URL TEST');
  console.log('==============================\n');

  // Check server
  console.log('🔍 Checking server...');
  try {
    await new Promise((resolve, reject) => {
      http
        .get(BASE_URL, res => {
          res.on('data', () => {});
          res.on('end', () => resolve());
        })
        .on('error', reject);
    });
    console.log('✅ Server ready\n');
  } catch (e) {
    console.error('❌ Server not running!');
    process.exit(1);
  }

  // Load all URLs
  console.log('📥 Loading ALL sitemap URLs...');
  const urls = await loadAllUrls();
  results.total = urls.length;

  console.log(`✅ Found ${results.total} total URLs`);
  console.log(`⚡ Testing with ${CONCURRENT_REQUESTS} concurrent requests\n`);

  // Test all
  await processUrls(urls);

  // Final progress
  showProgress();

  // Report
  const duration = ((Date.now() - results.startTime) / 1000).toFixed(1);
  const successRate = ((results.passed / results.total) * 100).toFixed(2);

  console.log('\n\n' + '='.repeat(50));
  console.log('📊 FINAL RESULTS');
  console.log('='.repeat(50));
  console.log(`Total URLs:    ${results.total}`);
  console.log(`Passed:        ${results.passed} ✅`);
  console.log(`Failed:        ${results.failed} ❌`);
  console.log(`Success Rate:  ${successRate}%`);
  console.log(`Duration:      ${duration}s`);
  console.log('='.repeat(50));

  // Save results
  const report = {
    summary: {
      total: results.total,
      passed: results.passed,
      failed: results.failed,
      successRate: successRate + '%',
      duration: duration + 's',
    },
    errors: results.errors,
  };

  await fs.writeFile('fast-test-results.json', JSON.stringify(report, null, 2));

  if (results.errors.length > 0) {
    console.log('\n❌ Failed URLs saved to fast-test-results.json');

    // Show first few errors
    console.log('\nFirst 10 failures:');
    results.errors.slice(0, 10).forEach(e => {
      console.log(`  - ${e.url} (${e.error || `HTTP ${e.status}`})`);
    });
  }

  if (results.failed === 0) {
    console.log('\n🎉 PERFECT! All URLs passed!');
  }
}

// Run
main().catch(console.error);
