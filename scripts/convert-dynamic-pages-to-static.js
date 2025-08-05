#!/usr/bin/env node

/**
 * Convert Dynamic Pages to Static
 * Removes 'force-dynamic' exports from pages to enable static generation
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Colors for output
const chalk = {
  green: text => `\x1b[32m${text}\x1b[0m`,
  yellow: text => `\x1b[33m${text}\x1b[0m`,
  red: text => `\x1b[31m${text}\x1b[0m`,
  blue: text => `\x1b[34m${text}\x1b[0m`,
  bold: { green: text => `\x1b[1m\x1b[32m${text}\x1b[0m` }
};

async function findDynamicPages() {
  const pattern = 'src/app/**/page.tsx';
  console.log(chalk.blue('🔍 Finding pages with force-dynamic...'));
  
  const files = await glob(pattern, { 
    cwd: process.cwd(),
    ignore: ['**/node_modules/**', '**/api/**'] 
  });
  
  const dynamicPages = [];
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes('force-dynamic')) {
      dynamicPages.push(file);
    }
  }
  
  return dynamicPages;
}

function convertToStatic(filePath) {
  console.log(chalk.yellow(`📝 Converting: ${filePath}`));
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Remove the force-dynamic export
  content = content.replace(/export const dynamic = 'force-dynamic';\n?/g, '');
  
  // Add force-static export instead (optional, but helps ensure static)
  if (!content.includes('export const dynamic')) {
    // Add after imports but before the main export
    const lines = content.split('\n');
    let insertIndex = 0;
    
    // Find the last import or the first non-import line
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ') || lines[i].startsWith('//') || lines[i].trim() === '') {
        insertIndex = i + 1;
      } else {
        break;
      }
    }
    
    lines.splice(insertIndex, 0, '', 'export const dynamic = \'force-static\';');
    content = lines.join('\n');
  }
  
  fs.writeFileSync(filePath, content);
  console.log(chalk.green(`✅ Converted: ${filePath}`));
}

async function main() {
  console.log(chalk.bold.green('\n🔄 Converting Dynamic Pages to Static\n'));
  
  try {
    const dynamicPages = await findDynamicPages();
    
    if (dynamicPages.length === 0) {
      console.log(chalk.green('✅ No dynamic pages found - all pages are already static-ready!'));
      return;
    }
    
    console.log(chalk.yellow(`Found ${dynamicPages.length} pages with force-dynamic:`));
    dynamicPages.forEach(page => console.log(`  - ${page}`));
    console.log('');
    
    // Convert each page
    for (const page of dynamicPages) {
      convertToStatic(page);
    }
    
    console.log(chalk.bold.green(`\n✅ Successfully converted ${dynamicPages.length} pages to static!\n`));
    console.log(chalk.blue('These pages will now be pre-rendered at build time.'));
    console.log(chalk.blue('Run "npm run build:static" to test static generation.'));
    
  } catch (error) {
    console.error(chalk.red('\n❌ Error converting pages:'), error.message);
    process.exit(1);
  }
}

main();