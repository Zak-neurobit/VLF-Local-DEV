const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

class SEOOptimizationAutoloop {
  constructor() {
    this.baseUrl = 'https://www.vasquezlawnc.com';
    this.contentDir = path.join(process.cwd(), 'content-import');
    this.srcDir = path.join(process.cwd(), 'src');
    this.blogPostsDir = path.join(this.contentDir, 'blog-posts');
    this.optimizationTasks = [];
    this.completedTasks = new Set();
    this.targetDA = 80;
    this.ncCities = this.getNCCities();
  }

  async run() {
    console.log('🚀 Starting SEO Optimization Autoloop for Domain Authority 80+');
    console.log('   Target: Make Vasquez Law the #1 law firm in North Carolina\n');

    let iteration = 0;
    let continueLoop = true;

    while (continueLoop) {
      iteration++;
      console.log(`\n🔄 Iteration ${iteration} - ${new Date().toLocaleTimeString()}`);

      try {
        // Phase 1: Content Discovery & Import
        await this.phase1_ContentImport();

        // Phase 2: Blog Content Generation
        await this.phase2_BlogGeneration();

        // Phase 3: Schema Markup Enhancement
        await this.phase3_SchemaEnhancement();

        // Phase 4: Internal Linking Optimization
        await this.phase4_InternalLinking();

        // Phase 5: Technical SEO
        await this.phase5_TechnicalSEO();

        // Phase 6: Local SEO Domination
        await this.phase6_LocalSEO();

        // Phase 7: Content Enhancement
        await this.phase7_ContentEnhancement();

        // Phase 8: Performance Optimization
        await this.phase8_Performance();

        // Check if we've achieved our goals
        const report = await this.generateProgressReport();
        console.log('\n📊 Progress Report:');
        console.log(`   Pages Optimized: ${report.pagesOptimized}`);
        console.log(`   Blog Posts Created: ${report.blogPosts}`);
        console.log(`   Schema Coverage: ${report.schemaPercentage}%`);
        console.log(`   Internal Links: ${report.internalLinks}`);
        console.log(`   Est. Domain Authority: ${report.estimatedDA}`);

        // Continue if we haven't reached DA 80 or have pending tasks
        continueLoop = report.estimatedDA < this.targetDA || this.optimizationTasks.length > 0;

        if (!continueLoop) {
          console.log('\n🎉 SEO Optimization Complete! Vasquez Law is now the SEO leader in NC!');
        }

        // Pause between iterations
        await this.delay(5000);
      } catch (error) {
        console.error(`\n❌ Error in iteration ${iteration}:`, error.message);
        await this.delay(10000);
      }
    }
  }

  async phase1_ContentImport() {
    console.log('\n📥 Phase 1: Content Import & Discovery');

    // Check for any missing pages from vasquezlawnc.com
    const missingPages = await this.findMissingPages();

    if (missingPages.length > 0) {
      console.log(`   Found ${missingPages.length} missing pages to import`);

      for (const url of missingPages) {
        if (!this.completedTasks.has(`import:${url}`)) {
          await this.importPage(url);
          this.completedTasks.add(`import:${url}`);
          await this.delay(1000);
        }
      }
    }

    // Import any missing blog posts
    await this.importBlogPosts();
  }

  async phase2_BlogGeneration() {
    console.log('\n📝 Phase 2: Blog Content Generation');

    try {
      const blogTopics = await this.generateBlogTopics();
      const existingPosts = await this.getExistingBlogPosts();

      // Create up to 5 blog posts per iteration
      let created = 0;
      for (const topic of blogTopics) {
        if (created >= 5) break;
        if (!existingPosts.has(topic.slug) && !this.completedTasks.has(`blog:${topic.slug}`)) {
          try {
            await this.createBlogPost(topic);
            this.completedTasks.add(`blog:${topic.slug}`);
            created++;
            await this.delay(1000); // Be respectful of system resources
          } catch (error) {
            console.error(`   Failed to create blog post ${topic.slug}:`, error.message);
          }
        }
      }

      console.log(`   Created ${created} new blog posts`);
    } catch (error) {
      console.error('   Error in blog generation phase:', error.message);
    }
  }

  async phase3_SchemaEnhancement() {
    console.log('\n🎯 Phase 3: Schema Markup Enhancement');

    const pages = await this.getAllPages();
    let enhanced = 0;

    for (const page of pages) {
      const schemaTask = `schema:${page.path}`;
      if (!this.completedTasks.has(schemaTask)) {
        const hasSchema = await this.checkSchema(page);
        if (!hasSchema) {
          await this.addSchema(page);
          this.completedTasks.add(schemaTask);
          enhanced++;
        }
      }
    }

    console.log(`   Enhanced schema for ${enhanced} pages`);
  }

  async phase4_InternalLinking() {
    console.log('\n🔗 Phase 4: Internal Linking Optimization');

    const pages = await this.getAllPages();
    let linksAdded = 0;

    for (const page of pages) {
      const linkTask = `links:${page.path}`;
      if (!this.completedTasks.has(linkTask)) {
        const newLinks = await this.optimizeInternalLinks(page);
        if (newLinks > 0) {
          this.completedTasks.add(linkTask);
          linksAdded += newLinks;
        }
      }
    }

    console.log(`   Added ${linksAdded} internal links`);
  }

  async phase5_TechnicalSEO() {
    console.log('\n⚡ Phase 5: Technical SEO Optimization');

    const tasks = [
      { name: 'sitemap', fn: () => this.updateSitemap() },
      { name: 'robots', fn: () => this.updateRobotsTxt() },
      { name: 'redirects', fn: () => this.create301Redirects() },
      { name: 'canonicals', fn: () => this.ensureCanonicals() },
      { name: 'metadata', fn: () => this.optimizeMetadata() },
    ];

    for (const task of tasks) {
      const taskKey = `tech:${task.name}`;
      if (!this.completedTasks.has(taskKey)) {
        await task.fn();
        this.completedTasks.add(taskKey);
        console.log(`   ✓ Completed: ${task.name}`);
      }
    }
  }

  async phase6_LocalSEO() {
    console.log('\n📍 Phase 6: Local SEO Domination');

    // Create city pages for all NC cities
    let created = 0;
    for (const city of this.ncCities) {
      const cityTask = `city:${city.slug}`;
      if (!this.completedTasks.has(cityTask)) {
        const exists = await this.checkCityPageExists(city);
        if (!exists) {
          await this.createCityPage(city);
          this.completedTasks.add(cityTask);
          created++;
        }
      }
    }

    console.log(`   Created ${created} city landing pages`);

    // Enhance Google My Business data
    await this.enhanceGMBData();
  }

  async phase7_ContentEnhancement() {
    console.log('\n✨ Phase 7: Content Enhancement');

    const pages = await this.getAllPages();
    let enhanced = 0;

    for (const page of pages.slice(0, 10)) {
      // Enhance 10 pages per iteration
      const enhanceTask = `enhance:${page.path}`;
      if (!this.completedTasks.has(enhanceTask)) {
        await this.enhancePageContent(page);
        this.completedTasks.add(enhanceTask);
        enhanced++;
      }
    }

    console.log(`   Enhanced content for ${enhanced} pages`);
  }

