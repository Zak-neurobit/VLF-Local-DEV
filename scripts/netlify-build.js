#!/usr/bin/env node

/**
 * Optimized Netlify Build Script
 * Handles large static sites efficiently with memory optimization
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for output
const chalk = {
  green: text => `\x1b[32m${text}\x1b[0m`,
  yellow: text => `\x1b[33m${text}\x1b[0m`,
  red: text => `\x1b[31m${text}\x1b[0m`,
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

async function main() {
  console.log(chalk.bold.green('\n🏗️  Netlify Optimized Build\n'));

  try {
    // 1. Clean build artifacts
    console.log(chalk.yellow('🧹 Cleaning build artifacts...'));
    const cleanPaths = ['.next', 'out', 'dist'];
    for (const cleanPath of cleanPaths) {
      if (fs.existsSync(cleanPath)) {
        fs.rmSync(cleanPath, { recursive: true, force: true });
      }
    }

    // 2. Generate Prisma client
    console.log(chalk.yellow('🗄️  Generating Prisma client...'));
    await runCommand('pnpm', ['exec', 'prisma', 'generate']);

    // 3. Build with memory optimization
    console.log(chalk.yellow('🔨 Building Next.js application...'));
    const buildEnv = {
      ...process.env,
      NODE_ENV: 'production',
      NODE_OPTIONS: '--max-old-space-size=8192',
      NEXT_TELEMETRY_DISABLED: '1',
      // Skip non-essential features for static build
      SKIP_ENV_VALIDATION: 'true',
      DISABLE_ANALYTICS: 'true',
    };

    await runCommand('pnpm', ['exec', 'next', 'build'], { env: buildEnv });

    // 4. Export static files
    console.log(chalk.yellow('📦 Exporting static files...'));
    await runCommand('pnpm', ['exec', 'next', 'export'], { env: buildEnv });

    console.log(chalk.bold.green('\n✅ Build completed successfully!\n'));
    console.log(chalk.green('📁 Static files exported to ./out'));

  } catch (error) {
    console.error(chalk.red('\n❌ Build failed:'), error.message);
    process.exit(1);
  }
}

main();