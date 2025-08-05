#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const url = require('url');

console.log('\n🧪 Vasquez Law Firm - COMPREHENSIVE Test Suite');
console.log('='.repeat(60));
console.log('Testing ALL pages for 404/500 errors...\n');

// Configuration
const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const TEST_TIMEOUT = 30000; // 30 seconds per test
const LOG_FILE = 'test-results.log';

// Test results
const results = {
  passed: 0,
  failed: 0,
  errors: [],
  warnings: [],
  startTime: Date.now(),
  testedUrls: new Set(),
};

// Create log file
const logStream = fs.createWriteStream(LOG_FILE, { flags: 'w' });

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
  console.log(logMessage);
  logStream.write(logMessage + '\n');
}

// HTTP/HTTPS request wrapper
function makeRequest(testUrl) {
  return new Promise(resolve => {
    const parsedUrl = url.parse(testUrl);
    const isHttps = parsedUrl.protocol === 'https:';
    const client = isHttps ? https : http;

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      path: parsedUrl.path,
      method: 'GET',
      timeout: TEST_TIMEOUT,
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
  const routes = [];
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

          // Handle dynamic routes for testing
          if (route.includes('[')) {
            // Add some test cases for dynamic routes
            if (route.includes('[city]')) {
              const cities = ['charlotte', 'monroe', 'wadesboro', 'gastonia', 'concord'];
              cities.forEach(city => {
                routes.push(route.replace('[city]', city));
              });
            } else if (route.includes('[slug]')) {
              // Add some test slugs
              routes.push(route.replace('[slug]', 'test-page'));
            } else if (route.includes('[id]')) {
              routes.push(route.replace('[id]', '1'));
            }
          } else {
            routes.push(route || '/');
          }
        }

        // Recurse into subdirectories
        scanDirectory(fullPath, path.join(basePath, item));
      }
    }
  }

  scanDirectory(appDir);

  // Add root if not already added
  if (!routes.includes('/')) {
    routes.push('/');
  }

  // Add known static routes
  const staticRoutes = ['/sitemap.xml', '/robots.txt', '/en/sitemap.xml', '/es/sitemap.xml'];

  routes.push(...staticRoutes);

  // Remove duplicates and sort
  return [...new Set(routes)].sort();
}

// Get all content pages from markdown files
function getContentPages() {
  const contentPages = [];
  const contentDirs = [
    'content/blog',
    'content/practice-areas',
    'content/attorneys',
    'content/locations',
  ];

  contentDirs.forEach(dir => {
    const fullDir = path.join(process.cwd(), dir);
    if (fs.existsSync(fullDir)) {
      const files = fs.readdirSync(fullDir);
      files.forEach(file => {
        if (file.endsWith('.md') || file.endsWith('.mdx')) {
          const slug = file.replace(/\.(md|mdx)$/, '');
          const category = path.basename(dir);
          contentPages.push(`/${category}/${slug}`);
          contentPages.push(`/es/${category}/${slug}`);
        }
      });
    }
  });

  return contentPages;
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
      log(`❌ ${testPath} - Network Error: ${response.error}`, 'error');
      results.failed++;
      results.errors.push({ url: testPath, error: response.error });
      return;
    }

    if (response.status === 200) {
      log(`✅ ${testPath} - ${response.status} (${duration}ms)`, 'info');
      results.passed++;

      // Check for console errors in the HTML
      if (response.body) {
        checkForConsoleErrors(testPath, response.body);
      }

      // Extract and test links from the page
      if (response.body && testPath.endsWith('/')) {
        await extractAndTestLinks(response.body, testPath);
      }
    } else if (response.status === 404) {
      log(`❌ ${testPath} - 404 Not Found (${duration}ms)`, 'error');
      results.failed++;
      results.errors.push({ url: testPath, status: 404, message: 'Page not found' });
    } else if (response.status >= 500) {
      log(`❌ ${testPath} - ${response.status} Server Error (${duration}ms)`, 'error');
      results.failed++;
      results.errors.push({ url: testPath, status: response.status, message: 'Server error' });
    } else if (response.status >= 300 && response.status < 400) {
      log(`↗️  ${testPath} - ${response.status} Redirect to ${response.headers.location}`, 'info');
      results.passed++;
    } else {
      log(`⚠️  ${testPath} - ${response.status} (${duration}ms)`, 'warning');
      results.warnings.push({ url: testPath, status: response.status });
    }

    // Performance warning
    if (duration > 3000) {
      log(`⚠️  ${testPath} - Slow response time: ${duration}ms`, 'warning');
      results.warnings.push({ url: testPath, message: `Slow response: ${duration}ms` });
    }
  } catch (error) {
    log(`❌ ${testPath} - Error: ${error.message}`, 'error');
    results.failed++;
    results.errors.push({ url: testPath, error: error.message });
  }
}

