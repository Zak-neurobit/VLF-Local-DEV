#!/usr/bin/env node

const { spawn } = require('child_process');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');
const xml2js = require('xml2js');

console.log('\n🧪 Vasquez Law Firm - COMPREHENSIVE All Pages Test');
console.log('='.repeat(60));
console.log('Testing ALL pages, sitemap accuracy, and navigation...\n');

// Configuration
const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const TEST_TIMEOUT = 15000; // 15 seconds per test
const BATCH_SIZE = 10; // Test pages in batches

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
};

// HTTP/HTTPS request wrapper
function makeRequest(testUrl, timeout = TEST_TIMEOUT) {
  return new Promise(resolve => {
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

    req.end();
  });
}

// Get all page routes from the app directory
function getAllPageRoutes() {
  const routes = new Set();
  const appDir = path.join(process.cwd(), 'src/app');

  function scanDirectory(dir, basePath = '') {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip API and special directories
        if (item === 'api' || item.startsWith('_') || item === 'node_modules') {
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
          if (item !== '(root)' && !item.startsWith('(') && !item.endsWith(')')) {
            route = path.join(basePath, item);
          }
          route = route.replace(/\\/g, '/');

          // Handle dynamic routes - add test cases
          if (route.includes('[')) {
            if (route.includes('[city]')) {
              const cities = ['charlotte', 'monroe', 'wadesboro', 'gastonia', 'concord'];
              cities.forEach(city => {
                routes.add('/' + route.replace('[city]', city));
              });
            } else if (route.includes('[slug]')) {
              // Skip generic slug routes as we'll get specific ones from content
              continue;
            } else if (route.includes('[id]')) {
              routes.add('/' + route.replace('[id]', '1'));
            }
          } else {
            routes.add(route ? '/' + route : '/');
          }
        }

        // Recurse into subdirectories
        scanDirectory(fullPath, path.join(basePath, item));
      }
    }
  }

  scanDirectory(appDir);

  // Add static routes
  const staticRoutes = ['/', '/sitemap.xml', '/robots.txt', '/en/sitemap.xml', '/es/sitemap.xml'];

  staticRoutes.forEach(route => routes.add(route));

  return Array.from(routes);
}

// Parse sitemap and extract URLs
async function getSitemapUrls() {
  console.log('📋 Fetching sitemap URLs...');
  const urls = new Set();

  try {
    // Check main sitemap
    const mainSitemap = await makeRequest(`${BASE_URL}/sitemap.xml`);
    if (mainSitemap.status === 200) {
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(mainSitemap.body);

      // Check if it's a sitemap index
      if (result.sitemapindex && result.sitemapindex.sitemap) {
        // It's a sitemap index, fetch sub-sitemaps
        for (const sitemap of result.sitemapindex.sitemap) {
          if (sitemap.loc && sitemap.loc[0]) {
            const subSitemapUrl = sitemap.loc[0];
            const subSitemap = await makeRequest(subSitemapUrl);
            if (subSitemap.status === 200) {
              const subResult = await parser.parseStringPromise(subSitemap.body);
              if (subResult.urlset && subResult.urlset.url) {
                subResult.urlset.url.forEach(urlEntry => {
                  if (urlEntry.loc && urlEntry.loc[0]) {
                    const pageUrl = urlEntry.loc[0].replace(BASE_URL, '');
                    urls.add(pageUrl);
                  }
                });
              }
            }
          }
        }
      } else if (result.urlset && result.urlset.url) {
        // It's a regular sitemap
        result.urlset.url.forEach(urlEntry => {
          if (urlEntry.loc && urlEntry.loc[0]) {
            const pageUrl = urlEntry.loc[0].replace(BASE_URL, '');
            urls.add(pageUrl);
          }
        });
      }
    }

    // Also check language-specific sitemaps
    const langSitemaps = ['/en/sitemap.xml', '/es/sitemap.xml'];
    for (const sitemapPath of langSitemaps) {
      const langSitemap = await makeRequest(`${BASE_URL}${sitemapPath}`);
      if (langSitemap.status === 200) {
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(langSitemap.body);
        if (result.urlset && result.urlset.url) {
          result.urlset.url.forEach(urlEntry => {
            if (urlEntry.loc && urlEntry.loc[0]) {
              const pageUrl = urlEntry.loc[0].replace(BASE_URL, '');
              urls.add(pageUrl);
            }
          });
        }
      }
    }

    console.log(`✅ Found ${urls.size} URLs in sitemaps`);
  } catch (error) {
    console.error('❌ Error parsing sitemap:', error.message);
    results.warnings.push({ type: 'sitemap', message: 'Failed to parse sitemap' });
  }

  return Array.from(urls);
}

