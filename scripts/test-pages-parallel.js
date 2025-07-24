#!/usr/bin/env node

const http = require('http');
const https = require('https');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const BATCH_SIZE = 10; // Test 10 URLs at a time

// Define all pages to test
const pages = {
  'English Pages': [
    '/', '/practice-areas', '/attorneys', '/locations', '/about', '/blog',
    '/scholarship', '/contact', '/make-payment', '/calculators', '/testimonials',
    '/case-results', '/faq', '/privacy-policy', '/terms-of-service', '/sitemap',
    '/cutting-edge', '/dashboard', '/appointment/manage', '/free-consultation',
    '/ai-consultation', '/ai-evaluation', '/quick-contact', '/secure-payment',
    '/payment', '/auth/signin', '/auth/signup', '/auth/forgot-password'
  ],
  'Spanish Pages': [
    '/es', '/es/areas-de-practica', '/es/abogados', '/es/ubicaciones',
    '/es/acerca-de', '/es/blog', '/es/becas', '/es/contacto', '/es/hacer-pago',
    '/es/calculadoras', '/es/testimonios', '/es/resultados-casos',
    '/es/preguntas-frecuentes', '/es/politica-privacidad', '/es/terminos-servicio',
    '/es/mapa-del-sitio', '/es/dashboard', '/es/consulta-gratis', '/es/pago'
  ],
  'API Endpoints': [
    '/api/health/db', '/api/auth/session', '/api/news/ticker', '/api/blog/latest',
    '/api/reviews/recent', '/api/cases/recent-wins', '/api/sitemap'
  ]
};

// Test a single URL
function testUrl(url) {
  return new Promise((resolve) => {
    const fullUrl = new URL(url, BASE_URL);
    const protocol = fullUrl.protocol === 'https:' ? https : http;
    
    const req = protocol.get(fullUrl.toString(), { timeout: 5000 }, (res) => {
      resolve({
        url,
        status: res.statusCode,
        redirect: res.statusCode >= 300 && res.statusCode < 400 ? res.headers.location : null
      });
    });

    req.on('error', () => resolve({ url, status: 'ERROR' }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ url, status: 'TIMEOUT' });
    });
  });
}

// Test URLs in batches
async function testBatch(urls) {
  return Promise.all(urls.map(url => testUrl(url)));
}

// Main test function
async function runTests() {
  console.log('\n🚀 Vasquez Law Firm - Parallel Page Testing\n');
  console.log(`Testing ${Object.values(pages).flat().length} pages...\n`);

  const startTime = Date.now();
  const results = { success: 0, redirect: 0, error: 0, total: 0 };

  for (const [category, urls] of Object.entries(pages)) {
    console.log(`\n📁 ${category}`);
    console.log('─'.repeat(50));

    // Process URLs in batches
    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
      const batch = urls.slice(i, i + BATCH_SIZE);
      const batchResults = await testBatch(batch);

      // Display results
      for (const result of batchResults) {
        results.total++;
        let icon, color;
        
        if (result.status === 200) {
          results.success++;
          icon = '✅';
          color = '\x1b[32m';
        } else if (result.status >= 300 && result.status < 400) {
          results.redirect++;
          icon = '↩️';
          color = '\x1b[33m';
        } else {
          results.error++;
          icon = '❌';
          color = '\x1b[31m';
        }

        console.log(`${icon} ${result.url.padEnd(40)} ${color}${result.status}\x1b[0m`);
        if (result.redirect) {
          console.log(`   ↳ ${result.redirect}`);
        }
      }
    }
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);

  // Summary
  console.log('\n' + '═'.repeat(50));
  console.log('📊 TEST SUMMARY');
  console.log('═'.repeat(50));
  console.log(`✅ Success: ${results.success}/${results.total} (${((results.success/results.total)*100).toFixed(1)}%)`);
  console.log(`↩️  Redirects: ${results.redirect}`);
  console.log(`❌ Errors: ${results.error}`);
  console.log(`⏱️  Duration: ${duration}s`);
  console.log(`🚄 Speed: ${(results.total/duration).toFixed(1)} pages/second`);
  
  if (results.error === 0) {
    console.log('\n✨ All critical pages are working correctly! ✨\n');
  } else {
    console.log('\n⚠️  Some pages need attention\n');
  }
}

// Run the tests
runTests().catch(console.error);