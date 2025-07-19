#!/usr/bin/env node

/**
 * Fix ESLint dependencies for Vercel build
 */

const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// ESLint packages that should be in dependencies for Vercel
const eslintPackages = [
  'eslint',
  'eslint-config-next',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  'eslint-config-prettier',
];

console.log('🔧 Fixing ESLint dependencies for Vercel...\n');

// Move packages from devDependencies to dependencies
eslintPackages.forEach(pkg => {
  if (packageJson.devDependencies && packageJson.devDependencies[pkg]) {
    const version = packageJson.devDependencies[pkg];

    // Add to dependencies if not already there
    if (!packageJson.dependencies[pkg]) {
      packageJson.dependencies[pkg] = version;
      console.log(`✅ Moved ${pkg} to dependencies: ${version}`);
    } else {
      console.log(`ℹ️  ${pkg} already in dependencies: ${packageJson.dependencies[pkg]}`);
    }

    // Remove from devDependencies
    delete packageJson.devDependencies[pkg];
  }
});

// Sort dependencies
packageJson.dependencies = Object.keys(packageJson.dependencies)
  .sort()
  .reduce((obj, key) => {
    obj[key] = packageJson.dependencies[key];
    return obj;
  }, {});

// Sort devDependencies
if (packageJson.devDependencies) {
  packageJson.devDependencies = Object.keys(packageJson.devDependencies)
    .sort()
    .reduce((obj, key) => {
      obj[key] = packageJson.devDependencies[key];
      return obj;
    }, {});
}

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log('\n✅ package.json updated successfully');
console.log('\n💡 Next steps:');
console.log('  1. Run: npm install');
console.log('  2. Commit the updated package.json');
console.log('  3. Push to trigger Vercel rebuild');
