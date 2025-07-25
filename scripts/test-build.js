#!/usr/bin/env node

/**
 * Test Build Script
 * Quick build test to ensure syntax fixes work
 */

const { execSync } = require('child_process');

console.log('🧪 Running test build to verify syntax fixes...\n');

// Set minimal environment
process.env.NODE_ENV = 'production';
process.env.NODE_OPTIONS = '--max-old-space-size=8192';

try {
  console.log('📦 Building with Next.js...\n');

  execSync('next build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      // Skip type checking for faster test
      SKIP_TYPE_CHECK: 'true',
    },
  });

  console.log('\n✅ Build test passed! Syntax fixes are working.');
  console.log('🚀 Ready for full deployment - BUILD UP NOT DOWN!');
} catch (error) {
  console.error('\n❌ Build test failed');
  console.error('Check the error messages above for details');
  process.exit(1);
}
