#!/usr/bin/env node

/**
 * Setup script for the resources feature
 * This script installs necessary dependencies for PDF generation
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Resources Feature...\n');

// Dependencies to install
const dependencies = ['@react-pdf/renderer', '@react-pdf/font'];

console.log('📦 Installing dependencies for PDF generation...');
try {
  execSync(`npm install ${dependencies.join(' ')}`, { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully!\n');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Create necessary directories
const directories = [
  'src/resources/guides',
  'src/resources/calculators',
  'src/resources/templates',
  'src/resources/checklists',
  'public/resources/pdfs',
];

console.log('📁 Creating directory structure...');
directories.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`  ✅ Created: ${dir}`);
  } else {
    console.log(`  ⏭️  Already exists: ${dir}`);
  }
});

console.log('\n🎉 Resources feature setup complete!');
console.log('\n📚 Next steps:');
console.log('  1. Create more PDF guides in src/resources/guides/');
console.log('  2. Create interactive calculators in src/resources/calculators/');
console.log('  3. Add resource pages for each practice area in src/app/resources/[practice-area]/');
console.log('  4. Update the API route to handle new resources');
console.log('\n💡 Example usage:');
console.log('  - Immigration resources: http://localhost:3000/resources/immigration');
console.log(
  '  - Child support calculator: http://localhost:3000/resources/calculators/child-support'
);
console.log('\n');
