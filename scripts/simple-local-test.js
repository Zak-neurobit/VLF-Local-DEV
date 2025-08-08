#!/usr/bin/env node

const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('\n🧪 Vasquez Law Firm - Simple Local Test Suite');
console.log('='.repeat(60));

const BASE_URL = 'http://localhost:3000';
const results = {
  passed: 0,
  failed: 0,
  errors: [],
};

// Simple HTTP request function
function testUrl(url) {
  return new Promise(resolve => {
    const fullUrl = BASE_URL + url;

    http
      .get(fullUrl, res => {
        if (res.statusCode === 200) {
          console.log(`✅ ${url} - ${res.statusCode}`);
          results.passed++;
        } else if (res.statusCode === 404) {
          console.log(`❌ ${url} - 404 Not Found`);
          results.failed++;
          results.errors.push({ url, status: 404 });
        } else if (res.statusCode >= 500) {
          console.log(`❌ ${url} - ${res.statusCode} Server Error`);
          results.failed++;
          results.errors.push({ url, status: res.statusCode });
        } else {
          console.log(`⚠️  ${url} - ${res.statusCode}`);
        }
        resolve();
      })
      .on('error', err => {
        console.log(`❌ ${url} - Network Error: ${err.message}`);
        results.failed++;
        results.errors.push({ url, error: err.message });
        resolve();
      });
  });
}

// Get all pages to test
function getTestPages() {
  return [
    '/',
    '/about',
    '/contact',
    '/attorneys/william-vasquez',
    '/practice-areas/immigration',
    '/practice-areas/criminal-defense',
    '/practice-areas/personal-injury',
    '/practice-areas/workers-compensation',
    '/practice-areas/family-law',
    '/locations/charlotte',
    '/locations/monroe',
    '/locations/wadesboro',
    '/blog',
    '/es',
    '/es/contacto',
    '/es/areas-de-practica/inmigracion',
    '/api/health',
    '/api/blog/posts',
    '/api/attorneys',
    '/api/locations',
  ];
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

    devServer.stdout.on('data', data => {
      const output = data.toString();
      if (output.includes('Ready') && !serverReady) {
        serverReady = true;
        console.log('✅ Development server started\n');
        setTimeout(resolve, 2000); // Give it a moment to fully start
      }
    });

    devServer.stderr.on('data', data => {
      const error = data.toString();
      if (!error.includes('Warning') && !error.includes('Deprecation')) {
        console.error('Server error:', error);
      }
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      if (!serverReady) {
        reject(new Error('Server failed to start within 30 seconds'));
      }
    }, 30000);

    return devServer;
  });
}

// Main test runner
async function runTests() {
  let devServer;

  try {
    // Check if .env.local exists
    if (!fs.existsSync('.env.local')) {
      console.error('❌ .env.local not found!');
      console.log('Please create .env.local with your configuration');
      process.exit(1);
    }

    // Start server
    devServer = await startDevServer();

    // Test all pages
    console.log('Testing pages...\n');
    const pages = getTestPages();

    for (const page of pages) {
      await testUrl(page);
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Print results
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
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

    if (results.failed === 0) {
      console.log('\n🎉 All tests passed! No 404 or 500 errors found.');
    }
  } catch (error) {
    console.error('Fatal error:', error.message);
  } finally {
    // Kill dev server
    if (devServer) {
      console.log('\nStopping server...');
      devServer.kill();
    }
    process.exit(results.failed > 0 ? 1 : 0);
  }
}

// Run the tests
runTests();
