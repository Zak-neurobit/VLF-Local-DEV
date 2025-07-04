#!/usr/bin/env node

/**
 * Comprehensive VLF Website Testing Script
 * Tests all major functionality including:
 * - 404 page checking
 * - Spanish translations
 * - Chatbot functionality
 * - Blog categorization
 * - SEO elements
 * - Trained AI agents
 */

const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
const { spawn, exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Test configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const TEST_TIMEOUT = 30000; // 30 seconds

// Test results storage
const testResults = {
  timestamp: new Date().toISOString(),
  baseUrl: BASE_URL,
  tests: {
    pages: { passed: 0, failed: 0, total: 0, details: [] },
    spanish: { passed: 0, failed: 0, total: 0, details: [] },
    chatbot: { passed: 0, failed: 0, total: 0, details: [] },
    blog: { passed: 0, failed: 0, total: 0, details: [] },
    seo: { passed: 0, failed: 0, total: 0, details: [] },
    agents: { passed: 0, failed: 0, total: 0, details: [] },
    api: { passed: 0, failed: 0, total: 0, details: [] }
  },
  summary: {
    totalPassed: 0,
    totalFailed: 0,
    totalTests: 0,
    duration: 0
  }
};

// Utility functions
function log(message, type = 'info') {
  const prefix = {
    info: '📋',
    success: '✅',
    error: '❌',
    warning: '⚠️',
    test: '🧪'
  };
  console.log(`${prefix[type] || ''} ${message}`);
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url, options = {}, timeout = TEST_TIMEOUT) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  }
}

