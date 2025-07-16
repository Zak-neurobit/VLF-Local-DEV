#!/usr/bin/env tsx
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env') });
dotenv.config({ path: path.join(process.cwd(), '.env.local'), override: true });

async function fixPrismaConnection() {
  console.log('🔧 Fixing Prisma Connection...\n');

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('❌ DATABASE_URL not found');
    return;
  }

  // Method 1: Try with connection string parameters
  console.log('📡 Method 1: Adding connection parameters...');
  const urlWithParams = dbUrl.includes('?')
    ? `${dbUrl}&connect_timeout=30`
    : `${dbUrl}?connect_timeout=30`;

  process.env.DATABASE_URL = urlWithParams;

  const prisma1 = new PrismaClient({
    log: ['error', 'warn'],
    datasources: {
      db: {
        url: urlWithParams,
      },
    },
  });

  try {
    await prisma1.$connect();
    console.log('✅ Method 1 successful!');

    const count = await prisma1.blogPost.count();
    console.log(`📊 BlogPost count: ${count}`);

    await prisma1.$disconnect();
  } catch (error) {
    console.error('❌ Method 1 failed:', (error as Error).message);
  }

  // Method 2: Try with NODE_TLS_REJECT_UNAUTHORIZED
  console.log('\n📡 Method 2: Disabling TLS verification...');
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const prisma2 = new PrismaClient({
    log: ['error', 'warn'],
  });

  try {
    await prisma2.$connect();
    console.log('✅ Method 2 successful!');

    const count = await prisma2.blogPost.count();
    console.log(`📊 BlogPost count: ${count}`);

    await prisma2.$disconnect();

    console.log('\n✅ SOLUTION FOUND!');
    console.log('Add this to your .env or .env.local:');
    console.log('NODE_TLS_REJECT_UNAUTHORIZED=0');
  } catch (error) {
    console.error('❌ Method 2 failed:', (error as Error).message);
  } finally {
    // Reset for safety
    delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
  }

  // Method 3: Try without pooler
  console.log('\n📡 Method 3: Direct connection (no pooler)...');
  const directUrl = dbUrl.replace('-pooler', '');

  const prisma3 = new PrismaClient({
    log: ['error', 'warn'],
    datasources: {
      db: {
        url: directUrl,
      },
    },
  });

  try {
    await prisma3.$connect();
    console.log('✅ Method 3 successful!');

    const count = await prisma3.blogPost.count();
    console.log(`📊 BlogPost count: ${count}`);

    await prisma3.$disconnect();

    console.log('\n✅ ALTERNATIVE SOLUTION!');
    console.log('Use the direct connection URL (without -pooler)');
  } catch (error) {
    console.error('❌ Method 3 failed:', (error as Error).message);
  }

  console.log('\n💡 Final Recommendations:');
  console.log('1. Add NODE_TLS_REJECT_UNAUTHORIZED=0 to your environment');
  console.log('2. Or use the direct connection URL without -pooler');
  console.log('3. For production, use proper SSL certificates');
}

// Run the fix
fixPrismaConnection().catch(console.error);
