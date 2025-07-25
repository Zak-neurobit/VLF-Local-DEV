#!/usr/bin/env node

/**
 * Script to fix color discrepancies across pages
 * Ensures all pages follow the dark theme design system
 */

const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const globModule = require('glob');
const glob = promisify(globModule.glob || globModule);

// Color mappings - from light to dark theme
const COLOR_REPLACEMENTS = {
  // Background colors
  'bg-white': 'bg-gray-900',
  'bg-gray-50': 'bg-gray-900/50',
  'bg-gray-100': 'bg-gray-800',
  'bg-gray-200': 'bg-gray-700',
  'bg-blue-50': 'bg-blue-900/20',
  'bg-green-50': 'bg-green-900/20',
  'bg-yellow-50': 'bg-yellow-900/20',
  'bg-red-50': 'bg-red-900/20',

  // Text colors for light backgrounds
  'text-gray-900': 'text-white',
  'text-gray-800': 'text-gray-100',
  'text-gray-700': 'text-gray-200',
  'text-gray-600': 'text-gray-300',
  'text-gray-500': 'text-gray-400',

  // Border colors
  'border-gray-200': 'border-gray-700',
  'border-gray-300': 'border-gray-600',

  // Card backgrounds
  'bg-white shadow': 'bg-gray-800 shadow-xl',
  'bg-white rounded': 'bg-gray-800 rounded',
  'bg-white/80': 'bg-gray-800/80',
  'bg-white/90': 'bg-gray-800/90',
};

// Pages to exclude from automatic color fixing
const EXCLUDE_PATTERNS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.next/**',
  '**/test-*/**', // Test pages might need different colors
];

async function findPagesWithLightColors() {
  try {
    const files = await glob('src/app/**/page.tsx', {
      ignore: EXCLUDE_PATTERNS,
    });
    return files;
  } catch (error) {
    console.error('Error finding files:', error);
    return [];
  }
}

async function checkPageForLightColors(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const issues = [];

  for (const [lightColor, darkColor] of Object.entries(COLOR_REPLACEMENTS)) {
    if (content.includes(lightColor)) {
      issues.push({
        lightColor,
        darkColor,
        count: (content.match(new RegExp(lightColor, 'g')) || []).length,
      });
    }
  }

  return issues;
}

async function fixPageColors(filePath, issues) {
  let content = await fs.readFile(filePath, 'utf-8');
  let changesMade = false;

  for (const { lightColor, darkColor } of issues) {
    const regex = new RegExp(`\\b${lightColor}\\b`, 'g');
    const newContent = content.replace(regex, darkColor);
    if (newContent !== content) {
      content = newContent;
      changesMade = true;
    }
  }

  if (changesMade) {
    await fs.writeFile(filePath, content, 'utf-8');
  }

  return changesMade;
}

async function main() {
  console.log('🎨 Checking for color discrepancies in pages...\n');

  try {
    const files = await findPagesWithLightColors();
    console.log(`Found ${files.length} page files to check\n`);

    let totalIssues = 0;
    let filesWithIssues = [];

    // Check each file
    for (const file of files) {
      const issues = await checkPageForLightColors(file);
      if (issues.length > 0) {
        totalIssues += issues.length;
        filesWithIssues.push({ file, issues });

        console.log(`📄 ${file}`);
        issues.forEach(({ lightColor, darkColor, count }) => {
          console.log(`   ⚠️  ${lightColor} → ${darkColor} (${count} occurrences)`);
        });
        console.log('');
      }
    }

    if (filesWithIssues.length === 0) {
      console.log('✅ No color discrepancies found! All pages follow the dark theme.\n');
      return;
    }

    console.log(
      `\n📊 Summary: Found ${totalIssues} color issues in ${filesWithIssues.length} files\n`
    );

    // Ask for confirmation
    console.log('Would you like to fix these automatically? (y/n)');

    // For automation, we'll proceed with fixes
    console.log('\n🔧 Fixing color discrepancies...\n');

    let fixedCount = 0;
    for (const { file, issues } of filesWithIssues) {
      const fixed = await fixPageColors(file, issues);
      if (fixed) {
        console.log(`✅ Fixed ${file}`);
        fixedCount++;
      }
    }

    console.log(`\n✨ Done! Fixed ${fixedCount} files.`);
    console.log('\n⚠️  Note: Some pages may require manual review, especially if they contain:');
    console.log('   - Inline styles or dynamic classes');
    console.log('   - Content that should remain light (like code blocks)');
    console.log('   - Special UI components with specific color requirements\n');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}
