#!/usr/bin/env node

const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

console.log('\n🧪 Vasquez Law Firm - Sitemap Pages Test');
console.log('='.repeat(60));
console.log('Testing ONLY pages that are in the sitemap...\n');

const BASE_URL = 'http://localhost:3000';
const results = {
  passed: 0,
  failed: 0,
  errors: [],
  warnings: [],
  startTime: Date.now(),
};

// Simple HTTP request
function testUrl(url) {
  return new Promise(resolve => {
    http
      .get(url, { timeout: 10000 }, res => {
        let data = '';
        res.on('data', chunk => (data += chunk));
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
      })
      .on('error', err => {
        resolve({ status: 0, error: err.message });
      })
      .on('timeout', function () {
        this.destroy();
        resolve({ status: 0, error: 'Timeout' });
      });
  });
}

// Parse sitemap and get URLs
async function getSitemapUrls() {
  console.log('📋 Loading URLs from sitemap-complete.xml...');
  const urls = [];

  try {
    const content = fs.readFileSync('public/sitemap-complete.xml', 'utf8');
    const cleanedXml = content.replace(/&(?!(?:amp|lt|gt|quot|apos);)/g, '&amp;');

    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(cleanedXml);

    if (result.urlset && result.urlset.url) {
      result.urlset.url.forEach(urlEntry => {
        if (urlEntry.loc && urlEntry.loc[0]) {
          const url = urlEntry.loc[0]
            .replace('https://www.vasquezlawnc.com', '')
            .replace('http://www.vasquezlawnc.com', '');
          urls.push(url || '/');
        }
      });
    }

    console.log(`✅ Found ${urls.length} URLs in sitemap\n`);
  } catch (error) {
    console.error('Error parsing sitemap:', error.message);
  }

  return urls;
}

// Test a batch of pages
async function testBatch(urls, startIndex, batchSize) {
  const endIndex = Math.min(startIndex + batchSize, urls.length);
  const batch = urls.slice(startIndex, endIndex);

  const results = await Promise.all(
    batch.map(async url => {
      const fullUrl = `${BASE_URL}${url}`;
      const response = await testUrl(fullUrl);
      return { url, response };
    })
  );

  results.forEach(({ url, response }) => {
    if (response.error) {
      console.log(`❌ ${url} - ${response.error}`);
      results.failed++;
      results.errors.push({ url, error: response.error });
    } else if (response.status === 200) {
      console.log(`✅ ${url} - ${response.status}`);
      results.passed++;
    } else if (response.status === 404) {
      console.log(`❌ ${url} - 404 Not Found`);
      results.failed++;
      results.errors.push({ url, status: 404 });
    } else if (response.status >= 500) {
      console.log(`❌ ${url} - ${response.status} Server Error`);
      results.failed++;
      results.errors.push({ url, status: response.status });
    } else if (response.status >= 300 && response.status < 400) {
      console.log(`↗️  ${url} - ${response.status} Redirect`);
      results.passed++;
    } else {
      console.log(`⚠️  ${url} - ${response.status}`);
      results.warnings.push({ url, status: response.status });
    }
  });
}

// Main test function
async function runTest() {
  let devServer;

  try {
    // Start dev server
    console.log('Starting development server...');
    devServer = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      env: { ...process.env, NODE_ENV: 'development' },
    });

    // Wait for server to start
    await new Promise((resolve, reject) => {
      let serverReady = false;
      const timeout = setTimeout(() => {
        if (!serverReady) reject(new Error('Server failed to start'));
      }, 30000);

      devServer.stdout.on('data', data => {
        if (data.toString().includes('Ready') && !serverReady) {
          serverReady = true;
          clearTimeout(timeout);
          console.log('✅ Server started\n');
          setTimeout(resolve, 3000); // Give it 3s to fully start
        }
      });

      devServer.stderr.on('data', data => {
        const error = data.toString();
        if (!error.includes('Warning') && !error.includes('webpack')) {
          console.error('Server error:', error);
        }
      });
    });

    // Get sitemap URLs
    const urls = await getSitemapUrls();

    if (urls.length === 0) {
      console.error('No URLs found in sitemap!');
      return;
    }

    // Test in batches of 20
    console.log('Testing pages...\n');
    const batchSize = 20;

    for (let i = 0; i < urls.length; i += batchSize) {
      await testBatch(urls, i, batchSize);

      // Progress update every 100 pages
      if ((i + batchSize) % 100 === 0) {
        const progress = Math.min(i + batchSize, urls.length);
        console.log(
          `\nProgress: ${progress}/${urls.length} pages tested (${Math.round((progress / urls.length) * 100)}%)\n`
        );
      }
    }

    // Print summary
    const duration = ((Date.now() - results.startTime) / 1000).toFixed(2);

    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total URLs from Sitemap: ${urls.length}`);
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log(`⚠️  Warnings: ${results.warnings.length}`);
    console.log(`⏱️  Duration: ${duration}s`);

    if (results.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      const errorTypes = {};
      results.errors.forEach(err => {
        const type = err.status || err.error;
        errorTypes[type] = (errorTypes[type] || 0) + 1;
      });

      Object.entries(errorTypes).forEach(([type, count]) => {
        console.log(`   ${type}: ${count} pages`);
      });

      // Show first 10 error URLs
      console.log('\n   Sample error URLs:');
      results.errors.slice(0, 10).forEach(err => {
        console.log(`   - ${err.url}`);
      });
    }

    const successRate = ((results.passed / (results.passed + results.failed)) * 100).toFixed(1);
    console.log(`\nSuccess Rate: ${successRate}%`);

    if (successRate >= 95) {
      console.log('✅ EXCELLENT! Site is in great shape.');
    } else if (successRate >= 90) {
      console.log('⚠️  GOOD! But some issues need attention.');
    } else {
      console.log('❌ NEEDS WORK! Many pages are failing.');
    }
  } catch (error) {
    console.error('Fatal error:', error.message);
  } finally {
    if (devServer) {
      console.log('\nStopping server...');
      devServer.kill();
    }
  }
}

// Run the test
runTest();
