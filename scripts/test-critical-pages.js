#!/usr/bin/env node

const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('\n🧪 Vasquez Law Firm - Critical Pages Test');
console.log('='.repeat(60));
console.log('Testing critical pages for 404/500 errors...\n');

const BASE_URL = 'http://localhost:3000';
const results = {
  passed: 0,
  failed: 0,
  errors: [],
  warnings: [],
};

// HTTP request with timeout
function testUrl(url) {
  return new Promise(resolve => {
    const fullUrl = BASE_URL + url;
    const startTime = Date.now();

    const req = http.get(fullUrl, { timeout: 10000 }, res => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        const duration = Date.now() - startTime;

        if (res.statusCode === 200) {
          console.log(`✅ ${url} - ${res.statusCode} (${duration}ms)`);
          results.passed++;

          // Check for console errors
          if (
            data.includes('Error:') ||
            data.includes('TypeError:') ||
            data.includes('ReferenceError:')
          ) {
            console.log(`   ⚠️  Contains potential errors`);
            results.warnings.push({ url, message: 'Contains potential errors' });
          }
        } else if (res.statusCode === 404) {
          console.log(`❌ ${url} - 404 Not Found`);
          results.failed++;
          results.errors.push({ url, status: 404 });
        } else if (res.statusCode >= 500) {
          console.log(`❌ ${url} - ${res.statusCode} Server Error`);
          results.failed++;
          results.errors.push({ url, status: res.statusCode });
        } else if (res.statusCode >= 300 && res.statusCode < 400) {
          console.log(`↗️  ${url} - ${res.statusCode} Redirect`);
          results.passed++;
        } else {
          console.log(`⚠️  ${url} - ${res.statusCode}`);
          results.warnings.push({ url, status: res.statusCode });
        }

        resolve();
      });
    });

    req.on('error', err => {
      console.log(`❌ ${url} - Network Error: ${err.message}`);
      results.failed++;
      results.errors.push({ url, error: err.message });
      resolve();
    });

    req.on('timeout', () => {
      req.destroy();
      console.log(`❌ ${url} - Timeout`);
      results.failed++;
      results.errors.push({ url, error: 'Timeout' });
      resolve();
    });
  });
}

// Get critical pages to test
function getCriticalPages() {
  return [
    // Core pages
    '/',
    '/about',
    '/contact',
    '/blog',
    '/sitemap.xml',
    '/robots.txt',

    // Spanish core pages
    '/es',
    '/es/acerca',
    '/es/contacto',
    '/es/blog',

    // Practice areas
    '/practice-areas',
    '/practice-areas/immigration',
    '/practice-areas/criminal-defense',
    '/practice-areas/personal-injury',
    '/practice-areas/workers-compensation',
    '/practice-areas/family-law',

    // Spanish practice areas
    '/es/areas-de-practica',
    '/es/areas-de-practica/inmigracion',
    '/es/areas-de-practica/defensa-criminal',
    '/es/areas-de-practica/lesiones-personales',
    '/es/areas-de-practica/compensacion-laboral',
    '/es/areas-de-practica/derecho-familiar',

    // Key sub-pages
    '/practice-areas/immigration/family-based-relative',
    '/practice-areas/immigration/asylum-refugee-legal-help',
    '/practice-areas/criminal-defense/dui-charges',
    '/practice-areas/personal-injury/car-accidents',

    // Attorneys
    '/attorneys',
    '/attorneys/william-vasquez',
    '/es/abogados',
    '/es/abogados/william-vasquez',

    // Locations
    '/locations',
    '/locations/charlotte',
    '/locations/monroe',
    '/locations/wadesboro',
    '/es/ubicaciones',
    '/es/ubicaciones/charlotte',

    // API endpoints
    '/api/health',
    '/api/blog/posts',
    '/api/attorneys',
    '/api/locations',
    '/api/practice-areas',
  ];
}

