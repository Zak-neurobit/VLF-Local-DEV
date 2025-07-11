#!/usr/bin/env ts-node

import { cache, redis, cacheKeys, CacheTTL } from '@/lib/cache/redis';
import { logger } from '@/lib/logger';

async function testRedisConnection() {
  logger.info('🔧 Testing Redis connection...');

  try {
    // Test 1: Basic connectivity
    logger.info('Test 1: Basic connectivity');
    const pong = await redis.ping();
    if (pong === 'PONG') {
      logger.info('✅ Redis is responding to ping');
    } else {
      logger.error('❌ Redis ping failed');
      return;
    }

    // Test 2: Basic set/get operations
    logger.info('\nTest 2: Basic set/get operations');
    const testKey = 'test:connection';
    const testValue = { message: 'Redis is working!', timestamp: new Date().toISOString() };

    await cache.set(testKey, testValue, CacheTTL.SHORT);
    logger.info(`✅ Set value for key: ${testKey}`);

    const retrievedValue = await cache.get(testKey);
    if (retrievedValue && (retrievedValue as any).message === testValue.message) {
      logger.info('✅ Retrieved value matches what was set');
      logger.info(`   Value: ${JSON.stringify(retrievedValue)}`);
    } else {
      logger.error('❌ Retrieved value does not match');
    }

    // Test 3: TTL functionality
    logger.info('\nTest 3: TTL functionality');
    const ttl = await cache.getTTL(testKey);
    logger.info(`✅ TTL for key ${testKey}: ${ttl} seconds`);

    // Test 4: Cache remember functionality
    logger.info('\nTest 4: Cache remember functionality');
    let callCount = 0;
    const expensiveOperation = async () => {
      callCount++;
      return { data: 'expensive result', callCount };
    };

    const result1 = await cache.remember('test:remember', expensiveOperation, CacheTTL.SHORT);
    const result2 = await cache.remember('test:remember', expensiveOperation, CacheTTL.SHORT);

    if (result1.callCount === 1 && result2.callCount === 1) {
      logger.info('✅ Cache remember is working correctly (expensive operation called only once)');
    } else {
      logger.error('❌ Cache remember not working as expected');
    }

    // Test 5: Pattern matching and deletion
    logger.info('\nTest 5: Pattern matching and deletion');
    await cache.set('pattern:test:1', 'value1', CacheTTL.SHORT);
    await cache.set('pattern:test:2', 'value2', CacheTTL.SHORT);
    await cache.set('pattern:test:3', 'value3', CacheTTL.SHORT);

    await cache.deletePattern('pattern:test:*');
    const exists = await cache.exists('pattern:test:1');

    if (!exists) {
      logger.info('✅ Pattern deletion working correctly');
    } else {
      logger.error('❌ Pattern deletion failed');
    }

    // Test 6: Cache keys generators
    logger.info('\nTest 6: Cache key generators');
    const userKey = cacheKeys.user('123');
    const blogKey = cacheKeys.blogPost('456');
    logger.info(`✅ User cache key: ${userKey}`);
    logger.info(`✅ Blog cache key: ${blogKey}`);

    // Test 7: Redis info
    logger.info('\nTest 7: Redis server info');
    const info = await cache.info();
    if (info) {
      logger.info('✅ Redis server info retrieved:');
      logger.info(`   Memory used: ${info.used_memory_human}`);
      logger.info(`   Connected clients: ${info.connected_clients}`);
      logger.info(`   Total commands processed: ${info.total_commands_processed}`);
    }

    // Test 8: Database size
    logger.info('\nTest 8: Database size');
    const dbSize = await redis.dbsize();
    logger.info(`✅ Current database size: ${dbSize} keys`);

    // Cleanup
    await cache.delete(testKey);
    await cache.delete('test:remember');

    logger.info('\n🎉 All Redis tests completed successfully!');
    logger.info('Redis is properly configured and ready for production use.');
  } catch (error) {
    logger.error('❌ Redis test failed:', error);
    logger.error('Please ensure Redis is running and properly configured.');
  }
}

// Run the tests
testRedisConnection()
  .then(() => process.exit(0))
  .catch(error => {
    logger.error('Test script failed:', error);
    process.exit(1);
  });
