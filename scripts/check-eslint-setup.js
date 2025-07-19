#!/usr/bin/env node

/**
 * Check ESLint setup and dependencies
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking ESLint setup...\n');

// Check if required packages exist in package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const requiredPackages = [
  'eslint',
  'eslint-config-next',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
];

console.log('📦 Package.json dependencies:');
requiredPackages.forEach(pkg => {
  const version = packageJson.dependencies?.[pkg] || packageJson.devDependencies?.[pkg];
  if (version) {
    console.log(`  ✅ ${pkg}: ${version}`);
  } else {
    console.log(`  ❌ ${pkg}: NOT FOUND`);
  }
});

// Check if ESLint config files exist
console.log('\n📄 Configuration files:');
const configFiles = ['.eslintrc.json', '.eslintrc.js', '.eslintrc'];
let configFound = false;

configFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file} found`);
    configFound = true;

    // Read and display config
    if (file === '.eslintrc.json') {
      const config = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      console.log(`     Extends: ${JSON.stringify(config.extends)}`);
    }
  }
});

if (!configFound) {
  console.log('  ❌ No ESLint config file found');
}

// Check if node_modules packages exist
console.log('\n📂 Node modules:');
requiredPackages.forEach(pkg => {
  const modulePath = path.join(process.cwd(), 'node_modules', pkg);
  if (fs.existsSync(modulePath)) {
    console.log(`  ✅ ${pkg} installed`);

    // Check specific files for eslint-config-next
    if (pkg === 'eslint-config-next') {
      const coreWebVitalsPath = path.join(modulePath, 'core-web-vitals.js');
      if (fs.existsSync(coreWebVitalsPath)) {
        console.log(`     ✅ core-web-vitals.js found`);
      } else {
        console.log(`     ❌ core-web-vitals.js NOT FOUND`);
      }
    }
  } else {
    console.log(`  ❌ ${pkg} NOT installed`);
  }
});

// Try to resolve the configs
console.log('\n🔧 Config resolution test:');
try {
  require.resolve('eslint-config-next');
  console.log('  ✅ eslint-config-next can be resolved');
} catch (e) {
  console.log('  ❌ eslint-config-next cannot be resolved:', e.message);
}

try {
  require.resolve('eslint-config-next/core-web-vitals');
  console.log('  ✅ eslint-config-next/core-web-vitals can be resolved');
} catch (e) {
  console.log('  ❌ eslint-config-next/core-web-vitals cannot be resolved:', e.message);
}

// Check Next.js version compatibility
console.log('\n🔄 Version compatibility:');
const nextVersion = packageJson.dependencies?.next || packageJson.devDependencies?.next;
const eslintConfigNextVersion =
  packageJson.dependencies?.['eslint-config-next'] ||
  packageJson.devDependencies?.['eslint-config-next'];

console.log(`  Next.js: ${nextVersion || 'NOT FOUND'}`);
console.log(`  eslint-config-next: ${eslintConfigNextVersion || 'NOT FOUND'}`);

if (nextVersion && eslintConfigNextVersion) {
  const nextMajor = nextVersion.match(/\d+/)?.[0];
  const configMajor = eslintConfigNextVersion.match(/\d+/)?.[0];

  if (nextMajor === configMajor) {
    console.log(`  ✅ Versions are compatible (both major version ${nextMajor})`);
  } else {
    console.log(
      `  ⚠️  Version mismatch: Next.js is v${nextMajor}, eslint-config-next is v${configMajor}`
    );
  }
}

console.log('\n💡 Recommendations:');
console.log(
  '  1. Make sure eslint-config-next is in dependencies (not devDependencies) for Vercel'
);
console.log('  2. Run: npm install eslint-config-next@14.2.30 --save');
console.log('  3. Clear Vercel build cache and redeploy');
console.log('  4. Consider adding a vercel.json with installCommand: "npm install --force"');
