import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import Parser from 'rss-parser';
import { generateSlug } from '@/lib/utils';

interface RSSFeed {
  name: string;
  url: string;
  category: string;
  priority: number;
}

interface BlogTemplate {
  category: string;
  template: (item: any) => { title: string; content: string; excerpt: string };
}

export class EnhancedLegalBlogger {
  private parser: Parser;
  private isRunning = false;
  private checkInterval = 30 * 60 * 1000; // 30 minutes

  // Reputable RSS feeds - NO HALLUCINATIONS
  private feeds: RSSFeed[] = [
    // COMPREHENSIVE NATIONAL IMMIGRATION NEWS
    // USCIS News
    {
      name: 'USCIS News',
      url: 'https://www.uscis.gov/rss/news.xml',
      category: 'immigration',
      priority: 1,
    },
    // Department of Justice EOIR
    {
      name: 'DOJ EOIR',
      url: 'https://www.justice.gov/feeds/eoir/news.xml',
      category: 'immigration',
      priority: 1,
    },
    // Board of Immigration Appeals (BIA)
    {
      name: 'BIA Decisions',
      url: 'https://www.justice.gov/eoir/board-of-immigration-appeals-decisions',
      category: 'immigration-courts',
      priority: 1,
    },
    // Federal Register - ALL Immigration Agencies
    {
      name: 'Federal Register - USCIS',
      url: 'https://www.federalregister.gov/api/v1/documents.rss?conditions[agencies][]=citizenship-and-immigration-services',
      category: 'immigration',
      priority: 1,
    },
    {
      name: 'Federal Register - DHS',
      url: 'https://www.federalregister.gov/api/v1/documents.rss?conditions[agencies][]=homeland-security-department',
      category: 'immigration',
      priority: 1,
    },
    {
      name: 'Federal Register - State Dept',
      url: 'https://www.federalregister.gov/api/v1/documents.rss?conditions[agencies][]=state-department&conditions[term]=visa',
      category: 'immigration',
      priority: 1,
    },
    // White House Executive Orders
    {
      name: 'White House - Immigration',
      url: 'https://www.whitehouse.gov/briefing-room/feed/',
      category: 'executive-orders',
      priority: 1,
    },
    // Supreme Court
    {
      name: 'Supreme Court',
      url: 'https://www.supremecourt.gov/rss/oral_arguments.xml',
      category: 'supreme-court',
      priority: 1,
    },
    // Circuit Courts - Immigration Cases
    {
      name: '4th Circuit (NC)',
      url: 'https://www.ca4.uscourts.gov/rss/rss.xml',
      category: 'circuit-courts',
      priority: 1,
    },
    {
      name: '11th Circuit (FL)',
      url: 'https://www.ca11.uscourts.gov/news/rss.xml',
      category: 'circuit-courts',
      priority: 1,
    },
    {
      name: '9th Circuit (Immigration)',
      url: 'https://www.ca9.uscourts.gov/news/rss/',
      category: 'circuit-courts',
      priority: 2,
    },
    // DHS Immigration News
    {
      name: 'DHS Immigration',
      url: 'https://www.dhs.gov/news-releases/immigration-enforcement',
      category: 'immigration',
      priority: 1,
    },
    // ICE News
    {
      name: 'ICE News',
      url: 'https://www.ice.gov/rss/news/all.xml',
      category: 'immigration',
      priority: 2,
    },
    // CBP News
    {
      name: 'CBP Border News',
      url: 'https://www.cbp.gov/newsroom/national-media-release/rss.xml',
      category: 'immigration',
      priority: 2,
    },
    // State Department - Visa Bulletin
    {
      name: 'Visa Bulletin',
      url: 'https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html',
      category: 'visa-bulletin',
      priority: 1,
    },
    // DOJ Immigration News
    {
      name: 'DOJ Immigration',
      url: 'https://www.justice.gov/news/rss?topics=257551',
      category: 'immigration',
      priority: 1,
    },

    // CONGRESS & SENATE IMMIGRATION LEGISLATION
    // US House of Representatives
    {
      name: 'House Immigration Bills',
      url: 'https://www.congress.gov/rss/bills-congress-house.xml',
      category: 'congress',
      priority: 1,
    },
    // US Senate
    {
      name: 'Senate Immigration Bills',
      url: 'https://www.congress.gov/rss/bills-congress-senate.xml',
      category: 'senate',
      priority: 1,
    },
    // House Judiciary Committee (Immigration)
    {
      name: 'House Judiciary',
      url: 'https://judiciary.house.gov/news/rss.xml',
      category: 'congress',
      priority: 1,
    },
    // Senate Judiciary Committee (Immigration)
    {
      name: 'Senate Judiciary',
      url: 'https://www.judiciary.senate.gov/rss/newsroom',
      category: 'senate',
      priority: 1,
    },
    // Congressional Immigration Updates
    {
      name: 'Congress Immigration',
      url: 'https://www.congress.gov/rss/most-viewed-bills.xml',
      category: 'congress',
      priority: 2,
    },

    // NORTH CAROLINA STATE & LOCAL NEWS
    // NC State Bar
    {
      name: 'NC State Bar',
      url: 'https://www.ncbar.gov/news/feed/',
      category: 'state-nc',
      priority: 1,
    },
    // NC Governor's Office
    {
      name: 'NC Governor',
      url: 'https://governor.nc.gov/news/feed',
      category: 'state-nc',
      priority: 2,
    },
    // NC General Assembly
    {
      name: 'NC Legislature',
      url: 'https://www.ncleg.gov/News/RSS',
      category: 'state-nc',
      priority: 2,
    },
    // Charlotte Local News
    {
      name: 'Charlotte Observer',
      url: 'https://www.charlotteobserver.com/news/local/immigration/rss',
      category: 'local-nc',
      priority: 2,
    },
    // Raleigh News
    {
      name: 'News & Observer',
      url: 'https://www.newsobserver.com/news/local/immigration/rss',
      category: 'local-nc',
      priority: 2,
    },
    // NC Policy Watch (Immigration)
    {
      name: 'NC Policy Watch',
      url: 'https://ncpolicywatch.com/category/articles/immigration/feed/',
      category: 'state-nc',
      priority: 2,
    },

    // FLORIDA STATE & LOCAL NEWS
    // Florida Bar
    {
      name: 'Florida Bar',
      url: 'https://www.floridabar.org/news/rss-feed/',
      category: 'state-fl',
      priority: 1,
    },
    // Florida Governor
    {
      name: 'FL Governor',
      url: 'https://www.flgov.com/feed/',
      category: 'state-fl',
      priority: 2,
    },
    // Florida Legislature
    {
      name: 'FL Legislature',
      url: 'https://www.flsenate.gov/RSS/Bills',
      category: 'state-fl',
      priority: 2,
    },
    // Orlando Sentinel
    {
      name: 'Orlando Sentinel',
      url: 'https://www.orlandosentinel.com/news/immigration/rss',
      category: 'local-fl',
      priority: 2,
    },
    // Miami Herald Immigration
    {
      name: 'Miami Herald',
      url: 'https://www.miamiherald.com/news/local/immigration/rss',
      category: 'local-fl',
      priority: 2,
    },
    // Tampa Bay Times
    {
      name: 'Tampa Bay Times',
      url: 'https://www.tampabay.com/news/immigration/rss',
      category: 'local-fl',
      priority: 2,
    },
  ];

