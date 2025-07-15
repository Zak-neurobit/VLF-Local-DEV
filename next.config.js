/** @type {import('next').NextConfig} */
const nextConfig = {
  // Internationalization
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    localeDetection: false,
  },

  // React strict mode for better development experience
  reactStrictMode: true,

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Image optimization
  images: {
    domains: [
      'vasquezlawnc.com',
      'www.vasquezlawnc.com',
      'images.unsplash.com',
      'storage.googleapis.com',
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
          {
            key: 'Content-Security-Policy',
            value:
              process.env.NODE_ENV === 'development'
                ? '' // Disabled in development for hot reload
                : "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google-analytics.com *.googletagmanager.com *.google.com *.gstatic.com *.googleapis.com *.vercel-insights.com *.vercel-analytics.com; style-src 'self' 'unsafe-inline' *.googleapis.com; img-src 'self' data: blob: *.google-analytics.com *.googletagmanager.com *.google.com *.gstatic.com *.googleapis.com https:; font-src 'self' *.gstatic.com *.googleapis.com; connect-src 'self' *.google-analytics.com *.googletagmanager.com *.google.com *.googleapis.com *.vercel-insights.com *.vercel-analytics.com wss: https:; frame-src 'self' *.google.com *.youtube.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';",
          },
        ],
      },
    ];
  },

  // Redirects for Spanish routes
  async redirects() {
    return [
      // Add Spanish redirects as needed
    ];
  },

  // Rewrites for cleaner URLs
  async rewrites() {
    return [
      // Spanish API routes
      {
        source: '/es/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Fix for ES modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // Add aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname + '/src',
    };

    return config;
  },

  // Enable SWC minification
  swcMinify: true,

  // Compression
  compress: true,

  // Environment variables to expose to the browser
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://www.vasquezlawnc.com',
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  },

  // TypeScript and ESLint
  typescript: {
    ignoreBuildErrors: false, // Strict mode - fail build on TS errors
  },
  eslint: {
    ignoreDuringBuilds: false, // Strict mode - fail build on ESLint errors
  },

  // Experimental features
  experimental: {
    // Optimize CSS
    optimizeCss: true,
    // Enable new image optimization
    optimizePackageImports: ['lucide-react', 'date-fns', '@radix-ui/react-icons'],
  },

  // Output configuration
  output: 'standalone',

  // Performance monitoring
  productionBrowserSourceMaps: false, // Disable in production for security

  // Bundle analyzer (only in analyze mode)
  ...(process.env.ANALYZE && {
    webpack(config) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: true,
        })
      );
      return config;
    },
  }),
};

module.exports = nextConfig;
