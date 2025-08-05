#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

console.log(chalk.bold.green('🚀 Vasquez Law Firm - Local Test Environment'));
console.log(chalk.gray('='.repeat(60)));

// Check for .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error(chalk.red('❌ .env.local not found!'));
  console.log(chalk.yellow('Creating .env.local from .env.example...'));

  const examplePath = path.join(process.cwd(), '.env.example');
  if (fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, envPath);
    console.log(chalk.green('✅ .env.local created. Please update with your actual values.'));
  } else {
    console.error(chalk.red('❌ .env.example not found either!'));
    process.exit(1);
  }
}

// Load environment variables
require('dotenv').config({ path: envPath });

// Check critical environment variables
const requiredVars = ['DATABASE_URL', 'NEXTAUTH_SECRET', 'NEXTAUTH_URL'];

const missingVars = requiredVars.filter(v => !process.env[v]);
if (missingVars.length > 0) {
  console.error(chalk.red(`❌ Missing required environment variables:`));
  missingVars.forEach(v => console.error(chalk.red(`   - ${v}`)));
  console.log(chalk.yellow('\nPlease update your .env.local file'));
  process.exit(1);
}

// Set test environment defaults
process.env.NODE_ENV = 'development';
process.env.USE_MOCKS = 'true';
process.env.MOCK_REDIS = 'true';
process.env.ENABLE_ALL_FEATURES = 'true';

console.log(chalk.blue('\n📋 Configuration:'));
console.log(
  chalk.gray(
    `   Database: ${process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || 'configured'}`
  )
);
console.log(chalk.gray(`   Mock Services: ${process.env.USE_MOCKS}`));
console.log(chalk.gray(`   Redis: In-memory (MockRedis)`));
console.log(chalk.gray(`   Features: All enabled`));

// Start the test suite
console.log(chalk.blue('\n🧪 Starting comprehensive test suite...'));

const testProcess = spawn('node', ['scripts/local-test-suite.js'], {
  stdio: 'inherit',
  env: process.env,
});

testProcess.on('error', err => {
  console.error(chalk.red(`\n❌ Failed to start test suite: ${err.message}`));
  process.exit(1);
});

testProcess.on('exit', code => {
  if (code === 0) {
    console.log(chalk.green('\n✅ All tests passed!'));
    console.log(chalk.blue('\n📊 Summary:'));
    console.log(chalk.gray('   - No 404 errors'));
    console.log(chalk.gray('   - No 500 errors'));
    console.log(chalk.gray('   - All APIs responding'));
    console.log(chalk.gray('   - Performance within limits'));

    console.log(chalk.green('\n🎉 Your local environment is ready for development!'));
    console.log(chalk.blue('\nNext steps:'));
    console.log(chalk.gray('   1. Run "npm run dev" to start development'));
    console.log(chalk.gray('   2. Run "npm run crews:start" to start AI agents'));
    console.log(chalk.gray('   3. Run "npm run news:monitor" to start news monitoring'));
  } else {
    console.error(chalk.red(`\n❌ Tests failed with code ${code}`));
    console.log(chalk.yellow('\nPlease check the test-results.log for details'));
  }
});