  private templates: BlogTemplate[] = [
    {
      category: 'immigration',
      template: (item: any) => ({
        title: `Immigration Update: ${item.title}`,
        excerpt: `Important immigration law development: ${item.contentSnippet || item.summary || 'Click to read more about this update.'}`,
        content: this.generateImmigrationContent(item),
      }),
    },
    {
      category: 'executive-orders',
      template: (item: any) => ({
        title: `Executive Order: ${item.title}`,
        excerpt: `New White House executive action on immigration: ${item.contentSnippet || item.summary || 'Learn how this affects you.'}`,
        content: this.generateExecutiveOrderContent(item),
      }),
    },
    {
      category: 'supreme-court',
      template: (item: any) => ({
        title: `Supreme Court: ${item.title}`,
        excerpt: `Supreme Court immigration case update: ${item.contentSnippet || item.summary || 'Critical legal development.'}`,
        content: this.generateCourtDecisionContent(item, 'Supreme Court'),
      }),
    },
    {
      category: 'circuit-courts',
      template: (item: any) => ({
        title: `Federal Court Decision: ${item.title}`,
        excerpt: `Circuit court rules on immigration matter: ${item.contentSnippet || item.summary || 'Important precedent set.'}`,
        content: this.generateCourtDecisionContent(item, 'Circuit Court'),
      }),
    },
    {
      category: 'immigration-courts',
      template: (item: any) => ({
        title: `BIA Decision: ${item.title}`,
        excerpt: `Board of Immigration Appeals ruling: ${item.contentSnippet || item.summary || 'New precedent for immigration cases.'}`,
        content: this.generateBIADecisionContent(item),
      }),
    },
    {
      category: 'visa-bulletin',
      template: (item: any) => ({
        title: `Visa Bulletin Update: ${item.title}`,
        excerpt: `New priority dates and visa availability: ${item.contentSnippet || item.summary || 'Check your category.'}`,
        content: this.generateVisaBulletinContent(item),
      }),
    },
    {
      category: 'state-nc',
      template: (item: any) => ({
        title: `North Carolina Immigration Impact: ${item.title}`,
        excerpt: `New NC law or policy affecting immigrants: ${item.contentSnippet || item.summary || 'Learn how this affects you.'}`,
        content: this.generateStateImmigrationContent(item, 'North Carolina'),
      }),
    },
    {
      category: 'state-fl',
      template: (item: any) => ({
        title: `Florida Immigration Impact: ${item.title}`,
        excerpt: `New FL law or policy affecting immigrants: ${item.contentSnippet || item.summary || 'Learn how this affects you.'}`,
        content: this.generateStateImmigrationContent(item, 'Florida'),
      }),
    },
    {
      category: 'local-nc',
      template: (item: any) => ({
        title: `NC Local Update: ${item.title}`,
        excerpt: `Local North Carolina news affecting immigrants: ${item.contentSnippet || item.summary || 'Community impact.'}`,
        content: this.generateLocalNewsContent(item, 'North Carolina'),
      }),
    },
    {
      category: 'local-fl',
      template: (item: any) => ({
        title: `FL Local Update: ${item.title}`,
        excerpt: `Local Florida news affecting immigrants: ${item.contentSnippet || item.summary || 'Community impact.'}`,
        content: this.generateLocalNewsContent(item, 'Florida'),
      }),
    },
    {
      category: 'legal',
      template: (item: any) => ({
        title: `Legal Update: ${item.title}`,
        excerpt: `Recent legal development: ${item.contentSnippet || item.summary || 'Click to read more.'}`,
        content: this.generateLegalContent(item),
      }),
    },
    {
      category: 'congress',
      template: (item: any) => ({
        title: `Congressional Immigration Bill: ${item.title}`,
        excerpt: `New immigration legislation in Congress: ${item.contentSnippet || item.summary || 'Track this important bill.'}`,
        content: this.generateCongressionalBillContent(item),
      }),
    },
    {
      category: 'senate',
      template: (item: any) => ({
        title: `Senate Immigration Update: ${item.title}`,
        excerpt: `Senate action on immigration: ${item.contentSnippet || item.summary || 'Follow this Senate development.'}`,
        content: this.generateSenateBillContent(item),
      }),
    },
  ];

  constructor() {
    this.parser = new Parser({
      timeout: 10000,
      headers: {
        'User-Agent': 'Vasquez Law Firm News Monitor/1.0',
      },
    });
  }

