#!/usr/bin/env node

/**
 * Unified Test Script
 * Consolidates all test-related scripts into one intelligent test runner
 *
 * Usage:
 *   npm run test        - Run all unit tests
 *   npm run test:watch  - Run tests in watch mode
 *   npm run test:e2e    - Run end-to-end tests
 *   npm run test:api    - Test all API endpoints
 *   npm run test:local  - Comprehensive local testing
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
// Use built-in colors instead of chalk
const chalk = {
  green: text => `\x1b[32m${text}\x1b[0m`,
  yellow: text => `\x1b[33m${text}\x1b[0m`,
  blue: text => `\x1b[34m${text}\x1b[0m`,
  red: text => `\x1b[31m${text}\x1b[0m`,
  gray: text => `\x1b[90m${text}\x1b[0m`,
  cyan: text => `\x1b[36m${text}\x1b[0m`,
  bold: {
    green: text => `\x1b[1m\x1b[32m${text}\x1b[0m`,
    yellow: text => `\x1b[1m\x1b[33m${text}\x1b[0m`,
    blue: text => `\x1b[1m\x1b[34m${text}\x1b[0m`,
    red: text => `\x1b[1m\x1b[31m${text}\x1b[0m`,
  },
};

// Parse command line arguments
const args = process.argv.slice(2);
const isWatch = args.includes('--watch');
const isE2E = args.includes('--e2e');
const isAPI = args.includes('--api');
const isLocal = args.includes('--local');
const isCoverage = args.includes('--coverage');
const isUI = args.includes('--ui');
const isHelp = args.includes('--help') || args.includes('-h');

// Display help
if (isHelp) {
  console.log(chalk.bold.blue('\n🧪 Unified Test Script\n'));
  console.log('Usage: npm run test [options]\n');
  console.log('Options:');
  console.log('  --watch      Run tests in watch mode');
  console.log('  --e2e        Run end-to-end tests');
  console.log('  --api        Test API endpoints');
  console.log('  --local      Comprehensive local testing');
  console.log('  --coverage   Generate coverage report');
  console.log('  --ui         Open test UI');
  console.log('  --help       Show this help message\n');
  console.log('Examples:');
  console.log('  npm run test             # Run all unit tests');
  console.log('  npm run test:watch       # Watch mode');
  console.log('  npm run test:e2e         # E2E tests');
  console.log('  npm run test:local       # Full local test suite\n');
  process.exit(0);
}

// Helper function to run commands
function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    console.log(chalk.gray(`$ ${command} ${args.join(' ')}`));

    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options,
    });

    child.on('close', code => {
      if (code !== 0) {
        reject(new Error(`Command failed: ${command} ${args.join(' ')}`));
      } else {
        resolve();
      }
    });

    child.on('error', reject);
  });
}

// Check if service is available
async function checkService(name, url) {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch {
    return false;
  }
}

// Main test orchestration
async function runTests() {
  console.log(chalk.bold.green('\n🧪 Starting Unified Test Suite\n'));

  try {
    // Determine which tests to run
    if (isE2E) {
      // End-to-end tests
      console.log(chalk.yellow('🌐 Running end-to-end tests...'));

      // Check if server is running
      const serverRunning = await checkService('Next.js', 'http://localhost:3000');
      if (!serverRunning) {
        console.log(chalk.yellow('🚀 Starting development server for E2E tests...'));
        const devProcess = spawn('npm', ['run', 'dev:minimal'], {
          detached: true,
          stdio: 'ignore',
        });

        // Wait for server to start
        console.log(chalk.gray('Waiting for server to start...'));
        await new Promise(resolve => setTimeout(resolve, 10000));
      }

      if (isUI) {
        await runCommand('pnpm', ['exec', 'playwright', 'test', '--ui']);
      } else {
        await runCommand('pnpm', ['exec', 'playwright', 'test']);
      }
    } else if (isAPI) {
      // API endpoint tests
      console.log(chalk.yellow('🔌 Testing API endpoints...'));

      const apiTestScript = path.join(__dirname, 'test-apis.ts');
      if (fs.existsSync(apiTestScript)) {
        await runCommand('tsx', [apiTestScript]);
      } else {
        // Fallback to running API-specific tests
        await runCommand('vitest', ['run', 'src/**/*.api.test.ts']);
      }
    } else if (isLocal) {
      // Comprehensive local testing
      console.log(chalk.yellow('🏠 Running comprehensive local tests...'));

      // 1. Unit tests
      console.log(chalk.blue('\n📦 Running unit tests...'));
      await runCommand('vitest', ['run']);

      // 2. Check environment
      console.log(chalk.blue('\n🔍 Checking environment...'));
      const checkEnvScript = path.join(__dirname, 'check-env.js');
      if (fs.existsSync(checkEnvScript)) {
        await runCommand('node', [checkEnvScript]);
      }

      // 3. Test database connection
      console.log(chalk.blue('\n🗄️  Testing database connection...'));
      const dbTestScript = path.join(__dirname, 'test-db.ts');
      if (fs.existsSync(dbTestScript)) {
        await runCommand('tsx', [dbTestScript]);
      }

      // 4. Test critical pages
      console.log(chalk.blue('\n📄 Testing critical pages...'));
      const criticalPagesScript = path.join(__dirname, 'test-critical-pages.js');
      if (fs.existsSync(criticalPagesScript)) {
        await runCommand('node', [criticalPagesScript]);
      }

      // 5. Lint check
      console.log(chalk.blue('\n🔍 Running linters...'));
      await runCommand('pnpm', ['run', 'lint']);

      // 6. Type check
      console.log(chalk.blue('\n📝 Type checking...'));
      await runCommand('pnpm', ['run', 'type-check']);
    } else {
      // Standard unit tests
      const vitestArgs = ['vitest'];

      if (isWatch) {
        console.log(chalk.yellow('👀 Running tests in watch mode...'));
        // Vitest runs in watch mode by default
      } else {
        vitestArgs.push('run');
      }

      if (isCoverage) {
        console.log(chalk.yellow('📊 Generating coverage report...'));
        vitestArgs.push('--coverage');
      }

      if (isUI) {
        console.log(chalk.yellow('🖥️  Opening test UI...'));
        vitestArgs.push('--ui');
      }

      await runCommand('pnpm', ['exec', ...vitestArgs]);
    }

    console.log(chalk.bold.green('\n✅ Tests completed successfully!\n'));
  } catch (error) {
    console.error(chalk.red('\n❌ Test suite failed:'), error.message);
    process.exit(1);
  }
}

// Run the tests
runTests().catch(console.error);
