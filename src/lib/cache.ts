// Simplified cache module for Vercel compatibility
export { cache, cacheKeys, CacheTTL, Cacheable, redis, bullRedis } from './cache/redis';
export { withCache, CacheInvalidator, checkRateLimit } from './cache/middleware';
export { default } from './cache/redis';

// Re-export for backward compatibility
export type { default as CacheManager } from './cache/redis';