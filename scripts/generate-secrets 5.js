#!/usr/bin/env node

/**
 * Helper script to generate secure secrets for environment variables
 */

const crypto = require('crypto');

console.log('🔐 Generating Secure Secrets for VLF Website\n');

// Generate NextAuth Secret
const nextAuthSecret = crypto.randomBytes(32).toString('base64');
console.log('NEXTAUTH_SECRET:');
console.log(nextAuthSecret);
console.log('');

// Generate HODOS API Key
const hodosApiKey = `hodos_${crypto.randomBytes(24).toString('hex')}`;
console.log('HODOS_API_KEY:');
console.log(hodosApiKey);
console.log('');

// Generate example JWT secret
const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log('JWT_SECRET (for HODOS):');
console.log(jwtSecret);
console.log('');

// Generate webhook secret
const webhookSecret = `whsec_${crypto.randomBytes(32).toString('hex')}`;
console.log('WEBHOOK_SECRET (example):');
console.log(webhookSecret);
console.log('');

console.log('📋 Copy these values to your Vercel Environment Variables');
console.log('⚠️  Keep these secret and never commit them to Git!\n');

// Show example database URL format
console.log('📚 Database URL Format Examples:\n');
console.log('Vercel Postgres:');
console.log(
  'postgresql://default:password@host-pooler.region.postgres.vercel-storage.com/verceldb?sslmode=require\n'
);

console.log('Supabase:');
console.log(
  'postgresql://postgres:password@db.projectref.supabase.co:5432/postgres?sslmode=require\n'
);

console.log('Neon:');
console.log('postgresql://user:password@host.neon.tech/dbname?sslmode=require\n');
