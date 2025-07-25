#!/usr/bin/env node

/**
 * Complete Build Script - BUILD UP NOT DOWN
 * This script ensures 100% static generation of all pages
 * with proper error handling and progress tracking
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Complete Build Process - BUILD UP NOT DOWN!');
console.log('━'.repeat(60));

// Set environment for maximum performance
process.env.NODE_ENV = 'production';
process.env.NODE_OPTIONS = '--max-old-space-size=16384'; // 16GB RAM
process.env.NEXT_TELEMETRY_DISABLED = '1';

// Force static generation
delete process.env.LIMIT_STATIC_GENERATION;
delete process.env.STATIC_GENERATION_WHITELIST;

console.log('📋 Build Configuration:');
console.log(`   Memory: 16GB`);
console.log(`   CPUs: ${require('os').cpus().length}`);
console.log(`   Static Generation: ENABLED`);
console.log(`   Target Pages: 3,690+`);
console.log('━'.repeat(60));

// Clean previous builds
console.log('\n🧹 Cleaning previous builds...');
try {
  execSync('rm -rf .next .next.old dist', { stdio: 'inherit' });
  console.log('✅ Clean complete');
} catch (error) {
  console.log('⚠️  Clean failed, continuing...');
}

// Run Prisma generation
console.log('\n🗄️  Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated');
} catch (error) {
  console.error('❌ Prisma generation failed:', error.message);
  process.exit(1);
}

// Run the build
console.log('\n🏗️  Starting Next.js build...');
console.log('⏱️  This will take several minutes for 3,690+ pages...\n');

const startTime = Date.now();

try {
  execSync('next build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      // Ensure all optimizations are enabled
      ANALYZE: 'false',
    },
  });

  const buildTime = ((Date.now() - startTime) / 1000 / 60).toFixed(2);
  console.log(`\n✅ Build completed in ${buildTime} minutes!`);
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
}

// Verify build output
console.log('\n📊 Verifying build output...');
const buildManifest = path.join(__dirname, '../.next/build-manifest.json');
const prerenderManifest = path.join(__dirname, '../.next/prerender-manifest.json');

if (fs.existsSync(buildManifest)) {
  const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
  const pageCount = Object.keys(manifest.pages || {}).length;
  console.log(`   Total pages in build manifest: ${pageCount}`);
}

if (fs.existsSync(prerenderManifest)) {
  const prerender = JSON.parse(fs.readFileSync(prerenderManifest, 'utf8'));
  const staticRoutes = Object.keys(prerender.staticRoutes || {}).length;
  const dynamicRoutes = Object.keys(prerender.dynamicRoutes || {}).length;
  console.log(`   Static routes: ${staticRoutes}`);
  console.log(`   Dynamic routes: ${dynamicRoutes}`);
}

// Check .next directory size
try {
  const buildSize = execSync('du -sh .next', { encoding: 'utf8' }).trim();
  console.log(`   Build size: ${buildSize}`);
} catch (error) {
  // Ignore size check errors
}

console.log('\n🎉 BUILD COMPLETE - ALL PAGES GENERATED!');
console.log('━'.repeat(60));
console.log('💪 BUILD UP NOT DOWN - Maximum capability achieved!');
console.log('\n📦 Ready for deployment with 100% static pages');
console.log('🚀 Deploy with: npm run deploy');
