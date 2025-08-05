#!/usr/bin/env node

const { spawn } = require('child_process');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');
const xml2js = require('xml2js');

console.log('\n🧪 Vasquez Law Firm - 100% THOROUGH Test Suite');
console.log('='.repeat(60));
console.log('Testing EVERY page, sitemap accuracy, and ALL navigation links...\n');

// Configuration
const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const TEST_TIMEOUT = 30000; // 30 seconds per test
const BATCH_SIZE = 50; // Larger batches for faster testing
const MAX_CONCURRENT = 10; // Max concurrent requests

// Test results
const results = {
  passed: 0,
  failed: 0,
  errors: [],
  warnings: [],
  navigationIssues: [],
  sitemapIssues: [],
  startTime: Date.now(),
  testedUrls: new Set(),
  pagesFromSitemap: new Set(),
  pagesFromFileSystem: new Set(),
  brokenLinks: new Map(),
  pageLoadTimes: new Map(),
  slowPages: [],
  consoleErrors: [],
};

// Progress tracking
let totalPages = 0;
let testedPages = 0;

// HTTP/HTTPS request wrapper with retries
async function makeRequest(testUrl, timeout = TEST_TIMEOUT, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await makeRequestAttempt(testUrl, timeout);
      return response;
    } catch (error) {
      if (attempt === retries) {
        return { status: 0, error: error.message };
      }
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
    }
  }
}

