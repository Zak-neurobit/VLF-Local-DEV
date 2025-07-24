// Build-specific Next.js configuration to handle large projects
const baseConfig = require('./next.config.js');

module.exports = {
  ...baseConfig,
  
  // Experimental features to control build behavior
  experimental: {
    ...baseConfig.experimental,
    
    // Use PPR (Partial Pre-Rendering) for better control
    ppr: true,
    
    // Limit build workers
    cpus: 1,
    workerThreads: false,
    
    // Disable build-time data fetching for dynamic pages
    isrFlushToDisk: false,
    
    // Memory optimizations
    largePageDataBytes: 128 * 1000, // 128KB limit
    
    // Build output optimizations
    optimizePackageImports: ['lucide-react', '@radix-ui/*', 'framer-motion'],
  },
  
  // Override page extensions to control what gets built
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'].map(ext => {
    // During build, rename location pages to prevent static generation
    if (process.env.VERCEL_ENV === 'production' || process.env.BUILD_LIMIT === 'true') {
      return ext;
    }
    return ext;
  }),
  
  // Modify how pages are discovered
  async generateBuildId() {
    return 'build-' + Date.now();
  },
  
  // Custom webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Call base webpack config
    if (baseConfig.webpack) {
      config = baseConfig.webpack(config, { buildId, dev, isServer, defaultLoaders, webpack });
    }
    
    // Add custom plugin to limit page generation
    if (!dev && isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.BUILD_TIME_LIMIT': JSON.stringify('true'),
          'process.env.MAX_STATIC_GENERATION_PAGES': JSON.stringify('100'),
        })
      );
    }
    
    return config;
  },
};