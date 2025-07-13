#!/usr/bin/env node

import { spawn } from 'child_process';
import fetch from 'node-fetch';

interface TestResult {
  route: string;
  status: 'pass' | 'fail' | 'skip';
  statusCode?: number;
  error?: string;
}

// Routes to test with their expected behavior
const routesToTest = [
  // Admin routes
  { path: '/api/admin/cache', method: 'GET', requiresAuth: true },
  { path: '/api/agents/health', method: 'GET' },
  { path: '/api/agents/monitor', method: 'GET', requiresAuth: true },

  // Analytics routes
  { path: '/api/analytics/blog', method: 'POST', body: { action: 'pageView', postId: 'test' } },

  // Blog routes
  { path: '/api/blog', method: 'GET' },
  { path: '/api/blog/latest', method: 'GET' },
  { path: '/api/blog/rss', method: 'GET' },
  { path: '/api/blog/sitemap', method: 'GET' },

  // Health checks
  { path: '/api/health', method: 'GET' },
  { path: '/api/health/db', method: 'GET' },

  // Cases
  { path: '/api/cases/recent-wins', method: 'GET' },

  // Reviews
  { path: '/api/reviews/status', method: 'GET' },
  { path: '/api/reviews/recent', method: 'GET' },

  // SEO
  { path: '/api/sitemap', method: 'GET' },
  { path: '/api/robots', method: 'GET' },
];

async function testAPIRoutes() {
  console.log('🧪 Testing API Routes After Dynamic Fixes...\n');

  // Start the Next.js dev server
  console.log('🚀 Starting Next.js development server...');
  const server = spawn('npm', ['run', 'dev'], {
    stdio: 'pipe',
    shell: true,
  });

  // Wait for server to start
  await new Promise<void>(resolve => {
    server.stdout?.on('data', data => {
      if (data.toString().includes('Ready')) {
        console.log('✅ Server is ready!\n');
        resolve();
      }
    });
  });

  const results: TestResult[] = [];
  const baseUrl = 'http://localhost:3000';

  // Test each route
  for (const route of routesToTest) {
    try {
      console.log(`Testing ${route.method} ${route.path}...`);

      const options: any = {
        method: route.method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (route.body) {
        options.body = JSON.stringify(route.body);
      }

      const response = await fetch(`${baseUrl}${route.path}`, options);

      const result: TestResult = {
        route: `${route.method} ${route.path}`,
        status: 'pass',
        statusCode: response.status,
      };

      // Check expected status codes
      if (route.requiresAuth && response.status === 401) {
        console.log(`✅ ${route.path} - Auth required (401) as expected`);
      } else if (response.status >= 200 && response.status < 300) {
        console.log(`✅ ${route.path} - Success (${response.status})`);
      } else if (response.status >= 400) {
        result.status = 'fail';
        result.error = `Unexpected status: ${response.status}`;
        console.log(`❌ ${route.path} - Failed (${response.status})`);
      }

      results.push(result);
    } catch (error) {
      console.log(`❌ ${route.path} - Error: ${error.message}`);
      results.push({
        route: `${route.method} ${route.path}`,
        status: 'fail',
        error: error.message,
      });
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Test Summary:');
  console.log('='.repeat(60));

  const passed = results.filter(r => r.status === 'pass').length;
  const failed = results.filter(r => r.status === 'fail').length;

  console.log(`✅ Passed: ${passed}/${results.length}`);
  console.log(`❌ Failed: ${failed}/${results.length}`);

  if (failed > 0) {
    console.log('\n❌ Failed routes:');
    results
      .filter(r => r.status === 'fail')
      .forEach(r => {
        console.log(`  - ${r.route}: ${r.error}`);
      });
  }

  // Cleanup
  console.log('\n🧹 Shutting down server...');
  server.kill();

  return failed === 0;
}

// Run the tests
console.log('API Route Testing Script');
console.log('=======================\n');

testAPIRoutes()
  .then(success => {
    if (success) {
      console.log('\n✅ All API routes are working correctly!');
      process.exit(0);
    } else {
      console.log('\n⚠️  Some API routes failed!');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
