#!/usr/bin/env node

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const TEST_TIMEOUT = 30000; // 30 seconds per test
const DELAY_BETWEEN_TESTS = 100; // 100ms delay to avoid overwhelming server
const ENABLE_CONSOLE_ERROR_CHECK = process.env.CHECK_CONSOLE !== 'false'; // Enable console error checking

// Comprehensive test configuration
const testConfig = {
  'Core Navigation Pages': {
    pages: [
      { url: '/', expectedStatus: 200, description: 'Homepage', checkContent: true },
      { url: '/practice-areas', expectedStatus: 200, description: 'Practice Areas', checkContent: true },
      { url: '/attorneys', expectedStatus: 200, description: 'Attorneys List', checkContent: true },
      { url: '/locations', expectedStatus: 200, description: 'Office Locations', checkContent: true },
      { url: '/about', expectedStatus: 200, description: 'About Us', checkContent: true },
      { url: '/blog', expectedStatus: 200, description: 'Blog', checkContent: true },
      { url: '/scholarship', expectedStatus: 200, description: 'Scholarship Program', checkContent: true },
      { url: '/contact', expectedStatus: 200, description: 'Contact Form', checkContent: true },
      { url: '/make-payment', expectedStatus: 200, description: 'Payment Page', checkContent: true },
    ]
  },
  'Practice Area Subpages': {
    pages: [
      { url: '/practice-areas/immigration', expectedStatus: 200, description: 'Immigration Law', checkContent: true },
      { url: '/practice-areas/personal-injury', expectedStatus: 200, description: 'Personal Injury', checkContent: true },
      { url: '/practice-areas/criminal-defense', expectedStatus: 200, description: 'Criminal Defense', checkContent: true },
      { url: '/practice-areas/workers-compensation', expectedStatus: 200, description: 'Workers Comp', checkContent: true },
      { url: '/practice-areas/family-law', expectedStatus: 200, description: 'Family Law', checkContent: true },
      { url: '/practice-areas/traffic-violations', expectedStatus: 200, description: 'Traffic Violations', checkContent: true },
    ]
  },
  'Attorney Profile Pages': {
    pages: [
      { url: '/attorneys/william-vasquez', expectedStatus: 200, description: 'William Vasquez', checkContent: true },
      { url: '/attorneys/kelly-vega', expectedStatus: 200, description: 'Kelly Vega', checkContent: true },
      { url: '/attorneys/rebecca-sommer', expectedStatus: 200, description: 'Rebecca Sommer', checkContent: true },
      { url: '/attorneys/mark-kelsey', expectedStatus: 200, description: 'Mark Kelsey', checkContent: true },
      { url: '/attorneys/jillian-baucom', expectedStatus: 200, description: 'Jillian Baucom', checkContent: true },
    ]
  },
  'Feature Pages': {
    pages: [
      { url: '/calculators', expectedStatus: 200, description: 'Legal Calculators', checkContent: true },
      { url: '/testimonials', expectedStatus: 200, description: 'Client Testimonials', checkContent: true },
      { url: '/case-results', expectedStatus: 200, description: 'Case Results', checkContent: true },
      { url: '/faq', expectedStatus: 200, description: 'FAQ Page', checkContent: true },
      { url: '/free-consultation', expectedStatus: 200, description: 'Free Consultation', checkContent: true },
      { url: '/ai-consultation', expectedStatus: 200, description: 'AI Consultation', checkContent: true },
      { url: '/ai-evaluation', expectedStatus: 200, description: 'AI Evaluation', checkContent: true },
      { url: '/quick-contact', expectedStatus: 200, description: 'Quick Contact', checkContent: true },
      { url: '/secure-payment', expectedStatus: 200, description: 'Secure Payment', checkContent: true },
      { url: '/payment', expectedStatus: 200, description: 'Payment Portal', checkContent: true },
      { url: '/cutting-edge', expectedStatus: 200, description: 'Cutting Edge Tech', checkContent: true },
    ]
  },
  'Legal/Compliance Pages': {
    pages: [
      { url: '/privacy-policy', expectedStatus: 200, description: 'Privacy Policy', checkContent: true },
      { url: '/terms-of-service', expectedStatus: 200, description: 'Terms of Service', checkContent: true },
      { url: '/sitemap', expectedStatus: 200, description: 'HTML Sitemap', checkContent: true },
      { url: '/cookie-policy', expectedStatus: 200, description: 'Cookie Policy', checkContent: true },
      { url: '/legal-disclaimer', expectedStatus: 200, description: 'Legal Disclaimer', checkContent: true },
      { url: '/accessibility', expectedStatus: 200, description: 'Accessibility Statement', checkContent: true },
    ]
  },
  'Authentication Pages': {
    pages: [
      { url: '/auth/signin', expectedStatus: 200, description: 'Sign In', checkContent: true },
      { url: '/auth/signup', expectedStatus: 200, description: 'Sign Up', checkContent: true },
      { url: '/auth/forgot-password', expectedStatus: 200, description: 'Forgot Password', checkContent: true },
      { url: '/dashboard', expectedStatus: 307, description: 'Dashboard (requires auth)', expectedRedirect: '/auth/signin' },
      { url: '/appointment/manage', expectedStatus: 200, description: 'Appointment Management', checkContent: true },
    ]
  },
  'Spanish Homepage & Navigation': {
    pages: [
      { url: '/es', expectedStatus: 200, description: 'Spanish Homepage', checkContent: true },
      { url: '/es/areas-de-practica', expectedStatus: 200, description: 'Áreas de Práctica', checkContent: true },
      { url: '/es/abogados', expectedStatus: 200, description: 'Abogados', checkContent: true },
      { url: '/es/ubicaciones', expectedStatus: 200, description: 'Ubicaciones', checkContent: true },
      { url: '/es/acerca-de', expectedStatus: 200, description: 'Acerca de', checkContent: true },
      { url: '/es/blog', expectedStatus: 200, description: 'Blog en Español', checkContent: true },
      { url: '/es/becas', expectedStatus: 200, description: 'Programa de Becas', checkContent: true },
      { url: '/es/contacto', expectedStatus: 200, description: 'Contacto', checkContent: true },
      { url: '/es/hacer-pago', expectedStatus: 200, description: 'Hacer Pago', checkContent: true },
    ]
  },
  'Spanish Practice Areas': {
    pages: [
      { url: '/es/areas-de-practica/inmigracion', expectedStatus: 200, description: 'Inmigración', checkContent: true },
      { url: '/es/areas-de-practica/lesiones-personales', expectedStatus: 200, description: 'Lesiones Personales', checkContent: true },
      { url: '/es/areas-de-practica/defensa-criminal', expectedStatus: 200, description: 'Defensa Criminal', checkContent: true },
      { url: '/es/areas-de-practica/compensacion-laboral', expectedStatus: 200, description: 'Compensación Laboral', checkContent: true },
      { url: '/es/areas-de-practica/derecho-familia', expectedStatus: 200, description: 'Derecho Familiar', checkContent: true },
      { url: '/es/areas-de-practica/infracciones-transito', expectedStatus: 200, description: 'Infracciones de Tránsito', checkContent: true },
    ]
  },
  'Spanish Feature Pages': {
    pages: [
      { url: '/es/calculadoras', expectedStatus: 200, description: 'Calculadoras', checkContent: true },
      { url: '/es/testimonios', expectedStatus: 200, description: 'Testimonios', checkContent: true },
      { url: '/es/resultados-casos', expectedStatus: 200, description: 'Resultados de Casos', checkContent: true },
      { url: '/es/preguntas-frecuentes', expectedStatus: 200, description: 'Preguntas Frecuentes', checkContent: true },
      { url: '/es/consulta-gratis', expectedStatus: 200, description: 'Consulta Gratis', checkContent: true },
      { url: '/es/pago', expectedStatus: 200, description: 'Portal de Pago', checkContent: true },
      { url: '/es/politica-privacidad', expectedStatus: 200, description: 'Política de Privacidad', checkContent: true },
      { url: '/es/terminos-servicio', expectedStatus: 200, description: 'Términos de Servicio', checkContent: true },
      { url: '/es/mapa-del-sitio', expectedStatus: 200, description: 'Mapa del Sitio', checkContent: true },
    ]
  },
  'API Endpoints': {
    pages: [
      { url: '/api/health/db', expectedStatus: 200, description: 'Database Health', validateJson: true },
      { url: '/api/auth/session', expectedStatus: 200, description: 'Auth Session', validateJson: true },
      { url: '/api/news/ticker', expectedStatus: 200, description: 'News Ticker', validateJson: true },
      { url: '/api/blog/latest', expectedStatus: 200, description: 'Latest Blog Posts', validateJson: true },
      { url: '/api/reviews/recent', expectedStatus: 200, description: 'Recent Reviews', validateJson: true },
      { url: '/api/cases/recent-wins', expectedStatus: 200, description: 'Recent Case Wins', validateJson: true },
      { url: '/api/blog/sitemap', expectedStatus: 200, description: 'Blog Sitemap' },
      { url: '/api/sitemap', expectedStatus: 200, description: 'XML Sitemap' },
      { url: '/api/hreflang-sitemap', expectedStatus: 200, description: 'Hreflang Sitemap' },
      { url: '/api/blog/rss', expectedStatus: 200, description: 'RSS Feed' },
      { url: '/api/location', expectedStatus: 200, description: 'Location API', validateJson: true },
      { url: '/api/dashboard/metrics', expectedStatus: 200, description: 'Dashboard Metrics', validateJson: true },
    ]
  },
  'Dynamic Routes (Sample)': {
    pages: [
      { url: '/blog/guia-completa-inmigracion-florida-carolina-norte', expectedStatus: 200, description: 'Blog Post', checkContent: true },
      { url: '/locations/raleigh-immigration-lawyer', expectedStatus: 200, description: 'Location Page', checkContent: true },
      { url: '/near-me/raleigh-immigration-lawyer-near-me', expectedStatus: 200, description: 'Near Me Page', checkContent: true },
    ]
  },
  'Media & Resources': {
    pages: [
      { url: '/media', expectedStatus: 200, description: 'Media Center', checkContent: true },
      { url: '/resources/immigration-guides', expectedStatus: 200, description: 'Immigration Guides', checkContent: true },
      { url: '/resources/legal-forms', expectedStatus: 200, description: 'Legal Forms', checkContent: true },
    ]
  },
  'Error Handling': {
    pages: [
      { url: '/non-existent-page', expectedStatus: 404, description: '404 Error Page', checkErrorPage: true },
      { url: '/api/non-existent-api', expectedStatus: 404, description: 'API 404' },
    ]
  }
};

