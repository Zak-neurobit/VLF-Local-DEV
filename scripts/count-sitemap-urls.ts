#!/usr/bin/env tsx

import fs from 'fs/promises';
import path from 'path';

async function countSitemapUrls() {
  console.log('📊 Counting URLs in sitemaps...\n');

  const publicDir = path.join(process.cwd(), 'public');
  const sitemapFiles = [
    'sitemap-complete.xml',
    'sitemap-en.xml',
    'sitemap-es.xml',
    'sitemap-locations.xml',
    'sitemap-practice-areas.xml',
    'sitemap-blog.xml',
    'sitemap-near-me.xml',
    'sitemap-attorneys.xml',
  ];

  let totalUrls = 0;
  const results: Record<string, number> = {};

  for (const file of sitemapFiles) {
    try {
      const content = await fs.readFile(path.join(publicDir, file), 'utf-8');
      const urlMatches = content.match(/<loc>/g) || [];
      let count = urlMatches.length;

      // For complete sitemap, check if it has hreflang alternates
      if (file === 'sitemap-complete.xml') {
        const hreflangMatches = content.match(/<xhtml:link.*?hreflang/g) || [];
        if (hreflangMatches.length > 0) {
          // Count unique URL entries and their language versions
          const urlEntries = content.match(/<url>/g) || [];
          const actualPages = urlEntries.length;
          const languageVersions = hreflangMatches.length;
          console.log(
            `${file.padEnd(30)} ${actualPages.toString().padStart(6)} URL entries (${languageVersions} total pages with alternates)`
          );
          results[file] = languageVersions > 0 ? languageVersions : actualPages;
          continue;
        }
      }

      results[file] = count;

      if (file !== 'sitemap-complete.xml') {
        totalUrls += count;
      }

      console.log(`${file.padEnd(30)} ${count.toString().padStart(6)} URLs`);
    } catch (error) {
      console.error(`Error reading ${file}:`, error);
    }
  }

  console.log('\n' + '='.repeat(40));
  console.log(`Total URLs (excluding complete): ${totalUrls}`);
  console.log(`Complete sitemap URLs:           ${results['sitemap-complete.xml'] || 0}`);

  // Category breakdown
  console.log('\n📈 Category Breakdown:');
  console.log(`   Locations:       ${results['sitemap-locations.xml'] || 0}`);
  console.log(`   Practice Areas:  ${results['sitemap-practice-areas.xml'] || 0}`);
  console.log(`   Near Me:         ${results['sitemap-near-me.xml'] || 0}`);
  console.log(`   Blog:            ${results['sitemap-blog.xml'] || 0}`);
  console.log(`   Attorneys:       ${results['sitemap-attorneys.xml'] || 0}`);

  // Language breakdown
  console.log('\n🌐 Language Breakdown:');
  console.log(`   English:         ${results['sitemap-en.xml'] || 0}`);
  console.log(`   Spanish:         ${results['sitemap-es.xml'] || 0}`);
  console.log(
    `   Total:           ${(results['sitemap-en.xml'] || 0) + (results['sitemap-es.xml'] || 0)}`
  );

  // Verify target
  const actualTotal = results['sitemap-complete.xml'] || 0;
  const target = 6562;
  const difference = actualTotal - target;

  console.log('\n✅ Target Verification:');
  console.log(`   Target:          ${target} pages`);
  console.log(`   Actual:          ${actualTotal} pages`);
  console.log(`   Difference:      ${difference > 0 ? '+' : ''}${difference} pages`);
  console.log(`   Achievement:     ${Math.round((actualTotal / target) * 100)}%`);
}

countSitemapUrls().catch(console.error);
