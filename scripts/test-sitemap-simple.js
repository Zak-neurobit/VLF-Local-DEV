#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function testSitemapSimple() {
  console.log('Testing sitemap discovery...\n');
  
  const appDir = path.join(process.cwd(), 'src/app');
  
  // Count total page files
  const totalCount = execSync(`find "${appDir}" -name "page.tsx" -o -name "page.ts" | grep -v node_modules | wc -l`).toString().trim();
  console.log(`Total page files found: ${totalCount}`);
  
  // Count by category
  console.log('\nPage breakdown by category:');
  
  // English pages (not under /es)
  const enCount = execSync(`find "${appDir}" -name "page.tsx" -o -name "page.ts" | grep -v node_modules | grep -v "/es/" | wc -l`).toString().trim();
  console.log(`- English pages: ${enCount}`);
  
  // Spanish pages (under /es)
  const esCount = execSync(`find "${appDir}" -path "*/es/*" -name "page.tsx" -o -path "*/es/*" -name "page.ts" | grep -v node_modules | wc -l`).toString().trim();
  console.log(`- Spanish pages: ${esCount}`);
  
  // Location pages
  const locationCount = execSync(`find "${appDir}" -path "*/locations/*" -name "page.tsx" -o -path "*/locations/*" -name "page.ts" | grep -v node_modules | wc -l`).toString().trim();
  console.log(`- Location pages: ${locationCount}`);
  
  // Practice area pages
  const practiceCount = execSync(`find "${appDir}" -path "*/practice-areas/*" -name "page.tsx" -o -path "*/practice-areas/*" -name "page.ts" | grep -v node_modules | wc -l`).toString().trim();
  console.log(`- Practice area pages: ${practiceCount}`);
  
  // Blog pages
  const blogCount = execSync(`find "${appDir}" -path "*/blog/*" -name "page.tsx" -o -path "*/blog/*" -name "page.ts" | grep -v node_modules | wc -l`).toString().trim();
  console.log(`- Blog pages: ${blogCount}`);
  
  // Near-me pages
  const nearMeCount = execSync(`find "${appDir}" -path "*/near-me/*" -name "page.tsx" -o -path "*/near-me/*" -name "page.ts" | grep -v node_modules | wc -l`).toString().trim();
  console.log(`- Near-me pages: ${nearMeCount}`);
  
  // Attorney pages
  const attorneyCount = execSync(`find "${appDir}" -path "*/attorneys/*" -name "page.tsx" -o -path "*/attorneys/*" -name "page.ts" -o -path "*/abogados/*" -name "page.tsx" | grep -v node_modules | wc -l`).toString().trim();
  console.log(`- Attorney pages: ${attorneyCount}`);
  
  // Show sample location pages
  console.log('\nSample location pages:');
  const locationSamples = execSync(`find "${appDir}" -path "*/locations/*" -name "page.tsx" | grep -v node_modules | head -10`).toString().trim();
  console.log(locationSamples);
  
  // Check for NC cities
  console.log('\nChecking NC city pages:');
  const ncCityCount = execSync(`find "${appDir}" -path "*/locations/nc/*" -name "page.tsx" | grep -v node_modules | wc -l`).toString().trim();
  console.log(`- NC city pages found: ${ncCityCount}`);
  
  // Check existing sitemaps in public folder
  console.log('\nExisting sitemaps in public folder:');
  const sitemaps = execSync(`ls -la public/sitemap*.xml 2>/dev/null || echo "No sitemaps found"`).toString().trim();
  console.log(sitemaps);
  
  // Test accessing sitemap through Next.js
  console.log('\nTesting sitemap.xml route...');
  try {
    const sitemapPath = path.join(appDir, 'sitemap.ts');
    if (fs.existsSync(sitemapPath)) {
      console.log('✅ sitemap.ts exists at:', sitemapPath);
      
      // Check if it imports FileSystemPageDiscovery
      const content = fs.readFileSync(sitemapPath, 'utf-8');
      if (content.includes('FileSystemPageDiscovery')) {
        console.log('✅ sitemap.ts uses FileSystemPageDiscovery');
      } else {
        console.log('❌ sitemap.ts does NOT use FileSystemPageDiscovery');
      }
    } else {
      console.log('❌ sitemap.ts not found');
    }
  } catch (error) {
    console.error('Error checking sitemap.ts:', error.message);
  }
  
  console.log('\n✅ Sitemap analysis complete!');
}

// Run the test
testSitemapSimple();