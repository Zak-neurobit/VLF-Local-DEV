#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Define required environment variables by category
const REQUIRED_ENV_VARS = {
  'Core Configuration': ['NODE_ENV', 'NEXT_PUBLIC_APP_URL'],
  Database: ['DATABASE_URL'],
  Authentication: ['NEXTAUTH_URL', 'NEXTAUTH_SECRET'],
  'AI Services': ['OPENAI_API_KEY'],
  GoHighLevel: ['GHL_API_KEY', 'GHL_LOCATION_ID'],
  'Voice Services': ['RETELL_API_KEY'],
  Email: ['EMAIL_FROM', 'SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD'],
};

// Optional environment variables that are good to have
const OPTIONAL_ENV_VARS = {
  'Google Services': ['GOOGLE_ANALYTICS_ID', 'GOOGLE_MAPS_API_KEY'],
  'Payment Processing': ['STRIPE_SECRET_KEY', 'LAWPAY_PUBLIC_KEY'],
  Monitoring: ['SENTRY_DSN'],
  Redis: ['REDIS_URL', 'REDIS_HOST', 'REDIS_PORT'],
};

function checkEnvVars() {
  console.log('🔍 Checking environment variables...\n');

  let hasErrors = false;
  let hasWarnings = false;

  // Check for .env.local file
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    console.log(
      '⚠️  Warning: .env.local file not found. Make sure to create it from .env.example\n'
    );
    hasWarnings = true;
  }

  // Check required variables
  console.log('📋 Required Environment Variables:\n');
  for (const [category, vars] of Object.entries(REQUIRED_ENV_VARS)) {
    console.log(`  ${category}:`);
    for (const varName of vars) {
      if (process.env[varName]) {
        console.log(`    ✅ ${varName}`);
      } else {
        console.log(`    ❌ ${varName} - MISSING`);
        hasErrors = true;
      }
    }
    console.log('');
  }

  // Check optional variables
  console.log('📋 Optional Environment Variables:\n');
  for (const [category, vars] of Object.entries(OPTIONAL_ENV_VARS)) {
    console.log(`  ${category}:`);
    for (const varName of vars) {
      if (process.env[varName]) {
        console.log(`    ✅ ${varName}`);
      } else {
        console.log(`    ⚠️  ${varName} - Not set (optional)`);
        hasWarnings = true;
      }
    }
    console.log('');
  }

  // Check for development flags
  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 Development Mode Detected:\n');
    console.log('  You can use these flags for local development:');
    console.log(`    MOCK_REDIS=${process.env.MOCK_REDIS || 'false'} - Use mock Redis`);
    console.log(`    MOCK_EMAIL=${process.env.MOCK_EMAIL || 'false'} - Use mock email service`);
    console.log(`    MOCK_SMS=${process.env.MOCK_SMS || 'false'} - Use mock SMS service`);
    console.log('');
  }

  // Summary
  console.log('📊 Summary:\n');
  if (hasErrors) {
    console.log(
      '  ❌ Missing required environment variables. Please set them before running the application.'
    );
    process.exit(1);
  } else if (hasWarnings) {
    console.log(
      '  ⚠️  Some optional variables are not set. The application will run but some features may be limited.'
    );
  } else {
    console.log('  ✅ All environment variables are properly configured!');
  }
}

// Run the check
checkEnvVars();
