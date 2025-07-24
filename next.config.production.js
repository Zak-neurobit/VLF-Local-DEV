// Production-optimized Next.js configuration for large sites
const baseConfig = require('./next.config.js');

// List of routes that should be statically generated at build time
const STATIC_ROUTES = [
  '/',
  '/contact',
  '/attorneys',
  '/practice-areas',
  '/practice-areas/immigration',
  '/practice-areas/personal-injury', 
  '/practice-areas/criminal-defense',
  '/practice-areas/workers-compensation',
  '/about',
  '/es',
  '/es/contacto',
  '/es/abogados',
  '/es/areas-de-practica',
];

module.exports = {
  ...baseConfig,
  
  // Use on-demand generation for most pages
  experimental: {
    ...baseConfig.experimental,
    // Limit static page generation
    isrMemoryCacheSize: 0,
    
    // Use Partial Prerendering for better performance
    ppr: true,
    
    // Optimize for large projects
    largePageDataBytes: 256 * 1024, // 256KB
    
    // Build optimizations
    cpus: 8, // Use all available CPUs on Enhanced Build
    workerThreads: true,
    
    // Incremental cache improvements
    incrementalCacheHandlerPath: require.resolve('./cache-handler.js'),
  },
  
  // Custom headers to control caching
  async headers() {
    const baseHeaders = baseConfig.headers ? await baseConfig.headers() : [];
    
    return [
      ...baseHeaders,
      {
        source: '/locations/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/blog/:path*',
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
  
  // Webpack optimizations for production
  webpack: (config, options) => {
    // Call base webpack if exists
    if (baseConfig.webpack) {
      config = baseConfig.webpack(config, options);
    }
    
    // Production optimizations
    if (!options.dev && options.isServer) {
      // Limit page data size to prevent OOM
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
            },
          },
        },
      };
    }
    
    return config;
  },
};