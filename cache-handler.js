// Custom cache handler for Incremental Static Regeneration
// This helps manage memory usage during builds and runtime

const { IncrementalCache } = require('@neshca/cache-handler');

// Custom cache handler that limits memory usage
class CustomCacheHandler extends IncrementalCache {
  constructor(options) {
    super({
      ...options,
      // Limit cache size to prevent memory issues
      maxMemoryCacheSize: 100 * 1024 * 1024, // 100MB max
      
      // Use file system cache for production
      handlers: [
        {
          name: 'filesystem',
          handler: require('@neshca/cache-handler/dist/handlers/filesystem').default,
          options: {
            cachePath: '.next/cache',
          },
        },
      ],
    });
  }
  
  async get(key) {
    try {
      return await super.get(key);
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }
  
  async set(key, data, ctx) {
    try {
      // Skip caching very large pages to prevent OOM
      const dataSize = JSON.stringify(data).length;
      if (dataSize > 1024 * 1024) { // 1MB limit per page
        console.warn(`Skipping cache for large page: ${key} (${dataSize} bytes)`);
        return;
      }
      
      return await super.set(key, data, ctx);
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }
}

module.exports = CustomCacheHandler;