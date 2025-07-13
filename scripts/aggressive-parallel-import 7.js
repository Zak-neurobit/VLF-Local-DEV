const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { Worker } = require('worker_threads');
const os = require('os');

class AggressiveParallelImporter {
  constructor() {
    this.baseUrl = 'https://www.vasquezlawnc.com';
    this.contentDir = path.join(process.cwd(), 'content-import', 'aggressive-import');
    this.workers = os.cpus().length * 2; // Use 2x CPU cores for max speed
    this.queue = [];
    this.imported = new Set();
    this.failed = new Set();
    this.discovered = new Set();
    this.startTime = Date.now();
  }

  async run() {
    console.log('🚀 AGGRESSIVE PARALLEL IMPORT - MAXIMUM SPEED MODE');
    console.log(`💪 Using ${this.workers} parallel workers\n`);

    await fs.mkdir(this.contentDir, { recursive: true });

    // Load already imported
    await this.loadExistingImports();
    console.log(`✅ Already imported: ${this.imported.size} pages\n`);

    // Phase 1: Discover ALL URLs
    console.log('🕷️ PHASE 1: Aggressive URL Discovery...');
    await this.aggressiveDiscovery();

    // Phase 2: Import everything in parallel
    console.log('\n⚡ PHASE 2: Parallel Import Attack...');
    await this.parallelImport();

    // Phase 3: Verify and retry failures
    console.log('\n🔄 PHASE 3: Retry Failed Imports...');
    await this.retryFailures();

    // Generate report
    await this.generateReport();

    const duration = Math.round((Date.now() - this.startTime) / 1000);
    console.log(`\n✅ IMPORT COMPLETE in ${duration} seconds!`);
  }

  async loadExistingImports() {
    const dirs = [
      'pages',
      'complete-import',
      'blog-posts',
      'autoloop-imports',
      'final-import',
      'aggressive-import',
    ];

    for (const dir of dirs) {
      const fullPath = path.join(process.cwd(), 'content-import', dir);
      try {
        const files = await fs.readdir(fullPath);
        for (const file of files) {
          if (file.endsWith('.json')) {
            try {
              const content = JSON.parse(await fs.readFile(path.join(fullPath, file), 'utf-8'));
              if (content.url) {
                this.imported.add(this.normalizeUrl(content.url));
              }
            } catch (e) {}
          }
        }
      } catch (e) {}
    }
  }

  async aggressiveDiscovery() {
    // Multiple discovery strategies in parallel
    const strategies = [
      this.crawlFromHomepage(),
      this.crawlFromSitemap(),
      this.crawlKnownPatterns(),
      this.crawlFromBlog(),
      this.crawlSpanishPages(),
      this.deepCrawlPracticeAreas(),
    ];

    await Promise.all(strategies);

    console.log(`   Discovered ${this.discovered.size} total URLs`);

    // Filter out already imported
    this.queue = Array.from(this.discovered).filter(
      url => !this.imported.has(this.normalizeUrl(url))
    );

    console.log(`   Need to import: ${this.queue.length} pages`);
  }

  async crawlFromHomepage() {
    const toVisit = new Set([this.baseUrl]);
    const visited = new Set();

    while (toVisit.size > 0 && visited.size < 300) {
      const batch = Array.from(toVisit).slice(0, 10);
      toVisit.clear();

      const results = await Promise.all(batch.map(url => this.fetchAndExtractLinks(url)));

      for (const links of results) {
        for (const link of links) {
          this.discovered.add(link);
          if (!visited.has(link) && link.startsWith(this.baseUrl)) {
            toVisit.add(link);
          }
        }
      }

      batch.forEach(url => visited.add(url));
    }
  }

  async crawlFromSitemap() {
    try {
      const response = await axios.get(`${this.baseUrl}/sitemap.xml`);
      const $ = cheerio.load(response.data, { xmlMode: true });

      $('loc').each((i, elem) => {
        const url = $(elem).text().trim();
        if (url.startsWith(this.baseUrl)) {
          this.discovered.add(this.normalizeUrl(url));
        }
      });

      // Also check for sub-sitemaps
      const sitemapIndexes = [
        '/sitemap_index.xml',
        '/page-sitemap.xml',
        '/post-sitemap.xml',
        '/category-sitemap.xml',
      ];

      for (const index of sitemapIndexes) {
        try {
          const resp = await axios.get(`${this.baseUrl}${index}`);
          const $idx = cheerio.load(resp.data, { xmlMode: true });
          $idx('loc').each((i, elem) => {
            const url = $idx(elem).text().trim();
            if (url.startsWith(this.baseUrl)) {
              this.discovered.add(this.normalizeUrl(url));
            }
          });
        } catch (e) {}
      }
    } catch (e) {}
  }

