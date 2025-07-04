#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Vasquez Law Firm environment...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from .env.example...');

  if (fs.existsSync(envExamplePath)) {
    const envContent = fs.readFileSync(envExamplePath, 'utf8');

    // Generate secure secrets
    const generateSecret = () => {
      return require('crypto').randomBytes(32).toString('hex');
    };

    // Replace placeholders with actual values
    let newEnvContent = envContent
      .replace('your-secret-key', generateSecret())
      .replace('postgresql://...', 'postgresql://postgres:postgres@localhost:5432/vasquezlaw');

    fs.writeFileSync(envPath, newEnvContent);
    console.log('✅ .env file created with default values\n');
  } else {
    console.error('❌ .env.example file not found!');
    process.exit(1);
  }
} else {
  console.log('✅ .env file already exists\n');
}

// Check PostgreSQL connection
console.log('🔍 Checking PostgreSQL connection...');
try {
  execSync('pg_isready -h localhost -p 5432', { stdio: 'ignore' });
  console.log('✅ PostgreSQL is running\n');
} catch (error) {
  console.log('⚠️  PostgreSQL is not running. Starting Docker container...');
  try {
    execSync('docker-compose up -d postgres', { stdio: 'inherit' });
    console.log('✅ PostgreSQL started in Docker\n');
  } catch (dockerError) {
    console.error('❌ Failed to start PostgreSQL. Please install Docker or PostgreSQL.');
    console.log('\nTo install PostgreSQL:');
    console.log('- Mac: brew install postgresql');
    console.log('- Ubuntu: sudo apt-get install postgresql');
    console.log('- Windows: Download from https://www.postgresql.org/download/windows/\n');
  }
}

// Run database migrations
console.log('🔄 Running database migrations...');
try {
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  console.log('✅ Database migrations completed\n');
} catch (error) {
  console.log('⚠️  Migration failed. Trying to create database...');
  try {
    execSync('npx prisma db push', { stdio: 'inherit' });
    console.log('✅ Database schema pushed\n');
  } catch (pushError) {
    console.error('❌ Database setup failed:', pushError.message);
  }
}

// Generate Prisma client
console.log('🔧 Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated\n');
} catch (error) {
  console.error('❌ Failed to generate Prisma client:', error.message);
}

// Check Redis connection
console.log('🔍 Checking Redis connection...');
try {
  execSync('redis-cli ping', { stdio: 'ignore' });
  console.log('✅ Redis is running\n');
} catch (error) {
  console.log('⚠️  Redis is not running. Starting Docker container...');
  try {
    execSync('docker-compose up -d redis', { stdio: 'inherit' });
    console.log('✅ Redis started in Docker\n');
  } catch (dockerError) {
    console.log('⚠️  Redis not available. Some features may be limited.');
    console.log('To install Redis:');
    console.log('- Mac: brew install redis');
    console.log('- Ubuntu: sudo apt-get install redis-server');
    console.log('- Windows: Use WSL or Docker\n');
  }
}

// Create required directories
const directories = ['logs', 'uploads', 'temp', '.next/cache'];

console.log('📁 Creating required directories...');
directories.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created ${dir}/`);
  }
});
console.log();

// Install dependencies if needed
console.log('📦 Checking dependencies...');
try {
  execSync('npm list', { stdio: 'ignore' });
  console.log('✅ Dependencies already installed\n');
} catch (error) {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed\n');
}

// Display API setup instructions
console.log('🔑 API Configuration Instructions:\n');
console.log('To connect all services, add these API keys to your .env file:\n');

const apiServices = [
  {
    name: 'OpenAI',
    env: 'OPENAI_API_KEY',
    url: 'https://platform.openai.com/api-keys',
    description: 'Powers AI chat, document analysis, and content generation',
  },
  {
    name: 'GoHighLevel',
    env: 'GHL_API_KEY, GHL_LOCATION_ID',
    url: 'https://app.gohighlevel.com/settings/integrations',
    description: 'CRM integration for lead management and automation',
  },
  {
    name: 'Twilio',
    env: 'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN',
    url: 'https://console.twilio.com',
    description: 'SMS notifications and voice calling',
  },
  {
    name: 'Retell AI',
    env: 'RETELL_API_KEY',
    url: 'https://retellai.com/dashboard',
    description: 'AI voice agent for phone calls',
  },
  {
    name: 'Google Maps',
    env: 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY',
    url: 'https://console.cloud.google.com/apis',
    description: 'Location services and maps',
  },
  {
    name: 'Stripe/LawPay',
    env: 'STRIPE_SECRET_KEY or LAWPAY_SECRET_KEY',
    url: 'https://dashboard.stripe.com/apikeys',
    description: 'Payment processing',
  },
  {
    name: 'SendGrid/SMTP',
    env: 'SMTP_HOST, SMTP_USER, SMTP_PASSWORD',
    url: 'https://app.sendgrid.com',
    description: 'Email notifications',
  },
  {
    name: 'Sentry',
    env: 'SENTRY_DSN',
    url: 'https://sentry.io',
    description: 'Error tracking and monitoring',
  },
];

apiServices.forEach(service => {
  console.log(`📌 ${service.name}:`);
  console.log(`   Environment variables: ${service.env}`);
  console.log(`   Get API keys at: ${service.url}`);
  console.log(`   Purpose: ${service.description}`);
  console.log();
});

// Test database connection
console.log('🧪 Testing database connection...');
const testDbConnection = `
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

test();
`;

fs.writeFileSync(path.join(__dirname, 'test-db.js'), testDbConnection);
try {
  execSync('node ' + path.join(__dirname, 'test-db.js'), { stdio: 'inherit' });
  fs.unlinkSync(path.join(__dirname, 'test-db.js'));
} catch (error) {
  console.error('Database test failed');
}

console.log('\n✨ Environment setup complete!\n');
console.log('Next steps:');
console.log('1. Add your API keys to the .env file');
console.log('2. Run "npm run dev" to start the development server');
console.log('3. Visit http://localhost:3000 to see your site\n');
console.log('For production deployment:');
console.log('1. Set up environment variables in Vercel dashboard');
console.log('2. Connect your PostgreSQL database (e.g., Supabase, Neon, or Railway)');
console.log('3. Configure domain and SSL settings\n');
