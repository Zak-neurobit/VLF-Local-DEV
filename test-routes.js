#!/usr/bin/env node

const http = require('http');

const routes = [
  '/',
  '/contact',
  '/about',
  '/attorneys',
  '/practice-areas',
  '/es',
  '/es/contacto',
  '/es/abogados',
  '/es/areas-de-practica',
  '/blog',
  '/locations',
  '/payment',
  // Add problematic routes if known
];

async function testRoute(path) {
  return new Promise(resolve => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
      timeout: 10000,
    };

    const req = http.request(options, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        resolve({
          path,
          status: res.statusCode,
          headers: res.headers,
          hasError: res.statusCode >= 400,
          size: data.length,
        });
      });
    });

    req.on('error', err => {
      resolve({
        path,
        status: 0,
        error: err.message,
        hasError: true,
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        path,
        status: 0,
        error: 'Timeout',
        hasError: true,
      });
    });

    req.end();
  });
}

async function runTests() {
  console.log('Testing routes...\n');

  const results = [];

  for (const route of routes) {
    console.log(`Testing ${route}...`);
    const result = await testRoute(route);
    results.push(result);

    if (result.hasError) {
      console.log(`❌ ${route}: ${result.status} ${result.error || ''}`);
    } else {
      console.log(`✅ ${route}: ${result.status} (${result.size} bytes)`);
    }
  }

  console.log('\n=== SUMMARY ===');
  const failed = results.filter(r => r.hasError);
  const passed = results.filter(r => !r.hasError);

  console.log(`✅ Passed: ${passed.length}`);
  console.log(`❌ Failed: ${failed.length}`);

  if (failed.length > 0) {
    console.log('\nFailed routes:');
    failed.forEach(r => console.log(`  ${r.path}: ${r.status} ${r.error || ''}`));
  }
}

runTests().catch(console.error);
