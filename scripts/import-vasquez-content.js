const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');
const { URL } = require('url');

class VasquezContentImporter {
  constructor() {
    this.baseUrl = 'https://www.vasquezlawnc.com';
    this.contentDir = path.join(process.cwd(), 'content-import', 'pages');
    this.imagesDir = path.join(process.cwd(), 'public', 'images', 'vasquez-import');
    this.visitedUrls = new Set();
    this.failedUrls = [];
  }

  async initialize() {
    console.log('🚀 Initializing Vasquez Law content importer...\n');
    await fs.mkdir(this.contentDir, { recursive: true });
    await fs.mkdir(this.imagesDir, { recursive: true });
  }

  async importAllContent() {
    console.log('📄 Starting content import from vasquezlawnc.com...\n');

    // Load known pages from our previous extraction
    const knownPagesPath = path.join(
      process.cwd(),
      'content-import',
      'vasquez-pages',
      'site-structure.json'
    );
    let knownPages = {};

    try {
      const data = await fs.readFile(knownPagesPath, 'utf-8');
      const structure = JSON.parse(data);
      knownPages = structure.pages;
    } catch (error) {
      console.error('Could not load known pages, will discover dynamically');
    }

    // Start with homepage and known pages
    const pagesToImport = ['/', ...Object.values(knownPages).map(page => page.url)];

    // Import each page
    for (const pageUrl of pagesToImport) {
      const fullUrl = pageUrl.startsWith('http') ? pageUrl : `${this.baseUrl}${pageUrl}`;

      if (!this.visitedUrls.has(fullUrl)) {
        console.log(`\nImporting: ${pageUrl}`);
        await this.importPage(fullUrl);

        // Be respectful - wait between requests
        await this.delay(500);
      }
    }

    // Create summary report
    await this.createImportReport();

    console.log('\n✨ Content import complete!');
    console.log(`   Imported: ${this.visitedUrls.size} pages`);
    console.log(`   Failed: ${this.failedUrls.length} pages`);
  }

