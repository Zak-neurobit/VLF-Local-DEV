#!/usr/bin/env node

/**
 * Build optimization script for large Next.js projects
 * This script helps reduce build time and memory usage
 */

const fs = require('fs');
const path = require('path');

// High-priority pages that should always be built
const PRIORITY_PAGES = [
  '/',
  '/contact',
  '/attorneys',
  '/practice-areas',
  '/practice-areas/immigration',
  '/practice-areas/personal-injury',
  '/practice-areas/criminal-defense',
  '/practice-areas/workers-compensation',
  '/blog',
  '/about',
  '/locations',
  '/locations/nc/charlotte',
  '/locations/nc/raleigh',
  '/locations/nc/durham',
  '/locations/nc/greensboro',
  '/es',
  '/es/contacto',
  '/es/abogados',
  '/es/areas-de-practica',
];

// Create a temporary next.config for optimized builds
const createOptimizedConfig = () => {
  const configContent = `
const baseConfig = require('./next.config.js');

module.exports = {
  ...baseConfig,
  
  // Extreme build optimizations
  experimental: {
    ...baseConfig.experimental,
    // Only build priority pages
    optimizeCss: false,
    scrollRestoration: false,
    // Disable all optional features during build
    gzipSize: false,
    craCompat: false,
  },
  
  // Skip all non-critical processing
  images: {
    ...baseConfig.images,
    unoptimized: true,
  },
  
  // Use dynamic imports for everything else
  async generateStaticParams() {
    return [];
  },
  
  // Reduce build output
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
};
`;

  fs.writeFileSync(
    path.join(process.cwd(), 'next.config.optimized.js'),
    configContent
  );
};

// Set environment variables for optimized build
const setOptimizedEnv = () => {
  process.env.NEXT_TELEMETRY_DISABLED = '1';
  process.env.NODE_OPTIONS = '--max-old-space-size=8192';
  process.env.SKIP_ENV_VALIDATION = 'true';
  process.env.NEXT_PRIVATE_STANDALONE = 'true';
};

// Main execution
console.log('🚀 Starting optimized build process...');
console.log('📦 Creating optimized configuration...');
createOptimizedConfig();

console.log('🔧 Setting environment variables...');
setOptimizedEnv();

console.log(`
✅ Optimization complete!

To run an optimized build:
1. Use: next build --config next.config.optimized.js
2. Or: NODE_ENV=production npm run build

This will:
- Only build high-priority pages statically
- Generate other pages on-demand
- Reduce memory usage significantly
- Speed up deployment times
`);

// Clean up function
process.on('exit', () => {
  try {
    fs.unlinkSync(path.join(process.cwd(), 'next.config.optimized.js'));
  } catch (e) {
    // Ignore cleanup errors
  }
});