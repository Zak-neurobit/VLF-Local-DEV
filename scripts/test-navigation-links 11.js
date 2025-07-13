#!/usr/bin/env node

/**
 * Test script to verify all navigation links are working correctly
 */

const https = require('https');
const http = require('http');

// Test configuration
const BASE_URL = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

const IS_PRODUCTION = BASE_URL.includes('vercel.app') || BASE_URL.includes('vasquezlawnc.com');

// Navigation links to test
const NAVIGATION_LINKS = {
  en: [
    '/',
    '/practice-areas',
    '/practice-areas/immigration',
    '/practice-areas/personal-injury',
    '/practice-areas/workers-compensation',
    '/practice-areas/criminal-defense',
    '/practice-areas/family-law',
    '/practice-areas/traffic-violations',
    '/attorneys',
    '/attorneys/william-vasquez',
    '/attorneys/christopher-afanador',
    '/attorneys/jillian-baucom',
    '/locations',
    '/locations/charlotte',
    '/locations/durham',
    '/locations/raleigh',
    '/locations/winston-salem',
    '/locations/smithfield',
    '/locations/orlando',
    '/about',
    '/blog',
    '/contact',
  ],
  es: [
    '/es',
    '/es/areas-de-practica',
    '/es/areas-de-practica/inmigracion',
    '/es/areas-de-practica/lesiones-personales',
    '/es/areas-de-practica/compensacion-laboral',
    '/es/areas-de-practica/defensa-criminal',
    '/es/areas-de-practica/derecho-familia',
    '/es/areas-de-practica/infracciones-transito',
    '/es/abogados',
    '/es/abogados/william-vasquez',
    '/es/abogados/christopher-afanador',
    '/es/abogados/jillian-baucom',
    '/es/ubicaciones',
    '/es/ubicaciones/charlotte',
    '/es/ubicaciones/durham',
    '/es/ubicaciones/raleigh',
    '/es/ubicaciones/winston-salem',
    '/es/ubicaciones/smithfield',
    '/es/ubicaciones/orlando',
    '/es/acerca-de',
    '/es/blog',
    '/es/contacto',
  ],
};

// Function to test a single URL
function testUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (res) => {
      const { statusCode, headers } = res;
      const redirectLocation = headers.location || null;
      
      // Consume response data to free up memory
      res.resume();
      
      resolve({
        url,
        statusCode,
        redirectLocation,
        success: statusCode >= 200 && statusCode < 400,
      });
    }).on('error', (err) => {
      resolve({
        url,
        statusCode: 0,
        error: err.message,
        success: false,
      });
    });
  });
}

// Main test function
async function testNavigationLinks() {
  console.log(`Testing navigation links on: ${BASE_URL}`);
  console.log(`Environment: ${IS_PRODUCTION ? 'Production' : 'Development'}`);
  console.log('----------------------------------------\n');

  const results = {
    passed: [],
    failed: [],
    redirected: [],
  };

  // Test English links
  console.log('Testing English navigation links...');
  for (const link of NAVIGATION_LINKS.en) {
    const url = `${BASE_URL}${link}`;
    const result = await testUrl(url);
    
    if (result.success) {
      if (result.statusCode === 301 || result.statusCode === 302 || result.statusCode === 307 || result.statusCode === 308) {
        results.redirected.push(result);
        console.log(`⚠️  ${link} -> Redirected (${result.statusCode}) to ${result.redirectLocation}`);
      } else {
        results.passed.push(result);
        console.log(`✅ ${link} -> OK (${result.statusCode})`);
      }
    } else {
      results.failed.push(result);
      console.log(`❌ ${link} -> Failed (${result.statusCode || 'Error'}) ${result.error || ''}`);
    }
  }

  console.log('\nTesting Spanish navigation links...');
  for (const link of NAVIGATION_LINKS.es) {
    const url = `${BASE_URL}${link}`;
    const result = await testUrl(url);
    
    if (result.success) {
      if (result.statusCode === 301 || result.statusCode === 302 || result.statusCode === 307 || result.statusCode === 308) {
        results.redirected.push(result);
        console.log(`⚠️  ${link} -> Redirected (${result.statusCode}) to ${result.redirectLocation}`);
      } else {
        results.passed.push(result);
        console.log(`✅ ${link} -> OK (${result.statusCode})`);
      }
    } else {
      results.failed.push(result);
      console.log(`❌ ${link} -> Failed (${result.statusCode || 'Error'}) ${result.error || ''}`);
    }
  }

  // Summary
  console.log('\n========================================');
  console.log('TEST SUMMARY');
  console.log('========================================');
  console.log(`Total Links Tested: ${results.passed.length + results.failed.length + results.redirected.length}`);
  console.log(`✅ Passed: ${results.passed.length}`);
  console.log(`⚠️  Redirected: ${results.redirected.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed Links:');
    results.failed.forEach((result) => {
      console.log(`  - ${result.url} (${result.error || `Status: ${result.statusCode}`})`);
    });
  }

  if (results.redirected.length > 0) {
    console.log('\nRedirected Links:');
    results.redirected.forEach((result) => {
      console.log(`  - ${result.url} -> ${result.redirectLocation}`);
    });
  }

  process.exit(results.failed.length > 0 ? 1 : 0);
}

// Run the tests
testNavigationLinks().catch((error) => {
  console.error('Test failed:', error);
  process.exit(1);
});