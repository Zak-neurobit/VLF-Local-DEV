#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

async function fixAllIconImports() {
  console.log('Fixing all missing icon imports...\n');

  // Find all files that use Users, Scale, or FileText without proper imports
  const command = `grep -r "\\(Users\\|Scale\\|FileText\\) className" src/app/ --include="*.tsx" | cut -d: -f1 | sort -u`;
  const files = execSync(command, { encoding: 'utf-8' }).trim().split('\n').filter(Boolean);

  let fixedCount = 0;

  for (const file of files) {
    try {
      let content = await fs.readFile(file, 'utf-8');
      let modified = false;

      // Check which icons are used
      const usesUsers = content.includes('<Users className');
      const usesScale = content.includes('<Scale className');
      const usesFileText = content.includes('<FileText className');

      if (usesUsers || usesScale || usesFileText) {
        // Check if there's already a lucide-react import
        const importMatch = content.match(/import\s*{([^}]+)}\s*from\s*['"]lucide-react['"]/);

        if (importMatch) {
          // Parse existing imports
          const currentImports = importMatch[1]
            .split(',')
            .map(i => i.trim())
            .filter(Boolean);
          const neededImports = [];

          if (usesUsers && !currentImports.includes('Users')) {
            neededImports.push('Users');
          }
          if (usesScale && !currentImports.includes('Scale')) {
            neededImports.push('Scale');
          }
          if (usesFileText && !currentImports.includes('FileText')) {
            neededImports.push('FileText');
          }

          if (neededImports.length > 0) {
            // Add needed imports
            const allImports = [...currentImports, ...neededImports].sort();
            const newImportStatement = `import { ${allImports.join(', ')} } from 'lucide-react';`;
            content = content.replace(
              /import\s*{[^}]+}\s*from\s*['"]lucide-react['"];?/,
              newImportStatement
            );
            modified = true;
          }
        } else {
          // No lucide-react import exists, add one after other imports
          const neededImports = [];
          if (usesUsers) neededImports.push('Users');
          if (usesScale) neededImports.push('Scale');
          if (usesFileText) neededImports.push('FileText');

          if (neededImports.length > 0) {
            // Find where to insert the import (after last import statement)
            const importRegex = /^import[^;]+;$/gm;
            const imports = content.match(importRegex);
            if (imports && imports.length > 0) {
              const lastImport = imports[imports.length - 1];
              const newImport = `import { ${neededImports.sort().join(', ')} } from 'lucide-react';`;
              content = content.replace(lastImport, `${lastImport}\n${newImport}`);
              modified = true;
            }
          }
        }
      }

      if (modified) {
        await fs.writeFile(file, content);
        console.log(`✅ Fixed: ${file}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Error fixing ${file}:`, error.message);
    }
  }

  console.log(`\n✨ Fixed ${fixedCount} files!`);
}

// Run the fix
fixAllIconImports().catch(console.error);
