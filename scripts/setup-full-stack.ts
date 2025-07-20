#!/usr/bin/env ts-node

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { PrismaClient } from '@prisma/client';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> => {
  return new Promise(resolve => rl.question(query, resolve));
};

interface SetupConfig {
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  };
  redis: {
    host: string;
    port: number;
    password?: string;
  };
  services: {
    openai?: string;
    anthropic?: string;
    retell?: string;
    stripe?: {
      publicKey: string;
      secretKey: string;
    };
    authorizenet?: {
      loginId: string;
      transactionKey: string;
    };
    lawpay?: {
      merchantId: string;
      publicKey: string;
      secretKey: string;
    };
    resend?: string;
    sentry?: string;
  };
}

class FullStackSetup {
  private config: SetupConfig = {
    database: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '',
      name: 'vasquez_law_db',
    },
    redis: {
      host: 'localhost',
      port: 6379,
    },
    services: {},
  };

  async run() {
    console.log('🚀 Vasquez Law Firm - Full Stack Setup\n');

    const setupType = await this.chooseSetupType();

    if (setupType === 'full') {
      await this.fullSetup();
    } else {
      await this.quickSetup();
    }

    await this.createEnvFile();
    await this.setupDatabase();
    await this.installDependencies();
    await this.runMigrations();
    await this.seedDatabase();
    await this.testConnections();

    console.log('\n✅ Setup complete! You can now run:');
    console.log('   npm run dev - to start the development server');
    console.log('   npm run seo:agent - to start SEO agents');
    console.log('\n📚 Documentation:');
    console.log('   - API Keys: Add your API keys to .env.local');
    console.log('   - Database: PostgreSQL is running on port 5432');
    console.log('   - Redis: Redis is running on port 6379');
    console.log('   - Admin: Login with admin@vasquezlawnc.com / admin123\n');
  }

  private async chooseSetupType(): Promise<string> {
    console.log('Choose setup type:');
    console.log('1. Quick Setup (minimal configuration)');
    console.log('2. Full Setup (all services)');

    const choice = await question('\nEnter your choice (1 or 2): ');
    return choice === '2' ? 'full' : 'quick';
  }

  private async quickSetup() {
    console.log('\n📦 Quick Setup Mode - Minimal Configuration\n');

    // Database setup
    const useDocker = await question('Use Docker for PostgreSQL? (y/n): ');
    if (useDocker.toLowerCase() === 'y') {
      await this.setupDockerDatabase();
    } else {
      console.log('\n🔧 PostgreSQL Configuration:');
      this.config.database.host = (await question('Host (localhost): ')) || 'localhost';
      this.config.database.port = parseInt((await question('Port (5432): ')) || '5432');
      this.config.database.user = (await question('Username (postgres): ')) || 'postgres';
      this.config.database.password = await question('Password: ');
      this.config.database.name =
        (await question('Database name (vasquez_law_db): ')) || 'vasquez_law_db';
    }

    // Redis setup
    const useDockerRedis = await question('\nUse Docker for Redis? (y/n): ');
    if (useDockerRedis.toLowerCase() === 'y') {
      await this.setupDockerRedis();
    } else {
      console.log('\n🔧 Redis Configuration:');
      this.config.redis.host = (await question('Host (localhost): ')) || 'localhost';
      this.config.redis.port = parseInt((await question('Port (6379): ')) || '6379');
      this.config.redis.password = (await question('Password (optional): ')) || '';
    }
  }

  private async fullSetup() {
    console.log('\n📦 Full Setup Mode - All Services\n');

    await this.quickSetup(); // Start with basic setup

    console.log('\n🤖 AI Services Configuration:');
    const setupOpenAI = await question('Setup OpenAI? (y/n): ');
    if (setupOpenAI.toLowerCase() === 'y') {
      this.config.services.openai = await question('OpenAI API Key: ');
    }

    const setupAnthropic = await question('Setup Anthropic Claude? (y/n): ');
    if (setupAnthropic.toLowerCase() === 'y') {
      this.config.services.anthropic = await question('Anthropic API Key: ');
    }

    const setupRetell = await question('Setup Retell Voice AI? (y/n): ');
    if (setupRetell.toLowerCase() === 'y') {
      this.config.services.retell = await question('Retell API Key: ');
    }

    console.log('\n💳 Payment Services:');
    const setupStripe = await question('Setup Stripe? (y/n): ');
    if (setupStripe.toLowerCase() === 'y') {
      this.config.services.stripe = {
        publicKey: await question('Stripe Public Key: '),
        secretKey: await question('Stripe Secret Key: '),
      };
    }

    const setupAuthNet = await question('Setup Authorize.Net? (y/n): ');
    if (setupAuthNet.toLowerCase() === 'y') {
      this.config.services.authorizenet = {
        loginId: await question('Authorize.Net Login ID: '),
        transactionKey: await question('Authorize.Net Transaction Key: '),
      };
    }

    const setupLawPay = await question('Setup LawPay? (y/n): ');
    if (setupLawPay.toLowerCase() === 'y') {
      this.config.services.lawpay = {
        merchantId: await question('LawPay Merchant ID: '),
        publicKey: await question('LawPay Public Key: '),
        secretKey: await question('LawPay Secret Key: '),
      };
    }

    console.log('\n📧 Email Service:');
    const setupResend = await question('Setup Resend for emails? (y/n): ');
    if (setupResend.toLowerCase() === 'y') {
      this.config.services.resend = await question('Resend API Key: ');
    }

    console.log('\n🐛 Error Tracking:');
    const setupSentry = await question('Setup Sentry? (y/n): ');
    if (setupSentry.toLowerCase() === 'y') {
      this.config.services.sentry = await question('Sentry DSN: ');
    }
  }

  private async setupDockerDatabase() {
    console.log('\n🐳 Setting up PostgreSQL with Docker...');

    try {
      // Check if container already exists
      try {
        execSync('docker ps -a | grep vasquez-postgres', { stdio: 'ignore' });
        console.log('Removing existing container...');
        execSync('docker stop vasquez-postgres && docker rm vasquez-postgres', { stdio: 'ignore' });
      } catch (e) {
        // Container doesn't exist, continue
      }

      // Create and start PostgreSQL container
      execSync(
        `docker run --name vasquez-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vasquez_law_db -p 5432:5432 -d postgres:15`
      );

      this.config.database = {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        name: 'vasquez_law_db',
      };

      console.log('✅ PostgreSQL container created and running');
      console.log('   Connection: postgresql://postgres:postgres@localhost:5432/vasquez_law_db');

      // Wait for database to be ready
      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (error) {
      console.error('❌ Failed to setup Docker PostgreSQL:', error);
      process.exit(1);
    }
  }

  private async setupDockerRedis() {
    console.log('\n🐳 Setting up Redis with Docker...');

    try {
      // Check if container already exists
      try {
        execSync('docker ps -a | grep vasquez-redis', { stdio: 'ignore' });
        console.log('Removing existing container...');
        execSync('docker stop vasquez-redis && docker rm vasquez-redis', { stdio: 'ignore' });
      } catch (e) {
        // Container doesn't exist, continue
      }

      // Create and start Redis container
      execSync(`docker run --name vasquez-redis -p 6379:6379 -d redis:7`);

      this.config.redis = {
        host: 'localhost',
        port: 6379,
      };

      console.log('✅ Redis container created and running');
      console.log('   Connection: redis://localhost:6379');
    } catch (error) {
      console.error('❌ Failed to setup Docker Redis:', error);
      process.exit(1);
    }
  }

  private async createEnvFile() {
    console.log('\n📝 Creating .env.local file...');

    const databaseUrl = `postgresql://${this.config.database.user}:${this.config.database.password}@${this.config.database.host}:${this.config.database.port}/${this.config.database.name}`;
    const redisUrl = this.config.redis.password
      ? `redis://:${this.config.redis.password}@${this.config.redis.host}:${this.config.redis.port}`
      : `redis://${this.config.redis.host}:${this.config.redis.port}`;

    const envContent = `# Generated by setup script
# ========================================
# APPLICATION SETTINGS
# ========================================
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000

# ========================================
# DATABASE
# ========================================
DATABASE_URL="${databaseUrl}"
TEST_DATABASE_URL="${databaseUrl.replace('vasquez_law_db', 'vasquez_law_test')}"

# ========================================
# REDIS CACHE
# ========================================
REDIS_HOST=${this.config.redis.host}
REDIS_PORT=${this.config.redis.port}
REDIS_PASSWORD=${this.config.redis.password || ''}
BULL_REDIS_URL=${redisUrl}

# ========================================
# AI & MACHINE LEARNING
# ========================================
OPENAI_API_KEY=${this.config.services.openai || ''}
ANTHROPIC_API_KEY=${this.config.services.anthropic || ''}

# ========================================
# VOICE AI INTEGRATION (RETELL)
# ========================================
RETELL_API_KEY=${this.config.services.retell || ''}
RETELL_PHONE_NUMBER=
RETELL_IMMIGRATION_AGENT_ID=
RETELL_PERSONAL_INJURY_AGENT_ID=
RETELL_CRIMINAL_DEFENSE_AGENT_ID=
RETELL_WORKERS_COMP_AGENT_ID=
RETELL_GENERAL_AGENT_ID=

# ========================================
# SMS NOTIFICATIONS (Handled by GoHighLevel)
# ========================================
# SMS functionality is provided through GoHighLevel integration

# ========================================
# PAYMENT PROCESSING
# ========================================
STRIPE_PUBLIC_KEY=${this.config.services.stripe?.publicKey || ''}
STRIPE_SECRET_KEY=${this.config.services.stripe?.secretKey || ''}
STRIPE_WEBHOOK_SECRET=

AUTHORIZENET_LOGIN_ID=${this.config.services.authorizenet?.loginId || ''}
AUTHORIZENET_TRANSACTION_KEY=${this.config.services.authorizenet?.transactionKey || ''}

LAWPAY_MERCHANT_ID=${this.config.services.lawpay?.merchantId || ''}
LAWPAY_PUBLIC_KEY=${this.config.services.lawpay?.publicKey || ''}
LAWPAY_SECRET_KEY=${this.config.services.lawpay?.secretKey || ''}

# ========================================
# EMAIL SERVICE
# ========================================
RESEND_API_KEY=${this.config.services.resend || ''}
EMAIL_FROM=leads@vasquezlawfirm.com

# ========================================
# ERROR TRACKING
# ========================================
SENTRY_DSN=${this.config.services.sentry || ''}

# ========================================
# SECURITY & AUTHENTICATION
# ========================================
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=${this.generateSecret()}
JWT_SECRET=${this.generateSecret()}

# ========================================
# FEATURE FLAGS
# ========================================
ENABLE_AI_CHAT=${this.config.services.openai || this.config.services.anthropic ? 'true' : 'false'}
ENABLE_VOICE_ASSISTANT=${this.config.services.retell ? 'true' : 'false'}
ENABLE_VOICE_AGENTS=${this.config.services.retell ? 'true' : 'false'}
ENABLE_CHAT_WIDGET=true
ENABLE_AI_ANALYSIS=${this.config.services.openai || this.config.services.anthropic ? 'true' : 'false'}
ENABLE_BLOCKCHAIN=false
ENABLE_SEO_AGENT=true

# ========================================
# DEVELOPMENT
# ========================================
LOG_LEVEL=debug
ANALYZE=false
`;

    fs.writeFileSync(path.join(process.cwd(), '.env.local'), envContent);
    console.log('✅ Created .env.local file');
  }

  private generateSecret(): string {
    return require('crypto').randomBytes(32).toString('hex');
  }

  private async setupDatabase() {
    console.log('\n🗄️  Setting up database...');

    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: `postgresql://${this.config.database.user}:${this.config.database.password}@${this.config.database.host}:${this.config.database.port}/postgres`,
        },
      },
    });

    try {
      // Create database if it doesn't exist
      await prisma.$executeRawUnsafe(`CREATE DATABASE ${this.config.database.name}`);
      console.log(`✅ Created database: ${this.config.database.name}`);
    } catch (error: any) {
      if (error.code === 'P2010' && error.message.includes('already exists')) {
        console.log(`✅ Database already exists: ${this.config.database.name}`);
      } else {
        console.error('❌ Database setup error:', error);
      }
    } finally {
      await prisma.$disconnect();
    }
  }

  private async installDependencies() {
    console.log('\n📦 Installing dependencies...');

    try {
      execSync('npm install', { stdio: 'inherit' });
      console.log('✅ Dependencies installed');
    } catch (error) {
      console.error('❌ Failed to install dependencies:', error);
      process.exit(1);
    }
  }

  private async runMigrations() {
    console.log('\n🔄 Running database migrations...');

    try {
      execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
      console.log('✅ Migrations completed');
    } catch (error) {
      console.error('❌ Migration error:', error);
      process.exit(1);
    }
  }

  private async seedDatabase() {
    console.log('\n🌱 Seeding database...');

    try {
      execSync('npm run prisma:seed', { stdio: 'inherit' });
      console.log('✅ Database seeded');
    } catch (error) {
      console.error('❌ Seeding error:', error);
    }
  }

  private async testConnections() {
    console.log('\n🧪 Testing connections...');

    // Test database connection
    const prisma = new PrismaClient();
    try {
      await prisma.$connect();
      console.log('✅ Database connection successful');
      await prisma.$disconnect();
    } catch (error) {
      console.error('❌ Database connection failed:', error);
    }

    // Test Redis connection (if configured)
    if (this.config.redis.host) {
      try {
        const Redis = require('ioredis');
        const redis = new Redis({
          host: this.config.redis.host,
          port: this.config.redis.port,
          password: this.config.redis.password,
        });

        await redis.ping();
        console.log('✅ Redis connection successful');
        redis.disconnect();
      } catch (error) {
        console.error('❌ Redis connection failed:', error);
      }
    }
  }
}

// Run setup
const setup = new FullStackSetup();
setup
  .run()
  .catch(console.error)
  .finally(() => {
    rl.close();
    process.exit(0);
  });