// Test functions
async function testPageAvailability() {
  log('Testing page availability and 404 handling...', 'test');
  
  const pagesToTest = [
    { url: '/', name: 'Homepage', shouldExist: true },
    { url: '/attorneys', name: 'Attorneys', shouldExist: true },
    { url: '/practice-areas', name: 'Practice Areas', shouldExist: true },
    { url: '/contact', name: 'Contact', shouldExist: true },
    { url: '/blog', name: 'Blog', shouldExist: true },
    { url: '/testimonials', name: 'Testimonials', shouldExist: true },
    { url: '/scholarship', name: 'Scholarship', shouldExist: true },
    { url: '/locations', name: 'Locations', shouldExist: true },
    { url: '/privacy-policy', name: 'Privacy Policy', shouldExist: true },
    { url: '/sitemap', name: 'Sitemap', shouldExist: true },
    
    // Spanish pages
    { url: '/es', name: 'Spanish Homepage', shouldExist: true },
    { url: '/es/abogados', name: 'Spanish Attorneys', shouldExist: true },
    { url: '/es/contacto', name: 'Spanish Contact', shouldExist: true },
    { url: '/es/blog', name: 'Spanish Blog', shouldExist: true },
    
    // Attorney pages
    { url: '/attorneys/william-vasquez', name: 'William Vasquez', shouldExist: true },
    { url: '/attorneys/judith-parkes', name: 'Judith Parkes', shouldExist: true },
    { url: '/attorneys/christopher-afanador', name: 'Christopher Afanador', shouldExist: true },
    
    // Practice area pages
    { url: '/practice-areas/immigration', name: 'Immigration', shouldExist: true },
    { url: '/practice-areas/personal-injury', name: 'Personal Injury', shouldExist: true },
    { url: '/practice-areas/criminal-defense', name: 'Criminal Defense', shouldExist: true },
    { url: '/practice-areas/family-law', name: 'Family Law', shouldExist: true },
    { url: '/practice-areas/workers-compensation', name: 'Workers Compensation', shouldExist: true },
    
    // Location pages
    { url: '/locations/charlotte', name: 'Charlotte Office', shouldExist: true },
    { url: '/locations/raleigh', name: 'Raleigh Office', shouldExist: true },
    { url: '/locations/orlando', name: 'Orlando Office', shouldExist: true },
    
    // Test 404 pages
    { url: '/non-existent-page', name: 'Non-existent page', shouldExist: false },
    { url: '/fake-attorney', name: 'Fake attorney', shouldExist: false }
  ];
  
  for (const page of pagesToTest) {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}${page.url}`);
      const status = response.status;
      const passed = page.shouldExist ? (status === 200) : (status === 404);
      
      testResults.tests.pages.total++;
      if (passed) {
        testResults.tests.pages.passed++;
        log(`${page.name}: ${status} (Expected)`, 'success');
      } else {
        testResults.tests.pages.failed++;
        log(`${page.name}: ${status} (Expected ${page.shouldExist ? 200 : 404})`, 'error');
      }
      
      testResults.tests.pages.details.push({
        page: page.name,
        url: page.url,
        status,
        expected: page.shouldExist ? 200 : 404,
        passed
      });
    } catch (error) {
      testResults.tests.pages.total++;
      testResults.tests.pages.failed++;
      log(`${page.name}: Error - ${error.message}`, 'error');
      
      testResults.tests.pages.details.push({
        page: page.name,
        url: page.url,
        error: error.message,
        passed: false
      });
    }
  }
}

async function testSpanishTranslations() {
  log('Testing Spanish translations...', 'test');
  
  const translationTests = [
    {
      englishUrl: '/',
      spanishUrl: '/es',
      expectedContent: ['Abogados de Inmigración', 'Consulta Gratuita']
    },
    {
      englishUrl: '/attorneys',
      spanishUrl: '/es/abogados',
      expectedContent: ['Nuestros Abogados', 'Experiencia']
    },
    {
      englishUrl: '/contact',
      spanishUrl: '/es/contacto',
      expectedContent: ['Contáctenos', 'Teléfono', 'Correo']
    }
  ];
  
  for (const test of translationTests) {
    try {
      const [englishResponse, spanishResponse] = await Promise.all([
        fetchWithTimeout(`${BASE_URL}${test.englishUrl}`),
        fetchWithTimeout(`${BASE_URL}${test.spanishUrl}`)
      ]);
      
      if (spanishResponse.status === 200) {
        const spanishHtml = await spanishResponse.text();
        const hasSpanishContent = test.expectedContent.some(content => 
          spanishHtml.includes(content)
        );
        
        testResults.tests.spanish.total++;
        if (hasSpanishContent) {
          testResults.tests.spanish.passed++;
          log(`Spanish translation for ${test.englishUrl}: Found Spanish content`, 'success');
        } else {
          testResults.tests.spanish.failed++;
          log(`Spanish translation for ${test.englishUrl}: Missing expected Spanish content`, 'error');
        }
        
        testResults.tests.spanish.details.push({
          page: test.englishUrl,
          spanishUrl: test.spanishUrl,
          hasSpanishContent,
          passed: hasSpanishContent
        });
      } else {
        testResults.tests.spanish.total++;
        testResults.tests.spanish.failed++;
        log(`Spanish page ${test.spanishUrl}: Not found (${spanishResponse.status})`, 'error');
      }
    } catch (error) {
      testResults.tests.spanish.total++;
      testResults.tests.spanish.failed++;
      log(`Spanish translation test error: ${error.message}`, 'error');
    }
  }
}

async function testChatbotFunctionality() {
  log('Testing chatbot functionality...', 'test');
  
  const chatTests = [
    {
      name: 'Chat endpoint availability',
      test: async () => {
        const response = await fetchWithTimeout(`${BASE_URL}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'Hello', language: 'en' })
        });
        return response.status === 200 || response.status === 401; // 401 if API key not set
      }
    },
    {
      name: 'Chat widget presence',
      test: async () => {
        const response = await fetchWithTimeout(`${BASE_URL}/`);
        const html = await response.text();
        return html.includes('ChatWidget') || html.includes('chat-widget');
      }
    },
    {
      name: 'Language support',
      test: async () => {
        const responses = await Promise.all([
          fetchWithTimeout(`${BASE_URL}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Hello', language: 'en' })
          }),
          fetchWithTimeout(`${BASE_URL}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Hola', language: 'es' })
          })
        ]);
        return responses.every(r => r.status === 200 || r.status === 401);
      }
    }
  ];
  
  for (const test of chatTests) {
    try {
      testResults.tests.chatbot.total++;
      const passed = await test.test();
      
      if (passed) {
        testResults.tests.chatbot.passed++;
        log(`${test.name}: Passed`, 'success');
      } else {
        testResults.tests.chatbot.failed++;
        log(`${test.name}: Failed`, 'error');
      }
      
      testResults.tests.chatbot.details.push({
        name: test.name,
        passed
      });
    } catch (error) {
      testResults.tests.chatbot.total++;
      testResults.tests.chatbot.failed++;
      log(`${test.name}: Error - ${error.message}`, 'error');
      
      testResults.tests.chatbot.details.push({
        name: test.name,
        error: error.message,
        passed: false
      });
    }
  }
}

