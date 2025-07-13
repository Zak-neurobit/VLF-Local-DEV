const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

class VasquezFullSiteImporter {
  constructor() {
    this.baseUrl = 'https://www.vasquezlawnc.com';
    this.browser = null;
    this.visitedUrls = new Set();
    this.contentDir = path.join(process.cwd(), 'content-import', 'full-site');
    this.imagesDir = path.join(process.cwd(), 'public', 'images', 'vasquez-import');
  }

  async initialize() {
    console.log('🚀 Initializing full site importer...');

    // Create directories
    await fs.mkdir(this.contentDir, { recursive: true });
    await fs.mkdir(this.imagesDir, { recursive: true });

    // Launch browser
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }

  async importFullSite() {
    console.log('📄 Starting comprehensive import from vasquezlawnc.com...\n');

    try {
      // First, get all URLs from the site
      const allUrls = await this.discoverAllUrls();
      console.log(`\n✅ Found ${allUrls.length} unique pages to import\n`);

      // Import each page
      let imported = 0;
      for (const url of allUrls) {
        try {
          await this.importPage(url);
          imported++;
          if (imported % 5 === 0) {
            console.log(`  Progress: ${imported}/${allUrls.length} pages imported...`);
          }
        } catch (error) {
          console.error(`  ❌ Failed to import ${url}:`, error.message);
        }
      }

      // Create import manifest
      await this.createImportManifest(allUrls);

      console.log(`\n✨ Import complete! ${imported} pages successfully imported.`);
    } catch (error) {
      console.error('❌ Import failed:', error);
    }
  }

  async discoverAllUrls() {
    console.log('🔍 Discovering all pages on vasquezlawnc.com...');

    const page = await this.browser.newPage();
    const urlsToVisit = [this.baseUrl];
    const allUrls = [];

    while (urlsToVisit.length > 0) {
      const currentUrl = urlsToVisit.shift();

      // Skip if already visited
      if (this.visitedUrls.has(currentUrl)) continue;
      this.visitedUrls.add(currentUrl);

      try {
        await page.goto(currentUrl, {
          waitUntil: 'networkidle2',
          timeout: 30000,
        });

        // Extract all links
        const links = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('a[href]'))
            .map(a => a.href)
            .filter(href => {
              // Filter out external links, anchors, etc.
              return (
                href &&
                !href.startsWith('#') &&
                !href.startsWith('mailto:') &&
                !href.startsWith('tel:') &&
                !href.includes('facebook.com') &&
                !href.includes('twitter.com') &&
                !href.includes('linkedin.com') &&
                !href.includes('youtube.com') &&
                !href.includes('instagram.com') &&
                !href.includes('tiktok.com')
              );
            });
        });

        // Add internal links to visit queue
        links.forEach(link => {
          if (link.startsWith(this.baseUrl) && !this.visitedUrls.has(link)) {
            urlsToVisit.push(link);
          }
        });

