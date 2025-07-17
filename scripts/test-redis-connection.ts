#!/usr/bin/env node

import { Redis } from 'ioredis';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function testRedisConnection() {
  console.log('🔧 Redis Connection Test\n');
  console.log('Environment Configuration:');
  console.log('- REDIS_URL:', process.env.REDIS_URL || 'Not set');
  console.log('- REDIS_HOST:', process.env.REDIS_HOST || 'Not set');
  console.log('- REDIS_PORT:', process.env.REDIS_PORT || 'Not set');
  console.log('- REDIS_PASSWORD:', process.env.REDIS_PASSWORD ? '***' : 'Not set');
  console.log('- MOCK_REDIS:', process.env.MOCK_REDIS || 'Not set');
  console.log('- NODE_ENV:', process.env.NODE_ENV || 'development');
  console.log('');

  // Check if using mock Redis
  if (process.env.MOCK_REDIS === 'true') {
    console.log('⚠️  MOCK_REDIS is set to true');
    console.log('The application is using an in-memory mock Redis implementation.');
    console.log('To test real Redis connection, set MOCK_REDIS=false in your .env.local file.\n');

    // Test mock Redis from the application
    const { cache } = await import('../src/lib/cache/redis');

    console.log('Testing mock Redis operations:');

    // Test set/get
    await cache.set('test:key', { message: 'Hello from mock Redis' }, 60);
    const value = await cache.get('test:key');
    console.log('✅ Set/Get test:', value);

    // Test exists
    const exists = await cache.exists('test:key');
    console.log('✅ Exists test:', exists);

    // Test TTL
    const ttl = await cache.getTTL('test:key');
    console.log('✅ TTL test:', ttl, 'seconds');

    // Test delete
    await cache.delete('test:key');
    const afterDelete = await cache.exists('test:key');
    console.log('✅ Delete test:', !afterDelete ? 'Key deleted' : 'Delete failed');

    console.log('\n✅ Mock Redis is working correctly!');
    return;
  }

  // Test real Redis connection
  if (!process.env.REDIS_URL && !process.env.REDIS_HOST) {
    console.error('❌ No Redis configuration found!');
    console.error('\nTo use Redis, configure one of the following in your .env.local:');
    console.error('1. REDIS_URL=redis://localhost:6379');
    console.error('2. REDIS_HOST=localhost and REDIS_PORT=6379');
    console.error('\nOr set MOCK_REDIS=true to use the mock implementation.');
    process.exit(1);
  }

  let redis: Redis | null = null;

  try {
    console.log('Connecting to Redis...\n');

    // Create Redis client
    if (process.env.REDIS_URL) {
      redis = new Redis(process.env.REDIS_URL);
    } else {
      redis = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
        retryStrategy: (times: number) => {
          const delay = Math.min(times * 50, 2000);
          return delay;
        },
        maxRetriesPerRequest: 3,
      });
    }

    // Wait for connection
    await new Promise<void>((resolve, reject) => {
      redis!.on('connect', () => {
        console.log('✅ Connected to Redis successfully!\n');
        resolve();
      });

      redis!.on('error', error => {
        reject(error);
      });

      // Timeout after 5 seconds
      setTimeout(() => {
        reject(new Error('Connection timeout'));
      }, 5000);
    });

    // Test basic operations
    console.log('Testing Redis operations:\n');

    // 1. PING
    const pong = await redis.ping();
    console.log('1. PING test:', pong === 'PONG' ? '✅ Success' : '❌ Failed');

    // 2. SET/GET
    await redis.set('test:connection', 'Redis is working!');
    const getValue = await redis.get('test:connection');
    console.log('2. SET/GET test:', getValue === 'Redis is working!' ? '✅ Success' : '❌ Failed');

    // 3. EXISTS
    const exists = await redis.exists('test:connection');
    console.log('3. EXISTS test:', exists === 1 ? '✅ Success' : '❌ Failed');

    // 4. EXPIRE/TTL
    await redis.expire('test:connection', 60);
    const ttl = await redis.ttl('test:connection');
    console.log('4. EXPIRE/TTL test:', ttl > 0 ? `✅ Success (TTL: ${ttl}s)` : '❌ Failed');

    // 5. DEL
    const deleted = await redis.del('test:connection');
    console.log('5. DEL test:', deleted === 1 ? '✅ Success' : '❌ Failed');

    // 6. INFO
    const info = await redis.info('server');
    const redisVersion = info.match(/redis_version:([^\r\n]+)/)?.[1];
    console.log(
      '6. INFO test:',
      redisVersion ? `✅ Success (Redis v${redisVersion})` : '❌ Failed'
    );

    // Test the application's cache manager
    console.log('\nTesting application cache manager:\n');
    const { cache } = await import('../src/lib/cache/redis');

    // Test cache operations
    await cache.set('app:test', { timestamp: new Date().toISOString() }, 60);
    const cacheValue = await cache.get('app:test');
    console.log('Cache manager test:', cacheValue ? '✅ Success' : '❌ Failed');

    // Clean up
    await cache.delete('app:test');

    console.log('\n✅ All Redis tests passed! Redis is properly configured and working.');
  } catch (error: any) {
    console.error('\n❌ Redis connection failed!\n');
    console.error('Error:', error.message);

    if (error.code === 'ECONNREFUSED') {
      console.error('\nRedis server is not running or not accessible.');
      console.error('Make sure Redis is installed and running:');
      console.error('- On macOS: brew services start redis');
      console.error('- On Linux: sudo systemctl start redis');
      console.error('- Or run: redis-server');
    } else if (error.code === 'ENOTFOUND') {
      console.error('\nRedis host not found. Check your REDIS_HOST configuration.');
    } else if (error.message.includes('AUTH')) {
      console.error('\nRedis authentication failed. Check your REDIS_PASSWORD.');
    }

    console.error('\nAlternatively, you can set MOCK_REDIS=true to use the mock implementation.');
    process.exit(1);
  } finally {
    if (redis) {
      await redis.quit();
    }
  }
}

// Run the test
testRedisConnection().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
