#!/usr/bin/env node

const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

console.log('\n🧪 Vasquez Law Firm - Complete Site & Navigation Test');
console.log('='.repeat(60));
console.log('Testing ALL pages from sitemaps and navigation links...\n');

// Configuration
const BASE_URL = 'http://localhost:3000';
const TEST_TIMEOUT = 10000; // 10 seconds per test
const BATCH_SIZE = 20; // Test pages in batches

// Test results
const results = {
  passed: 0,
  failed: 0,
  errors: [],
  warnings: [],
  navigationLinks: new Map(),
  brokenLinks: [],
  startTime: Date.now(),
  testedUrls: new Set(),
};

// HTTP request wrapper
function makeRequest(url, timeout = TEST_TIMEOUT) {
  return new Promise(resolve => {
    const req = http.get(url, { timeout }, res => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on('error', err => {
      resolve({
        status: 0,
        error: err.message,
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        status: 0,
        error: 'Request timeout',
      });
    });
  });
}

// Parse sitemap files from public directory
async function getAllSitemapUrls() {
  console.log('📋 Loading URLs from sitemap files...');
  const urls = new Set();
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

  const parser = new xml2js.Parser();

  for (const file of sitemapFiles) {
    const filePath = path.join(process.cwd(), 'public', file);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Clean XML
        const cleanedXml = content.replace(/&(?!(?:amp|lt|gt|quot|apos);)/g, '&amp;');

        const result = await parser.parseStringPromise(cleanedXml);
        if (result.urlset && result.urlset.url) {
          result.urlset.url.forEach(urlEntry => {
            if (urlEntry.loc && urlEntry.loc[0]) {
              const url = urlEntry.loc[0]
                .replace('https://www.vasquezlawnc.com', '')
                .replace('https://vasquezlawnc.com', '')
                .replace('http://www.vasquezlawnc.com', '')
                .replace('http://vasquezlawnc.com', '');
              urls.add(url || '/');
            }
          });
        }
        console.log(`  ✓ Loaded ${file}`);
      } catch (error) {
        console.error(`  ✗ Error loading ${file}: ${error.message}`);
      }
    }
  }

  console.log(`✅ Found ${urls.size} unique URLs from sitemaps\n`);
  return Array.from(urls);
}

// Extract navigation links from HTML
function extractNavigationLinks(html, currentUrl) {
  const links = new Set();

  // Navigation areas to check
  const navPatterns = [
    /<nav[^>]*>([\s\S]*?)<\/nav>/gi,
    /<header[^>]*>([\s\S]*?)<\/header>/gi,
    /<footer[^>]*>([\s\S]*?)<\/footer>/gi,
    /class="[^"]*menu[^"]*"[^>]*>([\s\S]*?)<\/[^>]+>/gi,
    /class="[^"]*nav[^"]*"[^>]*>([\s\S]*?)<\/[^>]+>/gi,
  ];

  navPatterns.forEach(pattern => {
    const matches = html.matchAll(pattern);
    for (const match of matches) {
      const navContent = match[0];
      const hrefPattern = /href=["']([^"']+)["']/gi;
      const hrefMatches = navContent.matchAll(hrefPattern);

      for (const hrefMatch of hrefMatches) {
        let link = hrefMatch[1];

        // Skip external, special links
        if (
          link.startsWith('http') ||
          link.startsWith('#') ||
          link.startsWith('mailto:') ||
          link.startsWith('tel:') ||
          link.startsWith('javascript:')
        ) {
          continue;
        }

        // Normalize link
        if (!link.startsWith('/')) {
          link = '/' + link;
        }
        link = link.replace(/\/+/g, '/').split('?')[0].split('#')[0];

        if (link && link !== currentUrl) {
          links.add(link);
        }
      }
    }
  });

  return Array.from(links);
}

