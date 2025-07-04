#!/usr/bin/env node
import * as dotenv from 'dotenv';
import { config } from 'dotenv';
import { execSync } from 'child_process';
import { join } from 'path';

// Load .env.local file explicitly
dotenv.config({ path: join(process.cwd(), '.env.local') });

// Use console colors instead of chalk
const colors = {
  bold: (text: string) => `\x1b[1m${text}\x1b[0m`,
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
};

interface TestResult {
  name: string;
  status: 'success' | 'warning' | 'error';
  message: string;
}

const results: TestResult[] = [];

// Helper function to test API
async function testAPI(name: string, testFn: () => Promise<void>) {
  process.stdout.write(`Testing ${name}... `);
  try {
    await testFn();
    console.log(colors.green('✓'));
    results.push({ name, status: 'success', message: 'Connected successfully' });
  } catch (error) {
    console.log(colors.red('✗'));
    results.push({ 
      name, 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}

// Test Database
async function testDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not set');
  }
  
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient({
    log: ['error'],
  });
  
  try {
    await prisma.$connect();
    // Test with a simple query
    await prisma.$queryRaw`SELECT 1`;
    await prisma.$disconnect();
  } catch (error) {
    await prisma.$disconnect();
    throw new Error('Database connection failed. Check DATABASE_URL');
  }
}

// Test Redis
async function testRedis() {
  if (process.env.MOCK_REDIS === 'true') {
    console.log(colors.yellow('(mocked)'));
    results.push({ 
      name: 'Redis', 
      status: 'warning', 
      message: 'Using mock Redis (MOCK_REDIS=true)' 
    });
    return;
  }
  
  const Redis = (await import('ioredis')).default;
  const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    retryStrategy: () => null, // Don't retry
    lazyConnect: true,
    showFriendlyErrorStack: false,
    enableOfflineQueue: false,
    connectTimeout: 5000,
  });
  
  try {
    await redis.connect();
    await redis.ping();
    redis.disconnect();
  } catch (error) {
    redis.disconnect();
    throw new Error('Redis connection failed. Check REDIS_URL or set MOCK_REDIS=true');
  }
}

// Test OpenAI
async function testOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not set');
  }
  
  const OpenAI = (await import('openai')).default;
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  try {
    const models = await openai.models.list();
    if (!models.data.length) {
      throw new Error('No models available');
    }
  } catch (error) {
    throw new Error('OpenAI API key invalid or no access');
  }
}

// Test GoHighLevel
async function testGHL() {
  const required = [
    'GHL_API_KEY',
    'GHL_LOCATION_ID',
    'GHL_CALENDAR_ID',
    'GHL_MAIN_PIPELINE_ID'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing GHL variables: ${missing.join(', ')}`);
  }
  
  // Test API connection
  const response = await fetch(`${process.env.GHL_API_URL}/users/`, {
    headers: {
      'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
      'Version': '2021-07-28'
    }
  });
  
  if (!response.ok) {
    throw new Error('GHL API key invalid or no access');
  }
}

// Test Email
async function testEmail() {
  if (process.env.MOCK_EMAIL === 'true') {
    console.log(colors.yellow('(mocked)'));
    results.push({ 
      name: 'Email', 
      status: 'warning', 
      message: 'Using mock email (MOCK_EMAIL=true)' 
    });
    return;
  }
  
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing email variables: ${missing.join(', ')}`);
  }
  
  // Basic validation
  if (!process.env.SMTP_HOST?.includes('.')) {
    throw new Error('Invalid SMTP_HOST');
  }
}

// Test Retell AI
async function testRetell() {
  if (!process.env.RETELL_API_KEY) {
    throw new Error('RETELL_API_KEY not set');
  }
  
  // Test API connection
  const response = await fetch('https://api.retellai.com/agents', {
    headers: {
      'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok && response.status !== 404) {
    throw new Error('Retell API key invalid');
  }
}

// Test Google Maps
async function testGoogleMaps() {
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    console.log(colors.yellow('(not configured)'));
    results.push({ 
      name: 'Google Maps', 
      status: 'warning', 
      message: 'Not configured (optional)' 
    });
    return;
  }
  
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=Charlotte,NC&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  
  const data = await response.json();
  if (data.status === 'REQUEST_DENIED') {
    throw new Error('Google Maps API key invalid');
  }
}

// Main test runner
async function runTests() {
  console.log(colors.bold('\n🔧 Testing API Configurations\n'));
  
  await testAPI('Database', testDatabase);
  await testAPI('Redis', testRedis);
  await testAPI('OpenAI', testOpenAI);
  await testAPI('GoHighLevel', testGHL);
  await testAPI('Email', testEmail);
  await testAPI('Retell AI', testRetell);
  await testAPI('Google Maps', testGoogleMaps);
  
  // Summary
  console.log(colors.bold('\n📊 Test Summary\n'));
  
  const success = results.filter(r => r.status === 'success').length;
  const warnings = results.filter(r => r.status === 'warning').length;
  const errors = results.filter(r => r.status === 'error').length;
  
  results.forEach(result => {
    const icon = result.status === 'success' ? '✓' : 
                 result.status === 'warning' ? '⚠' : '✗';
    const color = result.status === 'success' ? colors.green :
                  result.status === 'warning' ? colors.yellow : colors.red;
    
    console.log(`${color(icon)} ${result.name}: ${result.message}`);
  });
  
  console.log('\n' + colors.bold('Results:'));
  console.log(colors.green(`✓ Success: ${success}`));
  if (warnings > 0) console.log(colors.yellow(`⚠ Warnings: ${warnings}`));
  if (errors > 0) console.log(colors.red(`✗ Errors: ${errors}`));
  
  if (errors > 0) {
    console.log(colors.red('\n❌ Some APIs are not properly configured.'));
    console.log('Please check the API_SETUP_GUIDE.md for instructions.\n');
    process.exit(1);
  } else {
    console.log(colors.green('\n✅ All critical APIs are configured!\n'));
  }
}

// Run tests
runTests().catch(error => {
  console.error('\x1b[31m\n❌ Test runner error:\x1b[0m', error);
  process.exit(1);
});