import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/logger';
import { errorToLogMeta } from '@/lib/logger/utils';
import { getPrismaClient } from '@/lib/prisma';
import * as cheerio from 'cheerio';
import { WebFetch } from '@/lib/utils/web-fetch';
import * as cron from 'node-cron';

interface Competitor {
  name: string;
  domain: string;
  locations: string[];
  practiceAreas: string[];
}

interface CompetitorIntelligence {
  domain: string;
  lastChecked: Date;
  rankings: {
    keyword: string;
    position: number;
    change: number;
    url: string;
  }[];
  content: {
    newPosts: ContentPiece[];
    updatedPosts: ContentPiece[];
    topPerformers: ContentPiece[];
  };
  backlinks: {
    total: number;
    new: BacklinkData[];
    lost: BacklinkData[];
    quality: number; // 0-100
  };
  socialMedia: SocialMediaProfile[];
  technicalSEO: {
    siteSpeed: number;
    mobileScore: number;
    schemaMarkup: string[];
    sslStatus: boolean;
  };
  opportunities: Opportunity[];
}

interface ContentPiece {
  url: string;
  title: string;
  publishDate: Date;
  wordCount: number;
  keywords: string[];
  backlinks: number;
  socialShares: number;
  estimatedTraffic: number;
}

interface BacklinkData {
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  domainAuthority: number;
  isDoFollow: boolean;
  dateFound: Date;
}

interface SocialMediaProfile {
  platform: string;
  followers: number;
  engagement: number;
  recentPosts: SocialMediaPost[];
}

interface SocialMediaPost {
  id?: string;
  content: string;
  date: Date;
  likes?: number;
  shares?: number;
  comments?: number;
}

interface Opportunity {
  type: 'content_gap' | 'keyword_opportunity' | 'backlink_opportunity' | 'technical_advantage';
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionItems: string[];
  estimatedImpact: number; // 1-10
}

interface KeywordRanking {
  keyword: string;
  position: number;
  change: number;
  url: string;
}

interface ContentAnalysis {
  newPosts: ContentPiece[];
  updatedPosts: ContentPiece[];
  topPerformers: ContentPiece[];
}

interface BacklinkAnalysis {
  total: number;
  new: BacklinkData[];
  lost: BacklinkData[];
  quality: number; // 0-100
}

interface TechnicalSEOAnalysis {
  siteSpeed: number;
  mobileScore: number;
  schemaMarkup: string[];
  sslStatus: boolean;
}

interface RankingGap {
  keyword: string;
  ourPosition: number;
  competitor: string;
  theirPosition: number;
  gap: number;
}

interface ResponseStrategy {
  action: 'counter' | 'monitor' | 'ignore';
  reason: string;
  priority?: 'high' | 'medium' | 'low';
  timeline?: string;
}

interface DailyIntelligenceReport {
  date: Date;
  competitors: number;
  keyFindings: string[];
  urgentActions: string[];
  opportunities: Opportunity[];
}

interface MarketShareAnalysis {
  vasquezLawFirm: number;
  competitors: Record<string, number>;
}

interface ContentStrategyAnalysis {
  publishingFrequency: string;
  contentTypes: string[];
  topicClusters: string[];
}

interface LinkBuildingAnalysis {
  tactics: string[];
  linkVelocity: number;
  anchorTextDistribution: {
    branded: number;
    exact: number;
    partial: number;
    generic: number;
  };
}

interface ConversionTacticsAnalysis {
  ctaTypes: string[];
  trustSignals: string[];
  urgencyTactics: string[];
}

interface DeepAnalysis {
  marketShare: MarketShareAnalysis;
  contentStrategy: ContentStrategyAnalysis;
  linkBuilding: LinkBuildingAnalysis;
  conversionTactics: ConversionTacticsAnalysis;
}

export class CompetitorSpyAgent {
  private model: ChatOpenAI;
  private prisma: ReturnType<typeof getPrismaClient>;
  private webFetch: WebFetch;
  private isRunning: boolean = false;
  private scheduledJobs: cron.ScheduledTask[] = [];

  // Primary NC Legal Competitors
  private readonly PRIMARY_COMPETITORS = [
    {
      name: 'Brent Adams & Associates',
      domain: 'brentadams.com',
      locations: ['Charlotte', 'Raleigh', 'Fayetteville'],
      practiceAreas: ['personal_injury', 'workers_compensation'],
    },
    {
      name: 'Hardwick Law Firm',
      domain: 'hardwicklaw.com',
      locations: ['Charlotte'],
      practiceAreas: ['personal_injury', 'criminal_defense'],
    },
    {
      name: 'The Law Offices of Jason E. Taylor',
      domain: 'taylorlawfirmnc.com',
      locations: ['Charlotte', 'Hickory'],
      practiceAreas: ['personal_injury', 'workers_compensation'],
    },
    {
      name: 'Whitley Law Firm',
      domain: 'whitleylaw.com',
      locations: ['Raleigh', 'Kinston'],
      practiceAreas: ['personal_injury'],
    },
    {
      name: 'Nagle & Associates',
      domain: 'naglehartnc.com',
      locations: ['Charlotte', 'Winston-Salem'],
      practiceAreas: ['personal_injury', 'workers_compensation'],
    },
  ];

