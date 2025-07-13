#!/usr/bin/env node

/**
 * Environment Variables Validation Script
 * Ensures all required environment variables are set before deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating environment variables...\n');

// Define required and optional environment variables
const requiredVars = {
  // Database
  DATABASE_URL: 'PostgreSQL connection string',

  // Authentication
  NEXTAUTH_URL: 'Production URL (https://www.vasquezlawnc.com)',
  NEXTAUTH_SECRET: 'Secret key for NextAuth (min 32 chars)',

  // Email
  SMTP_HOST: 'SMTP server host',
  SMTP_PORT: 'SMTP server port',
  SMTP_USER: 'SMTP username',
  SMTP_PASSWORD: 'SMTP password',
  SMTP_FROM: 'From email address',

  // Application
  NODE_ENV: 'Should be "production"',
  NEXT_PUBLIC_APP_URL: 'Public app URL',
};

const optionalVars = {
  // GoHighLevel (handles SMS)
  GHL_API_KEY: 'Required for CRM integration and SMS',
  GHL_LOCATION_ID: 'Required for CRM integration and SMS',

  // Retell AI (handles voice calls)
  RETELL_API_KEY: 'Required for voice agents and calls',

  // Redis
  REDIS_URL: 'Recommended for caching',

  // Payment
  STRIPE_SECRET_KEY: 'Required for Stripe payments',
  STRIPE_PUBLISHABLE_KEY: 'Required for Stripe payments',
  AUTHORIZE_NET_API_LOGIN_ID: 'Required for Authorize.Net',
  AUTHORIZE_NET_TRANSACTION_KEY: 'Required for Authorize.Net',
  LAWPAY_API_KEY: 'Required for LawPay',

  // Analytics
  NEXT_PUBLIC_GA_MEASUREMENT_ID: 'Google Analytics ID',
  NEXT_PUBLIC_GTM_ID: 'Google Tag Manager ID',

  // AI Services
  OPENAI_API_KEY: 'Required for AI features',
  ANTHROPIC_API_KEY: 'Optional AI service',

  // Social Media
  FACEBOOK_PAGE_ACCESS_TOKEN: 'For social media automation',
  TWITTER_API_KEY: 'For social media automation',
  LINKEDIN_ACCESS_TOKEN: 'For social media automation',

  // Monitoring
  SENTRY_DSN: 'Error tracking',
  SENTRY_AUTH_TOKEN: 'For source maps',
};

// Load environment variables
const envPath = path.join(process.cwd(), '.env.production');
const envExamplePath = path.join(process.cwd(), 'env.production.example');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env.production not found!');
  console.log('Please create it from env.production.example:');
  console.log('  cp env.production.example .env.production');
  process.exit(1);
}

// Parse environment file
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach(line => {
  if (line && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts
        .join('=')
        .trim()
        .replace(/^["']|["']$/g, '');
      envVars[key.trim()] = value;
    }
  }
});

console.log('📋 Checking required variables...\n');

let hasErrors = false;
let hasWarnings = false;

// Check required variables
Object.entries(requiredVars).forEach(([key, description]) => {
  if (!envVars[key] || envVars[key].includes('your-') || envVars[key].includes('XXX')) {
    console.error(`❌ ${key}: Missing or not configured (${description})`);
    hasErrors = true;
  } else {
    console.log(`✅ ${key}: Set`);
  }
});

console.log('\n📋 Checking optional variables...\n');

// Check optional variables
Object.entries(optionalVars).forEach(([key, description]) => {
  if (!envVars[key] || envVars[key].includes('your-') || envVars[key].includes('XXX')) {
    console.warn(`⚠️  ${key}: Not configured (${description})`);
    hasWarnings = true;
  } else {
    console.log(`✅ ${key}: Set`);
  }
});

// Validate specific values
console.log('\n🔍 Validating configuration...\n');

// Check NEXTAUTH_SECRET length
if (envVars.NEXTAUTH_SECRET && envVars.NEXTAUTH_SECRET.length < 32) {
  console.error('❌ NEXTAUTH_SECRET must be at least 32 characters long');
  hasErrors = true;
}

// Check NODE_ENV
if (envVars.NODE_ENV !== 'production') {
  console.error('❌ NODE_ENV should be set to "production"');
  hasErrors = true;
}

// Check URLs
if (envVars.NEXTAUTH_URL && !envVars.NEXTAUTH_URL.startsWith('https://')) {
  console.error('❌ NEXTAUTH_URL should use HTTPS in production');
  hasErrors = true;
}

// Check email configuration
if (envVars.SMTP_PORT && !['25', '465', '587', '2525'].includes(envVars.SMTP_PORT)) {
  console.warn('⚠️  Unusual SMTP_PORT value:', envVars.SMTP_PORT);
}

// Generate report
console.log('\n📊 Environment Validation Report\n');
console.log('═══════════════════════════════════════');

const requiredCount = Object.keys(requiredVars).length;
const requiredSet = Object.keys(requiredVars).filter(
  key => envVars[key] && !envVars[key].includes('your-') && !envVars[key].includes('XXX')
).length;

const optionalCount = Object.keys(optionalVars).length;
const optionalSet = Object.keys(optionalVars).filter(
  key => envVars[key] && !envVars[key].includes('your-') && !envVars[key].includes('XXX')
).length;

console.log(`Required Variables: ${requiredSet}/${requiredCount} configured`);
console.log(`Optional Variables: ${optionalSet}/${optionalCount} configured`);
console.log(`Total: ${requiredSet + optionalSet}/${requiredCount + optionalCount} configured`);

if (hasErrors) {
  console.log('\n❌ Validation FAILED - Required variables missing');
  console.log('Please configure all required variables before deployment.');
  process.exit(1);
} else if (hasWarnings) {
  console.log('\n⚠️  Validation PASSED with warnings');
  console.log('Some optional features may not work without additional configuration.');
  console.log('\nProceed with deployment? The core functionality will work.');
} else {
  console.log('\n✅ All environment variables properly configured!');
  console.log('Ready for deployment! 🚀');
}

// Feature availability report
console.log('\n🔧 Feature Availability:\n');

const features = {
  'Core Website': requiredSet === requiredCount,
  'SMS/Voice': !!(envVars.TWILIO_ACCOUNT_SID && envVars.TWILIO_AUTH_TOKEN),
  'CRM Integration': !!(envVars.GHL_API_KEY && envVars.GHL_LOCATION_ID),
  'Voice Agents': !!envVars.RETELL_API_KEY,
  Caching: !!envVars.REDIS_URL,
  'Stripe Payments': !!(envVars.STRIPE_SECRET_KEY && envVars.STRIPE_PUBLISHABLE_KEY),
  'Authorize.Net': !!(envVars.AUTHORIZE_NET_API_LOGIN_ID && envVars.AUTHORIZE_NET_TRANSACTION_KEY),
  LawPay: !!envVars.LAWPAY_API_KEY,
  Analytics: !!envVars.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  'AI Features': !!envVars.OPENAI_API_KEY,
  'Social Media': !!(envVars.FACEBOOK_PAGE_ACCESS_TOKEN || envVars.TWITTER_API_KEY),
  'Error Tracking': !!envVars.SENTRY_DSN,
};

Object.entries(features).forEach(([feature, enabled]) => {
  console.log(`${enabled ? '✅' : '❌'} ${feature}`);
});

console.log('\n');