  async crawlKnownPatterns() {
    const patterns = [
      // Main sections
      '/about/',
      '/about-us/',
      '/our-firm/',
      '/why-choose-us/',
      '/attorneys/',
      '/our-team/',
      '/lawyers/',
      '/staff/',
      '/practice-areas/',
      '/services/',
      '/what-we-do/',
      '/testimonials/',
      '/reviews/',
      '/results/',
      '/case-results/',
      '/blog/',
      '/news/',
      '/resources/',
      '/articles/',
      '/contact/',
      '/contact-us/',
      '/locations/',
      '/offices/',
      '/faqs/',
      '/frequently-asked-questions/',
      '/help/',

      // Legal pages
      '/privacy-policy/',
      '/terms-of-service/',
      '/disclaimer/',
      '/sitemap/',
      '/site-map/',
      '/accessibility/',

      // Practice areas
      '/immigration/',
      '/personal-injury/',
      '/workers-compensation/',
      '/criminal-defense/',
      '/family-law/',
      '/traffic-violations/',

      // Sub-pages
      '/immigration/deportation/',
      '/immigration/asylum/',
      '/immigration/green-cards/',
      '/immigration/citizenship/',
      '/immigration/visas/',
      '/immigration/waivers/',
      '/personal-injury/car-accidents/',
      '/personal-injury/truck-accidents/',
      '/personal-injury/motorcycle-accidents/',
      '/personal-injury/slip-fall/',

      // Spanish
      '/es/',
      '/es/inicio/',
      '/es/abogados/',
      '/es/areas-de-practica/',
      '/es/contacto/',
      '/es/testimonios/',
      '/es/blog/',

      // Blog pages
      '/blog/page/2/',
      '/blog/page/3/',
      '/blog/page/4/',
      '/category/immigration/',
      '/category/personal-injury/',
      '/tag/visa/',
      '/tag/green-card/',
      '/tag/accident/',
    ];

    for (const pattern of patterns) {
      this.discovered.add(this.normalizeUrl(`${this.baseUrl}${pattern}`));
    }

    // Also try numbered patterns
    for (let i = 1; i <= 10; i++) {
      this.discovered.add(`${this.baseUrl}/blog/page/${i}/`);
    }
  }

  async crawlFromBlog() {
    try {
      const blogUrl = `${this.baseUrl}/blog/`;
      const response = await axios.get(blogUrl);
      const $ = cheerio.load(response.data);

      // Find all blog post links
      $('article a, .post a, h2 a, h3 a, .entry-title a').each((i, elem) => {
        const href = $(elem).attr('href');
        if (href && href.includes(this.baseUrl)) {
          this.discovered.add(this.normalizeUrl(href));
        }
      });

      // Check pagination
      $('.pagination a, .nav-links a, a[rel="next"]').each((i, elem) => {
        const href = $(elem).attr('href');
        if (href && href.includes(this.baseUrl)) {
          this.discovered.add(this.normalizeUrl(href));
        }
      });
    } catch (e) {}
  }

  async crawlSpanishPages() {
    const spanishBase = `${this.baseUrl}/es/`;
    try {
      const response = await axios.get(spanishBase);
      const $ = cheerio.load(response.data);

      $('a[href]').each((i, elem) => {
        const href = $(elem).attr('href');
        if (href && (href.includes('/es/') || href.includes(spanishBase))) {
          const fullUrl = href.startsWith('http') ? href : new URL(href, spanishBase).href;
          if (fullUrl.startsWith(this.baseUrl)) {
            this.discovered.add(this.normalizeUrl(fullUrl));
          }
        }
      });
    } catch (e) {}
  }

  async deepCrawlPracticeAreas() {
    const practiceAreas = [
      '/immigration/',
      '/personal-injury/',
      '/workers-compensation/',
      '/criminal-defense/',
      '/family-law/',
    ];

    for (const area of practiceAreas) {
      try {
        const url = `${this.baseUrl}${area}`;
        const links = await this.fetchAndExtractLinks(url);
        links.forEach(link => this.discovered.add(link));
      } catch (e) {}
    }
  }

  async fetchAndExtractLinks(url) {
    const links = [];
    try {
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);

      $('a[href]').each((i, elem) => {
        const href = $(elem).attr('href');
        if (href && !href.startsWith('#') && !href.includes('mailto:') && !href.includes('tel:')) {
          let fullUrl = href;
          if (!href.startsWith('http')) {
            fullUrl = new URL(href, url).href;
          }

          if (
            fullUrl.startsWith(this.baseUrl) &&
            !fullUrl.includes('.pdf') &&
            !fullUrl.includes('.jpg') &&
            !fullUrl.includes('.png')
          ) {
            links.push(this.normalizeUrl(fullUrl));
          }
        }
      });
    } catch (e) {}

