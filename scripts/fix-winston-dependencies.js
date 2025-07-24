#!/usr/bin/env node

/**
 * Fix Winston Dependencies Script
 * 
 * This script ensures all Winston dependencies are properly installed.
 * It addresses the common issue where @dabh/diagnostics and other
 * Winston peer dependencies might be missing.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Winston dependencies...\n');

// List of Winston dependencies that should be explicitly installed
const winstonDependencies = [
  '@dabh/diagnostics@^2.0.2',
  '@colors/colors@^1.6.0',
  'logform@^2.7.0',
  'winston-transport@^4.9.0',
  'triple-beam@^1.3.0',
  'async@^3.2.3',
  'is-stream@^2.0.0',
  'one-time@^1.0.0',
  'readable-stream@^3.4.0',
  'safe-stable-stringify@^2.3.1',
  'stack-trace@0.0.x'
];

// Check if each dependency is installed
console.log('📦 Checking Winston dependencies...');
const missingDeps = [];

winstonDependencies.forEach(dep => {
  const packageName = dep.split('@')[0] || '@' + dep.split('@')[1];
  const modulePath = path.join(__dirname, '..', 'node_modules', packageName);
  
  if (!fs.existsSync(modulePath)) {
    missingDeps.push(dep);
    console.log(`❌ Missing: ${packageName}`);
  } else {
    console.log(`✅ Found: ${packageName}`);
  }
});

if (missingDeps.length === 0) {
  console.log('\n✨ All Winston dependencies are installed!');
  process.exit(0);
}

// Install missing dependencies
console.log(`\n📥 Installing ${missingDeps.length} missing dependencies...`);

try {
  // First, clean npm cache to avoid conflicts
  console.log('🧹 Cleaning npm cache...');
  execSync('npm cache clean --force', { stdio: 'inherit' });
  
  // Install each missing dependency
  missingDeps.forEach(dep => {
    console.log(`\n📦 Installing ${dep}...`);
    try {
      execSync(`npm install ${dep} --save`, { stdio: 'inherit' });
      console.log(`✅ Successfully installed ${dep}`);
    } catch (error) {
      console.error(`❌ Failed to install ${dep}:`, error.message);
    }
  });
  
  // Verify Winston works
  console.log('\n🧪 Testing Winston...');
  const testFile = path.join(__dirname, '..', 'test-winston.js');
  
  fs.writeFileSync(testFile, `
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

logger.info('Winston is working correctly!');
console.log('✅ Winston test passed!');
  `);
  
  execSync(`node ${testFile}`, { stdio: 'inherit' });
  fs.unlinkSync(testFile);
  
  console.log('\n✨ Winston dependencies fixed successfully!');
  console.log('\n💡 Next steps:');
  console.log('   1. Run "npm run dev" to test your application');
  console.log('   2. If issues persist, run "rm -rf node_modules package-lock.json && npm install"');
  
} catch (error) {
  console.error('\n❌ Error fixing Winston dependencies:', error.message);
  console.log('\n💡 Try running:');
  console.log('   rm -rf node_modules package-lock.json');
  console.log('   npm install');
  process.exit(1);
}