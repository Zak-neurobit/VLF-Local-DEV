#!/usr/bin/env node

const crypto = require('crypto');

console.log('\n🔐 Generating Retell Webhook Secret...\n');

// Generate a secure random secret
const secret = crypto.randomBytes(32).toString('hex');

console.log('Your webhook secret:');
console.log('═'.repeat(70));
console.log(secret);
console.log('═'.repeat(70));

console.log('\n📋 Next steps:');
console.log('1. Copy the secret above');
console.log('2. Add to your .env.local file:');
console.log(`   RETELL_WEBHOOK_SECRET=${secret}`);
console.log('3. Add to Retell dashboard webhook configuration');
console.log('4. Deploy to Vercel with this environment variable\n');

console.log('⚠️  Security reminders:');
console.log('- Never commit this secret to git');
console.log('- Use different secrets for dev/staging/production');
console.log('- Rotate the secret every 90 days\n');