// Check for console errors in the page HTML
function checkForConsoleErrors(testPath, html) {
  const errorPatterns = [
    /console\.error/gi,
    /uncaught.*error/gi,
    /failed to load/gi,
    /cannot read property/gi,
    /undefined is not/gi,
    /TypeError:/gi,
    /ReferenceError:/gi,
    /SyntaxError:/gi,
  ];

  for (const pattern of errorPatterns) {
    if (pattern.test(html)) {
      log(`⚠️  ${testPath} - Contains potential console errors`, 'warning');
      results.warnings.push({ url: testPath, message: 'Potential console errors detected' });
      break;
    }
  }
}

// Extract and test internal links
async function extractAndTestLinks(html, basePath) {
  // Extract href links
  const linkPattern = /href=["']([^"']+)["']/gi;
  const links = [];
  let match;

  while ((match = linkPattern.exec(html)) !== null) {
    const link = match[1];

    // Only test internal links
    if (link.startsWith('/') && !link.startsWith('//')) {
      // Skip anchors, assets, and API routes
      if (!link.includes('#') && !link.includes('.') && !link.startsWith('/api/')) {
        links.push(link);
      }
    }
  }

  // Test unique links
  const uniqueLinks = [...new Set(links)];
  for (const link of uniqueLinks) {
    if (!results.testedUrls.has(link)) {
      await testPage(link);
    }
  }
}

// Test API endpoints
async function testAPIEndpoints() {
  log('\n🔌 Testing API endpoints...', 'info');

  const apiEndpoints = [
    '/api/health',
    '/api/health/db',
    '/api/blog/posts',
    '/api/attorneys',
    '/api/locations',
    '/api/practice-areas',
    '/api/reviews',
    '/api/contact',
    '/api/newsletter/subscribe',
    '/api/chat/status',
    '/api/crews/status',
    '/api/analytics/summary',
    '/api/sitemap',
    '/api/search',
  ];

  for (const endpoint of apiEndpoints) {
    await testPage(endpoint);
  }
}

// Test static assets
async function testStaticAssets() {
  log('\n📦 Testing static assets...', 'info');

  const assets = [
    '/favicon.ico',
    '/images/logo.png',
    '/images/william-vasquez.webp',
    '/images/office-charlotte.jpg',
    '/fonts/inter-var.woff2',
  ];

  for (const asset of assets) {
    const fullUrl = `${BASE_URL}${asset}`;
    const response = await makeRequest(fullUrl);

    if (response.status === 200) {
      log(`✅ Asset ${asset} - ${response.status}`, 'info');
      results.passed++;
    } else {
      log(`❌ Asset ${asset} - ${response.status || response.error}`, 'error');
      results.failed++;
      results.errors.push({ asset, status: response.status || 0, error: response.error });
    }
  }
}

// Generate sitemap and test all URLs
async function testFromSitemap() {
  log('\n🗺️  Testing URLs from sitemap...', 'info');

  const sitemapUrl = `${BASE_URL}/sitemap.xml`;
  const response = await makeRequest(sitemapUrl);

  if (response.status === 200 && response.body) {
    // Parse sitemap XML
    const urlPattern = /<loc>([^<]+)<\/loc>/gi;
    const urls = [];
    let match;

    while ((match = urlPattern.exec(response.body)) !== null) {
      const fullUrl = match[1];
      const parsedUrl = url.parse(fullUrl);
      const pathname = parsedUrl.pathname;

      if (pathname && !results.testedUrls.has(pathname)) {
        urls.push(pathname);
      }
    }

    log(`Found ${urls.length} URLs in sitemap`, 'info');

    // Test all sitemap URLs
    for (const testUrl of urls) {
      await testPage(testUrl);
    }
  }
}

