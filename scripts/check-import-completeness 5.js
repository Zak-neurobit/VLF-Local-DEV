const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

async function checkImportCompleteness() {
  console.log('🔍 Checking Vasquez Law Content Import Completeness\n');

  // Count imported files
  const importDirs = {
    pages: path.join(process.cwd(), 'content-import', 'pages'),
    'complete-import': path.join(process.cwd(), 'content-import', 'complete-import'),
    'blog-posts': path.join(process.cwd(), 'content-import', 'blog-posts'),
    'autoloop-imports': path.join(process.cwd(), 'content-import', 'autoloop-imports'),
  };

  const imported = new Set();
  let totalFiles = 0;

  console.log('📁 Imported Content Summary:');

  for (const [dirName, dirPath] of Object.entries(importDirs)) {
    try {
      const files = await fs.readdir(dirPath);
      const jsonFiles = files.filter(f => f.endsWith('.json'));
      console.log(`   ${dirName}: ${jsonFiles.length} files`);
      totalFiles += jsonFiles.length;

      // Read URLs from files
      for (const file of jsonFiles) {
        try {
          const content = JSON.parse(await fs.readFile(path.join(dirPath, file), 'utf-8'));
          if (content.url) {
            imported.add(content.url.replace(/\/$/, ''));
          }
        } catch (e) {
          // Skip invalid files
        }
      }
    } catch (e) {
      console.log(`   ${dirName}: 0 files (directory not found)`);
    }
  }

  console.log(`\n📊 Total imported files: ${totalFiles}`);
  console.log(`📊 Unique URLs imported: ${imported.size}\n`);

  // Check what's on the live site
  console.log('🌐 Checking vasquezlawnc.com for all pages...\n');

  const liveUrls = await crawlSite();
  console.log(`📊 Total URLs on live site: ${liveUrls.size}\n`);

  // Find missing URLs
  const missing = [];
  for (const url of liveUrls) {
    if (!imported.has(url.replace(/\/$/, ''))) {
      missing.push(url);
    }
  }

  console.log(`❓ Missing URLs: ${missing.length}\n`);

  if (missing.length > 0) {
    console.log('📋 Missing pages that need to be imported:');
    missing.forEach((url, i) => {
      console.log(`   ${i + 1}. ${url}`);
    });

    // Group by type
    const byType = {
      blog: missing.filter(
        u =>
          u.includes('/blog/') ||
          u.includes('best-') ||
          u.includes('como-') ||
          u.includes('expert-')
      ),
      spanish: missing.filter(u => u.includes('/es/')),
      practice: missing.filter(
        u => u.includes('immigration') || u.includes('injury') || u.includes('defense')
      ),
      other: missing.filter(
        u => !u.includes('/blog/') && !u.includes('/es/') && !u.includes('immigration')
      ),
    };

    console.log('\n📊 Missing content by type:');
    console.log(`   Blog posts: ${byType.blog.length}`);
    console.log(`   Spanish pages: ${byType.spanish.length}`);
    console.log(`   Practice areas: ${byType.practice.length}`);
    console.log(`   Other pages: ${byType.other.length}`);
  }

  // Calculate completeness
  const completeness = Math.round((imported.size / liveUrls.size) * 100);
  console.log(`\n✅ Import Completeness: ${completeness}%`);

  if (completeness < 100) {
    console.log('\n💡 To import remaining content, run:');
    console.log('   node scripts/import-remaining-content.js');
  } else {
    console.log('\n🎉 ALL CONTENT HAS BEEN IMPORTED!');
  }

  // Save report
  const report = {
    checkDate: new Date().toISOString(),
    imported: {
      total: imported.size,
      urls: Array.from(imported).sort(),
    },
    live: {
      total: liveUrls.size,
      urls: Array.from(liveUrls).sort(),
    },
    missing: missing.sort(),
    completeness: completeness,
  };

  await fs.writeFile(
    path.join(process.cwd(), 'content-import', 'completeness-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\n📄 Full report saved to: content-import/completeness-report.json');
}

async function crawlSite() {
  const baseUrl = 'https://www.vasquezlawnc.com';
  const discovered = new Set();
  const toVisit = new Set([baseUrl]);
  const visited = new Set();

  while (toVisit.size > 0 && discovered.size < 500) {
    const url = toVisit.values().next().value;
    toVisit.delete(url);

    if (visited.has(url)) continue;
    visited.add(url);

    try {
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      discovered.add(url);

      // Find all links
      $('a[href]').each((i, elem) => {
        const href = $(elem).attr('href');
        if (href && !href.startsWith('#') && !href.includes('mailto:') && !href.includes('tel:')) {
          let fullUrl = href;
          if (!href.startsWith('http')) {
            fullUrl = new URL(href, baseUrl).href;
          }

          if (
            fullUrl.startsWith(baseUrl) &&
            !fullUrl.includes('.pdf') &&
            !fullUrl.includes('.jpg') &&
            !fullUrl.includes('.png')
          ) {
            toVisit.add(fullUrl.replace(/\/$/, ''));
          }
        }
      });

      // Also check sitemap on first page
      if (url === baseUrl) {
        try {
          const sitemapResponse = await axios.get(`${baseUrl}/sitemap.xml`);
          const $sitemap = cheerio.load(sitemapResponse.data, { xmlMode: true });

          $sitemap('loc').each((i, elem) => {
            const sitemapUrl = $sitemap(elem).text().trim();
            if (sitemapUrl.startsWith(baseUrl)) {
              toVisit.add(sitemapUrl.replace(/\/$/, ''));
            }
          });
        } catch (e) {
          // No sitemap
        }
      }
    } catch (error) {
      // Skip errors
    }

    if (discovered.size % 50 === 0 && discovered.size > 0) {
      process.stdout.write(`\r   Discovered ${discovered.size} pages...`);
    }
  }

  process.stdout.write(`\r   Discovered ${discovered.size} pages...✓\n`);
  return discovered;
}

checkImportCompleteness().catch(console.error);