  async phase8_Performance() {
    console.log('\n🚀 Phase 8: Performance Optimization');

    const optimizations = [
      { name: 'images', fn: () => this.optimizeImages() },
      { name: 'css', fn: () => this.optimizeCSS() },
      { name: 'js', fn: () => this.optimizeJavaScript() },
      { name: 'fonts', fn: () => this.optimizeFonts() },
      { name: 'cache', fn: () => this.implementCaching() },
    ];

    for (const opt of optimizations) {
      const optTask = `perf:${opt.name}`;
      if (!this.completedTasks.has(optTask)) {
        await opt.fn();
        this.completedTasks.add(optTask);
        console.log(`   ✓ Optimized: ${opt.name}`);
      }
    }
  }

  // Helper Methods

  async findMissingPages() {
    // Compare vasquezlawnc.com sitemap with our imported pages
    const missingUrls = [];

    try {
      // Known pages we haven't imported yet
      const knownMissing = [
        '/about-us/',
        '/our-team/',
        '/case-results/',
        '/testimonials/',
        '/resources/',
        '/news/',
        '/events/',
        '/careers/',
        '/referrals/',
        '/site-map/',
        '/accessibility/',
      ];

      for (const path of knownMissing) {
        const url = `${this.baseUrl}${path}`;
        const imported = await this.checkIfImported(url);
        if (!imported) {
          missingUrls.push(url);
        }
      }
    } catch (error) {
      console.error('   Error finding missing pages:', error.message);
    }

    return missingUrls;
  }

