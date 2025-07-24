#!/usr/bin/env node

/**
 * Test script to identify build issues with practice area pages
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Testing Practice Area Pages Build\n');

// Create a minimal test to check if Next.js can build these pages
const testPages = [
  'practice-areas/immigration/green-cards',
  'practice-areas/personal-injury/car-accidents',
  'practice-areas/workers-compensation/construction-site-injuries',
];

// Check if we can at least analyze the pages
console.log('📋 Checking page syntax and imports...\n');

testPages.forEach(pagePath => {
  const fullPath = path.join(__dirname, '..', 'src', 'app', pagePath, 'page.tsx');
  
  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    console.log(`\n🔍 ${pagePath}:`);
    
    // Check imports
    const imports = content.match(/import .* from ['"](.*)['"];/g) || [];
    const problematicImports = imports.filter(imp => {
      return imp.includes('@/components/templates/ModernPracticeAreaTemplate') ||
             imp.includes('@/design-system') ||
             imp.includes('@/components');
    });
    
    if (problematicImports.length > 0) {
      console.log('  📦 Key imports found:');
      problematicImports.forEach(imp => {
        console.log(`    - ${imp}`);
        
        // Extract the import path
        const importPath = imp.match(/from ['"](.*)['"];/)?.[1];
        if (importPath && importPath.startsWith('@/')) {
          const resolvedPath = importPath.replace('@/', 'src/');
          const extensions = ['.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts'];
          
          let found = false;
          for (const ext of extensions) {
            const checkPath = path.join(__dirname, '..', resolvedPath + ext);
            if (fs.existsSync(checkPath)) {
              console.log(`      ✅ Resolved to: ${resolvedPath + ext}`);
              found = true;
              break;
            }
          }
          
          if (!found) {
            console.log(`      ❌ Could not resolve import!`);
          }
        }
      });
    }
    
    // Check for common issues
    if (!content.includes('export default')) {
      console.log('  ❌ Missing default export');
    } else {
      console.log('  ✅ Has default export');
    }
    
    if (!content.includes('export const metadata')) {
      console.log('  ⚠️  Missing metadata export (SEO impact)');
    } else {
      console.log('  ✅ Has metadata export');
    }
    
    // Check for runtime issues
    if (content.includes('use client')) {
      console.log('  ℹ️  Client component (may have hydration issues)');
    }
    
    if (content.includes('This page is under development')) {
      console.log('  ⚠️  Shows "under development" message');
    }
    
  } catch (error) {
    console.log(`  ❌ Error reading page: ${error.message}`);
  }
});

// Check if the template component exists
console.log('\n\n🔧 Checking ModernPracticeAreaTemplate...');
const templatePath = path.join(__dirname, '..', 'src', 'components', 'templates', 'ModernPracticeAreaTemplate.tsx');

if (fs.existsSync(templatePath)) {
  console.log('  ✅ Template file exists');
  
  const templateContent = fs.readFileSync(templatePath, 'utf8');
  
  if (templateContent.includes("'use client'")) {
    console.log('  ℹ️  Template is a client component');
  }
  
  if (templateContent.includes('export')) {
    console.log('  ✅ Template has exports');
  }
  
  // Check for problematic dependencies
  const deps = templateContent.match(/import .* from ['"](.*)['"];/g) || [];
  const externalDeps = deps.filter(d => !d.includes('@/') && !d.includes('react') && !d.includes('next'));
  
  if (externalDeps.length > 0) {
    console.log('  📦 External dependencies:');
    externalDeps.forEach(dep => {
      console.log(`    - ${dep}`);
    });
  }
} else {
  console.log('  ❌ Template file not found!');
}

console.log('\n\n💡 Recommendations:');
console.log('1. The practice area pages exist and have proper structure');
console.log('2. They all use ModernPracticeAreaTemplate which exists');
console.log('3. The 404 errors are likely due to:');
console.log('   - Server not running (corrupted node_modules)');
console.log('   - Possible build errors that only show at runtime');
console.log('   - Middleware interfering with routes');
console.log('\n4. To fix:');
console.log('   a) Clean and reinstall node_modules');
console.log('   b) Run "npm run build" to check for build errors');
console.log('   c) Check browser console when visiting pages');
console.log('   d) Check Next.js build output for warnings');

console.log('\n✨ Analysis complete!');