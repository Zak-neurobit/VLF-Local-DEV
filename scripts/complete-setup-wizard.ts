#!/usr/bin/env node

import { logger } from '../src/lib/logger';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import readline from 'readline';
import { exec } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';

const execAsync = promisify(exec);

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (prompt: string): Promise<string> => {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
};

interface SetupStep {
  title: string;
  check: () => boolean;
  setup: () => Promise<boolean>;
  test?: () => Promise<boolean>;
}

async function updateEnvFile(updates: Record<string, string>) {
  const envPath = path.join(process.cwd(), '.env.local');
  let content = await fs.readFile(envPath, 'utf-8');

  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(content)) {
      content = content.replace(regex, `${key}=${value}`);
    } else {
      content += `\n${key}=${value}`;
    }
  }

  await fs.writeFile(envPath, content);
}

// Setup functions for each service
async function setupOffice365(): Promise<boolean> {
  console.log(chalk.yellow('\n📧 Office 365 Email Setup'));
  console.log(chalk.dim('Configure SMTP settings for sending emails\n'));

  console.log('Steps to get Office 365 SMTP credentials:');
  console.log('1. Log in to Microsoft 365 admin center');
  console.log('2. Go to Users > Active users');
  console.log('3. Select the user account for sending emails');
  console.log('4. Under Mail tab, click "Manage email apps"');
  console.log('5. Enable "Authenticated SMTP"');
  console.log('6. Generate an app password if using MFA\n');

  const proceed = await question('Do you have these credentials ready? (y/n): ');
  if (proceed.toLowerCase() !== 'y') return false;

  const updates: Record<string, string> = {};

  // Get SMTP settings
  updates.SMTP_HOST =
    (await question('SMTP Host (press Enter for smtp.office365.com): ')) || 'smtp.office365.com';
  updates.SMTP_PORT = (await question('SMTP Port (press Enter for 587): ')) || '587';
  updates.SMTP_USER = await question('Email address (e.g., noreply@vazquezlaw.com): ');
  updates.SMTP_PASS = await question('Password or App Password: ');
  updates.EMAIL_FROM =
    (await question(
      `From address (press Enter for "Vazquez Law Firm <${updates.SMTP_USER}>"): `
    )) || `Vazquez Law Firm <${updates.SMTP_USER}>`;
  updates.MOCK_EMAIL = 'false';

  await updateEnvFile(updates);
  console.log(chalk.green('✅ Office 365 email configured!'));

  return true;
}

async function setupLawPay(): Promise<boolean> {
  console.log(chalk.yellow('\n💳 LawPay Payment Processing Setup'));
  console.log(chalk.dim('Configure LawPay for secure legal payments\n'));

  console.log('Steps to get LawPay API credentials:');
  console.log('1. Log in to your LawPay account');
  console.log('2. Go to Account Settings > Developers > API Keys');
  console.log('3. Create a new API key set');
  console.log('4. Copy all credentials');
  console.log('5. Set up webhooks (optional but recommended)\n');

  const proceed = await question('Do you have LawPay credentials ready? (y/n): ');
  if (proceed.toLowerCase() !== 'y') return false;

  const updates: Record<string, string> = {};

  updates.LAWPAY_MERCHANT_ID = await question('LawPay Merchant ID: ');
  updates.LAWPAY_API_KEY = await question('LawPay API Key: ');
  updates.LAWPAY_SECRET_KEY = await question('LawPay Secret Key: ');
  updates.LAWPAY_PUBLIC_KEY = await question('LawPay Public Key: ');

  const webhookSecret = await question('LawPay Webhook Secret (optional, press Enter to skip): ');
  if (webhookSecret) {
    updates.LAWPAY_WEBHOOK_SECRET = webhookSecret;
  }

  await updateEnvFile(updates);
  console.log(chalk.green('✅ LawPay payment processing configured!'));

  return true;
}