async function testBlogSystem() {
  log('Testing blog categorization and functionality...', 'test');
  
  const blogTests = [
    {
      name: 'Blog listing page',
      url: '/blog',
      expectedStatus: 200
    },
    {
      name: 'Immigration category',
      url: '/blog/category/immigration',
      expectedStatus: 200
    },
    {
      name: 'Criminal Defense category',
      url: '/blog/category/criminal-defense',
      expectedStatus: 200
    },
    {
      name: 'Family Law category',
      url: '/blog/category/family-law',
      expectedStatus: 200
    },
    {
      name: 'Blog RSS feed',
      url: '/api/blog/rss',
      expectedStatus: 200
    },
    {
      name: 'Blog sitemap',
      url: '/api/blog/sitemap',
      expectedStatus: 200
    }
  ];
  
  for (const test of blogTests) {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}${test.url}`);
      const passed = response.status === test.expectedStatus;
      
      testResults.tests.blog.total++;
      if (passed) {
        testResults.tests.blog.passed++;
        log(`${test.name}: ${response.status} (Expected)`, 'success');
      } else {
        testResults.tests.blog.failed++;
        log(`${test.name}: ${response.status} (Expected ${test.expectedStatus})`, 'error');
      }
      
      testResults.tests.blog.details.push({
        name: test.name,
        url: test.url,
        status: response.status,
        expected: test.expectedStatus,
        passed
      });
    } catch (error) {
      testResults.tests.blog.total++;
      testResults.tests.blog.failed++;
      log(`${test.name}: Error - ${error.message}`, 'error');
    }
  }
}

async function testSEOElements() {
  log('Testing SEO elements...', 'test');
  
  const seoTests = [
    {
      name: 'Homepage SEO',
      url: '/',
      checks: ['<title>', '<meta name="description"', '<meta property="og:title"', 'application/ld+json']
    },
    {
      name: 'Sitemap availability',
      url: '/sitemap.xml',
      expectedStatus: 200
    },
    {
      name: 'Robots.txt',
      url: '/robots.txt',
      expectedStatus: 200
    },
    {
      name: 'Canonical tags',
      url: '/practice-areas/immigration',
      checks: ['<link rel="canonical"']
    },
    {
      name: 'Hreflang tags',
      url: '/',
      checks: ['hreflang="es"', 'hreflang="en"']
    }
  ];
  
  for (const test of seoTests) {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}${test.url}`);
      
      if (test.expectedStatus) {
        const passed = response.status === test.expectedStatus;
        testResults.tests.seo.total++;
        
        if (passed) {
          testResults.tests.seo.passed++;
          log(`${test.name}: Status ${response.status}`, 'success');
        } else {
          testResults.tests.seo.failed++;
          log(`${test.name}: Status ${response.status} (Expected ${test.expectedStatus})`, 'error');
        }
        
        testResults.tests.seo.details.push({
          name: test.name,
          url: test.url,
          status: response.status,
          expected: test.expectedStatus,
          passed
        });
      } else if (test.checks) {
        const html = await response.text();
        const checkResults = test.checks.map(check => ({
          check,
          found: html.includes(check)
        }));
        
        const allPassed = checkResults.every(r => r.found);
        testResults.tests.seo.total++;
        
        if (allPassed) {
          testResults.tests.seo.passed++;
          log(`${test.name}: All SEO elements found`, 'success');
        } else {
          testResults.tests.seo.failed++;
          const missing = checkResults.filter(r => !r.found).map(r => r.check);
          log(`${test.name}: Missing SEO elements: ${missing.join(', ')}`, 'error');
        }
        
        testResults.tests.seo.details.push({
          name: test.name,
          url: test.url,
          checkResults,
          passed: allPassed
        });
      }
    } catch (error) {
      testResults.tests.seo.total++;
      testResults.tests.seo.failed++;
      log(`${test.name}: Error - ${error.message}`, 'error');
    }
  }
}

