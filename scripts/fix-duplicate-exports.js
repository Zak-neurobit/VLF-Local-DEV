#!/usr/bin/env node

const { readFileSync, writeFileSync } = require('fs');
const { glob } = require('glob');
const path = require('path');

/**
 * Script to fix duplicate dynamic exports in page files
 * This removes conflicting export statements and ensures only force-dynamic is used
 */

async function fixDuplicateExports() {
  console.log('🔧 Fixing duplicate dynamic exports in pages...\n');

  // Find all page.tsx files that were modified
  const patterns = [
    'src/app/locations/**/page.tsx',
    'src/app/es/ubicaciones/**/page.tsx',
    'src/app/blog/**/page.tsx',
    'src/app/es/blog/**/page.tsx',
    'src/app/near-me/**/page.tsx',
    'src/app/es/cerca-de-mi/**/page.tsx'
  ];

  let totalFiles = 0;
  let fixedFiles = 0;

  for (const pattern of patterns) {
    const files = await glob(pattern, { 
      cwd: process.cwd(),
      ignore: ['**/node_modules/**']
    });

    for (const file of files) {
      totalFiles++;
      const filePath = path.join(process.cwd(), file);
      
      try {
        let content = readFileSync(filePath, 'utf-8');
        let originalContent = content;
        
        // Remove any existing static export declarations and ISR comments
        content = content.replace(/\/\/ ISR Configuration\s*\n/g, '');
        content = content.replace(/export const dynamic = 'force-static';\s*\n/g, '');
        content = content.replace(/export const revalidate = \d+;\s*\/\/.*\n/g, '');
        
        // Check if we have duplicate dynamic exports
        const dynamicMatches = content.match(/export const dynamic = 'force-dynamic';/g);
        const paramsMatches = content.match(/export const dynamicParams = true;/g);
        
        if (dynamicMatches && dynamicMatches.length > 1) {
          // Remove all but the first occurrence
          let firstFound = false;
          content = content.replace(/export const dynamic = 'force-dynamic';\s*\n/g, (match) => {
            if (!firstFound) {
              firstFound = true;
              return match;
            }
            return '';
          });
        }
        
        if (paramsMatches && paramsMatches.length > 1) {
          // Remove all but the first occurrence
          let firstFound = false;
          content = content.replace(/export const dynamicParams = true;\s*\n/g, (match) => {
            if (!firstFound) {
              firstFound = true;
              return match;
            }
            return '';
          });
        }
        
        // Clean up any multiple empty lines
        content = content.replace(/\n\n\n+/g, '\n\n');
        
        if (content !== originalContent) {
          writeFileSync(filePath, content, 'utf-8');
          fixedFiles++;
          console.log(`✅ Fixed ${file}`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error);
      }
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   Total files processed: ${totalFiles}`);
  console.log(`   Files fixed: ${fixedFiles}`);
  console.log('\n✨ Duplicate exports fixed successfully!');
}

// Run the script
fixDuplicateExports().catch(console.error);