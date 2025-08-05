#!/usr/bin/env node

/**
 * Unified CrewAI Management Script
 * Consolidates all CrewAI/agent-related scripts into one intelligent launcher
 *
 * Usage:
 *   npm run crews      - Start CrewAI agents in production mode
 *   npm run crews:dev  - Start CrewAI agents in development mode
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
const isDev = args.includes('--dev');
const isDemo = args.includes('--demo');
const isBackground = args.includes('--background');
const isSimple = args.includes('--simple');
const isStatus = args.includes('--status');
const isHelp = args.includes('--help') || args.includes('-h');

// Display help
if (isHelp) {
  console.log(chalk.bold.blue('\n🤖 Unified CrewAI Management Script\n'));
  console.log('Usage: npm run crews [options]\n');
  console.log('Options:');
  console.log('  --dev         Run in development mode with auto-restart');
  console.log('  --demo        Run demo mode with sample data');
  console.log('  --background  Run in background (detached)');
  console.log('  --simple      Use simplified startup');
  console.log('  --status      Check CrewAI system status');
  console.log('  --help        Show this help message\n');
  console.log('Examples:');
  console.log('  npm run crews            # Production mode');
  console.log('  npm run crews:dev        # Development mode');
  console.log('  npm run crews --demo     # Demo mode');
  console.log('  npm run crews --status   # Check status\n');
  console.log('Monitoring URLs:');
  console.log('  Status:  http://localhost:3000/api/crews/status');
  console.log('  Health:  http://localhost:3000/api/crews/health');
  console.log('  Metrics: http://localhost:3000/api/crews/metrics');
  console.log('  Gradio:  http://localhost:3000/api/gradio\n');
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

// Check CrewAI status
async function checkStatus() {
  console.log(chalk.yellow('\n📊 Checking CrewAI system status...\n'));

  const endpoints = [
    { name: 'System Status', url: 'http://localhost:3000/api/crews/status' },
    { name: 'Health Check', url: 'http://localhost:3000/api/crews/health' },
    { name: 'Metrics', url: 'http://localhost:3000/api/crews/metrics' },
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint.url);
      if (response.ok) {
        const data = await response.json();
        console.log(chalk.green(`✅ ${endpoint.name}:`), JSON.stringify(data, null, 2));
      } else {
        console.log(chalk.red(`❌ ${endpoint.name}: ${response.status} ${response.statusText}`));
      }
    } catch (error) {
      console.log(chalk.red(`❌ ${endpoint.name}: Service unavailable`));
    }
  }
}

// Main CrewAI orchestration
async function startCrews() {
  try {
    // Check status only
    if (isStatus) {
      await checkStatus();
      return;
    }

    console.log(chalk.bold.green('\n🤖 Starting CrewAI Autonomous Agent System\n'));

    // 1. Validate environment
    console.log(chalk.yellow('📋 Validating CrewAI configuration...'));

    const requiredEnvVars = ['OPENAI_API_KEY'];
    const missingVars = requiredEnvVars.filter(v => !process.env[v]);

    if (missingVars.length > 0) {
      console.error(
        chalk.red('❌ Missing required environment variables:'),
        missingVars.join(', ')
      );
      console.log(chalk.yellow('\nPlease set these in your .env.local file'));
      process.exit(1);
    }

    // 2. Determine which startup script to use
    let startupScript;
    let scriptArgs = [];

    if (isDemo) {
      console.log(chalk.blue('🎭 Starting in DEMO mode...'));
      startupScript = path.join(__dirname, 'demo-crews-working.ts');
    } else if (isSimple) {
      console.log(chalk.blue('🚀 Starting with simplified startup...'));
      startupScript = path.join(__dirname, 'simple-crew-startup.ts');
    } else {
      console.log(chalk.blue('🚀 Starting full CrewAI system...'));
      startupScript = path.join(__dirname, 'crewai-startup-system.ts');
    }

    // Add mode flags
    if (isDev) {
      scriptArgs.push('--dev');
      console.log(chalk.yellow('🔧 Development mode enabled'));
    }

    if (isBackground) {
      scriptArgs.push('--background');
      console.log(chalk.yellow('🌙 Background mode enabled'));
    }

    // 3. Check if script exists
    if (!fs.existsSync(startupScript)) {
      console.error(chalk.red(`❌ Startup script not found: ${startupScript}`));
      process.exit(1);
    }

    // 4. Display agent information
    console.log(chalk.cyan('\n📋 Available CrewAI Agents:'));
    console.log('  • Legal Consultation Agent');
    console.log('  • Document Analysis Agent');
    console.log('  • Appointment Scheduling Agent');
    console.log('  • Lead Validation Agent');
    console.log('  • Client Intake Agent');
    console.log('  • SEO Content Generation Agent');
    console.log('  • Social Media Monitoring Agent');
    console.log('  • And 15+ more specialized agents...\n');

    // 5. Start CrewAI system
    if (isDev) {
      // Development mode with auto-restart
      console.log(chalk.yellow('🔄 Starting with auto-restart (nodemon)...'));
      await runCommand('npx', [
        'nodemon',
        '--exec',
        'tsx',
        startupScript,
        ...scriptArgs,
        '--ext',
        'ts,js',
      ]);
    } else if (isBackground) {
      // Background mode
      console.log(chalk.yellow('🌙 Starting in background...'));
      const child = spawn('tsx', [startupScript, ...scriptArgs], {
        detached: true,
        stdio: 'ignore',
      });
      child.unref();
      console.log(chalk.green('✅ CrewAI started in background with PID:'), child.pid);

      // Save PID for later management
      fs.writeFileSync('.crewai.pid', child.pid.toString());
    } else {
      // Normal foreground mode
      await runCommand('tsx', [startupScript, ...scriptArgs]);
    }

    // 6. Display access information
    if (!isBackground) {
      console.log(chalk.bold.green('\n✨ CrewAI System is running!\n'));
      console.log(chalk.cyan('📊 Monitoring endpoints:'));
      console.log('  • Status:  http://localhost:3000/api/crews/status');
      console.log('  • Health:  http://localhost:3000/api/crews/health');
      console.log('  • Metrics: http://localhost:3000/api/crews/metrics');
      console.log('  • Gradio:  http://localhost:3000/api/gradio');
      console.log(chalk.gray('\n📝 Press Ctrl+C to stop\n'));
    }
  } catch (error) {
    console.error(chalk.red('\n❌ CrewAI startup failed:'), error.message);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n\n🛑 Shutting down CrewAI system...'));

  // Clean up PID file if exists
  if (fs.existsSync('.crewai.pid')) {
    fs.unlinkSync('.crewai.pid');
  }

  process.exit(0);
});

// Start CrewAI
startCrews().catch(console.error);
