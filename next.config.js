const { withSentryConfig } = require('@sentry/nextjs');

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
                : "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google-analytics.com *.googletagmanager.com *.google.com *.gstatic.com *.googleapis.com *.vercel-insights.com *.vercel-analytics.com *.sentry.io *.ingest.sentry.io; style-src 'self' 'unsafe-inline' *.googleapis.com; img-src 'self' data: blob: *.google-analytics.com *.googletagmanager.com *.google.com *.gstatic.com *.googleapis.com *.sentry.io https:; font-src 'self' *.gstatic.com *.googleapis.com; connect-src 'self' *.google-analytics.com *.googletagmanager.com *.google.com *.googleapis.com *.vercel-insights.com *.vercel-analytics.com *.sentry.io *.ingest.sentry.io wss: https:; frame-src 'self' *.google.com *.youtube.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; report-uri https://o4509686791274496.ingest.us.sentry.io/api/4509686792323072/security/?sentry_key=cba8298406de5e2b11befb42392681da;",
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

    // Handle thread-stream worker issue
    if (!isServer) {
      // On client-side, replace thread-stream with a mock
      config.resolve.alias['thread-stream'] = false;
      config.resolve.alias['pino'] = 'pino/browser';
    } else {
      // On server-side, mark pino and thread-stream as external
      config.externals = config.externals || [];
      if (typeof config.externals === 'function') {
        const originalExternals = config.externals;
        config.externals = async (context, request, callback) => {
          if (request === 'pino' || request === 'thread-stream' || request === 'pino-pretty') {
            return callback(null, `commonjs ${request}`);
          }
          return originalExternals(context, request, callback);
        };
      } else {
        config.externals = [
          ...config.externals,
          { pino: 'commonjs pino' },
          { 'thread-stream': 'commonjs thread-stream' },
          { 'pino-pretty': 'commonjs pino-pretty' },
        ];
      }
    }

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

// Sentry configuration options
const sentryWebpackPluginOptions = {
  // Organization and project from your Sentry account
  org: 'vasquez-law-firmpllc',
  project: 'javascript-nextjs',

  // Only upload source maps in production
  silent: true,

  // Disable source map upload
  widenClientFileUpload: false,

  // Transpile SDK for compatibility
  transpileClientSDK: true,

  // Routes to tunnel Sentry requests through to avoid ad blockers
  tunnelRoute: '/monitoring',

  // Hide source maps from the client
  hideSourceMaps: true,

  // Disable org/project lookup in CI
  disableLogger: true,

  // Auto-instrument API routes and Server Components
  automaticVercelMonitors: true,

  // Skip source map upload if no auth token
  dryRun: !process.env.SENTRY_AUTH_TOKEN,

  // Disable source map upload completely if no token
  disableServerWebpackPlugin: !process.env.SENTRY_AUTH_TOKEN,
  disableClientWebpackPlugin: !process.env.SENTRY_AUTH_TOKEN,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