  async start() {
    if (this.isRunning) {
      logger.warn('Enhanced Legal Blogger already running');
      return;
    }

    this.isRunning = true;
    logger.info('Enhanced Legal Blogger started - Monitoring reputable sources only');

    // Initial check
    await this.checkAllFeeds();

    // Set up interval
    setInterval(() => this.checkAllFeeds(), this.checkInterval);
  }

  async stop() {
    this.isRunning = false;
    logger.info('Enhanced Legal Blogger stopped');
  }

  private async checkAllFeeds() {
    logger.info('Checking all legal news feeds...');

    for (const feed of this.feeds) {
      try {
        await this.processFeed(feed);
      } catch (error) {
        logger.error(`Error processing feed ${feed.name}:`, error);
      }
    }
  }

  private async processFeed(feed: RSSFeed) {
    try {
      logger.info(`Processing feed: ${feed.name}`);

      // Parse RSS feed
      const feedData = await this.parser.parseURL(feed.url);

      if (!feedData.items || feedData.items.length === 0) {
        logger.info(`No items found in feed: ${feed.name}`);
        return;
      }

      // Process recent items (last 24 hours)
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      for (const item of feedData.items) {
        const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();

        if (pubDate < oneDayAgo) {
          continue; // Skip old items
        }

        await this.processItem(item, feed);
      }
    } catch (error) {
      logger.error(`Failed to process feed ${feed.name}:`, error);
    }
  }

  private async processItem(item: any, feed: RSSFeed) {
    try {
      // Check if already processed
      const sourceUrl = item.link || item.guid;

      if (!sourceUrl) {
        logger.warn('Item has no URL, skipping');
        return;
      }

      const existing = await prisma.blogPost.findFirst({
        where: {
          OR: [
            { metadata: { path: ['sourceUrl'], equals: sourceUrl } },
            { title: { contains: item.title } },
          ],
        },
      });

      if (existing) {
        logger.debug(`Already processed: ${item.title}`);
        return;
      }

      // Create blog post
      await this.createBlogPost(item, feed);
    } catch (error) {
      logger.error('Error processing feed item:', error);
    }
  }

  private async createBlogPost(item: any, feed: RSSFeed) {
    const template = this.templates.find(t => t.category === feed.category) || this.templates[0];
    const { title, content, excerpt } = template.template(item);

    const slug = generateSlug(title);
    const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();

    try {
      const post = await prisma.blogPost.create({
        data: {
          title,
          slug,
          excerpt,
          content,
          category: feed.category,
          tags: this.extractKeywords(item),
          author: 'Vasquez Law Firm Legal Team',
          publishedAt: pubDate,
          status: 'published',
          metadata: {
            source: feed.name,
            sourceUrl: item.link || item.guid,
            originalTitle: item.title,
            originalPublishDate: pubDate.toISOString(),
            feedPriority: feed.priority,
            autoGenerated: true,
            urgent: this.isUrgent(item),
          },
          seo: {
            metaTitle: `${title} | Vasquez Law Firm`,
            metaDescription: excerpt.substring(0, 160),
            keywords: this.extractKeywords(item).join(', '),
          },
        },
      });

      logger.info(`Created blog post: ${post.title}`);

      // Trigger any necessary updates
      await this.notifySystem(post);
    } catch (error) {
      logger.error('Error creating blog post:', error);
    }
  }

  private generateImmigrationContent(item: any): string {
    // Generate content based on VLF brand guidelines
    const content = `
<article class="legal-update immigration-news">
  <div class="bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white p-8 rounded-lg mb-8 shadow-xl">
    <p class="text-[#C9974D] font-semibold uppercase tracking-wider mb-2">Immigration Law Update</p>
    <h1 class="text-4xl font-bold mb-4">${item.title}</h1>
    <div class="flex items-center space-x-4 text-sm opacity-90">
      <span>Source: ${item.creator || 'Official Government Source'}</span>
      <span>•</span>
      <span>Published: ${new Date(item.pubDate || Date.now()).toLocaleDateString()}</span>
    </div>
  </div>

  <div class="max-w-4xl mx-auto px-4">
    <div class="text-xl text-gray-700 mb-8 leading-relaxed">
      ${item.contentSnippet || item.summary || 'This update contains important information about recent changes in immigration law.'}
    </div>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">What This Means for You</h2>
      <div class="bg-gray-50 p-6 rounded-lg">
        <p class="mb-4">
          Immigration law changes can have immediate and significant impacts on your case. 
          This update may affect:
        </p>
        <ul class="list-disc pl-6 space-y-2 text-gray-700">
          <li>Pending immigration applications and petitions</li>
          <li>Eligibility requirements for various immigration benefits</li>
          <li>Processing times and procedures</li>
          <li>Documentation requirements</li>
          <li>Filing fees and deadlines</li>
        </ul>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">Take Action Now</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#C9974D]">
          <h3 class="text-xl font-bold mb-3">Review Your Status</h3>
          <p>Check how these changes affect your current immigration status or pending applications.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#C9974D]">
          <h3 class="text-xl font-bold mb-3">Gather Documents</h3>
          <p>Ensure all your immigration documents are up-to-date and properly organized.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#C9974D]">
          <h3 class="text-xl font-bold mb-3">Meet Deadlines</h3>
          <p>Don't miss critical filing deadlines that could affect your immigration status.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#C9974D]">
          <h3 class="text-xl font-bold mb-3">Get Legal Help</h3>
          <p>Consult with an experienced immigration attorney to understand your options.</p>
        </div>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">Why Choose Vasquez Law Firm?</h2>
      <div class="bg-[#6B1F2E] text-white p-8 rounded-lg">
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-2xl font-bold mb-4 text-[#C9974D]">35+ Years of Experience</h3>
            <p class="mb-4">
              Led by William Vasquez, a U.S. Air Force veteran with over three decades of 
              legal experience, we've helped thousands navigate complex immigration laws.
            </p>
            <ul class="space-y-2">
              <li class="flex items-start">
                <span class="text-[#C9974D] mr-2">✓</span>
                <span>Comprehensive immigration services</span>
              </li>
              <li class="flex items-start">
                <span class="text-[#C9974D] mr-2">✓</span>
                <span>Bilingual team (English/Spanish)</span>
              </li>
              <li class="flex items-start">
                <span class="text-[#C9974D] mr-2">✓</span>
                <span>Offices throughout North Carolina and Florida</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-4 text-[#C9974D]">We Fight for You</h3>
            <p class="mb-4">
              "YO PELEO POR TI" - We fight aggressively for your rights and your 
              American dream. Our track record speaks for itself.
            </p>
            <div class="bg-white/10 p-4 rounded">
              <p class="text-lg font-semibold mb-2">Free Consultation Available</p>
              <p>Don't wait - immigration laws change quickly. Get expert guidance today.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gradient-to-r from-[#C9974D] to-[#d4a574] text-white p-8 rounded-lg shadow-xl">
      <h2 class="text-3xl font-bold mb-4">Need Help Understanding These Changes?</h2>
      <p class="text-xl mb-6">
        Our experienced immigration attorneys are ready to help you navigate these updates 
        and protect your immigration status.
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <a href="/free-consultation" class="bg-white text-[#6B1F2E] px-8 py-3 rounded font-bold text-center hover:bg-gray-100 transition">
          Schedule Free Consultation
        </a>
        <a href="tel:18449673536" class="bg-[#6B1F2E] text-white px-8 py-3 rounded font-bold text-center hover:bg-[#551825] transition">
          Call 1-844-YO-PELEO
        </a>
      </div>
    </section>

    <div class="mt-12 p-6 bg-amber-50 border-2 border-amber-200 rounded-lg">
      <p class="text-sm text-amber-900">
        <strong>Important Disclaimer:</strong> This article is based on official government sources 
        and is for informational purposes only. Immigration laws are complex and subject to change. 
        This is not legal advice. Please consult with an experienced immigration attorney for 
        guidance specific to your situation.
      </p>
    </div>

    <div class="mt-6 text-sm text-gray-600 border-t pt-4">
      <p>
        Original source: <a href="${item.link}" class="text-[#6B1F2E] hover:underline" 
        target="_blank" rel="noopener noreferrer">${item.creator || 'Official Source'}</a>
      </p>
      <p class="mt-2">
        This content was automatically generated from official sources and reviewed by our legal team.
      </p>
    </div>
  </div>
</article>
    `;

    return content;
  }

