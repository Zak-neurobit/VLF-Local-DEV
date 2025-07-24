#!/usr/bin/env node

// Test A/B testing service initialization
// This script tests if the A/B testing service can initialize without errors

console.log('Testing A/B Test Engine initialization...');

// Set up minimal environment
process.env.NODE_ENV = 'development';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://localhost:5432/test';

// Mock Next.js environment
if (!global.__dirname) {
  global.__dirname = process.cwd();
}

// Add module aliases
require('module-alias/register');
const path = require('path');
require('module-alias').addAlias('@', path.join(__dirname, '..', 'src'));

async function testInit() {
  try {
    // Import the module - this will test initialization
    console.log('1. Importing A/B test engine...');
    const { abTestEngine } = await import('../src/lib/ab-testing/ab-test-engine.ts');
    console.log('   ✓ A/B test engine imported successfully');
    
    // Test basic method availability
    console.log('2. Testing method availability...');
    console.log('   - getAllTests:', typeof abTestEngine.getAllTests === 'function' ? '✓' : '✗');
    console.log('   - getActiveTests:', typeof abTestEngine.getActiveTests === 'function' ? '✓' : '✗');
    console.log('   - assignVariant:', typeof abTestEngine.assignVariant === 'function' ? '✓' : '✗');
    console.log('   - trackEvent:', typeof abTestEngine.trackEvent === 'function' ? '✓' : '✗');
    
    console.log('\n✅ A/B Test Engine initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error during A/B Test Engine initialization:');
    console.error(error);
    console.error('\nStack trace:', error.stack);
    process.exit(1);
  }
}

testInit();