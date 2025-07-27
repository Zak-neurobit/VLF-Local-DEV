#!/usr/bin/env node

const http = require('http');
const https = require('https');

const baseUrl = process.argv[2] || 'http://localhost:3000';
const isHttps = baseUrl.startsWith('https');
const httpModule = isHttps ? https : http;

console.log(`🧪 Testing common routes on ${baseUrl}\n`);

// Most commonly accessed routes
const routes = [
  '/',
  '/about',
  '/contact',
  '/practice-areas',
  '/attorneys',
  '/locations',
  '/blog',
  '/faq',

  // Spanish versions
  '/es',
  '/es/acerca-de',
  '/es/contacto',
  '/es/areas-de-practica',
  '/es/abogados',
  '/es/ubicaciones',
  '/es/blog',
  '/es/preguntas-frecuentes',

  // Common practice areas
  '/practice-areas/immigration',
  '/practice-areas/personal-injury',
  '/practice-areas/workers-compensation',
  '/practice-areas/criminal-defense',
  '/practice-areas/family-law',

  // API endpoints
  '/api/health',
  '/api/blog',
  '/api/contact',

  // Common pages that might be missing
  '/services',
  '/testimonials',
  '/case-results',
  '/resources',
  '/privacy-policy',
  '/terms-of-service',

  // Auth pages
  '/login',
  '/signin',
  '/auth/signin',

  // Portal pages
  '/portal',
  '/dashboard',
  '/client-portal',
];

const results = {
  success: [],
  notFound: [],
  serverError: [],
  other: [],
};

let completed = 0;

function testRoute(route) {
  return new Promise(resolve => {
    const url = new URL(route, baseUrl);

    const options = {
      method: 'GET',
      timeout: 5000,
      headers: {
        'User-Agent': 'VLF-Route-Tester',
      },
    };

    const req = httpModule.get(url.href, options, res => {
      const result = {
        route,
        status: res.statusCode,
        headers: res.headers,
      };

      if (res.statusCode === 200) {
        results.success.push(result);
      } else if (res.statusCode === 404) {
        results.notFound.push(result);
      } else if (res.statusCode >= 500) {
        results.serverError.push(result);
      } else {
        results.other.push(result);
      }

      completed++;
      process.stdout.write(`\rTesting routes... ${completed}/${routes.length}`);

      resolve(result);
    });

    req.on('error', err => {
      results.serverError.push({
        route,
        status: 'ERROR',
        error: err.message,
      });
      completed++;
      process.stdout.write(`\rTesting routes... ${completed}/${routes.length}`);
      resolve({ route, error: err.message });
    });

    req.on('timeout', () => {
      req.destroy();
      results.serverError.push({
        route,
        status: 'TIMEOUT',
        error: 'Request timed out',
      });
      completed++;
      process.stdout.write(`\rTesting routes... ${completed}/${routes.length}`);
      resolve({ route, error: 'timeout' });
    });
  });
}

async function runTests() {
  console.log(`Testing ${routes.length} routes...\n`);

  // Test routes in batches to avoid overwhelming the server
  const batchSize = 5;
  for (let i = 0; i < routes.length; i += batchSize) {
    const batch = routes.slice(i, i + batchSize);
    await Promise.all(batch.map(testRoute));
  }

  console.log('\n\n📊 Test Results:\n');

  // Success
  console.log(`✅ Successful (200 OK): ${results.success.length}`);
  if (results.success.length > 0 && results.success.length <= 10) {
    results.success.forEach(r => console.log(`   - ${r.route}`));
  }

  // 404 Not Found
  console.log(`\n❌ Not Found (404): ${results.notFound.length}`);
  if (results.notFound.length > 0) {
    results.notFound.forEach(r => console.log(`   - ${r.route}`));
  }

  // 500 Server Errors
  console.log(`\n💥 Server Errors (500+): ${results.serverError.length}`);
  if (results.serverError.length > 0) {
    results.serverError.forEach(r => {
      console.log(`   - ${r.route} (${r.status || r.error})`);
    });
  }

  // Other statuses
  console.log(`\n⚠️  Other Status Codes: ${results.other.length}`);
  if (results.other.length > 0) {
    results.other.forEach(r => console.log(`   - ${r.route} (${r.status})`));
  }

  // Summary
  console.log('\n📈 Summary:');
  console.log(`   - Total routes tested: ${routes.length}`);
  console.log(`   - Success rate: ${((results.success.length / routes.length) * 100).toFixed(1)}%`);
  console.log(`   - 404 rate: ${((results.notFound.length / routes.length) * 100).toFixed(1)}%`);
  console.log(
    `   - Error rate: ${((results.serverError.length / routes.length) * 100).toFixed(1)}%`
  );

  // Recommendations based on results
  console.log('\n💡 Recommendations based on results:\n');

  if (results.notFound.length > 5) {
    console.log('   1. Many 404s detected - Check if pages are properly created in app directory');
    console.log('   2. Verify middleware is not blocking valid routes');
    console.log('   3. Check if locale routing is working correctly for /es paths');
  }

  if (results.serverError.length > 0) {
    console.log('   1. Server errors detected - Check API route error handling');
    console.log('   2. Verify all required environment variables are set');
    console.log('   3. Check database connection and external service dependencies');
    console.log('   4. Review server logs for detailed error messages');
  }

  if (results.other.length > 0) {
    console.log('   1. Unexpected status codes - May indicate redirects or authentication issues');
    console.log('   2. Check middleware for redirect loops');
    console.log('   3. Verify authentication requirements for protected routes');
  }
}

// Check if server is running
const testReq = httpModule.get(baseUrl, { timeout: 3000 }, res => {
  console.log(`Server is responding at ${baseUrl}\n`);
  runTests();
});

testReq.on('error', err => {
  console.error(`❌ Cannot connect to ${baseUrl}`);
  console.error(`   Error: ${err.message}\n`);
  console.error('Please ensure the development server is running:');
  console.error('   npm run dev\n');
  process.exit(1);
});

testReq.on('timeout', () => {
  testReq.destroy();
  console.error(`❌ Connection to ${baseUrl} timed out\n`);
  console.error('Please ensure the development server is running:');
  console.error('   npm run dev\n');
  process.exit(1);
});
