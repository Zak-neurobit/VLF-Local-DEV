#!/usr/bin/env tsx

import { promises as fs } from 'fs';
import { glob } from 'glob';
import * as xml2js from 'xml2js';

async function checkPageCount() {
  console.log('📊 Page Count Check:');

  const pageFiles = await glob('src/app/**/page.tsx', {
    ignore: ['**/node_modules/**', '**/api/**'],
  });

  const enPages = pageFiles.filter(f => !f.includes('/es/'));
  const esPages = pageFiles.filter(f => f.includes('/es/'));

  console.log(`   Total pages: ${pageFiles.length}`);
  console.log(`   English pages: ${enPages.length}`);
  console.log(`   Spanish pages: ${esPages.length}`);
  console.log(`   Parity: ${enPages.length === esPages.length ? '✅ PERFECT' : '❌ MISMATCH'}`);

  return {
    total: pageFiles.length,
    english: enPages.length,
    spanish: esPages.length,
    parity: enPages.length === esPages.length,
  };
}

async function checkSitemaps() {
  console.log('\n📄 Sitemap Check:');

  const sitemapFiles = await glob('public/sitemap*.xml');
  console.log(`   Found ${sitemapFiles.length} sitemap files`);

  let totalUrls = 0;
  for (const file of sitemapFiles) {
    try {
      const content = await fs.readFile(file, 'utf-8');
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(content);

      let urlCount = 0;
      if (result.urlset && result.urlset.url) {
        urlCount = result.urlset.url.length;
      } else if (result.sitemapindex && result.sitemapindex.sitemap) {
        urlCount = result.sitemapindex.sitemap.length;
      }

      totalUrls += urlCount;
      console.log(`   ${file}: ${urlCount} URLs`);
    } catch (error) {
      console.log(`   ${file}: ❌ Error reading`);
    }
  }

  return { sitemapFiles: sitemapFiles.length, totalUrls };
}

async function checkNavigationFiles() {
  console.log('\n🧭 Navigation Check:');

  const navFiles = [
    'src/config/navigation-structure.ts',
    'src/components/Navigation/ProfessionalNavigation.tsx',
    'src/design-system/components/ConsistentFooter.tsx',
    'src/components/ui/modern-nav.tsx',
    'src/components/SEO/MegaFooterLinks.tsx',
  ];

  let allGood = true;
  for (const file of navFiles) {
    try {
      await fs.access(file);
      const content = await fs.readFile(file, 'utf-8');

      // Check for Spanish URLs in navigation
      const hasSpanishUrls =
        content.includes('/es/') ||
        content.includes('areas-de-practica') ||
        content.includes('language') ||
        content.includes('navigationStructure');
      console.log(
        `   ${file}: ${hasSpanishUrls ? '✅ Has Spanish URLs' : '⚠️  Missing Spanish URLs'}`
      );

      if (!hasSpanishUrls) allGood = false;
    } catch {
      console.log(`   ${file}: ❌ Not found`);
      allGood = false;
    }
  }

  return { allGood };
}

async function checkMixedLanguageUrls() {
  console.log('\n🌐 Mixed Language URL Check:');

  const spanishFiles = await glob('src/app/es/**/*.{ts,tsx}', {
    ignore: ['**/node_modules/**'],
  });

  const englishPatterns = [
    '/practice-areas/',
    '/immigration/',
    '/criminal-defense/',
    '/personal-injury/',
    '/workers-compensation/',
    '/family-law/',
    '/locations/',
    '/attorneys/',
    '/about/',
    '/contact/',
  ];

  let issues = 0;
  for (const file of spanishFiles) {
    const content = await fs.readFile(file, 'utf-8');

    for (const pattern of englishPatterns) {
      if (content.includes(`"${pattern}`) || content.includes(`'${pattern}`)) {
        issues++;
        break;
      }
    }
  }

  console.log(`   Spanish files checked: ${spanishFiles.length}`);
  console.log(`   Mixed language issues: ${issues === 0 ? '✅ NONE' : `❌ ${issues} files`}`);

  return { checked: spanishFiles.length, issues };
}

