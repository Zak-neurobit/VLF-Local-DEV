'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CacheTTL = exports.cacheKeys = exports.cache = exports.bullRedis = exports.redis = void 0;
exports.Cacheable = Cacheable;
const ioredis_1 = __importDefault(require('ioredis'));
const logger_1 = require('../../lib/logger');
// Redis connection configuration
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy: times => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
  enableOfflineQueue: true,
  lazyConnect: true,
};
// Create Redis client instances
exports.redis = new ioredis_1.default(redisConfig);
exports.bullRedis = new ioredis_1.default(redisConfig); // Separate instance for Bull queues
// Connect and handle events
exports.redis.connect().catch(err => logger_1.logger.error('Redis connection failed:', err));
exports.bullRedis
  .connect()
  .catch(err => logger_1.logger.error('Bull Redis connection failed:', err));
exports.redis.on('connect', () => {
  logger_1.logger.info('Redis connected successfully');
});
exports.redis.on('error', error => {
  logger_1.logger.error('Redis connection error:', error);
});
exports.redis.on('close', () => {
  logger_1.logger.warn('Redis connection closed');
});
class CacheManager {
  constructor() {
    this.defaultTTL = 300; // 5 minutes
    this.isConnected = false;
    // Multi-level caching with memory + Redis
    this.memoryCache = new Map();
    this.redis = exports.redis;
    this.redis.on('connect', () => {
      this.isConnected = true;
    });
    this.redis.on('close', () => {
      this.isConnected = false;
    });
  }
  async get(key) {
    const start = Date.now();
    try {
      const value = await this.redis.get(key);
      logger_1.performanceLogger.measure('cache-get', Date.now() - start, { key, hit: !!value });
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }
  async set(key, value, ttl = this.defaultTTL) {
    const start = Date.now();
    try {
      await this.redis.setex(key, ttl, JSON.stringify(value));
      logger_1.performanceLogger.measure('cache-set', Date.now() - start, { key, ttl });
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }
  async invalidate(pattern) {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
  // Cache wrapper for expensive operations
  async remember(key, factory, ttl = this.defaultTTL) {
    const cached = await this.get(key);
    if (cached !== null) {
      return cached;
    }
    const value = await factory();
    await this.set(key, value, ttl);
    return value;
  }
  async getWithMemory(key) {
    // Check memory first
    const memCached = this.memoryCache.get(key);
    if (memCached && memCached.expires > Date.now()) {
      return memCached.value;
    }
    // Then check Redis
    const value = await this.get(key);
    if (value !== null) {
      // Store in memory for 60 seconds
      this.memoryCache.set(key, {
        value,
        expires: Date.now() + 60000,
      });
    }
    return value;
  }
  async delete(key) {
    try {
      await this.redis.del(key);
      this.memoryCache.delete(key);
    } catch (error) {
      logger_1.logger.error(`Cache delete error for key ${key}:`, error);
    }
  }
  async deletePattern(pattern) {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
        // Clear matching keys from memory cache
        for (const [key] of this.memoryCache) {
          if (key.match(pattern.replace('*', '.*'))) {
            this.memoryCache.delete(key);
          }
        }
      }
    } catch (error) {
      logger_1.logger.error(`Cache delete pattern error for ${pattern}:`, error);
    }
  }
  async exists(key) {
    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      logger_1.logger.error(`Cache exists error for key ${key}:`, error);
      return false;
    }
  }
  async flush() {
    try {
      await this.redis.flushdb();
      this.memoryCache.clear();
      logger_1.logger.info('Cache flushed successfully');
    } catch (error) {
      logger_1.logger.error('Cache flush error:', error);
    }
  }
  async info() {
    try {
      const info = await this.redis.info();
      const lines = info.split('\r\n');
      const stats = {};
      lines.forEach(line => {
        const [key, value] = line.split(':');
        if (key && value) {
          stats[key] = value;
        }
      });
      return {
        used_memory: stats.used_memory || 'N/A',
        used_memory_human: stats.used_memory_human || 'N/A',
        connected_clients: stats.connected_clients || 'N/A',
        total_connections_received: stats.total_connections_received || 'N/A',
        total_commands_processed: stats.total_commands_processed || 'N/A',
      };
    } catch (error) {
      logger_1.logger.error('Cache info error:', error);
      return null;
    }
  }
}
exports.cache = new CacheManager();
// Cache key generators
exports.cacheKeys = {
  // User cache keys
  user: id => `user:${id}`,
  userByEmail: email => `user:email:${email}`,
  userSessions: userId => `user:${userId}:sessions`,
  // Case cache keys
  case: id => `case:${id}`,
  casesByUser: userId => `cases:user:${userId}`,
  casesByAttorney: attorneyId => `cases:attorney:${attorneyId}`,
  // Blog cache keys
  blogPost: id => `blog:${id}`,
  blogPostBySlug: slug => `blog:slug:${slug}`,
  blogPostsByPracticeArea: (area, lang) => `blog:area:${area}:${lang}`,
  blogPostsList: (page, limit) => `blog:list:${page}:${limit}`,
  // SEO cache keys
  seoAnalysis: postId => `seo:analysis:${postId}`,
  keywords: (practiceArea, lang) => `keywords:${practiceArea}:${lang}`,
  competitorAnalysis: domain => `competitor:${domain}`,
  // API response cache keys
  apiResponse: (endpoint, params) => `api:${endpoint}:${params}`,
  // Session cache keys
  session: sessionId => `session:${sessionId}`,
  // Rate limiting keys
  rateLimit: (ip, endpoint) => `ratelimit:${ip}:${endpoint}`,
  // Temporary data keys
  tempData: key => `temp:${key}`,
  // Voice call cache keys
  call: callId => `call:${callId}`,
  callTranscript: callId => `call:${callId}:transcript`,
  // Chat cache keys
  conversation: id => `conversation:${id}`,
  chatHistory: userId => `chat:history:${userId}`,
  // Payment cache keys
  paymentSession: sessionId => `payment:session:${sessionId}`,
  paymentIntent: intentId => `payment:intent:${intentId}`,
};
// Decorator for caching method results
function Cacheable(ttl = 300) {
  return function (target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
      const cacheKey = `${target.constructor.name}:${propertyKey}:${JSON.stringify(args)}`;
      return exports.cache.remember(
        cacheKey,
        async () => {
          return originalMethod.apply(this, args);
        },
        ttl
      );
    };
    return descriptor;
  };
}
// Cache TTL presets
exports.CacheTTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  EXTRA_LONG: 86400, // 24 hours
};
exports.default = exports.cache;
