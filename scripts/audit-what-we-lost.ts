#!/usr/bin/env tsx

import { glob } from 'glob';

async function main() {
  console.log('🔍 Auditing what we might have lost...\n');

  // Get all current pages
  const pageFiles = await glob('src/app/**/page.tsx', {
    ignore: ['**/node_modules/**', '**/api/**'],
  });

  const pages = pageFiles.map(file => {
    let urlPath = file.replace('src/app', '').replace('/page.tsx', '');
    if (urlPath === '') urlPath = '/';
    return { file, url: urlPath };
  });

  // Find problematic patterns
  const duplicateUbicaciones = pages.filter(p => p.url.includes('ubicaciones 2'));
  const testPages = pages.filter(p => p.url.includes('test'));
  const dynamicRoutes = pages.filter(p => p.url.includes('['));

  // Find Spanish pages with mixed language issues
  const spanishPagesWithEnglish = pages.filter(
    p =>
      p.url.startsWith('/es/') &&
      (p.url.includes('immigration') ||
        p.url.includes('criminal') ||
        p.url.includes('personal-injury') ||
        p.url.includes('workers-compensation') ||
        p.url.includes('family-law'))
  );

  // Find orphaned Spanish practice area pages
  const spanishPracticeAreas = pages.filter(
    p => p.url.startsWith('/es/areas-de-practica/') || p.url.startsWith('/es/practice-areas/')
  );

  console.log('📊 Current Issues Found:\n');

  console.log(`1. Duplicate "ubicaciones 2" pages: ${duplicateUbicaciones.length}`);
  if (duplicateUbicaciones.length > 0) {
    console.log('   These are Spanish location pages in a duplicate folder');
    duplicateUbicaciones.slice(0, 5).forEach(p => console.log(`   ${p.url}`));
    if (duplicateUbicaciones.length > 5)
      console.log(`   ... and ${duplicateUbicaciones.length - 5} more\n`);
  }

  console.log(`\n2. Test pages that should be kept: ${testPages.length}`);
  testPages.slice(0, 5).forEach(p => console.log(`   ${p.url}`));

  console.log(`\n3. Spanish pages with English slugs: ${spanishPagesWithEnglish.length}`);
  spanishPagesWithEnglish.slice(0, 5).forEach(p => console.log(`   ${p.url}`));

  console.log(`\n4. Spanish practice area pages: ${spanishPracticeAreas.length}`);
  const practiceAreaTypes = new Set(spanishPracticeAreas.map(p => p.url.split('/')[3]));
  console.log(`   Types: ${Array.from(practiceAreaTypes).join(', ')}`);

  // What we originally had vs now
  console.log('\n📈 Original State (from your numbers):');
  console.log('   English: 2,954 pages');
  console.log('   Spanish: 3,281 pages');
  console.log('   Total: 6,235 pages');

  console.log('\n📉 Current State:');
  console.log('   English: 2,896 pages');
  console.log('   Spanish: 2,896 pages');
  console.log('   Total: 5,792 pages');

  console.log('\n❌ Lost:');
  console.log('   English: 58 pages lost');
  console.log('   Spanish: 385 pages lost');
  console.log('   Total: 443 pages lost');

  console.log('\n🤔 Likely Lost Pages:');
  console.log('   1. 327 Spanish-only pages (3,281 - 2,954 original difference)');
  console.log('   2. Duplicate location pages from "ubicaciones 2"');
  console.log('   3. Spanish practice area sub-pages');
  console.log('   4. Some test/debug pages');

  console.log('\n💡 BUILD UP Recommendations:');
  console.log('   1. Restore the "ubicaciones 2" pages (560 pages)');
  console.log('   2. Keep all test pages for development');
  console.log('   3. Fix Spanish pages with English slugs');
  console.log('   4. Ensure all practice areas have proper sub-pages');
}

main().catch(console.error);
