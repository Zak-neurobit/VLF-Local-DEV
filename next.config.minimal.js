// Minimal Next.js configuration for deployment with reduced static generation
const baseConfig = require('./next.config.js');

module.exports = {
  ...baseConfig,
  
  // Override experimental settings for minimal build
  experimental: {
    ...baseConfig.experimental,
    // Increase timeout but reduce concurrency
    staticPageGenerationTimeout: 300, // 5 minutes
    cpus: 1,
    workerThreads: false,
    // Disable memory cache
    isrMemoryCacheSize: 0,
  },
  
  // Force dynamic rendering for most pages
  async headers() {
    const baseHeaders = await baseConfig.headers();
    return [
      ...baseHeaders,
      {
        source: '/locations/:path*',
        headers: [
          {
            key: 'x-render-mode',
            value: 'dynamic',
          },
        ],
      },
      {
        source: '/es/ubicaciones/:path*',
        headers: [
          {
            key: 'x-render-mode',
            value: 'dynamic',
          },
        ],
      },
    ];
  },
  
  // Reduce generated pages drastically
  generateStaticParams: async () => {
    // Only generate the absolute minimum pages
    return [];
  },
};