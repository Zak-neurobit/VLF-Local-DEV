#!/usr/bin/env node

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const TEST_TIMEOUT = 30000; // 30 seconds per test
const DELAY_BETWEEN_TESTS = 100; // 100ms delay to avoid overwhelming server

// Comprehensive page list with expected behavior
const testConfig = {
  'Core Navigation Pages': {
    pages: [
      { url: '/', expectedStatus: 200, description: 'Homepage' },
      { url: '/practice-areas', expectedStatus: 200, description: 'Practice Areas' },
      { url: '/attorneys', expectedStatus: 200, description: 'Attorneys List' },
      { url: '/locations', expectedStatus: 200, description: 'Office Locations' },
      { url: '/about', expectedStatus: 200, description: 'About Us' },
      { url: '/blog', expectedStatus: 200, description: 'Blog' },
      { url: '/scholarship', expectedStatus: 200, description: 'Scholarship Program' },
      { url: '/contact', expectedStatus: 200, description: 'Contact Form' },
      { url: '/make-payment', expectedStatus: 200, description: 'Payment Page' },
    ]
  },
  'Practice Area Subpages': {
    pages: [
      { url: '/practice-areas/immigration', expectedStatus: 200, description: 'Immigration Law' },
      { url: '/practice-areas/personal-injury', expectedStatus: 200, description: 'Personal Injury' },
      { url: '/practice-areas/criminal-defense', expectedStatus: 200, description: 'Criminal Defense' },
      { url: '/practice-areas/workers-compensation', expectedStatus: 200, description: 'Workers Comp' },
      { url: '/practice-areas/family-law', expectedStatus: 200, description: 'Family Law' },
      { url: '/practice-areas/traffic-violations', expectedStatus: 200, description: 'Traffic Violations' },
    ]
  },
  'Attorney Profile Pages': {
    pages: [
      { url: '/attorneys/william-vasquez', expectedStatus: 200, description: 'William Vasquez' },
      { url: '/attorneys/kelly-vega', expectedStatus: 200, description: 'Kelly Vega' },
      { url: '/attorneys/rebecca-sommer', expectedStatus: 200, description: 'Rebecca Sommer' },
      { url: '/attorneys/mark-kelsey', expectedStatus: 200, description: 'Mark Kelsey' },
      { url: '/attorneys/jillian-baucom', expectedStatus: 200, description: 'Jillian Baucom' },
    ]
  },
  'Feature Pages': {
    pages: [
      { url: '/calculators', expectedStatus: 200, description: 'Legal Calculators' },
      { url: '/testimonials', expectedStatus: 200, description: 'Client Testimonials' },
      { url: '/case-results', expectedStatus: 200, description: 'Case Results' },
      { url: '/faq', expectedStatus: 200, description: 'FAQ Page' },
      { url: '/free-consultation', expectedStatus: 200, description: 'Free Consultation' },
      { url: '/ai-consultation', expectedStatus: 200, description: 'AI Consultation' },
      { url: '/ai-evaluation', expectedStatus: 200, description: 'AI Evaluation' },
      { url: '/quick-contact', expectedStatus: 200, description: 'Quick Contact' },
      { url: '/secure-payment', expectedStatus: 200, description: 'Secure Payment' },
      { url: '/payment', expectedStatus: 200, description: 'Payment Portal' },
      { url: '/cutting-edge', expectedStatus: 200, description: 'Cutting Edge Tech' },
    ]
  },
  'Legal/Compliance Pages': {
    pages: [
      { url: '/privacy-policy', expectedStatus: 200, description: 'Privacy Policy' },
      { url: '/terms-of-service', expectedStatus: 200, description: 'Terms of Service' },
      { url: '/sitemap', expectedStatus: 200, description: 'HTML Sitemap' },
    ]
  },
  'Authentication Pages': {
    pages: [
      { url: '/auth/signin', expectedStatus: 200, description: 'Sign In' },
      { url: '/auth/signup', expectedStatus: 200, description: 'Sign Up' },
      { url: '/auth/forgot-password', expectedStatus: 200, description: 'Forgot Password' },
      { url: '/dashboard', expectedStatus: 307, description: 'Dashboard (requires auth)', expectedRedirect: '/auth/signin' },
      { url: '/appointment/manage', expectedStatus: 200, description: 'Appointment Management' },
    ]
  },
  'Spanish Homepage & Navigation': {
    pages: [
      { url: '/es', expectedStatus: 200, description: 'Spanish Homepage' },
      { url: '/es/areas-de-practica', expectedStatus: 200, description: 'Áreas de Práctica' },
      { url: '/es/abogados', expectedStatus: 200, description: 'Abogados' },
      { url: '/es/ubicaciones', expectedStatus: 200, description: 'Ubicaciones' },
      { url: '/es/acerca-de', expectedStatus: 200, description: 'Acerca de' },
      { url: '/es/blog', expectedStatus: 200, description: 'Blog en Español' },
      { url: '/es/becas', expectedStatus: 200, description: 'Programa de Becas' },
      { url: '/es/contacto', expectedStatus: 200, description: 'Contacto' },
      { url: '/es/hacer-pago', expectedStatus: 200, description: 'Hacer Pago' },
    ]
  },
  'Spanish Practice Areas': {
    pages: [
      { url: '/es/areas-de-practica/inmigracion', expectedStatus: 200, description: 'Inmigración' },
      { url: '/es/areas-de-practica/lesiones-personales', expectedStatus: 200, description: 'Lesiones Personales' },
      { url: '/es/areas-de-practica/defensa-criminal', expectedStatus: 200, description: 'Defensa Criminal' },
      { url: '/es/areas-de-practica/compensacion-laboral', expectedStatus: 200, description: 'Compensación Laboral' },
      { url: '/es/areas-de-practica/derecho-familia', expectedStatus: 200, description: 'Derecho Familiar' },
      { url: '/es/areas-de-practica/infracciones-transito', expectedStatus: 200, description: 'Infracciones de Tránsito' },
    ]
  },
  'Spanish Feature Pages': {
    pages: [
      { url: '/es/calculadoras', expectedStatus: 200, description: 'Calculadoras' },
      { url: '/es/testimonios', expectedStatus: 200, description: 'Testimonios' },
      { url: '/es/resultados-casos', expectedStatus: 200, description: 'Resultados de Casos' },
      { url: '/es/preguntas-frecuentes', expectedStatus: 200, description: 'Preguntas Frecuentes' },
      { url: '/es/consulta-gratis', expectedStatus: 200, description: 'Consulta Gratis' },
      { url: '/es/pago', expectedStatus: 200, description: 'Portal de Pago' },
      { url: '/es/politica-privacidad', expectedStatus: 200, description: 'Política de Privacidad' },
      { url: '/es/terminos-servicio', expectedStatus: 200, description: 'Términos de Servicio' },
      { url: '/es/mapa-del-sitio', expectedStatus: 200, description: 'Mapa del Sitio' },
    ]
  },
  'API Endpoints': {
    pages: [
      { url: '/api/health/db', expectedStatus: 200, description: 'Database Health', validateJson: true },
      { url: '/api/auth/session', expectedStatus: 200, description: 'Auth Session' },
      { url: '/api/news/ticker', expectedStatus: 200, description: 'News Ticker', validateJson: true },
      { url: '/api/blog/latest', expectedStatus: 200, description: 'Latest Blog Posts', validateJson: true },
      { url: '/api/reviews/recent', expectedStatus: 200, description: 'Recent Reviews', validateJson: true },
      { url: '/api/cases/recent-wins', expectedStatus: 200, description: 'Recent Case Wins', validateJson: true },
      { url: '/api/blog/sitemap', expectedStatus: 200, description: 'Blog Sitemap' },
      { url: '/api/sitemap', expectedStatus: 200, description: 'XML Sitemap' },
      { url: '/api/hreflang-sitemap', expectedStatus: 200, description: 'Hreflang Sitemap' },
    ]
  },
  'Dynamic Routes (Sample)': {
    pages: [
      { url: '/blog/guia-completa-inmigracion-florida-carolina-norte', expectedStatus: 200, description: 'Blog Post' },
      { url: '/locations/raleigh-immigration-lawyer', expectedStatus: 200, description: 'Location Page' },
      { url: '/near-me/raleigh-immigration-lawyer-near-me', expectedStatus: 200, description: 'Near Me Page' },
    ]
  },
  'Error Handling': {
    pages: [
      { url: '/non-existent-page', expectedStatus: 404, description: '404 Error Page' },
      { url: '/api/non-existent-api', expectedStatus: 404, description: 'API 404' },
    ]
  }
};

