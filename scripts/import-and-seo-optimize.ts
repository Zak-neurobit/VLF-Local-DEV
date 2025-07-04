import { chromium } from 'playwright';
import * as fs from 'fs/promises';
import * as path from 'path';
import { logger } from '@/lib/logger';

interface PageContent {
  url: string;
  title: string;
  metaDescription: string;
  h1: string;
  content: string;
  images: Array<{ src: string; alt: string }>;
  links: Array<{ href: string; text: string }>;
  structuredData?: any;
}

interface SEOOptimizedContent extends PageContent {
  optimizedTitle: string;
  optimizedDescription: string;
  keywords: string[];
  headings: {
    h1: string;
    h2: string[];
    h3: string[];
  };
  internalLinks: string[];
  externalLinks: string[];
  readingTime: number;
  wordCount: number;
  seoScore: number;
}

class ContentImporterAndOptimizer {
  private baseUrl = 'https://vasquezlawnc.com';
  private outputDir = 'content-import/live-site-import';

  // SEO Keywords for different practice areas
  private keywords = {
    immigration: [
      'immigration lawyer Charlotte NC',
      'immigration attorney near me',
      'visa lawyer',
      'green card attorney',
      'deportation defense lawyer',
      'citizenship attorney',
      'DACA lawyer',
      'asylum attorney',
      'family immigration lawyer',
      'work visa attorney',
    ],
    personalInjury: [
      'personal injury lawyer Charlotte',
      'car accident attorney NC',
      'truck accident lawyer',
      'motorcycle accident attorney',
      'slip and fall lawyer',
      'wrongful death attorney',
      'medical malpractice lawyer',
      'injury attorney near me',
    ],
    criminalDefense: [
      'criminal defense lawyer Charlotte',
      'DUI attorney NC',
      'DWI lawyer',
      'drug crime attorney',
      'assault defense lawyer',
      'traffic ticket attorney',
      'expungement lawyer NC',
    ],
    familyLaw: [
      'divorce lawyer Charlotte NC',
      'family law attorney',
      'child custody lawyer',
      'alimony attorney',
      'property division lawyer',
      'separation agreement attorney',
    ],
    workersComp: [
      'workers compensation lawyer Charlotte',
      'work injury attorney NC',
      'workplace accident lawyer',
      'construction injury attorney',
      'workers comp benefits lawyer',
    ],
  };

  async importAllContent() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      // Get sitemap
      const sitemapUrls = await this.getSitemapUrls(page);
      console.log(`Found ${sitemapUrls.length} URLs to import`);

      const importedPages: PageContent[] = [];

      // Import each page
      for (const url of sitemapUrls) {
        try {
          const content = await this.importPage(page, url);
          if (content) {
            importedPages.push(content);
            console.log(`Imported: ${url}`);
          }
        } catch (error) {
          console.error(`Failed to import ${url}:`, error);
        }
      }

      // Save raw imported content
      await this.saveImportedContent(importedPages);

      // SEO optimize all content
      const optimizedContent = await this.optimizeAllContent(importedPages);

      // Generate optimized pages
      await this.generateOptimizedPages(optimizedContent);

      // Generate sitemap
      await this.generateSitemap(optimizedContent);

      // Generate robots.txt
      await this.generateRobotsTxt();

      console.log('Import and optimization complete!');