// Extract navigation links from HTML
function extractNavigationLinks(html, currentPath) {
  const links = new Set();

  // Extract href attributes from navigation areas
  const navPatterns = [
    /<nav[^>]*>([\s\S]*?)<\/nav>/gi,
    /<header[^>]*>([\s\S]*?)<\/header>/gi,
    /<footer[^>]*>([\s\S]*?)<\/footer>/gi,
  ];

  navPatterns.forEach(pattern => {
    const matches = html.matchAll(pattern);
    for (const match of matches) {
      const navContent = match[1];
      const hrefPattern = /href=["']([^"']+)["']/gi;
      const hrefMatches = navContent.matchAll(hrefPattern);

      for (const hrefMatch of hrefMatches) {
        let link = hrefMatch[1];

        // Skip external links, anchors, and special links
        if (
          link.startsWith('http') ||
          link.startsWith('#') ||
          link.startsWith('mailto:') ||
          link.startsWith('tel:') ||
          link.startsWith('javascript:')
        ) {
          continue;
        }

        // Convert relative links to absolute
        if (!link.startsWith('/')) {
          link = path.join(currentPath, link);
        }

        // Normalize the link
        link = link.replace(/\/+/g, '/');

        links.add(link);
      }
    }
  });

  return Array.from(links);
}

// Test individual page
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

    if (response.error) {
      console.log(`❌ ${testPath} - Network Error: ${response.error}`);
      results.failed++;
      results.errors.push({ url: testPath, error: response.error });
      return;
    }

    if (response.status === 200) {
      console.log(`✅ ${testPath} - ${response.status} (${duration}ms)`);
      results.passed++;

      // Check for console errors in the HTML
      if (response.body) {
        if (
          response.body.includes('Error:') ||
          response.body.includes('TypeError:') ||
          response.body.includes('ReferenceError:')
        ) {
          results.warnings.push({
            url: testPath,
            message: 'Contains potential console errors',
          });
        }

        // Test navigation links
        if (!testPath.includes('.xml') && !testPath.includes('.txt')) {
          const navLinks = extractNavigationLinks(response.body, testPath);
          for (const link of navLinks) {
            // Quick check if link exists
            const linkResponse = await makeRequest(`${BASE_URL}${link}`, 5000);
            if (linkResponse.status >= 400) {
              if (!results.brokenLinks.has(testPath)) {
                results.brokenLinks.set(testPath, []);
              }
              results.brokenLinks.get(testPath).push({
                link,
                status: linkResponse.status,
              });
            }
          }
        }
      }

      // Warn about slow pages
      if (duration > 3000) {
        results.warnings.push({
          url: testPath,
          message: `Slow response time: ${duration}ms`,
        });
      }
    } else if (response.status === 404) {
      console.log(`❌ ${testPath} - 404 Not Found`);
      results.failed++;
      results.errors.push({ url: testPath, status: 404, message: 'Page not found' });
    } else if (response.status >= 500) {
      console.log(`❌ ${testPath} - ${response.status} Server Error`);
      results.failed++;
      results.errors.push({ url: testPath, status: response.status, message: 'Server error' });
    } else if (response.status >= 300 && response.status < 400) {
      console.log(`↗️  ${testPath} - ${response.status} Redirect to ${response.headers.location}`);
      results.passed++;
    } else {
      console.log(`⚠️  ${testPath} - ${response.status}`);
      results.warnings.push({ url: testPath, status: response.status });
    }
  } catch (error) {
    console.log(`❌ ${testPath} - Error: ${error.message}`);
    results.failed++;
    results.errors.push({ url: testPath, error: error.message });
  }
}

