#!/usr/bin/env node

import { logger } from '../src/lib/logger';
import dotenv from 'dotenv';
import path from 'path';
import chalk from 'chalk';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function setupRedis() {
  console.log(chalk.bold.red('\n🔧 Redis Setup Options\n'));
  console.log('='.repeat(50));

  console.log(chalk.bold.cyan('\n📋 Current Status:'));
  console.log(`- MOCK_REDIS: ${process.env.MOCK_REDIS || 'Not set'}`);
  console.log(`- REDIS_URL: ${process.env.REDIS_URL || 'Not set'}`);

  if (process.env.MOCK_REDIS === 'true') {
    console.log(chalk.yellow('\n⚠️  Currently using Mock Redis (in-memory cache)'));
    console.log('This is fine for development but not recommended for production.');
  }

  console.log(chalk.bold.green('\n🚀 Redis Setup Options:\n'));

  // Option 1: Local Redis
  console.log(chalk.bold.yellow('Option 1: Local Redis (Development)'));
  console.log('Perfect for local development and testing\n');

  console.log('Installation:');
  console.log(chalk.gray('# macOS'));
  console.log(chalk.cyan('brew install redis'));
  console.log(chalk.cyan('brew services start redis'));

  console.log(chalk.gray('\n# Ubuntu/Debian'));
  console.log(chalk.cyan('sudo apt-get update'));
  console.log(chalk.cyan('sudo apt-get install redis-server'));
  console.log(chalk.cyan('sudo systemctl start redis'));

  console.log(chalk.gray('\n# Windows (WSL2)'));
  console.log(chalk.cyan('sudo apt update'));
  console.log(chalk.cyan('sudo apt install redis-server'));
  console.log(chalk.cyan('sudo service redis-server start'));

  console.log('\nConfiguration:');
  console.log(chalk.green('MOCK_REDIS=false'));
  console.log(chalk.green('REDIS_URL=redis://localhost:6379'));

  // Option 2: Redis Cloud
  console.log(chalk.bold.yellow('\n\nOption 2: Redis Cloud (Free Tier - 30MB)'));
  console.log('Best for: Small production apps, testing\n');

  console.log('Setup:');
  console.log('1. Go to https://redis.com/try-free/');
  console.log('2. Sign up for free account');
  console.log('3. Create new database (choose Free tier)');
  console.log('4. Select cloud provider and region close to your users');
  console.log('5. Get connection string from database details');

  console.log('\nConfiguration:');
  console.log(chalk.green('MOCK_REDIS=false'));
  console.log(
    chalk.green(
      'REDIS_URL=redis://default:password@redis-12345.c1.us-east-1.aws.cloud.redislabs.com:12345'
    )
  );

  // Option 3: Upstash Redis
  console.log(chalk.bold.yellow('\n\nOption 3: Upstash Redis (Serverless)'));
  console.log('Best for: Serverless deployments, pay-per-request\n');

  console.log('Setup:');
  console.log('1. Go to https://upstash.com/');
  console.log('2. Sign up (GitHub login available)');
  console.log('3. Create new Redis database');
  console.log('4. Choose region close to Vercel deployment');
  console.log('5. Copy REST URL and token');

  console.log('\nConfiguration:');
  console.log(chalk.green('MOCK_REDIS=false'));
  console.log(chalk.green('UPSTASH_REDIS_REST_URL=https://xxx.upstash.io'));
  console.log(chalk.green('UPSTASH_REDIS_REST_TOKEN=your-token'));
  console.log('\nNote: Requires @upstash/redis package instead of ioredis');

  // Option 4: Vercel KV
  console.log(chalk.bold.yellow('\n\nOption 4: Vercel KV (Integrated with Vercel)'));
  console.log('Best for: Vercel deployments, automatic integration\n');

  console.log('Setup:');
  console.log('1. In Vercel dashboard, go to Storage');
  console.log('2. Create new KV database');
  console.log('3. Connect to your project');
  console.log('4. Environment variables auto-configured');

  console.log('\nConfiguration:');
  console.log(chalk.green('# Automatically set by Vercel'));
  console.log(chalk.green('KV_URL=...'));
  console.log(chalk.green('KV_REST_API_URL=...'));
  console.log(chalk.green('KV_REST_API_TOKEN=...'));

  // Option 5: AWS ElastiCache
  console.log(chalk.bold.yellow('\n\nOption 5: AWS ElastiCache (Enterprise)'));
  console.log('Best for: High-performance production apps\n');

  console.log('Requires AWS account and VPC setup');
  console.log('More complex but highly scalable');

  console.log(chalk.bold.cyan('\n\n📊 Comparison:\n'));
  console.log('┌─────────────────┬──────────┬─────────────┬────────────┬─────────────┐');
  console.log('│ Option          │ Cost     │ Performance │ Setup      │ Best For    │');
  console.log('├─────────────────┼──────────┼─────────────┼────────────┼─────────────┤');
  console.log('│ Local Redis     │ Free     │ Excellent   │ Easy       │ Development │');
  console.log('│ Redis Cloud     │ Free-$   │ Good        │ Easy       │ Small Apps  │');
  console.log('│ Upstash         │ Pay/Use  │ Good        │ Easy       │ Serverless  │');
  console.log('│ Vercel KV       │ Pay/Use  │ Good        │ Very Easy  │ Vercel Apps │');
  console.log('│ AWS ElastiCache │ $$       │ Excellent   │ Complex    │ Enterprise  │');
  console.log('└─────────────────┴──────────┴─────────────┴────────────┴─────────────┘');

  console.log(chalk.bold.green('\n\n🎯 Recommendation:'));
  console.log('\nFor Vasquez Law Firm Website:');
  console.log(
    '1. ' + chalk.cyan('Development') + ': Use Mock Redis (current setup) or Local Redis'
  );
  console.log('2. ' + chalk.cyan('Production') + ': Use Upstash or Redis Cloud');
  console.log('   - Upstash if deploying to Vercel (serverless-friendly)');
  console.log('   - Redis Cloud if you need persistent connections');

  console.log(chalk.bold.yellow('\n\n🔄 Quick Setup Commands:\n'));

  console.log(chalk.bold('For Upstash (Recommended for Vercel):'));
  console.log(chalk.cyan('npm install @upstash/redis'));
  console.log(chalk.gray('# Then update src/lib/cache/redis.ts to use Upstash client'));

  console.log(chalk.bold('\nFor Redis Cloud/Local:'));
  console.log(chalk.gray('# Already installed (ioredis)'));
  console.log(chalk.gray('# Just update REDIS_URL in .env.local'));

  console.log(chalk.bold.blue('\n\n📝 Next Steps:'));
  console.log('1. Choose your Redis option based on your needs');
  console.log('2. Sign up for the service (if using cloud option)');
  console.log('3. Update .env.local with connection details');
  console.log('4. Set MOCK_REDIS=false');
  console.log('5. Test with: ' + chalk.yellow('npx tsx scripts/test-redis-connection.ts'));

  console.log('\n' + '='.repeat(50));
}

// Run setup
setupRedis().catch(error => {
  console.error('Setup failed:', error);
  process.exit(1);
});
