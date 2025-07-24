#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const buildOutputFile = path.join(process.cwd(), 'build-output-dynamic.txt');

function checkBuildStatus() {
  if (!fs.existsSync(buildOutputFile)) {
    console.log('❌ Build output file not found');
    return;
  }

  const content = fs.readFileSync(buildOutputFile, 'utf-8');
  const lines = content.split('\n');
  const lastLines = lines.slice(-50).join('\n');

  console.clear();
  console.log('🔨 Build Status Monitor');
  console.log('=' .repeat(80));
  console.log('\nLast 50 lines of build output:\n');
  console.log(lastLines);
  console.log('\n' + '=' .repeat(80));

  // Check for completion
  if (content.includes('✓ Compiled successfully') || content.includes('Build completed')) {
    console.log('\n✅ BUILD SUCCESSFUL!');
    process.exit(0);
  }

  if (content.includes('Build error occurred') || content.includes('Error:')) {
    const errorLines = lines.filter(line => line.includes('Error:') || line.includes('error'));
    console.log('\n❌ BUILD FAILED!');
    console.log('Errors found:');
    errorLines.slice(-10).forEach(line => console.log(line));
    process.exit(1);
  }

  // Check if build is still running
  const stats = fs.statSync(buildOutputFile);
  const lastModified = new Date(stats.mtime);
  const now = new Date();
  const secondsSinceUpdate = (now - lastModified) / 1000;

  if (secondsSinceUpdate > 120) {
    console.log(`\n⚠️  Build seems stuck - no updates for ${Math.round(secondsSinceUpdate)} seconds`);
  } else {
    console.log(`\n🔄 Build in progress... (last update: ${Math.round(secondsSinceUpdate)}s ago)`);
  }
}

// Check every 5 seconds
console.log('Starting build monitor...');
checkBuildStatus();
setInterval(checkBuildStatus, 5000);