// Production-optimized Next.js configuration
const baseConfig = require('./next.config.js');

module.exports = {
  ...baseConfig,
  
  // Enable full static generation
  experimental: {
    ...baseConfig.experimental,
    // Use more workers for faster builds
    workerThreads: true,
    cpus: 8,
    
    // Increase memory for large builds
    isrMemoryCacheSize: 256 * 1024 * 1024, // 256MB
    
    // Allow larger page data
    largePageDataBytes: 512 * 1024, // 512KB
  },
  
  // Custom headers for better caching
  async headers() {
    const baseHeaders = baseConfig.headers ? await baseConfig.headers() : [];
    
    return [
      ...baseHeaders,
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  
  // Generate build ID for cache busting
  generateBuildId: async () => {
    return process.env.VERCEL_GIT_COMMIT_SHA || `build-${Date.now()}`;
  },
};