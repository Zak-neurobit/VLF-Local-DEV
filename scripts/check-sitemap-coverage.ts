#!/usr/bin/env node
import { SEOOptimizationService } from '../src/services/seo-optimization';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs';

async function checkSitemapCoverage() {
  console.log('🔍 Checking sitemap coverage...\n');

  // Generate sitemap
  const sitemap = await SEOOptimizationService.generateSitemap();
  
  // Extract URLs from sitemap
  const urlMatches = sitemap.match(/<loc>(.*?)<\/loc>/g) || [];
  const sitemapUrls = urlMatches.map(match => 
    match.replace('<loc>', '').replace('</loc>', '').replace('https://vasquezlawnc.com', '')
  );

  console.log(`📊 Total URLs in sitemap: ${sitemapUrls.length}`);

  // Find all actual page files
  const appDir = path.join(process.cwd(), 'src/app');
  const pageFiles = await glob('**/page.tsx', {
    cwd: appDir,
    ignore: ['**/api/**', '**/portal/**', '**/admin/**', '**/_*/**', '**/[[...segments]]/**'],
  });

  const actualPaths = pageFiles.map(file => {
    const dir = path.dirname(file);
    return dir === '.' ? '/' : `/${dir}`;
  }).filter(p => !p.includes('[') && !p.includes('indexet_blog'));

  console.log(`📁 Total page files found: ${actualPaths.length}`);

  // Find missing pages
  const missingFromSitemap = actualPaths.filter(path => 
    !sitemapUrls.some(url => url === path || url.endsWith(path))
  );

  if (missingFromSitemap.length > 0) {
    console.log(`\n❌ Pages missing from sitemap (${missingFromSitemap.length}):`);
    missingFromSitemap.forEach(path => console.log(`   ${path}`));
  }

  // Count by category
  const categories = {
    static: sitemapUrls.filter(u => !u.includes('/locations/') && !u.includes('/practice-areas/') && !u.includes('/blog/') && !u.includes('/near-me/')).length,
    locations: sitemapUrls.filter(u => u.includes('/locations/') || u.includes('/ubicaciones/')).length,
    practiceAreas: sitemapUrls.filter(u => u.includes('/practice-areas/') || u.includes('/areas-de-practica/')).length,
    blog: sitemapUrls.filter(u => u.includes('/blog/')).length,
    nearMe: sitemapUrls.filter(u => u.includes('/near-me/')).length,
    spanish: sitemapUrls.filter(u => u.startsWith('/es/')).length,
  };

  console.log('\n📈 URL Distribution:');
  console.log(`   Static pages: ${categories.static}`);
  console.log(`   Location pages: ${categories.locations}`);
  console.log(`   Practice area pages: ${categories.practiceAreas}`);
  console.log(`   Blog posts: ${categories.blog}`);
  console.log(`   Near-me pages: ${categories.nearMe}`);
  console.log(`   Spanish pages: ${categories.spanish}`);

  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    totalUrlsInSitemap: sitemapUrls.length,
    totalPageFiles: actualPaths.length,
    missingFromSitemap: missingFromSitemap.length,
    categories,
    targetGoal: 1318,
    percentageComplete: Math.round((sitemapUrls.length / 1318) * 100),
  };

  fs.writeFileSync(
    path.join(process.cwd(), 'sitemap-coverage-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log(`\n✅ Coverage: ${report.percentageComplete}% of target 1,318 pages`);
  console.log('📄 Detailed report saved to sitemap-coverage-report.json');
}

// Run the script
checkSitemapCoverage().catch(console.error);