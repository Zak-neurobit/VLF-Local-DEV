#!/usr/bin/env node

/**
 * Unified Development Script
 * Consolidates all development-related scripts into one intelligent launcher
 *
 * Usage:
 *   npm run dev           - Full development environment with all services
 *   npm run dev:minimal   - Next.js only (no socket server)
 *   npm run dev:mock      - Development with mocked external services
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
const isMinimal = args.includes('--minimal');
const isMock = args.includes('--mock');
const isCrews = args.includes('--crews');
const isHelp = args.includes('--help') || args.includes('-h');

// Display help
if (isHelp) {
  console.log(chalk.bold.blue('\n📚 Unified Development Script\n'));
  console.log('Usage: npm run dev [options]\n');
  console.log('Options:');
  console.log('  --minimal    Start Next.js only (no additional services)');
  console.log('  --mock       Use mocked external services');
  console.log('  --crews      Include CrewAI agents in development mode');
  console.log('  --help       Show this help message\n');
  console.log('Examples:');
  console.log('  npm run dev              # Full development environment');
  console.log('  npm run dev:minimal      # Next.js only');
  console.log('  npm run dev:mock         # With mocked services\n');
  process.exit(0);
}

// Environment setup
process.env.NODE_ENV = 'development';
if (isMock) {
  process.env.MOCK_SERVICES = 'true';
  process.env.MOCK_EMAIL = 'true';
  process.env.MOCK_SMS = 'true';
  process.env.MOCK_REDIS = 'true';
}

// Helper function to run commands
function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
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

// Main development orchestration
async function startDevelopment() {
  console.log(chalk.bold.green('\n🚀 Starting Unified Development Environment\n'));

  try {
    // 1. Validate environment
    console.log(chalk.yellow('📋 Validating environment...'));
    const validateEnvPath = path.join(__dirname, 'validate-env.js');
    if (fs.existsSync(validateEnvPath)) {
      await runCommand('node', [`"${validateEnvPath}"`]);
    }

    // 2. Generate Prisma client
    console.log(chalk.yellow('🗄️  Generating Prisma client...'));
    await runCommand('pnpm', ['exec', 'prisma', 'generate']);

    // 3. Setup Partytown (for analytics)
    console.log(chalk.yellow('🎉 Setting up Partytown...'));
    const partytownPath = path.join(__dirname, 'setup-partytown.js');
    if (fs.existsSync(partytownPath)) {
      await runCommand('node', [`"${partytownPath}"`]);
    }

    // 4. Start services based on mode
    const services = [];

    if (isMinimal) {
      console.log(chalk.blue('\n🔧 Starting minimal development (Next.js only)...\n'));
      services.push(runCommand('next', ['dev']));
    } else {
      console.log(chalk.blue('\n🔧 Starting full development environment...\n'));

      // Check if we need to build socket server
      const socketServerPath = path.join(__dirname, '../dist/lib/socket/server.js');
      if (!fs.existsSync(socketServerPath)) {
        console.log(chalk.yellow('🔨 Building socket server...'));
        await runCommand('pnpm', ['run', 'build:socket']);
      }

      // Use the existing dev-server.js which handles both Next.js and Socket.io
      const devServerPath = path.join(__dirname, 'dev-server.js');
      if (fs.existsSync(devServerPath)) {
        services.push(runCommand('node', [`"${devServerPath}"`]));
      } else {
        // Fallback to running Next.js directly
        services.push(runCommand('next', ['dev']));
      }
    }

    // 5. Optionally start CrewAI agents
    if (isCrews) {
      console.log(chalk.yellow('🤖 Starting CrewAI agents in development mode...'));
      const crewStartPath = path.join(__dirname, 'simple-crew-startup.ts');
      if (fs.existsSync(crewStartPath)) {
        services.push(runCommand('tsx', [`"${crewStartPath}"`, '--dev']));
      }
    }

    // 6. Display helpful information
    console.log(chalk.bold.green('\n✨ Development environment is starting!\n'));
    console.log(chalk.cyan('🌐 Next.js:'), chalk.white('http://localhost:3000'));

    if (!isMinimal) {
      console.log(chalk.cyan('🔌 Socket.io:'), chalk.white('http://localhost:3001'));
    }

    if (isCrews) {
      console.log(
        chalk.cyan('🤖 CrewAI Status:'),
        chalk.white('http://localhost:3000/api/crews/status')
      );
      console.log(chalk.cyan('📊 Gradio UI:'), chalk.white('http://localhost:3000/api/gradio'));
    }

    if (isMock) {
      console.log(chalk.yellow('\n⚠️  Running with mocked services'));
    }

    console.log(chalk.gray('\n📝 Press Ctrl+C to stop all services\n'));

    // Wait for all services
    await Promise.all(services);
  } catch (error) {
    console.error(chalk.red('\n❌ Development startup failed:'), error.message);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n\n🛑 Shutting down development environment...'));
  process.exit(0);
});

// Start the development environment
startDevelopment().catch(console.error);
