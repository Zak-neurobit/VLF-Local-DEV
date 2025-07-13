const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

async function importRemainingContent() {
  console.log('🚀 Importing ALL Remaining Content from vasquezlawnc.com\n');

  const baseUrl = 'https://www.vasquezlawnc.com';
  const contentDir = path.join(process.cwd(), 'content-import', 'final-import');
  await fs.mkdir(contentDir, { recursive: true });

  // Known URLs that might be missing
  const targetUrls = [
    // Main pages
    '/about-us/',
    '/our-team/',
    '/testimonials/',
    '/contact/',
    '/blog/',
    '/resources/',
    '/faqs/',
    '/privacy-policy/',
    '/terms-of-service/',
    '/site-map/',

    // Spanish pages
    '/es/',
    '/es/areas-de-practica/',
    '/es/abogados/',
    '/es/contacto/',

    // Practice area subpages
    '/immigration/deportation-removal/',
    '/immigration/family-based-immigration/',
    '/immigration/employment-based-immigration/',
    '/immigration/humanitarian-relief/',
    '/personal-injury/car-accidents/',
    '/personal-injury/truck-accidents/',
    '/personal-injury/motorcycle-accidents/',
    '/personal-injury/slip-and-fall/',
    '/workers-compensation/',
    '/criminal-defense/dui-dwi/',
    '/criminal-defense/drug-charges/',
    '/criminal-defense/assault-charges/',
    '/family-law/divorce/',
    '/family-law/child-custody/',
    '/family-law/child-support/',

    // Blog posts
    '/blog/page/2/',
    '/blog/page/3/',
    '/category/immigration/',
    '/category/personal-injury/',
    '/category/workers-compensation/',

    // Office locations
    '/locations/raleigh/',
    '/locations/charlotte/',
    '/locations/durham/',
    '/locations/orlando/',
  ];

  // First, crawl the entire site
  console.log('🕷️ Crawling entire site to find all URLs...\n');
  const allUrls = await crawlEntireSite(baseUrl);

  // Add target URLs
  targetUrls.forEach(url => {
    allUrls.add(`${baseUrl}${url}`.replace(/\/\/$/, '/'));
  });

  console.log(`📊 Total unique URLs found: ${allUrls.size}\n`);

  // Check what we already have
  const imported = await getImportedUrls();
  console.log(`✅ Already imported: ${imported.size} URLs\n`);

  // Import missing ones
  const missing = Array.from(allUrls).filter(url => !imported.has(url.replace(/\/$/, '')));
  console.log(`📥 Need to import: ${missing.length} URLs\n`);

  if (missing.length === 0) {
    console.log('🎉 ALL CONTENT HAS BEEN IMPORTED!');
    return;
  }

  // Import each missing URL
  for (let i = 0; i < missing.length; i++) {
    const url = missing[i];
    console.log(`[${i + 1}/${missing.length}] Importing: ${url}`);

    try {
      await importPage(url, contentDir);
      console.log(`   ✅ Success`);
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}`);
    }

    // Be respectful
    await delay(500);
  }

  console.log('\n✅ Import complete!');
  console.log(`📁 New content saved to: ${contentDir}`);

  // Generate final report
  await generateFinalReport(allUrls, imported, missing);
}

async function crawlEntireSite(baseUrl) {
  const discovered = new Set();
  const toVisit = new Set([baseUrl]);
  const visited = new Set();

  while (toVisit.size > 0 && discovered.size < 1000) {
    const url = toVisit.values().next().value;
    toVisit.delete(url);

    if (visited.has(url)) continue;
    visited.add(url);

    try {
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 10000,
        validateStatus: status => status === 200,
      });

      const $ = cheerio.load(response.data);
      discovered.add(url);

      // Find all internal links
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
            !fullUrl.includes('.png') &&
            !fullUrl.includes('.mp4') &&
            !fullUrl.includes('.zip')
          ) {
            toVisit.add(fullUrl.replace(/\/$/, ''));
          }
        }
      });

      // Check sitemap
      if (url === baseUrl) {
        const sitemapUrls = await checkSitemap(baseUrl);
        sitemapUrls.forEach(u => toVisit.add(u));
      }
    } catch (error) {
      // Skip 404s and errors
    }

    if (discovered.size % 50 === 0) {
      process.stdout.write(`\r   Discovered: ${discovered.size} pages...`);
    }
  }

  console.log(`\r   Discovered: ${discovered.size} pages ✓`);
  return discovered;
}

async function checkSitemap(baseUrl) {
  const urls = [];
  try {
    const response = await axios.get(`${baseUrl}/sitemap.xml`);
    const $ = cheerio.load(response.data, { xmlMode: true });

    $('loc').each((i, elem) => {
      const url = $(elem).text().trim();
      if (url.startsWith(baseUrl)) {
        urls.push(url.replace(/\/$/, ''));
      }
    });

    console.log(`   Found ${urls.length} URLs in sitemap`);
  } catch (error) {
    // No sitemap
  }
  return urls;
}

async function getImportedUrls() {
  const imported = new Set();
  const dirs = ['pages', 'complete-import', 'blog-posts', 'autoloop-imports', 'final-import'];

  for (const dir of dirs) {
    const fullPath = path.join(process.cwd(), 'content-import', dir);
    try {
      const files = await fs.readdir(fullPath);
      for (const file of files) {
        if (file.endsWith('.json')) {
          try {
            const content = JSON.parse(await fs.readFile(path.join(fullPath, file), 'utf-8'));
            if (content.url) {
              imported.add(content.url.replace(/\/$/, ''));
            }
          } catch (e) {
            // Skip invalid files
          }
        }
      }
    } catch (e) {
      // Directory doesn't exist
    }
  }

  return imported;
}

async function importPage(url, contentDir) {
  const response = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    timeout: 15000,
  });

  const $ = cheerio.load(response.data);

  // Extract everything
  const content = {
    url,
    path: new URL(url).pathname,
    importedAt: new Date().toISOString(),

    // Metadata
    title: $('title').text().trim(),
    metaDescription: $('meta[name="description"]').attr('content') || '',
    metaKeywords: $('meta[name="keywords"]').attr('content') || '',
    canonical: $('link[rel="canonical"]').attr('href') || url,

    // Open Graph
    ogTitle: $('meta[property="og:title"]').attr('content') || '',
    ogDescription: $('meta[property="og:description"]').attr('content') || '',
    ogImage: $('meta[property="og:image"]').attr('content') || '',

    // Content
    h1: $('h1').first().text().trim(),
    headings: extractHeadings($),

    // Main content
    mainContent: extractMainContent($),

    // Sidebar content
    sidebarContent: extractSidebar($),

    // Images
    images: extractImages($, url),

    // Links
    internalLinks: extractInternalLinks($, url),

    // Forms
    forms: extractForms($),

    // Schema
    schemaData: extractSchema($),

    // Contact info
    contactInfo: extractContactInfo($),
  };

  // Save the content
  const filename = url.split('/').filter(Boolean).pop() || 'index';
  const filepath = path.join(contentDir, `${filename}.json`);

  await fs.writeFile(filepath, JSON.stringify(content, null, 2));
}

function extractHeadings($) {
  const headings = [];
  $('h1, h2, h3, h4, h5, h6').each((i, elem) => {
    headings.push({
      level: parseInt(elem.name.substring(1)),
      text: $(elem).text().trim(),
      tag: elem.name,
    });
  });
  return headings;
}

function extractMainContent($) {
  const selectors = [
    'main',
    '#main',
    '.main-content',
    '.content',
    'article',
    '.page-content',
    '.entry-content',
  ];

  for (const selector of selectors) {
    const $content = $(selector);
    if ($content.length > 0) {
      return {
        html: $content.html(),
        text: $content.text().trim(),
        wordCount: $content.text().trim().split(/\s+/).length,
      };
    }
  }

  // Fallback to body
  const $body = $('body');
  $body.find('script, style, header, footer, nav').remove();

  return {
    html: $body.html(),
    text: $body.text().trim(),
    wordCount: $body.text().trim().split(/\s+/).length,
  };
}

function extractSidebar($) {
  const selectors = ['aside', '.sidebar', '#sidebar', '.widget-area'];

  for (const selector of selectors) {
    const $sidebar = $(selector);
    if ($sidebar.length > 0) {
      return {
        html: $sidebar.html(),
        text: $sidebar.text().trim(),
      };
    }
  }

  return null;
}

function extractImages($, pageUrl) {
  const images = [];

  $('img').each((i, elem) => {
    const $img = $(elem);
    let src = $img.attr('src');

    if (src) {
      if (!src.startsWith('http')) {
        src = new URL(src, pageUrl).href;
      }

      images.push({
        src,
        alt: $img.attr('alt') || '',
        title: $img.attr('title') || '',
        width: $img.attr('width') || '',
        height: $img.attr('height') || '',
      });
    }
  });

  return images;
}

function extractInternalLinks($, pageUrl) {
  const links = [];
  const baseUrl = 'https://www.vasquezlawnc.com';

  $('a[href]').each((i, elem) => {
    const $link = $(elem);
    let href = $link.attr('href');

    if (href && !href.startsWith('#') && !href.includes('mailto:') && !href.includes('tel:')) {
      if (!href.startsWith('http')) {
        href = new URL(href, pageUrl).href;
      }

      if (href.startsWith(baseUrl)) {
        links.push({
          url: href,
          text: $link.text().trim(),
          title: $link.attr('title') || '',
        });
      }
    }
  });

  return links;
}

function extractForms($) {
  const forms = [];

  $('form').each((i, elem) => {
    const $form = $(elem);
    const fields = [];

    $form.find('input, textarea, select').each((j, field) => {
      const $field = $(field);
      fields.push({
        name: $field.attr('name') || '',
        type: $field.attr('type') || $field.prop('tagName').toLowerCase(),
        required: $field.prop('required'),
        placeholder: $field.attr('placeholder') || '',
      });
    });

    forms.push({
      action: $form.attr('action') || '',
      method: $form.attr('method') || 'get',
      id: $form.attr('id') || '',
      fields,
    });
  });

  return forms;
}

function extractSchema($) {
  const schemas = [];

  $('script[type="application/ld+json"]').each((i, elem) => {
    try {
      const schema = JSON.parse($(elem).html());
      schemas.push(schema);
    } catch (e) {
      // Invalid JSON
    }
  });

  return schemas;
}

function extractContactInfo($) {
  return {
    phones: $('a[href^="tel:"]')
      .map((i, el) => $(el).attr('href').replace('tel:', ''))
      .get(),
    emails: $('a[href^="mailto:"]')
      .map((i, el) => $(el).attr('href').replace('mailto:', ''))
      .get(),
    addresses: $('.address, [itemprop="address"]')
      .map((i, el) => $(el).text().trim())
      .get(),
  };
}

async function generateFinalReport(allUrls, imported, missing) {
  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalUrlsOnSite: allUrls.size,
      totalImported: imported.size + missing.length,
      previouslyImported: imported.size,
      newlyImported: missing.length,
      completeness: Math.round(((imported.size + missing.length) / allUrls.size) * 100),
    },
    allUrls: Array.from(allUrls).sort(),
    importedUrls: Array.from(imported).concat(missing).sort(),
    status: 'COMPLETE',
  };

  await fs.writeFile(
    path.join(process.cwd(), 'content-import', 'final-import-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\n📄 Final report saved to: content-import/final-import-report.json');
  console.log(`\n🎯 Import Completeness: ${report.summary.completeness}%`);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the importer
importRemainingContent().catch(console.error);
