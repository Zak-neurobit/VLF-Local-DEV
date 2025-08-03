#!/usr/bin/env tsx

import fs from 'fs/promises';
import path from 'path';

async function validateSitemapTotals() {
  console.log('🔍 Validating sitemap totals...\n');

  const publicDir = path.join(process.cwd(), 'public');

  // Count language-specific sitemaps
  const enContent = await fs.readFile(path.join(publicDir, 'sitemap-en.xml'), 'utf-8');
  const esContent = await fs.readFile(path.join(publicDir, 'sitemap-es.xml'), 'utf-8');

  const enUrls = (enContent.match(/<loc>/g) || []).length;
  const esUrls = (esContent.match(/<loc>/g) || []).length;

  console.log('📊 Language-specific counts:');
  console.log(`   English URLs: ${enUrls}`);
  console.log(`   Spanish URLs: ${esUrls}`);
  console.log(`   Total URLs:   ${enUrls + esUrls}`);

  // Verify against target
  const target = 6562;
  const total = enUrls + esUrls;
  const targetPerLanguage = 3281;

  console.log('\n✅ Target verification:');
  console.log(`   Target total: ${target} (${targetPerLanguage} EN + ${targetPerLanguage} ES)`);
  console.log(`   Actual total: ${total} (${enUrls} EN + ${esUrls} ES)`);
  console.log(`   Difference:   ${total - target} pages`);
  console.log(`   Achievement:  ${Math.round((total / target) * 100)}%`);

  if (total >= target) {
    console.log('\n🎉 SUCCESS: Sitemap includes all required pages!');
  } else {
    console.log(`\n⚠️  Missing ${target - total} pages from target.`);
  }

  // Show category breakdown
  const categoryFiles = [
    { file: 'sitemap-locations.xml', name: 'Locations' },
    { file: 'sitemap-practice-areas.xml', name: 'Practice Areas' },
    { file: 'sitemap-blog.xml', name: 'Blog' },
    { file: 'sitemap-near-me.xml', name: 'Near Me' },
    { file: 'sitemap-attorneys.xml', name: 'Attorneys' },
  ];

  console.log('\n📈 Category breakdown:');
  let categoryTotal = 0;

  for (const { file, name } of categoryFiles) {
    const content = await fs.readFile(path.join(publicDir, file), 'utf-8');
    const urls = (content.match(/<loc>/g) || []).length;
    categoryTotal += urls;
    console.log(`   ${name.padEnd(20)} ${urls.toString().padStart(6)} URLs`);
  }

  console.log(`   ${'Total categorized'.padEnd(20)} ${categoryTotal.toString().padStart(6)} URLs`);

  // Update package.json script if needed
  console.log('\n📝 To regenerate sitemaps, run:');
  console.log('   npm run sitemap:generate');
  console.log('   or');
  console.log('   npx tsx scripts/generate-complete-sitemaps.ts');
}

validateSitemapTotals().catch(console.error);
