#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { XMLParser } = require('fast-xml-parser');
const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:3000';
const BATCH_SIZE = 10;
const DELAY_BETWEEN_BATCHES = 500;

// Results
const results = {
  total: 0,
  tested: 0,
  passed: 0,
  failed: 0,
  errors: [],
  startTime: Date.now(),
};

// Load all URLs
async function loadUrls() {
  const urls = new Set();
  const parser = new XMLParser();

  // Just load from sitemap-complete.xml for comprehensive coverage
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap-complete.xml');

  try {
    const content = await fs.readFile(sitemapPath, 'utf-8');
    const result = parser.parse(content);

    if (result.urlset && result.urlset.url) {
      const urlEntries = Array.isArray(result.urlset.url) ? result.urlset.url : [result.urlset.url];

      urlEntries.forEach(entry => {
        if (entry.loc) {
          urls.add(entry.loc);
        }
      });
    }
  } catch (e) {
    console.error('Error loading sitemap:', e.message);
  }

  return Array.from(urls);
}

// Test a single URL
function testUrl(url) {
  return new Promise(resolve => {
    const urlPath = url.replace('https://www.vasquezlawnc.com', '');
    const testUrl = BASE_URL + urlPath;

    const req = http.get(testUrl, { timeout: 20000 }, res => {
      // Consume response
      res.on('data', () => {});

      res.on('end', () => {
        results.tested++;

        if (res.statusCode === 200) {
          results.passed++;
          process.stdout.write('.');
        } else if (res.statusCode >= 300 && res.statusCode < 400) {
          results.passed++;
          process.stdout.write('R');
        } else {
          results.failed++;
          results.errors.push({ url: urlPath, status: res.statusCode });
          process.stdout.write('F');
        }

        resolve();
      });
    });

    req.on('error', err => {
      results.tested++;
      results.failed++;
      results.errors.push({ url: urlPath, error: err.message });
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

// Process in batches
async function processBatches(urls) {
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);

    // Test batch concurrently
    await Promise.all(batch.map(url => testUrl(url)));

    // Show progress
    if ((i + BATCH_SIZE) % 100 === 0 || i + BATCH_SIZE >= urls.length) {
      const progress = ((results.tested / results.total) * 100).toFixed(1);
      const elapsed = ((Date.now() - results.startTime) / 1000).toFixed(0);
      const rate = (results.tested / elapsed).toFixed(1);
      console.log(
        `\n[${results.tested}/${results.total}] ${progress}% | ✅ ${results.passed} ❌ ${results.failed} | ${rate}/sec`
      );
    }

    // Delay between batches
    await new Promise(r => setTimeout(r, DELAY_BETWEEN_BATCHES));
  }
}

// Main
async function main() {
  console.log('🚀 COMPREHENSIVE URL TEST');
  console.log('=========================\n');

  // Load URLs
  console.log('📥 Loading URLs...');
  const urls = await loadUrls();
  results.total = urls.length;

  if (results.total === 0) {
    console.error('❌ No URLs found!');
    process.exit(1);
  }

  console.log(`✅ Found ${results.total} URLs to test\n`);

  console.log('🧪 Testing all URLs...\n');

  // Process all URLs
  await processBatches(urls);

  // Final results
  const duration = ((Date.now() - results.startTime) / 1000).toFixed(1);
  const successRate = ((results.passed / results.total) * 100).toFixed(2);

  console.log('\n\n' + '='.repeat(50));
  console.log('📊 FINAL RESULTS');
  console.log('='.repeat(50));
  console.log(`Total URLs:    ${results.total}`);
  console.log(`Tested:        ${results.tested}`);
  console.log(`Passed:        ${results.passed} ✅`);
  console.log(`Failed:        ${results.failed} ❌`);
  console.log(`Success Rate:  ${successRate}%`);
  console.log(`Duration:      ${duration}s`);
  console.log('='.repeat(50));

  // Save report
  const report = {
    summary: {
      total: results.total,
      tested: results.tested,
      passed: results.passed,
      failed: results.failed,
      successRate: successRate + '%',
      duration: duration + 's',
      timestamp: new Date().toISOString(),
    },
    errors: results.errors,
  };

  await fs.writeFile('url-test-report.json', JSON.stringify(report, null, 2));

  if (results.errors.length > 0) {
    console.log('\n❌ Failed URLs:');

    // Group by error type
    const byType = {};
    results.errors.forEach(e => {
      const key = e.error || `HTTP ${e.status}`;
      if (!byType[key]) byType[key] = [];
      byType[key].push(e.url);
    });

    Object.entries(byType).forEach(([type, urls]) => {
      console.log(`\n${type} (${urls.length} URLs):`);
      urls.slice(0, 5).forEach(url => console.log(`  - ${url}`));
      if (urls.length > 5) {
        console.log(`  ... and ${urls.length - 5} more`);
      }
    });

    await fs.writeFile(
      'failed-urls.txt',
      results.errors.map(e => `${e.url} | ${e.error || `HTTP ${e.status}`}`).join('\n')
    );
  }

  console.log('\n✅ Report saved to url-test-report.json');

  if (results.failed === 0) {
    console.log('\n🎉 PERFECT! All URLs passed!');
  }
}

// Run
main().catch(console.error);