// Test individual page
async function testPage(url) {
  if (results.testedUrls.has(url)) return;
  results.testedUrls.add(url);

  const fullUrl = `${BASE_URL}${url}`;
  const startTime = Date.now();

  try {
    const response = await makeRequest(fullUrl);
    const duration = Date.now() - startTime;

    if (response.error) {
      console.log(`❌ ${url} - Network Error: ${response.error}`);
      results.failed++;
      results.errors.push({ url, error: response.error });
      return;
    }

    if (response.status === 200) {
      console.log(`✅ ${url} - ${response.status} (${duration}ms)`);
      results.passed++;

      // Extract navigation links
      if (response.body && !url.includes('.xml')) {
        const navLinks = extractNavigationLinks(response.body, url);
        if (navLinks.length > 0) {
          results.navigationLinks.set(url, navLinks);
        }
      }
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
  } catch (error) {
    console.log(`❌ ${url} - Error: ${error.message}`);
    results.failed++;
    results.errors.push({ url, error: error.message });
  }
}

// Test navigation links
async function testNavigationLinks() {
  console.log('\n🔗 Testing navigation links...\n');

  const allNavLinks = new Set();
  results.navigationLinks.forEach(links => {
    links.forEach(link => allNavLinks.add(link));
  });

  console.log(`Found ${allNavLinks.size} unique navigation links to test\n`);

  let tested = 0;
  for (const link of allNavLinks) {
    if (!results.testedUrls.has(link)) {
      const response = await makeRequest(`${BASE_URL}${link}`, 5000);
      tested++;

      if (response.status >= 400 || response.error) {
        results.brokenLinks.push({
          link,
          status: response.status || 'error',
          error: response.error,
        });
        console.log(`  ❌ ${link} - ${response.status || response.error}`);
      } else {
        console.log(`  ✅ ${link} - ${response.status}`);
      }

      if (tested % 10 === 0) {
        console.log(`  Progress: ${tested}/${allNavLinks.size} links tested...`);
      }
    }
  }
}

// Generate summary report
function generateReport() {
  const duration = ((Date.now() - results.startTime) / 1000).toFixed(2);

  const report = {
    summary: {
      totalUrlsTested: results.testedUrls.size,
      passed: results.passed,
      failed: results.failed,
      warnings: results.warnings.length,
      duration: `${duration}s`,
      timestamp: new Date().toISOString(),
    },
    navigationAnalysis: {
      pagesWithNavigation: results.navigationLinks.size,
      totalNavigationLinks: Array.from(results.navigationLinks.values()).reduce(
        (sum, links) => sum + links.length,
        0
      ),
      brokenNavigationLinks: results.brokenLinks.length,
    },
    errors: results.errors,
    warnings: results.warnings,
    brokenLinks: results.brokenLinks,
  };

  // Save report
  fs.writeFileSync('navigation-test-report.json', JSON.stringify(report, null, 2));

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total URLs Tested: ${report.summary.totalUrlsTested}`);
  console.log(`✅ Passed: ${report.summary.passed}`);
  console.log(`❌ Failed: ${report.summary.failed}`);
  console.log(`⚠️  Warnings: ${report.summary.warnings}`);
  console.log(`⏱️  Duration: ${report.summary.duration}`);

  console.log('\n🔗 NAVIGATION ANALYSIS:');
  console.log(`   Pages with navigation: ${report.navigationAnalysis.pagesWithNavigation}`);
  console.log(`   Total navigation links: ${report.navigationAnalysis.totalNavigationLinks}`);
  console.log(`   Broken navigation links: ${report.navigationAnalysis.brokenNavigationLinks}`);

  if (results.errors.length > 0) {
    console.log('\n❌ ERRORS:');
    const errorTypes = {};
    results.errors.forEach(err => {
      const type = err.status || err.error || 'unknown';
      errorTypes[type] = (errorTypes[type] || 0) + 1;
    });
    Object.entries(errorTypes).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} pages`);
    });
  }

  if (results.brokenLinks.length > 0) {
    console.log('\n🔗 BROKEN NAVIGATION LINKS:');
    results.brokenLinks.slice(0, 10).forEach(link => {
      console.log(`   ${link.link} - ${link.status} ${link.error || ''}`);
    });
    if (results.brokenLinks.length > 10) {
      console.log(`   ... and ${results.brokenLinks.length - 10} more`);
    }
  }

  console.log('\n📄 Detailed report saved to: navigation-test-report.json');

  if (results.failed === 0 && results.brokenLinks.length === 0) {
    console.log('\n✅ SUCCESS! All pages and navigation links are working correctly.');
  } else {
    console.log(
      `\n⚠️  Found ${results.failed} page errors and ${results.brokenLinks.length} broken navigation links.`
    );
  }
}

// Start dev server
function startDevServer() {
  return new Promise((resolve, reject) => {
    console.log('Starting development server...');

    const devServer = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      env: { ...process.env, NODE_ENV: 'development' },
    });

    let serverReady = false;

    devServer.stdout.on('data', data => {
      if (data.toString().includes('Ready') && !serverReady) {
        serverReady = true;
        console.log('✅ Development server started\n');
        setTimeout(() => resolve(devServer), 3000);
      }
    });

    devServer.stderr.on('data', data => {
      if (!data.toString().includes('Warning')) {
        console.error('Server error:', data.toString());
      }
    });

    setTimeout(() => {
      if (!serverReady) {
        reject(new Error('Server failed to start'));
      }
    }, 30000);
  });
}

// Main test runner
async function runTests() {
  let devServer;

  try {
    // Start server
    devServer = await startDevServer();

    // Get all URLs from sitemaps
    const sitemapUrls = await getAllSitemapUrls();

    // Test all pages in batches
    console.log('📋 Testing all pages...\n');
    for (let i = 0; i < sitemapUrls.length; i += BATCH_SIZE) {
      const batch = sitemapUrls.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(url => testPage(url)));

      // Progress update
      if ((i + BATCH_SIZE) % 100 === 0) {
        console.log(
          `\nProgress: ${Math.min(i + BATCH_SIZE, sitemapUrls.length)}/${sitemapUrls.length} pages tested...\n`
        );
      }
    }

    // Test navigation links
    await testNavigationLinks();

    // Generate report
    generateReport();
  } catch (error) {
    console.error('Fatal error:', error.message);
  } finally {
    if (devServer) {
      console.log('\nStopping server...');
      devServer.kill();
    }
    process.exit(results.failed > 0 || results.brokenLinks.length > 0 ? 1 : 0);
  }
}

// Run the tests
runTests();
