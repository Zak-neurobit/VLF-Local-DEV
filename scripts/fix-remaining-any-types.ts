#!/usr/bin/env npx tsx

import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';

// List of files with known any types that need manual fixing
const filesToFix = [
  'src/services/case-management/index.ts',
  'src/lib/crewai/seo-domination/competitor-spy-agent.ts',
  'src/services/lead-capture/index.ts',
  'src/services/gohighlevel/index.ts',
];

// Common any patterns and their replacements
const replacements = [
  // Zod schemas
  { pattern: /z\.record\(z\.any\(\)\)/g, replacement: 'z.record(z.unknown())' },

  // Function parameters and return types
  { pattern: /:\s*any\[\]/g, replacement: ': unknown[]' },
  { pattern: /:\s*Record<string,\s*any>/g, replacement: ': Record<string, unknown>' },
  {
    pattern: /:\s*\{[^}]*:\s*any[^}]*\}/g,
    replacement: (match: string) => match.replace(/:\s*any/g, ': unknown'),
  },

  // Type assertions
  { pattern: /as\s+any(?!\w)/g, replacement: 'as unknown' },

  // Generic types
  { pattern: /Promise<any>/g, replacement: 'Promise<unknown>' },
  { pattern: /Array<any>/g, replacement: 'Array<unknown>' },

  // Object property types
  { pattern: /(\w+):\s*any(?=\s*[;,}])/g, replacement: '$1: unknown' },

  // Function return types
  { pattern: /\):\s*any(?=\s*{)/g, replacement: '): unknown' },
  { pattern: /=>\s*any(?=\s*[;,}])/g, replacement: '=> unknown' },
];

async function fixAnyTypes() {
  console.log('Starting to fix remaining any types...\n');

  let totalReplacements = 0;

  for (const filePath of filesToFix) {
    const fullPath = path.join(process.cwd(), filePath);

    try {
      let content = await fs.readFile(fullPath, 'utf-8');
      const originalContent = content;
      let fileReplacements = 0;

      // Apply all replacements
      for (const { pattern, replacement } of replacements) {
        const matches = content.match(pattern);
        if (matches) {
          if (typeof replacement === 'string') {
            content = content.replace(pattern, replacement);
          } else {
            content = content.replace(pattern, replacement);
          }
          fileReplacements += matches.length;
        }
      }

      // Special case: Fix the metadata patterns in case-management
      if (filePath.includes('case-management')) {
        // Fix the specific patterns in this file
        content = content.replace(
          /metadata:\s*caseData\.metadata\s*as\s*CaseMetadata/g,
          'metadata: caseData.metadata as CaseMetadata'
        );

        content = content.replace(/metadata\s*as\s*unknown(?=\s*as)/g, 'metadata');
      }

      if (content !== originalContent) {
        await fs.writeFile(fullPath, content, 'utf-8');
        console.log(`✅ Fixed ${fileReplacements} any types in ${filePath}`);
        totalReplacements += fileReplacements;
      } else {
        console.log(`⏭️  No any types found in ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error);
    }
  }

  // Now scan for any remaining any types
  console.log('\n🔍 Scanning for remaining any types...');

  const allFiles = await glob('src/**/*.{ts,tsx}', {
    ignore: ['**/node_modules/**', '**/*.d.ts', '**/dist/**', '**/.next/**'],
  });

  const filesWithAny: string[] = [];

  for (const file of allFiles) {
    try {
      const content = await fs.readFile(file, 'utf-8');

      // Check for any remaining 'any' types
      const anyPattern = /\bany\b/g;
      const matches = content.match(anyPattern);

      if (matches) {
        // Filter out false positives (comments, strings, etc.)
        const lines = content.split('\n');
        let realMatches = 0;

        lines.forEach((line, index) => {
          if (anyPattern.test(line)) {
            // Skip if it's in a comment or string
            const trimmed = line.trim();
            if (
              !trimmed.startsWith('//') &&
              !trimmed.startsWith('*') &&
              !trimmed.includes('console.') &&
              !trimmed.includes('"any"') &&
              !trimmed.includes("'any'") &&
              !trimmed.includes('`any`')
            ) {
              realMatches++;
            }
          }
        });

        if (realMatches > 0) {
          filesWithAny.push(file);
        }
      }
    } catch (error) {
      console.error(`Error reading ${file}:`, error);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Total replacements made: ${totalReplacements}`);
  console.log(`   Files still containing 'any': ${filesWithAny.length}`);

  if (filesWithAny.length > 0) {
    console.log('\n📝 Files that still need manual review:');
    filesWithAny.forEach(file => console.log(`   - ${file}`));
  }
}

fixAnyTypes().catch(console.error);
