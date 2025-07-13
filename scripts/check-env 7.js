#!/usr/bin/env node

/**
 * Check which environment variables are configured
 * Run: node scripts/check-env.js
 */

// Define environment variable groups
const envGroups = {
  'Core (Required)': {
    required: true,
    vars: {
      NODE_ENV: 'Should be "production" for Vercel',
      NEXT_PUBLIC_APP_URL: 'Your Vercel app URL (https://...)',
      NEXTAUTH_URL: 'Same as NEXT_PUBLIC_APP_URL',
      NEXTAUTH_SECRET: 'Generate with: openssl rand -base64 32',
      DATABASE_URL: 'PostgreSQL connection string',
    }
  },
  'Mock Services (Temporary)': {
    required: false,
    vars: {
      MOCK_REDIS: 'Set to "true" to run without Redis',
      MOCK_EMAIL: 'Set to "true" to run without email',
      MOCK_SMS: 'Set to "true" to run without SMS',
      SKIP_ENV_VALIDATION: 'Set to "true" during initial setup',
    }
  },
  'AI Features': {
    required: false,
    vars: {
      OPENAI_API_KEY: 'Required for AI chat and content generation',
    }
  },
  'GoHighLevel CRM': {
    required: false,
    vars: {
      GHL_API_KEY: 'GoHighLevel API key',
      GHL_LOCATION_ID: 'Your GHL location ID',
      GHL_WEBHOOK_SECRET: 'Webhook validation secret',
    }
  },
  'Voice Services': {
    required: false,
    vars: {
      RETELL_API_KEY: 'Retell AI API key (provided: 2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0)',
      RETELL_WEBHOOK_SECRET: 'Usually same as API key',
    }
  },
  'Email Configuration': {
    required: false,
    vars: {
      EMAIL_FROM: 'Sender email address',
      SMTP_HOST: 'SMTP server hostname',
      SMTP_PORT: 'SMTP port (usually 587)',
      SMTP_USER: 'SMTP username',
      SMTP_PASSWORD: 'SMTP password',
    }
  },
  'Google Services': {
    required: false,
    vars: {
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: 'For displaying maps',
      GOOGLE_PLACES_API_KEY: 'For fetching reviews',
      GOOGLE_ANALYTICS_ID: 'For analytics tracking',
    }
  },
  'Error Tracking': {
    required: false,
    vars: {
      SENTRY_DSN: 'Sentry error tracking DSN',
    }
  },
  'Redis Cache': {
    required: false,
    vars: {
      REDIS_URL: 'Redis connection URL (when MOCK_REDIS=false)',
    }
  },
};

// Check environment variables
console.log('🔍 Checking Environment Variables\n');
console.log('=' .repeat(60));

let hasAllRequired = true;
let totalVars = 0;
let configuredVars = 0;

Object.entries(envGroups).forEach(([groupName, group]) => {
  console.log(`\n📁 ${groupName} ${group.required ? '(REQUIRED)' : '(Optional)'}`);
  console.log('-'.repeat(40));
  
  Object.entries(group.vars).forEach(([varName, description]) => {
    totalVars++;
    const value = process.env[varName];
    const isSet = value !== undefined && value !== '';
    
    if (isSet) {
      configuredVars++;
      console.log(`✅ ${varName}`);
      // Don't show sensitive values, just show if it's set
      if (varName.includes('SECRET') || varName.includes('KEY') || varName.includes('PASSWORD')) {
        console.log(`   Value: [HIDDEN - ${value.length} characters]`);
      } else {
        console.log(`   Value: ${value}`);
      }
    } else {
      if (group.required) {
        hasAllRequired = false;
        console.log(`❌ ${varName} - MISSING`);
      } else {
        console.log(`⚪ ${varName} - Not set`);
      }
      console.log(`   Info: ${description}`);
    }
  });
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('\n📊 Summary:');
console.log(`   Total variables: ${totalVars}`);
console.log(`   Configured: ${configuredVars} (${Math.round(configuredVars/totalVars * 100)}%)`);
console.log(`   Missing: ${totalVars - configuredVars}`);

if (!hasAllRequired) {
  console.log('\n⚠️  WARNING: Missing required environment variables!');
  console.log('   Your deployment may fail without these.\n');
} else {
  console.log('\n✅ All required environment variables are set!\n');
}

// Quick setup reminder
if (configuredVars < 5) {
  console.log('💡 Quick Setup Tip:');
  console.log('   For a minimal working deployment, you need at least:');
  console.log('   - NODE_ENV=production');
  console.log('   - NEXT_PUBLIC_APP_URL=https://your-app.vercel.app');
  console.log('   - NEXTAUTH_URL=https://your-app.vercel.app');
  console.log('   - NEXTAUTH_SECRET=(generate with: openssl rand -base64 32)');
  console.log('   - DATABASE_URL=(get from Vercel Postgres or Supabase)');
  console.log('   - MOCK_REDIS=true');
  console.log('   - MOCK_EMAIL=true');
  console.log('   - MOCK_SMS=true\n');
}