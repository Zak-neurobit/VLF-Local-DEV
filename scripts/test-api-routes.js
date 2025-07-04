#!/usr/bin/env node

/**
 * Test script to verify API routes are working correctly
 * Run with: node scripts/test-api-routes.js
 */

const API_BASE = process.env.API_URL || 'http://localhost:3000';

const routes = [
  { path: '/api/agents/lead-validation', method: 'GET' },
  { path: '/api/agents/lead-validation', method: 'POST', body: {
    name: 'Test User',
    email: 'test@example.com',
    phone: '123-456-7890',
    message: 'This is a test message for lead validation to ensure it works properly',
    source: 'test'
  }},
  { path: '/api/agents/lead-validation', method: 'OPTIONS' },
  { path: '/api/agents/appointment', method: 'GET', query: 'date=2025-01-10&type=consultation' },
  { path: '/api/agents/appointment', method: 'OPTIONS' },
  { path: '/api/agents/consultation', method: 'OPTIONS' },
  { path: '/api/agents/deploy', method: 'OPTIONS' },
  { path: '/api/agents/monitor', method: 'OPTIONS' },
];

async function testRoute(route) {
  const url = `${API_BASE}${route.path}${route.query ? '?' + route.query : ''}`;
  const options = {
    method: route.method,
    headers: {
      'Content-Type': 'application/json',
      'Origin': API_BASE,
    },
  };

  if (route.body) {
    options.body = JSON.stringify(route.body);
  }

  try {
    console.log(`\nTesting ${route.method} ${route.path}...`);
    const response = await fetch(url, options);
    console.log(`Status: ${response.status} ${response.statusText}`);
    
    if (response.ok && route.method !== 'OPTIONS') {
      const data = await response.json();
      console.log('Response:', JSON.stringify(data, null, 2));
    }
    
    return { success: response.ok, status: response.status };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('Testing API Routes...');
  console.log('API Base:', API_BASE);
  console.log('=' * 50);

  const results = [];
  for (const route of routes) {
    const result = await testRoute(route);
    results.push({ ...route, ...result });
  }

  console.log('\n' + '=' * 50);
  console.log('Test Summary:');
  console.log('=' * 50);
  
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  results.forEach(r => {
    const status = r.success ? '✓' : '✗';
    console.log(`${status} ${r.method} ${r.path} - ${r.success ? 'PASSED' : 'FAILED'} (${r.status || r.error})`);
  });
  
  console.log(`\nTotal: ${results.length} | Passed: ${passed} | Failed: ${failed}`);
}

// Run tests
runTests().catch(console.error);