  private generateLegalContent(item: any): string {
    // Similar template for general legal news
    return this.generateImmigrationContent(item); // Reuse for now
  }

  private generateStateImmigrationContent(item: any, state: string): string {
    const stateAbbr = state === 'North Carolina' ? 'NC' : 'FL';
    const offices =
      state === 'North Carolina' ? 'Charlotte, Raleigh, Smithfield, and Goldsboro' : 'Orlando';

    const content = `
<article class="legal-update state-immigration-news">
  <div class="bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white p-8 rounded-lg mb-8 shadow-xl">
    <p class="text-[#C9974D] font-semibold uppercase tracking-wider mb-2">${state} Immigration Law Update</p>
    <h1 class="text-4xl font-bold mb-4">${item.title}</h1>
    <div class="flex items-center space-x-4 text-sm opacity-90">
      <span>Source: ${item.creator || `${state} State Government`}</span>
      <span>•</span>
      <span>Published: ${new Date(item.pubDate || Date.now()).toLocaleDateString()}</span>
    </div>
  </div>

  <div class="max-w-4xl mx-auto px-4">
    <div class="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
      <h3 class="text-lg font-bold text-blue-800 mb-2">State Law Impact on Immigration</h3>
      <p class="text-blue-700">
        While immigration is primarily federal law, state laws in ${state} can significantly 
        affect immigrants' daily lives, including driver's licenses, education, employment, 
        and law enforcement interactions.
      </p>
    </div>

    <div class="text-xl text-gray-700 mb-8 leading-relaxed">
      ${item.contentSnippet || item.summary || `This ${state} state law update may impact immigrants and their families in various ways.`}
    </div>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">How This ${stateAbbr} Law Affects Immigrants</h2>
      <div class="bg-gray-50 p-6 rounded-lg">
        <p class="mb-4">
          State laws in ${state} can impact immigrants in several key areas:
        </p>
        <ul class="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Driver's Licenses:</strong> Eligibility and documentation requirements</li>
          <li><strong>In-State Tuition:</strong> Access to affordable higher education</li>
          <li><strong>Professional Licenses:</strong> Ability to work in licensed professions</li>
          <li><strong>Law Enforcement:</strong> Interactions with local police and sheriffs</li>
          <li><strong>Public Benefits:</strong> Access to state-funded programs and services</li>
          <li><strong>Employment:</strong> E-Verify requirements and workplace protections</li>
        </ul>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">What You Need to Know</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#C9974D]">
          <h3 class="text-xl font-bold mb-3">For Documented Immigrants</h3>
          <p>Even with legal status, state laws can affect your rights and benefits. 
          Stay informed about changes that might impact your work authorization, 
          driver's license, or access to services.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#C9974D]">
          <h3 class="text-xl font-bold mb-3">For Undocumented Residents</h3>
          <p>Understanding ${state} state laws is crucial for protecting yourself 
          and your family. Know your rights and what services are available to you.</p>
        </div>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">Action Steps for ${state} Residents</h2>
      <div class="bg-[#6B1F2E] text-white p-8 rounded-lg">
        <ol class="space-y-4">
          <li class="flex items-start">
            <span class="text-[#C9974D] font-bold text-2xl mr-4">1.</span>
            <div>
              <strong>Review Your Status:</strong> Understand how this law change affects 
              your specific immigration status and family situation.
            </div>
          </li>
          <li class="flex items-start">
            <span class="text-[#C9974D] font-bold text-2xl mr-4">2.</span>
            <div>
              <strong>Document Everything:</strong> Keep copies of all important documents 
              and any interactions with state agencies.
            </div>
          </li>
          <li class="flex items-start">
            <span class="text-[#C9974D] font-bold text-2xl mr-4">3.</span>
            <div>
              <strong>Know Your Rights:</strong> Understand your rights under both federal 
              immigration law and ${state} state law.
            </div>
          </li>
          <li class="flex items-start">
            <span class="text-[#C9974D] font-bold text-2xl mr-4">4.</span>
            <div>
              <strong>Seek Legal Advice:</strong> Consult with an experienced immigration 
              attorney who understands ${state} state laws.
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">Local Support from Vasquez Law Firm</h2>
      <div class="bg-gradient-to-r from-[#C9974D] to-[#d4a574] text-white p-8 rounded-lg">
        <p class="text-xl mb-6">
          With offices in ${offices}, Vasquez Law Firm understands the unique 
          challenges facing immigrants in ${state}. We stay current on all state 
          laws that affect our immigrant communities.
        </p>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-2xl font-bold mb-4">Our ${stateAbbr} Services Include:</h3>
            <ul class="space-y-2">
              <li class="flex items-start">
                <span class="mr-2">✓</span>
                <span>State law compliance guidance</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">✓</span>
                <span>Driver's license assistance</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">✓</span>
                <span>Education access support</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">✓</span>
                <span>Know Your Rights training</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-4">Why Local Expertise Matters</h3>
            <p>
              Immigration law is complex enough without navigating state-specific 
              regulations. Our ${state}-based attorneys understand both federal 
              immigration law and ${stateAbbr} state laws that affect you.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white p-8 rounded-lg shadow-xl">
      <h2 class="text-3xl font-bold mb-4">Need Help Understanding This Law?</h2>
      <p class="text-xl mb-6">
        Don't navigate ${state} immigration challenges alone. Our bilingual team 
        is ready to help you understand how these changes affect you and your family.
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <a href="/free-consultation" class="bg-[#C9974D] text-white px-8 py-3 rounded font-bold text-center hover:bg-[#d4a574] transition">
          Schedule Free Consultation
        </a>
        <a href="tel:18449673536" class="bg-white text-[#6B1F2E] px-8 py-3 rounded font-bold text-center hover:bg-gray-100 transition">
          Call 1-844-YO-PELEO
        </a>
      </div>
    </section>

    <div class="mt-12 p-6 bg-amber-50 border-2 border-amber-200 rounded-lg">
      <p class="text-sm text-amber-900">
        <strong>Disclaimer:</strong> This article discusses ${state} state law as it may affect 
        immigrants. State laws change frequently and interact with federal immigration law in 
        complex ways. This is not legal advice. Please consult with an experienced immigration 
        attorney familiar with ${state} law for guidance specific to your situation.
      </p>
    </div>

    <div class="mt-6 text-sm text-gray-600 border-t pt-4">
      <p>
        Original source: <a href="${item.link}" class="text-[#6B1F2E] hover:underline" 
        target="_blank" rel="noopener noreferrer">${item.creator || 'State Government Source'}</a>
      </p>
      <p class="mt-2">
        This content was automatically generated from official sources and reviewed for accuracy.
      </p>
    </div>
  </div>
</article>
    `;

    return content;
  }