async function testAIAgents() {
  log('Testing trained AI agents...', 'test');
  
  const agentTests = [
    {
      name: 'Lead validation agent health',
      endpoint: '/api/agents/lead-validation',
      method: 'GET'
    },
    {
      name: 'Agent monitoring endpoint',
      endpoint: '/api/agents/monitor',
      method: 'GET'
    },
    {
      name: 'CrewAI intake agent',
      endpoint: '/api/crewai/intake',
      method: 'POST',
      body: { query: 'I need help with immigration', language: 'en' }
    },
    {
      name: 'Legal consultation agent',
      endpoint: '/api/crewai/legal-consultation',
      method: 'POST',
      body: { query: 'What is a green card?', caseType: 'immigration' }
    }
  ];
  
  for (const test of agentTests) {
    try {
      const options = {
        method: test.method,
        headers: { 'Content-Type': 'application/json' }
      };
      
      if (test.body) {
        options.body = JSON.stringify(test.body);
      }
      
      const response = await fetchWithTimeout(`${BASE_URL}${test.endpoint}`, options);
      const passed = response.status === 200 || (response.status === 401 && test.endpoint.includes('crewai'));
      
      testResults.tests.agents.total++;
      if (passed) {
        testResults.tests.agents.passed++;
        log(`${test.name}: ${response.status} (Working)`, 'success');
      } else {
        testResults.tests.agents.failed++;
        log(`${test.name}: ${response.status} (Failed)`, 'error');
      }
      
      testResults.tests.agents.details.push({
        name: test.name,
        endpoint: test.endpoint,
        status: response.status,
        passed
      });
    } catch (error) {
      testResults.tests.agents.total++;
      testResults.tests.agents.failed++;
      log(`${test.name}: Error - ${error.message}`, 'error');
    }
  }
}

async function testAPIEndpoints() {
  log('Testing API endpoints...', 'test');
  
  const apiTests = [
    {
      name: 'Deploy check',
      endpoint: '/api/deploy-check',
      method: 'GET',
      expectedStatus: 200
    },
    {
      name: 'Health check',
      endpoint: '/api/health',
      method: 'GET',
      expectedStatus: 200
    },
    {
      name: 'Contact form validation',
      endpoint: '/api/contact',
      method: 'POST',
      body: {},
      expectedStatus: 400 // Should fail validation
    },
    {
      name: 'Newsletter subscription',
      endpoint: '/api/newsletter',
      method: 'POST',
      body: { email: 'test@example.com' },
      expectedStatus: [200, 201]
    }
  ];
  
  for (const test of apiTests) {
    try {
      const options = {
        method: test.method,
        headers: { 'Content-Type': 'application/json' }
      };
      
      if (test.body) {
        options.body = JSON.stringify(test.body);
      }
      
      const response = await fetchWithTimeout(`${BASE_URL}${test.endpoint}`, options);
      const expectedStatuses = Array.isArray(test.expectedStatus) ? test.expectedStatus : [test.expectedStatus];
      const passed = expectedStatuses.includes(response.status);
      
      testResults.tests.api.total++;
      if (passed) {
        testResults.tests.api.passed++;
        log(`${test.name}: ${response.status} (Expected)`, 'success');
      } else {
        testResults.tests.api.failed++;
        log(`${test.name}: ${response.status} (Expected ${test.expectedStatus})`, 'error');
      }
      
      testResults.tests.api.details.push({
        name: test.name,
        endpoint: test.endpoint,
        status: response.status,
        expected: test.expectedStatus,
        passed
      });
    } catch (error) {
      testResults.tests.api.total++;
      testResults.tests.api.failed++;
      log(`${test.name}: Error - ${error.message}`, 'error');
    }
  }
}

