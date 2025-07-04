const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// Blog post patterns to look for
const BLOG_PATTERNS = [
  '/blog/',
  'how-to-',
  'what-is-',
  'what-are-',
  'when-is-',
  'when-can-',
  'why-you-',
  'guide-to-',
  'tips-for-',
  'best-',
  'top-',
  'expert-',
  'understanding-',
  'common-',
  'mistakes-',
  'benefits-of-',
  'reasons-why-',
  'steps-to-',
  'ways-to-',
  'types-of-',
  'difference-between-',
];

// Categories for blog posts
const BLOG_CATEGORIES = {
  immigration: [
    'immigration',
    'visa',
    'green-card',
    'deportation',
    'asylum',
    'citizenship',
    'daca',
    'ice',
  ],
  'personal-injury': ['accident', 'injury', 'slip', 'fall', 'crash', 'insurance', 'compensation'],
  'criminal-defense': ['criminal', 'arrest', 'dui', 'dwi', 'defense', 'charges', 'court'],
  'workers-compensation': ['workers', 'comp', 'workplace', 'injury', 'osha'],
  'family-law': ['divorce', 'custody', 'family', 'marriage', 'separation'],
  general: [],
};

async function discoverBlogPosts() {
  console.log('🔍 Discovering blog posts from vasquezlawnc.com...\n');

  const baseUrl = 'https://www.vasquezlawnc.com';
  const discoveredPosts = new Set();
  const visitedUrls = new Set();

  // Start with known blog URLs and sitemap
  const startUrls = [
    `${baseUrl}/blog`,
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/category/immigration`,
    `${baseUrl}/category/personal-injury`,
    `${baseUrl}/category/criminal-defense`,
    `${baseUrl}/category/workers-compensation`,
  ];

  for (const startUrl of startUrls) {
    try {
      console.log(`Scanning: ${startUrl}`);

      const response = await axios.get(startUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data, { xmlMode: startUrl.includes('.xml') });

      // Extract URLs
      const urls = [];
      if (startUrl.includes('.xml')) {
        $('loc').each((i, elem) => {
          urls.push($(elem).text());
        });
      } else {
        $('a[href]').each((i, elem) => {
          const href = $(elem).attr('href');
          if (href && href.startsWith('/')) {
            urls.push(`${baseUrl}${href}`);
          } else if (href && href.startsWith(baseUrl)) {
            urls.push(href);
          }
        });
      }

      // Filter for blog posts
      urls.forEach(url => {
        const urlPath = url.replace(baseUrl, '').toLowerCase();
        const isBlogPost = BLOG_PATTERNS.some(pattern => urlPath.includes(pattern));

        if (isBlogPost && !visitedUrls.has(url)) {
          discoveredPosts.add(url);
          visitedUrls.add(url);
        }
      });
    } catch (error) {
      console.log(`  ⚠️  Error scanning ${startUrl}: ${error.message}`);
    }
  }

  console.log(`\n✅ Discovered ${discoveredPosts.size} potential blog posts\n`);
  return Array.from(discoveredPosts);
}

async function checkExistingPages() {
  console.log('📁 Checking existing pages...\n');

  const appDir = path.join(process.cwd(), 'src/app');
  const existingPaths = new Set();

  // Get all existing page.tsx files
  try {
    const output = execSync('find src/app -name "page.tsx" -type f', { encoding: 'utf8' });
    const files = output
      .trim()
      .split('\n')
      .filter(f => f);

    files.forEach(file => {
      const relativePath = file.replace('src/app', '').replace('/page.tsx', '') || '/';
      existingPaths.add(relativePath);
    });

    console.log(`Found ${existingPaths.size} existing pages\n`);
  } catch (error) {
    console.error('Error checking existing pages:', error);
  }

  return existingPaths;
}

async function importBlogPost(url, existingPaths) {
  try {
    const urlPath = new URL(url).pathname;

    // Skip if already exists
    if (existingPaths.has(urlPath)) {
      console.log(`⏭️  Skipping (exists): ${urlPath}`);
      return null;
    }

    console.log(`📥 Importing: ${url}`);

    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 15000,
    });

    const $ = cheerio.load(response.data);

    // Extract content
    const title =
      $('h1').first().text().trim() ||
      $('title').text().trim().replace(' - Vasquez Law Firm, PLLC', '');

    const metaDescription =
      $('meta[name="description"]').attr('content') ||
      $('meta[property="og:description"]').attr('content') ||
      '';

    // Extract main content
    const contentSelectors = [
      '.entry-content',
      '.post-content',
      '.content',
      'article',
      'main',
      '#content',
    ];

    let content = '';
    for (const selector of contentSelectors) {
      const element = $(selector).first();
      if (element.length) {
        content = element.html() || '';
        break;
      }
    }

    if (!content) {
      console.log(`  ⚠️  No content found for ${url}`);
      return null;
    }

    // Clean content
    const $content = cheerio.load(content);
    $content('script, style, iframe').remove();

    // Convert to markdown-like structure
    const cleanContent = $content.text().replace(/\s+/g, ' ').trim().substring(0, 5000); // Limit length

    // Extract metadata
    const publishDate =
      $('meta[property="article:published_time"]').attr('content') ||
      $('time').first().attr('datetime') ||
      new Date().toISOString();

    const author =
      $('meta[property="article:author"]').attr('content') ||
      $('.author').first().text().trim() ||
      'Vasquez Law Firm';

    // Determine category
    let category = 'general';
    const urlLower = url.toLowerCase();
    for (const [cat, keywords] of Object.entries(BLOG_CATEGORIES)) {
      if (keywords.some(keyword => urlLower.includes(keyword))) {
        category = cat;
        break;
      }
    }

    // Extract images
    const featuredImage =
      $('meta[property="og:image"]').attr('content') || $('img').first().attr('src') || '';

    return {
      url,
      urlPath,
      title,
      metaDescription,
      content: cleanContent,
      publishDate,
      author,
      category,
      featuredImage,
      importDate: new Date().toISOString(),
    };
  } catch (error) {
    console.log(`  ❌ Error importing ${url}: ${error.message}`);
    return null;
  }
}

async function generateBlogPage(blogData) {
  const { urlPath, title, metaDescription, content, publishDate, author, category, featuredImage } =
    blogData;

  // Create directory path
  const pageDir = path.join(process.cwd(), 'src/app', urlPath);
  await fs.mkdir(pageDir, { recursive: true });

  // Generate page content
  const pageContent = `import { Metadata } from 'next';
import PageLayout from '@/components/Layout/PageLayout';
import Section from '@/components/UI/Section';
import { Card, CardContent } from '@/components/UI/Card';
import { Calendar, User, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: '${title.replace(/'/g, "\\'")} | Vasquez Law Firm, PLLC',
  description: '${metaDescription.replace(/'/g, "\\'")}',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com${urlPath}'
  },
  openGraph: {
    title: '${title.replace(/'/g, "\\'")}',
    description: '${metaDescription.replace(/'/g, "\\'")}',
    type: 'article',
    publishedTime: '${publishDate}',
    authors: ['${author}'],
    images: ${featuredImage ? `['${featuredImage}']` : '[]'}
  }
};

