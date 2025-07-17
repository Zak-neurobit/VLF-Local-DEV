#!/usr/bin/env node

import { logger } from '../src/lib/logger';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import readline from 'readline';
import { exec } from 'child_process';
import { promisify } from 'util';

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

interface ServiceConfig {
  name: string;
  envVars: Array<{
    key: string;
    description: string;
    required: boolean;
    example?: string;
  }>;
  setupInstructions: string[];
  testCommand?: string;
}

const services: ServiceConfig[] = [
  {
    name: 'Office 365 Email',
    envVars: [
      {
        key: 'SMTP_HOST',
        description: 'Office 365 SMTP server',
        required: true,
        example: 'smtp.office365.com',
      },
      {
        key: 'SMTP_PORT',
        description: 'SMTP port',
        required: true,
        example: '587',
      },
      {
        key: 'SMTP_USER',
        description: 'Office 365 email address',
        required: true,
        example: 'noreply@vazquezlaw.com',
      },
      {
        key: 'SMTP_PASS',
        description: 'Office 365 app password',
        required: true,
      },
      {
        key: 'EMAIL_FROM',
        description: 'Default from email',
        required: true,
        example: 'Vazquez Law Firm <noreply@vazquezlaw.com>',
      },
    ],
    setupInstructions: [
      '1. Log in to Office 365 admin portal',
      '2. Go to Azure Active Directory > App registrations',
      '3. Create a new app registration for SMTP',
      '4. Generate an app password',
      '5. Enable SMTP authentication for the account',
      'Note: You may need to enable "Authenticated SMTP" in Exchange Online',
    ],
  },
  {
    name: 'LawPay',
    envVars: [
      {
        key: 'LAWPAY_MERCHANT_ID',
        description: 'LawPay Merchant ID',
        required: true,
      },
      {
        key: 'LAWPAY_API_KEY',
        description: 'LawPay API Key',
        required: true,
      },
      {
        key: 'LAWPAY_SECRET_KEY',
        description: 'LawPay Secret Key',
        required: true,
      },
      {
        key: 'LAWPAY_PUBLIC_KEY',
        description: 'LawPay Public Key',
        required: true,
      },
      {
        key: 'LAWPAY_WEBHOOK_SECRET',
        description: 'LawPay Webhook Secret',
        required: false,
      },
    ],
    setupInstructions: [
      '1. Log in to your LawPay account',
      '2. Navigate to Account Settings > API Keys',
      '3. Generate new API credentials',
      '4. Set up webhook endpoint: https://yourdomain.com/api/webhooks/lawpay',
      '5. Copy all required keys',
    ],
  },
  {
    name: 'Sentry Error Tracking',
    envVars: [
      {
        key: 'SENTRY_DSN',
        description: 'Sentry DSN',
        required: true,
        example: 'https://your-key@sentry.io/project-id',
      },
      {
        key: 'SENTRY_AUTH_TOKEN',
        description: 'Sentry Auth Token (for source maps)',
        required: false,
      },
      {
        key: 'SENTRY_ORG',
        description: 'Sentry Organization',
        required: false,
        example: 'vazquez-law-firm',
      },
      {
        key: 'SENTRY_PROJECT',
        description: 'Sentry Project',
        required: false,
        example: 'vlf-website',
      },
    ],
    setupInstructions: [
      '1. Sign up at https://sentry.io',
      '2. Create a new project (Next.js)',
      '3. Copy the DSN from project settings',
      '4. Optional: Generate auth token for source map uploads',
      '5. Run: npx @sentry/wizard -s -i nextjs',
    ],
  },
];

async function updateEnvFile(updates: Record<string, string>) {
  const envPath = path.join(process.cwd(), '.env.local');
  let content = await fs.readFile(envPath, 'utf-8');

  // Add or update each environment variable
  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(content)) {
      content = content.replace(regex, `${key}=${value}`);
    } else {
      content += `\n${key}=${value}`;
    }
  }

  await fs.writeFile(envPath, content);
  logger.info('Updated .env.local file');
}

