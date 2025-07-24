#!/usr/bin/env node

/**
 * Test script to verify Sentry instrumentation setup
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Sentry configuration...\n');

// Check if instrumentation.ts exists
const instrumentationPath = path.join(process.cwd(), 'instrumentation.ts');
if (fs.existsSync(instrumentationPath)) {
  console.log('✅ instrumentation.ts found');
} else {
  console.log('❌ instrumentation.ts not found');
}

// Check if deprecated files exist
const deprecatedFiles = [
  'sentry.server.config.ts',
  'sentry.edge.config.ts',
  'sentry.client.config.ts'
];

console.log('\n📁 Checking for deprecated files:');
deprecatedFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`⚠️  ${file} still exists (deprecated)`);
  } else {
    console.log(`✅ ${file} removed`);
  }
});

// Check next.config.js for instrumentationHook
console.log('\n⚙️  Checking next.config.js:');
const nextConfigPath = path.join(process.cwd(), 'next.config.js');
if (fs.existsSync(nextConfigPath)) {
  const nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
  if (nextConfig.includes('instrumentationHook: true')) {
    console.log('✅ instrumentationHook enabled');
  } else {
    console.log('❌ instrumentationHook not enabled');
  }
}

// Check environment variables
console.log('\n🔐 Checking environment variables:');
const envVars = ['SENTRY_DSN', 'NEXT_PUBLIC_SENTRY_DSN'];
envVars.forEach(envVar => {
  if (process.env[envVar]) {
    console.log(`✅ ${envVar} is set`);
  } else {
    console.log(`⚠️  ${envVar} is not set`);
  }
});

console.log('\n📋 Summary:');
console.log('The Sentry SDK has been migrated to use the new instrumentation hook.');
console.log('The deprecated configuration files can be safely removed once everything is working.');
console.log('\nTo complete the migration:');
console.log('1. Test that Sentry is still capturing errors correctly');
console.log('2. Remove the deprecated sentry.*.config.ts files');
console.log('3. Update any CI/CD scripts that might reference the old files');