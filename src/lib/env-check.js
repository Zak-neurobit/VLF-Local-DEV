// Simple env check for build
const requiredEnvVars = [
  'NEXT_PUBLIC_APP_URL',
  'DATABASE_URL',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'OPENAI_API_KEY',
];

// Only validate in production builds
if (process.env.NODE_ENV === 'production') {
  const missing = requiredEnvVars.filter(key => !process.env[key]);
  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    console.error('Please set these in your deployment environment');
  }
}

module.exports = {};