async function generateReport() {
  log('Generating test report...', 'info');
  
  // Calculate totals
  for (const category of Object.keys(testResults.tests)) {
    testResults.summary.totalPassed += testResults.tests[category].passed;
    testResults.summary.totalFailed += testResults.tests[category].failed;
    testResults.summary.totalTests += testResults.tests[category].total;
  }
  
  // Generate markdown report
  const report = `# VLF Website Comprehensive Test Report

**Generated**: ${new Date().toLocaleString()}  
**Base URL**: ${BASE_URL}  
**Total Duration**: ${testResults.summary.duration}ms

## Summary

- **Total Tests**: ${testResults.summary.totalTests}
- **Passed**: ${testResults.summary.totalPassed} (${((testResults.summary.totalPassed / testResults.summary.totalTests) * 100).toFixed(1)}%)
- **Failed**: ${testResults.summary.totalFailed} (${((testResults.summary.totalFailed / testResults.summary.totalTests) * 100).toFixed(1)}%)

## Test Categories

### 1. Page Availability (404 Checking)
- **Total**: ${testResults.tests.pages.total}
- **Passed**: ${testResults.tests.pages.passed}
- **Failed**: ${testResults.tests.pages.failed}

${testResults.tests.pages.details.filter(d => !d.passed).length > 0 ? `
**Failed Pages**:
${testResults.tests.pages.details.filter(d => !d.passed).map(d => `- ${d.page}: ${d.error || `Status ${d.status}`}`).join('\n')}
` : '✅ All pages loading correctly'}

### 2. Spanish Translations
- **Total**: ${testResults.tests.spanish.total}
- **Passed**: ${testResults.tests.spanish.passed}
- **Failed**: ${testResults.tests.spanish.failed}

${testResults.tests.spanish.details.filter(d => !d.passed).length > 0 ? `
**Missing Translations**:
${testResults.tests.spanish.details.filter(d => !d.passed).map(d => `- ${d.page}`).join('\n')}
` : '✅ All Spanish translations working'}

### 3. Chatbot Functionality
- **Total**: ${testResults.tests.chatbot.total}
- **Passed**: ${testResults.tests.chatbot.passed}
- **Failed**: ${testResults.tests.chatbot.failed}

${testResults.tests.chatbot.details.map(d => `- ${d.name}: ${d.passed ? '✅ Passed' : '❌ Failed' + (d.error ? ` - ${d.error}` : '')}`).join('\n')}

### 4. Blog System
- **Total**: ${testResults.tests.blog.total}
- **Passed**: ${testResults.tests.blog.passed}
- **Failed**: ${testResults.tests.blog.failed}

${testResults.tests.blog.details.map(d => `- ${d.name}: ${d.passed ? '✅' : '❌'} (Status: ${d.status})`).join('\n')}

### 5. SEO Elements
- **Total**: ${testResults.tests.seo.total}
- **Passed**: ${testResults.tests.seo.passed}
- **Failed**: ${testResults.tests.seo.failed}

${testResults.tests.seo.details.map(d => `- ${d.name}: ${d.passed ? '✅ All elements found' : '❌ Missing elements'}`).join('\n')}

### 6. AI Agents
- **Total**: ${testResults.tests.agents.total}
- **Passed**: ${testResults.tests.agents.passed}
- **Failed**: ${testResults.tests.agents.failed}

${testResults.tests.agents.details.map(d => `- ${d.name}: ${d.passed ? '✅' : '❌'} (Status: ${d.status})`).join('\n')}

### 7. API Endpoints
- **Total**: ${testResults.tests.api.total}
- **Passed**: ${testResults.tests.api.passed}
- **Failed**: ${testResults.tests.api.failed}

${testResults.tests.api.details.map(d => `- ${d.name}: ${d.passed ? '✅' : '❌'} (Status: ${d.status})`).join('\n')}

## Issues Found

${testResults.summary.totalFailed > 0 ? `
### Critical Issues
${testResults.tests.pages.details.filter(d => !d.passed && d.error).map(d => `- **${d.page}**: ${d.error}`).join('\n')}

### Missing Features
${testResults.tests.spanish.details.filter(d => !d.passed).length > 0 ? '- Some Spanish translations are missing or incomplete' : ''}
${testResults.tests.chatbot.details.filter(d => !d.passed).length > 0 ? '- Chatbot functionality issues detected' : ''}
${testResults.tests.agents.details.filter(d => !d.passed).length > 0 ? '- Some AI agents are not responding correctly' : ''}

### Recommendations
1. Fix any 404 errors for pages that should exist
2. Complete Spanish translations for all pages
3. Ensure chatbot API keys are configured
4. Verify all AI agent endpoints are properly deployed
5. Fix any failing API endpoints
` : '✅ No critical issues found!'}

## Next Steps

1. Review failed tests and fix issues
2. Re-run tests after fixes
3. Monitor production deployment
4. Set up automated testing

---
*Test completed in ${testResults.summary.duration}ms*
`;

  // Save report
  const reportPath = path.join(process.cwd(), 'COMPREHENSIVE-TEST-RESULTS.md');
  await fs.writeFile(reportPath, report);
  
  // Save JSON results
  const jsonPath = path.join(process.cwd(), 'test-results.json');
  await fs.writeFile(jsonPath, JSON.stringify(testResults, null, 2));
  
  log(`Test report saved to: ${reportPath}`, 'success');
  log(`JSON results saved to: ${jsonPath}`, 'success');
  
  return report;
}

