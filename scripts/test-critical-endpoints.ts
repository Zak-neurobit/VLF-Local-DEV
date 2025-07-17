#!/usr/bin/env node

import { logger } from '../src/lib/logger';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

interface EndpointTest {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  priority: 'critical' | 'high' | 'medium';
  requiresAuth?: boolean;
  body?: any;
  headers?: Record<string, string>;
}

interface TestResult {
  endpoint: string;
  status: 'success' | 'failed' | 'warning';
  statusCode?: number;
  responseTime: number;
  message: string;
  details?: any;
}

const results: TestResult[] = [];
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const criticalEndpoints: EndpointTest[] = [
  // Health Checks
  { name: 'Main Health Check', method: 'GET', path: '/api/health', priority: 'critical' },
  { name: 'Database Health', method: 'GET', path: '/api/health/db', priority: 'critical' },
  { name: 'Socket Health', method: 'GET', path: '/api/health/socket', priority: 'high' },
  { name: 'AI Health', method: 'GET', path: '/api/ai/health', priority: 'high' },
  { name: 'Deploy Check', method: 'GET', path: '/api/deploy-check', priority: 'medium' },

  // Chat System
  { name: 'Chat Health', method: 'GET', path: '/api/chat', priority: 'critical' },
  {
    name: 'Chat Message',
    method: 'POST',
    path: '/api/chat',
    priority: 'critical',
    body: { message: 'Test message', language: 'en' },
    headers: { 'Content-Type': 'application/json' },
  },

  // Contact Forms
  {
    name: 'Contact Form',
    method: 'POST',
    path: '/api/contact',
    priority: 'critical',
    body: {
      name: 'Test User',
      email: 'test@example.com',
      phone: '919-555-0123',
      message: 'This is a test message',
      service: 'immigration',
    },
    headers: { 'Content-Type': 'application/json' },
  },

  // Newsletter
  {
    name: 'Newsletter Subscribe',
    method: 'POST',
    path: '/api/newsletter',
    priority: 'medium',
    body: { email: 'test@example.com' },
    headers: { 'Content-Type': 'application/json' },
  },

  // Analytics
  {
    name: 'Analytics Dashboard',
    method: 'GET',
    path: '/api/analytics/dashboard',
    priority: 'medium',
  },

  // News/Content
  { name: 'News Ticker', method: 'GET', path: '/api/news/ticker', priority: 'medium' },
  { name: 'Sitemap', method: 'GET', path: '/api/sitemap', priority: 'medium' },
  { name: 'Robots.txt', method: 'GET', path: '/api/robots', priority: 'medium' },
];

async function testEndpoint(test: EndpointTest): Promise<void> {
  const startTime = Date.now();
  const url = `${baseUrl}${test.path}`;

  console.log(`\n🧪 Testing ${test.name} [${test.method} ${test.path}]...`);

  try {
    const options: RequestInit = {
      method: test.method,
      headers: test.headers || {},
    };

    if (test.body && test.method !== 'GET') {
      options.body = JSON.stringify(test.body);
    }

    const response = await fetch(url, options);
    const responseTime = Date.now() - startTime;

    let responseData;
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      responseData = await response.json();
    } else if (contentType?.includes('text/')) {
      responseData = await response.text();
    }

    const status = response.ok ? 'success' : 'failed';

    results.push({
      endpoint: `${test.method} ${test.path}`,
      status,
      statusCode: response.status,
      responseTime,
      message: response.ok ? 'Endpoint responding correctly' : `HTTP ${response.status}`,
      details: responseData,
    });

    console.log(
      `${response.ok ? '✅' : '❌'} ${test.name}: ${response.status} (${responseTime}ms)`
    );
  } catch (error: any) {
    const responseTime = Date.now() - startTime;

    results.push({
      endpoint: `${test.method} ${test.path}`,
      status: 'failed',
      responseTime,
      message: error.message || 'Request failed',
      details: error,
    });

    console.log(`❌ ${test.name}: ${error.message} (${responseTime}ms)`);
  }
}

async function runTests() {
  console.log('🚀 Starting Critical Endpoint Tests...\n');
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Total tests: ${criticalEndpoints.length}`);
  console.log('='.repeat(60));

  // Test endpoints by priority
  const criticalTests = criticalEndpoints.filter(t => t.priority === 'critical');
  const highTests = criticalEndpoints.filter(t => t.priority === 'high');
  const mediumTests = criticalEndpoints.filter(t => t.priority === 'medium');

  console.log('\n🔴 CRITICAL ENDPOINTS:');
  for (const test of criticalTests) {
    await testEndpoint(test);
  }

  console.log('\n🟡 HIGH PRIORITY ENDPOINTS:');
  for (const test of highTests) {
    await testEndpoint(test);
  }

  console.log('\n🟢 MEDIUM PRIORITY ENDPOINTS:');
  for (const test of mediumTests) {
    await testEndpoint(test);
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));

  const successCount = results.filter(r => r.status === 'success').length;
  const failedCount = results.filter(r => r.status === 'failed').length;
  const avgResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;

  // Group by status
  console.log('\n✅ SUCCESSFUL ENDPOINTS:');
  results
    .filter(r => r.status === 'success')
    .forEach(r => {
      console.log(`  - ${r.endpoint} (${r.responseTime}ms)`);
    });

  if (failedCount > 0) {
    console.log('\n❌ FAILED ENDPOINTS:');
    results
      .filter(r => r.status === 'failed')
      .forEach(r => {
        console.log(`  - ${r.endpoint}: ${r.message}`);
      });
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Success: ${successCount}/${results.length}`);
  console.log(`❌ Failed: ${failedCount}/${results.length}`);
  console.log(`⏱️  Average Response Time: ${Math.round(avgResponseTime)}ms`);
  console.log('='.repeat(60));

  // Performance warnings
  const slowEndpoints = results.filter(r => r.responseTime > 1000);
  if (slowEndpoints.length > 0) {
    console.log('\n⚠️  SLOW ENDPOINTS (>1s):');
    slowEndpoints.forEach(r => {
      console.log(`  - ${r.endpoint}: ${r.responseTime}ms`);
    });
  }

  // Determine overall status
  if (failedCount === 0) {
    console.log('\n✅ ALL ENDPOINTS OPERATIONAL - READY FOR LAUNCH! 🚀');
  } else {
    const criticalFailed = results.filter(
      r =>
        r.status === 'failed' &&
        criticalEndpoints.find(e => `${e.method} ${e.path}` === r.endpoint)?.priority === 'critical'
    ).length;

    if (criticalFailed > 0) {
      console.log('\n❌ CRITICAL ENDPOINTS FAILED - NOT READY FOR LAUNCH');
    } else {
      console.log('\n⚠️  SOME ENDPOINTS FAILED - REVIEW BEFORE LAUNCH');
    }
  }

  // Save detailed results
  const resultsPath = path.join(process.cwd(), 'test-results-endpoints.json');
  await require('fs').promises.writeFile(
    resultsPath,
    JSON.stringify({ timestamp: new Date().toISOString(), results }, null, 2)
  );
  console.log(`\n📄 Detailed results saved to: ${resultsPath}`);
}

// Run tests
runTests().catch(error => {
  console.error('Test runner error:', error);
  process.exit(1);
});
