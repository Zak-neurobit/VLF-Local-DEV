#!/usr/bin/env node

/**
 * Environment configuration checker
 * Helps identify missing environment variables that could cause 500 errors
 */

const fs = require('fs');
const path = require('path');

// Required environment variables for basic functionality
const REQUIRED_ENV_VARS = ['DATABASE_URL', 'NEXTAUTH_URL', 'NEXTAUTH_SECRET', 'OPENAI_API_KEY'];

// Optional but recommended variables
const RECOMMENDED_ENV_VARS = [
  'REDIS_URL',
  'GHL_API_KEY',
  'GHL_LOCATION_ID',
  'RETELL_API_KEY',
  'SENTRY_DSN',
];

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

console.log('🔍 Checking environment configuration...\n');

if (!envExists) {
  console.log('❌ .env.local file not found!');
  console.log('   Please create it by copying .env.example:');
  console.log('   cp .env.example .env.local\n');
} else {
  console.log('✅ .env.local file found\n');
}

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Check required variables
console.log('📋 Required Environment Variables:');
let hasAllRequired = true;

REQUIRED_ENV_VARS.forEach(varName => {
  const value = process.env[varName];
  if (!value || value === `your-${varName.toLowerCase().replace(/_/g, '-')}`) {
    console.log(`   ❌ ${varName} - Not configured`);
    hasAllRequired = false;
  } else {
    console.log(`   ✅ ${varName} - Configured`);
  }
});

console.log('\n📋 Recommended Environment Variables:');
RECOMMENDED_ENV_VARS.forEach(varName => {
  const value = process.env[varName];
  if (!value || value === `your-${varName.toLowerCase().replace(/_/g, '-')}`) {
    console.log(`   ⚠️  ${varName} - Not configured (optional)`);
  } else {
    console.log(`   ✅ ${varName} - Configured`);
  }
});

// Check for common issues
console.log('\n🔧 Common Issues Check:');

// Check DATABASE_URL format
if (process.env.DATABASE_URL) {
  if (!process.env.DATABASE_URL.startsWith('postgresql://')) {
    console.log('   ❌ DATABASE_URL should start with postgresql://');
  } else {
    console.log('   ✅ DATABASE_URL format looks correct');
  }
}

// Check NEXTAUTH_URL matches current environment
if (process.env.NEXTAUTH_URL) {
  const isDev = process.env.NODE_ENV === 'development';
  const isLocalUrl =
    process.env.NEXTAUTH_URL.includes('localhost') ||
    process.env.NEXTAUTH_URL.includes('127.0.0.1');

  if (isDev && !isLocalUrl) {
    console.log('   ⚠️  NEXTAUTH_URL should be http://localhost:3000 for development');
  } else if (!isDev && isLocalUrl) {
    console.log('   ⚠️  NEXTAUTH_URL should be your production URL');
  } else {
    console.log('   ✅ NEXTAUTH_URL matches environment');
  }
}

// Check for mock mode
const mockMode =
  process.env.MOCK_REDIS === 'true' ||
  process.env.MOCK_EMAIL === 'true' ||
  process.env.MOCK_SMS === 'true';

if (mockMode) {
  console.log('   ℹ️  Mock mode enabled for some services');
}

// Summary
console.log('\n📊 Summary:');
if (!hasAllRequired) {
  console.log('   ❌ Missing required environment variables!');
  console.log('   This will likely cause 500 errors.');
  console.log('\n   Quick fix for development:');
  console.log('   1. Copy .env.example to .env.local');
  console.log('   2. Set at minimum:');
  console.log('      - DATABASE_URL=postgresql://postgres:password@localhost:5432/vasquez_law');
  console.log('      - NEXTAUTH_SECRET=$(openssl rand -base64 32)');
  console.log('      - NEXTAUTH_URL=http://localhost:3000');
  console.log('      - OPENAI_API_KEY=your-openai-key');
  process.exit(1);
} else {
  console.log('   ✅ All required environment variables are configured!');
  console.log('   The application should run without 500 errors.');
}