      return {
        imported: importedPages.length,
        optimized: optimizedContent.length,
        seoScoreAverage: this.calculateAverageSEOScore(optimizedContent),
      };
    } finally {
      await browser.close();
    }
  }

  private async getSitemapUrls(page: any): Promise<string[]> {
    const urls: string[] = [];

    // Try multiple sitemap locations
    const sitemapUrls = [
      `${this.baseUrl}/sitemap.xml`,
      `${this.baseUrl}/sitemap_index.xml`,
      `${this.baseUrl}/post-sitemap.xml`,
      `${this.baseUrl}/page-sitemap.xml`,
      `${this.baseUrl}/category-sitemap.xml`,
    ];

    for (const sitemapUrl of sitemapUrls) {
      try {
        await page.goto(sitemapUrl);
        const content = await page.content();

        // Extract URLs from sitemap
        const urlMatches = content.match(/<loc>(.*?)<\/loc>/g) || [];
        const extractedUrls = urlMatches.map((match: string) =>
          match.replace(/<\/?loc>/g, '').trim()
        );

        urls.push(...extractedUrls);
      } catch (error) {
        console.log(`Sitemap not found at ${sitemapUrl}`);
      }
    }

    // If no sitemap, crawl main pages
    if (urls.length === 0) {
      urls.push(
        this.baseUrl,
        `${this.baseUrl}/attorneys`,
        `${this.baseUrl}/practice-areas`,
        `${this.baseUrl}/immigration`,
        `${this.baseUrl}/personal-injury`,
        `${this.baseUrl}/criminal-defense`,
        `${this.baseUrl}/family-law`,
        `${this.baseUrl}/workers-compensation`,
        `${this.baseUrl}/contact`,
        `${this.baseUrl}/blog`,
        `${this.baseUrl}/about-us`,
        `${this.baseUrl}/testimonials`,
        `${this.baseUrl}/case-results`
      );
    }

    // Remove duplicates
    return [...new Set(urls)];
  }

  private async importPage(page: any, url: string): Promise<PageContent | null> {
    try {
      await page.goto(url, { waitUntil: 'networkidle' });

      // Extract content
      const content = await page.evaluate(() => {
        // Remove script and style elements
        const scripts = document.querySelectorAll('script, style');
        scripts.forEach(el => el.remove());

        return {
          title: document.title || '',
          metaDescription:
            document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
          h1: document.querySelector('h1')?.textContent?.trim() || '',
          content: document.body?.innerText || '',
          html: document.body?.innerHTML || '',
          structuredData: Array.from(
            document.querySelectorAll('script[type="application/ld+json"]')
          )
            .map(script => {
              try {
                return JSON.parse(script.textContent || '{}');
              } catch {
                return null;
              }
            })
            .filter(Boolean),
        };
      });

      // Extract images
      const images = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt || '',
        }));
      });

      // Extract links
      const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a')).map(link => ({
          href: link.href,
          text: link.textContent?.trim() || '',
        }));
      });

      return {
        url,
        title: content.title,
        metaDescription: content.metaDescription,
        h1: content.h1,
        content: content.content,
        images,
        links,
        structuredData: content.structuredData,
      };
    } catch (error) {
      console.error(`Error importing ${url}:`, error);
      return null;
    }
  }

  private async optimizeAllContent(pages: PageContent[]): Promise<SEOOptimizedContent[]> {
    return pages.map(page => this.optimizePage(page));
  }

  private optimizePage(page: PageContent): SEOOptimizedContent {
    // Determine practice area from URL
    const practiceArea = this.determinePracticeArea(page.url);
    const relevantKeywords = this.keywords[practiceArea as keyof typeof this.keywords] || [];

    // Extract headings
    const headings = this.extractHeadings(page.content);

    // Optimize title
    const optimizedTitle = this.optimizeTitle(page.title, relevantKeywords);

    // Optimize description
    const optimizedDescription = this.optimizeDescription(
      page.metaDescription || page.content.substring(0, 300),
      relevantKeywords
    );

    // Calculate metrics
    const wordCount = page.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

    // Categorize links
    const internalLinks = page.links
      .filter(link => link.href.includes(this.baseUrl))
      .map(link => link.href);

    const externalLinks = page.links
      .filter(link => !link.href.includes(this.baseUrl) && link.href.startsWith('http'))
      .map(link => link.href);

    // Calculate SEO score
    const seoScore = this.calculateSEOScore({
      hasTitle: !!optimizedTitle,
      titleLength: optimizedTitle.length,
      hasDescription: !!optimizedDescription,
      descriptionLength: optimizedDescription.length,
      hasH1: !!page.h1,
      headingStructure: headings,
      wordCount,
      hasImages: page.images.length > 0,
      imagesWithAlt: page.images.filter(img => img.alt).length,
      internalLinks: internalLinks.length,
      keywordDensity: this.calculateKeywordDensity(page.content, relevantKeywords),
    });

    return {
      ...page,
      optimizedTitle,
      optimizedDescription,
      keywords: relevantKeywords,
      headings,
      internalLinks,
      externalLinks,
      readingTime,
      wordCount,
      seoScore,
    };
  }

  private determinePracticeArea(url: string): string {
    if (url.includes('immigration')) return 'immigration';
    if (url.includes('personal-injury') || url.includes('accident')) return 'personalInjury';
    if (url.includes('criminal') || url.includes('dui') || url.includes('dwi'))
      return 'criminalDefense';
    if (url.includes('family') || url.includes('divorce')) return 'familyLaw';
    if (url.includes('workers-comp')) return 'workersComp';
    return 'immigration'; // Default
  }

  private extractHeadings(content: string): SEOOptimizedContent['headings'] {
    // Simple heading extraction from text content
    const lines = content.split('\n');
    const headings = {
      h1: '',
      h2: [] as string[],
      h3: [] as string[],
    };

    // This is simplified - in real implementation, parse HTML
    lines.forEach(line => {
      if (line.length > 20 && line.length < 100 && line === line.toUpperCase()) {
        headings.h2.push(line);
      }
    });

    return headings;
  }

  private optimizeTitle(title: string, keywords: string[]): string {
    if (!title) return '';

    // Remove site name if at the end
    let optimized = title.replace(/\s*[-|]\s*Vasquez Law Firm.*$/i, '');

    // Ensure primary keyword is in title
    const primaryKeyword = keywords[0];
    if (primaryKeyword && !optimized.toLowerCase().includes(primaryKeyword.split(' ')[0])) {
      optimized = `${optimized} | ${primaryKeyword}`;
    }

    // Add location if not present
    if (!optimized.includes('Charlotte') && !optimized.includes('NC')) {
      optimized += ' Charlotte NC';
    }

    // Add brand
    optimized += ' | Vasquez Law Firm';

    // Ensure optimal length (50-60 characters)
    if (optimized.length > 60) {
      optimized = optimized.substring(0, 57) + '...';
    }

    return optimized;
  }

  private optimizeDescription(description: string, keywords: string[]): string {
    if (!description) return '';

    let optimized = description.trim();

    // Ensure it includes primary keyword
    const primaryKeyword = keywords[0];
    if (primaryKeyword && !optimized.toLowerCase().includes(primaryKeyword.toLowerCase())) {
      optimized = `${primaryKeyword}. ${optimized}`;
    }

    // Add call to action
    if (!optimized.includes('call') && !optimized.includes('contact')) {
      optimized += ' Call 1-844-YO-PELEO for a free consultation.';
    }

    // Ensure optimal length (150-160 characters)
    if (optimized.length > 160) {
      optimized = optimized.substring(0, 157) + '...';
    }

    return optimized;
  }

  private calculateKeywordDensity(content: string, keywords: string[]): number {
    const contentLower = content.toLowerCase();
    const totalWords = content.split(/\s+/).length;
    let keywordCount = 0;

    keywords.forEach(keyword => {
      const regex = new RegExp(keyword.toLowerCase(), 'g');
      const matches = contentLower.match(regex) || [];
      keywordCount += matches.length;
    });

    return (keywordCount / totalWords) * 100;
  }

  private calculateSEOScore(factors: any): number {
    let score = 0;

    // Title (20 points)
    if (factors.hasTitle) score += 10;
    if (factors.titleLength >= 30 && factors.titleLength <= 60) score += 10;

    // Description (20 points)
    if (factors.hasDescription) score += 10;
    if (factors.descriptionLength >= 120 && factors.descriptionLength <= 160) score += 10;

    // Headings (20 points)
    if (factors.hasH1) score += 10;
    if (factors.headingStructure.h2.length > 0) score += 10;

    // Content (20 points)
    if (factors.wordCount >= 300) score += 10;
    if (factors.wordCount >= 1000) score += 10;

    // Images (10 points)
    if (factors.hasImages) score += 5;
    if (factors.imagesWithAlt === factors.images?.length) score += 5;

    // Links (10 points)
    if (factors.internalLinks >= 3) score += 10;

    return score;
  }

  private async saveImportedContent(pages: PageContent[]) {
    await fs.mkdir(this.outputDir, { recursive: true });

    // Save all pages
    await fs.writeFile(path.join(this.outputDir, 'all-pages.json'), JSON.stringify(pages, null, 2));

    // Save individual pages
    for (const page of pages) {
      const filename = this.urlToFilename(page.url);
      await fs.writeFile(
        path.join(this.outputDir, `${filename}.json`),
        JSON.stringify(page, null, 2)
      );
    }
  }

  private async generateOptimizedPages(pages: SEOOptimizedContent[]) {
    const optimizedDir = path.join(this.outputDir, 'optimized');
    await fs.mkdir(optimizedDir, { recursive: true });

    for (const page of pages) {
      const filename = this.urlToFilename(page.url);

      // Generate optimized page data
      const optimizedPage = {
        ...page,
        seo: {
          title: page.optimizedTitle,
          description: page.optimizedDescription,
          keywords: page.keywords.join(', '),
          canonical: page.url,
          og: {
            title: page.optimizedTitle,
            description: page.optimizedDescription,
            type: 'website',
            url: page.url,
          },
          twitter: {
            card: 'summary_large_image',
            title: page.optimizedTitle,
            description: page.optimizedDescription,
          },
        },
        structuredData: this.generateStructuredData(page),
      };

      await fs.writeFile(
        path.join(optimizedDir, `${filename}.json`),
        JSON.stringify(optimizedPage, null, 2)
      );
    }
  }

  private generateStructuredData(page: SEOOptimizedContent): any {
    const baseStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: 'Vasquez Law Firm',
      url: 'https://vasquezlawnc.com',
      logo: 'https://vasquezlawnc.com/logo.png',
      telephone: '1-844-YO-PELEO',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4801 E Independence Blvd Suite 714',
        addressLocality: 'Charlotte',
        addressRegion: 'NC',
        postalCode: '28212',
        addressCountry: 'US',
      },
      areaServed: ['Charlotte', 'North Carolina', 'South Carolina'],
      priceRange: '$$',
    };

    // Add page-specific structured data
    if (page.url.includes('attorney')) {
      return {
        ...baseStructuredData,
        '@type': 'Attorney',
        name: page.h1,
        description: page.optimizedDescription,
      };
    }

    if (page.url.includes('blog') || page.url.includes('article')) {
      return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: page.optimizedTitle,
        description: page.optimizedDescription,
        datePublished: new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: 'Vasquez Law Firm',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Vasquez Law Firm',
          logo: {
            '@type': 'ImageObject',
            url: 'https://vasquezlawnc.com/logo.png',
          },
        },
      };
    }

    // Add FAQ schema for FAQ pages
    if (page.url.includes('faq')) {
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [], // Would be populated with Q&A pairs
      };
    }

    return baseStructuredData;
  }

  private async generateSitemap(pages: SEOOptimizedContent[]) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${this.getChangeFreq(page.url)}</changefreq>
    <priority>${this.getPriority(page.url)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    await fs.writeFile(path.join(this.outputDir, 'sitemap.xml'), sitemap);
  }

  private getChangeFreq(url: string): string {
    if (url === this.baseUrl || url.includes('blog')) return 'daily';
    if (url.includes('practice-areas') || url.includes('attorneys')) return 'weekly';
    return 'monthly';
  }

  private getPriority(url: string): string {
    if (url === this.baseUrl) return '1.0';
    if (url.includes('practice-areas') || url.includes('immigration')) return '0.9';
    if (url.includes('attorneys') || url.includes('contact')) return '0.8';
    if (url.includes('blog')) return '0.7';
    return '0.6';
  }

  private async generateRobotsTxt() {
    const robotsTxt = `# Vasquez Law Firm Robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/

# Sitemaps
Sitemap: https://vasquezlawnc.com/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Specific bot rules
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /`;

    await fs.writeFile(path.join(this.outputDir, 'robots.txt'), robotsTxt);
  }

  private urlToFilename(url: string): string {
    return (
      url
        .replace(this.baseUrl, '')
        .replace(/^\//, '')
        .replace(/\//g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '')
        .toLowerCase() || 'homepage'
    );
  }

  private calculateAverageSEOScore(pages: SEOOptimizedContent[]): number {
    const total = pages.reduce((sum, page) => sum + page.seoScore, 0);
    return Math.round(total / pages.length);
  }
}

// Run the importer
async function main() {
  const importer = new ContentImporterAndOptimizer();
  const result = await importer.importAllContent();
  console.log('Import complete:', result);
}

// Only run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { ContentImporterAndOptimizer };
