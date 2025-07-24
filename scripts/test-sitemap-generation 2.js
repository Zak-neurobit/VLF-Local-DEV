#!/usr/bin/env node

const { FileSystemPageDiscovery } = require('../dist/lib/sitemap/page-discovery');
const fs = require('fs');
const path = require('path');

async function testSitemapGeneration() {
  console.log('Testing sitemap generation...\n');
  
  try {
    // First check if pages exist
    const appDir = path.join(process.cwd(), 'src/app');
    console.log('Checking app directory:', appDir);
    
    // Count page files
    const { execSync } = require('child_process');
    const pageCount = execSync(`find "${appDir}" -name "page.tsx" -o -name "page.ts" | grep -v node_modules | wc -l`).toString().trim();
    console.log(`Found ${pageCount} page files in filesystem\n`);
    
    // Show sample pages
    console.log('Sample page files:');
    const samplePages = execSync(`find "${appDir}" -name "page.tsx" -o -name "page.ts" | grep -v node_modules | head -10`).toString().trim();
    console.log(samplePages);
    console.log();
    
    // Test FileSystemPageDiscovery
    console.log('Testing FileSystemPageDiscovery...');
    const discovery = new FileSystemPageDiscovery();
    const pagePairs = await discovery.discoverAllPages();
    
    console.log(`\nDiscovered ${pagePairs.size} unique page paths`);
    
    // Count total pages
    let totalPages = 0;
    let enPages = 0;
    let esPages = 0;
    let pairedPages = 0;
    
    pagePairs.forEach(pair => {
      if (pair.en) {
        totalPages++;
        enPages++;
      }
      if (pair.es) {
        totalPages++;
        esPages++;
      }
      if (pair.en && pair.es) {
        pairedPages++;
      }
    });
    
    console.log(`\nPage Statistics:`);
    console.log(`- Total pages: ${totalPages}`);
    console.log(`- English pages: ${enPages}`);
    console.log(`- Spanish pages: ${esPages}`);
    console.log(`- Pages with both languages: ${pairedPages}`);
    
    // Show sample discovered pages
    console.log('\nSample discovered pages:');
    let count = 0;
    pagePairs.forEach((pair, normalizedPath) => {
      if (count < 10) {
        console.log(`\nPath: ${normalizedPath}`);
        if (pair.en) console.log(`  EN: ${pair.en.path}`);
        if (pair.es) console.log(`  ES: ${pair.es.path}`);
        count++;
      }
    });
    
    // Test sitemap XML generation
    console.log('\n\nTesting XML generation...');
    const samplePages = [];
    let sampleCount = 0;
    pagePairs.forEach(pair => {
      if (sampleCount < 5) {
        if (pair.en) samplePages.push(pair.en);
        if (pair.es) samplePages.push(pair.es);
        sampleCount++;
      }
    });
    
    const xml = await discovery.generateSitemapXML(samplePages);
    console.log('Sample XML output:');
    console.log(xml.substring(0, 500) + '...');
    
    // Check for specific page types
    console.log('\n\nPage Type Analysis:');
    let locationPages = 0;
    let practiceAreaPages = 0;
    let blogPages = 0;
    let nearMePages = 0;
    let attorneyPages = 0;
    
    pagePairs.forEach(pair => {
      const checkPath = (page) => {
        if (!page) return;
        if (page.path.includes('/locations') || page.path.includes('/ubicaciones')) locationPages++;
        if (page.path.includes('/practice-areas') || page.path.includes('/areas-de-practica')) practiceAreaPages++;
        if (page.path.includes('/blog')) blogPages++;
        if (page.path.includes('/near-me') || page.path.includes('/cerca-de-mi')) nearMePages++;
        if (page.path.includes('/attorneys') || page.path.includes('/abogados')) attorneyPages++;
      };
      
      checkPath(pair.en);
      checkPath(pair.es);
    });
    
    console.log(`- Location pages: ${locationPages}`);
    console.log(`- Practice area pages: ${practiceAreaPages}`);
    console.log(`- Blog pages: ${blogPages}`);
    console.log(`- Near-me pages: ${nearMePages}`);
    console.log(`- Attorney pages: ${attorneyPages}`);
    
    console.log('\n✅ Sitemap generation test complete!');
    
  } catch (error) {
    console.error('❌ Error testing sitemap generation:', error);
    process.exit(1);
  }
}

// Run the test
testSitemapGeneration();