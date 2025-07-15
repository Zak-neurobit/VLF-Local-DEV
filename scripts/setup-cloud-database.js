#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌐 Cloud Database Setup Guide for Vasquez Law Firm\n');

console.log('Since PostgreSQL is not installed locally, here are your cloud database options:\n');

console.log('Option 1: Neon (Recommended - Vercel Partner)');
console.log('===========================================');
console.log('1. Go to: https://neon.tech');
console.log('2. Sign up for a free account');
console.log('3. Create a new project');
console.log('4. Copy your connection string');
console.log('5. It will look like: postgres://username:password@host/database?sslmode=require\n');

console.log('Option 2: Supabase');
console.log('==================');
console.log('1. Go to: https://supabase.com');
console.log('2. Create a new project');
console.log('3. Go to Settings > Database');
console.log('4. Copy the connection string\n');

console.log('Option 3: Railway');
console.log('=================');
console.log('1. Go to: https://railway.app');
console.log('2. Create a new project');
console.log('3. Add PostgreSQL service');
console.log('4. Copy the DATABASE_URL\n');

console.log('Option 4: Vercel Postgres');
console.log('========================');
console.log('1. Go to your Vercel dashboard');
console.log('2. Go to Storage tab');
console.log('3. Create a Postgres database');
console.log('4. Copy the connection string\n');

console.log('After getting your database URL:');
console.log('================================');
console.log('1. Update your .env.local file:');
console.log('   DATABASE_URL="your-connection-string-here"\n');

console.log('2. Run database migrations:');
console.log('   npx prisma db push\n');

console.log('3. Generate Prisma client:');
console.log('   npx prisma generate\n');

console.log('4. (Optional) Seed the database:');
console.log('   npm run db:seed\n');

// Create a template .env.local if it doesn't exist
const envPath = path.join(process.cwd(), '.env.local');
const envTemplate = `# Database
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# NextAuth (Required for authentication)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="${require('crypto').randomBytes(32).toString('base64')}"

# AI Services
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""

# Twilio (Voice & SMS)
TWILIO_ACCOUNT_SID=""
TWILIO_AUTH_TOKEN=""
TWILIO_PHONE_NUMBER=""

# GoHighLevel
GHL_API_KEY=""
GHL_LOCATION_ID=""

# Email
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASS=""
EMAIL_FROM="noreply@vasquezlaw.com"

# Monitoring
SENTRY_DSN=""

# Google Services
GOOGLE_MAPS_API_KEY=""
GOOGLE_ANALYTICS_ID=""

# Stripe (Payments)
STRIPE_PUBLIC_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
`;

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ Created .env.local template\n');
} else {
  console.log('ℹ️  .env.local already exists\n');
}

console.log('🚀 Quick Start with Neon (Recommended):');
console.log('======================================');
console.log('Run this command to open Neon signup:');
console.log('open https://neon.tech\n');

console.log('Then update your .env.local with the connection string and run:');
console.log('npm run setup:db\n');