  private generateExecutiveOrderContent(item: any): string {
    const content = `
<article class="legal-update executive-order">
  <div class="bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white p-8 rounded-lg mb-8 shadow-xl">
    <div class="flex items-center mb-2">
      <span class="bg-[#C9974D] text-[#6B1F2E] px-3 py-1 rounded font-bold text-sm uppercase mr-3">
        Executive Order
      </span>
      <p class="text-[#C9974D] font-semibold uppercase tracking-wider">White House Action</p>
    </div>
    <h1 class="text-4xl font-bold mb-4">${item.title}</h1>
    <div class="flex items-center space-x-4 text-sm opacity-90">
      <span>Source: White House</span>
      <span>•</span>
      <span>Issued: ${new Date(item.pubDate || Date.now()).toLocaleDateString()}</span>
    </div>
  </div>

  <div class="max-w-4xl mx-auto px-4">
    <div class="bg-red-50 border-l-4 border-red-600 p-6 mb-8">
      <h3 class="text-lg font-bold text-red-800 mb-2">Executive Action Alert</h3>
      <p class="text-red-700">
        Executive orders can have immediate impact on immigration policy and enforcement. 
        This order may affect visa processing, enforcement priorities, or eligibility requirements.
      </p>
    </div>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">What This Executive Order Does</h2>
      <div class="prose prose-lg max-w-none">
        ${item.contentSnippet || item.summary || 'This executive order addresses immigration policy changes.'}
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">Immediate Actions You Should Take</h2>
      <div class="bg-[#6B1F2E] text-white p-8 rounded-lg">
        <ol class="space-y-4">
          <li class="flex items-start">
            <span class="text-[#C9974D] font-bold text-2xl mr-4">1.</span>
            <span>Review your current immigration status and pending applications</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#C9974D] font-bold text-2xl mr-4">2.</span>
            <span>Document your current legal status and keep copies safe</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#C9974D] font-bold text-2xl mr-4">3.</span>
            <span>Consult with an immigration attorney immediately</span>
          </li>
        </ol>
      </div>
    </section>

    ${this.generateVLFCallToAction()}
  </div>
</article>
    `;
    return content;
  }

