const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

class RemainingPageImporter {
  constructor() {
    this.baseUrl = 'https://www.vasquezlawnc.com';
    this.outputDir = path.join(__dirname, '../content-import/complete-site-import');

    // Pages to import (starting from where we left off)
    this.remainingPages = [
      // Attorney Pages
      '/attorneys/',
      '/attorneys/william-vasquez-attorney/',
      '/attorneys/adrianna-ingram/',
      '/attorneys/mark-kelsey/',
      '/attorneys/roselyn-v-torrellas/',
      '/attorneys/jillian-baucom/',
      '/attorneys/judith-parkes/',
      '/attorneys/christopher-afanador/',
      '/attorneys/rania-arwani/',
      '/attorneys/malcom-rodriguez/',

      // Immigration Pages
      '/immigration/',
      '/immigration/family-visa-types/',
      '/immigration/immediate-relative-visas/',
      '/immigration/family-preference-visas/',
      '/immigration/criminal-convictions-impact-on-immigration/',
      '/immigration/daca-deferred-action-childhood-arrivals-2/',
      '/immigration/employment-based-immigration/',
      '/immigration/employment-based-immigration/perm-labor-certification/',
      '/immigration/employment-based-immigration/tn-visa/',
      '/immigration/employment-based-immigration/e-visa/',
      '/immigration/employment-based-immigration/h-2b-visa/',
      '/immigration/faqs-questions-answers/',
      '/immigration/asylum-refugee-legal-help/',
      '/immigration/citizenship-naturalization/',
      '/immigration/deportation-removal-defense/',
      '/immigration/family-based-relative/',
      '/immigration/fiance-k-visas/',
      '/immigration/green-cards/',
      '/immigration/vawa-u-visa-crime-victims/',
      '/t-visa-immigration-attorneys/',
      '/immigration/adjustment-of-status/',
      '/immigration/detention-bond-hearings/',
      '/immigration/inadmissibility-waivers-ineligible-to-immigrate/',
      '/immigration/visa-denial-help-appeals/',
      '/immigration/visa-process/',
      '/venezuelan-deferred-enforced-deportation-by-trump/',

      // Personal Injury Pages
      '/personal-injury/',
      '/personal-injury/car-auto-accidents/',
      '/personal-injury/truck-accidents/',
      '/personal-injury/motorcycle-accidents/',
      '/personal-injury/pedestrian-hit-by-car/',
      '/personal-injury/drunk-driver-liability/',
      '/personal-injury/mass-transit-public-transportation-bus-train-accidents/',
      '/personal-injury/boating-jet-ski-watercraft-accidents/',
      '/personal-injury/bicycle-bike-accidents/',
      '/personal-injury/emergency-vehicle-accidents/',
      '/personal-injury/uninsured-underinsured-drivers-motorists-accidents/',
      '/personal-injury/premises-liability/',

      // Workers Compensation Pages
      '/workers-compensation-job-injury/',
      '/workers-compensation-job-injury/construction-site-injuries/',
      '/workers-compensation-job-injury/repetitive-stress-carpal-tunnel/',
      '/workers-compensation-job-injury/third-party-injury-claims/',
      '/workers-compensation-job-injury/equipment-accidents-failures/',
      '/workers-compensation-job-injury/lifting-injuries-overexertion/',
      '/workers-compensation-job-injury/depression-mental-health-anxiety/',

      // Criminal Defense Pages
      '/criminal-defense/',
      '/criminal-defense/drug-crime-cases/',
      '/criminal-defense/dwi-drunk-driving/',
      '/criminal-defense/domestic-violence-abuse/',
      '/criminal-defense/expungement-expunction/',
      '/criminal-defense/traffic-offenses-tickets/',

      // Family Law Pages
      '/family-law/',
      '/family-law/divorce/',
      '/family-law/alimony-spousal-support/',
      '/family-law/child-custody/',
      '/family-law/equitable-distribution-property-debt-division/',

      // Location Pages
      '/raleigh-nc/',
      '/charlotte-nc/',
      '/smithfield-nc/',
      '/durham-nc/',
      '/winston-salem/',
      '/orlando-fl/',

      // Spanish Pages
      '/es/',
      '/es/abogados/',
      '/es/areas-de-practica/',
      '/es/areas-de-practica/inmigracion/',
      '/es/areas-de-practica/lesiones-personales/',
      '/es/areas-de-practica/compensacion-laboral/',
      '/es/areas-de-practica/defensa-criminal/',
      '/es/areas-de-practica/derecho-familia/',
      '/es/contacto/',
      '/es/blog/',
      '/es/recursos/',
      '/es/descargo-de-responsabilidad/',
      '/es/politica-de-privacidad/',
    ];
  }

