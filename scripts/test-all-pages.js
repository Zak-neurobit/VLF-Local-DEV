#!/usr/bin/env node

const http = require('http');
const https = require('https');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Define all pages to test
const pages = {
  'English Pages': [
    '/',
    '/practice-areas',
    '/practice-areas/immigration',
    '/practice-areas/personal-injury',
    '/practice-areas/criminal-defense',
    '/practice-areas/workers-compensation',
    '/practice-areas/family-law',
    '/practice-areas/traffic-violations',
    '/attorneys',
    '/attorneys/william-vasquez',
    '/attorneys/kelly-vega',
    '/attorneys/rebecca-sommer',
    '/locations',
    '/about',
    '/blog',
    '/scholarship',
    '/contact',
    '/make-payment',
    '/calculators',
    '/testimonials',
    '/case-results',
    '/faq',
    '/privacy-policy',
    '/terms-of-service',
    '/sitemap',
    '/cutting-edge',
    '/dashboard',
    '/appointment/manage',
    '/free-consultation',
    '/ai-consultation',
    '/ai-evaluation',
    '/quick-contact',
    '/secure-payment',
    '/payment',
    '/auth/signin',
    '/auth/signup',
    '/auth/forgot-password'
  ],
  'Spanish Pages': [
    '/es',
    '/es/areas-de-practica',
    '/es/areas-de-practica/inmigracion',
    '/es/areas-de-practica/lesiones-personales',
    '/es/areas-de-practica/defensa-criminal',
    '/es/areas-de-practica/compensacion-laboral',
    '/es/areas-de-practica/derecho-familia',
    '/es/areas-de-practica/infracciones-transito',
    '/es/abogados',
    '/es/abogados/william-vasquez',
    '/es/abogados/kelly-vega',
    '/es/abogados/rebecca-sommer',
    '/es/ubicaciones',
    '/es/acerca-de',
    '/es/blog',
    '/es/becas',
    '/es/contacto',
    '/es/hacer-pago',
    '/es/calculadoras',
    '/es/testimonios',
    '/es/resultados-casos',
    '/es/preguntas-frecuentes',
    '/es/politica-privacidad',
    '/es/terminos-servicio',
    '/es/mapa-del-sitio',
    '/es/dashboard',
    '/es/citas/gestionar',
    '/es/consulta-gratis',
    '/es/consulta-ia',
    '/es/evaluacion-ia',
    '/es/contacto-rapido',
    '/es/pago-seguro',
    '/es/pago',
    '/es/auth/signin',
    '/es/auth/signup',
    '/es/auth/forgot-password'
  ],
  'API Endpoints': [
    '/api/health/db',
    '/api/auth/session',
    '/api/news/ticker',
    '/api/blog/latest',
    '/api/reviews/recent',
    '/api/cases/recent-wins',
    '/api/blog/sitemap',
    '/api/sitemap',
    '/api/hreflang-sitemap'
  ],
  'Location Pages (Sample)': [
    '/locations/raleigh-immigration-lawyer',
    '/locations/charlotte-immigration-lawyer',
    '/locations/orlando-immigration-lawyer',
    '/es/ubicaciones/raleigh-abogado-inmigracion',
    '/es/ubicaciones/charlotte-abogado-inmigracion'
  ],
  'Near Me Pages (Sample)': [
    '/near-me/raleigh-immigration-lawyer-near-me',
    '/near-me/charlotte-personal-injury-lawyer-near-me',
    '/es/cerca-de-mi/raleigh-abogado-inmigracion-cerca-de-mi',
    '/es/cerca-de-mi/charlotte-abogado-accidente-auto-cerca-de-mi'
  ]
};

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Test a single URL
function testUrl(url) {
  return new Promise((resolve) => {
    const fullUrl = new URL(url, BASE_URL);
    const protocol = fullUrl.protocol === 'https:' ? https : http;
    
    const options = {
      method: 'GET',
      timeout: 10000,
      headers: {
        'User-Agent': 'VLF-Page-Tester/1.0'
      }
    };

    const req = protocol.get(fullUrl.toString(), options, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve({
          url,
          status: res.statusCode,
          redirect: res.headers.location,
          time: 0
        });
      } else {
        resolve({
          url,
          status: res.statusCode,
          time: 0
        });
      }
    });

    req.on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        error: err.message,
        time: 0
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        time: 0
      });
    });

    const startTime = Date.now();
    req.on('close', () => {
      const endTime = Date.now();
      req.removeAllListeners();
    });
  });
}

