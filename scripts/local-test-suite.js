#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('\n🧪 Vasquez Law Firm - Comprehensive Local Test Suite');
console.log('='.repeat(60));

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
};

// Create log file
const logStream = fs.createWriteStream(LOG_FILE, { flags: 'w' });

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
  console.log(logMessage);
  logStream.write(logMessage + '\n');
}

// Step 1: Start the development server
async function startDevServer() {
  log('Starting development server...', 'info');

  return new Promise((resolve, reject) => {
    const devServer = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      env: { ...process.env, NODE_ENV: 'development' },
    });

    devServer.stdout.on('data', data => {
      const output = data.toString();
      if (output.includes('Ready on')) {
        log('✅ Development server started successfully', 'info');
        resolve(devServer);
      }
    });

    devServer.stderr.on('data', data => {
      log(`Dev server error: ${data}`, 'error');
    });

    setTimeout(() => {
      reject(new Error('Development server failed to start within timeout'));
    }, 60000);
  });
}

// Step 2: Test all pages for 404/500 errors
async function testAllPages() {
  log('\n📄 Testing all pages for errors...', 'info');

  // Get all page routes
  const pages = getAllPageRoutes();
  log(`Found ${pages.length} pages to test`, 'info');

  for (const page of pages) {
    await testPage(page);
  }
}

// Get all page routes from the app directory
function getAllPageRoutes() {
  const routes = [];
  const appDir = path.join(process.cwd(), 'src/app');

  function scanDirectory(dir, basePath = '') {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip API and special directories
        if (item === 'api' || item.startsWith('_') || item === 'node_modules') {
          continue;
        }

        const pagePath = path.join(fullPath, 'page.tsx');
        if (fs.existsSync(pagePath)) {
          // Convert file path to route
          let route = path.join(basePath, item);
          route = route.replace(/\\/g, '/');

          // Handle dynamic routes
          route = route.replace(/\[\.\.\.(\w+)\]/g, 'test-$1');
          route = route.replace(/\[(\w+)\]/g, 'test-$1');

          routes.push('/' + route);
        }

        // Recurse into subdirectories
        scanDirectory(fullPath, path.join(basePath, item));
      }
    }
  }

  scanDirectory(appDir);
  routes.push('/'); // Add home page

  // Add some specific test routes
  const specificRoutes = [
    '/practice-areas/immigration',
    '/practice-areas/criminal-defense',
    '/attorneys/william-vasquez',
    '/locations/charlotte',
    '/blog',
    '/contact',
    '/about',
    '/es',
    '/es/areas-de-practica/inmigracion',
    '/sitemap.xml',
    '/robots.txt',
  ];

  return [...new Set([...routes, ...specificRoutes])];
}

// Test individual page
async function testPage(url) {
  const fullUrl = `${BASE_URL}${url}`;
  const startTime = Date.now();

  try {
    const response = await axios.get(fullUrl, {
      timeout: TEST_TIMEOUT,
      validateStatus: () => true, // Don't throw on any status
      headers: {
        'User-Agent': 'VLF-Test-Suite/1.0',
      },
    });

    const duration = Date.now() - startTime;

    if (response.status === 200) {
      log(`✅ ${url} - ${response.status} (${duration}ms)`, 'info');
      results.passed++;

      // Check for console errors in the HTML
      checkForConsoleErrors(url, response.data);
    } else if (response.status === 404) {
      log(`❌ ${url} - 404 Not Found (${duration}ms)`, 'error');
      results.failed++;
      results.errors.push({ url, status: 404, message: 'Page not found' });
    } else if (response.status >= 500) {
      log(`❌ ${url} - ${response.status} Server Error (${duration}ms)`, 'error');
      results.failed++;
      results.errors.push({ url, status: response.status, message: 'Server error' });
    } else {
      log(`⚠️  ${url} - ${response.status} (${duration}ms)`, 'warning');
      results.warnings.push({ url, status: response.status });
    }
  } catch (error) {
    log(`❌ ${url} - Network Error: ${error.message}`, 'error');
    results.failed++;
    results.errors.push({ url, error: error.message });
  }
}

// Check for console errors in the page HTML
function checkForConsoleErrors(url, html) {
  const errorPatterns = [
    /console\.error/gi,
    /uncaught.*error/gi,
    /failed to load/gi,
    /cannot read property/gi,
    /undefined is not/gi,
  ];

  for (const pattern of errorPatterns) {
    if (pattern.test(html)) {
      log(`⚠️  ${url} - Contains potential console errors`, 'warning');
      results.warnings.push({ url, message: 'Potential console errors detected' });
      break;
    }
  }
}

// Step 3: Test API endpoints
async function testAPIEndpoints() {
  log('\n🔌 Testing API endpoints...', 'info');

  const apiEndpoints = [
    { path: '/api/health', method: 'GET' },
    { path: '/api/health/db', method: 'GET' },
    { path: '/api/blog/posts', method: 'GET' },
    { path: '/api/attorneys', method: 'GET' },
    { path: '/api/locations', method: 'GET' },
    { path: '/api/chat/status', method: 'GET' },
    { path: '/api/crews/status', method: 'GET' },
    { path: '/api/analytics/summary', method: 'GET' },
  ];

  for (const endpoint of apiEndpoints) {
    await testAPIEndpoint(endpoint);
  }
}

