// Minimal Next.js configuration for testing build issues
const { join } = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Increase timeout significantly for debugging
  staticPageGenerationTimeout: 900, // 15 minutes

  // Disable all optimizations for testing
  experimental: {
    serverMinification: false,
    serverSourceMaps: true,
  },

  // Enable verbose logging
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Simplified image config
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Disable source maps to save memory
  productionBrowserSourceMaps: false,

  // Allow builds with errors for testing
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Minimal webpack config
  webpack: (config, { isServer }) => {
    // Add basic aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': join(__dirname, 'src'),
    };

    // Basic externals for server
    if (isServer) {
      config.externals = [
        ...config.externals,
        'pino',
        'winston',
        'thread-stream',
        '@dabh/diagnostics',
      ];
    }

    return config;
  },
};

module.exports = nextConfig;
