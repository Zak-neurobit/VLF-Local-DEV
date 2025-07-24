const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function monitorSitemapCoverage() {
  console.log('Sitemap Coverage Monitor');
  console.log('========================\n');

  const results = {
    actualPages: [],
    missingFromSitemap: [],
    coverage: 0,
  };

  try {
    // 1. Find all page.tsx files
    const pageFiles = await glob('src/app/**/page.tsx', {
      ignore: ['**/node_modules/**', '**/api/**'],
    });

    console.log(`Found ${pageFiles.length} page files\n`);

    // 2. Convert file paths to URLs
    const urls = pageFiles.map(file => {
      let url = file
        .replace('src/app', '')
        .replace('/page.tsx', '')
        .replace(/\\/g, '/');
      
      // Handle root page
      if (url === '') url = '/';
      
      return url;
    });

    // 3. Check sitemap (if running)
    try {
      const response = await fetch('http://localhost:3000/api/sitemap');
      if (response.ok) {
        const sitemapXml = await response.text();
        const urlMatches = sitemapXml.match(/<loc>([^<]+)<\/loc>/g) || [];
        const sitemapUrls = urlMatches.map(match => 
          match.replace('<loc>', '').replace('</loc>', '').replace('https://vasquezlawnc.com', '')
        );

        console.log(`Sitemap contains ${sitemapUrls.length} URLs\n`);

        // Find missing pages
        const sitemapSet = new Set(sitemapUrls);
        const missing = urls.filter(url => !sitemapSet.has(url));

        if (missing.length > 0) {
          console.log('Pages missing from sitemap:');
          console.log('---------------------------');
          missing.forEach(url => console.log(`  - ${url}`));
        } else {
          console.log('✅ All discovered pages are in the sitemap!');
        }

        results.coverage = ((sitemapUrls.length / 1318) * 100).toFixed(1);
        console.log(`\nSitemap Coverage: ${results.coverage}% of 1,318 pages`);
      }
    } catch (error) {
      console.log('Note: Could not fetch sitemap (server may not be running)');
    }

    // 4. Category breakdown
    console.log('\nPage Category Breakdown:');
    console.log('------------------------');
    
    const categories = {
      'Root pages': urls.filter(u => u.split('/').length <= 2).length,
      'Location pages': urls.filter(u => u.includes('/locations/')).length,
      'Practice area pages': urls.filter(u => u.includes('/practice-areas/')).length,
      'Attorney pages': urls.filter(u => u.includes('/attorneys/')).length,
      'Blog pages': urls.filter(u => u.includes('/blog/')).length,
      'Spanish pages': urls.filter(u => u.includes('/es/')).length,
      'Resource pages': urls.filter(u => u.includes('/resources/')).length,
      'Near-me pages': urls.filter(u => u.includes('/near-me/')).length,
      'Other pages': urls.filter(u => 
        !u.includes('/locations/') && 
        !u.includes('/practice-areas/') && 
        !u.includes('/attorneys/') && 
        !u.includes('/blog/') && 
        !u.includes('/es/') && 
        !u.includes('/resources/') &&
        !u.includes('/near-me/') &&
        u !== '/'
      ).length,
    };

    for (const [category, count] of Object.entries(categories)) {
      console.log(`${category}: ${count}`);
    }

    const totalFound = Object.values(categories).reduce((sum, count) => sum + count, 0);
    console.log(`\nTotal pages found: ${totalFound}`);
    console.log(`Gap to 1,318: ${1318 - totalFound} pages`);

    // 5. Recommendations
    console.log('\nRecommendations to reach 1,318 pages:');
    console.log('-------------------------------------');
    
    if (categories['Location pages'] < 729) {
      console.log(`- Add ${729 - categories['Location pages']} more location pages`);
      console.log('  * Add all Florida city pages');
      console.log('  * Add county-level pages for NC');
      console.log('  * Add neighborhood pages for major cities');
    }

    if (!urls.some(u => u.includes('/fl/'))) {
      console.log('- Create Florida location structure (/locations/fl/*)');
    }

    console.log('- Ensure all pages have Spanish versions');
    console.log('- Add blog category and tag pages');
    console.log('- Add FAQ sub-pages by topic');
    console.log('- Add calculator pages for each practice area');

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the monitor
monitorSitemapCoverage();