// Test individual API endpoint
async function testAPIEndpoint({ path, method }) {
  const fullUrl = `${BASE_URL}${path}`;

  try {
    const response = await axios({
      method,
      url: fullUrl,
      timeout: TEST_TIMEOUT,
      validateStatus: () => true,
    });

    if (response.status < 400) {
      log(`✅ API ${method} ${path} - ${response.status}`, 'info');
      results.passed++;
    } else {
      log(`❌ API ${method} ${path} - ${response.status}`, 'error');
      results.failed++;
      results.errors.push({ api: path, method, status: response.status });
    }
  } catch (error) {
    log(`❌ API ${method} ${path} - Error: ${error.message}`, 'error');
    results.failed++;
    results.errors.push({ api: path, method, error: error.message });
  }
}

// Step 4: Test static assets
async function testStaticAssets() {
  log('\n📦 Testing static assets...', 'info');

  const assets = [
    '/favicon.ico',
    '/images/logo.png',
    '/images/william-vasquez.webp',
    '/_next/static/css/app/layout.css',
    '/fonts/inter-var.woff2',
  ];

  for (const asset of assets) {
    await testStaticAsset(asset);
  }
}

// Test individual static asset
async function testStaticAsset(path) {
  const fullUrl = `${BASE_URL}${path}`;

  try {
    const response = await axios.head(fullUrl, {
      timeout: TEST_TIMEOUT,
      validateStatus: () => true,
    });

    if (response.status === 200) {
      log(`✅ Asset ${path} - ${response.status}`, 'info');
      results.passed++;
    } else {
      log(`❌ Asset ${path} - ${response.status}`, 'error');
      results.failed++;
      results.errors.push({ asset: path, status: response.status });
    }
  } catch (error) {
    log(`❌ Asset ${path} - Error: ${error.message}`, 'error');
    results.failed++;
    results.errors.push({ asset: path, error: error.message });
  }
}

// Step 5: Check logs for errors
async function checkLogs() {
  log('\n📋 Checking application logs...', 'info');

  const logFiles = ['dev-output.log', 'error.log', path.join('.next', 'build-manifest.json')];

  for (const logFile of logFiles) {
    if (fs.existsSync(logFile)) {
      const content = fs.readFileSync(logFile, 'utf8');
      const errorCount = (content.match(/error/gi) || []).length;
      const warningCount = (content.match(/warning/gi) || []).length;

      if (errorCount > 0) {
        log(`⚠️  ${logFile} contains ${errorCount} errors`, 'warning');
        results.warnings.push({ log: logFile, errors: errorCount });
      }

      if (warningCount > 0) {
        log(`ℹ️  ${logFile} contains ${warningCount} warnings`, 'info');
      }
    }
  }
}

// Step 6: Performance tests
async function testPerformance() {
  log('\n⚡ Running performance tests...', 'info');

  const criticalPages = ['/', '/contact', '/practice-areas/immigration'];

  for (const page of criticalPages) {
    const times = [];

    // Test each page 3 times
    for (let i = 0; i < 3; i++) {
      const start = Date.now();
      try {
        await axios.get(`${BASE_URL}${page}`);
        times.push(Date.now() - start);
      } catch (error) {
        log(`❌ Performance test failed for ${page}`, 'error');
      }
    }

    if (times.length > 0) {
      const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
      if (avgTime < 1000) {
        log(`✅ ${page} - Avg load time: ${avgTime.toFixed(0)}ms`, 'info');
      } else {
        log(`⚠️  ${page} - Slow load time: ${avgTime.toFixed(0)}ms`, 'warning');
        results.warnings.push({ page, avgLoadTime: avgTime });
      }
    }
  }
}

// Generate final report
function generateReport() {
  const duration = ((Date.now() - results.startTime) / 1000).toFixed(2);

  log('\n' + '='.repeat(60), 'info');
  log('📊 TEST RESULTS SUMMARY', 'info');
  log('='.repeat(60), 'info');
  log(`Total Tests: ${results.passed + results.failed}`, 'info');
  log(`✅ Passed: ${results.passed}`, 'info');
  log(`❌ Failed: ${results.failed}`, results.failed > 0 ? 'error' : 'info');
  log(`⚠️  Warnings: ${results.warnings.length}`, 'warning');
  log(`⏱️  Duration: ${duration}s`, 'info');

  if (results.errors.length > 0) {
    log('\n❌ ERRORS:', 'error');
    results.errors.forEach(error => {
      log(JSON.stringify(error, null, 2), 'error');
    });
  }

  if (results.warnings.length > 0) {
    log('\n⚠️  WARNINGS:', 'warning');
    results.warnings.forEach(warning => {
      log(JSON.stringify(warning, null, 2), 'warning');
    });
  }

  // Write detailed report
  const reportPath = 'test-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  log(`\n📄 Detailed report saved to: ${reportPath}`, 'info');

  logStream.end();

  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

// Main test runner
async function runTests() {
  let devServer;

  try {
    // Start dev server
    devServer = await startDevServer();

    // Wait for server to stabilize
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Run all tests
    await testAllPages();
    await testAPIEndpoints();
    await testStaticAssets();
    await checkLogs();
    await testPerformance();
  } catch (error) {
    log(`Fatal error: ${error.message}`, 'error');
    results.failed++;
    results.errors.push({ fatal: error.message });
  } finally {
    // Kill dev server
    if (devServer) {
      devServer.kill();
    }

    // Generate report
    generateReport();
  }
}

// Run the tests
runTests();
