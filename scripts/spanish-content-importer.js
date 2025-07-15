const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

class SpanishContentImporter {
  constructor() {
    this.baseUrl = 'https://www.vasquezlawnc.com';
    this.esUrl = 'https://www.vasquezlawnc.com/es';
    this.contentDir = path.join(process.cwd(), 'content-import', 'spanish-pages');
    this.imported = new Set();
  }

  async run() {
    console.log('🇪🇸 Spanish Content Specialized Importer\n');

    await fs.mkdir(this.contentDir, { recursive: true });

    // Strategy 1: Direct Spanish homepage crawl
    console.log('📄 Strategy 1: Crawling from Spanish homepage...');
    await this.crawlSpanishHomepage();

    // Strategy 2: Mirror English URLs
    console.log('\n🔄 Strategy 2: Mirroring English URLs to Spanish...');
    await this.mirrorEnglishUrls();

    // Strategy 3: Known Spanish patterns
    console.log('\n📋 Strategy 3: Known Spanish URL patterns...');
    await this.tryKnownPatterns();

    // Strategy 4: Search for Spanish links on English pages
    console.log('\n🔍 Strategy 4: Finding Spanish links on English pages...');
    await this.findSpanishLinksOnEnglishPages();

    console.log(`\n✅ Imported ${this.imported.size} Spanish pages`);

    await this.generateReport();
  }

  async crawlSpanishHomepage() {
    try {
      const response = await axios.get(this.esUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept-Language': 'es-ES,es;q=0.9',
        },
      });

      const $ = cheerio.load(response.data);
      await this.importPage(this.esUrl, $);

      // Find all Spanish links
      const spanishLinks = new Set();

      $('a[href*="/es/"], a[href*="/es"]').each((i, elem) => {
        const href = $(elem).attr('href');
        if (href) {
          let fullUrl = href;
          if (!href.startsWith('http')) {
            fullUrl = new URL(href, this.baseUrl).href;
          }
          if (fullUrl.includes('/es')) {
            spanishLinks.add(fullUrl);
          }
        }
      });

      console.log(`   Found ${spanishLinks.size} Spanish links`);