async function setupSentry(): Promise<boolean> {
  console.log(chalk.yellow('\n🐛 Sentry Error Tracking Setup'));
  console.log(chalk.dim('Configure Sentry for production error monitoring\n'));

  console.log('Steps to set up Sentry:');
  console.log('1. Sign up at https://sentry.io (free tier available)');
  console.log('2. Create a new project (select Next.js)');
  console.log('3. Copy the DSN from project settings');
  console.log('4. Optional: Create auth token for source maps\n');

  const proceed = await question('Do you have a Sentry account ready? (y/n): ');
  if (proceed.toLowerCase() !== 'y') return false;

  const updates: Record<string, string> = {};

  updates.SENTRY_DSN = await question('Sentry DSN: ');
  updates.NEXT_PUBLIC_SENTRY_DSN = updates.SENTRY_DSN; // For client-side

  const authToken = await question('Sentry Auth Token (optional, for source maps): ');
  if (authToken) {
    updates.SENTRY_AUTH_TOKEN = authToken;
    updates.SENTRY_ORG = await question('Sentry Organization slug: ');
    updates.SENTRY_PROJECT = await question('Sentry Project name: ');
  }

  await updateEnvFile(updates);

  // Create Sentry config files
  console.log(chalk.cyan('\nCreating Sentry configuration files...'));

  const clientConfig = `import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: '${updates.SENTRY_DSN}',
  tracesSampleRate: 1.0,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
`;

  const serverConfig = `import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: '${updates.SENTRY_DSN}',
  tracesSampleRate: 1.0,
  debug: false,
});
`;

  await fs.writeFile('sentry.client.config.ts', clientConfig);
  await fs.writeFile('sentry.server.config.ts', serverConfig);
  await fs.writeFile('sentry.edge.config.ts', serverConfig);

  console.log(chalk.green('✅ Sentry error tracking configured!'));

  return true;
}

async function setupRedis(): Promise<boolean> {
  console.log(chalk.yellow('\n🗄️ Redis Cache Setup'));
  console.log(chalk.dim('Configure Redis for improved performance\n'));

  console.log('Redis options:');
  console.log('1. Local Redis (recommended for development)');
  console.log('2. Redis Cloud (free tier available)');
  console.log('3. Continue with mock Redis\n');

  const choice = await question('Choose an option (1/2/3): ');

  if (choice === '3') {
    console.log(chalk.yellow('Continuing with mock Redis...'));
    return false;
  }

  const updates: Record<string, string> = {};

  if (choice === '1') {
    console.log('\nTo install Redis locally:');
    console.log('macOS: brew install redis && brew services start redis');
    console.log('Ubuntu: sudo apt-get install redis-server\n');

    const installed = await question('Is Redis installed and running? (y/n): ');
    if (installed.toLowerCase() === 'y') {
      updates.REDIS_URL = 'redis://localhost:6379';
      updates.MOCK_REDIS = 'false';
    } else {
      return false;
    }
  } else if (choice === '2') {
    console.log('\nSign up for Redis Cloud at https://redis.com/try-free/');
    const redisUrl = await question('Enter your Redis Cloud URL: ');
    if (redisUrl) {
      updates.REDIS_URL = redisUrl;
      updates.MOCK_REDIS = 'false';
    } else {
      return false;
    }
  }

  await updateEnvFile(updates);
  console.log(chalk.green('✅ Redis configured!'));

  return true;
}

async function setupGoogleCredentials(): Promise<boolean> {
  console.log(chalk.yellow('\n🔐 Google Cloud Credentials Setup'));
  console.log(chalk.dim('Configure Google credentials for CrewAI agents\n'));

  console.log('Steps to set up Google Cloud credentials:');
  console.log('1. Go to https://console.cloud.google.com');
  console.log('2. Create a new project or select existing');
  console.log('3. Enable required APIs:');
  console.log('   - Google My Business API');
  console.log('   - Google Search Console API');
  console.log('   - Any other APIs your agents need');
  console.log('4. Create a service account');
  console.log('5. Download the JSON key file\n');

  const proceed = await question('Do you have the service account JSON file? (y/n): ');
  if (proceed.toLowerCase() !== 'y') return false;

  const jsonPath = await question('Path to service account JSON file: ');

  try {
    const jsonContent = await fs.readFile(jsonPath, 'utf-8');
    const parsed = JSON.parse(jsonContent);

    // Save to credentials directory
    const credsDir = path.join(process.cwd(), 'credentials');
    await fs.mkdir(credsDir, { recursive: true });
    await fs.writeFile(path.join(credsDir, 'google-service-account.json'), jsonContent);

    const updates: Record<string, string> = {
      GOOGLE_APPLICATION_CREDENTIALS: './credentials/google-service-account.json',
      GOOGLE_CLOUD_PROJECT: parsed.project_id,
    };

    await updateEnvFile(updates);
    console.log(chalk.green('✅ Google credentials configured!'));

    return true;
  } catch (error) {
    console.log(chalk.red('❌ Failed to read or parse JSON file'));
    return false;
  }
}