// Generate final report
function generateReport() {
  const duration = ((Date.now() - results.startTime) / 1000).toFixed(2);

  log('\n' + '='.repeat(60), 'info');
  log('📊 COMPREHENSIVE TEST RESULTS', 'info');
  log('='.repeat(60), 'info');
  log(`Total URLs Tested: ${results.testedUrls.size}`, 'info');
  log(`Total Tests Run: ${results.passed + results.failed}`, 'info');
  log(`✅ Passed: ${results.passed}`, 'info');
  log(`❌ Failed: ${results.failed}`, results.failed > 0 ? 'error' : 'info');
  log(`⚠️  Warnings: ${results.warnings.length}`, 'warning');
  log(`⏱️  Duration: ${duration}s`, 'info');

  if (results.errors.length > 0) {
    log('\n❌ ERRORS (404/500):', 'error');
    results.errors.forEach(error => {
      log(`   ${error.url || error.asset} - ${error.status || error.error}`, 'error');
    });
  }

  if (results.warnings.length > 0) {
    log('\n⚠️  WARNINGS:', 'warning');
    results.warnings.forEach(warning => {
      log(`   ${warning.url} - ${warning.message || `Status ${warning.status}`}`, 'warning');
    });
  }

  // Write detailed report
  const reportPath = 'test-report.json';
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
    errors: results.errors,
    warnings: results.warnings,
    testedUrls: Array.from(results.testedUrls).sort(),
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`\n📄 Detailed report saved to: ${reportPath}`, 'info');

  // Summary
  if (results.failed === 0) {
    log('\n🎉 SUCCESS! No 404 or 500 errors found across all pages!', 'info');
  } else {
    log(`\n❌ FAILED! Found ${results.failed} errors that need to be fixed.`, 'error');
  }

  logStream.end();
}

// Start dev server
function startDevServer() {
  return new Promise((resolve, reject) => {
    log('Starting development server...', 'info');

    const devServer = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      env: {
        ...process.env,
        NODE_ENV: 'development',
        USE_MOCKS: 'true',
        MOCK_REDIS: 'true',
        ENABLE_ALL_FEATURES: 'true',
      },
    });

    let serverReady = false;
    let output = '';

    devServer.stdout.on('data', data => {
      output += data.toString();
      if ((output.includes('Ready') || output.includes('started')) && !serverReady) {
        serverReady = true;
        log('✅ Development server started successfully', 'info');
        setTimeout(() => resolve(devServer), 3000); // Give it a moment to fully start
      }
    });

    devServer.stderr.on('data', data => {
      const error = data.toString();
      if (
        !error.includes('Warning') &&
        !error.includes('Deprecation') &&
        !error.includes('Duplicate page detected')
      ) {
        log(`Server error: ${error}`, 'error');
      }
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
    // Check environment
    if (!fs.existsSync('.env.local')) {
      log('❌ .env.local not found!', 'error');
      log('Creating .env.local from .env.example...', 'info');

      if (fs.existsSync('.env.example')) {
        fs.copyFileSync('.env.example', '.env.local');
        log('✅ .env.local created. Please update with your actual values.', 'info');
      } else {
        log('❌ .env.example not found either!', 'error');
        process.exit(1);
      }
    }

    // Load environment variables
    require('dotenv').config({ path: '.env.local' });

    // Start dev server
    devServer = await startDevServer();

    // Wait for server to stabilize
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test all routes from file system
    log('\n📂 Testing all routes from file system...', 'info');
    const allRoutes = getAllPageRoutes();
    log(`Found ${allRoutes.length} routes to test`, 'info');

    for (const route of allRoutes) {
      await testPage(route);
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Test content pages
    log('\n📝 Testing content pages...', 'info');
    const contentPages = getContentPages();
    log(`Found ${contentPages.length} content pages to test`, 'info');

    for (const page of contentPages) {
      await testPage(page);
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Test from sitemap
    await testFromSitemap();

    // Test API endpoints
    await testAPIEndpoints();

    // Test static assets
    await testStaticAssets();
  } catch (error) {
    log(`Fatal error: ${error.message}`, 'error');
    results.failed++;
    results.errors.push({ fatal: error.message });
  } finally {
    // Kill dev server
    if (devServer) {
      log('\nStopping development server...', 'info');
      devServer.kill();
    }

    // Generate report
    generateReport();

    // Exit with appropriate code
    process.exit(results.failed > 0 ? 1 : 0);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  log('\nTest interrupted by user', 'info');
  generateReport();
  process.exit(1);
});

// Run the tests
runTests();