  async importPage(url) {
    if (this.visitedUrls.has(url)) return;
    this.visitedUrls.add(url);

    try {
      // Fetch the page
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; VasquezLawImporter/1.0)',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);

      // Extract comprehensive content
      const pageContent = {
        url: url,
        path: new URL(url).pathname,
        fetchedAt: new Date().toISOString(),

        // Meta information
        title: $('title').text().trim(),
        metaDescription: $('meta[name="description"]').attr('content') || '',
        metaKeywords: $('meta[name="keywords"]').attr('content') || '',
        canonical: $('link[rel="canonical"]').attr('href') || url,

        // Open Graph
        ogTitle: $('meta[property="og:title"]').attr('content') || '',
        ogDescription: $('meta[property="og:description"]').attr('content') || '',
        ogImage: $('meta[property="og:image"]').attr('content') || '',

        // Main heading
        h1: $('h1').first().text().trim(),

        // Navigation structure
        navigation: this.extractNavigation($),

        // Main content sections
        mainContent: this.extractMainContent($),

        // All text content (for search/analysis)
        fullText: this.extractFullText($),

        // Structured data
        structuredData: this.extractStructuredData($),

        // Images
        images: this.extractImages($, url),

        // Internal links
        internalLinks: this.extractInternalLinks($, url),

        // Forms
        forms: this.extractForms($),

        // Contact information
        contactInfo: this.extractContactInfo($),

        // Attorney information
        attorneyInfo: this.extractAttorneyInfo($),

        // Practice area specifics
        practiceAreaInfo: this.extractPracticeAreaInfo($, url),

        // Testimonials
        testimonials: this.extractTestimonials($),

        // FAQ sections
        faqs: this.extractFAQs($),

        // CTAs
        ctas: this.extractCTAs($),

        // Spanish content
        isSpanish: url.includes('/es/') || $('html').attr('lang') === 'es',
        alternateLanguageUrl: $('link[rel="alternate"][hreflang]').attr('href') || '',
      };

      // Save the content
      const filename = this.getFilenameFromUrl(url);
      await fs.writeFile(
        path.join(this.contentDir, `${filename}.json`),
        JSON.stringify(pageContent, null, 2)
      );

      // Save markdown version for easy reading
      await this.saveMarkdownVersion(pageContent, filename);

      // Download images
      for (const image of pageContent.images) {
        await this.downloadImage(image.src, url);
      }

      // Find and queue new pages
      for (const link of pageContent.internalLinks) {
        if (!this.visitedUrls.has(link.href)) {
          // Add to import queue if it's a vasquezlawnc.com page
          if (link.href.startsWith(this.baseUrl)) {
            console.log(`  Found new page: ${link.href}`);
          }
        }
      }

      console.log(`  ✅ Successfully imported: ${pageContent.title}`);
    } catch (error) {
      console.error(`  ❌ Failed to import ${url}: ${error.message}`);
      this.failedUrls.push({ url, error: error.message });
    }
  }

  extractMainContent($) {
    const sections = [];

    // Remove header, nav, footer
    const $content = $('body').clone();
    $content.find('header, nav, footer, script, style, noscript').remove();

    // Look for main content areas
    const contentSelectors = [
      'main',
      '#main',
      '.main-content',
      '.content',
      'article',
      '.page-content',
      '.entry-content',
      '[role="main"]',
    ];

    let $main = null;
    for (const selector of contentSelectors) {
      if ($(selector).length > 0) {
        $main = $(selector).first();
        break;
      }
    }

    if (!$main) {
      $main = $content;
    }

    // Extract sections
    $main.find('section, .section, .content-section').each((i, elem) => {
      const $section = $(elem);
      const heading = $section.find('h1, h2, h3').first().text().trim();
      const content = $section.text().trim();
      const html = $section.html();

      if (content.length > 50) {
        sections.push({
          heading,
          content,
          html,
          images: $section
            .find('img')
            .map((i, img) => ({
              src: $(img).attr('src'),
              alt: $(img).attr('alt'),
            }))
            .get(),
        });
      }
    });

    // If no sections found, get all content
    if (sections.length === 0) {
      const content = $main.text().trim();
      if (content.length > 100) {
        sections.push({
          heading: 'Main Content',
          content,
          html: $main.html(),
        });
      }
    }

    return sections;
  }

  extractFullText($) {
    const $content = $('body').clone();
    $content.find('script, style, nav, header, footer').remove();

    return $content.text().replace(/\s+/g, ' ').trim().substring(0, 50000); // Limit to 50k chars
  }

  extractNavigation($) {
    const nav = [];

    $('nav a, .navigation a, .menu a').each((i, elem) => {
      const $link = $(elem);
      const href = $link.attr('href');
      const text = $link.text().trim();

      if (href && text && !href.startsWith('#')) {
        nav.push({ href, text });
      }
    });

    return nav;
  }

  extractStructuredData($) {
    const schemas = [];

    $('script[type="application/ld+json"]').each((i, elem) => {
      try {
        const data = JSON.parse($(elem).html());
        schemas.push(data);
      } catch (e) {
        // Invalid JSON, skip
      }
    });

    return schemas;
  }

  extractImages($, pageUrl) {
    const images = [];
    const seen = new Set();

    $('img').each((i, elem) => {
      const $img = $(elem);
      let src = $img.attr('src');

      if (!src || src.startsWith('data:')) return;

      // Make absolute URL
      if (!src.startsWith('http')) {
        try {
          src = new URL(src, pageUrl).href;
        } catch (e) {
          return;
        }
      }

      if (!seen.has(src)) {
        seen.add(src);
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

  extractInternalLinks($, pageUrl) {
    const links = [];
    const seen = new Set();

    $('a[href]').each((i, elem) => {
      const $link = $(elem);
      let href = $link.attr('href');
      const text = $link.text().trim();

      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      // Make absolute URL
      if (!href.startsWith('http')) {
        try {
          href = new URL(href, pageUrl).href;
        } catch (e) {
          return;
        }
      }

      // Only include vasquezlawnc.com links
      if (href.startsWith(this.baseUrl) && !seen.has(href)) {
        seen.add(href);
        links.push({
          href,
          text,
          title: $link.attr('title') || '',
        });
      }
    });

    return links;
  }

  extractForms($) {
    const forms = [];

    $('form').each((i, elem) => {
      const $form = $(elem);
      const fields = [];

      $form.find('input, select, textarea').each((j, field) => {
        const $field = $(field);
        fields.push({
          type: $field.attr('type') || $field.prop('tagName').toLowerCase(),
          name: $field.attr('name') || '',
          placeholder: $field.attr('placeholder') || '',
          required: $field.attr('required') !== undefined,
          label: $form
            .find(`label[for="${$field.attr('id')}"]`)
            .text()
            .trim(),
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

  extractContactInfo($) {
    const info = {
      phones: [],
      emails: [],
      addresses: [],
    };

    // Phone numbers
    $('a[href^="tel:"]').each((i, elem) => {
      const phone = $(elem).attr('href').replace('tel:', '');
      const text = $(elem).text().trim();
      if (phone && !info.phones.find(p => p.number === phone)) {
        info.phones.push({ number: phone, text });
      }
    });

    // Emails
    $('a[href^="mailto:"]').each((i, elem) => {
      const email = $(elem).attr('href').replace('mailto:', '');
      if (email && !info.emails.includes(email)) {
        info.emails.push(email);
      }
    });

    // Addresses - look for common patterns
    const addressPatterns = [
      /\d+\s+[\w\s]+(?:Street|St|Avenue|Ave|Drive|Dr|Road|Rd|Boulevard|Blvd)/gi,
      /\d+\s+[\w\s]+,\s*[\w\s]+,\s*[A-Z]{2}\s+\d{5}/gi,
    ];

    const text = $('body').text();
    addressPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach(addr => {
          if (!info.addresses.includes(addr.trim())) {
            info.addresses.push(addr.trim());
          }
        });
      }
    });

    return info;
  }

  extractAttorneyInfo($) {
    const attorneys = [];

    // Look for attorney cards/profiles
    $('.attorney-card, .attorney-profile, .team-member').each((i, elem) => {
      const $attorney = $(elem);
      attorneys.push({
        name: $attorney.find('h2, h3, .name').first().text().trim(),
        title: $attorney.find('.title, .position').first().text().trim(),
        bio: $attorney.find('.bio, .description').first().text().trim(),
        image: $attorney.find('img').first().attr('src') || '',
      });
    });

    return attorneys;
  }

  extractPracticeAreaInfo($, url) {
    if (
      !url.includes('practice-area') &&
      !url.includes('immigration') &&
      !url.includes('personal-injury') &&
      !url.includes('criminal') &&
      !url.includes('family-law') &&
      !url.includes('workers-comp')
    ) {
      return null;
    }

    const info = {
      services: [],
      caseTypes: [],
      processSteps: [],
      commonQuestions: [],
    };

    // Extract service lists
    $('ul li, .services li, .service-list li').each((i, elem) => {
      const text = $(elem).text().trim();
      if (text.length > 10 && text.length < 100) {
        info.services.push(text);
      }
    });

    // Look for process/steps
    $('.process-step, .step, [class*="step-"]').each((i, elem) => {
      const $step = $(elem);
      info.processSteps.push({
        title: $step.find('h3, h4, .title').first().text().trim(),
        description: $step.find('p, .description').first().text().trim(),
      });
    });

    return info;
  }

  extractTestimonials($) {
    const testimonials = [];

    $('.testimonial, .review, [class*="testimonial"]').each((i, elem) => {
      const $testimonial = $(elem);
      const quote = $testimonial.find('.quote, .text, p').first().text().trim();
      const author = $testimonial.find('.author, .name, .client').first().text().trim();

      if (quote && quote.length > 50) {
        testimonials.push({
          quote,
          author,
          rating: $testimonial.find('.rating, .stars').text().trim(),
        });
      }
    });

    return testimonials;
  }

  extractFAQs($) {
    const faqs = [];

    // Look for FAQ sections
    $('.faq-item, .faq, [class*="faq"]').each((i, elem) => {
      const $faq = $(elem);
      const question = $faq.find('.question, h3, h4, dt').first().text().trim();
      const answer = $faq.find('.answer, p, dd').first().text().trim();

      if (question && answer) {
        faqs.push({ question, answer });
      }
    });

    // Also look for definition lists
    $('dl').each((i, elem) => {
      const $dl = $(elem);
      $dl.find('dt').each((j, dt) => {
        const question = $(dt).text().trim();
        const answer = $(dt).next('dd').text().trim();
        if (question && answer) {
          faqs.push({ question, answer });
        }
      });
    });

    return faqs;
  }

  extractCTAs($) {
    const ctas = [];

    $('a.btn, a.button, .cta a, [class*="cta"] a').each((i, elem) => {
      const $cta = $(elem);
      const text = $cta.text().trim();
      const href = $cta.attr('href');

      if (text && href && !href.startsWith('#')) {
        ctas.push({
          text,
          href,
          classes: $cta.attr('class') || '',
        });
      }
    });

    return ctas;
  }

  async downloadImage(imageUrl, pageUrl) {
    try {
      // Make absolute URL
      let absoluteUrl = imageUrl;
      if (!imageUrl.startsWith('http')) {
        absoluteUrl = new URL(imageUrl, pageUrl).href;
      }

      // Only download vasquezlawnc.com images
      if (!absoluteUrl.startsWith(this.baseUrl)) return;

      // Generate filename
      const urlPath = new URL(absoluteUrl).pathname;
      const filename = urlPath.split('/').pop() || 'image.jpg';
      const filepath = path.join(this.imagesDir, filename);

      // Check if already exists
      try {
        await fs.access(filepath);
        return; // Already downloaded
      } catch {
        // File doesn't exist, download it
      }

      // Download image
      const response = await axios.get(absoluteUrl, {
        responseType: 'arraybuffer',
        timeout: 10000,
      });

      await fs.writeFile(filepath, response.data);
      console.log(`    📷 Downloaded: ${filename}`);
    } catch (error) {
      // Silently skip failed downloads
    }
  }

  async saveMarkdownVersion(pageContent, filename) {
    let markdown = `# ${pageContent.title}\n\n`;

    if (pageContent.metaDescription) {
      markdown += `> ${pageContent.metaDescription}\n\n`;
    }

    if (pageContent.h1 && pageContent.h1 !== pageContent.title) {
      markdown += `## ${pageContent.h1}\n\n`;
    }

    // Add main content sections
    for (const section of pageContent.mainContent) {
      if (section.heading) {
        markdown += `## ${section.heading}\n\n`;
      }
      markdown += `${section.content}\n\n`;

      if (section.images && section.images.length > 0) {
        markdown += `**Images in this section:**\n`;
        section.images.forEach(img => {
          markdown += `- ${img.alt || 'Image'}: ${img.src}\n`;
        });
        markdown += '\n';
      }
    }

    // Add contact info if present
    if (pageContent.contactInfo.phones.length > 0 || pageContent.contactInfo.emails.length > 0) {
      markdown += `## Contact Information\n\n`;
      pageContent.contactInfo.phones.forEach(phone => {
        markdown += `- Phone: ${phone.text || phone.number}\n`;
      });
      pageContent.contactInfo.emails.forEach(email => {
        markdown += `- Email: ${email}\n`;
      });
      markdown += '\n';
    }

    // Add FAQs if present
    if (pageContent.faqs.length > 0) {
      markdown += `## Frequently Asked Questions\n\n`;
      pageContent.faqs.forEach(faq => {
        markdown += `**Q: ${faq.question}**\n`;
        markdown += `A: ${faq.answer}\n\n`;
      });
    }

    // Add testimonials if present
    if (pageContent.testimonials.length > 0) {
      markdown += `## Client Testimonials\n\n`;
      pageContent.testimonials.forEach(testimonial => {
        markdown += `> "${testimonial.quote}"\n`;
        markdown += `> — ${testimonial.author}\n\n`;
      });
    }

    await fs.writeFile(path.join(this.contentDir, `${filename}.md`), markdown);
  }

  getFilenameFromUrl(url) {
    const urlObj = new URL(url);
    let pathname = urlObj.pathname.replace(/\/$/, '');

    if (pathname === '' || pathname === '/') {
      return 'homepage';
    }

    // Replace slashes with dashes
    return pathname.substring(1).replace(/\//g, '-');
  }

  async createImportReport() {
    const report = {
      importDate: new Date().toISOString(),
      source: this.baseUrl,
      stats: {
        totalPages: this.visitedUrls.size,
        successfulImports: this.visitedUrls.size - this.failedUrls.length,
        failedImports: this.failedUrls.length,
        pagesWithForms: 0,
        pagesWithImages: 0,
        pagesWithTestimonials: 0,
        pagesWithFAQs: 0,
        totalImages: 0,
        spanishPages: 0,
      },
      failedUrls: this.failedUrls,
      importedPages: [],
    };

    // Analyze imported content
    const files = await fs.readdir(this.contentDir);
    for (const file of files) {
      if (!file.endsWith('.json')) continue;

      const content = JSON.parse(await fs.readFile(path.join(this.contentDir, file), 'utf-8'));

      report.importedPages.push({
        url: content.url,
        title: content.title,
        mainSections: content.mainContent.length,
        images: content.images.length,
        forms: content.forms.length,
        testimonials: content.testimonials.length,
        faqs: content.faqs.length,
        isSpanish: content.isSpanish,
      });

      // Update stats
      if (content.forms.length > 0) report.stats.pagesWithForms++;
      if (content.images.length > 0) report.stats.pagesWithImages++;
      if (content.testimonials.length > 0) report.stats.pagesWithTestimonials++;
      if (content.faqs.length > 0) report.stats.pagesWithFAQs++;
      if (content.isSpanish) report.stats.spanishPages++;
      report.stats.totalImages += content.images.length;
    }

    await fs.writeFile(
      path.join(this.contentDir, 'import-report.json'),
      JSON.stringify(report, null, 2)
    );

    console.log('\n📊 Import Summary:');
    console.log(`   Total Pages Imported: ${report.stats.successfulImports}`);
    console.log(`   Failed Imports: ${report.stats.failedImports}`);
    console.log(`   Pages with Forms: ${report.stats.pagesWithForms}`);
    console.log(`   Pages with Images: ${report.stats.pagesWithImages}`);
    console.log(`   Spanish Pages: ${report.stats.spanishPages}`);
    console.log(`   Total Images Downloaded: ${report.stats.totalImages}`);

    if (report.failedUrls.length > 0) {
      console.log('\n❌ Failed URLs:');
      report.failedUrls.forEach(failed => {
        console.log(`   ${failed.url}: ${failed.error}`);
      });
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run the importer
async function main() {
  const importer = new VasquezContentImporter();

  try {
    await importer.initialize();
    await importer.importAllContent();
  } catch (error) {
    console.error('Import failed:', error);
  }
}

// Check if required packages are installed
async function checkDependencies() {
  try {
    require('axios');
    require('cheerio');
  } catch (error) {
    console.error('Missing dependencies. Please run: npm install axios cheerio');
    process.exit(1);
  }
}

checkDependencies();
main().catch(console.error);
