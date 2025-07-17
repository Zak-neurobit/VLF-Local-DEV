#!/usr/bin/env node

/**
 * Test the AI Chat API endpoints
 * This script tests the chat functionality through HTTP requests
 */

const http = require('http');

// Test configuration
const API_BASE_URL = 'http://localhost:3000';
const TESTS = [
  {
    name: 'Health Check',
    method: 'GET',
    path: '/api/ai/health?detailed=true',
    expectedStatus: [200, 503],
  },
  {
    name: 'Chat API - English Message',
    method: 'POST',
    path: '/api/chat',
    body: {
      message: 'Hello, I need help with immigration law',
      language: 'en',
    },
    expectedStatus: [200],
  },
  {
    name: 'Chat API - Spanish Message',
    method: 'POST',
    path: '/api/chat',
    body: {
      message: 'Hola, necesito ayuda con mi caso de inmigración',
      language: 'es',
    },
    expectedStatus: [200],
  },
  {
    name: 'Chat API - With Session',
    method: 'POST',
    path: '/api/chat',
    body: {
      message: 'I need to schedule a consultation',
      language: 'en',
      sessionId: 'test-session-123',
    },
    expectedStatus: [200],
  },
  {
    name: 'AI Health Test',
    method: 'POST',
    path: '/api/ai/health/test',
    body: {
      message: 'Test message for AI services',
      language: 'en',
      testType: 'all',
    },
    expectedStatus: [200],
  },
];

async function makeRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_BASE_URL + options.path);

    const requestOptions = {
      hostname: url.hostname,
      port: url.port || 3000,
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const req = http.request(requestOptions, res => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = {
            status: res.statusCode,
            headers: res.headers,
            body: data ? JSON.parse(data) : null,
          };
          resolve(result);
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data,
            parseError: error.message,
          });
        }
      });
    });

    req.on('error', error => {
      reject(error);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

async function runTests() {
  console.log('🧪 AI Chat API Test Suite\n');
  console.log('Testing API at:', API_BASE_URL);
  console.log('='.repeat(50));

  // First check if server is reachable
  console.log('\n🔍 Checking server connectivity...');

  try {
    await makeRequest({ method: 'GET', path: '/' });
    console.log('✅ Server is reachable');
  } catch (error) {
    console.log('❌ Server is not reachable at', API_BASE_URL);
    console.log('Error:', error.message);
    console.log('\n⚠️  Please make sure the development server is running:');
    console.log('   npm run dev');
    return;
  }

  // Run tests
  const results = [];

  for (const test of TESTS) {
    console.log(`\n📝 Test: ${test.name}`);
    console.log(`${test.method} ${test.path}`);

    if (test.body) {
      console.log('Request body:', JSON.stringify(test.body, null, 2));
    }

    try {
      const startTime = Date.now();
      const response = await makeRequest({ method: test.method, path: test.path }, test.body);
      const responseTime = Date.now() - startTime;

      const success = test.expectedStatus.includes(response.status);

      console.log(`\nStatus: ${response.status} ${success ? '✅' : '❌'}`);
      console.log(`Response time: ${responseTime}ms`);

      if (response.body) {
        console.log('Response:', JSON.stringify(response.body, null, 2));
      }

      results.push({
        test: test.name,
        success,
        status: response.status,
        responseTime,
        hasResponse: !!response.body,
      });
    } catch (error) {
      console.log(`\n❌ Test failed:`, error.message);
      results.push({
        test: test.name,
        success: false,
        error: error.message,
      });
    }
  }

  // Summary
  console.log('\n\n📊 Test Summary');
  console.log('='.repeat(50));

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`Total tests: ${results.length}`);
  console.log(
    `Successful: ${successful.length} (${Math.round((successful.length / results.length) * 100)}%)`
  );
  console.log(`Failed: ${failed.length}`);

  if (failed.length > 0) {
    console.log('\nFailed tests:');
    failed.forEach(test => {
      console.log(
        `- ${test.test}: ${test.error || `Expected status ${test.expectedStatus}, got ${test.status}`}`
      );
    });
  }

  console.log('\n✨ Test complete!');

  // Instructions for running the server
  if (failed.length > 0) {
    console.log('\n📝 To run these tests successfully:');
    console.log('1. Start the development server: npm run dev');
    console.log('2. Make sure .env.local has necessary API keys');
    console.log('3. Run this test again: node test-chat-api.js');
  }
}

// Run the tests
runTests().catch(error => {
  console.error('Test execution failed:', error);
  process.exit(1);
});