  async importRemainingPages() {
    console.log('Importing remaining pages from vasquezlawnc.com...\n');

    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    });

    const page = await context.newPage();

    try {
      await fs.mkdir(this.outputDir, { recursive: true });

      // Check existing files
      const existingFiles = await fs.readdir(this.outputDir);
      const existingSet = new Set(existingFiles.map(f => f.replace('.json', '')));

      const results = {
        success: 0,
        failed: 0,
        skipped: 0,
        total: this.remainingPages.length,
      };

      for (const pagePath of this.remainingPages) {
        const filename = this.pathToFilename(pagePath);

        // Skip if already imported
        if (existingSet.has(filename)) {
          console.log(`⏭ Skipping already imported: ${filename}`);
          results.skipped++;
          continue;
        }

        try {
          console.log(`Importing: ${pagePath}`);
          const pageData = await this.importPage(page, pagePath);

          if (pageData) {
            const filepath = path.join(this.outputDir, `${filename}.json`);

            await fs.writeFile(filepath, JSON.stringify(pageData, null, 2));
            results.success++;
            console.log(`✓ Saved: ${filename}.json`);
          }
        } catch (error) {
          console.error(`✗ Failed to import ${pagePath}:`, error.message);
          results.failed++;
        }

        // Small delay between requests
        await this.delay(500);
      }

      // Import blog posts
      console.log('\nImporting blog posts...');
      const blogPosts = await this.importBlogPosts(page);

      // Save summary
      await this.saveSummary(results, blogPosts);

      console.log('\n✅ Import Complete!');
      console.log(`Success: ${results.success}/${results.total} pages`);
      console.log(`Skipped: ${results.skipped} (already imported)`);
      console.log(`Failed: ${results.failed}`);
      console.log(`Blog posts: ${blogPosts.length}`);
    } finally {
      await browser.close();
    }
  }

  async importPage(page, pagePath) {
    const url = `${this.baseUrl}${pagePath}`;

    try {
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      // Wait for content to load
      await page.waitForSelector('body', { timeout: 5000 });

      const pageData = await page.evaluate(() => {
        // Helper function to get meta content
        const getMeta = name => {
          const element = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
          return element ? element.getAttribute('content') : '';
        };

        // Get all text content
        const getTextContent = () => {
          const clone = document.body.cloneNode(true);
          const scripts = clone.querySelectorAll('script, style, noscript');
          scripts.forEach(el => el.remove());
          return clone.textContent.trim();
        };

        // Get structured content
        const getStructuredContent = () => {
          const content = {
            headings: {},
            paragraphs: [],
            lists: [],
          };

          // Get headings
          ['h1', 'h2', 'h3', 'h4'].forEach(tag => {
            content.headings[tag] = Array.from(document.querySelectorAll(tag))
              .map(el => el.textContent.trim())
              .filter(text => text.length > 0);
          });

          // Get paragraphs
          content.paragraphs = Array.from(document.querySelectorAll('p'))
            .map(el => el.textContent.trim())
            .filter(text => text.length > 20);

          // Get lists
          content.lists = Array.from(document.querySelectorAll('ul, ol')).map(list => ({
            type: list.tagName.toLowerCase(),
            items: Array.from(list.querySelectorAll('li')).map(li => li.textContent.trim()),
          }));

          return content;
        };

        // Get images
        const getImages = () => {
          return Array.from(document.querySelectorAll('img'))
            .map(img => ({
              src: img.src,
              alt: img.alt || '',
              title: img.title || '',
            }))
            .filter(img => !img.src.includes('data:image'));
        };

        // Get links
        const getLinks = () => {
          return Array.from(document.querySelectorAll('a'))
            .map(link => ({
              href: link.href,
              text: link.textContent.trim(),
              isExternal: !link.href.includes(window.location.hostname),
            }))
            .filter(link => link.href && !link.href.startsWith('#'));
        };

        // Get structured data
        const getStructuredData = () => {
          const scripts = Array.from(
            document.querySelectorAll('script[type="application/ld+json"]')
          );
          return scripts
            .map(script => {
              try {
                return JSON.parse(script.textContent);
              } catch {
                return null;
              }
            })
            .filter(Boolean);
        };

        return {
          url: window.location.href,
          title: document.title || '',
          metaDescription: getMeta('description'),
          metaKeywords: getMeta('keywords'),
          ogTitle: getMeta('og:title'),
          ogDescription: getMeta('og:description'),
          ogImage: getMeta('og:image'),
          canonical: document.querySelector('link[rel="canonical"]')?.href || '',
          h1: document.querySelector('h1')?.textContent?.trim() || '',
          content: getTextContent(),
          structuredContent: getStructuredContent(),
          images: getImages(),
          links: getLinks(),
          structuredData: getStructuredData(),
          language: document.documentElement.lang || 'en',
        };
      });

      return pageData;
    } catch (error) {
      console.error(`Error loading ${url}:`, error.message);
      return null;
    }
  }

  async importBlogPosts(page) {
    const blogPosts = [];

    try {
      // Go to blog page
      await page.goto(`${this.baseUrl}/blog/`, { waitUntil: 'networkidle' });

      // Get all blog post links
      const postLinks = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('article a, .post a, h2 a, h3 a'))
          .map(link => link.href)
          .filter(href => href.includes('/blog/') && !href.endsWith('/blog/'))
          .filter((href, index, self) => self.indexOf(href) === index);
      });

      console.log(`Found ${postLinks.length} blog posts`);

      // Import each blog post (limit to 10 for now)
      for (const postUrl of postLinks.slice(0, 10)) {
        try {
          const postPath = postUrl.replace(this.baseUrl, '');
          const postData = await this.importPage(page, postPath);

          if (postData) {
            const filename = this.pathToFilename(postPath);
            const filepath = path.join(this.outputDir, 'blog', `${filename}.json`);

            await fs.mkdir(path.dirname(filepath), { recursive: true });
            await fs.writeFile(filepath, JSON.stringify(postData, null, 2));

            blogPosts.push({
              url: postUrl,
              title: postData.title,
              filename,
            });

            console.log(`✓ Imported blog post: ${postData.title}`);
          }
        } catch (error) {
          console.error(`Failed to import blog post ${postUrl}:`, error.message);
        }

        await this.delay(500);
      }
    } catch (error) {
      console.error('Failed to import blog posts:', error.message);
    }

    return blogPosts;
  }

  pathToFilename(pagePath) {
    return (
      pagePath
        .replace(/^\//, '')
        .replace(/\/$/, '')
        .replace(/\//g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '')
        .toLowerCase() || 'homepage'
    );
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async saveSummary(results, blogPosts) {
    const summary = {
      importDate: new Date().toISOString(),
      source: this.baseUrl,
      results: {
        pages: results,
        blogPosts: blogPosts.length,
      },
      totalPages: results.success + blogPosts.length,
      remainingPages: this.remainingPages.map(path => ({
        path,
        filename: this.pathToFilename(path) + '.json',
      })),
      blogPosts,
    };

    await fs.writeFile(
      path.join(this.outputDir, 'remaining-import-summary.json'),
      JSON.stringify(summary, null, 2)
    );
  }
}

// Run the importer
async function main() {
  const importer = new RemainingPageImporter();
  await importer.importRemainingPages();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { RemainingPageImporter };
