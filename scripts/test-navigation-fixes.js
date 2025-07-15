#!/usr/bin/env node

/**
 * Test script to verify navigation fixes
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Navigation Fixes...\n');

// Test 1: Check if all Link components are imported correctly
console.log('1️⃣ Checking Link imports in navigation components...');
const headerFile = fs.readFileSync(
  path.join(__dirname, '../src/design-system/components/ConsistentHeader.tsx'),
  'utf8'
);
const layoutFile = fs.readFileSync(
  path.join(__dirname, '../src/design-system/templates/MasterLayout.tsx'),
  'utf8'
);

if (headerFile.includes("import Link from 'next/link'")) {
  console.log('✅ ConsistentHeader has proper Link import');
} else {
  console.log('❌ ConsistentHeader missing Link import');
}

if (layoutFile.includes("import Link from 'next/link'")) {
  console.log('✅ MasterLayout has proper Link import');
} else {
  console.log('❌ MasterLayout missing Link import');
}

// Test 2: Check for proper href usage in navigation
console.log('\n2️⃣ Checking navigation href patterns...');

// Check if language-aware hrefs are used
if (headerFile.includes("href={language === 'es' ? '/es' : '/'}")) {
  console.log('✅ Logo link is language-aware');
} else {
  console.log('❌ Logo link is not language-aware');
}

if (headerFile.includes("href={language === 'es' ? '/es/contacto' : '/contact'}")) {
  console.log('✅ CTA button is language-aware');
} else {
  console.log('❌ CTA button is not language-aware');
}

// Test 3: Check breadcrumb implementation
console.log('\n3️⃣ Checking breadcrumb implementation...');
if (layoutFile.includes('<Link') && layoutFile.includes('breadcrumb')) {
  console.log('✅ Breadcrumbs use Next.js Link component');
} else {
  console.log('❌ Breadcrumbs might not be using Next.js Link component');
}

// Test 4: Check middleware configuration
console.log('\n4️⃣ Checking middleware configuration...');
const middlewareFile = fs.readFileSync(path.join(__dirname, '../src/middleware.ts'), 'utf8');

if (middlewareFile.includes("locales = ['en', 'es']")) {
  console.log('✅ Middleware supports both en and es locales');
} else {
  console.log('❌ Middleware locale configuration issue');
}

// Test 5: Check for conflicting navigation components
console.log('\n5️⃣ Checking for potential navigation conflicts...');
const hasModernNav = fs.existsSync(path.join(__dirname, '../src/components/ui/modern-nav.tsx'));
const hasMainNav = fs.existsSync(path.join(__dirname, '../src/components/Navigation/MainNav.tsx'));

if (hasModernNav || hasMainNav) {
  console.log('⚠️  Found additional navigation components that might conflict:');
  if (hasModernNav) console.log('   - /src/components/ui/modern-nav.tsx');
  if (hasMainNav) console.log('   - /src/components/Navigation/MainNav.tsx');
} else {
  console.log('✅ No conflicting navigation components found');
}

// Test 6: Check Spanish practice area pages exist
console.log('\n6️⃣ Checking Spanish practice area pages...');
const spanishPracticeAreas = [
  '/src/app/es/areas-de-practica/page.tsx',
  '/src/app/es/areas-de-practica/inmigracion/page.tsx',
  '/src/app/es/areas-de-practica/lesiones-personales/page.tsx',
  '/src/app/es/areas-de-practica/compensacion-laboral/page.tsx',
  '/src/app/es/areas-de-practica/defensa-criminal/page.tsx',
  '/src/app/es/areas-de-practica/derecho-familia/page.tsx',
  '/src/app/es/areas-de-practica/infracciones-transito/page.tsx',
];

let missingPages = [];
spanishPracticeAreas.forEach(pagePath => {
  const fullPath = path.join(__dirname, '..', pagePath);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${pagePath} exists`);
  } else {
    console.log(`❌ ${pagePath} missing`);
    missingPages.push(pagePath);
  }
});

// Summary
console.log('\n' + '='.repeat(50));
console.log('SUMMARY');
console.log('='.repeat(50));

const issues = [];

if (!headerFile.includes("import Link from 'next/link'")) {
  issues.push('ConsistentHeader missing Link import');
}
if (!layoutFile.includes("import Link from 'next/link'")) {
  issues.push('MasterLayout missing Link import');
}
if (!headerFile.includes("href={language === 'es'")) {
  issues.push('Navigation links not language-aware');
}
if (missingPages.length > 0) {
  issues.push(`${missingPages.length} Spanish pages missing`);
}

if (issues.length === 0) {
  console.log('✅ All navigation fixes appear to be properly implemented!');
} else {
  console.log(`⚠️  Found ${issues.length} potential issues:`);
  issues.forEach((issue, i) => {
    console.log(`   ${i + 1}. ${issue}`);
  });
}

console.log('\n💡 Recommendations:');
console.log('1. Test all navigation links on the deployed site');
console.log('2. Verify language switching works correctly');
console.log('3. Check that dropdowns open and close properly');
console.log('4. Ensure all links navigate to the correct pages');
console.log('5. Test on both desktop and mobile devices');

process.exit(issues.length > 0 ? 1 : 0);
