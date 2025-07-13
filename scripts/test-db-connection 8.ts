#!/usr/bin/env node

import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
dotenv.config({ path: path.join(process.cwd(), '.env') });

console.log('🔍 Testing Database Connection...\n');

async function testConnection() {
  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set');
    console.log('\nPlease set DATABASE_URL in your .env or .env.local file');
    process.exit(1);
  }

  // Check if it's a local database
  const dbUrl = process.env.DATABASE_URL;
  const isLocal = dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1');
  
  console.log(`📊 Database URL: ${dbUrl.substring(0, 30)}...`);
  console.log(`📍 Database Type: ${isLocal ? 'Local' : 'Remote'}`);
  
  if (isLocal) {
    console.warn('⚠️  Warning: Attempting to connect to a local database');
    console.log('   Make sure your local database server is running\n');
  }

  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  });

  try {
    console.log('🔌 Attempting to connect...');
    await prisma.$connect();
    console.log('✅ Successfully connected to the database!\n');

    // Try to run a simple query
    console.log('📝 Running test query...');
    const userCount = await prisma.user.count();
    console.log(`✅ Query successful! Found ${userCount} users in the database.\n`);

    // Check tables
    console.log('📋 Checking database tables...');
    const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
      SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;
    `;
    
    if (tables.length > 0) {
      console.log(`✅ Found ${tables.length} tables:`);
      tables.forEach(t => console.log(`   - ${t.tablename}`));
    } else {
      console.warn('⚠️  No tables found. You may need to run migrations.');
      console.log('\nRun: npx prisma migrate deploy');
    }

  } catch (error) {
    console.error('\n❌ Failed to connect to the database:');
    
    if (error instanceof Error) {
      if (error.message.includes('P1001')) {
        console.error('   Database server is not reachable at the specified address.');
        if (isLocal) {
          console.log('\n💡 Tips for local database:');
          console.log('   1. Make sure PostgreSQL is installed and running');
          console.log('   2. Check if the database exists');
          console.log('   3. Verify the connection string in DATABASE_URL');
        }
      } else if (error.message.includes('P1002')) {
        console.error('   Database server was reached but timed out.');
      } else if (error.message.includes('P1003')) {
        console.error('   Database does not exist.');
        console.log('\n💡 Create the database with: createdb <database_name>');
      } else {
        console.error(`   ${error.message}`);
      }
    } else {
      console.error('   Unknown error occurred');
    }
    
    console.log('\n📚 Prisma Error Reference: https://www.prisma.io/docs/reference/api-reference/error-reference');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('\n🔌 Disconnected from database');
  }
}

// Run the test
testConnection().catch(console.error);