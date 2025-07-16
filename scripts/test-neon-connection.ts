#!/usr/bin/env tsx

import { Client } from 'pg';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import chalk from 'chalk';

// Load environment variables
dotenv.config();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_eCqcU6ELgvJ5@ep-old-mode-a4bj2csn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require';

console.log(chalk.blue('=== Neon Database Connection Debugger ===\n'));

// Parse connection string
function parseConnectionString(url: string) {
  try {
    const parsedUrl = new URL(url);
    return {
      user: parsedUrl.username,
      password: parsedUrl.password,
      host: parsedUrl.hostname,
      port: parsedUrl.port || '5432',
      database: parsedUrl.pathname.slice(1).split('?')[0],
      ssl: parsedUrl.searchParams.get('sslmode') || 'require',
    };
  } catch (error) {
    console.error(chalk.red('Failed to parse connection string:'), error);
    return null;
  }
}

// Test 1: Basic node-pg connection with different SSL configurations
async function testPgConnection() {
  console.log(chalk.yellow('\n📡 Test 1: Testing node-pg connection...\n'));

  const config = parseConnectionString(DATABASE_URL);
  if (!config) return false;

  // Test different SSL configurations
  const sslConfigs = [
    { name: 'SSL Required', ssl: { rejectUnauthorized: false } },
    { name: 'SSL with SNI', ssl: { rejectUnauthorized: false, servername: config.host } },
    { name: 'SSL Prefer', ssl: true },
    { name: 'No SSL', ssl: false },
  ];

  for (const sslConfig of sslConfigs) {
    console.log(chalk.cyan(`Testing with ${sslConfig.name}...`));

    const client = new Client({
      user: config.user,
      password: config.password,
      host: config.host,
      port: parseInt(config.port),
      database: config.database,
      ssl: sslConfig.ssl,
      connectionTimeoutMillis: 10000,
    });

    try {
      await client.connect();
      const result = await client.query('SELECT NOW()');
      console.log(chalk.green(`✅ Success with ${sslConfig.name}!`));
      console.log(chalk.gray(`   Server time: ${result.rows[0].now}`));
      await client.end();
      return true;
    } catch (error: any) {
      console.log(chalk.red(`❌ Failed with ${sslConfig.name}:`));
      console.log(chalk.gray(`   Error: ${error.message}`));
    }
  }
  return false;
}

// Test 2: Test different connection endpoints
async function testEndpoints() {
  console.log(chalk.yellow('\n🔌 Test 2: Testing different Neon endpoints...\n'));

  const config = parseConnectionString(DATABASE_URL);
  if (!config) return false;

  // Extract base hostname and try variations
  const baseHost = config.host.replace('-pooler', '');
  const endpoints = [
    { name: 'Pooler Endpoint', host: config.host },
    { name: 'Direct Endpoint', host: baseHost },
  ];

  for (const endpoint of endpoints) {
    console.log(chalk.cyan(`Testing ${endpoint.name}...`));

    const client = new Client({
      user: config.user,
      password: config.password,
      host: endpoint.host,
      port: parseInt(config.port),
      database: config.database,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 10000,
    });

    try {
      await client.connect();
      const result = await client.query('SELECT version()');
      console.log(chalk.green(`✅ ${endpoint.name} works!`));
      console.log(chalk.gray(`   PostgreSQL: ${result.rows[0].version.split(' ')[1]}`));
      await client.end();
    } catch (error: any) {
      console.log(chalk.red(`❌ ${endpoint.name} failed:`));
      console.log(chalk.gray(`   Error: ${error.message}`));
    }
  }
}

// Test 3: DNS resolution
async function testDNS() {
  console.log(chalk.yellow('\n🌐 Test 3: Testing DNS resolution...\n'));

  const config = parseConnectionString(DATABASE_URL);
  if (!config) return;

  const dns = await import('dns').then(m => m.promises);

  try {
    const addresses = await dns.resolve4(config.host);
    console.log(chalk.green(`✅ DNS resolved ${config.host}:`));
    addresses.forEach(addr => console.log(chalk.gray(`   ${addr}`)));
  } catch (error: any) {
    console.log(chalk.red(`❌ DNS resolution failed:`));
    console.log(chalk.gray(`   Error: ${error.message}`));
  }
}