        allUrls.push(currentUrl);
      } catch (error) {
        console.error(`  Failed to visit ${currentUrl}:`, error.message);
      }
    }

    await page.close();
    return allUrls;
  }

  async importPage(url) {
    const page = await this.browser.newPage();

    try {
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });

      // Extract comprehensive page data
      const pageData = await page.evaluate(() => {
        // Helper to clean text
        const cleanText = text => text?.trim().replace(/\s+/g, ' ') || '';

        // Get meta information
        const getMeta = name => {
          const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
          return meta?.getAttribute('content') || '';
        };

        // Extract main content
        const mainContent =
          document.querySelector('main, #main, .main-content, .content, article') || document.body;

        // Remove navigation, footer, scripts
        const contentClone = mainContent.cloneNode(true);
        contentClone
          .querySelectorAll('nav, header, footer, script, style, .navigation')
          .forEach(el => el.remove());

        // Extract structured content
        const sections = [];
        contentClone.querySelectorAll('section, .section').forEach(section => {
          const heading = section.querySelector('h1, h2, h3')?.textContent || '';
          const content = section.textContent || '';
          if (heading || content.length > 50) {
            sections.push({
              heading: cleanText(heading),
              content: cleanText(content),
              html: section.innerHTML,
            });
          }
        });

        // Extract all headings for structure
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => ({
          level: h.tagName,
          text: cleanText(h.textContent),
          id: h.id,
        }));

        // Extract forms
        const forms = Array.from(document.querySelectorAll('form')).map(form => ({
          action: form.action,
          method: form.method,
          fields: Array.from(form.querySelectorAll('input, select, textarea')).map(field => ({
            name: field.name,
            type: field.type || field.tagName.toLowerCase(),
            required: field.required,
            placeholder: field.placeholder,
          })),
        }));

        // Extract images
        const images = Array.from(document.querySelectorAll('img'))
          .map(img => ({
            src: img.src,
            alt: img.alt,
            title: img.title,
            width: img.width,
            height: img.height,
            loading: img.loading,
          }))
          .filter(img => img.src && !img.src.includes('data:image'));

        // Extract links
        const links = Array.from(document.querySelectorAll('a[href]'))
          .map(link => ({
            href: link.href,
            text: cleanText(link.textContent),
            target: link.target,
            rel: link.rel,
          }))
          .filter(link => link.href && !link.href.startsWith('#'));

        // Extract schema/structured data
        const schemas = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
          .map(script => {
            try {
              return JSON.parse(script.textContent);
            } catch {
              return null;
            }
          })
          .filter(Boolean);

        return {
          // Meta information
          title: document.title,
          metaDescription: getMeta('description'),
          metaKeywords: getMeta('keywords'),
          ogTitle: getMeta('og:title'),
          ogDescription: getMeta('og:description'),
          ogImage: getMeta('og:image'),
          canonical: document.querySelector('link[rel="canonical"]')?.href,

          // Content
          h1: document.querySelector('h1')?.textContent || '',
          bodyText: cleanText(contentClone.textContent),
          sections,
          headings,

          // Media and links
          images,
          links: links.slice(0, 50), // Limit to avoid huge files

          // Interactive elements
          forms,

          // SEO elements
          schemas,

          // Page info
          url: window.location.href,
          path: window.location.pathname,
          lang: document.documentElement.lang || 'en',
        };
      });

      // Save page data
      const pageName = this.getPageNameFromUrl(url);
      const pageFilePath = path.join(this.contentDir, `${pageName}.json`);
      await fs.writeFile(pageFilePath, JSON.stringify(pageData, null, 2));

      // Download images
      for (const image of pageData.images) {
        await this.downloadImage(image.src, url);
      }

      // Extract and save text content for each major section
      if (pageData.sections.length > 0) {
        const textContent = pageData.sections
          .map(section => `## ${section.heading}\n\n${section.content}`)
          .join('\n\n---\n\n');

        await fs.writeFile(
          path.join(this.contentDir, `${pageName}.md`),
          `# ${pageData.title}\n\n${pageData.metaDescription}\n\n${textContent}`
        );
      }

      console.log(`  ✅ Imported: ${pageData.title}`);
    } catch (error) {
      console.error(`  ❌ Error importing ${url}:`, error.message);
    } finally {
      await page.close();
    }
  }

  async downloadImage(imageUrl, pageUrl) {
    try {
      // Make absolute URL
      let absoluteUrl = imageUrl;
      if (!imageUrl.startsWith('http')) {
        const baseUrl = new URL(pageUrl);
        absoluteUrl = new URL(imageUrl, baseUrl.origin).href;
      }

      // Skip external images
      if (!absoluteUrl.startsWith(this.baseUrl)) return;

      // Generate filename
      const urlPath = new URL(absoluteUrl).pathname;
      const filename = urlPath.split('/').pop() || 'image.jpg';
      const filepath = path.join(this.imagesDir, filename);

      // Check if already downloaded
      try {
        await fs.access(filepath);
        return; // Already exists
      } catch {
        // File doesn't exist, download it
      }

      // Download image
      const response = await axios.get(absoluteUrl, {
        responseType: 'arraybuffer',
        timeout: 10000,
      });

      await fs.writeFile(filepath, response.data);
    } catch (error) {
      // Silently skip failed image downloads
    }
  }

  getPageNameFromUrl(url) {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.replace(/\/$/, ''); // Remove trailing slash

    if (pathname === '' || pathname === '/') {
      return 'homepage';
    }

    // Replace slashes with dashes and remove leading slash
    return pathname.substring(1).replace(/\//g, '-');
  }

  async createImportManifest(allUrls) {
    const manifest = {
      importDate: new Date().toISOString(),
      source: this.baseUrl,
      totalPages: allUrls.length,
      pages: [],
      stats: {
        withForms: 0,
        withImages: 0,
        withSchema: 0,
        withSections: 0,
      },
    };

    // Analyze each imported page
    const files = await fs.readdir(this.contentDir);
    for (const file of files) {
      if (!file.endsWith('.json')) continue;

      const content = JSON.parse(await fs.readFile(path.join(this.contentDir, file), 'utf-8'));

      manifest.pages.push({
        url: content.url,
        title: content.title,
        hasForm: content.forms.length > 0,
        imageCount: content.images.length,
        hasSchema: content.schemas.length > 0,
        sectionCount: content.sections.length,
      });

      // Update stats
      if (content.forms.length > 0) manifest.stats.withForms++;
      if (content.images.length > 0) manifest.stats.withImages++;
      if (content.schemas.length > 0) manifest.stats.withSchema++;
      if (content.sections.length > 0) manifest.stats.withSections++;
    }

    await fs.writeFile(
      path.join(this.contentDir, 'import-manifest.json'),
      JSON.stringify(manifest, null, 2)
    );

    console.log('\n📊 Import Statistics:');
    console.log(`  Total Pages: ${manifest.totalPages}`);
    console.log(`  Pages with Forms: ${manifest.stats.withForms}`);
    console.log(`  Pages with Images: ${manifest.stats.withImages}`);
    console.log(`  Pages with Schema: ${manifest.stats.withSchema}`);
    console.log(`  Pages with Content Sections: ${manifest.stats.withSections}`);
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Run the importer
async function main() {
  const importer = new VasquezFullSiteImporter();

  try {
    await importer.initialize();
    await importer.importFullSite();
  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    await importer.close();
  }
}

main().catch(console.error);