async function setupService(service: ServiceConfig) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📦 Setting up ${service.name}`);
  console.log('='.repeat(60));

  console.log('\n📋 Setup Instructions:');
  service.setupInstructions.forEach(instruction => {
    console.log(`   ${instruction}`);
  });

  const proceed = await question('\nDo you have the required credentials? (y/n): ');
  if (proceed.toLowerCase() !== 'y') {
    console.log('⏭️  Skipping this service...');
    return false;
  }

  const updates: Record<string, string> = {};

  console.log('\n🔑 Enter credentials:');
  for (const envVar of service.envVars) {
    const currentValue = process.env[envVar.key];
    const prompt = `${envVar.key}${envVar.example ? ` (e.g., ${envVar.example})` : ''}${currentValue ? ' [Already set, press Enter to keep]' : ''}: `;

    const value = await question(prompt);
    if (value || !currentValue) {
      updates[envVar.key] = value || '';
    }
  }

  if (Object.keys(updates).length > 0) {
    await updateEnvFile(updates);
    console.log('✅ Configuration saved!');
  }

  return true;
}

async function testOffice365() {
  console.log('\n🧪 Testing Office 365 email configuration...');

  // Create a test email script
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
  tls: {
    ciphers: 'SSLv3'
  }
});

async function test() {
  try {
    await transporter.verify();
    console.log('✅ Office 365 SMTP connection successful!');
    
    // Optional: Send test email
    const testEmail = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.SMTP_USER,
      subject: 'VLF Website - Email Test',
      text: 'This is a test email from the Vazquez Law Firm website setup.',
      html: '<p>This is a test email from the <strong>Vazquez Law Firm</strong> website setup.</p>'
    });
    
    console.log('✅ Test email sent successfully!');
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
  }
}

test();
`;

  await fs.writeFile('test-email-temp.ts', testScript);

  try {
    await execAsync('npx tsx test-email-temp.ts');
  } catch (error) {
    console.error('Email test failed:', error);
  } finally {
    await fs.unlink('test-email-temp.ts');
  }
}

async function createSentryConfig() {
  console.log('\n🔧 Creating Sentry configuration files...');

  const clientConfig = `import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
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

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
});
`;

  const edgeConfig = serverConfig;

  await fs.writeFile('sentry.client.config.ts', clientConfig);
  await fs.writeFile('sentry.server.config.ts', serverConfig);
  await fs.writeFile('sentry.edge.config.ts', edgeConfig);

  console.log('✅ Sentry configuration files created!');
}

async function runSetup() {
  console.log('🚀 Vazquez Law Firm - Launch Services Setup');
  console.log('==========================================\n');

  console.log('This script will help you configure:');
  console.log('1. Office 365 Email (SMTP)');
  console.log('2. LawPay Payment Processing');
  console.log('3. Sentry Error Tracking\n');

  const start = await question('Ready to begin? (y/n): ');
  if (start.toLowerCase() !== 'y') {
    console.log('Setup cancelled.');
    process.exit(0);
  }

  // Setup each service
  for (const service of services) {
    const configured = await setupService(service);

    if (configured) {
      if (service.name === 'Office 365 Email') {
        await testOffice365();
      } else if (service.name === 'Sentry Error Tracking') {
        await createSentryConfig();
      }
    }
  }

  // Update mock flags
  console.log('\n🔄 Updating configuration flags...');
  const updates: Record<string, string> = {};

  if (process.env.SMTP_HOST) {
    updates.MOCK_EMAIL = 'false';
    console.log('✅ Disabled email mocking');
  }

  if (Object.keys(updates).length > 0) {
    await updateEnvFile(updates);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ SETUP COMPLETE!');
  console.log('='.repeat(60));

  console.log('\n📋 Next Steps:');
  console.log('1. Review the updated .env.local file');
  console.log('2. Test all services with: npm run test:apis');
  console.log('3. Start the development server: npm run dev');
  console.log('4. Run endpoint tests: npx tsx scripts/test-critical-endpoints.ts');
  console.log('5. Test payment flow manually through the UI');

  console.log('\n🚀 Ready for launch once all tests pass!');

  rl.close();
}

// Run the setup
runSetup().catch(error => {
  console.error('Setup error:', error);
  process.exit(1);
});
