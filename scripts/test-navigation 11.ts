#!/usr/bin/env node

import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';

interface NavigationTest {
  url: string;
  status: number;
  title: string;
  links: string[];
  errors: string[];
}

async function testNavigation() {
  console.log('🚀 Starting navigation test...\n');

  const results: NavigationTest[] = [];
  const testedUrls = new Set<string>();
  const baseUrl = 'http://localhost:3000';

  // Start with key pages
  const pagesToTest = [
    '/',
    '/about',
    '/attorneys',
    '/practice-areas',
    '/practice-areas/immigration',
    '/practice-areas/personal-injury',
    '/practice-areas/workers-compensation',
    '/practice-areas/criminal-defense',
    '/practice-areas/family-law',
    '/practice-areas/traffic-violations',
    '/locations',
    '/locations/smithfield',
    '/locations/raleigh',
    '/locations/charlotte',
    '/locations/orlando',
    '/contact',
    '/blog',
    '/testimonials',
    '/case-results',
    '/free-consultation',
    '/es',
    '/es/areas-de-practica',
    '/es/abogados',
    '/es/contacto',
  ];

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const pagePath of pagesToTest) {
      if (testedUrls.has(pagePath)) continue;
      testedUrls.add(pagePath);

      const page = await browser.newPage();
      const errors: string[] = [];

      // Capture console errors
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      page.on('pageerror', error => {
        errors.push(error.message);
      });

      try {
        console.log(`Testing: ${pagePath}`);
        const response = await page.goto(`${baseUrl}${pagePath}`, {
          waitUntil: 'networkidle2',
          timeout: 30000,
        });

        const status = response?.status() || 0;
        const title = await page.title();

        // Get all links on the page
        const links = await page.evaluate(() => {
          const anchors = document.querySelectorAll('a[href]');
          return Array.from(anchors).map(a => (a as HTMLAnchorElement).href);
        });

        // Filter and clean links
        const internalLinks = links
          .filter(link => link.startsWith('http://localhost:3000'))
          .map(link => link.replace('http://localhost:3000', ''))
          .filter(link => link && link !== '#');

        results.push({
          url: pagePath,
          status,
          title,
          links: [...new Set(internalLinks)],
          errors,
        });

        console.log(`  ✅ Status: ${status}, Title: ${title}`);
        console.log(`  📎 Found ${internalLinks.length} internal links`);
        if (errors.length > 0) {
          console.log(`  ❌ Errors: ${errors.length}`);
        }
      } catch (error) {
        console.log(`  ❌ Failed to load: ${error.message}`);
        results.push({
          url: pagePath,
          status: 0,
          title: 'Failed to load',
          links: [],
          errors: [error.message],
        });
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }

  // Generate report
  const successfulPages = results.filter(r => r.status === 200);
  const failedPages = results.filter(r => r.status !== 200);
  const pagesWithErrors = results.filter(r => r.errors.length > 0);

  console.log('\n📊 Navigation Test Summary:');
  console.log(`✅ Successful pages: ${successfulPages.length}/${results.length}`);
  console.log(`❌ Failed pages: ${failedPages.length}`);
  console.log(`⚠️  Pages with console errors: ${pagesWithErrors.length}`);

  if (failedPages.length > 0) {
    console.log('\n❌ Failed Pages:');
    failedPages.forEach(page => {
      console.log(`  - ${page.url} (Status: ${page.status})`);
    });
  }

  if (pagesWithErrors.length > 0) {
    console.log('\n⚠️  Pages with Errors:');
    pagesWithErrors.forEach(page => {
      console.log(`  - ${page.url}`);
      page.errors.forEach(error => {
        console.log(`    • ${error}`);
      });
    });
  }

  // Save detailed report
  await fs.writeFile(
    'navigation-test-report.json',
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        summary: {
          total: results.length,
          successful: successfulPages.length,
          failed: failedPages.length,
          withErrors: pagesWithErrors.length,
        },
        results,
      },
      null,
      2
    )
  );

  console.log('\n📄 Detailed report saved to navigation-test-report.json');

  // Also create a sitemap of all discovered links
  const allDiscoveredLinks = new Set<string>();
  results.forEach(result => {
    result.links.forEach(link => allDiscoveredLinks.add(link));
  });

  console.log(`\n🗺️  Discovered ${allDiscoveredLinks.size} unique internal links`);

  return failedPages.length === 0;
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000');
    return response.ok;
  } catch {
    return false;
  }
}

// Main execution
(async () => {
  const serverRunning = await checkServer();
  if (!serverRunning) {
    console.error('❌ Server is not running at http://localhost:3000');
    console.error('Please run: npm run dev');
    process.exit(1);
  }

  try {
    const success = await testNavigation();
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();
