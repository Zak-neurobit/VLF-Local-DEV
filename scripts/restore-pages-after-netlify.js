#!/usr/bin/env node

/**
 * Restore pages after successful Netlify deployment
 */

const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

console.log('🔧 Restoring pages after Netlify build...');

// Find all .backup-for-netlify directories
const entries = fs.readdirSync(appDir, { withFileTypes: true });

entries.forEach(entry => {
  if (entry.isDirectory() && entry.name.endsWith('.backup-for-netlify')) {
    const backupPath = path.join(appDir, entry.name);
    const originalPath = path.join(appDir, entry.name.replace('.backup-for-netlify', ''));
    
    if (!fs.existsSync(originalPath)) {
      fs.renameSync(backupPath, originalPath);
      console.log(`✅ Restored ${entry.name.replace('.backup-for-netlify', '')}`);
    }
  }
});

console.log('✅ All pages restored!');