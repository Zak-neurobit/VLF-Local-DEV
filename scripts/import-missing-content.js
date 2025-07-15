const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

class MissingContentImporter {
  constructor() {
    this.baseUrl = 'https://www.vasquezlawnc.com';
    this.contentDir = path.join(process.cwd(), 'content-import', 'pages');
    this.blogPostsDir = path.join(process.cwd(), 'content-import', 'blog-posts');
    this.visitedUrls = new Set();
    this.blogPosts = [];
  }

  async initialize() {
    console.log('🔍 Searching for missing content from vasquezlawnc.com...\n');
    await fs.mkdir(this.blogPostsDir, { recursive: true });

    // Load already imported pages
    const files = await fs.readdir(this.contentDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const content = JSON.parse(await fs.readFile(path.join(this.contentDir, file), 'utf-8'));
          this.visitedUrls.add(content.url);
        } catch (e) {
          // Skip invalid files
        }
      }
    }

    console.log(`Already imported: ${this.visitedUrls.size} pages\n`);
  }

  async findAllBlogPosts() {
    console.log('📰 Searching for blog posts...');

    try {
      // First, check the blog page for all posts
      const blogResponse = await axios.get(`${this.baseUrl}/blog/`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VasquezLawImporter/1.0)' },
        timeout: 10000,
      });

      const $ = cheerio.load(blogResponse.data);

      // Find all blog post links
      const blogLinks = new Set();

      // Common selectors for blog posts
      const selectors = [
        'article a[href*="/blog/"]',
        '.blog-post a',
        '.post-title a',
        'h2 a[href*="/blog/"]',
        'h3 a[href*="/blog/"]',
        '.entry-title a',
        '.post a[href]',
        'a[href*="best-workers-compensation-quote"]',
        'a[href*="como-miles-se-han-beneficiado"]',
        'a[href*="struggles-of-undocumented"]',
        'a[href*="expert-tips-to-navigate"]',
        'a[href*="shocking-truth-about-illegal"]',
      ];

      for (const selector of selectors) {
        $(selector).each((i, elem) => {
          const href = $(elem).attr('href');
          if (href && !href.startsWith('#') && !href.includes('page=')) {
            let fullUrl = href;
            if (!href.startsWith('http')) {
              fullUrl = new URL(href, this.baseUrl).href;
            }
            if (fullUrl.startsWith(this.baseUrl) && !this.visitedUrls.has(fullUrl)) {
              blogLinks.add(fullUrl);
            }
          }
        });
      }

      // Also check pagination
      let page = 1;
      let hasMorePages = true;

      while (hasMorePages && page < 20) {
        // Limit to 20 pages to avoid infinite loops
        try {
          const pageUrl = `${this.baseUrl}/blog/page/${page}/`;
          const pageResponse = await axios.get(pageUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VasquezLawImporter/1.0)' },
            timeout: 10000,
          });

          const $page = cheerio.load(pageResponse.data);
          let foundPosts = false;

          $page('article a[href], .post a[href], h2 a[href]').each((i, elem) => {
            const href = $page(elem).attr('href');
            if (href && href.includes('/blog/') && !href.includes('/page/')) {
              let fullUrl = href;
              if (!href.startsWith('http')) {
                fullUrl = new URL(href, this.baseUrl).href;
              }
              if (fullUrl.startsWith(this.baseUrl) && !this.visitedUrls.has(fullUrl)) {
                blogLinks.add(fullUrl);
                foundPosts = true;
              }
            }
          });

          hasMorePages = foundPosts;
          page++;
        } catch (e) {
          hasMorePages = false;
        }
      }

      console.log(`Found ${blogLinks.size} blog posts to import\n`);
      this.blogPosts = Array.from(blogLinks);
    } catch (error) {
      console.error('Error finding blog posts:', error.message);
    }
  }

  async findMissingPages() {
    console.log('🔍 Searching for other missing pages...');

    // Known patterns that might have been missed
    const checkUrls = [
      '/blog/',
      '/resources/',
      '/testimonials/',
      '/case-results/',
      '/about/',
      '/about-us/',
      '/our-team/',
      '/careers/',
      '/news/',
      '/events/',
      '/community/',
      '/pro-bono/',
      '/referrals/',
      '/privacy-policy/',
      '/terms-of-service/',
      '/disclaimer/',
      '/site-map/',
      '/accessibility/',
      // Specific blog posts we know exist
      '/best-workers-compensation-quote-save-more-today/',
      '/como-miles-se-han-beneficiado-al/',
      '/como-navegar-las-complejidades-de-la-junta-de/',
      '/struggles-of-undocumented-immigrants/',
      '/expert-tips-to-navigate-a-delayed-immigration-court-case-status/',
      '/best-guide-on-navigating-the-board-of-immigration-appeals/',
      '/la-impactante-verdad-sobre-la-inmigracion-ilegal/',
      '/expert-insights-on-the-shocking-truth-about-illegal-immigrants/',
      '/la-mejor-guia-para-navegar-en-la-junta-de-apelaciones-de-inmigracion/',
      '/7-estrategias-comprobadas-que-los-abogados-de-inmigracion-usan-para-ganar-casos-complejos/',
    ];

    const missingUrls = [];

    for (const path of checkUrls) {
      const fullUrl = `${this.baseUrl}${path}`;
      if (!this.visitedUrls.has(fullUrl)) {
        try {
          // Check if page exists
          const response = await axios.head(fullUrl, {
            timeout: 5000,
            validateStatus: status => status < 400,
          });
          if (response.status === 200) {
            missingUrls.push(fullUrl);
            console.log(`  Found missing page: ${path}`);
          }
        } catch (e) {
          // Page doesn't exist or error
        }
      }
    }

    return missingUrls;
  }

  async importBlogPost(url) {
    console.log(`  Importing blog post: ${url}`);

    try {
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VasquezLawImporter/1.0)' },
        timeout: 15000,
      });

      const $ = cheerio.load(response.data);

      // Extract blog post specific content
      const postContent = {
        url: url,
        path: new URL(url).pathname,
        type: 'blog-post',
        fetchedAt: new Date().toISOString(),

        // Meta
        title: $('title').text().trim(),
        metaDescription: $('meta[name="description"]').attr('content') || '',

        // Post metadata
        publishDate:
          $('time').attr('datetime') ||
          $('meta[property="article:published_time"]').attr('content') ||
          '',
        modifiedDate: $('meta[property="article:modified_time"]').attr('content') || '',
        author: $('.author').text().trim() || $('meta[name="author"]').attr('content') || '',

        // Content
        headline: $('h1').first().text().trim() || $('.entry-title').text().trim(),

        // Main content - try multiple selectors
        content: this.extractBlogContent($),

        // Categories and tags
        categories: [],
        tags: [],

        // Images
        featuredImage: $('meta[property="og:image"]').attr('content') || '',
        images: this.extractImages($, url),

        // Related posts
        relatedPosts: this.extractRelatedPosts($, url),
      };

      // Extract categories
      $('.category a, .cat-links a').each((i, elem) => {
        postContent.categories.push($(elem).text().trim());
      });

      // Extract tags
      $('.tags a, .tag-links a').each((i, elem) => {
        postContent.tags.push($(elem).text().trim());
      });

      // Save the blog post
      const filename = url.split('/').filter(Boolean).pop() || 'blog-post';
      await fs.writeFile(
        path.join(this.blogPostsDir, `${filename}.json`),
        JSON.stringify(postContent, null, 2)
      );

      // Also save as markdown for easy reading
      await this.saveBlogPostAsMarkdown(postContent, filename);

      return true;
    } catch (error) {
      console.error(`    Failed to import ${url}:`, error.message);
      return false;
    }
  }

  extractBlogContent($) {
    // Try multiple content selectors
    const selectors = [
      '.entry-content',
      '.post-content',
      '.content-area',
      'article .content',
      '.blog-content',
      'main article',
      '[itemprop="articleBody"]',
    ];

    for (const selector of selectors) {
      const $content = $(selector);
      if ($content.length > 0) {
        // Clone and clean
        const $clean = $content.clone();
        $clean.find('script, style, .share-buttons, .related-posts').remove();

        return {
          html: $clean.html(),
          text: $clean.text().trim(),
          paragraphs: $clean
            .find('p')
            .map((i, p) => $(p).text().trim())
            .get(),
        };
      }
    }

    // Fallback: get main content
    const $main = $('main, #main, .main').clone();
    $main.find('nav, header, footer, aside, script, style').remove();

    return {
      html: $main.html() || '',
      text: $main.text().trim(),
      paragraphs: $main
        .find('p')
        .map((i, p) => $(p).text().trim())
        .get(),
    };
  }

  extractImages($, pageUrl) {
    const images = [];

    $('article img, .entry-content img, .post-content img').each((i, elem) => {
      const $img = $(elem);
      let src = $img.attr('src');

      if (src && !src.startsWith('data:')) {
        if (!src.startsWith('http')) {
          src = new URL(src, pageUrl).href;
        }

        images.push({
          src,
          alt: $img.attr('alt') || '',
          title: $img.attr('title') || '',
          caption: $img.closest('figure').find('figcaption').text().trim() || '',
        });
      }
    });

    return images;
  }

  extractRelatedPosts($, pageUrl) {
    const related = [];

    $('.related-posts a, .related a, .more-posts a').each((i, elem) => {
      const $link = $(elem);
      const href = $link.attr('href');
      const title = $link.text().trim();

      if (href && title && !href.startsWith('#')) {
        let fullUrl = href;
        if (!href.startsWith('http')) {
          fullUrl = new URL(href, pageUrl).href;
        }

        if (fullUrl.startsWith(this.baseUrl)) {
          related.push({ url: fullUrl, title });
        }
      }
    });

    return related;
  }

  async saveBlogPostAsMarkdown(post, filename) {
    let markdown = `# ${post.headline || post.title}\n\n`;

    if (post.publishDate) {
      markdown += `**Published:** ${new Date(post.publishDate).toLocaleDateString()}\n`;
    }
    if (post.author) {
      markdown += `**Author:** ${post.author}\n`;
    }
    if (post.categories.length > 0) {
      markdown += `**Categories:** ${post.categories.join(', ')}\n`;
    }
    markdown += '\n';

    if (post.metaDescription) {
      markdown += `> ${post.metaDescription}\n\n`;
    }

    if (post.featuredImage) {
      markdown += `![Featured Image](${post.featuredImage})\n\n`;
    }

    // Add content paragraphs
    if (post.content.paragraphs && post.content.paragraphs.length > 0) {
      markdown += post.content.paragraphs.join('\n\n');
    } else {
      markdown += post.content.text;
    }

    if (post.tags.length > 0) {
      markdown += `\n\n**Tags:** ${post.tags.join(', ')}`;
    }

    await fs.writeFile(path.join(this.blogPostsDir, `${filename}.md`), markdown);
  }

  async importAllMissingContent() {
    await this.initialize();

    // Find and import blog posts
    await this.findAllBlogPosts();

    if (this.blogPosts.length > 0) {
      console.log('📥 Importing blog posts...\n');
      let imported = 0;

      for (const url of this.blogPosts) {
        if (await this.importBlogPost(url)) {
          imported++;
        }
        // Be respectful
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      console.log(`\n✅ Imported ${imported} blog posts`);
    }

    // Find other missing pages
    const missingPages = await this.findMissingPages();

    if (missingPages.length > 0) {
      console.log(`\n📥 Importing ${missingPages.length} other missing pages...\n`);

      // Import using the main content importer
      const { VasquezContentImporter } = require('./import-vasquez-content.js');
      const mainImporter = new VasquezContentImporter();
      await mainImporter.initialize();

      for (const url of missingPages) {
        await mainImporter.importPage(url);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    // Generate final report
    await this.generateReport();
  }

  async generateReport() {
    const blogFiles = await fs.readdir(this.blogPostsDir);
    const blogPosts = blogFiles.filter(f => f.endsWith('.json'));

    const report = {
      timestamp: new Date().toISOString(),
      blogPostsImported: blogPosts.length,
      blogPosts: [],
      summary: {
        totalPagesNow: this.visitedUrls.size + blogPosts.length,
      },
    };

    // Analyze blog posts
    for (const file of blogPosts) {
      const content = JSON.parse(await fs.readFile(path.join(this.blogPostsDir, file), 'utf-8'));
      report.blogPosts.push({
        title: content.headline || content.title,
        url: content.url,
        publishDate: content.publishDate,
        author: content.author,
        categories: content.categories,
      });
    }

    await fs.writeFile(
      path.join(this.blogPostsDir, 'blog-import-report.json'),
      JSON.stringify(report, null, 2)
    );

    console.log('\n📊 Import Report:');
    console.log(`   Blog posts imported: ${blogPosts.length}`);
    console.log(`   Total pages in site: ${report.summary.totalPagesNow}`);
    console.log('\n✨ All missing content imported!');
  }
}

// Run the importer
async function main() {
  const importer = new MissingContentImporter();

  try {
    await importer.importAllMissingContent();
  } catch (error) {
    console.error('Import failed:', error);
  }
}

main().catch(console.error);
