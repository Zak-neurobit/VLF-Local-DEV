#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏗️ Starting full static build...');
console.log('Total pages to generate: ~6,562');
console.log('This may take 10-20 minutes...');

// Set environment variables
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.NODE_ENV = 'production';

// Backup current config
if (fs.existsSync('next.config.js')) {
  fs.renameSync('next.config.js', 'next.config.original.js');
}

// Use static config
fs.copyFileSync('next.config.static.js', 'next.config.js');

try {
  // Ensure all routes are static
  execSync('node scripts/ensure-static-routes.js', { stdio: 'inherit' });

  // Remove API routes temporarily
  if (fs.existsSync('src/app/api')) {
    fs.renameSync('src/app/api', 'src/app/api.temp');
    console.log('✅ Temporarily moved API routes');
  }

  // Build with maximum memory
  console.log('\n📦 Building static site...');
  execSync('next build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=32768', // 32GB
    },
  });

  console.log('\n✅ Build completed successfully!');

  // Show build stats
  if (fs.existsSync('out')) {
    const files = execSync('find out -type f | wc -l').toString().trim();
    const size = execSync('du -sh out').toString().trim();
    console.log(`\n📊 Build Stats:`);
    console.log(`   Files: ${files}`);
    console.log(`   Size: ${size}`);
  }
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} finally {
  // Restore original config
  if (fs.existsSync('next.config.original.js')) {
    fs.renameSync('next.config.original.js', 'next.config.js');
  }

  // Restore API routes
  if (fs.existsSync('src/app/api.temp')) {
    fs.renameSync('src/app/api.temp', 'src/app/api');
  }
}
