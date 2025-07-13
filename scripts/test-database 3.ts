#!/usr/bin/env node
import * as dotenv from 'dotenv';
import { join } from 'path';

// Load .env.local explicitly
dotenv.config({ path: join(process.cwd(), '.env.local') });

async function testDatabase() {
  console.log('Testing database connection...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 50) + '...');

  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient({
      log: ['error'],
    });

    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully!');

    // Test a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Query executed successfully:', result);

    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  }
}

testDatabase();