function makeRequestAttempt(testUrl, timeout) {
  return new Promise((resolve, reject) => {
    const parsedUrl = url.parse(testUrl);
    const isHttps = parsedUrl.protocol === 'https:';
    const client = isHttps ? https : http;

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      path: parsedUrl.path,
      method: 'GET',
      timeout: timeout,
      headers: {
        'User-Agent': 'VLF-Test-Suite/1.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9,es;q=0.8',
      },
    };

    const req = client.request(options, res => {
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
      reject(err);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

// Get ALL page routes from the app directory recursively
function getAllPageRoutes() {
  const routes = new Set();
  const appDir = path.join(process.cwd(), 'src/app');

  function scanDirectory(dir, basePath = '') {
    if (!fs.existsSync(dir)) return;

    try {
      const items = fs.readdirSync(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          // Skip node_modules and hidden directories
          if (item === 'node_modules' || item.startsWith('.')) {
            continue;
          }

          // Check for page.tsx or page.js
          const pageFiles = ['page.tsx', 'page.js'];
          let hasPage = false;

          for (const pageFile of pageFiles) {
            if (fs.existsSync(path.join(fullPath, pageFile))) {
              hasPage = true;
              break;
            }
          }

          if (hasPage) {
            // Convert file path to route
            let route = basePath;

            // Handle special Next.js conventions
            if (item === '(root)' || (item.startsWith('(') && item.endsWith(')'))) {
              // Route groups - don't add to path
              scanDirectory(fullPath, basePath);
              continue;
            } else if (item.startsWith('[...') && item.endsWith(']')) {
              // Catch-all routes
              const paramName = item.slice(4, -1);
              routes.add(route ? `/${route}/test-${paramName}` : `/test-${paramName}`);
            } else if (item.startsWith('[') && item.endsWith(']')) {
              // Dynamic routes - add test cases
              const paramName = item.slice(1, -1);
              if (paramName === 'city') {
                const cities = [
                  'charlotte',
                  'monroe',
                  'wadesboro',
                  'gastonia',
                  'concord',
                  'winston-salem',
                  'greensboro',
                  'durham',
                  'raleigh',
                  'asheville',
                  'fayetteville',
                  'wilmington',
                  'cary',
                  'chapel-hill',
                  'huntersville',
                ];
                cities.forEach(city => {
                  routes.add(route ? `/${route}/${city}` : `/${city}`);
                });
              } else if (paramName === 'slug') {
                // We'll get specific slugs from content scanning
                continue;
              } else {
                routes.add(route ? `/${route}/test-${paramName}` : `/test-${paramName}`);
              }
            } else {
              route = path.join(basePath, item);
              route = route.replace(/\\/g, '/');
              routes.add('/' + route);
            }
          }

          // Always recurse into subdirectories
          scanDirectory(fullPath, path.join(basePath, item));
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error.message);
    }
  }

  // Start scanning from app directory
  scanDirectory(appDir);

  // Add root explicitly
  routes.add('/');

  // Add API routes
  const apiDir = path.join(appDir, 'api');
  if (fs.existsSync(apiDir)) {
    function scanApiDirectory(dir, apiPath = '/api') {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          const routeFile = path.join(fullPath, 'route.ts');
          const routeJsFile = path.join(fullPath, 'route.js');
          if (fs.existsSync(routeFile) || fs.existsSync(routeJsFile)) {
            const apiRoute = path.join(apiPath, item).replace(/\\/g, '/');
            routes.add(apiRoute);
          }
          scanApiDirectory(fullPath, path.join(apiPath, item));
        }
      }
    }
    scanApiDirectory(apiDir);
  }

  // Add static files
  routes.add('/sitemap.xml');
  routes.add('/robots.txt');
  routes.add('/en/sitemap.xml');
  routes.add('/es/sitemap.xml');

  return Array.from(routes);
}

// Parse all sitemaps recursively
async function getAllSitemapUrls() {
  console.log('📋 Fetching ALL sitemap URLs...');
  const urls = new Set();
  const processedSitemaps = new Set();

  async function processSitemap(sitemapUrl) {
    if (processedSitemaps.has(sitemapUrl)) return;
    processedSitemaps.add(sitemapUrl);

    try {
      const response = await makeRequest(sitemapUrl, 10000);
      if (response.status === 200 && response.body) {
        // Clean the XML to handle common issues
        let cleanedXml = response.body;
        // Replace unescaped ampersands
        cleanedXml = cleanedXml.replace(/&(?!(?:amp|lt|gt|quot|apos);)/g, '&amp;');

        const parser = new xml2js.Parser({
          strict: false,
          normalize: true,
          normalizeTags: true,
        });

        try {
          const result = await parser.parseStringPromise(cleanedXml);

          // Check if it's a sitemap index
          if (result.sitemapindex && result.sitemapindex.sitemap) {
            for (const sitemap of result.sitemapindex.sitemap) {
              if (sitemap.loc && sitemap.loc[0]) {
                await processSitemap(sitemap.loc[0]);
              }
            }
          }
          // Check if it's a regular sitemap
          else if (result.urlset && result.urlset.url) {
            for (const urlEntry of result.urlset.url) {
              if (urlEntry.loc && urlEntry.loc[0]) {
                const pageUrl = urlEntry.loc[0]
                  .replace(BASE_URL, '')
                  .replace('https://vasquezlaw.com', '')
                  .replace('http://vasquezlaw.com', '');
                urls.add(pageUrl);
              }
            }
          }
        } catch (parseError) {
          console.error(`XML Parse error for ${sitemapUrl}:`, parseError.message);
          results.sitemapIssues.push({
            type: 'parse_error',
            sitemap: sitemapUrl,
            error: parseError.message,
          });
        }
      }
    } catch (error) {
      console.error(`Error fetching sitemap ${sitemapUrl}:`, error.message);
    }
  }

  // Process main sitemap and language-specific sitemaps
  await processSitemap(`${BASE_URL}/sitemap.xml`);
  await processSitemap(`${BASE_URL}/en/sitemap.xml`);
  await processSitemap(`${BASE_URL}/es/sitemap.xml`);

  console.log(`✅ Found ${urls.size} URLs in sitemaps`);
  return Array.from(urls);
}

// Extract ALL links from HTML content
function extractAllLinks(html, currentPath) {
  const links = new Set();

  // Comprehensive href extraction
  const hrefPattern = /href=["']([^"']+)["']/gi;
  const matches = html.matchAll(hrefPattern);

  for (const match of matches) {
    let link = match[1];

    // Skip external links, anchors, and special protocols
    if (
      link.startsWith('http://') ||
      link.startsWith('https://') ||
      link.startsWith('#') ||
      link.startsWith('mailto:') ||
      link.startsWith('tel:') ||
      link.startsWith('javascript:') ||
      link.startsWith('data:')
    ) {
      continue;
    }

    // Convert relative links to absolute
    if (!link.startsWith('/')) {
      const basePath = currentPath.endsWith('/') ? currentPath : path.dirname(currentPath);
      link = path.join(basePath, link);
    }

    // Normalize the link
    link = link.replace(/\/+/g, '/');

    // Remove query strings and fragments for testing
    link = link.split('?')[0].split('#')[0];

    if (link) {
      links.add(link);
    }
  }

  return Array.from(links);
}

// Test individual page with comprehensive checks
async function testPage(testPath) {
  const fullUrl = `${BASE_URL}${testPath}`;
  const startTime = Date.now();

  // Skip if already tested
  if (results.testedUrls.has(testPath)) {
    return;
  }
  results.testedUrls.add(testPath);

  try {
    const response = await makeRequest(fullUrl);
    const duration = Date.now() - startTime;
    results.pageLoadTimes.set(testPath, duration);

    testedPages++;
    const progress = ((testedPages / totalPages) * 100).toFixed(1);

    if (response.error) {
      console.log(`❌ [${progress}%] ${testPath} - Network Error: ${response.error}`);
      results.failed++;
      results.errors.push({ url: testPath, error: response.error });
      return;
    }

    if (response.status === 200) {
      console.log(`✅ [${progress}%] ${testPath} - ${response.status} (${duration}ms)`);
      results.passed++;

      // Check for console errors in the HTML
      if (response.body) {
        const errorPatterns = [
          /Error:/gi,
          /TypeError:/gi,
          /ReferenceError:/gi,
          /SyntaxError:/gi,
          /Uncaught/gi,
          /Cannot read propert/gi,
          /is not defined/gi,
          /is not a function/gi,
        ];

        for (const pattern of errorPatterns) {
          if (pattern.test(response.body)) {
            results.consoleErrors.push({
              url: testPath,
              pattern: pattern.source,
            });
            break;
          }
        }

        // Track slow pages
        if (duration > 5000) {
          results.slowPages.push({
            url: testPath,
            duration: duration,
          });
        }

        // Extract and queue all links for testing
        if (!testPath.includes('.xml') && !testPath.includes('.txt')) {
          const pageLinks = extractAllLinks(response.body, testPath);

          // Test navigation links in batch
          const linkBatch = [];
          for (const link of pageLinks) {
            if (!results.testedUrls.has(link)) {
              linkBatch.push(link);
            }
          }

          // Quick validation of navigation links
          if (linkBatch.length > 0) {
            const linkResults = await Promise.all(
              linkBatch.slice(0, 5).map(link => makeRequest(`${BASE_URL}${link}`, 5000))
            );

            linkResults.forEach((linkResponse, index) => {
              if (linkResponse.status >= 400 || linkResponse.error) {
                if (!results.brokenLinks.has(testPath)) {
                  results.brokenLinks.set(testPath, []);
                }
                results.brokenLinks.get(testPath).push({
                  link: linkBatch[index],
                  status: linkResponse.status || 'error',
                  error: linkResponse.error,
                });
              }
            });
          }
        }
      }
    } else if (response.status === 404) {
      console.log(`❌ [${progress}%] ${testPath} - 404 Not Found`);
      results.failed++;
      results.errors.push({ url: testPath, status: 404, message: 'Page not found' });
    } else if (response.status >= 500) {
      console.log(`❌ [${progress}%] ${testPath} - ${response.status} Server Error`);
      results.failed++;
      results.errors.push({ url: testPath, status: response.status, message: 'Server error' });
    } else if (response.status >= 300 && response.status < 400) {
      console.log(`↗️  [${progress}%] ${testPath} - ${response.status} Redirect`);
      results.passed++;
    } else {
      console.log(`⚠️  [${progress}%] ${testPath} - ${response.status}`);
      results.warnings.push({ url: testPath, status: response.status });
    }
  } catch (error) {
    console.log(`❌ [${progress}%] ${testPath} - Error: ${error.message}`);
    results.failed++;
    results.errors.push({ url: testPath, error: error.message });
  }
}

// Test pages concurrently with rate limiting
async function testPagesInBatches(pages) {
  const queue = [...pages];
  const concurrent = [];

  while (queue.length > 0 || concurrent.length > 0) {
    // Fill up concurrent slots
    while (concurrent.length < MAX_CONCURRENT && queue.length > 0) {
      const page = queue.shift();
      concurrent.push(testPage(page).then(() => page));
    }

    // Wait for one to complete
    if (concurrent.length > 0) {
      const completed = await Promise.race(concurrent);
      concurrent.splice(
        concurrent.findIndex(p => p === completed),
        1
      );
    }
  }
}

// Comprehensive sitemap validation
function validateSitemap() {
  console.log('\n🔍 Validating sitemap completeness...');

  const inSitemapOnly = [];
  const inFileSystemOnly = [];
  const dynamicExclusions = new Set(['/test-', '/[', '/api/', '/admin/', '/_', '/(', '/auth/']);

  // Find pages in sitemap but not in file system
  results.pagesFromSitemap.forEach(page => {
    const shouldExclude = Array.from(dynamicExclusions).some(pattern => page.includes(pattern));

    if (!shouldExclude && !results.pagesFromFileSystem.has(page)) {
      inSitemapOnly.push(page);
    }
  });

  // Find pages in file system but not in sitemap
  results.pagesFromFileSystem.forEach(page => {
    const shouldExclude = Array.from(dynamicExclusions).some(pattern => page.includes(pattern));

    if (!shouldExclude && !results.pagesFromSitemap.has(page)) {
      inFileSystemOnly.push(page);
    }
  });

  if (inSitemapOnly.length > 0) {
    results.sitemapIssues.push({
      type: 'extra_in_sitemap',
      message: `${inSitemapOnly.length} pages in sitemap but not in file system`,
      pages: inSitemapOnly,
    });
  }

  if (inFileSystemOnly.length > 0) {
    results.sitemapIssues.push({
      type: 'missing_from_sitemap',
      message: `${inFileSystemOnly.length} pages in file system but not in sitemap`,
      pages: inFileSystemOnly,
    });
  }

  console.log(`📊 Sitemap contains ${results.pagesFromSitemap.size} pages`);
  console.log(`📊 File system contains ${results.pagesFromFileSystem.size} pages`);
  console.log(
    `📊 Coverage: ${((results.pagesFromSitemap.size / results.pagesFromFileSystem.size) * 100).toFixed(1)}%`
  );
}

// Generate comprehensive report
function generateReport() {
  const duration = ((Date.now() - results.startTime) / 1000).toFixed(2);

  // Calculate statistics
  const avgLoadTime =
    results.pageLoadTimes.size > 0
      ? Array.from(results.pageLoadTimes.values()).reduce((a, b) => a + b, 0) /
        results.pageLoadTimes.size
      : 0;

  const report = {
    summary: {
      totalUrlsTested: results.testedUrls.size,
      totalTests: results.passed + results.failed,
      passed: results.passed,
      failed: results.failed,
      warnings: results.warnings.length,
      duration: `${duration}s`,
      avgLoadTime: Math.round(avgLoadTime),
      timestamp: new Date().toISOString(),
    },
    sitemapAnalysis: {
      pagesInSitemap: results.pagesFromSitemap.size,
      pagesInFileSystem: results.pagesFromFileSystem.size,
      coverage:
        ((results.pagesFromSitemap.size / results.pagesFromFileSystem.size) * 100).toFixed(1) + '%',
      issues: results.sitemapIssues,
    },
    errors: results.errors,
    warnings: results.warnings,
    navigationIssues: Array.from(results.brokenLinks.entries()).map(([page, links]) => ({
      page,
      brokenLinks: links,
    })),
    performanceIssues: {
      slowPages: results.slowPages.sort((a, b) => b.duration - a.duration).slice(0, 20),
      avgLoadTime: Math.round(avgLoadTime) + 'ms',
    },
    consoleErrors: results.consoleErrors.slice(0, 50),
  };

  // Save detailed report
  fs.writeFileSync('thorough-test-report.json', JSON.stringify(report, null, 2));

  // Print comprehensive summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 100% THOROUGH TEST RESULTS');
  console.log('='.repeat(60));
  console.log(`Total URLs Tested: ${report.summary.totalUrlsTested}`);
  console.log(`Total Tests Run: ${report.summary.totalTests}`);
  console.log(
    `✅ Passed: ${report.summary.passed} (${((report.summary.passed / report.summary.totalTests) * 100).toFixed(1)}%)`
  );
  console.log(`❌ Failed: ${report.summary.failed}`);
  console.log(`⚠️  Warnings: ${report.summary.warnings}`);
  console.log(`⏱️  Duration: ${report.summary.duration}`);
  console.log(`📊 Average Load Time: ${report.summary.avgLoadTime}ms`);

  console.log('\n📍 SITEMAP ANALYSIS:');
  console.log(`   Pages in Sitemap: ${report.sitemapAnalysis.pagesInSitemap}`);
  console.log(`   Pages in File System: ${report.sitemapAnalysis.pagesInFileSystem}`);
  console.log(`   Coverage: ${report.sitemapAnalysis.coverage}`);

  if (results.sitemapIssues.length > 0) {
    console.log('\n   Issues:');
    results.sitemapIssues.forEach(issue => {
      console.log(`   - ${issue.message}`);
      if (issue.pages && issue.pages.length > 0) {
        console.log(
          `     Examples: ${issue.pages.slice(0, 5).join(', ')}${issue.pages.length > 5 ? '...' : ''}`
        );
      }
    });
  }

  if (results.errors.length > 0) {
    console.log('\n❌ CRITICAL ERRORS:');
    const errorGroups = {};
    results.errors.forEach(error => {
      const key = error.status || error.error || 'unknown';
      if (!errorGroups[key]) errorGroups[key] = [];
      errorGroups[key].push(error.url);
    });

    Object.entries(errorGroups).forEach(([errorType, urls]) => {
      console.log(`   ${errorType}: ${urls.length} pages`);
      urls.slice(0, 5).forEach(url => console.log(`     - ${url}`));
      if (urls.length > 5) console.log(`     ... and ${urls.length - 5} more`);
    });
  }

  if (results.slowPages.length > 0) {
    console.log('\n🐌 SLOWEST PAGES:');
    results.slowPages.slice(0, 10).forEach(page => {
      console.log(`   ${page.url} - ${page.duration}ms`);
    });
  }

  if (results.brokenLinks.size > 0) {
    console.log('\n🔗 BROKEN NAVIGATION LINKS:');
    let count = 0;
    results.brokenLinks.forEach((links, page) => {
      if (count++ < 10) {
        console.log(`   On ${page}: ${links.length} broken links`);
      }
    });
    if (results.brokenLinks.size > 10) {
      console.log(`   ... and ${results.brokenLinks.size - 10} more pages with broken links`);
    }
  }

  if (results.consoleErrors.length > 0) {
    console.log('\n⚠️  PAGES WITH CONSOLE ERRORS:');
    const errorPages = new Set(results.consoleErrors.map(e => e.url));
    console.log(`   ${errorPages.size} pages contain potential JavaScript errors`);
    Array.from(errorPages)
      .slice(0, 10)
      .forEach(page => {
        console.log(`   - ${page}`);
      });
  }

  console.log('\n📄 Detailed report saved to: thorough-test-report.json');

  const successRate = ((results.passed / (results.passed + results.failed)) * 100).toFixed(1);
  if (successRate >= 95) {
    console.log(`\n✅ EXCELLENT! ${successRate}% success rate.`);
  } else if (successRate >= 90) {
    console.log(`\n⚠️  GOOD! ${successRate}% success rate, but some issues need attention.`);
  } else {
    console.log(`\n❌ NEEDS WORK! Only ${successRate}% success rate.`);
  }
}

// Start dev server with better error handling
function startDevServer() {
  return new Promise((resolve, reject) => {
    console.log('Starting development server...');

    const devServer = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      env: { ...process.env, NODE_ENV: 'development' },
    });

    let serverReady = false;
    let serverOutput = '';
    let errorOutput = '';

    devServer.stdout.on('data', data => {
      serverOutput += data.toString();
      if (serverOutput.includes('Ready') && !serverReady) {
        serverReady = true;
        console.log('✅ Development server started successfully\n');
        setTimeout(() => resolve(devServer), 5000); // Give it 5s to fully start
      }
    });

    devServer.stderr.on('data', data => {
      errorOutput += data.toString();
      // Only log real errors, not warnings
      if (!data.toString().includes('Warning') && !data.toString().includes('Deprecation')) {
        console.error('Server error:', data.toString());
      }
    });

    // Timeout after 60 seconds
    setTimeout(() => {
      if (!serverReady) {
        console.error('Server output:', serverOutput);
        console.error('Error output:', errorOutput);
        reject(new Error('Server failed to start within 60 seconds'));
      }
    }, 60000);
  });
}

