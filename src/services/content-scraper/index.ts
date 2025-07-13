import { componentLogger, performanceLogger } from '@/lib/logger';
import { getPrismaClient } from '@/lib/prisma';
import puppeteer from 'puppeteer';
import { google } from 'googleapis';
import axios from 'axios';

export interface ScraperConfig {
  youtube: {
    apiKey: string;
    channelIds: string[];
  };
  tiktok: {
    sessionId: string;
    hashtags: string[];
  };
  instagram: {
    accessToken: string;
    hashtags: string[];
  };
  facebook: {
    accessToken: string;
    pageIds: string[];
  };
}

export interface ScrapedContent {
  platform: string;
  url: string;
  title: string;
  description: string;
  engagement: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
  publishedAt: Date;
  author: string;
  hashtags: string[];
  practiceArea?: string;
  relevanceScore: number;
}

export class ContentScraper {
  private config: ScraperConfig;
  private youtube: typeof import('googleapis').google.youtube_v3.Youtube | null = null;
  private browser: import('puppeteer').Browser | null = null;

  constructor(config: ScraperConfig) {
    this.config = config;
    this.youtube = google.youtube({
      version: 'v3',
      auth: config.youtube.apiKey,
    });
  }

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }

  async scrapeYouTube(query: string): Promise<ScrapedContent[]> {
    componentLogger.info('ContentScraper.scrapeYouTube', { query });

    try {
      // Search for videos
      const searchResponse = await this.youtube.search.list({
        part: ['snippet'],
        q: query,
        type: ['video'],
        maxResults: 50,
        order: 'viewCount',
        publishedAfter: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // Last 7 days
      });

      const videoIds = searchResponse.data.items.map(item => item.id?.videoId).filter(Boolean);

      // Get video statistics
      const statsResponse = await this.youtube.videos.list({
        part: ['statistics', 'snippet'],
        id: videoIds,
      });

      const content: ScrapedContent[] = [];

      for (const video of statsResponse.data.items) {
        const stats = video.statistics;
        const snippet = video.snippet;

        // Calculate engagement rate
        const views = parseInt(stats.viewCount || '0');
        const likes = parseInt(stats.likeCount || '0');
        const comments = parseInt(stats.commentCount || '0');
        const engagementRate = views > 0 ? ((likes + comments) / views) * 100 : 0;

        // Determine relevance
        const relevanceScore = await this.calculateRelevance(
          snippet.title,
          snippet.description,
          query
        );

        if (relevanceScore > 0.7 || engagementRate > 5) {
          content.push({
            platform: 'youtube',
            url: `https://youtube.com/watch?v=${video.id}`,
            title: snippet.title,
            description: snippet.description,
            engagement: {
              views,
              likes,
              comments,
              shares: 0, // YouTube doesn't provide share count
            },
            publishedAt: new Date(snippet.publishedAt),
            author: snippet.channelTitle,
            hashtags: this.extractHashtags(snippet.description),
            relevanceScore,
            practiceArea: await this.detectPracticeArea(snippet.title + ' ' + snippet.description),
          });
        }
      }

      // Save to database
      await this.saveScrapedContent(content);

      return content;
    } catch (error) {
      componentLogger.error('ContentScraper.scrapeYouTube', error as Error, { query });
      throw error;
    }
  }

  async scrapeTikTok(hashtag: string): Promise<ScrapedContent[]> {
    componentLogger.info('ContentScraper.scrapeTikTok', { hashtag });

    if (!this.browser) {
      throw new Error('Browser not initialized');
    }

    try {
      const page = await this.browser.newPage();

      // Set cookies for authentication
      await page.setCookie({
        name: 'sessionid',
        value: this.config.tiktok.sessionId,
        domain: '.tiktok.com',
      });

      // Navigate to hashtag page
      await page.goto(`https://www.tiktok.com/tag/${hashtag}`, {
        waitUntil: 'networkidle2',
      });

      // Wait for content to load
      await page.waitForSelector('[data-e2e="challenge-item"]', { timeout: 10000 });

      // Extract video data
      const videos = await page.evaluate(() => {
        const items = document.querySelectorAll('[data-e2e="challenge-item"]');
        const data: Record<string, unknown>[] = [];

        items.forEach(item => {
          const link = item.querySelector('a');
          const stats = item.querySelectorAll('[data-e2e="video-views"], [data-e2e="video-likes"]');

          if (link && stats.length >= 2) {
            data.push({
              url: link.href,
              views: parseInt(stats[0].textContent?.replace(/[^\d]/g, '') || '0'),
              likes: parseInt(stats[1].textContent?.replace(/[^\d]/g, '') || '0'),
            });
          }
        });

        return data;
      });

      const content: ScrapedContent[] = [];

      // Get detailed information for top videos
      for (const video of videos.slice(0, 10)) {
        await page.goto(video.url, { waitUntil: 'networkidle2' });

        const details = await page.evaluate(() => {
          const title = document.querySelector('[data-e2e="browse-video-desc"]')?.textContent || '';
          const author = document.querySelector('[data-e2e="browse-username"]')?.textContent || '';
          const comments = document.querySelector('[data-e2e="comment-count"]')?.textContent || '0';
          const shares = document.querySelector('[data-e2e="share-count"]')?.textContent || '0';

          return {
            title,
            author,
            comments: parseInt(comments.replace(/[^\d]/g, '') || '0'),
            shares: parseInt(shares.replace(/[^\d]/g, '') || '0'),
          };
        });

        const relevanceScore = await this.calculateRelevance(details.title, '', hashtag);

        content.push({
          platform: 'tiktok',
          url: video.url,
          title: details.title,
          description: '',
          engagement: {
            views: video.views,
            likes: video.likes,
            comments: details.comments,
            shares: details.shares,
          },
          publishedAt: new Date(), // TikTok doesn't easily provide publish date
          author: details.author,
          hashtags: this.extractHashtags(details.title),
          relevanceScore,
          practiceArea: await this.detectPracticeArea(details.title),
        });
      }

      await page.close();
      await this.saveScrapedContent(content);

      return content;
    } catch (error) {
      componentLogger.error('ContentScraper.scrapeTikTok', error as Error, { hashtag });
      throw error;
    }
  }

  async scrapeInstagram(hashtag: string): Promise<ScrapedContent[]> {
    componentLogger.info('ContentScraper.scrapeInstagram', { hashtag });

    try {
      // Instagram Graph API
      const response = await axios.get(`https://graph.instagram.com/v17.0/ig_hashtag_search`, {
        params: {
          user_id: 'self',
          q: hashtag,
          access_token: this.config.instagram.accessToken,
        },
      });

      const hashtagId = response.data.data[0]?.id;

      if (!hashtagId) {
        throw new Error('Hashtag not found');
      }

      // Get recent media
      const mediaResponse = await axios.get(
        `https://graph.instagram.com/v17.0/${hashtagId}/recent_media`,
        {
          params: {
            user_id: 'self',
            fields: 'id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count',
            access_token: this.config.instagram.accessToken,
          },
        }
      );

      const content: ScrapedContent[] = [];

      for (const post of mediaResponse.data.data) {
        const relevanceScore = await this.calculateRelevance(post.caption || '', '', hashtag);

        content.push({
          platform: 'instagram',
          url: post.permalink,
          title: post.caption?.substring(0, 100) || '',
          description: post.caption || '',
          engagement: {
            views: 0, // Instagram doesn't provide view count for posts
            likes: post.like_count || 0,
            comments: post.comments_count || 0,
            shares: 0, // Instagram doesn't provide share count
          },
          publishedAt: new Date(post.timestamp),
          author: 'Unknown', // Would need additional API call
          hashtags: this.extractHashtags(post.caption || ''),
          relevanceScore,
          practiceArea: await this.detectPracticeArea(post.caption || ''),
        });
      }

      await this.saveScrapedContent(content);
      return content;
    } catch (error) {
      componentLogger.error('ContentScraper.scrapeInstagram', error as Error, { hashtag });
      throw error;
    }
  }

  async scrapeFacebook(pageId: string): Promise<ScrapedContent[]> {
    componentLogger.info('ContentScraper.scrapeFacebook', { pageId });

    try {
      // Facebook Graph API
      const response = await axios.get(`https://graph.facebook.com/v17.0/${pageId}/posts`, {
        params: {
          fields:
            'message,created_time,permalink_url,shares,reactions.summary(true),comments.summary(true)',
          access_token: this.config.facebook.accessToken,
          limit: 50,
        },
      });

      const content: ScrapedContent[] = [];

      for (const post of response.data.data) {
        if (!post.message) continue;

        const relevanceScore = await this.calculateRelevance(post.message, '', '');

        content.push({
          platform: 'facebook',
          url: post.permalink_url,
          title: post.message.substring(0, 100),
          description: post.message,
          engagement: {
            views: 0, // Facebook doesn't provide view count
            likes: post.reactions?.summary?.total_count || 0,
            comments: post.comments?.summary?.total_count || 0,
            shares: post.shares?.count || 0,
          },
          publishedAt: new Date(post.created_time),
          author: pageId,
          hashtags: this.extractHashtags(post.message),
          relevanceScore,
          practiceArea: await this.detectPracticeArea(post.message),
        });
      }

      await this.saveScrapedContent(content);
      return content;
    } catch (error) {
      componentLogger.error('ContentScraper.scrapeFacebook', error as Error, { pageId });
      throw error;
    }
  }

  async scrapeCompetitorWebsite(url: string): Promise<{
    title: string;
    description: string;
    keywords: string[];
    headings: { h1: string[]; h2: string[]; h3: string[] };
    images: Array<{ src: string; alt: string }>;
    links: Array<{ href: string; text: string }>;
    structuredData: Record<string, unknown>;
  }> {
    componentLogger.info('ContentScraper.scrapeCompetitorWebsite', { url });

    if (!this.browser) {
      throw new Error('Browser not initialized');
    }

    try {
      const page = await this.browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2' });

      // Extract all blog posts
      const blogPosts = await page.evaluate(() => {
        const posts: unknown[] = [];

        // Common blog selectors
        const selectors = [
          'article',
          '.blog-post',
          '.post',
          '[class*="blog"]',
          '[class*="article"]',
        ];

        for (const selector of selectors) {
          const elements = document.querySelectorAll(selector);

          elements.forEach(element => {
            const title = element.querySelector('h1, h2, h3')?.textContent?.trim();
            const link = element.querySelector('a')?.href;
            const excerpt = element.querySelector('p')?.textContent?.trim();
            const date = element.querySelector('time, [class*="date"]')?.textContent?.trim();

            if (title && link) {
              posts.push({ title, link, excerpt, date });
            }
          });

          if (posts.length > 0) break;
        }

        return posts;
      });

      // Extract meta tags for SEO analysis
      const seoData = await page.evaluate(() => {
        const title = document.querySelector('title')?.textContent;
        const metaDescription = document
          .querySelector('meta[name="description"]')
          ?.getAttribute('content');
        const metaKeywords = document
          .querySelector('meta[name="keywords"]')
          ?.getAttribute('content');
        const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
        const ogTitle = document
          .querySelector('meta[property="og:title"]')
          ?.getAttribute('content');
        const ogDescription = document
          .querySelector('meta[property="og:description"]')
          ?.getAttribute('content');

        // Schema.org structured data
        const schemas = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
          .map(script => {
            try {
              return JSON.parse(script.textContent || '');
            } catch {
              return null;
            }
          })
          .filter(Boolean);

        return {
          title,
          metaDescription,
          metaKeywords,
          canonical,
          ogTitle,
          ogDescription,
          schemas,
        };
      });

      await page.close();

      // Save competitor analysis
      const urlObj = new URL(url);
      await getPrismaClient().competitorAnalysis.create({
        data: {
          url,
          domain: urlObj.hostname,
          blogPosts: JSON.stringify(blogPosts),
          seoData: JSON.stringify(seoData),
          analyzedAt: new Date(),
        },
      });

      return {
        url,
        blogPosts,
        seoData,
        totalPosts: blogPosts.length,
      };
    } catch (error) {
      componentLogger.error('ContentScraper.scrapeCompetitorWebsite', error as Error, { url });
      throw error;
    }
  }

  private async calculateRelevance(
    title: string,
    description: string,
    query: string
  ): Promise<number> {
    // Simple relevance calculation - can be enhanced with ML
    const text = `${title} ${description}`.toLowerCase();
    const queryTerms = query.toLowerCase().split(' ');

    let matches = 0;
    for (const term of queryTerms) {
      if (text.includes(term)) {
        matches++;
      }
    }

    // Legal keywords boost
    const legalKeywords = [
      'law',
      'legal',
      'attorney',
      'lawyer',
      'court',
      'case',
      'rights',
      'ley',
      'legal',
      'abogado',
      'corte',
      'caso',
      'derechos',
    ];

    const legalMatches = legalKeywords.filter(keyword => text.includes(keyword)).length;

    return Math.min(1, matches / queryTerms.length + legalMatches * 0.1);
  }

  private extractHashtags(text: string): string[] {
    const hashtags = text.match(/#[a-zA-Z0-9_]+/g) || [];
    return hashtags.map(tag => tag.substring(1));
  }

  private async detectPracticeArea(text: string): Promise<string | undefined> {
    const practiceAreaKeywords = {
      immigration: [
        'immigration',
        'visa',
        'green card',
        'citizenship',
        'inmigración',
        'ciudadanía',
      ],
      'personal-injury': [
        'accident',
        'injury',
        'compensation',
        'accidente',
        'lesión',
        'compensación',
      ],
      'workers-compensation': [
        'workers comp',
        'workplace injury',
        'compensación laboral',
        'lesión laboral',
      ],
      'criminal-defense': ['criminal', 'arrest', 'dui', 'dwi', 'criminal', 'arresto'],
      'family-law': ['divorce', 'custody', 'child support', 'divorcio', 'custodia', 'manutención'],
      'traffic-violations': ['traffic', 'speeding', 'ticket', 'tráfico', 'multa', 'velocidad'],
    };

    const lowercaseText = text.toLowerCase();

    for (const [area, keywords] of Object.entries(practiceAreaKeywords)) {
      if (keywords.some(keyword => lowercaseText.includes(keyword))) {
        return area;
      }
    }

    return undefined;
  }

  private async saveScrapedContent(content: ScrapedContent[]) {
    for (const item of content) {
      try {
        await getPrismaClient().scrapedContent.upsert({
          where: { url: item.url },
          update: {
            engagement: item.engagement,
            relevanceScore: item.relevanceScore,
            updatedAt: new Date(),
          },
          create: {
            platform: item.platform,
            url: item.url,
            title: item.title,
            description: item.description,
            engagement: item.engagement,
            publishedAt: item.publishedAt,
            author: item.author,
            hashtags: item.hashtags,
            practiceArea: item.practiceArea,
            relevanceScore: item.relevanceScore,
          },
        });
      } catch (error) {
        componentLogger.error('ContentScraper.saveScrapedContent', error as Error, {
          url: item.url,
        });
      }
    }

    performanceLogger.operation('content-scraped', { count: content.length });
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}