// Navigation link tests
const navigationTests = [
  // English navigation
  { from: '/', to: '/practice-areas', description: 'Home → Practice Areas' },
  { from: '/', to: '/attorneys', description: 'Home → Attorneys' },
  { from: '/', to: '/locations', description: 'Home → Locations' },
  { from: '/', to: '/contact', description: 'Home → Contact' },
  { from: '/', to: '/blog', description: 'Home → Blog' },
  { from: '/practice-areas', to: '/practice-areas/immigration', description: 'Practice Areas → Immigration' },
  { from: '/practice-areas', to: '/practice-areas/personal-injury', description: 'Practice Areas → Personal Injury' },
  { from: '/attorneys', to: '/attorneys/william-vasquez', description: 'Attorneys → William Vasquez' },
  
  // Language switching
  { from: '/', to: '/es', description: 'English → Spanish (Homepage)' },
  { from: '/es', to: '/', description: 'Spanish → English (Homepage)' },
  { from: '/blog', to: '/es/blog', description: 'English Blog → Spanish Blog' },
  { from: '/es/blog', to: '/blog', description: 'Spanish Blog → English Blog' },
  { from: '/contact', to: '/es/contacto', description: 'English Contact → Spanish Contact' },
  
  // Footer links
  { from: '/', to: '/privacy-policy', description: 'Home → Privacy Policy' },
  { from: '/', to: '/terms-of-service', description: 'Home → Terms of Service' },
  { from: '/', to: '/sitemap', description: 'Home → Sitemap' },
];

