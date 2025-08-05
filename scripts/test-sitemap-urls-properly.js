#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { XMLParser } = require('fast-xml-parser');
const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:3000';
const BATCH_SIZE = 5;
const TIMEOUT = 30000;

// Results
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

    // Handle sitemap index
    if (result.sitemapindex && result.sitemapindex.sitemap) {
      const sitemaps = Array.isArray(result.sitemapindex.sitemap)
        ? result.sitemapindex.sitemap
        : [result.sitemapindex.sitemap];

      for (const sitemap of sitemaps) {
        const sitemapUrl = sitemap.loc;
        const sitemapFile = sitemapUrl.split('/').pop();
        const sitemapPath = path.join(path.dirname(filePath), sitemapFile);

        console.log(`  📄 Loading ${sitemapFile}...`);
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
    console.error(`Error parsing ${filePath}:`, error.message);
    return [];
  }
}

// Test a URL
function testUrl(url) {
  return new Promise(resolve => {
    const urlPath = url.replace('https://www.vasquezlawnc.com', '');
    const testUrl = BASE_URL + urlPath;

    const startTime = Date.now();

    const req = http.get(testUrl, { timeout: TIMEOUT }, res => {
      const duration = Date.now() - startTime;
      results.tested++;

      // Consume response to free connection
      res.resume();

      if (res.statusCode === 200) {
        results.passed++;
        process.stdout.write('.');
        resolve({ url: urlPath, status: 200, success: true, duration });
      } else if (res.statusCode >= 300 && res.statusCode < 400) {
        results.passed++;
        process.stdout.write('R');
        resolve({ url: urlPath, status: res.statusCode, redirect: true, success: true, duration });
      } else {
        results.failed++;
        results.errors.push({ url: urlPath, status: res.statusCode });
        process.stdout.write('F');
        resolve({ url: urlPath, status: res.statusCode, success: false, duration });
      }
    });

    req.on('error', err => {
      results.tested++;
      results.failed++;
      results.errors.push({ url: urlPath, error: err.message });
      process.stdout.write('X');
      resolve({ url: urlPath, error: err.message, success: false });
    });

    req.on('timeout', () => {
      req.destroy();
      results.tested++;
      results.failed++;
      results.errors.push({ url: urlPath, error: 'Timeout' });
      process.stdout.write('T');
      resolve({ url: urlPath, error: 'Timeout', success: false });
    });

    // Progress
    if (results.tested % 50 === 0 && results.tested > 0) {
      const progress = ((results.tested / results.total) * 100).toFixed(1);
      process.stdout.write(
        `\n[${results.tested}/${results.total}] ${progress}% | ✅ ${results.passed} ❌ ${results.failed}\n`
      );
    }
  });
}

// Process URLs in batches
async function processUrls(urls) {
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(testUrl));
    await new Promise(r => setTimeout(r, 100)); // Small delay
  }
}

// Main
async function main() {
  console.log('🚀 COMPREHENSIVE SITEMAP URL TEST');
  console.log('=================================\n');

  // Check server
  console.log('🔍 Checking server...');
  try {
    await new Promise((resolve, reject) => {
      http
        .get(BASE_URL, res => {
          if (res.statusCode === 200 || res.statusCode === 404) {
            resolve();
          } else {
            reject(new Error(`Server returned ${res.statusCode}`));
          }
        })
        .on('error', reject);
    });
    console.log('✅ Server is ready\n');
  } catch (e) {
    console.error('❌ Server not running. Starting server...');

    // Start server
    const { spawn } = require('child_process');
    const server = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      detached: true,
    });

    console.log('⏳ Waiting for server to start...');
    await new Promise(r => setTimeout(r, 30000)); // Wait 30 seconds
  }

  // Load sitemap URLs
  console.log('📥 Loading sitemap URLs...');
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const urls = await parseSitemap(sitemapPath);

  // Deduplicate
  const uniqueUrls = [...new Set(urls)];
  results.total = uniqueUrls.length;

  console.log(`✅ Found ${results.total} unique URLs\n`);
  console.log('🧪 Testing all URLs...\n');

  // Test all
  await processUrls(uniqueUrls);

  // Report
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

  await fs.writeFile('sitemap-test-final-report.json', JSON.stringify(report, null, 2));

  if (results.errors.length > 0) {
    console.log('\n❌ FAILED URLS:');

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
      if (urls.length > 5) console.log(`  ... and ${urls.length - 5} more`);
    });

    // Save failed URLs
    const failedList = results.errors
      .map(e => `${e.url} | ${e.error || `HTTP ${e.status}`}`)
      .join('\n');
    await fs.writeFile('failed-urls-final.txt', failedList);
  }

  console.log('\n✅ Reports saved:');
  console.log('  - sitemap-test-final-report.json');
  if (results.errors.length > 0) {
    console.log('  - failed-urls-final.txt');
  }

  if (results.failed === 0) {
    console.log('\n🎉 PERFECT! All URLs passed!');
  } else {
    console.log(`\n⚠️  ${results.failed} URLs failed`);
  }

  process.exit(results.failed > 0 ? 1 : 0);
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