// Format status with color
function formatStatus(status) {
  if (status === 200) {
    return `${colors.green}✓ ${status}${colors.reset}`;
  } else if (status >= 300 && status < 400) {
    return `${colors.yellow}→ ${status}${colors.reset}`;
  } else if (status >= 400) {
    return `${colors.red}✗ ${status}${colors.reset}`;
  } else if (status === 'ERROR' || status === 'TIMEOUT') {
    return `${colors.red}✗ ${status}${colors.reset}`;
  }
  return status;
}

// Test all pages
async function testAllPages() {
  console.log(`${colors.bright}${colors.blue}
╔════════════════════════════════════════════╗
║     Vasquez Law Firm Page Testing Suite    ║
╚════════════════════════════════════════════╝${colors.reset}
`);
  
  console.log(`Testing against: ${colors.cyan}${BASE_URL}${colors.reset}\n`);

  const results = {
    total: 0,
    success: 0,
    redirect: 0,
    error: 0,
    notFound: 0
  };

  for (const [category, urls] of Object.entries(pages)) {
    console.log(`${colors.bright}${colors.blue}${category}${colors.reset}`);
    console.log('─'.repeat(50));

    for (const url of urls) {
      const result = await testUrl(url);
      results.total++;

      if (result.status === 200) {
        results.success++;
      } else if (result.status >= 300 && result.status < 400) {
        results.redirect++;
      } else if (result.status === 404) {
        results.notFound++;
      } else {
        results.error++;
      }

      const statusStr = formatStatus(result.status);
      const urlStr = url.padEnd(50);
      
      console.log(`${urlStr} ${statusStr}`);
      
      if (result.redirect) {
        console.log(`   ${colors.yellow}↳ Redirects to: ${result.redirect}${colors.reset}`);
      }
      if (result.error) {
        console.log(`   ${colors.red}↳ Error: ${result.error}${colors.reset}`);
      }
    }
    console.log('');
  }

  // Summary
  console.log(`${colors.bright}${colors.blue}Summary${colors.reset}`);
  console.log('─'.repeat(50));
  console.log(`Total Pages Tested: ${results.total}`);
  console.log(`${colors.green}✓ Success (200): ${results.success}${colors.reset}`);
  console.log(`${colors.yellow}→ Redirects (3xx): ${results.redirect}${colors.reset}`);
  console.log(`${colors.red}✗ Not Found (404): ${results.notFound}${colors.reset}`);
  console.log(`${colors.red}✗ Errors: ${results.error}${colors.reset}`);
  
  const successRate = ((results.success / results.total) * 100).toFixed(1);
  console.log(`\nSuccess Rate: ${successRate}%`);

  // List problem pages
  if (results.notFound > 0 || results.error > 0) {
    console.log(`\n${colors.red}${colors.bright}Problem Pages:${colors.reset}`);
    console.log('─'.repeat(50));
    
    // Re-test to list problems
    for (const [category, urls] of Object.entries(pages)) {
      for (const url of urls) {
        const result = await testUrl(url);
        if (result.status === 404 || result.status === 'ERROR' || result.status === 'TIMEOUT') {
          console.log(`${colors.red}${url} - ${result.status}${colors.reset}`);
        }
      }
    }
  }
}

// Run the tests
testAllPages().catch(console.error);