// Get all pages from directory structure
function getAllPages() {
  const pages = [];
  const appDir = path.join(process.cwd(), 'src/app');

  function scanDir(dir, basePath = '') {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('_') && item !== 'api') {
        const pagePath = path.join(fullPath, 'page.tsx');
        const pagePathJs = path.join(fullPath, 'page.js');

        if (fs.existsSync(pagePath) || fs.existsSync(pagePathJs)) {
          let route = basePath;
          if (!item.startsWith('(') && !item.endsWith(')')) {
            route = path.join(basePath, item).replace(/\\/g, '/');
          }

          // Handle dynamic routes
          if (route.includes('[')) {
            if (route.includes('[city]')) {
              ['charlotte', 'monroe', 'wadesboro'].forEach(city => {
                pages.push(route.replace('[city]', city));
              });
            }
          } else {
            pages.push(route || '/');
          }
        }

        scanDir(fullPath, path.join(basePath, item));
      }
    }
  }

  scanDir(appDir);
  return [...new Set(pages)];
}

// Start dev server
function startDevServer() {
  return new Promise((resolve, reject) => {
    console.log('Starting development server...');

    const devServer = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      env: {
        ...process.env,
        NODE_ENV: 'development',
        USE_MOCKS: 'true',
        MOCK_REDIS: 'true',
      },
    });

    let serverReady = false;
    let output = '';

    devServer.stdout.on('data', data => {
      output += data.toString();
      if ((output.includes('Ready') || output.includes('started')) && !serverReady) {
        serverReady = true;
        console.log('✅ Development server started\n');
        setTimeout(() => resolve(devServer), 3000);
      }
    });

    devServer.stderr.on('data', data => {
      const error = data.toString();
      // Only log actual errors, not warnings
      if (
        error.includes('Error:') &&
        !error.includes('Warning') &&
        !error.includes('Duplicate page detected')
      ) {
        console.error('Server error:', error.substring(0, 200));
      }
    });

    setTimeout(() => {
      if (!serverReady) {
        reject(new Error('Server failed to start within 30 seconds'));
      }
    }, 30000);
  });
}

// Main test runner
async function runTests() {
  let devServer;

  try {
    // Check environment
    if (!fs.existsSync('.env.local')) {
      if (fs.existsSync('.env.example')) {
        fs.copyFileSync('.env.example', '.env.local');
        console.log('✅ Created .env.local from .env.example');
      }
    }

    // Load environment
    require('dotenv').config({ path: '.env.local' });

    // Start server
    devServer = await startDevServer();

    // Test critical pages first
    console.log('📋 Testing critical pages...\n');
    const criticalPages = getCriticalPages();

    for (const page of criticalPages) {
      await testUrl(page);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Summary for critical pages
    console.log('\n' + '='.repeat(60));
    console.log('📊 CRITICAL PAGES SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${results.passed + results.failed}`);
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);

    if (results.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      results.errors.forEach(error => {
        console.log(`   ${error.url} - ${error.status || error.error}`);
      });
    }

    // Ask if user wants to test all pages
    if (results.failed === 0) {
      console.log('\n✅ All critical pages passed!');
      console.log('\nWould you like to test ALL pages? This will take longer.');
      console.log('Run: npm run test:local for comprehensive testing');
    }
  } catch (error) {
    console.error('Fatal error:', error.message);
  } finally {
    if (devServer) {
      console.log('\nStopping server...');
      devServer.kill();
    }

    // Write summary report
    const report = {
      timestamp: new Date().toISOString(),
      criticalPages: {
        total: results.passed + results.failed,
        passed: results.passed,
        failed: results.failed,
        errors: results.errors,
        warnings: results.warnings,
      },
    };

    fs.writeFileSync('critical-pages-test-report.json', JSON.stringify(report, null, 2));
    console.log('\n📄 Report saved to: critical-pages-test-report.json');

    process.exit(results.failed > 0 ? 1 : 0);
  }
}

// Handle interruption
process.on('SIGINT', () => {
  console.log('\nTest interrupted');
  process.exit(1);
});

// Run tests
runTests();