// Test result tracking
const results = {
  passed: 0,
  failed: 0,
  total: 0,
  startTime: Date.now(),
  categories: {},
  failures: [],
  navigationResults: [],
  consoleErrors: [],
  performanceIssues: []
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

// Utility functions
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function formatStatus(actual, expected) {
  const color = actual === expected ? colors.green : colors.red;
  return `${color}${actual}${colors.reset}`;
}

function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

// Test a single URL
async function testUrl(config) {
  const { url, expectedStatus, description, validateJson, expectedRedirect, checkContent, checkErrorPage } = config;
  
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
          responseSize: responseData.length,
          contentType: res.headers['content-type']
        };
        
        // Check for performance issues
        if (duration > 3000) {
          result.performanceWarning = `Slow response: ${formatDuration(duration)}`;
          results.performanceIssues.push({ url, duration });
        }
        
        // Validate redirect if expected
        if (expectedRedirect && res.headers.location) {
          result.redirectCorrect = res.headers.location.includes(expectedRedirect);
          result.passed = result.passed && result.redirectCorrect;
        }
        
        // Validate JSON if required
        if (validateJson && result.passed) {
          try {
            const jsonData = JSON.parse(responseData);
            result.validJson = true;
            result.jsonDataPresent = Object.keys(jsonData).length > 0;
          } catch (e) {
            result.validJson = false;
            result.passed = false;
            result.jsonError = e.message;
          }
        }
        
        // Check content if required
        if (checkContent && result.passed) {
          result.hasTitle = responseData.includes('<title>') || responseData.includes('<Title>');
          result.hasBody = responseData.includes('<body') || responseData.includes('<Body');
          result.hasContent = responseData.length > 1000;
          result.hasNoErrorMessage = !responseData.includes('Error:') && !responseData.includes('error:');
          
          if (!result.hasContent || !result.hasNoErrorMessage) {
            result.passed = false;
            result.contentError = 'Page appears to be empty or contains errors';
          }
        }
        
        // Check error page formatting
        if (checkErrorPage && result.passed) {
          result.hasErrorPageContent = responseData.includes('404') || responseData.includes('not found');
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

// Test navigation links
async function testNavigation(fromUrl, toUrl, description) {
  return new Promise((resolve) => {
    http.get(`${BASE_URL}${fromUrl}`, (res1) => {
      let data1 = '';
      res1.on('data', chunk => data1 += chunk);
      res1.on('end', () => {
        // Check if the link exists in the HTML
        const linkExists = data1.includes(`href="${toUrl}"`) || 
                          data1.includes(`href='${toUrl}'`) ||
                          data1.includes(`to="${toUrl}"`) ||
                          data1.includes(`to='${toUrl}'`);
        
        // Then try to navigate to the target
        http.get(`${BASE_URL}${toUrl}`, (res2) => {
          let data2 = '';
          res2.on('data', chunk => data2 += chunk);
          res2.on('end', () => {
            resolve({
              description,
              from: fromUrl,
              to: toUrl,
              linkExists,
              targetStatus: res2.statusCode,
              targetLoads: res2.statusCode === 200,
              hasContent: data2.length > 1000,
              passed: linkExists && res2.statusCode === 200
            });
          });
        }).on('error', (err) => {
          resolve({
            description,
            from: fromUrl,
            to: toUrl,
            linkExists,
            error: err.message,
            passed: false
          });
        });
      });
    }).on('error', (err) => {
      resolve({
        description,
        from: fromUrl,
        to: toUrl,
        error: err.message,
        passed: false
      });
    });
  });
}

// Check for console errors (using Playwright if available)
async function checkConsoleErrors() {
  try {
    // Check if Playwright is installed
    const { chromium } = require('playwright');
    
    console.log(`\n${colors.bright}${colors.magenta}🔍 Checking for Console Errors${colors.reset}`);
    console.log('─'.repeat(70));
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Listen for console messages
    const consoleMessages = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push({
          text: msg.text(),
          url: page.url()
        });
      }
    });
    
    // Test a few key pages
    const pagesToCheck = [
      '/',
      '/practice-areas',
      '/blog',
      '/contact',
      '/es'
    ];
    
    for (const pageUrl of pagesToCheck) {
      await page.goto(`${BASE_URL}${pageUrl}`, { waitUntil: 'networkidle' });
      await delay(1000); // Wait for any delayed errors
    }
    
    await browser.close();
    
    if (consoleMessages.length > 0) {
      console.log(`${colors.red}Found ${consoleMessages.length} console errors:${colors.reset}`);
      consoleMessages.forEach(msg => {
        console.log(`  ❌ ${msg.url}: ${msg.text}`);
      });
      results.consoleErrors = consoleMessages;
    } else {
      console.log(`${colors.green}✅ No console errors found${colors.reset}`);
    }
    
  } catch (err) {
    console.log(`${colors.yellow}⚠️  Playwright not installed. Skipping console error check.${colors.reset}`);
    console.log(`   To enable: npm install playwright`);
  }
}

