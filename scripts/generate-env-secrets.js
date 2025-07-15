#!/usr/bin/env node

const crypto = require('crypto');

console.log('🔐 Generating Secure Secrets for Environment Variables\n');

// Generate secrets
const secrets = {
  NEXTAUTH_SECRET: crypto.randomBytes(32).toString('base64'),
  STRIPE_WEBHOOK_SECRET: `whsec_${crypto.randomBytes(32).toString('hex')}`,
  LAWPAY_WEBHOOK_SECRET: crypto.randomBytes(24).toString('hex'),
  GHL_WEBHOOK_SECRET: crypto.randomBytes(32).toString('hex'),
  RETELL_WEBHOOK_SECRET: crypto.randomBytes(32).toString('hex'),
};

// Display results
console.log('Copy these values to your Vercel environment variables:\n');

Object.entries(secrets).forEach(([key, value]) => {
  console.log(`${key}=${value}`);
});

console.log('\n📋 Instructions:');
console.log('1. Copy each line above');
console.log('2. Go to: https://vercel.com/hodos-360/vlf-website/settings/environment-variables');
console.log('3. Add each as a new environment variable');
console.log('4. Make sure to select all environments (Production, Preview, Development)');
console.log('\n✅ These secrets are cryptographically secure and unique to your deployment');
