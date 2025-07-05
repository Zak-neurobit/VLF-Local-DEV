#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔌 API Integration Setup for Vasquez Law Firm\n');

const apiGuides = {
  openai: {
    name: 'OpenAI (AI Assistant)',
    required: true,
    steps: [
      'Go to: https://platform.openai.com/api-keys',
      'Create a new API key',
      'Add to .env.local: OPENAI_API_KEY="sk-..."',
    ],
    test: 'curl -H "Authorization: Bearer YOUR_API_KEY" https://api.openai.com/v1/models',
  },

  retell: {
    name: 'Retell (Voice Calls)',
    required: true,
    steps: [
      'Go to: https://www.retellai.com',
      'Sign up and get API key',
      'Add to .env.local:',
      '  RETELL_API_KEY="..."',
      'Note: Voice calls handled by Retell',
    ],
  },

  gohighlevel: {
    name: 'GoHighLevel (CRM & SMS)',
    required: true,
    steps: [
      'Log into your GoHighLevel account',
      'Go to Settings > Integrations > API',
      'Create a new API key',
      'Get your Location ID from Settings',
      'Add to .env.local:',
      '  GHL_API_KEY="..."',
      '  GHL_LOCATION_ID="..."',
      'Note: SMS messaging handled by GoHighLevel',
    ],
  },

  stripe: {
    name: 'Stripe (Payments)',
    required: false,
    steps: [
      'Go to: https://dashboard.stripe.com/apikeys',
      'Copy Publishable key and Secret key',
      'Add to .env.local:',
      '  STRIPE_PUBLIC_KEY="pk_..."',
      '  STRIPE_SECRET_KEY="sk_..."',
      'For webhooks: stripe listen --forward-to localhost:3000/api/webhooks/stripe',
    ],
  },

  google: {
    name: 'Google Services',
    required: true,
    steps: [
      'Google Maps:',
      '  - Go to: https://console.cloud.google.com',
      '  - Enable Maps JavaScript API',
      '  - Create API key with restrictions',
      '',
      'Google Analytics:',
      '  - Go to: https://analytics.google.com',
      '  - Create a new property',
      '  - Get Measurement ID (G-...)',
      '',
      'Add to .env.local:',
      '  GOOGLE_MAPS_API_KEY="..."',
      '  GOOGLE_ANALYTICS_ID="G-..."',
    ],
  },

  sentry: {
    name: 'Sentry (Error Tracking)',
    required: false,
    steps: [
      'Go to: https://sentry.io',
      'Create a new project (Next.js)',
      'Copy DSN from project settings',
      'Add to .env.local: SENTRY_DSN="..."',
      'Run: npx @sentry/wizard@latest -i nextjs',
    ],
  },
};

console.log('Required Integrations:');
console.log('=====================\n');

Object.entries(apiGuides).forEach(([key, guide]) => {
  if (guide.required) {
    console.log(`📍 ${guide.name}`);
    guide.steps.forEach(step => console.log(`   ${step}`));
    console.log('');
  }
});

console.log('\nOptional Integrations:');
console.log('=====================\n');

Object.entries(apiGuides).forEach(([key, guide]) => {
  if (!guide.required) {
    console.log(`📍 ${guide.name}`);
    guide.steps.forEach(step => console.log(`   ${step}`));
    console.log('');
  }
});

// Create API test script
const testScript = `#!/usr/bin/env node

const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

console.log('\\n🧪 Testing API Configurations...\\n');

const tests = {
  'Database': () => !!process.env.DATABASE_URL,
  'OpenAI': () => !!process.env.OPENAI_API_KEY,
  'Twilio Account': () => !!process.env.TWILIO_ACCOUNT_SID,
  'Twilio Auth': () => !!process.env.TWILIO_AUTH_TOKEN,
  'Twilio Phone': () => !!process.env.TWILIO_PHONE_NUMBER,
  'GoHighLevel API': () => !!process.env.GHL_API_KEY,
  'GoHighLevel Location': () => !!process.env.GHL_LOCATION_ID,
  'NextAuth URL': () => !!process.env.NEXTAUTH_URL,
  'NextAuth Secret': () => !!process.env.NEXTAUTH_SECRET,
};

let allPassed = true;

Object.entries(tests).forEach(([name, test]) => {
  const passed = test();
  console.log(\`\${passed ? '✅' : '❌'} \${name}\`);
  if (!passed) allPassed = false;
});

console.log('\\n' + (allPassed ? '✅ All required APIs configured!' : '❌ Some APIs need configuration'));

if (!allPassed) {
  console.log('\\nRun: npm run setup:apis for detailed setup instructions');
}
`;

fs.writeFileSync(path.join(process.cwd(), 'scripts', 'test-apis.js'), testScript);
console.log('✅ Created scripts/test-apis.js\n');

console.log('🚀 Quick Commands:');
console.log('=================');
console.log('1. Test API configuration:');
console.log('   node scripts/test-apis.js\n');
console.log('2. Start all services:');
console.log('   npm run dev\n');
console.log('3. Test voice system:');
console.log('   Call your Twilio number after setup\n');
