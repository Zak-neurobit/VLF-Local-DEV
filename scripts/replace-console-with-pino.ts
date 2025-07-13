#!/usr/bin/env tsx

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const PINO_IMPORT = "import { logger } from '@/lib/pino-logger';";
const PINO_IMPORT_API = "import { apiLogger } from '@/lib/pino-logger';";
const PINO_IMPORT_SECURITY = "import { securityLogger } from '@/lib/pino-logger';";
const PINO_IMPORT_PAYMENT = "import { paymentLogger } from '@/lib/pino-logger';";

interface FileUpdate {
  path: string;
  changes: number;
}

const updates: FileUpdate[] = [];

function shouldSkipFile(filePath: string): boolean {
  const skipPatterns = [
    'node_modules',
    '.next',
    'dist',
    'build',
    '.git',
    'coverage',
    'test-results',
    'playwright-report',
    'storybook-static',
    'public',
    'scripts/replace-console-with-pino.ts',
    'src/lib/pino-logger.ts',
    'src/lib/logger',
    '__tests__',
    '.test.',
    '.spec.',
    'setupTests.ts',
  ];
  
  return skipPatterns.some(pattern => filePath.includes(pattern));
}

function determineLoggerType(filePath: string, content: string): string {
  if (filePath.includes('/api/') && !filePath.includes('test')) {
    if (filePath.includes('payment') || filePath.includes('stripe') || filePath.includes('lawpay')) {
      return 'payment';
    }
    if (filePath.includes('auth') || filePath.includes('session')) {
      return 'security';
    }
    return 'api';
  }
  
  if (content.includes('security') || content.includes('auth') || content.includes('password')) {
    return 'security';
  }
  
  if (content.includes('payment') || content.includes('stripe') || content.includes('charge')) {
    return 'payment';
  }
  
  return 'general';
}

function replaceConsoleInFile(filePath: string): void {
  if (shouldSkipFile(filePath)) return;
  
  try {
    let content = readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Skip if no console usage
    if (!content.includes('console.')) return;
    
    const loggerType = determineLoggerType(filePath, content);
    let loggerName = 'logger';
    let importStatement = PINO_IMPORT;
    
    switch (loggerType) {
      case 'api':
        loggerName = 'apiLogger';
        importStatement = PINO_IMPORT_API;
        break;
      case 'security':
        loggerName = 'securityLogger';
        importStatement = PINO_IMPORT_SECURITY;
        break;
      case 'payment':
        loggerName = 'paymentLogger';
        importStatement = PINO_IMPORT_PAYMENT;
        break;
    }
    
    // Replace console methods
    const replacements = [
      { from: /console\.log\(/g, to: `${loggerName}.info(` },
      { from: /console\.error\(/g, to: `${loggerName}.error(` },
      { from: /console\.warn\(/g, to: `${loggerName}.warn(` },
      { from: /console\.debug\(/g, to: `${loggerName}.debug(` },
      { from: /console\.info\(/g, to: `${loggerName}.info(` },
    ];
    
    let changeCount = 0;
    replacements.forEach(({ from, to }) => {
      const matches = content.match(from);
      if (matches) {
        changeCount += matches.length;
        content = content.replace(from, to);
      }
    });
    
    if (changeCount > 0) {
      // Add import if not already present
      const hasImport = content.includes("from '@/lib/pino-logger'") || 
                       content.includes('from "@/lib/pino-logger"');
      
      if (!hasImport) {
        // Find the right place to add import
        const importMatch = content.match(/^import .* from ['"].*['"];?\s*$/m);
        if (importMatch) {
          const lastImportIndex = content.lastIndexOf(importMatch[0]);
          const insertIndex = lastImportIndex + importMatch[0].length;
          content = content.slice(0, insertIndex) + '\n' + importStatement + content.slice(insertIndex);
        } else {
          // No imports found, add at the beginning
          content = importStatement + '\n\n' + content;
        }
      }
      
      writeFileSync(filePath, content);
      updates.push({ path: filePath, changes: changeCount });
      console.log(`✅ Updated ${filePath} (${changeCount} changes)`);
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
      if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
        replaceConsoleInFile(fullPath);
      }
    }
  });
}

// Start processing from src directory
console.log('🔄 Starting console.log replacement with Pino logger...\n');
processDirectory('./src');

// Summary
console.log('\n📊 Summary:');
console.log(`Total files updated: ${updates.length}`);
console.log(`Total console calls replaced: ${updates.reduce((sum, u) => sum + u.changes, 0)}`);

if (updates.length > 0) {
  console.log('\n📝 Updated files:');
  updates
    .sort((a, b) => b.changes - a.changes)
    .slice(0, 20)
    .forEach(update => {
      console.log(`  - ${update.path} (${update.changes} changes)`);
    });
  
  if (updates.length > 20) {
    console.log(`  ... and ${updates.length - 20} more files`);
  }
}