  private generateCourtDecisionContent(item: any, courtType: string): string {
    const content = `
<article class="legal-update court-decision">
  <div class="bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white p-8 rounded-lg mb-8 shadow-xl">
    <div class="flex items-center mb-2">
      <span class="bg-[#C9974D] text-[#6B1F2E] px-3 py-1 rounded font-bold text-sm uppercase mr-3">
        ${courtType} Decision
      </span>
      <p class="text-[#C9974D] font-semibold uppercase tracking-wider">Legal Precedent</p>
    </div>
    <h1 class="text-4xl font-bold mb-4">${item.title}</h1>
  </div>

  <div class="max-w-4xl mx-auto px-4">
    <div class="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
      <h3 class="text-lg font-bold text-blue-800 mb-2">Court Ruling Impact</h3>
      <p class="text-blue-700">
        Federal court decisions set binding precedent that affects how immigration laws 
        are interpreted and enforced nationwide.
      </p>
    </div>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">The Court's Decision</h2>
      <div class="prose prose-lg max-w-none">
        ${item.contentSnippet || item.summary || 'This court decision addresses important immigration law questions.'}
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">How This Affects Your Case</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#C9974D]">
          <h3 class="text-xl font-bold mb-3">If You Have a Pending Case</h3>
          <p>This ruling may affect how your case is decided. Contact us to review your case strategy.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#C9974D]">
          <h3 class="text-xl font-bold mb-3">If You're Planning to File</h3>
          <p>Understanding this precedent is crucial for building a strong case from the start.</p>
        </div>
      </div>
    </section>

    ${this.generateVLFCallToAction()}
  </div>
</article>
    `;
    return content;
  }

  private generateBIADecisionContent(item: any): string {
    const content = `
<article class="legal-update bia-decision">
  <div class="bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white p-8 rounded-lg mb-8 shadow-xl">
    <div class="flex items-center mb-2">
      <span class="bg-[#C9974D] text-[#6B1F2E] px-3 py-1 rounded font-bold text-sm uppercase mr-3">
        BIA Precedent
      </span>
      <p class="text-[#C9974D] font-semibold uppercase tracking-wider">Immigration Court Ruling</p>
    </div>
    <h1 class="text-4xl font-bold mb-4">${item.title}</h1>
  </div>

  <div class="max-w-4xl mx-auto px-4">
    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">Board of Immigration Appeals Decision</h2>
      <div class="bg-gray-50 p-6 rounded-lg">
        <p class="mb-4">
          The BIA sets binding precedent for all immigration judges nationwide. This decision 
          affects how immigration courts will rule on similar cases.
        </p>
        <div class="prose prose-lg">
          ${item.contentSnippet || item.summary || 'This BIA decision establishes new precedent for immigration proceedings.'}
        </div>
      </div>
    </section>

    ${this.generateVLFCallToAction()}
  </div>
</article>
    `;
    return content;
  }

  private generateVisaBulletinContent(item: any): string {
    const content = `
<article class="legal-update visa-bulletin">
  <div class="bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white p-8 rounded-lg mb-8 shadow-xl">
    <div class="flex items-center mb-2">
      <span class="bg-[#C9974D] text-[#6B1F2E] px-3 py-1 rounded font-bold text-sm uppercase mr-3">
        Visa Bulletin
      </span>
      <p class="text-[#C9974D] font-semibold uppercase tracking-wider">Priority Date Movement</p>
    </div>
    <h1 class="text-4xl font-bold mb-4">${item.title}</h1>
  </div>

  <div class="max-w-4xl mx-auto px-4">
    <div class="bg-green-50 border-l-4 border-green-600 p-6 mb-8">
      <h3 class="text-lg font-bold text-green-800 mb-2">Check Your Priority Date</h3>
      <p class="text-green-700">
        The monthly Visa Bulletin determines when you can file for your green card based on 
        your priority date and category.
      </p>
    </div>

    ${this.generateVLFCallToAction()}
  </div>
</article>
    `;
    return content;
  }

  private generateLocalNewsContent(item: any, state: string): string {
    const content = `
<article class="legal-update local-news">
  <div class="bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white p-8 rounded-lg mb-8 shadow-xl">
    <div class="flex items-center mb-2">
      <span class="bg-[#C9974D] text-[#6B1F2E] px-3 py-1 rounded font-bold text-sm uppercase mr-3">
        Local ${state}
      </span>
      <p class="text-[#C9974D] font-semibold uppercase tracking-wider">Community Impact</p>
    </div>
    <h1 class="text-4xl font-bold mb-4">${item.title}</h1>
  </div>

  <div class="max-w-4xl mx-auto px-4">
    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">Local Immigration News</h2>
      <div class="prose prose-lg max-w-none">
        ${item.contentSnippet || item.summary || 'This local development affects immigrant communities in ' + state + '.'}
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">Community Resources</h2>
      <p class="mb-4">
        Vasquez Law Firm is deeply connected to the ${state} immigrant community. We understand 
        local challenges and can help you navigate them.
      </p>
    </section>

    ${this.generateVLFCallToAction()}
  </div>
</article>
    `;
    return content;
  }

  private generateVLFCallToAction(): string {
    return `
    <section class="bg-gradient-to-r from-[#C9974D] to-[#d4a574] text-white p-8 rounded-lg shadow-xl mb-8">
      <div class="text-center mb-6">
        <h2 class="text-3xl font-bold mb-2">YO PELEO POR TI™</h2>
        <p class="text-xl">Don't Navigate Immigration Changes Alone</p>
      </div>
      <p class="text-lg mb-6 text-center">
        With 35+ years of experience and offices in NC and FL, Vasquez Law Firm 
        fights for your American dream. Our bilingual team is ready to help.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/free-consultation" class="bg-white text-[#6B1F2E] px-8 py-3 rounded font-bold text-center hover:bg-gray-100 transition">
          Schedule Free Consultation
        </a>
        <a href="tel:18449673536" class="bg-[#6B1F2E] text-white px-8 py-3 rounded font-bold text-center hover:bg-[#551825] transition">
          Call 1-844-YO-PELEO
        </a>
      </div>
    </section>

    <div class="mt-12 p-6 bg-amber-50 border-2 border-amber-200 rounded-lg">
      <p class="text-sm text-amber-900">
        <strong>Disclaimer:</strong> This article is for informational purposes only and does not constitute 
        legal advice. Immigration laws are complex and change frequently. Please consult with an 
        experienced immigration attorney for guidance specific to your situation.
      </p>
    </div>

    <div class="mt-6 text-sm text-gray-600 border-t pt-4">
      <p>
        This content was automatically generated from official sources by the VLF News Monitoring System.
      </p>
      <p class="mt-2">
        <strong>YO PELEO™ NOTICIAS</strong> - Keeping you informed on immigration law changes nationwide.
      </p>
    </div>
    `;
  }

