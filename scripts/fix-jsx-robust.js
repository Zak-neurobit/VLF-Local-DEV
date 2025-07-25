#!/usr/bin/env node

/**
 * Robust JSX Fix Script
 * Alternative approach using div wrappers instead of fragments
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Applying robust JSX fixes...\n');

const files = [
  'src/app/contact/page.tsx',
  'src/app/scholarship/ScholarshipPageClient.tsx',
  'src/app/es/nuestro-equipo/NuestroEquipoPageClient.tsx',
  'src/app/our-team/OurTeamPageClient.tsx',
];

files.forEach(file => {
  console.log(`📝 Processing ${file}...`);

  try {
    let content = fs.readFileSync(file, 'utf8');

    // Replace <> with <div> and </> with </div>
    content = content.replace(/(\s+)<>/g, '$1<div>');
    content = content.replace(/(\s+)<\/>/g, '$1</div>');

    fs.writeFileSync(file, content);
    console.log(`✅ Fixed ${file}`);
  } catch (error) {
    console.error(`❌ Error fixing ${file}:`, error.message);
  }
});

console.log('\n✅ Robust JSX fixes applied!');
console.log('🚀 Using div wrappers for maximum compatibility');
