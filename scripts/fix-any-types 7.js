#!/usr/bin/env node

const fs = require('fs');
const glob = require('glob');

// Common any type patterns and their replacements
const anyTypeReplacements = [
  // Event handlers
  {
    pattern: /\(event:\s*any\)/g,
    replacement: '(event: Event)',
    name: 'Event handlers',
  },
  {
    pattern: /\(e:\s*any\)/g,
    replacement: '(e: Event)',
    name: 'Event handlers (short)',
  },
  {
    pattern: /\(err:\s*any\)/g,
    replacement: '(err: unknown)',
    name: 'Error handlers',
  },
  {
    pattern: /\(error:\s*any\)/g,
    replacement: '(error: unknown)',
    name: 'Error handlers (verbose)',
  },
  // React props
  {
    pattern: /props:\s*any/g,
    replacement: 'props: Record<string, unknown>',
    name: 'React props',
  },
  // Data objects
  {
    pattern: /data:\s*any/g,
    replacement: 'data: Record<string, unknown>',
    name: 'Data objects',
  },
  // Response objects
  {
    pattern: /response:\s*any/g,
    replacement: 'response: Record<string, unknown>',
    name: 'Response objects',
  },
  // Generic any[] arrays
  {
    pattern: /:\s*any\[\]/g,
    replacement: ': unknown[]',
    name: 'Any arrays',
  },
  // Function parameters
  {
    pattern: /\(.*:\s*any\s*\)/g,
    replacement: match => match.replace('any', 'unknown'),
    name: 'Function parameters',
  },
];

function fixAnyTypes(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let updatedContent = content;
    let hasChanges = false;

    anyTypeReplacements.forEach(({ pattern, replacement, name }) => {
      if (pattern.test(updatedContent)) {
        const originalContent = updatedContent;

        if (typeof replacement === 'function') {
          updatedContent = updatedContent.replace(pattern, replacement);
        } else {
          updatedContent = updatedContent.replace(pattern, replacement);
        }

        if (originalContent !== updatedContent) {
          hasChanges = true;
          console.log(`Fixed ${name} in ${filePath}`);
        }
      }
    });

    // Special handling for specific patterns that need context

    // Fix useState<any>
    if (/useState<any>/g.test(updatedContent)) {
      updatedContent = updatedContent.replace(/useState<any>/g, 'useState<unknown>');
      hasChanges = true;
      console.log(`Fixed useState<any> in ${filePath}`);
    }

    // Fix catch blocks
    if (/catch\s*\(\s*\w+:\s*any\s*\)/g.test(updatedContent)) {
      updatedContent = updatedContent.replace(
        /catch\s*\(\s*(\w+):\s*any\s*\)/g,
        'catch ($1: unknown)'
      );
      hasChanges = true;
      console.log(`Fixed catch blocks in ${filePath}`);
    }

    // Fix as any assertions
    if (/as\s+any/g.test(updatedContent)) {
      // Only replace simple cases, leave complex ones for manual review
      const simpleAsAnyPattern = /\}\s*as\s+any/g;
      if (simpleAsAnyPattern.test(updatedContent)) {
        updatedContent = updatedContent.replace(simpleAsAnyPattern, '}');
        hasChanges = true;
        console.log(`Removed 'as any' assertions in ${filePath}`);
      }
    }

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
  console.log('🔧 Fixing any types...');

  const files = glob.sync('./src/**/*.{ts,tsx}');
  let totalFiles = 0;
  let modifiedFiles = 0;

  files.forEach(file => {
    totalFiles++;
    if (fixAnyTypes(file)) {
      modifiedFiles++;
    }
  });

  console.log(`\n✅ Processed ${totalFiles} files`);
  console.log(`📝 Modified ${modifiedFiles} files`);
  console.log('🎉 Any type cleanup complete!');

  if (modifiedFiles > 0) {
    console.log('\n⚠️  Some complex any types may still need manual review');
  }
}

if (require.main === module) {
  main();
}

module.exports = { fixAnyTypes };
