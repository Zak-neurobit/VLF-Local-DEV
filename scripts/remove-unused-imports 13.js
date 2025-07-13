#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Files to process
const srcPattern = './src/**/*.{ts,tsx}';

// Common unused imports that we identified from linting
const commonUnusedImports = [
  {
    pattern: /import\s+{\s*Image\s*}\s+from\s+['"]next\/image['"];\s*\n/,
    name: 'Image from next/image',
  },
  {
    pattern: /import\s+{\s*ArrowRight\s*}\s+from\s+['"]lucide-react['"];\s*\n/,
    name: 'ArrowRight from lucide-react',
  },
  { pattern: /import\s+Image\s+from\s+['"]next\/image['"];\s*\n/, name: 'Image default import' },
];

function removeUnusedImports(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let updatedContent = content;
    let hasChanges = false;

    // Check each common unused import
    commonUnusedImports.forEach(({ pattern, name }) => {
      if (pattern.test(updatedContent)) {
        // Check if the import is actually used in the file
        const importMatch = updatedContent.match(pattern);
        if (importMatch) {
          const importName = name.split(' ')[0]; // Get the first word (Image, ArrowRight, etc.)

          // Check if the import is used in the file content
          const usagePattern = new RegExp(`\\b${importName}\\b`, 'g');
          const matches = updatedContent.match(usagePattern) || [];

          // If only found in import statement (1 match), it's unused
          if (matches.length === 1) {
            updatedContent = updatedContent.replace(pattern, '');
            hasChanges = true;
            console.log(`Removed unused import ${name} from ${filePath}`);
          }
        }
      }
    });

    // Remove empty import lines
    updatedContent = updatedContent.replace(/import\s*{\s*}\s*from\s*['"][^'"]*['"];\s*\n/g, '');

    // Clean up multiple consecutive newlines
    updatedContent = updatedContent.replace(/\n\n\n+/g, '\n\n');

    if (hasChanges) {
      fs.writeFileSync(filePath, updatedContent);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🧹 Removing unused imports...');

  const files = glob.sync(srcPattern);
  let totalFiles = 0;
  let modifiedFiles = 0;

  files.forEach(file => {
    totalFiles++;
    if (removeUnusedImports(file)) {
      modifiedFiles++;
    }
  });

  console.log(`\n✅ Processed ${totalFiles} files`);
  console.log(`📝 Modified ${modifiedFiles} files`);
  console.log('🎉 Unused import cleanup complete!');
}

if (require.main === module) {
  main();
}

module.exports = { removeUnusedImports };
