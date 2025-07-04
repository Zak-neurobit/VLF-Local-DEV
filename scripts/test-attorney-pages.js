#!/usr/bin/env node

/**
 * Test script to verify attorney pages can render without event handler errors
 */

const { spawn } = require('child_process');
const http = require('http');

async function testPage(url) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: url,
      method: 'GET',
      timeout: 10000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({ success: true, url, status: res.statusCode });
        } else {
          resolve({ success: false, url, status: res.statusCode, error: `HTTP ${res.statusCode}` });
        }
      });
    });

    req.on('error', (err) => {
      resolve({ success: false, url, error: err.message });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ success: false, url, error: 'Request timeout' });
    });

    req.end();
  });
}

async function runTests() {
  console.log('Testing attorney pages for event handler errors...\n');

  const pages = [
    '/attorneys/william-vasquez',
    '/attorneys/christopher-afanador', 
    '/attorneys/jillian-baucom'
  ];

  const results = [];
  
  for (const page of pages) {
    console.log(`Testing ${page}...`);
    const result = await testPage(page);
    results.push(result);
    
    if (result.success) {
      console.log(`✓ ${page} - OK`);
    } else {
      console.log(`✗ ${page} - ${result.error || 'Failed'}`);
    }
  }

  console.log('\nTest Summary:');
  const successful = results.filter(r => r.success).length;
  console.log(`${successful}/${results.length} pages loaded successfully`);
  
  if (successful === results.length) {
    console.log('\n✓ All attorney pages are working correctly!');
  } else {
    console.log('\n✗ Some pages failed to load');
    process.exit(1);
  }
}

// Note: This script assumes Next.js dev server is already running on port 3000
console.log('Make sure Next.js dev server is running on port 3000');
console.log('You can start it with: npm run dev\n');

runTests().catch(console.error);