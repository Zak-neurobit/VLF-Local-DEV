#!/usr/bin/env node
/**
 * Script to fix all TypeScript 'any' type warnings
 * This script will help identify and suggest fixes for all 'any' types in the codebase
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

interface AnyTypeLocation {
  file: string;
  line: number;
  column: number;
  context: string;
  suggestion: string;
}

const ignoreDirs = ['node_modules', '.next', 'dist', 'build', '.git', 'coverage'];
const extensions = ['.ts', '.tsx'];

function findAnyTypes(filePath: string): AnyTypeLocation[] {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const locations: AnyTypeLocation[] = [];

  lines.forEach((line, index) => {
    // Match various patterns of 'any' usage
    const patterns = [
      /:\s*any(?:\s|$|[,;\)\]\}])/g, // : any
      /<any>/g, // <any>
      /as\s+any/g, // as any
      /Array<any>/g, // Array<any>
      /Promise<any>/g, // Promise<any>
      /\(.*?:\s*any.*?\)/g, // function params with any
    ];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(line)) !== null) {
        const context = line.trim();
        const suggestion = getSuggestion(context, filePath);

        locations.push({
          file: filePath,
          line: index + 1,
          column: match.index + 1,
          context,
          suggestion,
        });
      }
    });
  });

  return locations;
}

function getSuggestion(context: string, filePath: string): string {
  // Common patterns and their suggested fixes
  if (context.includes('event:'))
    return 'Use proper event type like React.MouseEvent or React.ChangeEvent';
  if (context.includes('error:')) return 'Use Error or unknown type';
  if (context.includes('data:')) return 'Define a proper interface for the data structure';
  if (context.includes('response:')) return 'Define response type based on API';
  if (context.includes('item:')) return 'Define item interface based on usage';
  if (context.includes('params:')) return 'Use proper params type or Record<string, string>';
  if (context.includes('setState')) return 'Use proper state type in useState<Type>';
  if (context.includes('.map(')) return 'Define array item type';
  if (context.includes('async') || context.includes('await'))
    return 'Use Promise<Type> with proper return type';

  return 'Consider using unknown, object, or a specific interface';
}

function scanDirectory(dir: string): AnyTypeLocation[] {
  const results: AnyTypeLocation[] = [];

  try {
    const files = readdirSync(dir);

    for (const file of files) {
      const fullPath = join(dir, file);
      const stat = statSync(fullPath);

      if (stat.isDirectory() && !ignoreDirs.includes(file)) {
        results.push(...scanDirectory(fullPath));
      } else if (stat.isFile() && extensions.includes(extname(file))) {
        const locations = findAnyTypes(fullPath);
        results.push(...locations);
      }
    }
  } catch (error) {
    console.error(`Error scanning ${dir}:`, error);
  }

  return results;
}

function generateReport(locations: AnyTypeLocation[]): void {
  console.log(`\\n🔍 Found ${locations.length} 'any' type warnings\\n`);

  // Group by file
  const byFile = locations.reduce(
    (acc, loc) => {
      if (!acc[loc.file]) acc[loc.file] = [];
      acc[loc.file].push(loc);
      return acc;
    },
    {} as Record<string, AnyTypeLocation[]>
  );

  // Sort files by number of warnings
  const sortedFiles = Object.entries(byFile)
    .sort(([, a], [, b]) => b.length - a.length)
    .slice(0, 10); // Top 10 files

  console.log('📊 Top 10 files with most warnings:\\n');
  sortedFiles.forEach(([file, locs]) => {
    console.log(`📄 ${file.replace(process.cwd(), '.')} (${locs.length} warnings)`);
    locs.slice(0, 3).forEach(loc => {
      console.log(`   Line ${loc.line}: ${loc.context.substring(0, 60)}...`);
      console.log(`   💡 ${loc.suggestion}\\n`);
    });
  });

  // Summary
  console.log('\\n📈 Summary by suggestion type:\\n');
  const suggestions = locations.reduce(
    (acc, loc) => {
      acc[loc.suggestion] = (acc[loc.suggestion] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  Object.entries(suggestions)
    .sort(([, a], [, b]) => b - a)
    .forEach(([suggestion, count]) => {
      console.log(`   ${count}x - ${suggestion}`);
    });
}

// Priority files to fix first (based on the ESLint output)
const priorityFiles = [
  'src/agents/enhanced-legal-blogger.ts',
  'src/app/admin/ab-testing/page.tsx',
  'src/app/admin/analytics/page.tsx',
  'src/app/admin/gmb/page.tsx',
  'src/app/admin/reputation/page.tsx',
  'src/app/admin/security/page.tsx',
  'src/app/admin/syndication/page.tsx',
];

function main() {
  console.log('🔧 Analyzing TypeScript files for any types...\\n');

  // First scan priority files
  console.log('📌 Scanning priority files first...\\n');
  const priorityLocations: AnyTypeLocation[] = [];

  priorityFiles.forEach(file => {
    const fullPath = join(process.cwd(), file);
    try {
      const locations = findAnyTypes(fullPath);
      priorityLocations.push(...locations);
      if (locations.length > 0) {
        console.log(`✓ ${file}: ${locations.length} warnings found`);
      }
    } catch (error) {
      // File might not exist
    }
  });

  // Then scan entire src directory
  console.log('\\n📂 Scanning entire src directory...\\n');
  const allLocations = scanDirectory(join(process.cwd(), 'src'));

  generateReport(allLocations);

  console.log(`\\n✅ Analysis complete! Total warnings: ${allLocations.length}`);
  console.log('\\n🎯 Next steps:');
  console.log('1. Start with the priority files listed above');
  console.log('2. Use the suggestions to replace any types');
  console.log('3. Run npm run lint after each fix to verify');
  console.log('4. Consider using "unknown" instead of "any" when type is truly unknown');
  console.log('5. Create proper interfaces for complex data structures\\n');
}

main();
