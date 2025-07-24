#!/usr/bin/env ts-node

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import path from 'path';

/**
 * Script to add dynamic rendering configuration to all location and blog pages
 * This fixes the build issue by converting static pages to dynamic rendering
 */

async function addDynamicRendering() {
  console.log('🔧 Adding dynamic rendering configuration to pages...\n');

  // Find all page.tsx files in locations and blog directories
  const patterns = [
    'src/app/locations/**/page.tsx',
    'src/app/es/ubicaciones/**/page.tsx',
    'src/app/blog/**/page.tsx',
    'src/app/es/blog/**/page.tsx',
    // Also include near-me pages which might have similar issues
    'src/app/near-me/**/page.tsx',
    'src/app/es/cerca-de-mi/**/page.tsx'
  ];

  let totalFiles = 0;
  let modifiedFiles = 0;
  let skippedFiles = 0;

  for (const pattern of patterns) {
    const files = await glob(pattern, { 
      cwd: process.cwd(),
      ignore: ['**/node_modules/**']
    });

    console.log(`\n📁 Processing ${pattern}: Found ${files.length} files`);

    for (const file of files) {
      totalFiles++;
      const filePath = path.join(process.cwd(), file);
      
      try {
        let content = readFileSync(filePath, 'utf-8');
        
        // Check if dynamic exports already exist
        const hasDynamicExport = content.includes("export const dynamic = 'force-dynamic'");
        const hasDynamicParams = content.includes("export const dynamicParams = true");
        
        if (hasDynamicExport && hasDynamicParams) {
          skippedFiles++;
          console.log(`⏭️  Skipped ${file} (already has dynamic exports)`);
          continue;
        }

        // Find the right place to insert the exports
        // Look for existing exports or imports
        const importMatch = content.match(/^(import[\s\S]*?(?:from\s+['"][^'"]+['"];?\s*\n)+)/m);
        let insertPosition = 0;
        
        if (importMatch) {
          // Insert after all imports
          insertPosition = importMatch.index! + importMatch[0].length;
        }

        // Prepare the exports to add
        const exportsToAdd = [];
        if (!hasDynamicExport) {
          exportsToAdd.push("export const dynamic = 'force-dynamic';");
        }
        if (!hasDynamicParams) {
          exportsToAdd.push("export const dynamicParams = true;");
        }

        if (exportsToAdd.length > 0) {
          // Add the exports with proper spacing
          const exportString = '\n' + exportsToAdd.join('\n') + '\n';
          
          // Insert at the calculated position
          content = content.slice(0, insertPosition) + exportString + content.slice(insertPosition);
          
          // Write the file back
          writeFileSync(filePath, content, 'utf-8');
          modifiedFiles++;
          console.log(`✅ Modified ${file}`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error);
      }
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   Total files processed: ${totalFiles}`);
  console.log(`   Files modified: ${modifiedFiles}`);
  console.log(`   Files skipped (already had exports): ${skippedFiles}`);
  console.log('\n✨ Dynamic rendering configuration added successfully!');
  console.log('\n💡 Next steps:');
  console.log('   1. Run "npm run build" to test the build');
  console.log('   2. Commit these changes');
  console.log('   3. Deploy to Vercel');
}

// Run the script
addDynamicRendering().catch(console.error);