// Test functions
async function testEmail(): Promise<boolean> {
  console.log(chalk.cyan('\n🧪 Testing email configuration...'));

  const testScript = `
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { ciphers: 'SSLv3' }
});

async function test() {
  try {
    await transporter.verify();
    console.log('✅ Email connection verified!');
    return true;
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    return false;
  }
}

test();
`;

  await fs.writeFile('test-email-temp.ts', testScript);

  try {
    const { stdout } = await execAsync('npx tsx test-email-temp.ts');
    console.log(stdout);
    return stdout.includes('✅');
  } catch (error) {
    return false;
  } finally {
    await fs.unlink('test-email-temp.ts').catch(() => {});
  }
}

async function testAllServices(): Promise<void> {
  console.log(chalk.cyan('\n🧪 Running comprehensive service tests...\n'));

  try {
    const { stdout } = await execAsync('npm run test:apis');
    console.log(stdout);
  } catch (error) {
    console.log(chalk.red('Some tests failed - check the output above'));
  }
}

// Main setup wizard
async function runSetupWizard() {
  console.clear();
  console.log(chalk.bold.blue('🚀 Vazquez Law Firm - Complete Setup Wizard'));
  console.log(chalk.blue('='.repeat(50)));
  console.log(chalk.dim('This wizard will help you configure all services\n'));

  const steps: SetupStep[] = [
    {
      title: 'Office 365 Email',
      check: () => !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
      setup: setupOffice365,
      test: testEmail,
    },
    {
      title: 'LawPay Payment Processing',
      check: () => !!(process.env.LAWPAY_MERCHANT_ID && process.env.LAWPAY_API_KEY),
      setup: setupLawPay,
    },
    {
      title: 'Sentry Error Tracking',
      check: () => !!process.env.SENTRY_DSN,
      setup: setupSentry,
    },
    {
      title: 'Redis Cache',
      check: () => process.env.MOCK_REDIS === 'false',
      setup: setupRedis,
    },
    {
      title: 'Google Cloud Credentials',
      check: () => !!process.env.GOOGLE_APPLICATION_CREDENTIALS,
      setup: setupGoogleCredentials,
    },
  ];

  console.log(chalk.bold('\n📋 Current Status:'));
  steps.forEach(step => {
    const status = step.check() ? chalk.green('✅ Configured') : chalk.yellow('⚠️  Not configured');
    console.log(`${status} - ${step.title}`);
  });

  console.log('\n' + chalk.dim('The wizard will guide you through each unconfigured service.'));
  const start = await question('\nReady to begin? (y/n): ');

  if (start.toLowerCase() !== 'y') {
    console.log('Setup cancelled.');
    process.exit(0);
  }

  // Process each step
  for (const step of steps) {
    if (!step.check()) {
      console.log('\n' + chalk.blue('='.repeat(50)));
      const configured = await step.setup();

      if (configured && step.test) {
        const testPassed = await step.test();
        if (!testPassed) {
          console.log(chalk.yellow('⚠️  Service configured but test failed - check credentials'));
        }
      }
    }
  }

  // Final summary
  console.log('\n' + chalk.blue('='.repeat(50)));
  console.log(chalk.bold.green('✅ Setup Complete!\n'));

  console.log(chalk.bold('📊 Final Status:'));
  steps.forEach(step => {
    const status = step.check() ? chalk.green('✅ Configured') : chalk.yellow('⚠️  Skipped');
    console.log(`${status} - ${step.title}`);
  });

  // Run comprehensive tests
  const runTests = await question('\nRun comprehensive service tests? (y/n): ');
  if (runTests.toLowerCase() === 'y') {
    await testAllServices();
  }

  console.log(chalk.bold.cyan('\n🎯 Next Steps:'));
  console.log('1. Review your .env.local file');
  console.log('2. Run: npm run build');
  console.log('3. Run: npm run dev');
  console.log('4. Test all features manually');
  console.log('5. Deploy to production!');

  console.log(chalk.bold.green('\n🚀 Your site is ready for launch!'));

  rl.close();
}

// Error handling
process.on('unhandledRejection', error => {
  console.error(chalk.red('\n❌ Setup error:'), error);
  process.exit(1);
});

// Run the wizard
runSetupWizard().catch(error => {
  console.error(chalk.red('Setup wizard error:'), error);
  process.exit(1);
});
