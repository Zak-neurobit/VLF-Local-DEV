#!/usr/bin/env node

/**
 * Setup ESLint for Vercel build environment
 */

const fs = require('fs');
const path = require('path');

const eslintConfigPath = path.join(process.cwd(), '.eslintrc.json');
const buildConfigPath = path.join(process.cwd(), '.eslintrc.build.json');

// Check if we're in a Vercel build environment
const isVercel = process.env.VERCEL || process.env.NOW_BUILDER;

if (isVercel) {
  console.log('🔧 Vercel environment detected, using build ESLint config...');

  // Backup original config if it exists
  if (fs.existsSync(eslintConfigPath)) {
    const originalConfig = fs.readFileSync(eslintConfigPath, 'utf8');
    fs.writeFileSync(eslintConfigPath + '.backup', originalConfig);
  }

  // Use build config
  if (fs.existsSync(buildConfigPath)) {
    const buildConfig = fs.readFileSync(buildConfigPath, 'utf8');
    fs.writeFileSync(eslintConfigPath, buildConfig);
    console.log('✅ Build ESLint config applied');
  }
} else {
  console.log('📍 Local environment detected, using standard ESLint config');
}
