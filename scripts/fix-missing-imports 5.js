#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

async function fixMissingImports() {
  console.log('Fixing missing imports in location pages...\n');

  // Find all location page.tsx files that might have the "Why Choose Us" section
  const files = glob.sync('src/app/**/page.tsx', {
    ignore: ['**/node_modules/**', '**/.next/**'],
  });

  let fixedCount = 0;

  for (const file of files) {
    try {
      let content = await fs.readFile(file, 'utf-8');
      let modified = false;

      // Check if the file uses Users, Scale, or FileText icons without importing them
      if (
        content.includes('<Users ') ||
        content.includes('<Scale ') ||
        content.includes('<FileText ')
      ) {
        // Check if these are already imported
        const hasUsersImport = content.includes('Users') && content.includes("from 'lucide-react'");
        const hasScaleImport = content.includes('Scale') && content.includes("from 'lucide-react'");
        const hasFileTextImport =
          content.includes('FileText') && content.includes("from 'lucide-react'");

        if (!hasUsersImport || !hasScaleImport || !hasFileTextImport) {
          // Find the lucide-react import line
          const importMatch = content.match(/import\s*{([^}]+)}\s*from\s*['"]lucide-react['"]/);

          if (importMatch) {
            const currentImports = importMatch[1].split(',').map(i => i.trim());
            const neededImports = [];

            if (content.includes('<Users ') && !currentImports.includes('Users')) {
              neededImports.push('Users');
            }
            if (content.includes('<Scale ') && !currentImports.includes('Scale')) {
              neededImports.push('Scale');
            }
            if (content.includes('<FileText ') && !currentImports.includes('FileText')) {
              neededImports.push('FileText');
            }

            if (neededImports.length > 0) {
              const allImports = [...currentImports, ...neededImports].sort();
              const newImportStatement = `import { ${allImports.join(', ')} } from 'lucide-react'`;
              content = content.replace(
                /import\s*{[^}]+}\s*from\s*['"]lucide-react['"]/,
                newImportStatement
              );
              modified = true;
            }
          }
        }
      }

      if (modified) {
        await fs.writeFile(file, content);
        console.log(`✅ Fixed imports in: ${file}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Error fixing ${file}:`, error.message);
    }
  }

  console.log(`\n✨ Fixed ${fixedCount} files!`);
}

// Run the fix
fixMissingImports().catch(console.error);