async function checkStaticAssets() {
  console.log('\n📦 Static Assets Check:');

  const requiredAssets = [
    'public/manifest.json',
    'public/icons/icon-192x192.png',
    'public/apple-touch-icon.png',
    'public/favicon.ico',
    'public/blog/rss.xml',
  ];

  let allPresent = true;
  for (const asset of requiredAssets) {
    try {
      await fs.access(asset);
      console.log(`   ${asset}: ✅`);
    } catch {
      console.log(`   ${asset}: ❌ Missing`);
      allPresent = false;
    }
  }

  return { allPresent };
}

async function main() {
  console.log('🎯 Final Comprehensive Check for 3,281 Pages Per Language\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  const pageCount = await checkPageCount();
  const sitemaps = await checkSitemaps();
  const navigation = await checkNavigationFiles();
  const mixedUrls = await checkMixedLanguageUrls();
  const staticAssets = await checkStaticAssets();

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('\n📈 FINAL SUMMARY:\n');

  const targetPerLanguage = 3281;
  const englishDiff = pageCount.english - targetPerLanguage;
  const spanishDiff = pageCount.spanish - targetPerLanguage;

  console.log(`Target: ${targetPerLanguage} pages per language`);
  console.log(`Actual: ${pageCount.english} EN / ${pageCount.spanish} ES`);
  console.log(
    `Difference: ${englishDiff >= 0 ? '+' : ''}${englishDiff} EN / ${spanishDiff >= 0 ? '+' : ''}${spanishDiff} ES`
  );

  console.log('\nStatus Checks:');
  console.log(`   ✅ Page parity: ${pageCount.parity ? 'PERFECT' : 'NEEDS WORK'}`);
  console.log(
    `   ✅ Target reached: ${pageCount.english >= targetPerLanguage && pageCount.spanish >= targetPerLanguage ? 'YES' : 'NO'}`
  );
  console.log(`   ✅ Sitemaps generated: ${sitemaps.sitemapFiles > 0 ? 'YES' : 'NO'}`);
  console.log(`   ✅ Navigation fixed: ${navigation.allGood ? 'YES' : 'NO'}`);
  console.log(`   ✅ Mixed URLs fixed: ${mixedUrls.issues === 0 ? 'YES' : 'NO'}`);
  console.log(`   ✅ Static assets: ${staticAssets.allPresent ? 'ALL PRESENT' : 'SOME MISSING'}`);

  const allChecks =
    pageCount.parity &&
    pageCount.english >= targetPerLanguage &&
    pageCount.spanish >= targetPerLanguage &&
    sitemaps.sitemapFiles > 0 &&
    navigation.allGood &&
    mixedUrls.issues === 0 &&
    staticAssets.allPresent;

  console.log(
    `\n🎉 OVERALL STATUS: ${allChecks ? '✅ ALL REQUIREMENTS MET!' : '❌ SOME ISSUES REMAIN'}`
  );

  if (!allChecks) {
    console.log('\n⚠️  Remaining Tasks:');
    if (!pageCount.parity) console.log('   - Fix page parity between languages');
    if (pageCount.english < targetPerLanguage)
      console.log(`   - Create ${targetPerLanguage - pageCount.english} more English pages`);
    if (pageCount.spanish < targetPerLanguage)
      console.log(`   - Create ${targetPerLanguage - pageCount.spanish} more Spanish pages`);
    if (!navigation.allGood) console.log('   - Fix navigation components');
    if (mixedUrls.issues > 0) console.log('   - Fix mixed language URLs');
    if (!staticAssets.allPresent) console.log('   - Add missing static assets');
  }

  console.log('\n✨ Check complete!');
}

main().catch(console.error);