// Main test runner
async function runTests() {
  console.log(`\n${colors.bright}${colors.blue}🧪 Vasquez Law Firm - Comprehensive Site Testing${colors.reset}`);
  console.log(`${colors.cyan}Testing against: ${BASE_URL}${colors.reset}`);
  console.log(`${colors.cyan}Timeout per test: ${TEST_TIMEOUT/1000}s${colors.reset}`);
  console.log(`${colors.cyan}Started at: ${new Date().toLocaleString()}${colors.reset}\n`);
  
  // 1. Test all pages
  console.log(`${colors.bright}${colors.blue}📄 TESTING ALL PAGES${colors.reset}`);
  console.log('═'.repeat(70));
  
  for (const [categoryName, category] of Object.entries(testConfig)) {
    console.log(`\n${colors.bright}${colors.magenta}📁 ${categoryName}${colors.reset}`);
    console.log('─'.repeat(70));
    
    results.categories[categoryName] = { passed: 0, failed: 0, tests: [] };
    
    for (const pageConfig of category.pages) {
      await delay(DELAY_BETWEEN_TESTS);
      
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
        if (result.contentError) {
          console.log(`   ${colors.red}↳ Content Issue: ${result.contentError}${colors.reset}`);
        }
        if (result.redirect) {
          console.log(`   ${colors.yellow}↳ Redirected to: ${result.redirect}${colors.reset}`);
        }
      }
      
      if (result.performanceWarning) {
        console.log(`   ${colors.yellow}⚠️  ${result.performanceWarning}${colors.reset}`);
      }
      
      results.categories[categoryName].tests.push(result);
    }
    
    // Category summary
    const catPassed = results.categories[categoryName].passed;
    const catTotal = category.pages.length;
    const catPercent = ((catPassed / catTotal) * 100).toFixed(1);
    console.log(`\n${colors.cyan}Category Summary: ${catPassed}/${catTotal} passed (${catPercent}%)${colors.reset}`);
  }
  
  // 2. Test navigation links
  console.log(`\n${colors.bright}${colors.blue}🔗 TESTING NAVIGATION LINKS${colors.reset}`);
  console.log('═'.repeat(70));
  
  for (const navTest of navigationTests) {
    const navResult = await testNavigation(navTest.from, navTest.to, navTest.description);
    results.navigationResults.push(navResult);
    
    if (navResult.passed) {
      console.log(`✅ ${navResult.description.padEnd(40)} Link: ${navResult.linkExists ? '✓' : '✗'} | Loads: ${navResult.targetLoads ? '✓' : '✗'}`);
    } else {
      console.log(`❌ ${navResult.description.padEnd(40)} Link: ${navResult.linkExists ? '✓' : '✗'} | Loads: ${navResult.targetLoads ? '✓' : '✗'}`);
      if (navResult.error) {
        console.log(`   ${colors.red}↳ Error: ${navResult.error}${colors.reset}`);
      }
    }
  }
  
  const navPassed = results.navigationResults.filter(r => r.passed).length;
  const navTotal = results.navigationResults.length;
  console.log(`\n${colors.cyan}Navigation Summary: ${navPassed}/${navTotal} passed (${((navPassed/navTotal)*100).toFixed(1)}%)${colors.reset}`);
  
  // 3. Check for console errors (if Playwright is available)
  if (ENABLE_CONSOLE_ERROR_CHECK) {
    await checkConsoleErrors();
  }
  
  // 4. Generate comprehensive report
  const endTime = Date.now();
  const totalDuration = (endTime - results.startTime) / 1000;
  
  console.log('\n' + '═'.repeat(70));
  console.log(`${colors.bright}${colors.blue}📊 COMPREHENSIVE TEST SUMMARY${colors.reset}`);
  console.log('═'.repeat(70));
  
  // Overall stats
  console.log(`\n${colors.bright}Overall Results:${colors.reset}`);
  console.log(`${colors.green}✅ Pages Passed: ${results.passed}/${results.total} (${((results.passed/results.total)*100).toFixed(1)}%)${colors.reset}`);
  console.log(`${colors.red}❌ Pages Failed: ${results.failed}/${results.total}${colors.reset}`);
  console.log(`${colors.green}✅ Navigation Tests Passed: ${navPassed}/${navTotal}${colors.reset}`);
  console.log(`${colors.cyan}⏱️  Total Duration: ${totalDuration.toFixed(1)}s${colors.reset}`);
  console.log(`${colors.cyan}⚡ Average Speed: ${(results.total/totalDuration).toFixed(1)} tests/second${colors.reset}`);
  
  // Category breakdown
  console.log(`\n${colors.bright}Category Breakdown:${colors.reset}`);
  for (const [name, cat] of Object.entries(results.categories)) {
    const percent = ((cat.passed / cat.tests.length) * 100).toFixed(0);
    const icon = percent === '100' ? '✅' : percent >= '80' ? '⚠️ ' : '❌';
    console.log(`${icon} ${name.padEnd(35)} ${cat.passed}/${cat.tests.length} (${percent}%)`);
  }
  
  // Performance issues
  if (results.performanceIssues.length > 0) {
    console.log(`\n${colors.bright}${colors.yellow}⚠️  Performance Issues:${colors.reset}`);
    results.performanceIssues.forEach(issue => {
      console.log(`  - ${issue.url}: ${formatDuration(issue.duration)}`);
    });
  }
  
  // Console errors
  if (results.consoleErrors.length > 0) {
    console.log(`\n${colors.bright}${colors.red}Console Errors Found:${colors.reset}`);
    results.consoleErrors.forEach(error => {
      console.log(`  ❌ ${error.url}: ${error.text}`);
    });
  }
  
  // Failed tests summary
  if (results.failures.length > 0) {
    console.log(`\n${colors.bright}${colors.red}Failed Tests:${colors.reset}`);
    for (const failure of results.failures) {
      console.log(`❌ ${failure.url} - Expected: ${failure.expectedStatus}, Got: ${failure.actualStatus}`);
      if (failure.error) console.log(`   Error: ${failure.error}`);
    }
  }
  
  // Failed navigation tests
  const failedNav = results.navigationResults.filter(r => !r.passed);
  if (failedNav.length > 0) {
    console.log(`\n${colors.bright}${colors.red}Failed Navigation Tests:${colors.reset}`);
    failedNav.forEach(nav => {
      console.log(`❌ ${nav.description}`);
      if (!nav.linkExists) console.log(`   - Link not found in source page`);
      if (!nav.targetLoads) console.log(`   - Target page doesn't load`);
    });
  }
  
  // Save detailed report
  const report = {
    summary: {
      totalPages: results.total,
      pagesPassed: results.passed,
      pagesFailed: results.failed,
      navigationTests: navTotal,
      navigationPassed: navPassed,
      consoleErrors: results.consoleErrors.length,
      performanceIssues: results.performanceIssues.length,
      duration: totalDuration,
      timestamp: new Date().toISOString()
    },
    categories: results.categories,
    failures: results.failures,
    navigationResults: results.navigationResults,
    consoleErrors: results.consoleErrors,
    performanceIssues: results.performanceIssues
  };
  
  const reportPath = path.join(__dirname, '../test-results-comprehensive.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n${colors.cyan}📄 Detailed report saved to: ${reportPath}${colors.reset}`);
  
  // Generate HTML report
  const htmlReport = generateHTMLReport(report);
  const htmlPath = path.join(__dirname, '../test-results-comprehensive.html');
  fs.writeFileSync(htmlPath, htmlReport);
  console.log(`${colors.cyan}📄 HTML report saved to: ${htmlPath}${colors.reset}`);
  
  // Final verdict
  const overallSuccess = results.failed === 0 && failedNav.length === 0 && results.consoleErrors.length === 0;
  
  if (overallSuccess) {
    console.log(`\n${colors.bright}${colors.green}✨ ALL TESTS PASSED! The site is working perfectly! ✨${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`\n${colors.bright}${colors.red}⚠️  Issues found:${colors.reset}`);
    console.log(`  - ${results.failed} pages failed`);
    console.log(`  - ${failedNav.length} navigation tests failed`);
    console.log(`  - ${results.consoleErrors.length} console errors`);
    console.log(`  - ${results.performanceIssues.length} performance issues`);
    console.log(`\nPlease review the failures above and fix the issues.${colors.reset}\n`);
    process.exit(1);
  }
}

// Generate HTML report
function generateHTMLReport(report) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VLF Site Test Report - ${new Date().toLocaleDateString()}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .header {
            background: #1a5490;
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
        }
        h1 { margin: 0; }
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            margin: 10px 0;
        }
        .stat-label {
            color: #666;
            font-size: 0.9em;
        }
        .success { color: #27ae60; }
        .warning { color: #f39c12; }
        .error { color: #e74c3c; }
        .category {
            background: white;
            margin-bottom: 20px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .category-header {
            background: #34495e;
            color: white;
            padding: 15px 20px;
            font-weight: bold;
        }
        .test-list {
            padding: 0;
            margin: 0;
            list-style: none;
        }
        .test-item {
            padding: 10px 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .test-item:last-child {
            border-bottom: none;
        }
        .test-pass {
            background: #f0fff4;
        }
        .test-fail {
            background: #fff5f5;
        }
        .badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.85em;
            font-weight: bold;
        }
        .badge-success {
            background: #27ae60;
            color: white;
        }
        .badge-error {
            background: #e74c3c;
            color: white;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Vasquez Law Firm - Site Test Report</h1>
        <p>Generated on ${new Date().toLocaleString()}</p>
    </div>
    
    <div class="summary">
        <div class="stat-card">
            <div class="stat-label">Pages Tested</div>
            <div class="stat-number">${report.summary.totalPages}</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Pages Passed</div>
            <div class="stat-number success">${report.summary.pagesPassed}</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Pages Failed</div>
            <div class="stat-number error">${report.summary.pagesFailed}</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Navigation Tests</div>
            <div class="stat-number">${report.summary.navigationPassed}/${report.summary.navigationTests}</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Console Errors</div>
            <div class="stat-number ${report.summary.consoleErrors > 0 ? 'error' : 'success'}">${report.summary.consoleErrors}</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Test Duration</div>
            <div class="stat-number">${report.summary.duration.toFixed(1)}s</div>
        </div>
    </div>
    
    ${Object.entries(report.categories).map(([name, category]) => `
        <div class="category">
            <div class="category-header">
                ${name} - ${category.passed}/${category.tests.length} passed (${((category.passed/category.tests.length)*100).toFixed(0)}%)
            </div>
            <ul class="test-list">
                ${category.tests.map(test => `
                    <li class="test-item ${test.passed ? 'test-pass' : 'test-fail'}">
                        <span>${test.description} - ${test.url}</span>
                        <span class="badge ${test.passed ? 'badge-success' : 'badge-error'}">
                            ${test.actualStatus} ${test.duration ? `(${test.duration}ms)` : ''}
                        </span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('')}
    
    <div class="footer">
        <p>Vasquez Law Firm Site Testing Suite v1.0</p>
    </div>
</body>
</html>
  `;
  
  return html;
}

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error(`\n${colors.red}Unhandled error:${colors.reset}`, err);
  process.exit(1);
});

// Check if server is running before starting tests
async function checkServerRunning() {
  return new Promise((resolve) => {
    const url = new URL('/', BASE_URL);
    const protocol = url.protocol === 'https:' ? https : http;
    
    protocol.get(BASE_URL, (res) => {
      resolve(true);
    }).on('error', () => {
      resolve(false);
    });
  });
}

// Main execution
async function main() {
  // Check if server is running
  const serverRunning = await checkServerRunning();
  
  if (!serverRunning) {
    console.log(`${colors.red}❌ Server is not running at ${BASE_URL}${colors.reset}`);
    console.log(`${colors.yellow}Please start the server with: npm run dev${colors.reset}`);
    process.exit(1);
  }
  
  // Run the comprehensive tests
  await runTests();
}

// Run the tests
main().catch(console.error);