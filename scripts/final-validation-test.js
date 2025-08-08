#!/usr/bin/env node

const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

console.log('\n✅ Vasquez Law Firm - Final Validation Test');
console.log('='.repeat(60));
console.log('Testing representative sample from all page types...\n');

const BASE_URL = 'http://localhost:3000';

// Representative test pages from each category
const testPages = {
  'Core Pages': ['/', '/about', '/contact', '/blog', '/attorneys', '/practice-areas', '/locations'],
  'Spanish Pages': [
    '/es',
    '/es/acerca-de',
    '/es/contacto',
    '/es/blog',
    '/es/abogados',
    '/es/areas-de-practica',
    '/es/ubicaciones',
  ],
  'Practice Areas': [
    '/practice-areas/immigration',
    '/practice-areas/criminal-defense',
    '/practice-areas/personal-injury',
    '/practice-areas/workers-compensation',
    '/practice-areas/family-law',
  ],
  Locations: [
    '/locations/charlotte',
    '/locations/monroe',
    '/locations/wadesboro',
    '/locations/nc/raleigh',
    '/locations/nc/durham',
  ],
  'Blog Posts': [
    '/blog/immigration-law-changes-2025',
    '/blog/personal-injury-claim-guide',
    '/blog/workers-compensation-rights',
  ],
  'Attorney Pages': [
    '/attorneys/william-vasquez',
    '/attorneys/kelly-vega',
    '/abogados/william-vasquez',
  ],
  'Near Me Pages': [
    '/near-me/charlotte-immigration-lawyer-near-me',
    '/cerca-de-mi/charlotte-abogado-inmigracion-cerca-de-mi',
  ],
};

// Test function
async function testUrl(url) {
  return new Promise(resolve => {
    http
      .get(`${BASE_URL}${url}`, { timeout: 10000 }, res => {
        let data = '';
        res.on('data', chunk => (data += chunk));
        res.on('end', () => {
          // Check for navigation links
          const hasNav = data.includes('<nav') || data.includes('navigation');
          const hasFooter = data.includes('<footer') || data.includes('footer');
          resolve({
            url,
            status: res.statusCode,
            hasNav,
            hasFooter,
            size: data.length,
          });
        });
      })
      .on('error', err => {
        resolve({ url, status: 0, error: err.message });
      })
      .on('timeout', function () {
        this.destroy();
        resolve({ url, status: 0, error: 'Timeout' });
      });
  });
}

// Main test
async function runValidation() {
  let devServer;
  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    navigation: { withNav: 0, withoutNav: 0 },
  };

  try {
    // Start server
    console.log('Starting development server...');
    devServer = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      env: { ...process.env, NODE_ENV: 'development' },
    });

    await new Promise(resolve => {
      devServer.stdout.on('data', data => {
        if (data.toString().includes('Ready')) {
          console.log('✅ Server started\n');
          setTimeout(resolve, 3000);
        }
      });
    });

    // Test all pages
    for (const [category, pages] of Object.entries(testPages)) {
      console.log(`\n📋 Testing ${category}:`);

      for (const page of pages) {
        const result = await testUrl(page);
        results.total++;

        if (result.status === 200 || (result.status >= 300 && result.status < 400)) {
          console.log(`  ✅ ${page} - ${result.status}${result.hasNav ? ' (has navigation)' : ''}`);
          results.passed++;
          if (result.hasNav) results.navigation.withNav++;
          else results.navigation.withoutNav++;
        } else {
          console.log(`  ❌ ${page} - ${result.status || result.error}`);
          results.failed++;
        }
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 FINAL VALIDATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Pages Tested: ${results.total}`);
    console.log(
      `✅ Passed: ${results.passed} (${Math.round((results.passed / results.total) * 100)}%)`
    );
    console.log(`❌ Failed: ${results.failed}`);
    console.log(`🔗 Pages with Navigation: ${results.navigation.withNav}`);
    console.log(`📄 Pages without Navigation: ${results.navigation.withoutNav}`);

    // Sitemap summary
    console.log('\n📍 SITEMAP STATUS:');
    const sitemapFiles = fs
      .readdirSync('public')
      .filter(f => f.startsWith('sitemap') && f.endsWith('.xml'));
    let totalUrls = 0;
    sitemapFiles.forEach(file => {
      const content = fs.readFileSync(`public/${file}`, 'utf8');
      const urlCount = (content.match(/<loc>/g) || []).length;
      totalUrls += urlCount;
      console.log(`   ${file}: ${urlCount} URLs`);
    });
    console.log(`   Total URLs in all sitemaps: ${totalUrls}`);

    if (results.failed === 0) {
      console.log('\n✅ ALL TESTS PASSED! The site is working correctly.');
    } else {
      console.log('\n⚠️  Some pages failed - investigation needed.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    if (devServer) {
      console.log('\nStopping server...');
      devServer.kill();
    }
  }
}

runValidation();