// Test result tracking
const results = {
  passed: 0,
  failed: 0,
  total: 0,
  startTime: Date.now(),
  categories: {},
  failures: []
};

// Colors for output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Delay helper
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Test a single URL
async function testUrl(config) {
  const { url, expectedStatus, description, validateJson, expectedRedirect } = config;
  
  return new Promise((resolve) => {
    const fullUrl = new URL(url, BASE_URL);
    const protocol = fullUrl.protocol === 'https:' ? https : http;
    
    const startTime = Date.now();
    let responseData = '';
    
    const req = protocol.get(fullUrl.toString(), { timeout: TEST_TIMEOUT }, (res) => {
      res.on('data', chunk => responseData += chunk);
      
      res.on('end', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        const result = {
          url,
          description,
          actualStatus: res.statusCode,
          expectedStatus,
          duration,
          passed: res.statusCode === expectedStatus,
          redirect: res.headers.location,
          responseSize: responseData.length
        };
        
        // Validate redirect if expected
        if (expectedRedirect && res.headers.location) {
          result.redirectCorrect = res.headers.location.includes(expectedRedirect);
          result.passed = result.passed && result.redirectCorrect;
        }
        
        // Validate JSON if required
        if (validateJson && result.passed) {
          try {
            JSON.parse(responseData);
            result.validJson = true;
          } catch (e) {
            result.validJson = false;
            result.passed = false;
            result.jsonError = e.message;
          }
        }
        
        resolve(result);
      });
    });
    
    req.on('error', (err) => {
      const endTime = Date.now();
      resolve({
        url,
        description,
        actualStatus: 'ERROR',
        expectedStatus,
        duration: endTime - startTime,
        passed: false,
        error: err.message
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        description,
        actualStatus: 'TIMEOUT',
        expectedStatus,
        duration: TEST_TIMEOUT,
        passed: false,
        error: 'Request timed out'
      });
    });
  });
}