// Test pages in batches
async function testPagesInBatches(pages) {
  for (let i = 0; i < pages.length; i += BATCH_SIZE) {
    const batch = pages.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(page => testPage(page)));

    // Small delay between batches
    if (i + BATCH_SIZE < pages.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
}

// Compare sitemap with file system
function compareSitemapWithFileSystem() {
  console.log('\n🔍 Comparing sitemap with file system...');

  const inSitemapOnly = [];
  const inFileSystemOnly = [];

  // Find pages in sitemap but not in file system
  results.pagesFromSitemap.forEach(page => {
    if (
      !results.pagesFromFileSystem.has(page) &&
      !page.includes('[') &&
      !page.endsWith('.xml') &&
      !page.endsWith('.txt')
    ) {
      inSitemapOnly.push(page);
    }
  });

  // Find pages in file system but not in sitemap
  results.pagesFromFileSystem.forEach(page => {
    if (!results.pagesFromSitemap.has(page) && !page.includes('[') && !page.includes('/api/')) {
      inFileSystemOnly.push(page);
    }
  });

  if (inSitemapOnly.length > 0) {
    results.sitemapIssues.push({
      type: 'extra_in_sitemap',
      message: `${inSitemapOnly.length} pages in sitemap but not in file system`,
      pages: inSitemapOnly.slice(0, 10), // Show first 10
    });
  }

  if (inFileSystemOnly.length > 0) {
    results.sitemapIssues.push({
      type: 'missing_from_sitemap',
      message: `${inFileSystemOnly.length} pages in file system but not in sitemap`,
      pages: inFileSystemOnly.slice(0, 10), // Show first 10
    });
  }

  console.log(`📊 Sitemap contains ${results.pagesFromSitemap.size} pages`);
  console.log(`📊 File system contains ${results.pagesFromFileSystem.size} pages`);
}

// Generate comprehensive report
function generateReport() {
  const duration = ((Date.now() - results.startTime) / 1000).toFixed(2);
  const report = {
    summary: {
      totalUrlsTested: results.testedUrls.size,
      totalTests: results.passed + results.failed,
      passed: results.passed,
      failed: results.failed,
      warnings: results.warnings.length,
      duration: `${duration}s`,
      timestamp: new Date().toISOString(),
    },
    sitemapAnalysis: {
      pagesInSitemap: results.pagesFromSitemap.size,
      pagesInFileSystem: results.pagesFromFileSystem.size,
      issues: results.sitemapIssues,
    },
    errors: results.errors,
    warnings: results.warnings,
    navigationIssues: Array.from(results.brokenLinks.entries()).map(([page, links]) => ({
      page,
      brokenLinks: links,
    })),
  };

  // Save detailed report
  fs.writeFileSync('comprehensive-test-report.json', JSON.stringify(report, null, 2));

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 COMPREHENSIVE TEST RESULTS');
  console.log('='.repeat(60));
  console.log(`Total URLs Tested: ${report.summary.totalUrlsTested}`);
  console.log(`Total Tests Run: ${report.summary.totalTests}`);
  console.log(`✅ Passed: ${report.summary.passed}`);
  console.log(`❌ Failed: ${report.summary.failed}`);
  console.log(`⚠️  Warnings: ${report.summary.warnings}`);
  console.log(`⏱️  Duration: ${report.summary.duration}`);

  if (results.sitemapIssues.length > 0) {
    console.log('\n📍 SITEMAP ISSUES:');
    results.sitemapIssues.forEach(issue => {
      console.log(`   ${issue.message}`);
      if (issue.pages && issue.pages.length > 0) {
        console.log(`   Examples: ${issue.pages.slice(0, 3).join(', ')}...`);
      }
    });
  }

  if (results.errors.length > 0) {
    console.log('\n❌ ERRORS (404/500):');
    results.errors.slice(0, 10).forEach(error => {
      console.log(`   ${error.url} - ${error.status || error.error}`);
    });
    if (results.errors.length > 10) {
      console.log(`   ... and ${results.errors.length - 10} more`);
    }
  }

  if (results.brokenLinks.size > 0) {
    console.log('\n🔗 BROKEN NAVIGATION LINKS:');
    let count = 0;
    results.brokenLinks.forEach((links, page) => {
      if (count++ < 5) {
        console.log(`   On ${page}:`);
        links.slice(0, 3).forEach(link => {
          console.log(`      ${link.link} (${link.status})`);
        });
      }
    });
    if (results.brokenLinks.size > 5) {
      console.log(`   ... and ${results.brokenLinks.size - 5} more pages with broken links`);
    }
  }

  console.log('\n📄 Detailed report saved to: comprehensive-test-report.json');

  if (results.failed > 0) {
    console.log(`\n❌ FAILED! Found ${results.failed} errors that need to be fixed.`);
  } else {
    console.log('\n✅ SUCCESS! All pages tested successfully.');
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
    let serverOutput = '';

    devServer.stdout.on('data', data => {
      serverOutput += data.toString();
      if (serverOutput.includes('Ready') && !serverReady) {
        serverReady = true;
        console.log('✅ Development server started successfully\n');
        setTimeout(() => resolve(devServer), 3000); // Give it time to fully start
      }
    });

    devServer.stderr.on('data', data => {
      const error = data.toString();
      console.error('Server error:', error);
    });

    // Timeout after 45 seconds
    setTimeout(() => {
      if (!serverReady) {
        reject(new Error('Server failed to start within 45 seconds'));
      }
    }, 45000);
  });
}

// Main test runner
async function runTests() {
  let devServer;

  try {
    // Start server
    devServer = await startDevServer();

    // Get pages from file system
    console.log('📂 Scanning file system for pages...');
    const fileSystemPages = getAllPageRoutes();
    fileSystemPages.forEach(page => results.pagesFromFileSystem.add(page));
    console.log(`✅ Found ${fileSystemPages.length} pages in file system`);

    // Get pages from sitemap
    const sitemapPages = await getSitemapUrls();
    sitemapPages.forEach(page => results.pagesFromSitemap.add(page));

    // Combine all unique pages
    const allPages = [...new Set([...fileSystemPages, ...sitemapPages])];
    console.log(`\n📋 Testing ${allPages.length} unique pages...\n`);

    // Test all pages in batches
    await testPagesInBatches(allPages);

    // Compare sitemap with file system
    compareSitemapWithFileSystem();

    // Generate report
    generateReport();
  } catch (error) {
    console.error('Fatal error:', error.message);
    results.errors.push({ fatal: error.message });
  } finally {
    // Kill dev server
    if (devServer) {
      console.log('\nStopping server...');
      devServer.kill();
    }

    process.exit(results.failed > 0 ? 1 : 0);
  }
}

// Check if xml2js is installed
try {
  require('xml2js');
} catch (error) {
  console.error('❌ xml2js package not found. Installing...');
  require('child_process').execSync('npm install xml2js', { stdio: 'inherit' });
}

// Run the tests
runTests();
