#!/usr/bin/env node
/**
 * Interactive environment variable setup script
 * Helps users configure their .env.local file with required values
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { execSync } from 'child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> => {
  return new Promise(resolve => {
    rl.question(query, resolve);
  });
};

async function setupEnvironment() {
  console.log('\n🚀 Vasquez Law Firm - Environment Setup\n');
  console.log('This script will help you set up your environment variables.\n');

  const envPath = path.join(process.cwd(), '.env.local');
  const envExamplePath = path.join(process.cwd(), '.env.example');

  // Check if .env.local already exists
  if (fs.existsSync(envPath)) {
    const overwrite = await question('.env.local already exists. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Setup cancelled.');
      process.exit(0);
    }
  }

  // Copy .env.example to .env.local
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Copied .env.example to .env.local\n');
  }

  const envVars: Record<string, string> = {};

  // Core configuration
  console.log('📋 Core Configuration\n');

  const environment = await question('Environment (development/production) [development]: ');
  envVars.NODE_ENV = environment || 'development';

  const appUrl = await question('Application URL [http://localhost:3000]: ');
  envVars.NEXT_PUBLIC_APP_URL = appUrl || 'http://localhost:3000';
  envVars.NEXTAUTH_URL = envVars.NEXT_PUBLIC_APP_URL;

  // Database
  console.log('\n💾 Database Configuration\n');
  console.log('Options:');
  console.log('1. Local PostgreSQL (docker-compose up -d)');
  console.log('2. Vercel Postgres');
  console.log('3. Neon.tech');
  console.log('4. Custom PostgreSQL URL');

  const dbChoice = await question('Choose database option (1-4) [1]: ');

  switch (dbChoice || '1') {
    case '1':
      envVars.DATABASE_URL = 'postgresql://postgres:password@localhost:5432/vasquez_law';
      console.log('📌 Remember to run: docker-compose up -d');
      break;
    case '2':
      console.log('📌 Get your connection string from: https://vercel.com/dashboard/stores');
      const vercelDb = await question('Vercel Postgres URL: ');
      envVars.DATABASE_URL = vercelDb;
      break;
    case '3':
      console.log('📌 Get your connection string from: https://console.neon.tech/');
      const neonDb = await question('Neon Database URL: ');
      envVars.DATABASE_URL = neonDb;
      break;
    case '4':
      const customDb = await question('PostgreSQL URL: ');
      envVars.DATABASE_URL = customDb;
      break;
  }

  // Authentication
  console.log('\n🔐 Authentication\n');
  const generateSecret = await question('Generate NEXTAUTH_SECRET automatically? (Y/n): ');

  if (generateSecret.toLowerCase() !== 'n') {
    try {
      const secret = execSync('openssl rand -base64 32').toString().trim();
      envVars.NEXTAUTH_SECRET = secret;
      console.log('✅ Generated NEXTAUTH_SECRET');
    } catch {
      console.log('❌ Failed to generate secret. Please add manually.');
      const manualSecret = await question('NEXTAUTH_SECRET (min 32 chars): ');
      envVars.NEXTAUTH_SECRET = manualSecret;
    }
  } else {
    const manualSecret = await question('NEXTAUTH_SECRET (min 32 chars): ');
    envVars.NEXTAUTH_SECRET = manualSecret;
  }

  // OpenAI
  console.log('\n🤖 AI Services\n');
  console.log('Get your API key from: https://platform.openai.com/api-keys');
  const openaiKey = await question('OpenAI API Key (starts with sk-): ');
  envVars.OPENAI_API_KEY = openaiKey;

  // Optional services
  console.log('\n📦 Optional Services\n');
  const configureOptional = await question('Configure optional services? (y/N): ');

  if (configureOptional.toLowerCase() === 'y') {
    // Google Maps
    console.log('\n🗺️  Google Maps');
    const gmapsKey = await question('Google Maps API Key (leave blank to skip): ');
    if (gmapsKey) envVars.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = gmapsKey;

    // Email
    console.log('\n📧 Email Configuration');
    const smtpHost = await question('SMTP Host (leave blank for mock mode): ');
    if (smtpHost) {
      envVars.SMTP_HOST = smtpHost;
      envVars.SMTP_PORT = (await question('SMTP Port [587]: ')) || '587';
      envVars.SMTP_USER = await question('SMTP Username: ');
      envVars.SMTP_PASSWORD = await question('SMTP Password: ');
      envVars.EMAIL_FROM =
        (await question('From Email [info@vasquezlawnc.com]: ')) || 'info@vasquezlawnc.com';
      envVars.MOCK_EMAIL = 'false';
    } else {
      envVars.MOCK_EMAIL = 'true';
    }

    // Sentry
    console.log('\n🐛 Error Monitoring');
    const sentryDsn = await question('Sentry DSN (leave blank to skip): ');
    if (sentryDsn) envVars.SENTRY_DSN = sentryDsn;
  } else {
    // Set defaults for development
    envVars.MOCK_EMAIL = 'true';
    envVars.MOCK_SMS = 'true';
    envVars.MOCK_REDIS = 'true';
  }

  // Write environment variables
  console.log('\n📝 Writing environment variables...\n');

  let envContent = '# Generated by setup-env script\n';
  envContent += `# Generated at: ${new Date().toISOString()}\n\n`;

  Object.entries(envVars).forEach(([key, value]) => {
    envContent += `${key}=${value}\n`;
  });

  fs.writeFileSync(envPath, envContent);

  console.log('✅ Environment variables saved to .env.local\n');

  // Validate the setup
  console.log('🔍 Validating configuration...\n');

  try {
    execSync('npm run validate:env', { stdio: 'inherit' });
    console.log('\n✅ Environment setup complete!\n');
    console.log('Next steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Visit: ' + envVars.NEXT_PUBLIC_APP_URL);
  } catch (error) {
    console.error('\n❌ Validation failed. Please check your configuration.');
    console.log('Run: npm run validate:env for details');
  }

  rl.close();
}

// Run the setup
setupEnvironment().catch(console.error);