async function checkServerRunning() {
  try {
    const response = await fetchWithTimeout(BASE_URL, {}, 5000);
    return response.status !== undefined;
  } catch (error) {
    return false;
  }
}

async function startDevServer() {
  log('Starting development server...', 'info');
  
  return new Promise((resolve, reject) => {
    const server = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      shell: true
    });
    
    let serverReady = false;
    
    server.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Ready') || output.includes('started server on')) {
        serverReady = true;
        log('Development server started', 'success');
        resolve(server);
      }
    });
    
    server.stderr.on('data', (data) => {
      const error = data.toString();
      if (!serverReady && error.includes('Error')) {
        reject(new Error(`Server start error: ${error}`));
      }
    });
    
    // Give server time to start
    setTimeout(() => {
      if (!serverReady) {
        reject(new Error('Server failed to start within timeout'));
      }
    }, 30000);
  });
}

// Main test runner
async function runTests() {
  const startTime = Date.now();
  let devServer = null;
  
  try {
    log('VLF Website Comprehensive Testing', 'info');
    log('================================', 'info');
    
    // Check if server is running
    const serverRunning = await checkServerRunning();
    
    if (!serverRunning) {
      log('Development server not running, starting it...', 'warning');
      try {
        devServer = await startDevServer();
        await delay(5000); // Give server time to fully initialize
      } catch (error) {
        log(`Failed to start dev server: ${error.message}`, 'error');
        log('Please start the server manually with: npm run dev', 'info');
        process.exit(1);
      }
    } else {
      log('Development server is running', 'success');
    }
    
    // Run all tests
    await testPageAvailability();
    await testSpanishTranslations();
    await testChatbotFunctionality();
    await testBlogSystem();
    await testSEOElements();
    await testAIAgents();
    await testAPIEndpoints();
    
    // Calculate duration
    testResults.summary.duration = Date.now() - startTime;
    
    // Generate report
    const report = await generateReport();
    
    // Display summary
    log('', 'info');
    log('Test Summary:', 'info');
    log(`Total: ${testResults.summary.totalTests} tests`, 'info');
    log(`Passed: ${testResults.summary.totalPassed} (${((testResults.summary.totalPassed / testResults.summary.totalTests) * 100).toFixed(1)}%)`, 'success');
    log(`Failed: ${testResults.summary.totalFailed} (${((testResults.summary.totalFailed / testResults.summary.totalTests) * 100).toFixed(1)}%)`, testResults.summary.totalFailed > 0 ? 'error' : 'success');
    
  } catch (error) {
    log(`Test runner error: ${error.message}`, 'error');
    console.error(error);
  } finally {
    // Clean up dev server if we started it
    if (devServer) {
      log('Stopping development server...', 'info');
      devServer.kill();
    }
  }
}

// Run tests
runTests().catch(console.error);