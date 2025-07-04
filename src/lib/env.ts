/**
 * Environment variable configuration with safe defaults
 */

export const env = {
  // Core
  NODE_ENV: process.env.NODE_ENV || 'production',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://vasquez-law-website.vercel.app',

  // Database
  DATABASE_URL: process.env.DATABASE_URL || '',

  // Auth
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'https://vasquez-law-website.vercel.app',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'default-secret-change-in-production',

  // Redis
  MOCK_REDIS: process.env.MOCK_REDIS === 'true' || true,

  // Email
  MOCK_EMAIL: process.env.MOCK_EMAIL === 'true' || true,
  MOCK_SMS: process.env.MOCK_SMS === 'true' || true,

  // APIs - with safe defaults
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  GHL_API_KEY: process.env.GHL_API_KEY || '',
  GHL_LOCATION_ID: process.env.GHL_LOCATION_ID || '',

  // Feature flags
  SKIP_ENV_VALIDATION: process.env.SKIP_ENV_VALIDATION === 'true' || true,
};

// Type-safe env access
export type Env = typeof env;
