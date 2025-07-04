#!/usr/bin/env node

/**
 * Trademark Compliance Script
 * Ensures proper usage of YO PELEO™ and YO PELEO POR TI™ trademarks
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Trademark variations to check
const TRADEMARK_PATTERNS = [
  {
    pattern: /YO PELEO POR TI(?!™|®)/g,
    replacement: 'YO PELEO POR TI™',
    description: 'YO PELEO POR TI without trademark'
  },
  {
    pattern: /YO PELEO(?! POR TI)(?!™|®)/g,
    replacement: 'YO PELEO™',
    description: 'YO PELEO without trademark (standalone)'
  },
  {
    // Fix inconsistent use of ® vs ™
    pattern: /YO PELEO POR TI®/g,
    replacement: 'YO PELEO POR TI™',
    description: 'Standardizing to ™ symbol'
  },
  {
    pattern: /YO PELEO®/g,
    replacement: 'YO PELEO™',
    description: 'Standardizing to ™ symbol'
  }
];

// File patterns to check
const FILE_PATTERNS = [
  'src/**/*.{ts,tsx,js,jsx}',
  'src/**/*.json',
  'src/**/*.md',
  'public/**/*.html',
  '*.md'
];

// Files to exclude
const EXCLUDE_PATTERNS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.next/**',
  '**/coverage/**',
  '**/scripts/fix-trademark-compliance.js' // Don't check this file
];

let totalIssues = 0;
let totalFixed = 0;
const issues = [];

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let modifiedContent = content;
  let fileIssues = 0;
  
  TRADEMARK_PATTERNS.forEach(({ pattern, replacement, description }) => {
    const matches = content.match(pattern);
    if (matches) {
      fileIssues += matches.length;
      issues.push({
        file: filePath,
        issue: description,
        count: matches.length,
        examples: matches.slice(0, 3)
      });
      
      // Fix the issues
      modifiedContent = modifiedContent.replace(pattern, replacement);
    }
  });
  
  if (fileIssues > 0) {
    totalIssues += fileIssues;
    
    // Write the fixed content back
    fs.writeFileSync(filePath, modifiedContent, 'utf8');
    totalFixed += fileIssues;
    
    console.log(`✓ Fixed ${fileIssues} issues in ${filePath}`);
  }
  
  return fileIssues;
}

function main() {
  console.log('🔍 Scanning for trademark compliance issues...\n');
  
  // Get all files to check
  const files = [];
  FILE_PATTERNS.forEach(pattern => {
    const matchedFiles = glob.sync(pattern, {
      ignore: EXCLUDE_PATTERNS,
      nodir: true
    });
    files.push(...matchedFiles);
  });
  
  // Remove duplicates
  const uniqueFiles = [...new Set(files)];
  
  console.log(`Found ${uniqueFiles.length} files to check\n`);
  
  // Check each file
  uniqueFiles.forEach(file => {
    checkFile(file);
  });
  
  // Generate report
  console.log('\n📊 Trademark Compliance Report');
  console.log('================================\n');
  
  if (totalIssues === 0) {
    console.log('✅ All trademarks are properly formatted!\n');
  } else {
    console.log(`Found and fixed ${totalIssues} trademark issues:\n`);
    
    issues.forEach(({ file, issue, count, examples }) => {
      console.log(`📄 ${file}`);
      console.log(`   Issue: ${issue}`);
      console.log(`   Count: ${count}`);
      console.log(`   Examples: ${examples.join(', ')}`);
      console.log('');
    });
    
    console.log(`\n✅ Fixed ${totalFixed} issues automatically`);
  }
  
  // Create/update trademark constants file
  const constantsContent = `/**
 * Trademark Constants
 * Use these constants to ensure consistent trademark usage
 */

export const TRADEMARK = {
  SHORT: 'YO PELEO™',
  FULL: 'YO PELEO POR TI™',
  ENGLISH: 'I FIGHT FOR YOU™',
  PHONE: '1-844-YO-PELEO',
  PHONE_NUMERIC: '1-844-967-3536'
} as const;

// For use in templates and content
export const BRAND = {
  NAME: 'Vasquez Law Firm, PLLC',
  TAGLINE: TRADEMARK.FULL,
  TAGLINE_EN: TRADEMARK.ENGLISH,
  SLOGAN: TRADEMARK.FULL,
  META_SUFFIX: \`\${TRADEMARK.FULL} | Vasquez Law Firm\`
} as const;
`;

  const constantsPath = path.join('src', 'lib', 'constants', 'trademark.ts');
  const constantsDir = path.dirname(constantsPath);
  
  if (!fs.existsSync(constantsDir)) {
    fs.mkdirSync(constantsDir, { recursive: true });
  }
  
  fs.writeFileSync(constantsPath, constantsContent, 'utf8');
  console.log(`\n✅ Created trademark constants file at ${constantsPath}`);
  
  // Create usage examples
  const examplesContent = `# Trademark Usage Examples

## Import the constants
\`\`\`typescript
import { TRADEMARK, BRAND } from '@/lib/constants/trademark';
\`\`\`

## Usage in components
\`\`\`tsx
// In a React component
<h1>{TRADEMARK.FULL}</h1>
<p>{TRADEMARK.ENGLISH}</p>

// In meta tags
<title>{BRAND.META_SUFFIX}</title>

// In content
<p>Call us at {TRADEMARK.PHONE}</p>
\`\`\`

## Usage in JSON files
\`\`\`json
{
  "hero": {
    "title": "YO PELEO POR TI™",
    "subtitle": "I FIGHT FOR YOU™"
  }
}
\`\`\`
`;

  fs.writeFileSync('TRADEMARK-USAGE-EXAMPLES.md', examplesContent, 'utf8');
  console.log('✅ Created usage examples at TRADEMARK-USAGE-EXAMPLES.md\n');
}

// Run the script
main();