// Test 4: Test with Prisma
async function testPrisma() {
  console.log(chalk.yellow('\n🔷 Test 4: Testing Prisma connection...\n'));

  // Create a new Prisma client with explicit datasource
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
    log: ['error', 'warn'],
  });

  try {
    // Test connection
    await prisma.$connect();
    console.log(chalk.green('✅ Prisma connected successfully!'));

    // Test a simple query
    const count = await prisma.user.count();
    console.log(chalk.gray(`   User count: ${count}`));

    await prisma.$disconnect();
  } catch (error: any) {
    console.log(chalk.red('❌ Prisma connection failed:'));
    console.log(chalk.gray(`   Error: ${error.message}`));

    // Additional error details for Prisma
    if (error.code) {
      console.log(chalk.gray(`   Error code: ${error.code}`));
    }
    if (error.meta) {
      console.log(chalk.gray(`   Meta: ${JSON.stringify(error.meta, null, 2)}`));
    }
  }
}

// Test 5: Network connectivity
async function testNetworkConnectivity() {
  console.log(chalk.yellow('\n🌍 Test 5: Testing network connectivity...\n'));

  const config = parseConnectionString(DATABASE_URL);
  if (!config) return;

  const net = await import('net');

  return new Promise<void>(resolve => {
    const socket = new net.Socket();
    const timeout = setTimeout(() => {
      socket.destroy();
      console.log(chalk.red(`❌ Connection timeout to ${config.host}:${config.port}`));
      resolve();
    }, 5000);

    socket.connect(parseInt(config.port), config.host, () => {
      clearTimeout(timeout);
      console.log(chalk.green(`✅ TCP connection successful to ${config.host}:${config.port}`));
      socket.end();
      resolve();
    });

    socket.on('error', err => {
      clearTimeout(timeout);
      console.log(chalk.red(`❌ TCP connection failed:`));
      console.log(chalk.gray(`   Error: ${err.message}`));
      resolve();
    });
  });
}

// Generate working connection string
function generateWorkingConnectionString(config: any, workingSSL: any) {
  const baseUrl = `postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;

  if (workingSSL === false) {
    return `${baseUrl}?sslmode=disable`;
  } else if (typeof workingSSL === 'object') {
    return `${baseUrl}?sslmode=require`;
  } else {
    return `${baseUrl}?sslmode=prefer`;
  }
}

// Main execution
async function main() {
  console.log(chalk.blue('Connection String:'));
  console.log(chalk.gray(DATABASE_URL.replace(/:[^:@]+@/, ':***@')));

  const config = parseConnectionString(DATABASE_URL);
  if (config) {
    console.log(chalk.blue('\nParsed Configuration:'));
    console.log(chalk.gray(`  Host: ${config.host}`));
    console.log(chalk.gray(`  Port: ${config.port}`));
    console.log(chalk.gray(`  Database: ${config.database}`));
    console.log(chalk.gray(`  User: ${config.user}`));
    console.log(chalk.gray(`  SSL Mode: ${config.ssl}`));
  }

  // Run all tests
  await testNetworkConnectivity();
  await testDNS();
  const pgWorked = await testPgConnection();
  await testEndpoints();
  await testPrisma();

  // Summary and recommendations
  console.log(chalk.blue('\n=== Summary & Recommendations ===\n'));

  if (pgWorked) {
    console.log(chalk.green('✅ Database connection is possible!'));
    console.log(chalk.yellow('\nRecommended fixes:'));
    console.log(chalk.gray('1. Update your .env file with the working SSL configuration'));
    console.log(chalk.gray('2. Ensure Prisma is using the correct SSL settings'));
    console.log(chalk.gray('3. Consider using the pooler endpoint for better performance'));
  } else {
    console.log(chalk.red('❌ Database connection failed with all configurations'));
    console.log(chalk.yellow('\nTroubleshooting steps:'));
    console.log(chalk.gray('1. Verify your Neon dashboard that the database is active'));
    console.log(chalk.gray('2. Check if the connection string in Neon matches your .env'));
    console.log(chalk.gray('3. Try regenerating the password in Neon dashboard'));
    console.log(chalk.gray('4. Ensure your IP is not blocked by any firewall rules'));
  }

  // Create a test connection module
  console.log(chalk.blue('\n=== Creating test connection module ===\n'));

  const testModule = `// Auto-generated database connection test module
import { Client } from 'pg';

export async function testDatabaseConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    const result = await client.query('SELECT NOW()');
    await client.end();
    return {
      success: true,
      timestamp: result.rows[0].now
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
`;

  fs.writeFileSync(path.join(process.cwd(), 'src/lib/db-test.ts'), testModule);

  console.log(chalk.green('✅ Created src/lib/db-test.ts for testing'));
}

main().catch(console.error);
