#!/usr/bin/env npx tsx

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

interface Replacement {
  pattern: RegExp;
  replacement: string | ((match: string, ...args: string[]) => string);
  description: string;
}

const replacements: Replacement[] = [
  // React event handlers
  {
    pattern: /\(e:\s*any\)\s*=>/g,
    replacement: (match: string) => {
      if (match.includes('onChange') || match.includes('onInput')) {
        return '(e: React.ChangeEvent<HTMLInputElement>) =>';
      } else if (match.includes('onClick')) {
        return '(e: React.MouseEvent<HTMLButtonElement>) =>';
      } else if (match.includes('onSubmit')) {
        return '(e: React.FormEvent<HTMLFormElement>) =>';
      }
      return '(e: React.SyntheticEvent) =>';
    },
    description: 'React event handlers',
  },

  // useState<any> to unknown
  {
    pattern: /useState<any>/g,
    replacement: 'useState<unknown>',
    description: 'useState with any',
  },

  // Record<string, any> to Record<string, unknown>
  {
    pattern: /Record<(\w+),\s*any>/g,
    replacement: 'Record<$1, unknown>',
    description: 'Record with any values',
  },

  // Array<any> to unknown[]
  {
    pattern: /Array<any>/g,
    replacement: 'unknown[]',
    description: 'Array of any',
  },

  // : any[] to : unknown[]
  {
    pattern: /:\s*any\[\]/g,
    replacement: ': unknown[]',
    description: 'any array type',
  },

  // Function return any
  {
    pattern: /\):\s*any\s*{/g,
    replacement: '): unknown {',
    description: 'Function returning any',
  },

  // as any casts (need manual review)
  {
    pattern: /as\s+any/g,
    replacement: 'as unknown',
    description: 'Type assertions',
  },
];

let totalReplacements = 0;
const filesModified = new Set<string>();

function shouldSkipFile(filePath: string): boolean {
  const skipPatterns = [
    'node_modules',
    '.next',
    'dist',
    'build',
    '.git',
    '__tests__',
    '.test.',
    '.spec.',
    'setupTests.ts',
    'scripts/fix-any-types.ts',
    'pino-logger.ts',
    'logger/index.ts', // Has legitimate any for winston
  ];

  return skipPatterns.some(pattern => filePath.includes(pattern));
}

function fixAnyInFile(filePath: string): void {
  if (shouldSkipFile(filePath)) return;

  try {
    let content = readFileSync(filePath, 'utf8');
    const originalContent = content;
    let fileReplacements = 0;

    replacements.forEach(({ pattern, replacement, description }) => {
      const matches = content.match(pattern);
      if (matches) {
        const count = matches.length;
        if (typeof replacement === 'string') {
          content = content.replace(pattern, replacement);
        } else {
          content = content.replace(pattern, replacement);
        }
        fileReplacements += count;
        console.log(`  ${description}: ${count} replacements`);
      }
    });

    if (fileReplacements > 0) {
      writeFileSync(filePath, content);
      totalReplacements += fileReplacements;
      filesModified.add(filePath);
      console.log(`✅ Fixed ${filePath} (${fileReplacements} replacements)\n`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
  }
}

function processDirectory(dirPath: string): void {
  const entries = readdirSync(dirPath);

  entries.forEach(entry => {
    const fullPath = join(dirPath, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory() && !shouldSkipFile(fullPath)) {
      processDirectory(fullPath);
    } else if (stat.isFile()) {
      const ext = extname(fullPath);
      if (['.ts', '.tsx'].includes(ext)) {
        fixAnyInFile(fullPath);
      }
    }
  });
}

console.log('🔧 Fixing common any type patterns...\n');
processDirectory('./src');

console.log('\n📊 Summary:');
console.log(`Total replacements: ${totalReplacements}`);
console.log(`Files modified: ${filesModified.size}`);

if (filesModified.size > 0) {
  console.log('\n📝 Modified files:');
  Array.from(filesModified).forEach(file => {
    console.log(`  - ${file}`);
  });
}

console.log('\n⚠️  Note: Please review all changes, especially:');
console.log('- Type assertions (as unknown) may need more specific types');
console.log('- React event handlers may need adjustment based on actual elements');
console.log('- Function return types may need to be more specific than unknown');
