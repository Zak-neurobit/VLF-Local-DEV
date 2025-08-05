#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { XMLParser } = require('fast-xml-parser');
const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:3000';
const CONCURRENT_REQUESTS = 10;
const TIMEOUT = 30000;
const PROGRESS_INTERVAL = 50;

// Results tracking
const results = {
  total: 0,
  tested: 0,
  passed: 0,
  failed: 0,
  errors: [],
  startTime: Date.now(),
};

// Parse sitemap recursively
async function parseSitemap(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const parser = new XMLParser();
    const result = parser.parse(content);

    const urls = [];

    if (result.sitemapindex && result.sitemapindex.sitemap) {
      const sitemaps = Array.isArray(result.sitemapindex.sitemap)
        ? result.sitemapindex.sitemap
        : [result.sitemapindex.sitemap];

      for (const sitemap of sitemaps) {
        const sitemapUrl = sitemap.loc;
        const sitemapFile = sitemapUrl.split('/').pop();
        const sitemapPath = path.join(path.dirname(filePath), sitemapFile);

        console.log(`📄 Loading ${sitemapFile}...`);
        const subUrls = await parseSitemap(sitemapPath);
        urls.push(...subUrls);
      }
    }

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
    console.error(`Error parsing ${filePath}:`, error.message);
    return [];
  }
}

// Test single URL
function testUrl(url) {
  return new Promise(resolve => {
    const urlPath = url.replace('https://www.vasquezlawnc.com', '');
    const testUrl = BASE_URL + urlPath;

    const startTime = Date.now();

    const req = http.get(testUrl, { timeout: TIMEOUT }, res => {
      const duration = Date.now() - startTime;

      // Consume response data
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
          results.errors.push({
            url: urlPath,
            status: res.statusCode,
            duration,
          });
          process.stdout.write('F');
        }

        if (results.tested % PROGRESS_INTERVAL === 0) {
          showProgress();
        }

        resolve();
      });
    });

    req.on('error', err => {
      results.tested++;
      results.failed++;
      results.errors.push({
        url: urlPath,
        error: err.message,
      });
      process.stdout.write('X');

      if (results.tested % PROGRESS_INTERVAL === 0) {
        showProgress();
      }

      resolve();
    });

    req.on('timeout', () => {
      req.destroy();
      results.tested++;
      results.failed++;
      results.errors.push({
        url: urlPath,
        error: 'Timeout',
      });
      process.stdout.write('T');

      if (results.tested % PROGRESS_INTERVAL === 0) {
        showProgress();
      }

      resolve();
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

// Process URLs with concurrency control
async function processAllUrls(urls) {
  const queue = [...urls];
  const inProgress = [];

  while (queue.length > 0 || inProgress.length > 0) {
    // Start new requests up to concurrent limit
    while (inProgress.length < CONCURRENT_REQUESTS && queue.length > 0) {
      const url = queue.shift();
      const promise = testUrl(url);
      inProgress.push(promise);
    }

    // Wait for at least one to complete
    if (inProgress.length > 0) {
      await Promise.race(inProgress);

      // Remove completed promises
      for (let i = inProgress.length - 1; i >= 0; i--) {
        if ((await Promise.race([inProgress[i], Promise.resolve('pending')])) !== 'pending') {
          inProgress.splice(i, 1);
        }
      }
    }
  }
}

// Generate detailed report
async function generateReport() {
  const duration = ((Date.now() - results.startTime) / 1000).toFixed(1);
  const minutes = Math.floor(duration / 60);
  const seconds = (duration % 60).toFixed(0);

  // Group errors by type
  const errorTypes = {};
  results.errors.forEach(err => {
    const key = err.error || `HTTP ${err.status}`;
    if (!errorTypes[key]) {
      errorTypes[key] = [];
    }
    errorTypes[key].push(err.url);
  });

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
    errorBreakdown: Object.keys(errorTypes).map(type => ({
      type,
      count: errorTypes[type].length,
      examples: errorTypes[type].slice(0, 5),
    })),
    allErrors: results.errors,
  };

  await fs.writeFile('final-test-report.json', JSON.stringify(report, null, 2));

  if (results.errors.length > 0) {
    const errorList = results.errors
      .map(e => `${e.url} | ${e.error || `HTTP ${e.status}`}`)
      .join('\n');
    await fs.writeFile('failed-urls.txt', errorList);
  }

  return report;
}

// Main function
async function main() {
  console.log('🚀 COMPREHENSIVE URL TEST - ALL 6,572 PAGES');
  console.log('==========================================\n');

  // Check server
  console.log('🔍 Checking server...');
  try {
    await new Promise((resolve, reject) => {
      http
        .get(BASE_URL, res => {
          res.on('data', () => {});
          res.on('end', () => {
            if (res.statusCode === 200 || res.statusCode === 404) {
              resolve();
            } else {
              reject(new Error(`Server returned ${res.statusCode}`));
            }
          });
        })
        .on('error', reject);
    });
    console.log('✅ Server is ready\n');
  } catch (err) {
    console.error('❌ Server not running!');
    console.log('Please start the server with: npm run dev');
    process.exit(1);
  }

  // Load URLs
  console.log('📥 Loading sitemap URLs...');
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap-complete.xml');
  const urls = await parseSitemap(sitemapPath);

  // Deduplicate
  const uniqueUrls = [...new Set(urls)];
  results.total = uniqueUrls.length;

  console.log(`✅ Found ${results.total} unique URLs`);
  console.log(`⏱️  Estimated time: ${Math.ceil(results.total / 10 / 60)} minutes\n`);
  console.log('🧪 Testing all URLs...');
  console.log('Legend: . = OK, R = Redirect, F = Failed, X = Error, T = Timeout\n');

  // Test all URLs
  await processAllUrls(uniqueUrls);

  // Final progress
  showProgress();

  // Generate report
  console.log('\n\n📋 Generating report...');
  const report = await generateReport();

  // Display results
  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL TEST RESULTS');
  console.log('='.repeat(60));
  console.log(`Total URLs:    ${report.summary.totalUrls}`);
  console.log(`Tested:        ${report.summary.tested}`);
  console.log(`Passed:        ${report.summary.passed} ✅`);
  console.log(`Failed:        ${report.summary.failed} ❌`);
  console.log(`Success Rate:  ${report.summary.successRate}`);
  console.log(`Duration:      ${report.summary.duration}`);
  console.log('='.repeat(60));

  if (report.errorBreakdown.length > 0) {
    console.log('\n📊 ERROR BREAKDOWN:');
    report.errorBreakdown.forEach(({ type, count, examples }) => {
      console.log(`\n${type} (${count} URLs):`);
      examples.forEach(url => console.log(`  - ${url}`));
      if (count > 5) {
        console.log(`  ... and ${count - 5} more`);
      }
    });
  }

  console.log('\n✅ Reports saved:');
  console.log('  - final-test-report.json');
  if (results.errors.length > 0) {
    console.log('  - failed-urls.txt');
  }

  if (results.failed === 0) {
    console.log('\n🎉 PERFECT! All ${results.total} URLs passed!');
  } else {
    console.log(`\n⚠️  ${results.failed} URLs need attention`);
  }
}

// Check dependencies
async function checkDeps() {
  try {
    require('fast-xml-parser');
  } catch (e) {
    console.log('Installing fast-xml-parser...');
    require('child_process').execSync('npm install fast-xml-parser', { stdio: 'inherit' });
  }
}

// Run
checkDeps().then(() => {
  main().catch(console.error);
});
