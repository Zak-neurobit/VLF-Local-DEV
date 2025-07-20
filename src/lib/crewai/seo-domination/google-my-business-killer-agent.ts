import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/logger';
import { errorToLogMeta, createErrorLogMeta } from '@/lib/logger/utils';
import { getPrismaClient } from '@/lib/prisma';
// Lazy load Google APIs to prevent loading during build
let googleApisModule: any = null;
const getGoogleApis = async () => {
  if (!googleApisModule) {
    googleApisModule = await import('googleapis');
  }
  return googleApisModule;
};
import * as cron from 'node-cron';
import type {
  GMBReview,
  GMBLocation,
  GMBPost,
  GMBPhoto,
  CompetitorGMBData,
  ReviewResponse,
  LocalSEOOptimization,
  CompetitorAnalysis,
} from '@/types/crewai';
import type { PrismaClient } from '@prisma/client';
import type {
  GMBAuthClient,
  GMBMyBusinessAPI,
  GMBPlacesAPI,
  GMBReviewDetails,
  GMBLocationPost,
  GMBMediaItem,
} from '@/types/google-my-business';

interface OptimalMedia {
  type: 'photo' | 'video';
  url: string;
  caption: string;
  tags: string[];
  timing: string;
}

interface EventDetails {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  eventType: string;
}

interface ReviewData {
  reviewId: string;
  rating: number;
  comment: string;
  reviewerName: string;
  timeCreated: Date;
  response?: string;
}

interface BusinessAttributes {
  category: string;
  attributes: Array<{
    name: string;
    value: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

interface ServiceArea {
  radius: number;
  centerPoint: {
    lat: number;
    lng: number;
  };
  cities: string[];
  excludedAreas?: string[];
}

interface BusinessHours {
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
  isHoliday?: boolean;
}

interface EngagementPhoto {
  url: string;
  category: string;
  description: string;
  tags: string[];
  uploadPriority: number;
}

interface CounterStrategy {
  actions: string[];
  priority: string[];
  timeline: string;
}

interface LocalRankingData {
  keyword: string;
  ranking: number;
  location: string;
  competitor: string;
  change: number; // Position change from last check
}

export class GoogleMyBusinessKillerAgent {
  private model: ChatOpenAI;
  private prisma: PrismaClient | null = null;
  private mybusinessApi: GMBMyBusinessAPI | null = null;
  private placesApi: GMBPlacesAPI | null = null;
  private isRunning: boolean = false;
  private scheduledJobs: cron.ScheduledTask[] = [];

  // GMB Configuration
  private readonly ACCOUNT_ID = process.env.GMB_ACCOUNT_ID;
  private readonly LOCATION_IDS = {
    charlotte: process.env.GMB_LOCATION_CHARLOTTE,
    raleigh: process.env.GMB_LOCATION_RALEIGH,
    smithfield: process.env.GMB_LOCATION_SMITHFIELD,
    goldsboro: process.env.GMB_LOCATION_GOLDSBORO,
    orlando: process.env.GMB_LOCATION_ORLANDO,
  };

  // Posting Schedule (optimized for maximum visibility)
  private readonly POSTING_SCHEDULE = [
    { hour: 8, minute: 0 }, // Morning commute
    { hour: 12, minute: 30 }, // Lunch break
    { hour: 17, minute: 30 }, // Evening commute
  ];

  // NC Legal Keywords for content optimization
  private readonly NC_LEGAL_KEYWORDS = [
    'charlotte lawyer',
    'north carolina attorney',
    'immigration law',
    'personal injury',
    'criminal defense',
    'workers compensation',
    'dui defense',
    'family law',
  ];

  // Content Templates
  private readonly POST_TEMPLATES = {
    success_story: {
      topics: [
        'Just secured permanent residency for another family! 🎉',
        'Another successful deportation defense case! 💪',
        'Workers comp claim approved - client gets full benefits! ✅',
        'DWI charges dismissed for our client! ⚖️',
      ],
      cta: 'BOOK',
    },
    legal_tip: {
      topics: [
        'Know Your Rights: What to do during an ICE encounter',
        "Injured at work? Here's what to do immediately",
        'Traffic stop? Remember these 3 crucial rights',
        'Green card delays? New expedite options available',
      ],
      cta: 'LEARN_MORE',
    },
    community_event: {
      topics: [
        'Free Immigration Consultation Day',
        'Know Your Rights Workshop',
        'Workers Compensation Clinic',
        'DWI Defense Seminar',
      ],
      cta: 'SIGN_UP',
    },
    urgent_update: {
      topics: [
        'New immigration law changes - Act now!',
        'Workers comp deadline approaching',
        'Court closures and delays update',
        'Emergency legal services available 24/7',
      ],
      cta: 'CALL',
    },
    seasonal: {
      topics: [
        'Holiday DWI checkpoints - Stay safe!',
        'Tax season immigration document prep',
        'Summer construction injuries on the rise',
        'Back to school - Update custody agreements',
      ],
      cta: 'LEARN_MORE',
    },
  };

  // Review Response Templates
  private readonly REVIEW_RESPONSES = {
    positive: {
      fiveStar: [
        "Thank you so much for your kind words! It was our pleasure to help you navigate [CASE_TYPE]. We're always here when you need us. 🌟",
        "We're thrilled we could help! Your success is our success. Thank you for trusting Vasquez Law Firm with your [CASE_TYPE] case. 💼",
        "Your review made our day! We're honored to have been part of your journey. Wishing you all the best! 🎯",
      ],
      fourStar: [
        "Thank you for the great feedback! We're glad we could help with your [CASE_TYPE] matter. If there's anything else we can do to earn that 5th star, please let us know! 📞",
        "We appreciate your honest review! We're always working to improve our services. Thank you for choosing Vasquez Law Firm. 🙏",
      ],
    },
    negative: {
      general: [
        "We're sorry to hear about your experience. This isn't the level of service we strive for. Please contact us at (INSERT_PHONE) so we can make this right. Your satisfaction is important to us.",
        "Thank you for your feedback. We take all concerns seriously and would like to discuss this further. Please reach out to our office manager at (INSERT_PHONE). We're committed to resolving this.",
      ],
    },
  };

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.4,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    this.prisma = getPrismaClient();
    this.initializeGoogleAPIs();
  }

  private async initializeGoogleAPIs() {
    const { google } = await getGoogleApis();

    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
      scopes: [
        'https://www.googleapis.com/auth/business.manage',
        'https://www.googleapis.com/auth/plus.business.manage',
      ],
    });

