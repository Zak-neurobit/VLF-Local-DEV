#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read all imported JSON files
const importDir = path.join(__dirname, '../content-import/complete-site-import');
const appDir = path.join(__dirname, '../src/app');

console.log('Checking for missing pages based on imported content...\n');

// Get all imported files
const importedFiles = fs
  .readdirSync(importDir)
  .filter(file => file.endsWith('.json'))
  .map(file => file.replace('.json', ''));

// Function to check if a page exists
function pageExists(pagePath) {
  const possiblePaths = [
    path.join(appDir, pagePath, 'page.tsx'),
    path.join(appDir, pagePath, 'page.jsx'),
    path.join(appDir, pagePath + '.tsx'),
    path.join(appDir, pagePath + '.jsx'),
  ];

  return possiblePaths.some(p => fs.existsSync(p));
}

// Check each imported file
const missingPages = [];
const existingPages = [];

importedFiles.forEach(file => {
  // Convert filename to expected page path
  let pagePath = file
    .replace('homepage', '')
    .replace('www.vasquezlawnc.com', '')
    .replace(/-/g, '-');

  // Special cases
  if (file === 'attorneys') {
    pagePath = 'attorneys';
  } else if (file.startsWith('attorneys-')) {
    pagePath = file.replace('attorneys-', 'attorneys/');
  } else if (file.startsWith('es-')) {
    pagePath = file.replace('es-', 'es/').replace(/-/g, '/');
  } else if (file.includes('-')) {
    // Convert practice area pages
    const parts = file.split('-');
    if (
      parts[0] === 'immigration' ||
      parts[0] === 'criminal' ||
      parts[0] === 'personal' ||
      parts[0] === 'family' ||
      parts[0] === 'workers'
    ) {
      pagePath = 'practice-areas/' + file.replace(/-/g, '/');
    }
  }

  if (pageExists(pagePath)) {
    existingPages.push({ file, pagePath });
  } else {
    missingPages.push({ file, expectedPath: pagePath });
  }
});

console.log(`Total imported files: ${importedFiles.length}`);
console.log(`Existing pages: ${existingPages.length}`);
console.log(`Missing pages: ${missingPages.length}\n`);

console.log('Missing Pages:');
console.log('==============');
missingPages.forEach(({ file, expectedPath }) => {
  console.log(`- ${file}.json → /${expectedPath}/`);
});

console.log('\n\nExisting Pages:');
console.log('===============');
existingPages.forEach(({ file, pagePath }) => {
  console.log(`✓ ${file}.json → /${pagePath}/`);
});

// Write report
const report = {
  timestamp: new Date().toISOString(),
  totalImported: importedFiles.length,
  existing: existingPages.length,
  missing: missingPages.length,
  missingPages: missingPages,
  existingPages: existingPages,
};

fs.writeFileSync(
  path.join(__dirname, '../missing-pages-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('\nReport saved to missing-pages-report.json');