export default function BlogPost() {
  return (
    <PageLayout>
      <Section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            {/* Blog Header */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-brand-charcoal mb-4">
                ${title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime="${publishDate}">
                    {new Date('${publishDate}').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>${author}</span>
                </div>
                
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  <span className="capitalize">${category.replace('-', ' ')}</span>
                </div>
              </div>
            </header>

            ${
              featuredImage
                ? `
            {/* Featured Image */}
            <div className="mb-8">
              <img 
                src="${featuredImage}" 
                alt="${title}"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            `
                : ''
            }

            {/* Blog Content */}
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    ${content.replace(/'/g, "\\'")}
                  </p>
                </div>

                {/* Call to Action */}
                <div className="mt-12 p-8 bg-brand-skyblue/10 rounded-lg">
                  <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
                    Need Legal Assistance?
                  </h2>
                  <p className="text-gray-700 mb-6">
                    If you have questions about ${
                      category === 'immigration'
                        ? 'your immigration case'
                        : category === 'personal-injury'
                          ? 'your injury claim'
                          : category === 'criminal-defense'
                            ? 'criminal charges'
                            : category === 'workers-compensation'
                              ? 'your workplace injury'
                              : 'your legal matter'
                    }, 
                    our experienced attorneys are here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/free-consultation"
                      className="inline-block bg-brand-crimson text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-crimson/90 transition-colors text-center"
                    >
                      Schedule Free Consultation
                    </a>
                    <a
                      href="tel:7043580470"
                      className="inline-block bg-white text-brand-charcoal px-8 py-3 rounded-lg font-semibold border-2 border-brand-charcoal hover:bg-gray-50 transition-colors text-center"
                    >
                      Call (704) 358-0470
                    </a>
                  </div>
                </div>

                {/* Related Articles */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-brand-charcoal mb-4">
                    Related Articles
                  </h3>
                  <div className="flex flex-col gap-2">
                    <a href="/blog" className="text-brand-skyblue hover:text-brand-crimson transition-colors">
                      → View All Blog Posts
                    </a>
                    <a href="/practice-areas/${category}" className="text-brand-skyblue hover:text-brand-crimson transition-colors">
                      → Learn More About ${category
                        .split('-')
                        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ')}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Author Bio */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-brand-charcoal mb-2">
                  About the Author
                </h3>
                <p className="text-gray-700">
                  The attorneys at Vasquez Law Firm, PLLC represent clients throughout North Carolina and Florida in 
                  ${
                    category === 'immigration'
                      ? 'immigration law, including deportation defense, family petitions, and business visas'
                      : category === 'personal-injury'
                        ? 'personal injury claims, including car accidents, slip and falls, and workplace injuries'
                        : category === 'criminal-defense'
                          ? 'criminal defense matters, including DUI, drug charges, and assault'
                          : category === 'workers-compensation'
                            ? "workers' compensation claims and workplace injury cases"
                            : 'various legal matters'
                  }. 
                  Contact us today for a free consultation.
                </p>
              </CardContent>
            </Card>
          </article>
        </div>
      </Section>
    </PageLayout>
  );
}`;

  // Write the page file
  const pagePath = path.join(pageDir, 'page.tsx');
  await fs.writeFile(pagePath, pageContent);

  console.log(`  ✅ Created: ${pagePath}`);

  // Save metadata for reference
  const metadataPath = path.join(pageDir, 'metadata.json');
  await fs.writeFile(metadataPath, JSON.stringify(blogData, null, 2));
}

async function importAllBlogs() {
  console.log('🚀 Starting comprehensive blog import...\n');
  console.log('='.repeat(60) + '\n');

  try {
    // Discover blog posts
    const blogUrls = await discoverBlogPosts();

    // Check existing pages
    const existingPaths = await checkExistingPages();

    // Filter out existing pages
    const urlsToImport = blogUrls.filter(url => {
      const urlPath = new URL(url).pathname;
      return !existingPaths.has(urlPath);
    });

    console.log(`\n📊 Import Summary:`);
    console.log(`   Total blog posts found: ${blogUrls.length}`);
    console.log(`   Already imported: ${blogUrls.length - urlsToImport.length}`);
    console.log(`   To be imported: ${urlsToImport.length}\n`);

    if (urlsToImport.length === 0) {
      console.log('✅ All blog posts are already imported!');
      return;
    }

    // Import each blog post
    const importResults = [];
    for (let i = 0; i < urlsToImport.length; i++) {
      const url = urlsToImport[i];
      console.log(`\n[${i + 1}/${urlsToImport.length}] Processing: ${url}`);

      const blogData = await importBlogPost(url, existingPaths);

      if (blogData) {
        await generateBlogPage(blogData);
        importResults.push({
          status: 'success',
          url: blogData.url,
          title: blogData.title,
          category: blogData.category,
        });
      } else {
        importResults.push({
          status: 'failed',
          url,
        });
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Save import report
    const reportPath = path.join(process.cwd(), 'blog-import-report.json');
    await fs.writeFile(
      reportPath,
      JSON.stringify(
        {
          importDate: new Date().toISOString(),
          totalFound: blogUrls.length,
          totalImported: importResults.filter(r => r.status === 'success').length,
          results: importResults,
        },
        null,
        2
      )
    );

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 Import Complete!');
    console.log(
      `   Successfully imported: ${importResults.filter(r => r.status === 'success').length}`
    );
    console.log(`   Failed: ${importResults.filter(r => r.status === 'failed').length}`);
    console.log(`\n📄 Report saved to: ${reportPath}`);

    // Category breakdown
    const categoryCount = {};
    importResults
      .filter(r => r.status === 'success')
      .forEach(r => {
        categoryCount[r.category] = (categoryCount[r.category] || 0) + 1;
      });

    console.log('\n📁 Imported by Category:');
    Object.entries(categoryCount).forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count}`);
    });
  } catch (error) {
    console.error('\n❌ Import failed:', error);
  }
}

// Run the import
importAllBlogs().catch(console.error);
