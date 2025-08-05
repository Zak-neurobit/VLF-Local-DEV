#!/usr/bin/env node

/**
 * Memory-Optimized Netlify Build Script
 * Handles large static sites within Netlify's memory constraints
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for output
const chalk = {
  green: text => `\x1b[32m${text}\x1b[0m`,
  yellow: text => `\x1b[33m${text}\x1b[0m`,
  red: text => `\x1b[31m${text}\x1b[0m`,
  blue: text => `\x1b[34m${text}\x1b[0m`,
  bold: { green: text => `\x1b[1m\x1b[32m${text}\x1b[0m` }
};

async function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`$ ${command} ${args.join(' ')}`);
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, ...options.env },
      ...options
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed: ${command} ${args.join(' ')}`));
      }
    });
  });
}

function reportMemoryUsage() {
  const used = process.memoryUsage();
  console.log(chalk.blue(`Memory Usage:`));
  for (let key in used) {
    console.log(`  ${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
}

async function main() {
  console.log(chalk.bold.green('\n🚀 Memory-Optimized Netlify Build\n'));
  reportMemoryUsage();

  try {
    // 1. Clean build artifacts
    console.log(chalk.yellow('🧹 Cleaning build artifacts...'));
    const cleanPaths = ['.next', 'out', 'dist'];
    for (const cleanPath of cleanPaths) {
      if (fs.existsSync(cleanPath)) {
        fs.rmSync(cleanPath, { recursive: true, force: true });
      }
    }

    // 2. Generate Prisma client (lightweight)
    console.log(chalk.yellow('🗄️  Generating Prisma client...'));
    await runCommand('pnpm', ['exec', 'prisma', 'generate']);

    // 3. Build with aggressive memory constraints
    console.log(chalk.yellow('🔨 Building Next.js with memory optimization...'));
    const buildEnv = {
      ...process.env,
      NODE_ENV: 'production',
      // Aggressive memory constraints for Netlify
      NODE_OPTIONS: '--max-old-space-size=1024 --max-semi-space-size=64',
      NEXT_TELEMETRY_DISABLED: '1',
      // Skip heavy features during build
      SKIP_ENV_VALIDATION: 'true',
      DISABLE_ANALYTICS: 'true',
      DISABLE_SENTRY: 'true',
      // Limit concurrent operations
      UV_THREADPOOL_SIZE: '2',
    };

    // Build without export first - let's see if we can complete the build step
    console.log(chalk.yellow('📦 Phase 1: Next.js build only...'));
    await runCommand('pnpm', ['exec', 'next', 'build'], { env: buildEnv });
    
    reportMemoryUsage();
    
    // Only export if build succeeds
    console.log(chalk.yellow('📦 Phase 2: Static export...'));
    await runCommand('pnpm', ['exec', 'next', 'export'], { env: buildEnv });

    console.log(chalk.bold.green('\n✅ Build completed successfully!\n'));
    console.log(chalk.green('📁 Static files exported to ./out'));
    reportMemoryUsage();

  } catch (error) {
    console.error(chalk.red('\n❌ Build failed:'), error.message);
    reportMemoryUsage();
    process.exit(1);
  }
}

// Handle memory warnings
process.on('warning', (warning) => {
  if (warning.name === 'MaxListenersExceededWarning') {
    console.log(chalk.yellow('⚠️  Memory pressure detected, continuing...'));
  }
});

main();