    return links;
  }

  async parallelImport() {
    const batchSize = this.workers * 5; // Process more than workers at once
    let processed = 0;

    while (this.queue.length > 0) {
      const batch = this.queue.splice(0, batchSize);

      const promises = batch.map(url => this.importWithRetry(url));
      const results = await Promise.allSettled(promises);

      results.forEach((result, index) => {
        processed++;
        if (result.status === 'fulfilled') {
          console.log(`[${processed}/${processed + this.queue.length}] ✅ ${batch[index]}`);
        } else {
          console.log(`[${processed}/${processed + this.queue.length}] ❌ ${batch[index]}`);
          this.failed.add(batch[index]);
        }
      });

      // Small delay between batches to avoid overwhelming server
      await this.delay(100);
    }
  }

  async importWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        await this.importPage(url);
        this.imported.add(this.normalizeUrl(url));
        return;
      } catch (error) {
        if (i === retries - 1) throw error;
        await this.delay(1000 * (i + 1)); // Exponential backoff
      }
    }
  }

  async importPage(url) {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 15000,
    });

    const $ = cheerio.load(response.data);

    const content = {
      url,
      path: new URL(url).pathname,
      importedAt: new Date().toISOString(),

      // Metadata
      title: $('title').text().trim(),
      metaDescription: $('meta[name="description"]').attr('content') || '',
      metaKeywords: $('meta[name="keywords"]').attr('content') || '',

      // Content
      h1: $('h1').first().text().trim(),
      headings: [],
      mainContent: '',

      // Extract all text content
      textContent: $('body').text().replace(/\s+/g, ' ').trim(),

      // Images
      images: [],

      // Links
      internalLinks: [],
    };

    // Extract headings
    $('h1, h2, h3, h4').each((i, elem) => {
      content.headings.push({
        level: elem.name,
        text: $(elem).text().trim(),
      });
    });

    // Extract main content
    const mainSelectors = ['main', '#main', '.main-content', 'article', '.content'];
    for (const selector of mainSelectors) {
      const $main = $(selector);
      if ($main.length > 0) {
        content.mainContent = $main.text().trim();
        break;
      }
    }

    // Extract images
    $('img').each((i, elem) => {
      const src = $(elem).attr('src');
      if (src) {
        content.images.push({
          src: src.startsWith('http') ? src : new URL(src, url).href,
          alt: $(elem).attr('alt') || '',
        });
      }
    });

    // Save content
    const filename = this.urlToFilename(url);
    await fs.writeFile(
      path.join(this.contentDir, `${filename}.json`),
      JSON.stringify(content, null, 2)
    );
  }

  async retryFailures() {
    if (this.failed.size === 0) {
      console.log('   No failures to retry!');
      return;
    }

    console.log(`   Retrying ${this.failed.size} failed imports...`);
    const failedArray = Array.from(this.failed);
    this.failed.clear();

    for (const url of failedArray) {
      try {
        await this.importPage(url);
        console.log(`   ✅ Retry success: ${url}`);
        this.imported.add(this.normalizeUrl(url));
      } catch (error) {
        console.log(`   ❌ Retry failed: ${url}`);
        this.failed.add(url);
      }
    }
  }

  async generateReport() {
    const report = {
      importedAt: new Date().toISOString(),
      duration: Math.round((Date.now() - this.startTime) / 1000),
      statistics: {
        discovered: this.discovered.size,
        alreadyImported: this.imported.size - (this.discovered.size - this.failed.size),
        newlyImported: this.discovered.size - this.failed.size,
        failed: this.failed.size,
        total: this.imported.size,
      },
      failedUrls: Array.from(this.failed),
      completeness: Math.round((this.imported.size / this.discovered.size) * 100),
    };

    await fs.writeFile(
      path.join(this.contentDir, 'aggressive-import-report.json'),
      JSON.stringify(report, null, 2)
    );

    console.log('\n📊 FINAL REPORT:');
    console.log(`   Total discovered: ${report.statistics.discovered}`);
    console.log(`   Total imported: ${report.statistics.total}`);
    console.log(`   Newly imported: ${report.statistics.newlyImported}`);
    console.log(`   Failed: ${report.statistics.failed}`);
    console.log(`   Completeness: ${report.completeness}%`);

    if (report.statistics.failed > 0) {
      console.log('\n❌ Failed URLs:');
      report.failedUrls.forEach(url => console.log(`   - ${url}`));
    }
  }

  normalizeUrl(url) {
    return url.toLowerCase().replace(/\/$/, '').replace(/\#.*$/, '');
  }

  urlToFilename(url) {
    return (
      url
        .replace(this.baseUrl, '')
        .replace(/^\//, '')
        .replace(/\/$/, '')
        .replace(/\//g, '-')
        .replace(/[^a-z0-9-]/gi, '_') || 'index'
    );
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run the aggressive importer
async function main() {
  console.clear();
  const importer = new AggressiveParallelImporter();

  try {
    await importer.run();
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = AggressiveParallelImporter;