      // Import each Spanish page
      for (const url of spanishLinks) {
        await this.tryImportUrl(url);
        await this.delay(500);
      }
    } catch (error) {
      console.log('   Spanish homepage not accessible via /es');
    }
  }

  async mirrorEnglishUrls() {
    // Get list of English pages we have
    const englishPages = await this.getEnglishPages();

    const spanishEquivalents = {
      '/': '/es/',
      '/attorneys/': '/es/abogados/',
      '/practice-areas/': '/es/areas-de-practica/',
      '/contact/': '/es/contacto/',
      '/testimonials/': '/es/testimonios/',
      '/resources/': '/es/recursos/',
      '/blog/': '/es/blog/',
      '/immigration/': '/es/areas-de-practica/inmigracion/',
      '/personal-injury/': '/es/areas-de-practica/lesiones-personales/',
      '/workers-compensation/': '/es/areas-de-practica/compensacion-laboral/',
      '/criminal-defense/': '/es/areas-de-practica/defensa-criminal/',
      '/family-law/': '/es/areas-de-practica/derecho-familia/',
      '/privacy-policy/': '/es/politica-de-privacidad/',
      '/disclaimer/': '/es/descargo-de-responsabilidad/',
    };

    for (const [english, spanish] of Object.entries(spanishEquivalents)) {
      const url = `${this.baseUrl}${spanish}`;
      await this.tryImportUrl(url);
    }
  }

  async tryKnownPatterns() {
    const knownSpanishPages = [
      // Main sections
      '/es/',
      '/es/inicio/',
      '/es/abogados/',
      '/es/areas-de-practica/',
      '/es/contacto/',
      '/es/testimonios/',
      '/es/recursos/',
      '/es/blog/',

      // Attorneys
      '/es/abogados/william-vasquez/',
      '/william-vasquez-abogado/',
      '/es/abogados/adriana-ingram/',
      '/es/abogados/mark-kelsey/',
      '/es/abogados/christopher-afanador/',

      // Immigration
      '/es/areas-de-practica/inmigracion/',
      '/es/areas-de-practica/inmigracion/visas/',
      '/es/areas-de-practica/inmigracion/tarjeta-verde/',
      '/es/areas-de-practica/inmigracion/ciudadania/',
      '/es/areas-de-practica/inmigracion/deportacion/',
      '/es/areas-de-practica/inmigracion/asilo/',

      // Personal Injury
      '/es/areas-de-practica/lesiones-personales/',
      '/es/areas-de-practica/lesiones-personales/accidentes-auto/',
      '/es/areas-de-practica/lesiones-personales/accidentes-camion/',
      '/es/areas-de-practica/lesiones-personales/accidentes-moto/',

      // Workers Comp
      '/es/areas-de-practica/compensacion-laboral/',
      '/es/areas-de-practica/compensacion-trabajadores/',

      // Criminal
      '/es/areas-de-practica/defensa-criminal/',
      '/es/areas-de-practica/defensa-criminal/dui/',
      '/es/areas-de-practica/defensa-criminal/drogas/',

      // Family
      '/es/areas-de-practica/derecho-familia/',
      '/es/areas-de-practica/derecho-familia/divorcio/',
      '/es/areas-de-practica/derecho-familia/custodia/',

      // Locations
      '/es/contacto/raleigh-nc/',
      '/es/contacto/charlotte-nc/',
      '/es/contacto/durham-nc/',
      '/es/contacto/smithfield-nc/',
      '/es/contacto/orlando-fl/',
    ];

    for (const path of knownSpanishPages) {
      const url = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
      await this.tryImportUrl(url);
    }
  }

  async findSpanishLinksOnEnglishPages() {
    // Check main English pages for Spanish language switcher links
    const mainPages = [
      this.baseUrl,
      `${this.baseUrl}/attorneys/`,
      `${this.baseUrl}/practice-areas/`,
      `${this.baseUrl}/contact/`,
    ];

    for (const page of mainPages) {
      try {
        const response = await axios.get(page, {
          headers: { 'User-Agent': 'Mozilla/5.0' },
        });

        const $ = cheerio.load(response.data);

        // Look for language switcher
        $('a[href*="es"], .language-switcher a, .lang-es a, a:contains("Español")').each(
          (i, elem) => {
            const href = $(elem).attr('href');
            if (href && (href.includes('/es') || href.includes('español'))) {
              const fullUrl = href.startsWith('http') ? href : new URL(href, this.baseUrl).href;
              this.tryImportUrl(fullUrl);
            }
          }
        );
      } catch (error) {
        // Skip
      }
    }
  }

  async tryImportUrl(url) {
    if (this.imported.has(url)) return;

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept-Language': 'es-ES,es;q=0.9',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      await this.importPage(url, $);
      console.log(`   ✅ ${url}`);
    } catch (error) {
      if (error.response?.status !== 404) {
        console.log(`   ❌ ${url} - ${error.message}`);
      }
    }
  }

  async importPage(url, $) {
    const content = {
      url,
      path: new URL(url).pathname,
      language: 'es',
      importedAt: new Date().toISOString(),

      // Metadata
      title: $('title').text().trim(),
      metaDescription: $('meta[name="description"]').attr('content') || '',

      // Content
      h1: $('h1').first().text().trim(),
      mainContent: this.extractMainContent($),

      // Navigation
      navigation: this.extractNavigation($),

      // Links to other Spanish pages
      spanishLinks: this.extractSpanishLinks($, url),
    };

    const filename = this.urlToFilename(url);
    await fs.writeFile(
      path.join(this.contentDir, `${filename}.json`),
      JSON.stringify(content, null, 2)
    );

    this.imported.add(url);
  }

  extractMainContent($) {
    const selectors = ['main', '#main', '.main-content', 'article', '.content'];

    for (const selector of selectors) {
      const $content = $(selector);
      if ($content.length > 0) {
        return {
          html: $content.html(),
          text: $content.text().trim(),
        };
      }
    }

    return { html: '', text: '' };
  }

  extractNavigation($) {
    const nav = [];

    $('nav a, .navigation a, .menu a').each((i, elem) => {
      const $link = $(elem);
      const href = $link.attr('href');
      const text = $link.text().trim();

      if (href && text) {
        nav.push({ href, text });
      }
    });

    return nav;
  }

  extractSpanishLinks($, pageUrl) {
    const links = [];

    $('a[href*="/es"], a[href*="/es/"]').each((i, elem) => {
      const href = $(elem).attr('href');
      if (href) {
        const fullUrl = href.startsWith('http') ? href : new URL(href, pageUrl).href;
        if (fullUrl.includes('/es')) {
          links.push({
            url: fullUrl,
            text: $(elem).text().trim(),
          });
        }
      }
    });

    return links;
  }

  async getEnglishPages() {
    const pages = [];
    const pagesDir = path.join(process.cwd(), 'content-import', 'pages');

    try {
      const files = await fs.readdir(pagesDir);
      for (const file of files) {
        if (file.endsWith('.json')) {
          const content = JSON.parse(await fs.readFile(path.join(pagesDir, file), 'utf-8'));
          if (content.path) {
            pages.push(content.path);
          }
        }
      }
    } catch (e) {}

    return pages;
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

  async generateReport() {
    const report = {
      importedAt: new Date().toISOString(),
      totalImported: this.imported.size,
      spanishPages: Array.from(this.imported).sort(),
    };

    await fs.writeFile(
      path.join(this.contentDir, 'spanish-import-report.json'),
      JSON.stringify(report, null, 2)
    );

    console.log('\n📄 Report saved to: content-import/spanish-pages/spanish-import-report.json');
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run the Spanish importer
if (require.main === module) {
  new SpanishContentImporter().run().catch(console.error);
}

module.exports = SpanishContentImporter;
