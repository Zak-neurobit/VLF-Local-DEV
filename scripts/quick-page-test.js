#!/usr/bin/env node

const http = require('http');

const BASE_URL = 'http://localhost:3000';

const criticalPages = [
  // Core English Pages
  '/',
  '/practice-areas',
  '/attorneys',
  '/locations',
  '/about',
  '/blog',
  '/contact',
  '/make-payment',
  '/faq',
  '/appointment/manage',
  '/ai-evaluation',
  '/quick-contact',
  '/secure-payment',
  
  // Core Spanish Pages
  '/es',
  '/es/areas-de-practica',
  '/es/abogados',
  '/es/ubicaciones',
  '/es/acerca-de',
  '/es/blog',
  '/es/contacto',
  '/es/hacer-pago',
  
  // Key API Endpoints
  '/api/health/db',
  '/api/auth/session',
  '/api/news/ticker',
  '/api/blog/latest'
];

async function testUrl(url) {
  return new Promise((resolve) => {
    http.get(BASE_URL + url, { timeout: 5000 }, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, status: 'ERROR', error: err.message });
    });
  });
}

async function runTests() {
  console.log('🧪 Testing Critical Pages...\n');
  
  let passed = 0;
  let failed = 0;
  
  for (const url of criticalPages) {
    const result = await testUrl(url);
    const icon = result.status === 200 ? '✅' : '❌';
    const status = result.status === 200 ? '\x1b[32m200\x1b[0m' : `\x1b[31m${result.status}\x1b[0m`;
    
    console.log(`${icon} ${url.padEnd(45)} ${status}`);
    
    if (result.status === 200) passed++;
    else failed++;
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Passed: ${passed}/${criticalPages.length}`);
  console.log(`❌ Failed: ${failed}/${criticalPages.length}`);
  console.log(`📈 Success Rate: ${((passed/criticalPages.length)*100).toFixed(1)}%`);
}

runTests().catch(console.error);