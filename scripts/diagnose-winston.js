#!/usr/bin/env node

/**
 * Winston Diagnostic Script
 * 
 * This script diagnoses Winston installation issues and provides
 * detailed information about missing dependencies.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Winston Dependency Diagnostic Tool\n');
console.log('========================================\n');

// Core Winston dependencies
const winstonDeps = {
  'winston': '^3.17.0',
  '@dabh/diagnostics': '^2.0.2',
  '@colors/colors': '^1.6.0',
  'logform': '^2.7.0',
  'winston-transport': '^4.9.0',
  'triple-beam': '^1.3.0',
  'async': '^3.2.3',
  'is-stream': '^2.0.0',
  'one-time': '^1.0.0',
  'readable-stream': '^3.4.0',
  'safe-stable-stringify': '^2.3.1',
  'stack-trace': '0.0.x'
};

console.log('📦 Checking Winston dependencies...\n');

const results = {
  installed: [],
  missing: [],
  errors: []
};

// Check each dependency
Object.entries(winstonDeps).forEach(([dep, version]) => {
  const modulePath = path.join(__dirname, '..', 'node_modules', dep);
  
  try {
    if (fs.existsSync(modulePath)) {
      // Try to read package.json to get version
      const pkgPath = path.join(modulePath, 'package.json');
      if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        results.installed.push({
          name: dep,
          expectedVersion: version,
          installedVersion: pkg.version,
          status: '✅'
        });
      } else {
        results.installed.push({
          name: dep,
          expectedVersion: version,
          installedVersion: 'unknown',
          status: '⚠️'
        });
      }
    } else {
      results.missing.push({
        name: dep,
        expectedVersion: version,
        status: '❌'
      });
    }
  } catch (error) {
    results.errors.push({
      name: dep,
      error: error.message,
      status: '⚠️'
    });
  }
});

// Display results
console.log('📊 Diagnostic Results:\n');

if (results.installed.length > 0) {
  console.log('✅ Installed Dependencies:');
  results.installed.forEach(dep => {
    console.log(`   ${dep.status} ${dep.name} (installed: ${dep.installedVersion}, expected: ${dep.expectedVersion})`);
  });
  console.log('');
}

if (results.missing.length > 0) {
  console.log('❌ Missing Dependencies:');
  results.missing.forEach(dep => {
    console.log(`   ${dep.status} ${dep.name} (expected: ${dep.expectedVersion})`);
  });
  console.log('');
}

if (results.errors.length > 0) {
  console.log('⚠️  Errors:');
  results.errors.forEach(dep => {
    console.log(`   ${dep.status} ${dep.name}: ${dep.error}`);
  });
  console.log('');
}

// Check package.json
console.log('📄 Checking package.json...\n');
const pkgJsonPath = path.join(__dirname, '..', 'package.json');
const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));

const missingFromPackageJson = [];
Object.entries(winstonDeps).forEach(([dep, version]) => {
  if (!pkgJson.dependencies[dep] && !pkgJson.devDependencies?.[dep]) {
    missingFromPackageJson.push(dep);
  }
});

if (missingFromPackageJson.length > 0) {
  console.log('⚠️  Dependencies missing from package.json:');
  missingFromPackageJson.forEach(dep => {
    console.log(`   - ${dep}`);
  });
  console.log('');
}

// Test Winston functionality
console.log('🧪 Testing Winston functionality...\n');

try {
  const testCode = `
    try {
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
      logger.info('Winston test successful!');
      process.exit(0);
    } catch (error) {
      console.error('Winston test failed:', error.message);
      process.exit(1);
    }
  `;
  
  const testFile = path.join(__dirname, '..', 'test-winston-diagnostic.js');
  fs.writeFileSync(testFile, testCode);
  
  try {
    execSync(`node ${testFile}`, { stdio: 'inherit' });
    console.log('✅ Winston is working correctly!\n');
  } catch (error) {
    console.log('❌ Winston test failed!\n');
  } finally {
    fs.unlinkSync(testFile);
  }
} catch (error) {
  console.error('❌ Failed to run Winston test:', error.message, '\n');
}

// Recommendations
console.log('💡 Recommendations:\n');

if (results.missing.length > 0) {
  console.log('1. Install missing dependencies:');
  console.log('   npm run fix:winston\n');
  
  console.log('2. Or manually install:');
  results.missing.forEach(dep => {
    console.log(`   npm install ${dep.name}@${dep.expectedVersion}`);
  });
  console.log('');
  
  console.log('3. If issues persist, try a clean install:');
  console.log('   rm -rf node_modules package-lock.json');
  console.log('   npm install\n');
} else if (results.errors.length > 0) {
  console.log('1. Clear npm cache and reinstall:');
  console.log('   npm cache clean --force');
  console.log('   rm -rf node_modules package-lock.json');
  console.log('   npm install\n');
} else {
  console.log('✨ All Winston dependencies are properly installed!');
  console.log('   If you\'re still experiencing issues, check for:');
  console.log('   - Version conflicts');
  console.log('   - Corrupted node_modules');
  console.log('   - Permission issues\n');
}

// Check for common issues
console.log('🔍 Checking for common issues...\n');

// Check Node.js version
const nodeVersion = process.version;
console.log(`Node.js version: ${nodeVersion}`);
if (parseInt(nodeVersion.split('.')[0].substring(1)) < 14) {
  console.log('⚠️  Winston 3.x requires Node.js 14 or higher\n');
}

// Check npm version
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`npm version: ${npmVersion}\n`);
} catch (error) {
  console.log('⚠️  Could not determine npm version\n');
}

// Summary
console.log('========================================');
console.log('📊 Summary:');
console.log(`   ✅ Installed: ${results.installed.length}`);
console.log(`   ❌ Missing: ${results.missing.length}`);
console.log(`   ⚠️  Errors: ${results.errors.length}`);
console.log('========================================\n');

process.exit(results.missing.length > 0 || results.errors.length > 0 ? 1 : 0);