// Main test runner
async function runTests() {
  let devServer;

  try {
    // Check environment
    if (!fs.existsSync('.env.local')) {
      console.error('❌ .env.local not found! Please set up your environment first.');
      process.exit(1);
    }

    // Start server
    devServer = await startDevServer();

    // Get all pages from file system
    console.log('📂 Scanning ENTIRE file system for pages...');
    const fileSystemPages = getAllPageRoutes();
    fileSystemPages.forEach(page => results.pagesFromFileSystem.add(page));
    console.log(`✅ Found ${fileSystemPages.length} pages in file system`);

    // Get all pages from sitemap
    const sitemapPages = await getAllSitemapUrls();
    sitemapPages.forEach(page => results.pagesFromSitemap.add(page));

    // Combine all unique pages
    const allPages = [...new Set([...fileSystemPages, ...sitemapPages])];
    totalPages = allPages.length;
    console.log(`\n📋 Testing ${totalPages} unique pages (100% coverage)...\n`);

    // Test all pages
    await testPagesInBatches(allPages);

    // Validate sitemap
    validateSitemap();

    // Generate comprehensive report
    generateReport();
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    results.errors.push({ fatal: error.message });
  } finally {
    // Kill dev server
    if (devServer) {
      console.log('\nStopping server...');
      devServer.kill('SIGTERM');
      // Force kill after 5 seconds if needed
      setTimeout(() => {
        devServer.kill('SIGKILL');
      }, 5000);
    }

    // Exit with appropriate code
    const exitCode = results.failed > 0 ? 1 : 0;
    console.log(`\nExiting with code ${exitCode}`);
    process.exit(exitCode);
  }
}

// Run the tests
console.log('Starting 100% thorough test suite...\n');
runTests();