// Format status code with color
function formatStatus(actual, expected) {
  const color = actual === expected ? colors.green : colors.red;
  return `${color}${actual}${colors.reset}`;
}

// Format duration
function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

// Main test runner
async function runTests() {
  console.log(`\n${colors.bright}${colors.blue}🧪 Vasquez Law Firm - Comprehensive Site Testing${colors.reset}`);
  console.log(`${colors.cyan}Testing against: ${BASE_URL}${colors.reset}`);
  console.log(`${colors.cyan}Timeout per test: ${TEST_TIMEOUT/1000}s${colors.reset}\n`);
  
  // Test each category
  for (const [categoryName, category] of Object.entries(testConfig)) {
    console.log(`\n${colors.bright}${colors.magenta}📁 ${categoryName}${colors.reset}`);
    console.log('─'.repeat(70));
    
    results.categories[categoryName] = { passed: 0, failed: 0, tests: [] };
    
    for (const pageConfig of category.pages) {
      await delay(DELAY_BETWEEN_TESTS); // Avoid overwhelming the server
      
      const result = await testUrl(pageConfig);
      results.total++;
      
      if (result.passed) {
        results.passed++;
        results.categories[categoryName].passed++;
        console.log(`✅ ${result.description.padEnd(30)} ${result.url.padEnd(50)} ${formatStatus(result.actualStatus, result.expectedStatus)} ${colors.cyan}${formatDuration(result.duration)}${colors.reset}`);
      } else {
        results.failed++;
        results.categories[categoryName].failed++;
        results.failures.push(result);
        console.log(`❌ ${result.description.padEnd(30)} ${result.url.padEnd(50)} ${formatStatus(result.actualStatus, result.expectedStatus)} ${colors.cyan}${formatDuration(result.duration)}${colors.reset}`);
        
        if (result.error) {
          console.log(`   ${colors.red}↳ Error: ${result.error}${colors.reset}`);
        }
        if (result.jsonError) {
          console.log(`   ${colors.red}↳ Invalid JSON: ${result.jsonError}${colors.reset}`);
        }
        if (result.redirect) {
          console.log(`   ${colors.yellow}↳ Redirected to: ${result.redirect}${colors.reset}`);
        }
      }
      
      results.categories[categoryName].tests.push(result);
    }
    
    // Category summary
    const catPassed = results.categories[categoryName].passed;
    const catTotal = category.pages.length;
    const catPercent = ((catPassed / catTotal) * 100).toFixed(1);
    console.log(`\n${colors.cyan}Category Summary: ${catPassed}/${catTotal} passed (${catPercent}%)${colors.reset}`);
  }
  
  // Overall summary
  const endTime = Date.now();
  const totalDuration = (endTime - results.startTime) / 1000;
  
  console.log('\n' + '═'.repeat(70));
  console.log(`${colors.bright}${colors.blue}📊 OVERALL TEST SUMMARY${colors.reset}`);
  console.log('═'.repeat(70));
  console.log(`${colors.green}✅ Passed: ${results.passed}/${results.total} (${((results.passed/results.total)*100).toFixed(1)}%)${colors.reset}`);
  console.log(`${colors.red}❌ Failed: ${results.failed}/${results.total}${colors.reset}`);
  console.log(`${colors.cyan}⏱️  Total Duration: ${totalDuration.toFixed(1)}s${colors.reset}`);
  console.log(`${colors.cyan}⚡ Average Speed: ${(results.total/totalDuration).toFixed(1)} tests/second${colors.reset}`);
  
  // Category breakdown
  console.log(`\n${colors.bright}Category Breakdown:${colors.reset}`);
  for (const [name, cat] of Object.entries(results.categories)) {
    const percent = ((cat.passed / cat.tests.length) * 100).toFixed(0);
    const icon = percent === '100' ? '✅' : percent >= '80' ? '⚠️ ' : '❌';
    console.log(`${icon} ${name.padEnd(35)} ${cat.passed}/${cat.tests.length} (${percent}%)`);
  }
  
  // Failed tests summary
  if (results.failures.length > 0) {
    console.log(`\n${colors.bright}${colors.red}Failed Tests:${colors.reset}`);
    for (const failure of results.failures) {
      console.log(`❌ ${failure.url} - Expected: ${failure.expectedStatus}, Got: ${failure.actualStatus}`);
    }
  }
  
  // Save detailed report
  const reportPath = path.join(__dirname, '../test-results.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n${colors.cyan}📄 Detailed report saved to: ${reportPath}${colors.reset}`);
  
  // Final verdict
  if (results.failed === 0) {
    console.log(`\n${colors.bright}${colors.green}✨ ALL TESTS PASSED! The site is working perfectly! ✨${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`\n${colors.bright}${colors.red}⚠️  ${results.failed} tests failed. Please review the failures above.${colors.reset}\n`);
    process.exit(1);
  }
}

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error(`\n${colors.red}Unhandled error:${colors.reset}`, err);
  process.exit(1);
});

// Run the tests
runTests().catch(console.error);