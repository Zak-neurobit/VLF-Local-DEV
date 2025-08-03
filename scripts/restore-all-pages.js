#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Restoring all pages...');

const dirsToRestore = ['src/app/locations', 'src/app/near-me', 'src/app/es/cerca-de-mi'];

dirsToRestore.forEach(dir => {
  const backupPath = path.join(__dirname, '..', dir + '.backup');
  const originalPath = path.join(__dirname, '..', dir);

  if (fs.existsSync(backupPath)) {
    fs.renameSync(backupPath, originalPath);
    console.log(`✅ Restored ${dir}`);
  }
});

console.log('\n✅ All pages restored');
