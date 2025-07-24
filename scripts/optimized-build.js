#!/usr/bin/env node

/**
 * Optimized build script for large Next.js projects
 * This script configures the build to handle thousands of pages efficiently
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting optimized build process...');

// Set environment variables for optimized build
process.env.NODE_OPTIONS = '--max-old-space-size=8192';
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.BUILD_LIMIT = 'true';
process.env.ANALYZE = 'false';

// Create a temporary route manifest to limit static generation
const routeManifest = {
  version: 3,
  pages404: true,
  basePath: '',
  staticRoutes: [
    { page: '/', dataRoute: '/_next/static/data/index.json' },
    { page: '/contact', dataRoute: '/_next/static/data/contact.json' },
    { page: '/attorneys', dataRoute: '/_next/static/data/attorneys.json' },
    { page: '/practice-areas', dataRoute: '/_next/static/data/practice-areas.json' },
    { page: '/about', dataRoute: '/_next/static/data/about.json' },
  ],
  dynamicRoutes: [
    { page: '/locations/[...slug]', routeRegex: '^/locations/(.+?)(?:/)?$' },
    { page: '/blog/[...slug]', routeRegex: '^/blog/(.+?)(?:/)?$' },
    { page: '/[...catchAll]', routeRegex: '^/(.+?)(?:/)?$' },
  ],
};

// Write the route manifest
const manifestPath = path.join(process.cwd(), '.next-route-manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(routeManifest, null, 2));

console.log('📝 Created optimized route manifest');
console.log('🔧 Running Next.js build with optimizations...');

// Run the build
const buildProcess = spawn('npx', ['next', 'build'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NEXT_ROUTER_MANIFEST: manifestPath,
  },
});

buildProcess.on('exit', (code) => {
  // Clean up
  try {
    fs.unlinkSync(manifestPath);
  } catch (e) {
    // Ignore
  }
  
  if (code === 0) {
    console.log('✅ Build completed successfully!');
  } else {
    console.error('❌ Build failed with code:', code);
    process.exit(code);
  }
});