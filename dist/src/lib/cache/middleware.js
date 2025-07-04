'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CacheInvalidator = void 0;
exports.withCache = withCache;
exports.checkRateLimit = checkRateLimit;
const server_1 = require('next/server');
const redis_1 = require('./redis');
const logger_1 = require('../logger');
/**
 * Cache middleware for Next.js API routes
 *
 * @example
 * // In an API route
 * export const GET = withCache(async (request) => {
 *   // Your handler logic
 * }, { ttl: CacheTTL.MEDIUM });
 */
function withCache(handler, options = {}) {
  return async function cachedHandler(request, context) {
    const {
      ttl = redis_1.CacheTTL.MEDIUM,
      key,
      condition = () => true,
      invalidatePatterns = [],
    } = options;
    // Check if caching should be applied
    if (!condition(request)) {
      return handler(request, context);
    }
    // Handle cache invalidation
    if (request.method !== 'GET' && invalidatePatterns.length > 0) {
      await Promise.all(invalidatePatterns.map(pattern => redis_1.cache.deletePattern(pattern)));
    }
    // Only cache GET requests
    if (request.method !== 'GET') {
      return handler(request, context);
    }
    // Generate cache key
    const cacheKey = typeof key === 'function' ? key(request) : key || generateCacheKey(request);
    try {
      // Try to get from cache
      const cached = await redis_1.cache.get(cacheKey);
      if (cached) {
        logger_1.logger.debug(`Cache hit for ${cacheKey}`);
        return server_1.NextResponse.json(cached.body, {
          status: cached.status,
          headers: {
            ...cached.headers,
            'X-Cache': 'HIT',
            'X-Cache-TTL': ttl.toString(),
          },
        });
      }
      // Execute handler
      const response = await handler(request, context);
      // Cache successful responses
      if (response.status >= 200 && response.status < 300) {
        const body = await response.json();
        const headers = {};
        response.headers.forEach((value, key) => {
          headers[key] = value;
        });
        await redis_1.cache.set(
          cacheKey,
          {
            body,
            headers,
            status: response.status,
          },
          ttl
        );
        // Return new response with cache headers
        return server_1.NextResponse.json(body, {
          status: response.status,
          headers: {
            ...headers,
            'X-Cache': 'MISS',
            'X-Cache-TTL': ttl.toString(),
          },
        });
      }
      return response;
    } catch (error) {
      logger_1.logger.error('Cache middleware error:', error);
      // Fallback to handler on cache error
      return handler(request, context);
    }
  };
}
/**
 * Generate a cache key from request
 */
function generateCacheKey(request) {
  const url = new URL(request.url);
  const params = Array.from(url.searchParams.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
  return redis_1.cacheKeys.apiResponse(url.pathname, params);
}
/**
 * Cache invalidation utility
 */
class CacheInvalidator {
  static async invalidateUser(userId) {
    await redis_1.cache.deletePattern(`user:${userId}*`);
    await redis_1.cache.deletePattern(`cases:user:${userId}*`);
    await redis_1.cache.deletePattern(`chat:history:${userId}*`);
  }
  static async invalidateCase(caseId) {
    await redis_1.cache.deletePattern(`case:${caseId}*`);
  }
  static async invalidateBlog(postId, slug) {
    if (postId) {
      await redis_1.cache.delete(redis_1.cacheKeys.blogPost(postId));
    }
    if (slug) {
      await redis_1.cache.delete(redis_1.cacheKeys.blogPostBySlug(slug));
    }
    // Invalidate list caches
    await redis_1.cache.deletePattern('blog:list:*');
    await redis_1.cache.deletePattern('blog:area:*');
  }
  static async invalidateSEO() {
    await redis_1.cache.deletePattern('seo:*');
    await redis_1.cache.deletePattern('keywords:*');
    await redis_1.cache.deletePattern('competitor:*');
  }
  static async invalidateAll() {
    await redis_1.cache.flush();
  }
}
exports.CacheInvalidator = CacheInvalidator;
/**
 * Rate limiting with cache
 */
async function checkRateLimit(
  ip,
  endpoint,
  limit = 100,
  window = 900 // 15 minutes
) {
  const key = redis_1.cacheKeys.rateLimit(ip, endpoint);
  const current = (await redis_1.cache.get(key)) || 0;
  if (current >= limit) {
    const ttl = await redis_1.cache.redis.ttl(key);
    return {
      allowed: false,
      remaining: 0,
      reset: Date.now() + ttl * 1000,
    };
  }
  await redis_1.cache.set(key, current + 1, window);
  return {
    allowed: true,
    remaining: limit - current - 1,
    reset: Date.now() + window * 1000,
  };
}