  // Key Performance Indicators to Track
  private readonly KPI_METRICS = {
    organic_traffic: { weight: 0.3, threshold: 10000 },
    domain_authority: { weight: 0.2, threshold: 50 },
    keyword_rankings: { weight: 0.25, threshold: 100 },
    backlink_velocity: { weight: 0.15, threshold: 50 },
    content_frequency: { weight: 0.1, threshold: 4 }, // posts per month
  };

  // Monitoring Targets
  private readonly MONITORING_TARGETS = {
    keywords: [
      // Immigration
      'immigration lawyer charlotte nc',
      'deportation defense attorney',
      'green card lawyer nc',
      'citizenship attorney north carolina',

      // Personal Injury
      'personal injury lawyer charlotte',
      'car accident attorney nc',
      'workers comp lawyer charlotte',

      // Criminal Defense
      'criminal defense attorney charlotte',
      'dwi lawyer nc',

      // Spanish Keywords
      'abogado de inmigracion charlotte',
      'abogado de accidentes',
    ],
    content_topics: [
      'immigration law changes',
      'personal injury settlements',
      'workers compensation claims',
      'criminal defense strategies',
      'legal rights in NC',
    ],
  };

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.2,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    this.prisma = getPrismaClient();
    this.webFetch = new WebFetch();
  }

  /**
   * Start the competitor monitoring engine
   */
  async startSpying(): Promise<void> {
    if (this.isRunning) {
      logger.warn('Competitor Spy Agent is already running');
      return;
    }

    this.isRunning = true;
    logger.info('🕵️ Starting Competitor Spy Agent - Intelligence Gathering Mode Activated');

    // Daily comprehensive analysis (6 AM)
    const dailyJob = cron.schedule('0 6 * * *', async () => {
      await this.executeDailyIntelligenceGathering();
    });
    this.scheduledJobs.push(dailyJob);

    // Hourly content monitoring
    const hourlyJob = cron.schedule('0 * * * *', async () => {
      await this.monitorCompetitorContent();
    });
    this.scheduledJobs.push(hourlyJob);

    // Real-time ranking checks (every 4 hours)
    const rankingJob = cron.schedule('0 */4 * * *', async () => {
      await this.checkKeywordRankings();
    });
    this.scheduledJobs.push(rankingJob);

    // Weekly deep analysis (Sundays at 2 AM)
    const weeklyJob = cron.schedule('0 2 * * 0', async () => {
      await this.executeDeepCompetitiveAnalysis();
    });
    this.scheduledJobs.push(weeklyJob);

    // Initial execution
    await this.executeCompetitorSpyCycle();
  }

  /**
   * Stop the spy engine
   */
  stopSpying(): void {
    this.scheduledJobs.forEach(job => job.stop());
    this.scheduledJobs = [];
    this.isRunning = false;
    logger.info('Competitor Spy Agent stopped');
  }

  /**
   * Execute a full competitor spy cycle
   */
  private async executeCompetitorSpyCycle(): Promise<void> {
    try {
      logger.info('🔍 Executing Competitor Spy Cycle');

      // 1. Gather intelligence on all competitors
      const intelligence = await this.gatherCompetitorIntelligence();

      // 2. Analyze content strategies
      await this.analyzeContentStrategies(intelligence);

      // 3. Track ranking movements
      await this.trackRankingMovements(intelligence);

      // 4. Discover backlink opportunities
      await this.discoverBacklinkOpportunities(intelligence);

      // 5. Identify weaknesses to exploit
      await this.identifyCompetitorWeaknesses(intelligence);

      // 6. Generate counter-strategies
      await this.generateCounterStrategies(intelligence);

      // 7. Alert on urgent opportunities
      await this.alertOnUrgentOpportunities(intelligence);

      logger.info('✅ Competitor Spy Cycle Complete');
    } catch (error) {
      logger.error('Competitor Spy Cycle Error:', errorToLogMeta(error));
    }
  }

  /**
   * Gather comprehensive intelligence on all competitors
   */
  private async gatherCompetitorIntelligence(): Promise<CompetitorIntelligence[]> {
    const intelligence: CompetitorIntelligence[] = [];

    for (const competitor of this.PRIMARY_COMPETITORS) {
      try {
        logger.info(`🎯 Gathering intelligence on ${competitor.name}`);

        const intel: CompetitorIntelligence = {
          domain: competitor.domain,
          lastChecked: new Date(),
          rankings: await this.fetchCompetitorRankings(competitor),
          content: await this.analyzeCompetitorContent(competitor),
          backlinks: await this.analyzeBacklinks(competitor),
          socialMedia: await this.analyzeSocialMedia(competitor),
          technicalSEO: await this.analyzeTechnicalSEO(competitor),
          opportunities: [],
        };

        // Identify opportunities based on gathered data
        intel.opportunities = await this.identifyOpportunities(intel, competitor);

        intelligence.push(intel);

        // Store in database
        await this.storeIntelligence(intel);
      } catch (error) {
        logger.error(`Failed to gather intelligence on ${competitor.name}:`, errorToLogMeta(error));
      }
    }

    return intelligence;
  }

  /**
   * Fetch competitor keyword rankings
   */
  private async fetchCompetitorRankings(competitor: Competitor): Promise<KeywordRanking[]> {
    const rankings: KeywordRanking[] = [];

    for (const keyword of this.MONITORING_TARGETS.keywords) {
      try {
        // In production, would use SERP API
        const position = await this.checkKeywordPosition(keyword, competitor.domain);

        // Get previous position for comparison
        const previousRanking = await this.getPreviousRanking(competitor.domain, keyword);

        rankings.push({
          keyword,
          position,
          change: previousRanking
            ? position - (previousRanking as { position: number }).position
            : 0,
          url: `https://${competitor.domain}/${this.guessRankingPage(keyword, competitor)}`,
        });
      } catch (error) {
        logger.warn(`Failed to check ranking for ${keyword}`);
      }
    }

    return rankings;
  }

  /**
   * Analyze competitor content strategy
   */
  private async analyzeCompetitorContent(competitor: Competitor): Promise<ContentAnalysis> {
    const content = {
      newPosts: [] as ContentPiece[],
      updatedPosts: [] as ContentPiece[],
      topPerformers: [] as ContentPiece[],
    };

    try {
      // Fetch blog/news section
      const blogUrl = `https://${competitor.domain}/blog`;
      const html = await this.webFetch.fetchHTML(blogUrl);
      const $ = cheerio.load(html);

      // Extract recent posts
      const posts: ContentPiece[] = [];

      $('.blog-post, article, .post').each((_, elem) => {
        const $elem = $(elem);
        const title = $elem.find('h1, h2, h3, .title').first().text().trim();
        const link = $elem.find('a').first().attr('href');
        const dateText = $elem.find('.date, time, .published').first().text().trim();

        if (title && link) {
          const fullUrl = link.startsWith('http') ? link : `https://${competitor.domain}${link}`;

          posts.push({
            url: fullUrl,
            title,
            publishDate: this.parseDate(dateText),
            wordCount: 0, // Would fetch and count
            keywords: this.extractKeywords(title),
            backlinks: 0, // Would check with backlink API
            socialShares: 0, // Would check social APIs
            estimatedTraffic: Math.floor(Math.random() * 1000), // Would use traffic estimation API
          });
        }
      });

      // Categorize posts
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      content.newPosts = posts.filter(p => p.publishDate > weekAgo);

      // Identify top performers (in production, would use actual metrics)
      content.topPerformers = posts
        .sort((a, b) => b.estimatedTraffic - a.estimatedTraffic)
        .slice(0, 5);

      // Check for content updates
      for (const post of posts.slice(0, 10)) {
        if (await this.hasContentBeenUpdated(post)) {
          content.updatedPosts.push(post);
        }
      }
    } catch (error) {
      logger.error(`Failed to analyze content for ${competitor.domain}:`, errorToLogMeta(error));
    }

    return content;
  }

  /**
   * Analyze competitor backlinks
   */
  private async analyzeBacklinks(competitor: Competitor): Promise<BacklinkAnalysis> {
    // In production, would use Ahrefs/Moz API
    const mockBacklinks = {
      total: Math.floor(Math.random() * 10000) + 1000,
      new: [
        {
          sourceUrl: 'https://charlotteobserver.com/article123',
          targetUrl: `https://${competitor.domain}`,
          anchorText: competitor.practiceAreas[0].replace('_', ' ') + ' lawyer',
          domainAuthority: 75,
          isDoFollow: true,
          dateFound: new Date(),
        },
      ],
      lost: [],
      quality: Math.floor(Math.random() * 30) + 70,
    };

    return mockBacklinks;
  }

  /**
   * Analyze competitor social media presence
   */
  private async analyzeSocialMedia(competitor: Competitor): Promise<SocialMediaProfile[]> {
    const socialProfiles: SocialMediaProfile[] = [];

    // Check major platforms
    const platforms = ['facebook', 'twitter', 'linkedin', 'instagram'];

    for (const platform of platforms) {
      try {
        const profile = await this.fetchSocialProfile(competitor, platform);
        if (profile) {
          socialProfiles.push(profile);
        }
      } catch (error) {
        logger.warn(`Failed to fetch ${platform} profile for ${competitor.name}`);
      }
    }

    return socialProfiles;
  }

  /**
   * Analyze technical SEO factors
   */
  private async analyzeTechnicalSEO(competitor: Competitor): Promise<TechnicalSEOAnalysis> {
    try {
      const homepage = `https://${competitor.domain}`;
      const html = await this.webFetch.fetchHTML(homepage);
      const $ = cheerio.load(html);

      // Extract technical SEO signals
      const technical = {
        siteSpeed: await this.measureSiteSpeed(homepage),
        mobileScore: await this.checkMobileScore(homepage),
        schemaMarkup: this.extractSchemaMarkup($),
        sslStatus: homepage.startsWith('https'),
      };

      return technical;
    } catch (error) {
      logger.error(
        `Failed to analyze technical SEO for ${competitor.domain}:`,
        errorToLogMeta(error)
      );
      return {
        siteSpeed: 0,
        mobileScore: 0,
        schemaMarkup: [],
        sslStatus: false,
      };
    }
  }

  /**
   * Identify opportunities based on competitor data
   */
  private async identifyOpportunities(
    intel: CompetitorIntelligence,
    competitor: Competitor
  ): Promise<Opportunity[]> {
    const opportunities: Opportunity[] = [];

    // Content gap opportunities
    const contentGaps = await this.findContentGaps(intel);
    opportunities.push(...contentGaps);

    // Keyword opportunities
    const keywordOpps = await this.findKeywordOpportunities(intel);
    opportunities.push(...keywordOpps);

    // Backlink opportunities
    const backlinkOpps = await this.findBacklinkOpportunities(intel);
    opportunities.push(...backlinkOpps);

    // Technical advantages
    const technicalOpps = await this.findTechnicalAdvantages(intel);
    opportunities.push(...technicalOpps);

    // Sort by priority and impact
    opportunities.sort((a, b) => {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      const aScore = priorityWeight[a.priority] * a.estimatedImpact;
      const bScore = priorityWeight[b.priority] * b.estimatedImpact;
      return bScore - aScore;
    });

    return opportunities;
  }

  /**
   * Execute daily intelligence gathering
   */
  private async executeDailyIntelligenceGathering(): Promise<void> {
    logger.info('📊 Executing daily intelligence gathering');

    const intelligence = await this.gatherCompetitorIntelligence();

    // Generate daily report
    const report = await this.generateDailyIntelligenceReport(intelligence);

    // Send alerts for significant changes
    await this.sendIntelligenceAlerts(report);
  }

  /**
   * Monitor competitor content in real-time
   */
  private async monitorCompetitorContent(): Promise<void> {
    logger.info('📝 Monitoring competitor content');

    for (const competitor of this.PRIMARY_COMPETITORS) {
      const newContent = await this.checkForNewContent(competitor);

      if (newContent.length > 0) {
        // Analyze and respond
        for (const content of newContent) {
          await this.analyzeAndRespond(content, competitor);
        }
      }
    }
  }

  /**
   * Check keyword rankings
   */
  private async checkKeywordRankings(): Promise<void> {
    logger.info('📈 Checking keyword rankings');

    const rankingChanges = [];

    for (const keyword of this.MONITORING_TARGETS.keywords) {
      const ourRanking = await this.checkKeywordPosition(keyword, 'vasquezlawfirm.com');

      for (const competitor of this.PRIMARY_COMPETITORS) {
        const theirRanking = await this.checkKeywordPosition(keyword, competitor.domain);

        if (theirRanking < ourRanking) {
          rankingChanges.push({
            keyword,
            ourPosition: ourRanking,
            competitor: competitor.name,
            theirPosition: theirRanking,
            gap: ourRanking - theirRanking,
          });
        }
      }
    }

    // Take action on ranking gaps
    for (const change of rankingChanges) {
      await this.addressRankingGap(change);
    }
  }

  /**
   * Execute deep competitive analysis
   */
  private async executeDeepCompetitiveAnalysis(): Promise<void> {
    logger.info('🔬 Executing deep competitive analysis');

    // Comprehensive analysis including:
    // - Full site audit
    // - Content inventory
    // - Link profile analysis
    // - Traffic estimation
    // - Conversion optimization tactics

    const deepAnalysis = await this.performDeepAnalysis();
    await this.generateStrategicRecommendations(deepAnalysis);
  }

  // Helper methods

  private async checkKeywordPosition(keyword: string, domain: string): Promise<number> {
    // In production, would use SERP API
    // Mock implementation
    return Math.floor(Math.random() * 50) + 1;
  }

  private async getPreviousRanking(
    domain: string,
    keyword: string
  ): Promise<{ position: number } | null> {
    // Fetch from database
    return null;
  }

  private guessRankingPage(keyword: string, competitor: Competitor): string {
    // Guess the likely ranking page based on keyword
    if (keyword.includes('immigration')) return 'immigration-lawyer';
    if (keyword.includes('personal injury')) return 'personal-injury-attorney';
    if (keyword.includes('workers comp')) return 'workers-compensation';
    return '';
  }

  private extractKeywords(text: string): string[] {
    // Simple keyword extraction
    const words = text.toLowerCase().split(/\s+/);
    const stopWords = new Set([
      'the',
      'a',
      'an',
      'and',
      'or',
      'but',
      'in',
      'on',
      'at',
      'to',
      'for',
    ]);
    return words.filter(w => !stopWords.has(w) && w.length > 3);
  }

  private parseDate(dateText: string): Date {
    // Parse various date formats
    const date = new Date(dateText);
    return isNaN(date.getTime()) ? new Date() : date;
  }

  private async hasContentBeenUpdated(post: ContentPiece): Promise<boolean> {
    // Check if content has been updated since last check
    // In production, would compare with previous version
    return Math.random() > 0.8;
  }

  private async fetchSocialProfile(
    competitor: Competitor,
    platform: string
  ): Promise<SocialMediaProfile | null> {
    // Mock social profile data
    return {
      platform,
      followers: Math.floor(Math.random() * 10000),
      engagement: Math.random() * 0.05,
      recentPosts: [],
    };
  }

  private async measureSiteSpeed(url: string): Promise<number> {
    // In production, would use PageSpeed Insights API
    return Math.random() * 5 + 1; // 1-6 seconds
  }

  private async checkMobileScore(url: string): Promise<number> {
    // In production, would use Mobile-Friendly Test API
    return Math.floor(Math.random() * 30) + 70; // 70-100
  }

  private extractSchemaMarkup($: cheerio.CheerioAPI): string[] {
    const schemas: string[] = [];

    $('script[type="application/ld+json"]').each((_, elem) => {
      try {
        const schema = JSON.parse($(elem).html() || '{}');
        if (schema['@type']) {
          schemas.push(schema['@type']);
        }
      } catch (error) {
        // Invalid JSON
      }
    });

    return schemas;
  }

  private async storeIntelligence(intel: CompetitorIntelligence): Promise<void> {
    await this.prisma.competitorAnalysis.create({
      data: {
        competitorId: intel.domain, // Using domain as ID
        domain: intel.domain,
        url: `https://${intel.domain}`,
        blogPosts: intel.content.newPosts as any, // Json type
        seoData: {
          rankings: intel.rankings,
          technical: intel.technicalSEO,
        } as any, // Json type
        backlinks: intel.backlinks as any, // Json type
        keywords: intel.rankings.map(r => ({ keyword: r.keyword, position: r.position })) as any, // Json type
        analyzedAt: new Date(),
      },
    });
  }

  private async findContentGaps(intel: CompetitorIntelligence): Promise<Opportunity[]> {
    const gaps: Opportunity[] = [];

    // Analyze topics they're covering that we're not
    const theirTopics = intel.content.topPerformers.map(p => p.keywords).flat();
    const uniqueTopics = [...new Set(theirTopics)];

    for (const topic of uniqueTopics) {
      const weHaveTopic = await this.checkIfWeHaveTopic(topic);

      if (!weHaveTopic) {
        gaps.push({
          type: 'content_gap',
          description: `Competitor ranks well for "${topic}" but we have no content`,
          priority: 'high',
          actionItems: [
            `Create comprehensive guide on ${topic}`,
            `Target long-tail variations of ${topic}`,
            `Build topic cluster around ${topic}`,
          ],
          estimatedImpact: 8,
        });
      }
    }

    return gaps;
  }

  private async findKeywordOpportunities(intel: CompetitorIntelligence): Promise<Opportunity[]> {
    const opportunities: Opportunity[] = [];

    // Find keywords where they rank poorly
    const weakKeywords = intel.rankings.filter(r => r.position > 20);

    for (const weak of weakKeywords) {
      opportunities.push({
        type: 'keyword_opportunity',
        description: `Competitor ranks #${weak.position} for "${weak.keyword}" - we can outrank`,
        priority: 'medium',
        actionItems: [
          `Create superior content for ${weak.keyword}`,
          `Build authoritative page targeting ${weak.keyword}`,
          `Acquire backlinks for ${weak.keyword} page`,
        ],
        estimatedImpact: 7,
      });
    }

    return opportunities;
  }

  private async findBacklinkOpportunities(intel: CompetitorIntelligence): Promise<Opportunity[]> {
    const opportunities: Opportunity[] = [];

    // Analyze their new backlinks
    for (const backlink of intel.backlinks.new) {
      if (backlink.domainAuthority > 50) {
        opportunities.push({
          type: 'backlink_opportunity',
          description: `High-authority link opportunity from ${backlink.sourceUrl}`,
          priority: 'high',
          actionItems: [
            `Reach out to ${new URL(backlink.sourceUrl).hostname}`,
            `Create similar content that earned the link`,
            `Build relationship with the publisher`,
          ],
          estimatedImpact: 9,
        });
      }
    }

    return opportunities;
  }

  private async findTechnicalAdvantages(intel: CompetitorIntelligence): Promise<Opportunity[]> {
    const opportunities: Opportunity[] = [];

    // Check for technical weaknesses
    if (intel.technicalSEO.siteSpeed > 3) {
      opportunities.push({
        type: 'technical_advantage',
        description: `Competitor site is slow (${intel.technicalSEO.siteSpeed}s) - we can provide better UX`,
        priority: 'medium',
        actionItems: [
          'Ensure our site loads under 2 seconds',
          'Highlight fast, mobile-friendly experience',
          'Use site speed in competitive comparisons',
        ],
        estimatedImpact: 6,
      });
    }

    if (intel.technicalSEO.mobileScore < 85) {
      opportunities.push({
        type: 'technical_advantage',
        description: `Competitor has poor mobile experience (${intel.technicalSEO.mobileScore}/100)`,
        priority: 'high',
        actionItems: [
          'Optimize our mobile experience to 95+',
          'Create mobile-first content',
          'Target mobile-specific keywords',
        ],
        estimatedImpact: 8,
      });
    }

    return opportunities;
  }

  private async checkIfWeHaveTopic(topic: string): Promise<boolean> {
    // Check our content database
    const ourContent = await this.prisma.blogPost.findFirst({
      where: {
        OR: [{ title: { contains: topic, mode: 'insensitive' } }, { keywords: { has: topic } }],
      },
    });

    return !!ourContent;
  }

  private async generateDailyIntelligenceReport(
    intelligence: CompetitorIntelligence[]
  ): Promise<DailyIntelligenceReport> {
    const report = {
      date: new Date(),
      competitors: intelligence.length,
      keyFindings: [] as string[],
      urgentActions: [] as string[],
      opportunities: [] as Opportunity[],
    };

    for (const intel of intelligence) {
      // Key findings
      if (intel.content.newPosts.length > 0) {
        report.keyFindings.push(
          `${intel.domain} published ${intel.content.newPosts.length} new posts`
        );
      }

      // Urgent actions
      const urgentOpps = intel.opportunities.filter(o => o.priority === 'high');
      report.urgentActions.push(...urgentOpps.map(o => o.description));

      // All opportunities
      report.opportunities.push(...intel.opportunities);
    }

    return report;
  }

  private async sendIntelligenceAlerts(report: DailyIntelligenceReport): Promise<void> {
    if (report.urgentActions.length > 0) {
      logger.warn('🚨 URGENT Competitor Intelligence:', { urgentActions: report.urgentActions });

      // In production, would send email/Slack alerts
    }
  }

  private async checkForNewContent(competitor: Competitor): Promise<ContentPiece[]> {
    // Check for content published in last hour
    const recentContent = [];

    try {
      const content = await this.analyzeCompetitorContent(competitor);
      const hourAgo = new Date(Date.now() - 60 * 60 * 1000);

      return content.newPosts.filter((post: ContentPiece) => post.publishDate > hourAgo);
    } catch (error) {
      logger.error(`Failed to check new content for ${competitor.name}:`, errorToLogMeta(error));
      return [];
    }
  }

  private async analyzeAndRespond(content: ContentPiece, competitor: Competitor): Promise<void> {
    logger.info(`🎯 Analyzing new content from ${competitor.name}: ${content.title}`);

    // Determine response strategy
    const strategy = await this.determineResponseStrategy(content, competitor);

    if (strategy.action === 'counter') {
      // Create better content immediately
      await this.createCounterContent(content, strategy);
    } else if (strategy.action === 'monitor') {
      // Track performance
      await this.trackContentPerformance(content);
    }
  }

  private async determineResponseStrategy(
    content: ContentPiece,
    competitor: Competitor
  ): Promise<ResponseStrategy> {
    // Use AI to determine best response
    const prompt = `
Competitor ${competitor.name} just published:
Title: ${content.title}
Keywords: ${content.keywords.join(', ')}
Estimated Traffic: ${content.estimatedTraffic}

Should we:
1. Counter with better content immediately
2. Monitor and wait
3. Ignore

Consider our resources and potential impact.
`;

    const response = await this.model.invoke([
      new SystemMessage('You are a competitive SEO strategist.'),
      new HumanMessage(prompt),
    ]);

    // Parse response and return strategy
    return {
      action: 'counter', // or 'monitor' or 'ignore'
      reason: 'High-value topic with traffic potential',
    };
  }

  private async createCounterContent(
    competitorContent: ContentPiece,
    strategy: ResponseStrategy
  ): Promise<void> {
    logger.info(`🔥 Creating counter-content for: ${competitorContent.title}`);

    // Generate superior content immediately
    // This would trigger the blog content domination agent
  }

  private async trackContentPerformance(content: ContentPiece): Promise<void> {
    // Track competitor content performance over time
    logger.info(`📊 Tracking performance of: ${content.title}`);
  }

  private async addressRankingGap(gap: RankingGap): Promise<void> {
    logger.info(
      `📉 Addressing ranking gap for "${gap.keyword}" - We're #${gap.ourPosition}, ${gap.competitor} is #${gap.theirPosition}`
    );

    // Trigger content optimization or creation
  }

  private async performDeepAnalysis(): Promise<DeepAnalysis> {
    // Comprehensive competitive analysis
    return {
      marketShare: await this.estimateMarketShare(),
      contentStrategy: await this.reverseEngineerContentStrategy(),
      linkBuilding: await this.analyzeLinkBuildingTactics(),
      conversionTactics: await this.identifyConversionTactics(),
    };
  }

  private async estimateMarketShare(): Promise<MarketShareAnalysis> {
    // Estimate market share based on rankings and traffic
    return {
      vasquezLawFirm: 15,
      competitors: {
        brentAdams: 25,
        hardwickLaw: 20,
        whitleyLaw: 15,
        others: 25,
      },
    };
  }

  private async reverseEngineerContentStrategy(): Promise<ContentStrategyAnalysis> {
    // Analyze content patterns and strategy
    return {
      publishingFrequency: 'weekly',
      contentTypes: ['blog posts', 'case studies', 'FAQs'],
      topicClusters: ['personal injury', 'workers comp', 'car accidents'],
    };
  }

  private async analyzeLinkBuildingTactics(): Promise<LinkBuildingAnalysis> {
    // Identify link building strategies
    return {
      tactics: ['guest posting', 'local citations', 'press releases'],
      linkVelocity: 50, // links per month
      anchorTextDistribution: {
        branded: 40,
        exact: 20,
        partial: 25,
        generic: 15,
      },
    };
  }

  private async identifyConversionTactics(): Promise<ConversionTacticsAnalysis> {
    // Analyze conversion optimization tactics
    return {
      ctaTypes: ['free consultation', 'case evaluation', 'download guide'],
      trustSignals: ['testimonials', 'case results', 'badges'],
      urgencyTactics: ['limited time', '24/7 availability', 'act now'],
    };
  }

  private async generateStrategicRecommendations(analysis: DeepAnalysis): Promise<void> {
    const recommendations = {
      immediate: [
        'Counter top competitor content within 48 hours',
        'Acquire links from their top referring domains',
        'Implement missing schema markup',
      ],
      shortTerm: [
        'Close content gaps in high-traffic topics',
        'Improve site speed to beat competitors',
        'Launch targeted PPC campaigns for their branded terms',
      ],
      longTerm: [
        'Build superior topical authority',
        'Develop unique content formats they lack',
        "Create strategic partnerships they don't have",
      ],
    };

    logger.info('📋 Strategic Recommendations Generated:', recommendations);
  }

  /**
   * Analyze content strategies across competitors
   */
  private async analyzeContentStrategies(intelligence: CompetitorIntelligence[]): Promise<void> {
    // Aggregate content patterns
    const patterns = {
      averagePostsPerWeek: 0,
      topPerformingTopics: [] as string[],
      contentFormats: new Set<string>(),
      averageWordCount: 0,
    };

    for (const intel of intelligence) {
      patterns.averagePostsPerWeek += intel.content.newPosts.length / 7;
      intel.content.topPerformers.forEach(post => {
        patterns.topPerformingTopics.push(...post.keywords);
      });
    }

    patterns.averagePostsPerWeek /= intelligence.length;

    logger.info('📊 Content Strategy Analysis:', {
      avgPostsPerWeek: patterns.averagePostsPerWeek.toFixed(1),
      trendingTopics: [...new Set(patterns.topPerformingTopics)].slice(0, 10),
    });
  }

  /**
   * Track ranking movements across all keywords
   */
  private async trackRankingMovements(intelligence: CompetitorIntelligence[]): Promise<void> {
    const movements = {
      gained: [] as Array<KeywordRanking & { domain: string }>,
      lost: [] as Array<KeywordRanking & { domain: string }>,
      newEntrants: [] as Array<KeywordRanking & { domain: string }>,
    };

    for (const intel of intelligence) {
      for (const ranking of intel.rankings) {
        if (ranking.change > 0) {
          movements.gained.push({ ...ranking, domain: intel.domain });
        } else if (ranking.change < 0) {
          movements.lost.push({ ...ranking, domain: intel.domain });
        }

        if (ranking.position <= 10 && ranking.change > 5) {
          movements.newEntrants.push({ ...ranking, domain: intel.domain });
        }
      }
    }

    // Alert on significant movements
    if (movements.newEntrants.length > 0) {
      logger.warn('🚨 New competitors in top 10:', { newEntrants: movements.newEntrants });
    }
  }

  /**
   * Discover backlink opportunities from competitor profiles
   */
  private async discoverBacklinkOpportunities(
    intelligence: CompetitorIntelligence[]
  ): Promise<void> {
    const opportunities = new Map<string, Set<string>>();

    for (const intel of intelligence) {
      for (const backlink of intel.backlinks.new) {
        if (backlink.domainAuthority > 40) {
          const domain = new URL(backlink.sourceUrl).hostname;
          if (!opportunities.has(domain)) {
            opportunities.set(domain, new Set());
          }
          opportunities.get(domain)!.add(intel.domain);
        }
      }
    }

    // Find domains linking to multiple competitors but not us
    const highValueTargets = Array.from(opportunities.entries())
      .filter(([domain, competitors]) => competitors.size >= 2)
      .map(([domain, competitors]) => ({
        domain,
        competitorsLinked: Array.from(competitors),
        priority: competitors.size,
      }));

    logger.info(`🔗 Found ${highValueTargets.length} high-value backlink opportunities`);
  }

  /**
   * Identify competitor weaknesses to exploit
   */
  private async identifyCompetitorWeaknesses(
    intelligence: CompetitorIntelligence[]
  ): Promise<void> {
    const weaknesses = [];

    for (const intel of intelligence) {
      // Technical weaknesses
      if (intel.technicalSEO.siteSpeed > 3) {
        weaknesses.push({
          domain: intel.domain,
          type: 'technical',
          issue: 'slow site speed',
          exploitation: 'Emphasize our fast, mobile-first experience',
        });
      }

      // Content weaknesses
      if (intel.content.newPosts.length === 0) {
        weaknesses.push({
          domain: intel.domain,
          type: 'content',
          issue: 'no recent content',
          exploitation: 'Dominate with fresh, relevant content',
        });
      }

      // Ranking weaknesses
      const poorRankings = intel.rankings.filter(r => r.position > 20);
      if (poorRankings.length > 5) {
        weaknesses.push({
          domain: intel.domain,
          type: 'rankings',
          issue: `weak for ${poorRankings.length} keywords`,
          exploitation: 'Target these keywords aggressively',
        });
      }
    }

    logger.info(`🎯 Identified ${weaknesses.length} competitor weaknesses to exploit`);
  }

  /**
   * Generate counter-strategies based on intelligence
   */
  private async generateCounterStrategies(intelligence: CompetitorIntelligence[]): Promise<void> {
    for (const intel of intelligence) {
      const strategies = [];

      // Content counters
      for (const post of intel.content.topPerformers) {
        strategies.push({
          type: 'content',
          action: `Create superior version of "${post.title}"`,
          timeline: 'within 48 hours',
          resources: 'content team + SEO',
        });
      }

      // Ranking counters
      const theyRankWeRankNot = intel.rankings.filter(r => r.position <= 10);
      for (const ranking of theyRankWeRankNot.slice(0, 5)) {
        strategies.push({
          type: 'seo',
          action: `Outrank for "${ranking.keyword}"`,
          timeline: '30 days',
          resources: 'SEO team',
        });
      }

      logger.info(`⚔️ Generated ${strategies.length} counter-strategies for ${intel.domain}`);
    }
  }

  /**
   * Alert on urgent opportunities that need immediate action
   */
  private async alertOnUrgentOpportunities(intelligence: CompetitorIntelligence[]): Promise<void> {
    const urgentAlerts = [];

    for (const intel of intelligence) {
      // New high-value content
      const viralContent = intel.content.newPosts.filter(p => p.estimatedTraffic > 1000);
      if (viralContent.length > 0) {
        urgentAlerts.push({
          type: 'viral_content',
          competitor: intel.domain,
          action: 'Create counter-content immediately',
          details: viralContent,
        });
      }

      // Major ranking gains
      const bigGains = intel.rankings.filter(r => r.change < -10); // They moved up 10+ positions
      if (bigGains.length > 0) {
        urgentAlerts.push({
          type: 'ranking_threat',
          competitor: intel.domain,
          action: 'Defend rankings',
          details: bigGains,
        });
      }

      // New high-authority backlinks
      const powerLinks = intel.backlinks.new.filter(b => b.domainAuthority > 70);
      if (powerLinks.length > 0) {
        urgentAlerts.push({
          type: 'link_opportunity',
          competitor: intel.domain,
          action: 'Acquire same links',
          details: powerLinks,
        });
      }
    }

    if (urgentAlerts.length > 0) {
      logger.error('🚨 URGENT COMPETITIVE ALERTS:', { urgentAlerts });
      // In production, would send immediate notifications
    }
  }
}
