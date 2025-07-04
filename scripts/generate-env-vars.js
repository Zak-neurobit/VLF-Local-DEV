#!/usr/bin/env node

/**
 * Generate secure environment variables for production
 */

const crypto = require('crypto');

console.log('\n🔐 Generating Secure Environment Variables\n');

// Generate NEXTAUTH_SECRET
const nextAuthSecret = crypto.randomBytes(32).toString('base64');
console.log('NEXTAUTH_SECRET=' + nextAuthSecret);

// Generate encryption key if needed
const encryptionKey = crypto.randomBytes(32).toString('base64');
console.log('ENCRYPTION_KEY=' + encryptionKey);

// Generate JWT secret if needed
const jwtSecret = crypto.randomBytes(32).toString('base64');
console.log('JWT_SECRET=' + jwtSecret);

console.log('\n📋 Copy these to Vercel Environment Variables:');
console.log(
  '1. Go to: https://vercel.com/hodos-360/vasquez-law-website/settings/environment-variables'
);
console.log('2. Add each variable above');
console.log('3. Select all environments (Production, Preview, Development)');
console.log('4. Save and redeploy\n');

// Also generate a sample .env.local for development
const envContent = `# Generated on ${new Date().toISOString()}
# DO NOT COMMIT THIS FILE

# Database (get from Supabase/Neon)
DATABASE_URL=

# Authentication
NEXTAUTH_SECRET=${nextAuthSecret}
NEXTAUTH_URL=http://localhost:3000

# Email (optional - for notifications)
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=

# Optional Services
OPENAI_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
`;

require('fs').writeFileSync('.env.local.example', envContent);
console.log('✅ Created .env.local.example with secure values\n');