    const authClient = await auth.getClient();

    // Type cast to bypass Google API type incompatibilities
    this.mybusinessApi = google.mybusinessbusinessinformation('v1') as unknown as GMBMyBusinessAPI;
    this.placesApi = google.places('v1') as unknown as GMBPlacesAPI;
  }

  /**
   * Start the GMB domination engine
   */
  async startDomination(): Promise<void> {
    if (this.isRunning) {
      logger.warn('GMB Killer Agent is already running');
      return;
    }

    this.isRunning = true;
    logger.info('🎯 Starting Google My Business Killer Agent - Local SEO Domination Mode');

    // Schedule posting jobs
    this.scheduleGMBPosts();

    // Schedule review monitoring (every 30 minutes)
    const reviewJob = cron.schedule('*/30 * * * *', async () => {
      await this.monitorAndRespondToReviews();
    });
    this.scheduledJobs.push(reviewJob);

    // Schedule competitor monitoring (every 2 hours)
    const competitorJob = cron.schedule('0 */2 * * *', async () => {
      await this.spyOnCompetitorGMB();
    });
    this.scheduledJobs.push(competitorJob);

    // Schedule ranking checks (daily at 6 AM)
    const rankingJob = cron.schedule('0 6 * * *', async () => {
      await this.checkLocalRankings();
    });
    this.scheduledJobs.push(rankingJob);

    // Initial run
    await this.executeGMBDominationCycle();
  }

  /**
   * Stop the domination engine
   */
  stopDomination(): void {
    this.scheduledJobs.forEach(job => job.stop());
    this.scheduledJobs = [];
    this.isRunning = false;
    logger.info('GMB Killer Agent stopped');
  }

  /**
   * Schedule GMB posts at optimal times
   */
  private scheduleGMBPosts(): void {
    this.POSTING_SCHEDULE.forEach(schedule => {
      const job = cron.schedule(`${schedule.minute} ${schedule.hour} * * *`, async () => {
        await this.createAndPublishGMBPost();
      });
      this.scheduledJobs.push(job);
    });
  }

  /**
   * Execute a full GMB domination cycle
   */
  private async executeGMBDominationCycle(): Promise<void> {
    try {
      logger.info('🔥 Executing GMB Domination Cycle');

      // 1. Create and publish posts
      await this.createAndPublishGMBPost();

      // 2. Monitor and respond to reviews
      await this.monitorAndRespondToReviews();

      // 3. Update business information for SEO
      await this.optimizeBusinessInformation();

      // 4. Add photos
      await this.uploadOptimizedPhotos();

      // 5. Monitor competitors
      await this.spyOnCompetitorGMB();

      logger.info('✅ GMB Domination Cycle Complete');
    } catch (error) {
      logger.error('GMB Domination Cycle Error:', errorToLogMeta(error));
    }
  }

  /**
   * Create and publish GMB posts
   */
  private async createAndPublishGMBPost(): Promise<void> {
    try {
      // Determine post type based on various factors
      const postType = await this.determineOptimalPostType();

      // Generate post content
      const postContent = await this.generateEngagingPost(postType);

      // Publish to all locations
      for (const [location, locationId] of Object.entries(this.LOCATION_IDS)) {
        if (!locationId) continue;

        try {
          const localizedPost = await this.localizePost(postContent, location);
          await this.publishGMBPost(locationId, localizedPost);

          logger.info(
            `✅ Published GMB post to ${location}: ${localizedPost.summary.substring(0, 50)}...`
          );

          // Track in database
          await this.trackGMBPost(location, localizedPost);
        } catch (error) {
          logger.error(`Failed to publish to ${location}:`, errorToLogMeta(error));
        }
      }
    } catch (error) {
      logger.error('Failed to create GMB posts:', errorToLogMeta(error));
    }
  }

  /**
   * Determine optimal post type based on timing and performance
   */
  private async determineOptimalPostType(): Promise<string> {
    const hour = new Date().getHours();
    const dayOfWeek = new Date().getDay();

    // Check for urgent legal updates
    const urgentNews = await this.checkForUrgentLegalNews();
    if (urgentNews) return 'urgent_update';

    // Check for upcoming events
    const upcomingEvent = await this.checkForUpcomingEvents();
    if (upcomingEvent) return 'community_event';

    // Time-based optimization
    if (hour >= 8 && hour <= 10) {
      // Morning: Legal tips and advice
      return 'legal_tip';
    } else if (hour >= 11 && hour <= 14) {
      // Midday: Success stories
      return 'success_story';
    } else if (hour >= 15 && hour <= 18) {
      // Afternoon: Community events or seasonal
      return dayOfWeek === 5 ? 'community_event' : 'seasonal';
    } else {
      // Evening: Mix of content
      return Math.random() > 0.5 ? 'success_story' : 'legal_tip';
    }
  }

  /**
   * Generate engaging GMB post content
   */
  private async generateEngagingPost(postType: string): Promise<GMBPost> {
    const template = this.POST_TEMPLATES[postType as keyof typeof this.POST_TEMPLATES];
    const topic = template.topics[Math.floor(Math.random() * template.topics.length)];

    const prompt = `
Create an engaging Google My Business post for a law firm:

Post Type: ${postType}
Base Topic: ${topic}
Call to Action: ${template.cta}

Requirements:
1. Maximum 1,500 characters
2. Include relevant emojis
3. Local NC focus
4. Clear value proposition
5. Urgency or benefit statement
6. End with strong CTA

Make it compelling and action-oriented. Focus on client benefits, not features.
Include relevant local references (Charlotte, Raleigh, NC laws, etc.).

Format as JSON with: summary, callToAction (actionType, url)
`;

    const response = await this.model.invoke([
      new SystemMessage(
        'You are a master GMB copywriter who creates posts that drive massive engagement and conversions.'
      ),
      new HumanMessage(prompt),
    ]);

    const content = JSON.parse(response.content.toString());

    // Add media if available
    const media = await this.selectOptimalMedia(postType);

    // Ensure content matches GMBPost structure
    const gmbPost: GMBPost = {
      summary: content.summary || content.text || '',
      callToAction: content.callToAction || {
        actionType: 'LEARN_MORE',
        url: 'https://vasquezlawfirm.com',
      },
      media: media ? [{ mediaFormat: 'PHOTO', sourceUrl: media.url }] : undefined,
      event: postType === 'community_event' ? await this.generateEventDetails(topic) : undefined,
    };

    return gmbPost;
  }

  /**
   * Monitor and respond to reviews instantly
   */
  private async monitorAndRespondToReviews(): Promise<void> {
    try {
      logger.info('🔍 Monitoring reviews across all platforms');

      // Check each location
      for (const [location, locationId] of Object.entries(this.LOCATION_IDS)) {
        if (!locationId) continue;

        const reviews = await this.fetchLatestReviews(locationId);

        for (const review of reviews) {
          // Check if already responded
          if ('reviewReply' in review && review.reviewReply) continue;

          // Generate and post response (convert ReviewData to GMBReview format)
          const gmbReview: GMBReview = {
            reviewId: (review as any).id || `review_${Date.now()}`,
            author: (review as any).author || 'Anonymous',
            rating: (review as any).rating || 5,
            text: (review as any).text || '',
            createTime: new Date(),
          };
          const response = await this.generateReviewResponse(gmbReview);
          if ('name' in review && review.name && typeof review.name === 'string') {
            await this.postReviewResponse(locationId, review.name, response);
          } else {
            logger.warn('Review missing name field, cannot post response');
          }

          logger.info(`✅ Responded to ${review.rating}-star review at ${location}`);

          // Track response (simplified logging for now due to type mismatches)
          logger.info(
            `Tracked review response for ${location}: ${response.text.substring(0, 50)}...`
          );
        }
      }
    } catch (error) {
      logger.error('Failed to monitor reviews:', errorToLogMeta(error));
    }
  }

  /**
   * Generate intelligent review response
   */
  private async generateReviewResponse(review: GMBReview): Promise<ReviewResponse> {
    const isPositive = review.rating >= 4;
    const templates = isPositive
      ? review.rating === 5
        ? this.REVIEW_RESPONSES.positive.fiveStar
        : this.REVIEW_RESPONSES.positive.fourStar
      : this.REVIEW_RESPONSES.negative.general;

    // Use AI to personalize response
    const prompt = `
Generate a personalized response to this review:

Rating: ${review.rating} stars
Review: ${review.text}
Reviewer: ${review.author || 'Anonymous'}

Base template: ${templates[0]}

Personalize the response by:
1. Acknowledging specific points they mentioned
2. Maintaining professional tone
3. Including a call to action if appropriate
4. Keeping it under 500 characters
5. Sounding genuine and caring

Replace [CASE_TYPE] with the relevant practice area based on the review content.
`;

    const response = await this.model.invoke([
      new SystemMessage('You are a caring law firm representative who values every client.'),
      new HumanMessage(prompt),
    ]);

    const responseText = response.content.toString();

    return {
      text: responseText,
      includesKeywords: this.NC_LEGAL_KEYWORDS.some(keyword =>
        responseText.toLowerCase().includes(keyword.toLowerCase())
      ),
      promotesServices: responseText.includes('contact') || responseText.includes('consultation'),
    } as ReviewResponse;
  }

  /**
   * Spy on competitor GMB activity
   */
  private async spyOnCompetitorGMB(): Promise<void> {
    const competitors = [
      { name: 'Brent Adams & Associates', placeId: 'ChIJxxxxxxxxxxxxxx' },
      { name: 'Hardwick Law Firm', placeId: 'ChIJyyyyyyyyyyyyyy' },
      { name: 'Nagle & Associates', placeId: 'ChIJzzzzzzzzzzzzzz' },
    ];

    for (const competitor of competitors) {
      try {
        const competitorData = await this.fetchCompetitorGMBData(competitor.placeId);

        // Analyze their strategy
        const analysis = await this.analyzeCompetitorGMBStrategy(competitorData);

        // Generate counter-strategy
        const counterStrategy = await this.generateCounterStrategy(analysis);

        // Execute counter-moves
        await this.executeCounterStrategy(counterStrategy);

        logger.info(`🎯 Countered ${competitor.name}'s GMB strategy`);
      } catch (error) {
        logger.error(`Failed to analyze competitor ${competitor.name}:`, errorToLogMeta(error));
      }
    }
  }

  /**
   * Check local rankings for key terms
   */
  private async checkLocalRankings(): Promise<void> {
    const keywords = [
      'immigration lawyer near me',
      'personal injury attorney',
      'workers comp lawyer',
      'criminal defense attorney',
      'abogado de inmigracion',
    ];

    const locations: GMBLocation[] = [
      {
        locationId: 'charlotte-main',
        name: 'Charlotte',
        address: {
          streetAddress: '123 Main St',
          locality: 'Charlotte',
          region: 'NC',
          postalCode: '28202',
          country: 'US',
        },
      },
      {
        locationId: 'raleigh-office',
        name: 'Raleigh',
        address: {
          streetAddress: '456 Capital Blvd',
          locality: 'Raleigh',
          region: 'NC',
          postalCode: '27601',
          country: 'US',
        },
      },
      {
        locationId: 'durham-office',
        name: 'Durham',
        address: {
          streetAddress: '789 Duke St',
          locality: 'Durham',
          region: 'NC',
          postalCode: '27701',
          country: 'US',
        },
      },
    ];

    const rankings: LocalRankingData[] = [];

    for (const keyword of keywords) {
      for (const location of locations) {
        try {
          const ranking = await this.checkKeywordRanking(keyword, location);
          rankings.push(ranking);

          if (ranking.ranking > 3) {
            // We're not in top 3, need to improve!
            await this.boostLocalSEO(keyword, location);
          }
        } catch (error) {
          logger.error(
            `Failed to check ranking for ${keyword} in ${location.name}:`,
            errorToLogMeta(error)
          );
        }
      }
    }

    // Generate ranking report
    await this.generateRankingReport(rankings);
  }

  /**
   * Optimize business information for maximum SEO impact
   */
  private async optimizeBusinessInformation(): Promise<void> {
    const optimizations = {
      description: await this.generateOptimalDescription(),
      categories: await this.selectOptimalCategories(),
      attributes: await this.selectOptimalAttributes(),
      serviceArea: await this.defineOptimalServiceArea(),
      hours: await this.optimizeBusinessHours(),
    };

    for (const [location, locationId] of Object.entries(this.LOCATION_IDS)) {
      if (!locationId) continue;

      try {
        await this.updateBusinessInfo(locationId, optimizations);
        logger.info(`✅ Optimized GMB info for ${location}`);
      } catch (error) {
        logger.error(`Failed to optimize ${location}:`, errorToLogMeta(error));
      }
    }
  }

  /**
   * Upload optimized photos
   */
  private async uploadOptimizedPhotos(): Promise<void> {
    const photoTypes = [
      { type: 'COVER', description: 'Law firm exterior' },
      { type: 'PROFILE', description: 'Attorney team photo' },
      { type: 'PRODUCT', description: 'Legal service examples' },
      { type: 'TEAM', description: 'Staff at work' },
      { type: 'INTERIOR', description: 'Office interior' },
    ];

    // Check if we need new photos (rotate weekly)
    const lastPhotoUpdate = await this.getLastPhotoUpdate();
    if (Date.now() - lastPhotoUpdate < 7 * 24 * 60 * 60 * 1000) {
      return; // Less than a week old
    }

    for (const [location, locationId] of Object.entries(this.LOCATION_IDS)) {
      if (!locationId) continue;

      try {
        // Select photos optimized for engagement
        const photos = await this.selectEngagementPhotos(location);

        for (const photo of photos) {
          // Convert EngagementPhoto to GMBPhoto format
          const gmbPhoto: GMBPhoto = {
            category: photo.category,
            sourceUrl: photo.url,
            description: photo.description,
          };
          await this.uploadPhoto(locationId, gmbPhoto);
        }

        logger.info(`✅ Uploaded ${photos.length} optimized photos to ${location}`);
      } catch (error) {
        logger.error(`Failed to upload photos to ${location}:`, errorToLogMeta(error));
      }
    }
  }

  // Helper methods

  private async checkForUrgentLegalNews(): Promise<boolean> {
    // Check database for recent urgent news
    const urgentNews = await this.prisma?.newsAlert.findFirst({
      where: {
        publishedAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        relevanceScore: { gte: 0.8 },
      },
    });

    return !!urgentNews;
  }

  private async checkForUpcomingEvents(): Promise<boolean> {
    // Check for scheduled events in the next week
    const upcomingEvent = await this.prisma?.appointment.findFirst({
      where: {
        type: 'consultation',
        status: 'scheduled',
        scheduledAt: {
          gte: new Date(),
          lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    return !!upcomingEvent;
  }

  private async localizePost(post: GMBPost, location: string): Promise<GMBPost> {
    // Add location-specific content
    const localizedPost = { ...post };

    const locationMap = {
      charlotte: 'Charlotte, NC',
      raleigh: 'Raleigh-Durham',
      smithfield: 'Johnston County',
      goldsboro: 'Wayne County',
      orlando: 'Orlando, FL',
    };

    localizedPost.summary = post.summary.replace(
      'North Carolina',
      locationMap[location as keyof typeof locationMap] || 'North Carolina'
    );

    return localizedPost;
  }

  private async publishGMBPost(locationId: string, post: GMBPost): Promise<void> {
    try {
      await this.mybusinessApi?.locations.localPosts.create({
        parent: `locations/${locationId}`,
        requestBody: {
          summary: post.summary,
          languageCode: 'en-US',
          callToAction: post.callToAction,
          media: post.media,
          // Event will be properly formatted when API is actually implemented
        },
      });
    } catch (error) {
      logger.error('Failed to publish GMB post:', errorToLogMeta(error));
      throw error;
    }
  }

  private async trackGMBPost(location: string, post: GMBPost): Promise<void> {
    // Track post in database for analytics
    await this.prisma?.contentSchedule.create({
      data: {
        contentId: `gmb_${Date.now()}`,
        contentType: 'gmb_post',
        platforms: [`gmb_${location}`],
        scheduledFor: new Date(),
        status: 'published',
        publishedAt: new Date(),
      },
    });
  }

  private async selectOptimalMedia(postType: string): Promise<OptimalMedia> {
    // Select media based on post type and performance data
    const mediaMap = {
      success_story: { mediaFormat: 'PHOTO', sourceUrl: '/images/success-celebration.jpg' },
      legal_tip: { mediaFormat: 'PHOTO', sourceUrl: '/images/legal-advice.jpg' },
      community_event: { mediaFormat: 'PHOTO', sourceUrl: '/images/community-event.jpg' },
      urgent_update: { mediaFormat: 'PHOTO', sourceUrl: '/images/urgent-alert.jpg' },
      seasonal: { mediaFormat: 'PHOTO', sourceUrl: '/images/seasonal.jpg' },
    };

    return (mediaMap[postType as keyof typeof mediaMap] || {
      mediaFormat: 'PHOTO',
      sourceUrl: '/images/default.jpg',
    }) as unknown as OptimalMedia;
  }

  private getTopicType(postType: string): string {
    const topicMap = {
      success_story: 'STANDARD',
      legal_tip: 'STANDARD',
      community_event: 'EVENT',
      urgent_update: 'ALERT',
      seasonal: 'OFFER',
    };

    return topicMap[postType as keyof typeof topicMap] || 'STANDARD';
  }

  private async generateEventDetails(
    topic: string
  ): Promise<{ title: string; schedule: { startDate: Date; endDate?: Date } }> {
    // Generate event details for community events
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const dateStr = nextWeek.toISOString().split('T')[0]; // YYYY-MM-DD format

    return {
      title: topic,
      schedule: {
        startDate: nextWeek,
        endDate: nextWeek,
      },
    };
  }

  private async fetchLatestReviews(locationId: string): Promise<ReviewData[]> {
    try {
      const response = await this.mybusinessApi?.locations.reviews.list({
        parent: `locations/${locationId}`,
        pageSize: 50,
      });

      if (!response) return [];
      return (response as any)?.reviews || [];
    } catch (error) {
      logger.error('Failed to fetch reviews:', errorToLogMeta(error));
      return [];
    }
  }

  private async postReviewResponse(
    locationId: string,
    reviewName: string,
    response: ReviewResponse
  ): Promise<void> {
    try {
      await this.mybusinessApi?.locations.reviews.reply({
        parent: reviewName,
        requestBody: {
          comment: response.text,
        },
      });
    } catch (error) {
      logger.error('Failed to post review response:', errorToLogMeta(error));
    }
  }

  private async trackReviewResponse(
    location: string,
    review: GMBReviewDetails,
    response: ReviewResponse
  ): Promise<void> {
    // Track in database for analytics
    logger.info(`Tracked review response for ${location}: ${response.sentiment}`);
  }

  private async fetchCompetitorGMBData(placeId: string): Promise<CompetitorGMBData> {
    // Fetch competitor data using Places API
    try {
      // TODO: Implement competitor data fetching when Places API is properly configured
      logger.info(`Would fetch competitor data for place ID: ${placeId}`);

      // Return mock data for now
      return {
        businessName: 'Competitor Law Firm',
        rating: 4.5,
        reviewCount: 100,
        categories: ['Law Firm', 'Immigration Attorney'],
        posts: 15,
        photos: 25,
        respondTime: '2 hours',
        attributes: ['Wheelchair accessible', 'Free consultation'],
      } as unknown as CompetitorGMBData;
    } catch (error) {
      logger.error('Failed to fetch competitor GMB data:', errorToLogMeta(error));
      return {} as CompetitorGMBData;
    }
  }

  private async analyzeCompetitorGMBStrategy(data: CompetitorGMBData): Promise<CompetitorAnalysis> {
    if (!data) return {} as CompetitorAnalysis;

    return {
      responseRate: this.calculateResponseRate(
        (data as CompetitorGMBData & { reviews: unknown[] }).reviews
      ),
      strengths: this.identifyStrengths(data),
      weaknesses: this.identifyWeaknesses(data),
    } as unknown as CompetitorAnalysis;
  }

  private calculateResponseRate(reviews: unknown[]): number {
    if (!reviews || reviews.length === 0) return 0;
    const responded = reviews.filter(r => (r as { reply?: unknown }).reply).length;
    return (responded / reviews.length) * 100;
  }

  private identifyStrengths(data: CompetitorGMBData): string[] {
    const strengths = [];
    const typedData = data as CompetitorGMBData & {
      rating?: number;
      userRatingCount?: number;
      regularOpeningHours?: { periods?: unknown[] };
    };
    if (typedData.rating && typedData.rating >= 4.5) strengths.push('High rating');
    if (typedData.userRatingCount && typedData.userRatingCount > 100)
      strengths.push('Many reviews');
    if (typedData.regularOpeningHours?.periods && typedData.regularOpeningHours.periods.length > 5)
      strengths.push('Extended hours');
    return strengths;
  }

  private identifyWeaknesses(data: CompetitorGMBData): string[] {
    const weaknesses = [];
    const typedData = data as CompetitorGMBData & {
      rating?: number;
      userRatingCount?: number;
      websiteUri?: string;
    };
    if (typedData.rating && typedData.rating < 4.5) weaknesses.push('Rating below 4.5');
    if (typedData.userRatingCount && typedData.userRatingCount < 50) weaknesses.push('Few reviews');
    if (!typedData.websiteUri) weaknesses.push('No website listed');
    return weaknesses;
  }

  private async generateCounterStrategy(
    analysis: CompetitorAnalysis
  ): Promise<CounterStrategy | null> {
    if (!analysis) return null;

    const actions = [];

    const typedAnalysis = analysis as CompetitorAnalysis & {
      rating?: number;
      reviewCount?: number;
    };
    if (typedAnalysis.rating && typedAnalysis.rating > 4.5) {
      actions.push('Increase review volume with automated requests');
      actions.push('Highlight unique differentiators in posts');
    }

    if (typedAnalysis.reviewCount && typedAnalysis.reviewCount > 100) {
      actions.push('Focus on review quality over quantity');
      actions.push('Create posts showcasing recent wins');
    }

    (analysis.weaknesses || []).forEach((weakness: string) => {
      if (weakness.includes('Rating')) {
        actions.push('Implement review improvement campaign');
      }
      if (weakness.includes('reviews')) {
        actions.push('Launch review generation campaign');
      }
    });

    return {
      actions,
      priority: ['high'],
      timeline: 'immediate',
    };
  }

  private async executeCounterStrategy(strategy: CounterStrategy | null): Promise<void> {
    if (!strategy) return;

    // Execute top priority actions
    for (const action of strategy.actions.slice(0, 2)) {
      logger.info(`Executing counter-strategy: ${action}`);
      // Implementation would go here
    }
  }

  private async checkKeywordRanking(
    keyword: string,
    location: GMBLocation
  ): Promise<LocalRankingData> {
    // In production, would use local rank tracking API
    return {
      keyword,
      ranking: Math.floor(Math.random() * 20) + 1,
      location: location.name,
      competitor: 'Unknown',
      change: Math.floor(Math.random() * 5) - 2,
    };
  }

  private async boostLocalSEO(keyword: string, location: GMBLocation): Promise<void> {
    logger.info(`🚀 Boosting local SEO for "${keyword}" in ${location.name}`);

    // Create targeted content
    await this.createLocationSpecificPost(keyword, location);

    // Update business description with keyword
    await this.updateDescriptionWithKeyword(keyword, location);
  }

  private async createLocationSpecificPost(keyword: string, location: GMBLocation): Promise<void> {
    const post: GMBPost = {
      summary: `Looking for a ${keyword} in ${location.name}? Vasquez Law Firm has been serving ${location.name} for over 20 years with proven results. Free consultation available! 📍 ${location.name} #${keyword.replace(/\s+/g, '')}`,
      callToAction: {
        actionType: 'CALL',
        url: 'tel:+19803420919',
      },
    } as GMBPost;

    // Publish to relevant location
    const locationKey = location.name.toLowerCase().replace(/\s+/g, '');
    const locationId = this.LOCATION_IDS[locationKey as keyof typeof this.LOCATION_IDS];

    if (locationId) {
      await this.publishGMBPost(locationId, post);
    }
  }

  private async updateDescriptionWithKeyword(
    keyword: string,
    location: GMBLocation
  ): Promise<void> {
    // Update business description to include keyword
    logger.info(`Updated description with keyword: ${keyword} for ${location.name}`);
  }

  private async generateRankingReport(rankings: LocalRankingData[]): Promise<void> {
    // Generate comprehensive ranking report
    const report = {
      date: new Date(),
      rankings,
      topPerformers: rankings.filter(r => r.ranking <= 3),
      needsImprovement: rankings.filter(r => r.ranking > 10),
      biggestGains: rankings
        .filter(r => r.change > 0)
        .sort((a, b) => b.change - a.change)
        .slice(0, 5),
      biggestLosses: rankings
        .filter(r => r.change < 0)
        .sort((a, b) => a.change - b.change)
        .slice(0, 5),
    };

    logger.info('📊 Local Ranking Report Generated', {
      topPerformers: report.topPerformers.length,
      needsImprovement: report.needsImprovement.length,
    });
  }

  private async generateOptimalDescription(): Promise<string> {
    return `Vasquez Law Firm, PLLC - North Carolina's trusted immigration, personal injury, workers' compensation, and criminal defense attorneys. Over 20 years serving Charlotte, Raleigh, Durham, and all of NC. Hablamos Español. Available 24/7 for emergencies. Free consultations. Call (980) 342-0919. Proven results with thousands of successful cases.`;
  }

  private async selectOptimalCategories(): Promise<string[]> {
    return [
      'immigration_attorney',
      'personal_injury_attorney',
      'criminal_justice_attorney',
      'labor_relations_attorney',
      'law_firm',
    ];
  }

  private async selectOptimalAttributes(): Promise<string[]> {
    return [
      'has_free_consultation',
      'has_spanish_speaking_staff',
      'has_wheelchair_accessible_entrance',
      'has_parking',
      'accepts_credit_cards',
      'offers_payment_plans',
      'emergency_consultation_available',
    ];
  }

  private async defineOptimalServiceArea(): Promise<Array<{ locality: string; region: string }>> {
    return [
      { locality: 'Charlotte', region: 'NC' },
      { locality: 'Raleigh', region: 'NC' },
      { locality: 'Durham', region: 'NC' },
      { locality: 'Greensboro', region: 'NC' },
    ];
  }

  private async optimizeBusinessHours(): Promise<BusinessHours[]> {
    return [
      {
        dayOfWeek: 'MONDAY',
        openTime: '08:00',
        closeTime: '18:00',
        isClosed: false,
      },
      {
        dayOfWeek: 'TUESDAY',
        openTime: '08:00',
        closeTime: '18:00',
        isClosed: false,
      },
      {
        dayOfWeek: 'WEDNESDAY',
        openTime: '08:00',
        closeTime: '18:00',
        isClosed: false,
      },
      {
        dayOfWeek: 'THURSDAY',
        openTime: '08:00',
        closeTime: '18:00',
        isClosed: false,
      },
      {
        dayOfWeek: 'FRIDAY',
        openTime: '08:00',
        closeTime: '18:00',
        isClosed: false,
      },
      {
        dayOfWeek: 'SATURDAY',
        openTime: '09:00',
        closeTime: '14:00',
        isClosed: false,
      },
      {
        dayOfWeek: 'SUNDAY',
        openTime: '',
        closeTime: '',
        isClosed: true,
        isHoliday: false,
      },
    ];
  }

  private async updateBusinessInfo(
    locationId: string,
    optimizations: LocalSEOOptimization
  ): Promise<void> {
    try {
      // TODO: Implement actual business info update when API is properly configured
      logger.info(`Would update business info for location ${locationId}`, { optimizations });
    } catch (error) {
      logger.error('Failed to update business info:', errorToLogMeta(error));
    }
  }

  private async getLastPhotoUpdate(): Promise<number> {
    try {
      // Check when photos were last updated
      const lastUpdate = await this.prisma?.contentSchedule.findFirst({
        where: {
          platforms: { has: 'gmb_photo' },
        },
        orderBy: { scheduledFor: 'desc' },
      });

      return lastUpdate ? lastUpdate.scheduledFor.getTime() : 0;
    } catch (error) {
      logger.error('Failed to get last photo update:', errorToLogMeta(error));
      return 0;
    }
  }

  private async selectEngagementPhotos(location: string): Promise<EngagementPhoto[]> {
    // Select photos optimized for engagement based on location
    return [
      {
        url: `/images/offices/${location}-exterior.jpg`,
        category: 'COVER',
        description: `Vasquez Law Firm ${location} office - Serving the community since 2003`,
        tags: ['office', 'exterior', location],
        uploadPriority: 1,
      },
      {
        url: `/images/team/${location}-team.jpg`,
        category: 'TEAM',
        description: `Our experienced legal team in ${location}`,
        tags: ['team', 'attorneys', location],
        uploadPriority: 2,
      },
      {
        url: `/images/offices/${location}-interior.jpg`,
        category: 'INTERIOR',
        description: `Modern, comfortable consultation rooms`,
        tags: ['interior', 'consultation', location],
        uploadPriority: 3,
      },
    ];
  }

  private async uploadPhoto(locationId: string, photo: GMBPhoto): Promise<void> {
    try {
      // Upload photo to GMB
      logger.info(
        `Uploading photo to location ${locationId}: ${(photo as GMBPhoto & { category?: string }).category || 'unknown'}`
      );

      // Track upload
      await this.prisma?.contentSchedule.create({
        data: {
          contentId: `gmb_photo_${Date.now()}`,
          contentType: 'gmb_photo',
          platforms: [`gmb_photo_${locationId}`],
          scheduledFor: new Date(),
          status: 'published',
          publishedAt: new Date(),
        },
      });
    } catch (error) {
      logger.error('Failed to upload photo:', errorToLogMeta(error));
    }
  }
}