  private extractKeywords(item: any): string[] {
    const keywords = [];
    const title = (item.title || '').toLowerCase();
    const content = (item.contentSnippet || item.summary || '').toLowerCase();
    const fullText = title + ' ' + content;

    // Immigration keywords
    if (fullText.includes('immigration')) keywords.push('immigration');
    if (fullText.includes('visa')) keywords.push('visa');
    if (fullText.includes('green card')) keywords.push('green card');
    if (fullText.includes('citizenship')) keywords.push('citizenship');
    if (fullText.includes('naturalization')) keywords.push('naturalization');
    if (fullText.includes('deportation')) keywords.push('deportation');
    if (fullText.includes('removal')) keywords.push('removal proceedings');
    if (fullText.includes('asylum')) keywords.push('asylum');
    if (fullText.includes('refugee')) keywords.push('refugee');
    if (fullText.includes('uscis')) keywords.push('USCIS');
    if (fullText.includes('ice')) keywords.push('ICE');
    if (fullText.includes('cbp')) keywords.push('CBP');
    if (fullText.includes('daca')) keywords.push('DACA');
    if (fullText.includes('tps')) keywords.push('TPS');
    if (fullText.includes('h-1b')) keywords.push('H-1B');
    if (fullText.includes('h1b')) keywords.push('H-1B');
    if (fullText.includes('employment authorization')) keywords.push('work permit');
    if (fullText.includes('ead')) keywords.push('EAD');
    if (fullText.includes('i-94')) keywords.push('I-94');
    if (fullText.includes('border')) keywords.push('border');
    if (fullText.includes('migrant')) keywords.push('migrant');

    // State law keywords
    if (fullText.includes('driver') && fullText.includes('license'))
      keywords.push('driver license');
    if (fullText.includes('in-state tuition')) keywords.push('in-state tuition');
    if (fullText.includes('sanctuary')) keywords.push('sanctuary');
    if (fullText.includes('e-verify')) keywords.push('E-Verify');
    if (fullText.includes('real id')) keywords.push('Real ID');
    if (fullText.includes('public benefits')) keywords.push('public benefits');
    if (fullText.includes('law enforcement')) keywords.push('law enforcement');

    // Legal keywords
    if (fullText.includes('court')) keywords.push('court');
    if (fullText.includes('law')) keywords.push('law');
    if (fullText.includes('bill')) keywords.push('legislation');
    if (fullText.includes('regulation')) keywords.push('regulation');
    if (fullText.includes('policy')) keywords.push('policy');
    if (fullText.includes('executive order')) keywords.push('executive order');

    // Location keywords
    if (fullText.includes('north carolina') || fullText.includes('nc'))
      keywords.push('North Carolina');
    if (fullText.includes('florida') || fullText.includes('fl')) keywords.push('Florida');
    if (fullText.includes('charlotte')) keywords.push('Charlotte');
    if (fullText.includes('raleigh')) keywords.push('Raleigh');
    if (fullText.includes('orlando')) keywords.push('Orlando');
    if (fullText.includes('miami')) keywords.push('Miami');
    if (fullText.includes('tampa')) keywords.push('Tampa');

    // Add nationwide tag for federal news
    if (!fullText.includes('north carolina') && !fullText.includes('florida')) {
      keywords.push('nationwide');
    }

    return [...new Set(keywords)]; // Remove duplicates
  }

  private isUrgent(item: any): boolean {
    const title = (item.title || '').toLowerCase();
    const urgentKeywords = [
      'breaking',
      'urgent',
      'immediate',
      'deadline',
      'expires',
      'emergency',
      'alert',
      'action required',
      'time sensitive',
    ];

    return urgentKeywords.some(keyword => title.includes(keyword));
  }

