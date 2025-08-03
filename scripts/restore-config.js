#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const configPath = path.join(process.cwd(), 'next.config.js');
const originalConfigPath = path.join(process.cwd(), 'next.config.original.js');

console.log('🔧 Restoring original configuration...');

// Restore original config if it exists
if (fs.existsSync(originalConfigPath)) {
  if (fs.existsSync(configPath)) {
    fs.unlinkSync(configPath);
  }
  fs.renameSync(originalConfigPath, configPath);
  console.log('✅ Restored original next.config.js');
} else {
  console.log('ℹ️ No original config to restore');
}

console.log('✅ Configuration restored');
