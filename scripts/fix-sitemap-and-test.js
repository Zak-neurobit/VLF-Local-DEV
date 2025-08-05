#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🔧 Vasquez Law Firm - Sitemap Fix & Complete Test');
console.log('='.repeat(60));

// Step 1: Analyze current state
console.log('\n📊 STEP 1: Analyzing current state...\n');

// Count pages in file system
function getAllPageFiles() {
  const pages = new Set();
  const appDir = path.join(process.cwd(), 'src/app');

  function scanDirectory(dir, basePath = '') {
    if (!fs.existsSync(dir)) return;

    try {
      const items = fs.readdirSync(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          // Skip special directories
          if (item === 'node_modules' || item.startsWith('.') || item === 'api') {
            continue;
          }

          // Check for page file
          const pageFiles = ['page.tsx', 'page.js'];
          let hasPage = false;

          for (const pageFile of pageFiles) {
            if (fs.existsSync(path.join(fullPath, pageFile))) {
              hasPage = true;
              break;
            }
          }

          if (hasPage) {
            // Convert to route
            let route = basePath;

            // Skip route groups
            if (item.startsWith('(') && item.endsWith(')')) {
              scanDirectory(fullPath, basePath);
              continue;
            }

            // Handle dynamic routes
            if (item.startsWith('[') && item.endsWith(']')) {
              // Skip generic dynamic routes for now
              continue;
            }

            route = path.join(basePath, item).replace(/\\/g, '/');
            pages.add('/' + route);
          }

          // Always recurse
          scanDirectory(fullPath, path.join(basePath, item));
        }
      }
    } catch (error) {
      console.error(`Error scanning ${dir}:`, error.message);
    }
  }

  scanDirectory(appDir);
  pages.add('/'); // Add root

  return Array.from(pages);
}

// Get URLs from sitemap
function getSitemapUrls() {
  const urls = new Set();
  const sitemapPath = path.join(process.cwd(), 'public/sitemap-complete.xml');

  if (fs.existsSync(sitemapPath)) {
    const content = fs.readFileSync(sitemapPath, 'utf8');
    const matches = content.match(/<loc>([^<]+)<\/loc>/g) || [];

    matches.forEach(match => {
      const url = match
        .replace(/<\/?loc>/g, '')
        .replace('https://www.vasquezlawnc.com', '')
        .replace('http://www.vasquezlawnc.com', '');
      urls.add(url || '/');
    });
  }

  return Array.from(urls);
}

// Analyze
const fileSystemPages = getAllPageFiles();
const sitemapUrls = getSitemapUrls();

console.log(`📁 Pages in file system: ${fileSystemPages.length}`);
console.log(`📄 URLs in sitemap: ${sitemapUrls.length}`);

// Find differences
const inFileSystemOnly = fileSystemPages.filter(page => !sitemapUrls.includes(page));
const inSitemapOnly = sitemapUrls.filter(url => !fileSystemPages.includes(url));

console.log(`\n📊 Analysis Results:`);
console.log(`   - Pages missing from sitemap: ${inFileSystemOnly.length}`);
console.log(`   - URLs in sitemap but not in files: ${inSitemapOnly.length}`);

if (inFileSystemOnly.length > 0) {
  console.log('\n   Sample pages missing from sitemap:');
  inFileSystemOnly.slice(0, 10).forEach(page => {
    console.log(`     - ${page}`);
  });
  if (inFileSystemOnly.length > 10) {
    console.log(`     ... and ${inFileSystemOnly.length - 10} more`);
  }
}

// Step 2: Generate sitemap
console.log('\n\n🔧 STEP 2: Regenerating sitemap...\n');

try {
  console.log('Running sitemap generation script...');
  execSync('npx tsx scripts/generate-complete-sitemaps.ts', { stdio: 'inherit' });
  console.log('✅ Sitemap regenerated successfully');
} catch (error) {
  console.log('⚠️  Sitemap generation failed, continuing with existing sitemap');
}

// Step 3: Run quick validation test
console.log('\n\n🧪 STEP 3: Running validation test...\n');

const { spawn } = require('child_process');
const http = require('http');

function testUrl(url) {
  return new Promise(resolve => {
    http
      .get(url, { timeout: 5000 }, res => {
        resolve({ status: res.statusCode });
      })
      .on('error', () => {
        resolve({ status: 0 });
      })
      .on('timeout', function () {
        this.destroy();
        resolve({ status: 0 });
      });
  });
}

async function runQuickTest() {
  // Test a sample of pages
  const testPages = [
    '/',
    '/about',
    '/contact',
    '/attorneys',
    '/practice-areas',
    '/locations',
    '/blog',
    '/es',
    '/es/contacto',
    '/practice-areas/immigration',
    '/locations/charlotte',
    '/attorneys/william-vasquez',
  ];

  console.log('Testing critical pages...\n');

  let passed = 0;
  let failed = 0;

  for (const page of testPages) {
    const result = await testUrl(`http://localhost:3000${page}`);
    if (result.status === 200 || (result.status >= 300 && result.status < 400)) {
      console.log(`✅ ${page} - ${result.status}`);
      passed++;
    } else {
      console.log(`❌ ${page} - ${result.status || 'Failed'}`);
      failed++;
    }
  }

  console.log(`\n✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);

  return failed === 0;
}

// Start server and run test
async function runValidation() {
  console.log('Starting development server...');

  const devServer = spawn('npm', ['run', 'dev'], {
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

  const testPassed = await runQuickTest();

  console.log('\nStopping server...');
  devServer.kill();

  // Final summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL SUMMARY');
  console.log('='.repeat(60));

  const newSitemapCount = getSitemapUrls().length;
  console.log(`\n📄 Sitemap Status:`);
  console.log(`   - Original sitemap URLs: ${sitemapUrls.length}`);
  console.log(`   - Current sitemap URLs: ${newSitemapCount}`);
  console.log(`   - File system pages: ${fileSystemPages.length}`);

  if (testPassed) {
    console.log('\n✅ All critical pages are working!');
  } else {
    console.log('\n⚠️  Some pages are failing - investigation needed');
  }

  console.log('\n📝 Recommendations:');
  console.log('1. Review pages that are in sitemap but not in file system');
  console.log('2. Ensure all legitimate pages are included in sitemap');
  console.log('3. Run full test suite: node scripts/test-sitemap-pages-only.js');
  console.log('4. Update sitemap regularly as pages are added/removed');
}

// Run everything
runValidation().catch(console.error);