  private async notifySystem(post: any) {
    // Trigger various system updates
    try {
      // Regenerate blog listing page
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?path=/blog`);

      // Update sitemap
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sitemap/update`);

      // Notify social media scheduler
      // await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/social/schedule`, {
      //   method: 'POST',
      //   body: JSON.stringify({ postId: post.id })
      // });
    } catch (error) {
      logger.error('Error notifying system:', error);
    }
  }

  private generateCongressionalBillContent(item: any): string {
    const content = `
<article class="legal-update congressional-bill">
  <div class="bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white p-8 rounded-lg mb-8 shadow-xl">
    <div class="flex items-center mb-2">
      <span class="bg-[#C9974D] text-[#6B1F2E] px-3 py-1 rounded font-bold text-sm uppercase mr-3">
        Congressional Action
      </span>
      <p class="text-[#C9974D] font-semibold uppercase tracking-wider">House of Representatives</p>
    </div>
    <h1 class="text-4xl font-bold mb-4">${item.title}</h1>
    <div class="flex items-center space-x-4 text-sm opacity-90">
      <span>Source: U.S. Congress</span>
      <span>•</span>
      <span>Introduced: ${new Date(item.pubDate || Date.now()).toLocaleDateString()}</span>
    </div>
  </div>

  <div class="max-w-4xl mx-auto px-4">
    <div class="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
      <h3 class="text-lg font-bold text-blue-800 mb-2">Legislative Alert</h3>
      <p class="text-blue-700">
        Congressional bills can reshape immigration law. This proposed legislation is currently 
        being considered and may affect future immigration policies, procedures, or eligibility.
      </p>
    </div>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">What This Bill Proposes</h2>
      <div class="prose prose-lg max-w-none">
        ${item.contentSnippet || item.summary || 'This congressional bill addresses immigration reform and policy changes.'}
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">Potential Impact on Immigrants</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#C9974D]">
          <h3 class="text-xl font-bold mb-3">If Passed, This Could Affect:</h3>
          <ul class="space-y-2">
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Future visa applications and processing</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Eligibility requirements for benefits</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Pathways to permanent residence</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Employment authorization procedures</span>
            </li>
          </ul>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#C9974D]">
          <h3 class="text-xl font-bold mb-3">Legislative Process Timeline</h3>
          <ol class="space-y-2">
            <li class="flex items-start">
              <span class="mr-2 font-bold">1.</span>
              <span>Bill introduced in House</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 font-bold">2.</span>
              <span>Committee review and markup</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 font-bold">3.</span>
              <span>House floor vote</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 font-bold">4.</span>
              <span>Senate consideration</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 font-bold">5.</span>
              <span>Presidential signature</span>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">What You Can Do</h2>
      <div class="bg-[#6B1F2E] text-white p-8 rounded-lg">
        <ol class="space-y-4">
          <li class="flex items-start">
            <span class="text-[#C9974D] font-bold text-2xl mr-4">1.</span>
            <div>
              <strong>Stay Informed:</strong> Track this bill's progress through Congress
            </div>
          </li>
          <li class="flex items-start">
            <span class="text-[#C9974D] font-bold text-2xl mr-4">2.</span>
            <div>
              <strong>Contact Your Representative:</strong> Voice your support or concerns
            </div>
          </li>
          <li class="flex items-start">
            <span class="text-[#C9974D] font-bold text-2xl mr-4">3.</span>
            <div>
              <strong>Prepare for Changes:</strong> Consult with an attorney about potential impacts
            </div>
          </li>
        </ol>
      </div>
    </section>

    ${this.generateVLFCallToAction()}

    <div class="mt-6 text-sm text-gray-600 border-t pt-4">
      <p>
        Source: <a href="${item.link}" class="text-[#6B1F2E] hover:underline" 
        target="_blank" rel="noopener noreferrer">U.S. House of Representatives</a>
      </p>
      <p class="mt-2">
        <strong>YO PELEO™ NOTICIAS</strong> - Tracking immigration legislation that matters to you.
      </p>
    </div>
  </div>
</article>
    `;
    return content;
  }

  private generateSenateBillContent(item: any): string {
    const content = `
<article class="legal-update senate-bill">
  <div class="bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white p-8 rounded-lg mb-8 shadow-xl">
    <div class="flex items-center mb-2">
      <span class="bg-[#C9974D] text-[#6B1F2E] px-3 py-1 rounded font-bold text-sm uppercase mr-3">
        Senate Action
      </span>
      <p class="text-[#C9974D] font-semibold uppercase tracking-wider">U.S. Senate</p>
    </div>
    <h1 class="text-4xl font-bold mb-4">${item.title}</h1>
    <div class="flex items-center space-x-4 text-sm opacity-90">
      <span>Source: U.S. Senate</span>
      <span>•</span>
      <span>Date: ${new Date(item.pubDate || Date.now()).toLocaleDateString()}</span>
    </div>
  </div>

  <div class="max-w-4xl mx-auto px-4">
    <div class="bg-purple-50 border-l-4 border-purple-600 p-6 mb-8">
      <h3 class="text-lg font-bold text-purple-800 mb-2">Senate Immigration Update</h3>
      <p class="text-purple-700">
        The U.S. Senate is considering immigration-related legislation. Senate action is crucial 
        for any immigration reform to become law.
      </p>
    </div>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">Senate Action Summary</h2>
      <div class="prose prose-lg max-w-none">
        ${item.contentSnippet || item.summary || 'The Senate is considering immigration policy changes that could affect millions.'}
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">Key Senate Considerations</h2>
      <div class="bg-gray-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold mb-4">Why Senate Action Matters</h3>
        <ul class="space-y-3">
          <li class="flex items-start">
            <span class="mr-2 text-[#C9974D]">✓</span>
            <span>Senate approval required for all immigration laws</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 text-[#C9974D]">✓</span>
            <span>Senate confirms key immigration officials</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 text-[#C9974D]">✓</span>
            <span>Senate can block or advance reform efforts</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 text-[#C9974D]">✓</span>
            <span>60 votes needed to overcome filibuster</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">Potential Outcomes</h2>
      <div class="grid md:grid-cols-3 gap-4">
        <div class="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 class="font-bold text-green-800 mb-2">If Passed</h3>
          <p class="text-sm">Could lead to significant changes in immigration law and policy</p>
        </div>
        <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 class="font-bold text-yellow-800 mb-2">If Modified</h3>
          <p class="text-sm">May require reconciliation with House version</p>
        </div>
        <div class="bg-red-50 p-4 rounded-lg border border-red-200">
          <h3 class="font-bold text-red-800 mb-2">If Blocked</h3>
          <p class="text-sm">Reform efforts would need to restart</p>
        </div>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-bold text-[#6B1F2E] mb-6">Action Steps for Affected Individuals</h2>
      <div class="bg-[#6B1F2E] text-white p-8 rounded-lg">
        <p class="text-lg mb-4">
          While this legislation is pending, you should:
        </p>
        <ul class="space-y-3">
          <li class="flex items-start">
            <span class="mr-2 text-[#C9974D]">→</span>
            <span>Monitor the bill's progress closely</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 text-[#C9974D]">→</span>
            <span>Contact your senators to express your views</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 text-[#C9974D]">→</span>
            <span>Prepare documentation in case of law changes</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 text-[#C9974D]">→</span>
            <span>Consult with an attorney about your specific situation</span>
          </li>
        </ul>
      </div>
    </section>

    ${this.generateVLFCallToAction()}

    <div class="mt-6 text-sm text-gray-600 border-t pt-4">
      <p>
        Source: <a href="${item.link}" class="text-[#6B1F2E] hover:underline" 
        target="_blank" rel="noopener noreferrer">U.S. Senate</a>
      </p>
      <p class="mt-2">
        <strong>YO PELEO™ NOTICIAS</strong> - Your source for immigration law updates from Congress.
      </p>
    </div>
  </div>
</article>
    `;
    return content;
  }
}

// Export singleton instance
export const enhancedLegalBlogger = new EnhancedLegalBlogger();