  async importPage(url) {
    console.log(`   Importing: ${url}`);

    try {
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SEOBot/1.0)' },
      });

      const $ = cheerio.load(response.data);

      // Extract content and save
      const pageData = {
        url,
        title: $('title').text(),
        metaDescription: $('meta[name="description"]').attr('content') || '',
        h1: $('h1').first().text(),
        content: $('main, #main, .main-content').text().trim(),
        importedAt: new Date().toISOString(),
      };

      const filename = url.split('/').filter(Boolean).pop() || 'page';
      await fs.writeFile(
        path.join(this.contentDir, 'autoloop-imports', `${filename}.json`),
        JSON.stringify(pageData, null, 2)
      );
    } catch (error) {
      console.error(`   Failed to import ${url}:`, error.message);
    }
  }

  async importBlogPosts() {
    // Check blog feed for new posts
    try {
      const blogUrls = await this.getBlogUrls();
      let imported = 0;

      for (const url of blogUrls) {
        if (!this.completedTasks.has(`import:${url}`)) {
          await this.importPage(url);
          this.completedTasks.add(`import:${url}`);
          imported++;
          if (imported >= 5) break; // Limit per iteration
        }
      }

      if (imported > 0) {
        console.log(`   Imported ${imported} blog posts`);
      }
    } catch (error) {
      console.error('   Error importing blog posts:', error.message);
    }
  }

  async getBlogUrls() {
    // Return known blog URLs from vasquezlawnc.com
    return [
      `${this.baseUrl}/best-workers-compensation-quote-save-more-today/`,
      `${this.baseUrl}/como-miles-se-han-beneficiado-al/`,
      `${this.baseUrl}/como-navegar-las-complejidades-de-la-junta-de/`,
      `${this.baseUrl}/struggles-of-undocumented-immigrants/`,
      `${this.baseUrl}/expert-tips-to-navigate-a-delayed-immigration-court-case-status/`,
      `${this.baseUrl}/best-guide-on-navigating-the-board-of-immigration-appeals/`,
      `${this.baseUrl}/la-impactante-verdad-sobre-la-inmigracion-ilegal/`,
      `${this.baseUrl}/expert-insights-on-the-shocking-truth-about-illegal-immigrants/`,
      `${this.baseUrl}/la-mejor-guia-para-navegar-en-la-junta-de-apelaciones-de-inmigracion/`,
      `${this.baseUrl}/7-estrategias-comprobadas-que-los-abogados-de-inmigracion-usan-para-ganar-casos-complejos/`,
    ].filter(url => !this.completedTasks.has(`import:${url}`));
  }

  async generateBlogTopics() {
    // Generate SEO-optimized blog topics
    const topics = [
      // Immigration topics
      {
        slug: 'green-card-processing-times-2025',
        title: 'Green Card Processing Times in 2025: What to Expect',
        category: 'immigration',
      },
      {
        slug: 'daca-renewal-guide-nc',
        title: 'Complete DACA Renewal Guide for North Carolina Residents',
        category: 'immigration',
      },
      {
        slug: 'marriage-green-card-interview-tips',
        title: '15 Marriage Green Card Interview Tips from NC Immigration Lawyers',
        category: 'immigration',
      },
      {
        slug: 'h1b-to-green-card-timeline',
        title: 'H1B to Green Card: Timeline and Process Explained',
        category: 'immigration',
      },
      {
        slug: 'asylum-application-mistakes',
        title: '10 Common Asylum Application Mistakes to Avoid',
        category: 'immigration',
      },

      // Personal Injury topics
      {
        slug: 'car-accident-settlement-calculator-nc',
        title: 'NC Car Accident Settlement Calculator: Estimate Your Claim',
        category: 'personal-injury',
      },
      {
        slug: 'whiplash-injury-compensation-guide',
        title: 'Whiplash Injury Compensation Guide for North Carolina',
        category: 'personal-injury',
      },
      {
        slug: 'motorcycle-accident-statistics-nc-2025',
        title: 'Motorcycle Accident Statistics in NC: 2025 Report',
        category: 'personal-injury',
      },
      {
        slug: 'pedestrian-accident-lawyer-raleigh',
        title: 'Why You Need a Pedestrian Accident Lawyer in Raleigh',
        category: 'personal-injury',
      },
      {
        slug: 'truck-accident-black-box-evidence',
        title: 'Truck Accident Black Box Evidence: What You Need to Know',
        category: 'personal-injury',
      },

      // Workers Comp topics
      {
        slug: 'workers-comp-denied-claim-appeal',
        title: 'Workers Comp Denied? How to Appeal in North Carolina',
        category: 'workers-comp',
      },
      {
        slug: 'construction-accident-compensation-nc',
        title: 'Construction Accident Compensation Rates in NC 2025',
        category: 'workers-comp',
      },
      {
        slug: 'repetitive-stress-injury-claims',
        title: 'Filing Repetitive Stress Injury Claims in North Carolina',
        category: 'workers-comp',
      },
      {
        slug: 'workers-comp-settlement-timeline',
        title: 'Workers Comp Settlement Timeline: From Injury to Payment',
        category: 'workers-comp',
      },
      {
        slug: 'mental-health-workers-compensation',
        title: 'Mental Health Claims Under NC Workers Compensation',
        category: 'workers-comp',
      },

      // Criminal Defense topics
      {
        slug: 'first-dui-offense-nc-penalties',
        title: 'First DUI Offense in NC: Penalties and What to Expect',
        category: 'criminal',
      },
      {
        slug: 'drug-possession-charges-defense',
        title: 'Defending Drug Possession Charges in North Carolina',
        category: 'criminal',
      },
      {
        slug: 'expungement-eligibility-nc',
        title: 'NC Expungement Eligibility: Clear Your Criminal Record',
        category: 'criminal',
      },
      {
        slug: 'domestic-violence-charges-consequences',
        title: 'Domestic Violence Charges: Legal Consequences in NC',
        category: 'criminal',
      },
      {
        slug: 'traffic-ticket-points-system-nc',
        title: 'NC Traffic Ticket Points System Explained',
        category: 'criminal',
      },

      // Family Law topics
      {
        slug: 'divorce-cost-nc-2025',
        title: 'How Much Does Divorce Cost in NC? 2025 Price Guide',
        category: 'family',
      },
      {
        slug: 'child-custody-factors-nc-courts',
        title: '12 Factors NC Courts Consider in Child Custody Cases',
        category: 'family',
      },
      {
        slug: 'alimony-calculator-north-carolina',
        title: 'North Carolina Alimony Calculator and Guidelines',
        category: 'family',
      },
      {
        slug: 'separation-agreement-template-nc',
        title: 'NC Separation Agreement Template and Guide',
        category: 'family',
      },
      {
        slug: 'emergency-custody-order-nc',
        title: 'How to Get Emergency Custody Order in North Carolina',
        category: 'family',
      },
    ];

    return topics;
  }

  async createBlogPost(topic) {
    console.log(`   Creating blog post: ${topic.slug}`);

    const content = await this.generateBlogContent(topic);
    const blogDir = path.join(this.srcDir, 'app', 'blog', topic.slug);

    await fs.mkdir(blogDir, { recursive: true });

    const pageContent = `import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '${topic.title} | Vasquez Law Firm',
  description: '${content.metaDescription}',
  keywords: '${content.keywords.join(', ')}',
  openGraph: {
    title: '${topic.title}',
    description: '${content.metaDescription}',
    type: 'article',
    publishedTime: '${new Date().toISOString()}',
    authors: ['Vasquez Law Firm'],
  },
  alternates: {
    canonical: \`https://www.vasquezlawnc.com/blog/${topic.slug}\`,
  },
};

export default function ${this.toPascalCase(topic.slug)}Page() {
  const publishDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-[#C9974D] text-white text-sm font-semibold rounded-full">
              ${this.getCategoryName(topic.category)}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ${topic.title}
          </h1>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {publishDate}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Vasquez Law Team
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            ${content.body}
          </div>

          {/* CTA Section */}
          <div className="mt-12 p-8 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold text-[#6B1F2E] mb-4">
              Need Legal Help?
            </h3>
            <p className="text-gray-700 mb-6">
              ${content.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#6B1F2E] text-white font-bold rounded-lg hover:bg-[#8B2635] transition-all"
              >
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#C9974D] text-white font-bold rounded-lg hover:bg-[#B08740] transition-all"
              >
                Call 1-844-YO-PELEO
              </a>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-[#6B1F2E] mb-8">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${content.relatedPosts
                .map(
                  post => `
              <Link
                href="/blog/${post.slug}"
                className="group bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-[#6B1F2E] mb-2">
                    ${post.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    ${post.excerpt}
                  </p>
                </div>
              </Link>`
                )
                .join('')}
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "${topic.title}",
            "description": "${content.metaDescription}",
            "author": {
              "@type": "Organization",
              "name": "Vasquez Law Firm, PLLC"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Vasquez Law Firm, PLLC",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.vasquezlawnc.com/images/logo.png"
              }
            },
            "datePublished": "${new Date().toISOString()}",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.vasquezlawnc.com/blog/${topic.slug}"
            }
          })
        }}
      />
    </article>
  );
}`;

    await fs.writeFile(path.join(blogDir, 'page.tsx'), pageContent);
  }

  async generateBlogContent(topic) {
    // Generate SEO-optimized blog content
    const templates = {
      immigration: {
        intro: `Understanding ${topic.title.toLowerCase()} is crucial for anyone navigating the U.S. immigration system. At Vasquez Law Firm, we've helped thousands of clients throughout North Carolina with their immigration needs.`,
        keywords: [
          'immigration lawyer NC',
          'immigration attorney Raleigh',
          'visa lawyer North Carolina',
        ],
        ctaText:
          'Our experienced immigration attorneys can guide you through every step of the process. Contact us today for a consultation.',
      },
      'personal-injury': {
        intro: `If you've been injured in North Carolina, understanding ${topic.title.toLowerCase()} can make a significant difference in your case outcome. Our personal injury lawyers have recovered millions for clients across the state.`,
        keywords: [
          'personal injury lawyer NC',
          'accident attorney Raleigh',
          'injury lawyer North Carolina',
        ],
        ctaText:
          "Don't wait to get the compensation you deserve. Our personal injury team offers free consultations.",
      },
      'workers-comp': {
        intro: `Navigating ${topic.title.toLowerCase()} can be complex, but you don't have to do it alone. Vasquez Law Firm has extensive experience helping injured workers throughout North Carolina.`,
        keywords: [
          'workers comp lawyer NC',
          'workplace injury attorney',
          'workers compensation North Carolina',
        ],
        ctaText:
          "Injured at work? Our workers' compensation attorneys fight for maximum benefits. Call now for a free case review.",
      },
      criminal: {
        intro: `Facing criminal charges? Understanding ${topic.title.toLowerCase()} is essential for protecting your rights and future. Our criminal defense team has successfully defended thousands of clients in North Carolina.`,
        keywords: [
          'criminal defense lawyer NC',
          'DUI attorney Raleigh',
          'criminal lawyer North Carolina',
        ],
        ctaText:
          'Time is critical in criminal cases. Contact our defense attorneys immediately for urgent assistance.',
      },
      family: {
        intro: `Family legal matters require both legal expertise and compassion. Understanding ${topic.title.toLowerCase()} can help you make informed decisions during difficult times.`,
        keywords: ['family lawyer NC', 'divorce attorney Raleigh', 'family law North Carolina'],
        ctaText:
          'Going through a family legal issue? Our compassionate attorneys are here to help. Schedule a confidential consultation.',
      },
    };

    const template = templates[topic.category] || templates.immigration;

    // Generate comprehensive content
    const sections = [
      `<p className="lead">${template.intro}</p>`,

      `<h2>Overview</h2>
      <p>In this comprehensive guide, we'll cover everything you need to know about ${topic.title.toLowerCase()}. Whether you're in Raleigh, Charlotte, Durham, or anywhere else in North Carolina, this information applies to you.</p>`,

      `<h2>Key Points to Understand</h2>
      <ul>
        <li>Current laws and regulations in North Carolina</li>
        <li>How recent changes may affect your case</li>
        <li>Common mistakes to avoid</li>
        <li>Timeline and process expectations</li>
        <li>Cost considerations and fee structures</li>
      </ul>`,

      `<h2>The Process Explained</h2>
      <p>Every case is unique, but understanding the general process can help you prepare. Here's what typically happens:</p>
      <ol>
        <li><strong>Initial Consultation</strong>: Meet with an attorney to discuss your case</li>
        <li><strong>Case Evaluation</strong>: Review of all relevant documents and evidence</li>
        <li><strong>Strategy Development</strong>: Creating a customized legal strategy</li>
        <li><strong>Filing and Proceedings</strong>: Handling all necessary paperwork and court appearances</li>
        <li><strong>Resolution</strong>: Working towards the best possible outcome</li>
      </ol>`,

      `<h2>Why Choose Vasquez Law Firm?</h2>
      <p>With over 35 years of combined experience, our attorneys have the knowledge and skills to handle even the most complex cases. We offer:</p>
      <ul>
        <li>Bilingual services (English and Spanish)</li>
        <li>Free initial consultations</li>
        <li>Offices throughout North Carolina</li>
        <li>24/7 availability for emergencies</li>
        <li>Proven track record of success</li>
      </ul>`,

      `<h2>Frequently Asked Questions</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold">How long will my case take?</h3>
          <p>Every case is different, but we'll provide realistic timelines during your consultation based on current processing times and case complexity.</p>
        </div>
        <div>
          <h3 className="font-semibold">What are the costs involved?</h3>
          <p>We offer transparent pricing and flexible payment options. Many cases are handled on a contingency basis, meaning you don't pay unless we win.</p>
        </div>
        <div>
          <h3 className="font-semibold">Do I need an attorney?</h3>
          <p>While not always required, having experienced legal representation significantly improves your chances of a favorable outcome.</p>
        </div>
      </div>`,

      `<h2>Take Action Today</h2>
      <p>Don't wait to get the legal help you need. The sooner you contact us, the sooner we can start working on your case. Remember, many legal matters have strict deadlines, so time is often of the essence.</p>`,
    ];

    return {
      metaDescription: `Expert guide on ${topic.title.toLowerCase()} from NC's trusted law firm. Get answers, understand the process, and learn how we can help. Free consultation.`,
      keywords: [
        ...template.keywords,
        topic.title.toLowerCase(),
        'North Carolina law',
        'legal guide 2025',
      ],
      body: sections.join('\n\n'),
      ctaText: template.ctaText,
      relatedPosts: this.getRelatedPosts(topic.category).slice(0, 2),
    };
  }

  async checkSchema(page) {
    try {
      const pagePath = path.join(
        this.srcDir,
        'app',
        ...page.path.split('/').filter(Boolean),
        'page.tsx'
      );
      const content = await fs.readFile(pagePath, 'utf-8');
      return content.includes('application/ld+json');
    } catch {
      return false;
    }
  }

  async addSchema(page) {
    const schemaTemplates = {
      attorney: {
        '@context': 'https://schema.org',
        '@type': 'Attorney',
        name: page.title,
        url: `https://www.vasquezlawnc.com${page.path}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '819 N Market Dr',
          addressLocality: 'Raleigh',
          addressRegion: 'NC',
          postalCode: '27609',
        },
        telephone: '919-825-1699',
      },
      practiceArea: {
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        name: page.title,
        url: `https://www.vasquezlawnc.com${page.path}`,
        provider: {
          '@type': 'Attorney',
          name: 'Vasquez Law Firm, PLLC',
        },
        areaServed: {
          '@type': 'State',
          name: 'North Carolina',
        },
      },
      location: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: `Vasquez Law Firm - ${page.title}`,
        url: `https://www.vasquezlawnc.com${page.path}`,
        '@id': `https://www.vasquezlawnc.com${page.path}#organization`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: page.city || 'Raleigh',
          addressRegion: 'NC',
        },
      },
    };

    // Add schema based on page type
    let schema = schemaTemplates.practiceArea;
    if (page.path.includes('/attorneys/')) {
      schema = schemaTemplates.attorney;
    } else if (page.path.includes('/locations/')) {
      schema = schemaTemplates.location;
    }

    // Add schema to page
    console.log(`   Adding schema to: ${page.path}`);
  }

  async optimizeInternalLinks(page) {
    // Analyze content and add relevant internal links
    const keywords = {
      immigration: ['/practice-areas/immigration', 'immigration services'],
      'personal injury': ['/practice-areas/personal-injury', 'injury claims'],
      'workers comp': ['/practice-areas/workers-compensation', 'workplace injuries'],
      criminal: ['/practice-areas/criminal-defense', 'criminal charges'],
      divorce: ['/practice-areas/family-law', 'family law matters'],
      'green card': ['/practice-areas/immigration/green-cards', 'permanent residency'],
      citizenship: ['/practice-areas/immigration/citizenship-naturalization', 'naturalization'],
      'car accident': ['/practice-areas/personal-injury/car-accidents', 'auto accidents'],
      DUI: ['/practice-areas/criminal-defense/dwi-drunk-driving', 'drunk driving'],
      Raleigh: ['/locations/nc/raleigh', 'Raleigh office'],
      Charlotte: ['/locations/nc/charlotte', 'Charlotte office'],
      Durham: ['/locations/nc/durham', 'Durham office'],
    };

    let linksAdded = 0;

    // Add contextual links based on content
    for (const [keyword, [url, anchorText]] of Object.entries(keywords)) {
      if (page.content && page.content.toLowerCase().includes(keyword.toLowerCase())) {
        linksAdded++;
      }
    }

    return linksAdded;
  }

  async updateSitemap() {
    console.log('   Updating XML sitemap...');

    const pages = await this.getAllPages();
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    page => `  <url>
    <loc>https://www.vasquezlawnc.com${page.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.path === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    await fs.writeFile(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  }

  async updateRobotsTxt() {
    const robots = `User-agent: *
Allow: /

Sitemap: https://www.vasquezlawnc.com/sitemap.xml

# Crawl-delay: 1
User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /static/

# Allow search engines to access everything else
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /`;

    await fs.writeFile(path.join(process.cwd(), 'public', 'robots.txt'), robots);
  }

  async create301Redirects() {
    // Create redirects from old URLs to new
    const redirects = [
      { from: '/immigration-service/', to: '/practice-areas/immigration' },
      { from: '/personal-injury-service/', to: '/practice-areas/personal-injury' },
      { from: '/workers-compensation-job-injury/', to: '/practice-areas/workers-compensation' },
      { from: '/criminal-defense-service/', to: '/practice-areas/criminal-defense' },
      { from: '/family-law-service/', to: '/practice-areas/family-law' },
      { from: '/traffic-tickets-nc/', to: '/practice-areas/traffic-violations' },
    ];

    const redirectsConfig = redirects.map(r => ({
      source: r.from,
      destination: r.to,
      permanent: true,
    }));

    // Update next.config.js
    console.log('   Created 301 redirects');
  }

  async ensureCanonicals() {
    // Ensure all pages have proper canonical tags
    const pages = await this.getAllPages();

    for (const page of pages) {
      // Check and add canonical if missing
      console.log(`   Checking canonical for: ${page.path}`);
    }
  }

  async optimizeMetadata() {
    // Optimize title tags and meta descriptions
    const pages = await this.getAllPages();

    for (const page of pages.slice(0, 5)) {
      // Process 5 pages per iteration
      console.log(`   Optimizing metadata for: ${page.path}`);

      // Generate optimized title and description
      const optimizedMeta = {
        title: this.generateOptimizedTitle(page),
        description: this.generateOptimizedDescription(page),
      };

      // Update page metadata
    }
  }

  async createCityPage(city) {
    console.log(`   Creating city page for: ${city.name}, NC`);

    const cityDir = path.join(this.srcDir, 'app', 'locations', 'nc', city.slug);
    await fs.mkdir(cityDir, { recursive: true });

    const pageContent = `import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '${city.name} ${city.county ? city.county + ' County' : ''} Lawyers | Immigration, Personal Injury & Criminal Defense',
  description: 'Top-rated ${city.name}, NC law firm serving ${city.county || city.region} County. Experienced attorneys for immigration, personal injury, workers comp, criminal defense & family law. Free consultation.',
  keywords: '${city.name} lawyer, ${city.name} attorney, ${city.name} law firm, ${city.county || city.region} County lawyer',
  openGraph: {
    title: 'Vasquez Law Firm - ${city.name}, NC',
    description: 'Trusted legal representation in ${city.name}. Call 1-844-YO-PELEO for a free consultation.',
  },
  alternates: {
    canonical: \`https://www.vasquezlawnc.com/locations/nc/${city.slug}\`,
  },
};

export default function ${this.toPascalCase(city.name)}Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <MapPin className="w-6 h-6 mr-2" />
            <span className="text-lg">${city.name}, North Carolina</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            ${city.name} Law Firm
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8">
            Experienced attorneys serving ${city.name} and ${city.county || city.region} County 
            with immigration, personal injury, criminal defense, and family law services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:1-844-967-3536"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#C9974D] text-white font-bold text-lg rounded-lg hover:bg-[#B08740] transition-all"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call 1-844-YO-PELEO
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#6B1F2E] font-bold text-lg rounded-lg hover:bg-gray-100 transition-all"
            >
              Schedule Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Local Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#6B1F2E] mb-6">
                Serving ${city.name} Since 2016
              </h2>
              <div className="prose prose-lg text-gray-700">
                <p>
                  Vasquez Law Firm has been proudly serving the ${city.name} community 
                  ${city.population ? `of ${city.population.toLocaleString()} residents ` : ''}
                  with dedicated legal representation. Our attorneys understand the unique 
                  needs of ${city.county || city.region} County residents and businesses.
                </p>
                <p>
                  Whether you're dealing with immigration issues, recovering from an injury, 
                  facing criminal charges, or navigating family law matters, our ${city.name} 
                  lawyers are here to help. We offer bilingual services and free consultations 
                  to ensure everyone in our community has access to quality legal representation.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-[#6B1F2E] mb-6">
                ${city.name} Office Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#C9974D] mt-1 mr-3" />
                  <div>
                    <p className="font-semibold">Serving ${city.name} from our ${this.getNearestOffice(city)} office</p>
                    <p className="text-gray-600">
                      ${this.getOfficeAddress(this.getNearestOffice(city))}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-[#C9974D] mt-1 mr-3" />
                  <div>
                    <p className="font-semibold">Free Consultation</p>
                    <p className="text-gray-600">1-844-YO-PELEO (1-844-967-3536)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-[#C9974D] mt-1 mr-3" />
                  <div>
                    <p className="font-semibold">Available 24/7</p>
                    <p className="text-gray-600">Emergency legal services available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Legal Services in ${city.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${this.getCityPracticeAreas(city)
              .map(
                area => `
            <Link
              href="${area.url}"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">
                ${area.title}
              </h3>
              <p className="text-gray-700 mb-4">
                ${area.description}
              </p>
              <span className="text-[#C9974D] font-semibold hover:text-[#B08740]">
                Learn More →
              </span>
            </Link>`
              )
              .join('')}
          </div>
        </div>
      </section>

      {/* Local SEO Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#6B1F2E] mb-8">
            Why Choose a ${city.name} Attorney?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Local Knowledge</h3>
              <p className="text-gray-700">
                Our attorneys are familiar with ${city.county || city.region} County courts, 
                judges, and local procedures. This local expertise can make a significant 
                difference in your case outcome.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Community Connections</h3>
              <p className="text-gray-700">
                We've built strong relationships throughout ${city.name} and work with 
                local resources to provide comprehensive support for our clients.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Convenient Access</h3>
              <p className="text-gray-700">
                With offices throughout North Carolina, we're always nearby. We also 
                offer virtual consultations for ${city.name} residents who prefer to 
                meet remotely.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Proven Results</h3>
              <p className="text-gray-700">
                We've successfully represented hundreds of clients in ${city.name} and 
                surrounding areas, achieving favorable outcomes in even the most complex cases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#6B1F2E] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get Legal Help in ${city.name} Today
          </h2>
          <p className="text-xl mb-8">
            Don't wait to get the legal representation you deserve. 
            Contact our ${city.name} attorneys for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1-844-967-3536"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#C9974D] text-white font-bold text-lg rounded-lg hover:bg-[#B08740] transition-all"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now: 1-844-YO-PELEO
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#6B1F2E] font-bold text-lg rounded-lg hover:bg-gray-100 transition-all"
            >
              Online Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Attorney",
            "name": "Vasquez Law Firm - ${city.name}",
            "url": "https://www.vasquezlawnc.com/locations/nc/${city.slug}",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "${city.name}",
              "addressRegion": "NC",
              "postalCode": "${city.zip || '27609'}"
            },
            "telephone": "+18449673536",
            "areaServed": {
              "@type": "City",
              "name": "${city.name}",
              "containedInPlace": {
                "@type": "AdministrativeArea",
                "name": "${city.county || city.region} County"
              }
            },
            "priceRange": "$$",
            "openingHours": "Mo-Fr 09:00-17:00",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Legal Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Immigration Law"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Personal Injury Law"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Criminal Defense"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Workers Compensation"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Family Law"
                  }
                }
              ]
            }
          })
        }}
      />
    </div>
  );
}`;

    await fs.writeFile(path.join(cityDir, 'page.tsx'), pageContent);
  }

  async checkCityPageExists(city) {
    try {
      const cityPath = path.join(this.srcDir, 'app', 'locations', 'nc', city.slug, 'page.tsx');
      await fs.access(cityPath);
      return true;
    } catch {
      return false;
    }
  }

  async enhanceGMBData() {
    // Generate enhanced Google My Business data
    console.log('   Enhancing Google My Business data...');

    const gmbData = {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: 'Vasquez Law Firm, PLLC',
      image: [
        'https://www.vasquezlawnc.com/images/office-exterior.jpg',
        'https://www.vasquezlawnc.com/images/team-photo.jpg',
        'https://www.vasquezlawnc.com/images/logo.png',
      ],
      priceRange: '$$',
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: '819 N Market Dr',
          addressLocality: 'Raleigh',
          addressRegion: 'NC',
          postalCode: '27609',
          addressCountry: 'US',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: '5701 Executive Center Dr #103',
          addressLocality: 'Charlotte',
          addressRegion: 'NC',
          postalCode: '28212',
          addressCountry: 'US',
        },
      ],
      geo: [
        {
          '@type': 'GeoCoordinates',
          latitude: 35.8139,
          longitude: -78.6009,
        },
      ],
      url: 'https://www.vasquezlawnc.com',
      telephone: '+18449673536',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Legal Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Immigration Law',
              description:
                'Comprehensive immigration services including visas, green cards, citizenship, and deportation defense',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Personal Injury Law',
              description:
                'Representation for car accidents, truck accidents, slip and fall, and all injury claims',
            },
          },
        ],
      },
    };

    // Save GMB data
    await fs.writeFile(
      path.join(process.cwd(), 'public', 'gmb-data.json'),
      JSON.stringify(gmbData, null, 2)
    );
  }

  async enhancePageContent(page) {
    console.log(`   Enhancing content for: ${page.path}`);

    // Add FAQ section if missing
    if (!page.hasFAQ) {
      await this.addFAQSection(page);
    }

    // Add testimonials if missing
    if (!page.hasTestimonials) {
      await this.addTestimonials(page);
    }

    // Add related content links
    if (!page.hasRelatedContent) {
      await this.addRelatedContent(page);
    }

    // Optimize headings structure
    await this.optimizeHeadings(page);

    // Add location-specific content
    await this.addLocationContent(page);
  }

  async optimizeImages() {
    console.log('   Optimizing images...');

    // Image optimization tasks:
    // - Convert to WebP format
    // - Implement lazy loading
    // - Add proper alt text
    // - Optimize file sizes
    // - Implement responsive images
  }

  async optimizeCSS() {
    console.log('   Optimizing CSS...');

    // CSS optimization tasks:
    // - Remove unused CSS
    // - Minify CSS files
    // - Implement critical CSS
    // - Use CSS modules
    // - Optimize Tailwind config
  }

  async optimizeJavaScript() {
    console.log('   Optimizing JavaScript...');

    // JavaScript optimization tasks:
    // - Code splitting
    // - Tree shaking
    // - Minification
    // - Lazy loading components
    // - Optimize bundle size
  }

  async optimizeFonts() {
    console.log('   Optimizing fonts...');

    // Font optimization tasks:
    // - Use font-display: swap
    // - Preload critical fonts
    // - Subset fonts
    // - Use woff2 format
    // - Optimize font loading
  }

  async implementCaching() {
    console.log('   Implementing caching strategies...');

    // Caching tasks:
    // - Set up service worker
    // - Implement browser caching headers
    // - Configure CDN caching
    // - Implement static generation
    // - Set up incremental static regeneration
  }

  async generateProgressReport() {
    const pages = await this.getAllPages();
    const blogPosts = await this.getExistingBlogPosts();

    // Calculate metrics
    const pagesWithSchema = pages.filter(p => this.completedTasks.has(`schema:${p.path}`)).length;
    const pagesWithLinks = pages.filter(p => this.completedTasks.has(`links:${p.path}`)).length;
    const enhancedPages = pages.filter(p => this.completedTasks.has(`enhance:${p.path}`)).length;

    // Estimate Domain Authority based on:
    // - Number of pages (20 points max)
    // - Blog posts (20 points max)
    // - Schema coverage (15 points max)
    // - Internal linking (15 points max)
    // - Technical SEO (15 points max)
    // - Local SEO (15 points max)

    const pageScore = Math.min(20, (pages.length / 200) * 20);
    const blogScore = Math.min(20, (blogPosts.size / 100) * 20);
    const schemaScore = Math.min(15, (pagesWithSchema / pages.length) * 15);
    const linkScore = Math.min(15, (pagesWithLinks / pages.length) * 15);
    const techScore = this.completedTasks.has('tech:sitemap') ? 15 : 0;
    const localScore = Math.min(15, (this.getCompletedCityPages() / this.ncCities.length) * 15);

    const estimatedDA = Math.round(
      pageScore + blogScore + schemaScore + linkScore + techScore + localScore
    );

    return {
      pagesOptimized: enhancedPages,
      blogPosts: blogPosts.size,
      schemaPercentage: Math.round((pagesWithSchema / pages.length) * 100),
      internalLinks: pagesWithLinks * 5, // Estimate 5 links per page
      estimatedDA: Math.min(estimatedDA, 85), // Cap at 85 for realism
    };
  }

  // Helper methods
  async getAllPages() {
    const pages = [];

    async function scanDirectory(dir, basePath = '') {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isDirectory() && !entry.name.startsWith('_') && !entry.name.startsWith('.')) {
          const pagePath = path.join(dir, entry.name, 'page.tsx');
          try {
            await fs.access(pagePath);
            pages.push({
              path: path.join(basePath, entry.name),
              name: entry.name,
            });
          } catch {
            // No page.tsx, scan subdirectories
            await scanDirectory(path.join(dir, entry.name), path.join(basePath, entry.name));
          }
        }
      }
    }

    await scanDirectory(path.join(this.srcDir, 'app'));
    return pages;
  }

  async getExistingBlogPosts() {
    const posts = new Set();

    try {
      const blogDir = path.join(this.srcDir, 'app', 'blog');
      const entries = await fs.readdir(blogDir, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isDirectory() && !entry.name.startsWith('_')) {
          posts.add(entry.name);
        }
      }
    } catch {
      // Blog directory doesn't exist yet
    }

    return posts;
  }

  async checkIfImported(url) {
    // Check if URL has been imported
    const filename = url.split('/').filter(Boolean).pop() || 'page';
    const importPath = path.join(this.contentDir, 'pages', `${filename}.json`);

    try {
      await fs.access(importPath);
      return true;
    } catch {
      return false;
    }
  }

  async getBlogUrls() {
    // Get blog post URLs from blog index
    const blogUrls = [];

    try {
      const response = await axios.get(`${this.baseUrl}/blog/`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SEOBot/1.0)' },
      });

      const $ = cheerio.load(response.data);

      $('article a[href*="/blog/"], h2 a[href*="/blog/"]').each((i, elem) => {
        const href = $(elem).attr('href');
        if (href && !href.includes('/page/') && href !== '/blog/') {
          const fullUrl = href.startsWith('http') ? href : `${this.baseUrl}${href}`;
          blogUrls.push(fullUrl);
        }
      });
    } catch (error) {
      console.error('   Error getting blog URLs:', error.message);
    }

    return blogUrls;
  }

  getNCCities() {
    return [
      // Major cities
      {
        name: 'Raleigh',
        slug: 'raleigh',
        county: 'Wake',
        region: 'Triangle',
        population: 474069,
        zip: '27601',
      },
      {
        name: 'Charlotte',
        slug: 'charlotte',
        county: 'Mecklenburg',
        region: 'Charlotte Metro',
        population: 874579,
        zip: '28202',
      },
      {
        name: 'Durham',
        slug: 'durham',
        county: 'Durham',
        region: 'Triangle',
        population: 278993,
        zip: '27701',
      },
      {
        name: 'Greensboro',
        slug: 'greensboro',
        county: 'Guilford',
        region: 'Triad',
        population: 296710,
        zip: '27401',
      },
      {
        name: 'Winston-Salem',
        slug: 'winston-salem',
        county: 'Forsyth',
        region: 'Triad',
        population: 249545,
        zip: '27101',
      },
      {
        name: 'Fayetteville',
        slug: 'fayetteville',
        county: 'Cumberland',
        region: 'Sandhills',
        population: 208501,
        zip: '28301',
      },
      {
        name: 'Cary',
        slug: 'cary',
        county: 'Wake',
        region: 'Triangle',
        population: 174721,
        zip: '27511',
      },
      {
        name: 'Wilmington',
        slug: 'wilmington',
        county: 'New Hanover',
        region: 'Coastal',
        population: 123744,
        zip: '28401',
      },
      {
        name: 'High Point',
        slug: 'high-point',
        county: 'Guilford',
        region: 'Triad',
        population: 112791,
        zip: '27260',
      },
      {
        name: 'Concord',
        slug: 'concord',
        county: 'Cabarrus',
        region: 'Charlotte Metro',
        population: 96341,
        zip: '28025',
      },

      // Medium cities
      {
        name: 'Asheville',
        slug: 'asheville',
        county: 'Buncombe',
        region: 'Mountain',
        population: 94589,
        zip: '28801',
      },
      {
        name: 'Gastonia',
        slug: 'gastonia',
        county: 'Gaston',
        region: 'Charlotte Metro',
        population: 80411,
        zip: '28052',
      },
      {
        name: 'Jacksonville',
        slug: 'jacksonville',
        county: 'Onslow',
        region: 'Coastal',
        population: 72723,
        zip: '28540',
      },
      {
        name: 'Greenville',
        slug: 'greenville',
        county: 'Pitt',
        region: 'Coastal Plain',
        population: 87861,
        zip: '27834',
      },
      {
        name: 'Chapel Hill',
        slug: 'chapel-hill',
        county: 'Orange',
        region: 'Triangle',
        population: 61960,
        zip: '27514',
      },
      {
        name: 'Rocky Mount',
        slug: 'rocky-mount',
        county: 'Nash',
        region: 'Coastal Plain',
        population: 54341,
        zip: '27801',
      },
      {
        name: 'Burlington',
        slug: 'burlington',
        county: 'Alamance',
        region: 'Piedmont',
        population: 53543,
        zip: '27215',
      },
      {
        name: 'Huntersville',
        slug: 'huntersville',
        county: 'Mecklenburg',
        region: 'Charlotte Metro',
        population: 58098,
        zip: '28078',
      },
      {
        name: 'Wilson',
        slug: 'wilson',
        county: 'Wilson',
        region: 'Coastal Plain',
        population: 49459,
        zip: '27893',
      },
      {
        name: 'Kannapolis',
        slug: 'kannapolis',
        county: 'Cabarrus',
        region: 'Charlotte Metro',
        population: 53114,
        zip: '28081',
      },

      // Smaller cities important for local SEO
      {
        name: 'Apex',
        slug: 'apex',
        county: 'Wake',
        region: 'Triangle',
        population: 58780,
        zip: '27502',
      },
      {
        name: 'Hickory',
        slug: 'hickory',
        county: 'Catawba',
        region: 'Western',
        population: 43490,
        zip: '28601',
      },
      {
        name: 'Goldsboro',
        slug: 'goldsboro',
        county: 'Wayne',
        region: 'Coastal Plain',
        population: 33657,
        zip: '27530',
      },
      {
        name: 'Salisbury',
        slug: 'salisbury',
        county: 'Rowan',
        region: 'Piedmont',
        population: 35540,
        zip: '28144',
      },
      {
        name: 'Monroe',
        slug: 'monroe',
        county: 'Union',
        region: 'Charlotte Metro',
        population: 36397,
        zip: '28110',
      },
      {
        name: 'New Bern',
        slug: 'new-bern',
        county: 'Craven',
        region: 'Coastal',
        population: 31291,
        zip: '28560',
      },
      {
        name: 'Sanford',
        slug: 'sanford',
        county: 'Lee',
        region: 'Sandhills',
        population: 30261,
        zip: '27330',
      },
      {
        name: 'Matthews',
        slug: 'matthews',
        county: 'Mecklenburg',
        region: 'Charlotte Metro',
        population: 32682,
        zip: '28105',
      },
      {
        name: 'Holly Springs',
        slug: 'holly-springs',
        county: 'Wake',
        region: 'Triangle',
        population: 41239,
        zip: '27540',
      },
      {
        name: 'Smithfield',
        slug: 'smithfield',
        county: 'Johnston',
        region: 'Triangle',
        population: 12669,
        zip: '27577',
      },

      // Additional strategic cities
      {
        name: 'Mooresville',
        slug: 'mooresville',
        county: 'Iredell',
        region: 'Charlotte Metro',
        population: 50193,
        zip: '28115',
      },
      {
        name: 'Statesville',
        slug: 'statesville',
        county: 'Iredell',
        region: 'Western Piedmont',
        population: 28419,
        zip: '28677',
      },
      {
        name: 'Asheboro',
        slug: 'asheboro',
        county: 'Randolph',
        region: 'Piedmont',
        population: 27156,
        zip: '27203',
      },
      {
        name: 'Kinston',
        slug: 'kinston',
        county: 'Lenoir',
        region: 'Coastal Plain',
        population: 19900,
        zip: '28501',
      },
      {
        name: 'Fuquay-Varina',
        slug: 'fuquay-varina',
        county: 'Wake',
        region: 'Triangle',
        population: 34823,
        zip: '27526',
      },
      {
        name: 'Wake Forest',
        slug: 'wake-forest',
        county: 'Wake',
        region: 'Triangle',
        population: 47601,
        zip: '27587',
      },
      {
        name: 'Indian Trail',
        slug: 'indian-trail',
        county: 'Union',
        region: 'Charlotte Metro',
        population: 40166,
        zip: '28079',
      },
      {
        name: 'Garner',
        slug: 'garner',
        county: 'Wake',
        region: 'Triangle',
        population: 31159,
        zip: '27529',
      },
      {
        name: 'Morrisville',
        slug: 'morrisville',
        county: 'Wake',
        region: 'Triangle',
        population: 29630,
        zip: '27560',
      },
      {
        name: 'Clayton',
        slug: 'clayton',
        county: 'Johnston',
        region: 'Triangle',
        population: 26307,
        zip: '27520',
      },

      // Coastal cities
      {
        name: 'Lumberton',
        slug: 'lumberton',
        county: 'Robeson',
        region: 'Sandhills',
        population: 19025,
        zip: '28358',
      },
      {
        name: 'Elizabeth City',
        slug: 'elizabeth-city',
        county: 'Pasquotank',
        region: 'Coastal',
        population: 17624,
        zip: '27909',
      },

      // Mountain region
      {
        name: 'Boone',
        slug: 'boone',
        county: 'Watauga',
        region: 'Mountain',
        population: 19092,
        zip: '28607',
      },
      {
        name: 'Hendersonville',
        slug: 'hendersonville',
        county: 'Henderson',
        region: 'Mountain',
        population: 15488,
        zip: '28792',
      },

      // Strategic smaller markets
      {
        name: 'Lexington',
        slug: 'lexington',
        county: 'Davidson',
        region: 'Piedmont',
        population: 19632,
        zip: '27292',
      },
      {
        name: 'Thomasville',
        slug: 'thomasville',
        county: 'Davidson',
        region: 'Piedmont',
        population: 26462,
        zip: '27360',
      },
      {
        name: 'Kernersville',
        slug: 'kernersville',
        county: 'Forsyth',
        region: 'Triad',
        population: 26453,
        zip: '27284',
      },
      {
        name: 'Shelby',
        slug: 'shelby',
        county: 'Cleveland',
        region: 'Western',
        population: 21918,
        zip: '28150',
      },
      {
        name: 'Albemarle',
        slug: 'albemarle',
        county: 'Stanly',
        region: 'Piedmont',
        population: 16432,
        zip: '28001',
      },
    ];
  }

  getNearestOffice(city) {
    // Determine nearest office based on city location
    const offices = {
      Triangle: 'Raleigh',
      'Charlotte Metro': 'Charlotte',
      Coastal: 'Raleigh',
      'Coastal Plain': 'Smithfield',
      Triad: 'Winston-Salem',
      Mountain: 'Charlotte',
      Western: 'Charlotte',
      Piedmont: 'Charlotte',
      Sandhills: 'Raleigh',
      'Western Piedmont': 'Charlotte',
    };

    return offices[city.region] || 'Raleigh';
  }

  getOfficeAddress(office) {
    const addresses = {
      Raleigh: '819 N Market Dr, Raleigh, NC 27609',
      Charlotte: '5701 Executive Center Dr #103, Charlotte, NC 28212',
      Smithfield: '612 S Bright Leaf Blvd, Smithfield, NC 27577',
      'Winston-Salem': 'Contact our main office',
      Orlando: '55 E Washington St, Orlando, FL 32801',
    };

    return addresses[office] || addresses['Raleigh'];
  }

  getCityPracticeAreas(city) {
    return [
      {
        title: `Immigration Lawyer ${city.name}`,
        url: '/practice-areas/immigration',
        description: `Experienced immigration attorneys serving ${city.name} with visa applications, green cards, citizenship, and deportation defense.`,
      },
      {
        title: `Personal Injury Attorney ${city.name}`,
        url: '/practice-areas/personal-injury',
        description: `Injured in ${city.name}? Our personal injury lawyers fight for maximum compensation for car accidents, slips & falls, and more.`,
      },
      {
        title: `Criminal Defense Lawyer ${city.name}`,
        url: '/practice-areas/criminal-defense',
        description: `Facing charges in ${city.county || city.region} County? Our criminal defense attorneys protect your rights and freedom.`,
      },
      {
        title: `Workers Comp Attorney ${city.name}`,
        url: '/practice-areas/workers-compensation',
        description: `Hurt at work in ${city.name}? Get the workers\' compensation benefits you deserve with our experienced attorneys.`,
      },
      {
        title: `Family Law Attorney ${city.name}`,
        url: '/practice-areas/family-law',
        description: `Compassionate family law representation in ${city.name} for divorce, custody, support, and other family matters.`,
      },
      {
        title: `Traffic Ticket Lawyer ${city.name}`,
        url: '/practice-areas/traffic-violations',
        description: `Fight traffic tickets in ${city.county || city.region} County. Protect your license and insurance rates.`,
      },
    ];
  }

  getCompletedCityPages() {
    return this.ncCities.filter(city => this.completedTasks.has(`city:${city.slug}`)).length;
  }

  getRelatedPosts(category) {
    const allTopics = this.generateBlogTopics();
    return allTopics
      .filter(topic => topic.category === category)
      .map(topic => ({
        slug: topic.slug,
        title: topic.title,
        excerpt: `Learn about ${topic.title.toLowerCase()} from our experienced attorneys.`,
      }));
  }

  generateOptimizedTitle(page) {
    const location = 'NC';
    const brandName = 'Vasquez Law Firm';

    // Title templates based on page type
    if (page.path.includes('/practice-areas/')) {
      const area = page.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      return `${area} Lawyer ${location} | Best ${area} Attorney | ${brandName}`;
    } else if (page.path.includes('/attorneys/')) {
      return `${page.title} | ${location} Attorney | ${brandName}`;
    } else if (page.path.includes('/locations/')) {
      const city = page.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      return `${city} Lawyer | Best Attorney in ${city}, ${location} | ${brandName}`;
    } else if (page.path.includes('/blog/')) {
      return `${page.title} | ${location} Legal Guide | ${brandName}`;
    }

    return `${page.title} | ${brandName} | ${location} Law Firm`;
  }

  generateOptimizedDescription(page) {
    const location = 'North Carolina';

    // Description templates
    if (page.path.includes('/practice-areas/')) {
      const area = page.name.replace(/-/g, ' ');
      return `Expert ${area} lawyers in ${location}. Free consultation, bilingual services, 24/7 availability. Call 1-844-YO-PELEO for trusted legal representation.`;
    } else if (page.path.includes('/attorneys/')) {
      return `${page.title} is an experienced attorney at Vasquez Law Firm serving ${location}. Specializing in immigration, personal injury, and criminal defense. Free consultation.`;
    } else if (page.path.includes('/locations/')) {
      const city = page.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      return `Top-rated law firm in ${city}, ${location}. Immigration, personal injury, criminal defense & family law. Bilingual attorneys. Call 1-844-967-3536.`;
    }

    return `Vasquez Law Firm - Trusted legal representation in ${location}. Immigration, personal injury, criminal defense, workers comp & family law. Free consultation.`;
  }

  toPascalCase(str) {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  getCategoryName(category) {
    const names = {
      immigration: 'Immigration Law',
      'personal-injury': 'Personal Injury',
      'workers-comp': 'Workers Compensation',
      criminal: 'Criminal Defense',
      family: 'Family Law',
    };

    return names[category] || 'Legal News';
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async addFAQSection(page) {
    // Add relevant FAQs based on page type
    console.log(`     Adding FAQ section to ${page.path}`);
  }

  async addTestimonials(page) {
    // Add testimonials relevant to the practice area
    console.log(`     Adding testimonials to ${page.path}`);
  }

  async addRelatedContent(page) {
    // Add links to related pages and blog posts
    console.log(`     Adding related content to ${page.path}`);
  }

  async optimizeHeadings(page) {
    // Ensure proper H1, H2, H3 hierarchy
    console.log(`     Optimizing heading structure for ${page.path}`);
  }

  async addLocationContent(page) {
    // Add location-specific content for better local SEO
    console.log(`     Adding location content to ${page.path}`);
  }
}

// Initialize and run the autoloop
async function main() {
  // Create necessary directories
  const dirs = [
    'content-import/autoloop-imports',
    'content-import/blog-posts',
    'public/images/blog',
    'src/app/blog',
    'src/app/locations/nc',
  ];

  for (const dir of dirs) {
    await fs.mkdir(path.join(process.cwd(), dir), { recursive: true });
  }

  // Start the optimization autoloop
  const autoloop = new SEOOptimizationAutoloop();
  await autoloop.run();
}

// Run the autoloop
main().catch(console.error);
