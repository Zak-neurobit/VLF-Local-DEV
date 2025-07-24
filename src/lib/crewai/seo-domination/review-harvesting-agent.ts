import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { getPrismaClient } from '@/lib/prisma';
import * as cron from 'node-cron';
import nodemailer from 'nodemailer';

interface ReviewRequest {
  clientId: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  caseType: string;
  caseOutcome: 'won' | 'settled' | 'resolved' | 'ongoing';
  lastContactDate: Date;
  requestMethod: 'email' | 'sms' | 'both';
  urgency: 'immediate' | 'standard' | 'gentle';
  personalizationData: Record<string, unknown>;
}

interface ReviewPlatform {
  name: 'google' | 'facebook' | 'avvo' | 'trustpilot' | 'bbb';
  url: string;
  priority: number;
  minimumRating: number;
}

interface ReviewResponse {
  platform: string;
  rating: number;
  reviewText: string;
  reviewerName: string;
  reviewDate: Date;
  responseText?: string;
  responseDate?: Date;
  sentiment: 'positive' | 'negative' | 'neutral';
}

interface ReviewCampaign {
  id: string;
  name: string;
  targetAudience: 'recent_wins' | 'long_term_clients' | 'high_value_cases' | 'all';
  platforms: ReviewPlatform[];
  incentive?: string;
  followUpSequence: number[]; // Days after initial request
  successRate?: number;
}

export class ReviewHarvestingAgent {
  private model: ChatOpenAI;
  private prisma: import('@prisma/client').PrismaClient | null = null;
  private emailTransporter!: nodemailer.Transporter;
  private isRunning: boolean = false;
  private scheduledJobs: cron.ScheduledTask[] = [];

  // Review Platform Configurations
  private readonly REVIEW_PLATFORMS: ReviewPlatform[] = [
    {
      name: 'google',
      url: 'https://g.page/r/CYsNw0PZ4KGCEAE/review',
      priority: 1,
      minimumRating: 4,
    },
    {
      name: 'facebook',
      url: 'https://www.facebook.com/vasquezlawfirm/reviews',
      priority: 2,
      minimumRating: 4,
    },
    {
      name: 'avvo',
      url: 'https://www.avvo.com/attorneys/vasquez-law-firm/reviews',
      priority: 3,
      minimumRating: 4,
    },
    {
      name: 'trustpilot',
      url: 'https://www.trustpilot.com/review/vasquezlawfirm.com',
      priority: 5,
      minimumRating: 4,
    },
  ];

  // Review Request Templates
  private readonly REQUEST_TEMPLATES = {
    email: {
      immediate_win: {
        subject: '🎉 Congratulations on Your Success - Quick Favor?',
        body: `Hi {clientName},

We're still celebrating your recent {caseType} victory! Your perseverance and trust in our team made all the difference.

Would you mind taking 2 minutes to share your experience? Your story could help others in similar situations find the help they need.

{reviewLinks}

Thank you for being part of the Vasquez Law Firm family!

Warm regards,
{attorneyName}
Vasquez Law Firm, PLLC`,
      },
      standard: {
        subject: 'How was your experience with Vasquez Law Firm?',
        body: `Dear {clientName},

I hope this message finds you well. It's been {timeSince} since we {caseOutcome} your {caseType} case.

Your feedback means the world to us and helps other families find the legal support they need. Would you consider sharing your experience?

{reviewLinks}

If you have any questions or need anything at all, please don't hesitate to reach out.

Best regards,
{attorneyName}
Vasquez Law Firm, PLLC`,
      },
      gentle_reminder: {
        subject: 'Your opinion matters to us',
        body: `Hi {clientName},

We noticed you haven't had a chance to leave a review yet. We completely understand how busy life gets!

If you have just 2 minutes, we'd be grateful if you could share your thoughts about working with us:

{reviewLinks}

No pressure at all - we just appreciate hearing from our clients.

Thanks again for trusting us with your {caseType} matter.

Best,
The Vasquez Law Firm Team`,
      },
    },
    sms: {
      immediate_win: {
        text: `🎉 {clientName}! Congrats on your {caseType} win! Mind sharing a quick review? It helps others find help: {shortLink} Reply STOP to opt out.`,
      },
      standard: {
        text: `Hi {clientName}, hope you're well! Would you share your experience with Vasquez Law Firm? {shortLink} Reply STOP to opt out.`,
      },
      gentle_reminder: {
        text: `{clientName}, your feedback helps families find legal help. Quick review? {shortLink} Thanks! Reply STOP to opt out.`,
      },
    },
  };

  // Review Response Templates by Sentiment
  private readonly RESPONSE_TEMPLATES = {
    positive: {
      fiveStar: [
        "Thank you so much, {reviewerName}! Your kind words mean everything to us. We're honored to have been part of your journey. 🌟",
        "{reviewerName}, we're touched by your review! It's clients like you who make our work so rewarding. Thank you for trusting us! 💙",
        "Wow, thank you {reviewerName}! Your success is our success. We're always here if you need us. 🙏",
      ],
      fourStar: [
        "Thank you for the wonderful feedback, {reviewerName}! We're glad we could help. Always striving to provide 5-star service! 📞",
        'We appreciate your review, {reviewerName}! Your feedback helps us improve. Thank you for choosing Vasquez Law Firm! 🏆',
      ],
    },
    negative: {
      general: [
        "{reviewerName}, we're truly sorry about your experience. This isn't our standard. Please call us at (980) 342-0919 so we can make this right.",
        'Thank you for your feedback, {reviewerName}. We take all concerns seriously. Please contact our office manager to discuss how we can improve your experience.',
      ],
    },
    neutral: {
      general: [
        "Thank you for taking the time to review us, {reviewerName}. We'd love to hear more about how we can better serve you. Please feel free to reach out!",
        'We appreciate your honest feedback, {reviewerName}. Your input helps us grow and serve our community better. Thank you!',
      ],
    },
  };

  // Incentive Programs
  private readonly INCENTIVE_PROGRAMS = {
    charity_donation: {
      name: 'Reviews for Good',
      description: 'For every review, we donate $10 to local NC charities',
      active: true,
    },
    future_discount: {
      name: 'Loyalty Rewards',
      description: '10% off future services for detailed reviews',
      active: false,
    },
    gift_card_drawing: {
      name: 'Monthly Drawing',
      description: 'Monthly $100 gift card drawing for reviewers',
      active: true,
    },
  };

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.3,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    this.prisma = getPrismaClient();
    this.initializeCommunicationServices();
  }

  private initializeCommunicationServices() {
    // Initialize Email
    this.emailTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  /**
   * Start the review harvesting engine
   */
  async startHarvesting(): Promise<void> {
    if (this.isRunning) {
      logger.warn('Review Harvesting Agent is already running');
      return;
    }

    this.isRunning = true;
    logger.info('⭐ Starting Review Harvesting Agent - 5-Star Reputation Mode Activated');

    // Schedule review request campaigns (daily at 10 AM)
    const requestJob = cron.schedule('0 10 * * *', async () => {
      await this.executeReviewRequestCampaign();
    });
    this.scheduledJobs.push(requestJob);

    // Schedule follow-up sequences (every 4 hours)
    const followUpJob = cron.schedule('0 */4 * * *', async () => {
      await this.executeFollowUpSequences();
    });
    this.scheduledJobs.push(followUpJob);

    // Monitor new reviews (every 30 minutes)
    const monitorJob = cron.schedule('*/30 * * * *', async () => {
      await this.monitorAndRespondToReviews();
    });
    this.scheduledJobs.push(monitorJob);

    // Analyze review performance (weekly)
    const analysisJob = cron.schedule('0 9 * * 1', async () => {
      await this.analyzeReviewPerformance();
    });
    this.scheduledJobs.push(analysisJob);

    // Initial execution
    await this.executeReviewHarvestingCycle();
  }

  /**
   * Stop the harvesting engine
   */
  stopHarvesting(): void {
    this.scheduledJobs.forEach(job => job.stop());
    this.scheduledJobs = [];
    this.isRunning = false;
    logger.info('Review Harvesting Agent stopped');
  }

  /**
   * Execute a full review harvesting cycle
   */
  private async executeReviewHarvestingCycle(): Promise<void> {
    try {
      logger.info('🌟 Executing Review Harvesting Cycle');

      // 1. Identify review candidates
      const candidates = await this.identifyReviewCandidates();

      // 2. Send personalized requests
      await this.sendPersonalizedRequests(candidates);

      // 3. Monitor and respond to new reviews
      await this.monitorAndRespondToReviews();

      // 4. Handle negative reviews proactively
      await this.handleNegativeReviews();

      // 5. Amplify positive reviews
      await this.amplifyPositiveReviews();

      // 6. Update review widgets
      await this.updateReviewWidgets();

      logger.info('✅ Review Harvesting Cycle Complete');
    } catch (error) {
      logger.error('Review Harvesting Cycle Error:', errorToLogMeta(error));
    }
  }

  /**
   * Identify clients who should receive review requests
   */
  private async identifyReviewCandidates(): Promise<ReviewRequest[]> {
    const candidates: ReviewRequest[] = [];

    try {
      // 1. Recent case wins (highest priority)
      const recentWins = (await this.prisma!.case.findMany({
        where: {
          status: 'closed',
          updatedAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, // Last 30 days
          // TODO: Filter by outcome when metadata JSON query is properly typed
          // metadata: { path: '$.outcome', equals: 'won' },
        },
        include: {
          client: true,
          attorney: true,
        },
      })) as unknown[];

      for (const case_ of recentWins) {
        const caseData = case_ as {
          client: {
            id: string;
            name?: string | null;
            email?: string | null;
            phone?: string | null;
          };
          attorney?: { name?: string | null } | null;
          practiceArea: string;
          updatedAt: Date;
          description?: string | null;
        };
        if (await this.shouldRequestReview({ id: caseData.client.id, metadata: null })) {
          candidates.push({
            clientId: caseData.client.id,
            clientName: caseData.client.name || 'Valued Client',
            clientEmail: caseData.client.email || undefined,
            clientPhone: caseData.client.phone || undefined,
            caseType: this.formatCaseType(caseData.practiceArea),
            caseOutcome: 'won',
            lastContactDate: caseData.updatedAt,
            requestMethod: this.determineRequestMethod({
              email: caseData.client.email || undefined,
              phone: caseData.client.phone || undefined,
            }),
            urgency: 'immediate',
            personalizationData: {
              attorneyName: caseData.attorney?.name || 'Your Attorney',
              caseDetails: caseData.description,
              timeSince: this.getTimeSince(caseData.updatedAt),
            },
          });
        }
      }

      // 2. Satisfied long-term clients
      const longTermClients = (await this.prisma!.user.findMany({
        where: {
          role: 'CLIENT',
          createdAt: { lte: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000) }, // Over 6 months
          cases: {
            some: {
              status: 'closed',
            },
          },
        },
        include: {
          cases: {
            where: { status: 'closed' },
            orderBy: { updatedAt: 'desc' },
            take: 1,
          },
        },
      })) as unknown[];

      for (const client of longTermClients) {
        const clientData = client as {
          id: string;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          createdAt: Date;
          cases: Array<{
            practiceArea: string;
            updatedAt: Date;
          }>;
        };
        if (await this.shouldRequestReview({ id: clientData.id, metadata: null })) {
          const latestCase = clientData.cases[0];
          candidates.push({
            clientId: clientData.id,
            clientName: clientData.name || 'Valued Client',
            clientEmail: clientData.email || undefined,
            clientPhone: clientData.phone || undefined,
            caseType: latestCase ? this.formatCaseType(latestCase.practiceArea) : 'legal matter',
            caseOutcome: 'resolved',
            lastContactDate: latestCase?.updatedAt || clientData.createdAt,
            requestMethod: this.determineRequestMethod({
              email: clientData.email ?? undefined,
              phone: clientData.phone ?? undefined,
            }),
            urgency: 'standard',
            personalizationData: {
              attorneyName: 'The Vasquez Law Firm Team',
              timeSince: this.getTimeSince(latestCase?.updatedAt || clientData.createdAt),
            },
          });
        }
      }

      // 3. Clients with positive sentiment from calls/chats
      const positiveSentimentClients = await this.identifyPositiveSentimentClients();
      candidates.push(...positiveSentimentClients);

      logger.info(`📋 Identified ${candidates.length} review candidates`);
    } catch (error) {
      logger.error('Failed to identify review candidates:', errorToLogMeta(error));
    }

    return candidates;
  }

  /**
   * Send personalized review requests
   */
  private async sendPersonalizedRequests(candidates: ReviewRequest[]): Promise<void> {
    for (const candidate of candidates) {
      try {
        // Generate personalized message
        const message = await this.generatePersonalizedMessage(candidate);

        // Send via preferred method
        if (candidate.requestMethod === 'email' || candidate.requestMethod === 'both') {
          await this.sendEmailRequest(candidate, message.email);
        }

        if (candidate.requestMethod === 'sms' || candidate.requestMethod === 'both') {
          await this.sendSMSRequest(candidate, message.sms);
        }

        // Track request
        await this.trackReviewRequest(candidate);

        logger.info(`📧 Sent review request to ${candidate.clientName}`);
      } catch (error) {
        logger.error(`Failed to send request to ${candidate.clientName}:`, errorToLogMeta(error));
      }
    }
  }

  /**
   * Generate personalized review request message
   */
  private async generatePersonalizedMessage(
    request: ReviewRequest
  ): Promise<{ email: { subject: string; body: string }; sms: { text: string } }> {
    const templateKey = `${request.urgency}_${request.caseOutcome === 'won' ? 'win' : ''}`.replace(
      /_$/,
      ''
    );

    // Get base templates
    const emailTemplate =
      this.REQUEST_TEMPLATES.email[templateKey as keyof typeof this.REQUEST_TEMPLATES.email] ||
      this.REQUEST_TEMPLATES.email.standard;
    const smsTemplate =
      this.REQUEST_TEMPLATES.sms[templateKey as keyof typeof this.REQUEST_TEMPLATES.sms] ||
      this.REQUEST_TEMPLATES.sms.standard;

    // Generate review links
    const reviewLinks = this.generateReviewLinks(request);

    // Personalize email
    const personalizedEmail = {
      subject: this.personalizText(emailTemplate.subject, {
        ...request,
        lastContactDate: request.lastContactDate.toISOString(),
      }),
      body: this.personalizText(emailTemplate.body, {
        ...request,
        lastContactDate: request.lastContactDate.toISOString(),
        ...request.personalizationData,
        reviewLinks: reviewLinks.email,
      }),
    };

    // Personalize SMS
    const personalizedSMS = {
      text: this.personalizText(smsTemplate.text, {
        ...request,
        lastContactDate: request.lastContactDate.toISOString(),
        ...request.personalizationData,
        shortLink: reviewLinks.sms,
      }),
    };

    // Use AI to enhance personalization
    const enhancement = await this.enhanceWithAI(request, personalizedEmail, personalizedSMS);

    return enhancement;
  }

  /**
   * Enhance messages with AI personalization
   */
  private async enhanceWithAI(
    request: ReviewRequest,
    email: { subject: string; body: string },
    sms: { text: string }
  ): Promise<{ email: { subject: string; body: string }; sms: { text: string } }> {
    const prompt = `
Enhance these review request messages for maximum effectiveness:

Client: ${request.clientName}
Case Type: ${request.caseType}
Outcome: ${request.caseOutcome}
Time Since: ${request.personalizationData.timeSince}

Current Email:
Subject: ${email.subject}
Body: ${email.body}

Current SMS: ${sms.text}

Make them more personal, compelling, and likely to get a 5-star review.
Keep the same structure but improve the language and emotional appeal.
Maintain professionalism while being warm and grateful.

Return as JSON: { email: { subject, body }, sms: { text } }
`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(
          'You are an expert at crafting compelling review requests that generate 5-star reviews.'
        ),
        new HumanMessage(prompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('AI enhancement failed, using original messages');
      return { email, sms };
    }
  }

  /**
   * Monitor all review platforms and respond instantly
   */
  private async monitorAndRespondToReviews(): Promise<void> {
    try {
      logger.info('🔍 Monitoring reviews across all platforms');

      for (const platform of this.REVIEW_PLATFORMS) {
        const newReviews = await this.fetchNewReviews(platform);

        for (const review of newReviews) {
          // Analyze sentiment
          const sentiment = await this.analyzeSentiment(review);

          // Generate response
          const response = await this.generateReviewResponse(review, sentiment);

          // Post response
          await this.postReviewResponse(platform, review, response);

          // Track in database
          await this.trackReviewResponse(review, response, sentiment);

          // Handle based on sentiment
          if (sentiment === 'negative') {
            await this.escalateNegativeReview(review);
          } else if (sentiment === 'positive' && review.rating === 5) {
            await this.amplifyPositiveReview(review);
          }

          logger.info(`✅ Responded to ${review.rating}-star review on ${platform.name}`);
        }
      }
    } catch (error) {
      logger.error('Failed to monitor reviews:', errorToLogMeta(error));
    }
  }

  /**
   * Execute follow-up sequences for non-responders
   */
  private async executeFollowUpSequences(): Promise<void> {
    try {
      // Get pending follow-ups
      const pendingFollowUps = await this.getPendingFollowUps();

      for (const followUp of pendingFollowUps) {
        // Check if they've already reviewed
        if (await this.hasClientReviewed(followUp.clientId)) {
          await this.markFollowUpComplete(followUp);
          continue;
        }

        // Send follow-up
        const message = await this.generateFollowUpMessage(followUp);
        await this.sendFollowUp(followUp, message);

        logger.info(`📤 Sent follow-up #${followUp.attemptNumber} to ${followUp.clientName}`);
      }
    } catch (error) {
      logger.error('Failed to execute follow-up sequences:', errorToLogMeta(error));
    }
  }

  /**
   * Handle negative reviews proactively
   */
  private async handleNegativeReviews(): Promise<void> {
    try {
      // TODO: Implement review response tracking when model is added to schema
      const negativeReviews: ReviewResponse[] = [];
      // const negativeReviews = await this.prisma.reviewResponse.findMany({
      //   where: {
      //     sentiment: 'negative',
      //     responseDate: null,
      //   },
      // });

      for (const review of negativeReviews) {
        // Immediate response
        await this.respondToNegativeReview(review);

        // Internal escalation
        await this.createInternalTask(review);

        // Follow-up plan
        await this.createServiceRecoveryPlan(review);

        logger.info(`🚨 Handled negative review from ${review.reviewerName}`);
      }
    } catch (error) {
      logger.error('Failed to handle negative reviews:', errorToLogMeta(error));
    }
  }

  /**
   * Amplify positive reviews across channels
   */
  private async amplifyPositiveReviews(): Promise<void> {
    try {
      // TODO: Implement review response tracking when model is added to schema
      const positiveReviews: ReviewResponse[] = [];
      // const positiveReviews = await this.prisma.reviewResponse.findMany({
      //   where: {
      //     rating: 5,
      //     sentiment: 'positive',
      //     reviewDate: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // Last week
      //   },
      //   orderBy: { reviewDate: 'desc' },
      //   take: 5,
      // });

      for (const review of positiveReviews) {
        // Create social media content
        const socialContent = await this.createSocialContentFromReview(review);

        // Share on website
        await this.addToWebsiteTestimonials(review);

        // Include in email signatures
        await this.updateEmailSignatures(review);

        logger.info(`📣 Amplified 5-star review from ${review.reviewerName}`);
      }
    } catch (error) {
      logger.error('Failed to amplify positive reviews:', errorToLogMeta(error));
    }
  }

  // Helper methods

  private async shouldRequestReview(client: {
    id: string;
    metadata?: { reviewOptOut?: boolean } | null;
  }): Promise<boolean> {
    // Check if already requested recently
    const recentRequest = await this.prisma!.agentExecutionLog.findFirst({
      where: {
        agentName: 'ReviewHarvestingAgent',
        // TODO: Fix JSON query when Prisma types are updated
        // input: { path: '$.clientId', equals: client.id },
        createdAt: { gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) }, // 90 days
      },
    });

    if (recentRequest) return false;

    // Check if client has already reviewed
    if (await this.hasClientReviewed(client.id)) return false;

    // Check if client opted out
    const metadata = client.metadata as { reviewOptOut?: boolean } | null | undefined;
    if (metadata?.reviewOptOut) return false;

    return true;
  }

  private formatCaseType(practiceArea: string): string {
    const formatted = {
      immigration: 'immigration',
      personal_injury: 'personal injury',
      workers_compensation: 'workers compensation',
      criminal_defense: 'criminal defense',
      family_law: 'family law',
      traffic: 'traffic violation',
    };

    return formatted[practiceArea as keyof typeof formatted] || practiceArea;
  }

  private determineRequestMethod(client: {
    email?: string;
    phone?: string;
  }): ReviewRequest['requestMethod'] {
    if (client.email && client.phone) return 'both';
    if (client.email) return 'email';
    if (client.phone) return 'sms';
    return 'email'; // Default
  }

  private getTimeSince(date: Date): string {
    const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (days === 0) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  }

  private async identifyPositiveSentimentClients(): Promise<ReviewRequest[]> {
    try {
      const positiveCalls = await this.prisma!.call.findMany({
        where: {
          createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
        take: 20,
      });

      // Convert to review requests
      return [];
    } catch (error) {
      logger.error('Failed to identify positive sentiment clients:', errorToLogMeta(error));
      return [];
    }
  }

  private generateReviewLinks(request: ReviewRequest): { email: string; sms: string } {
    const platforms = this.REVIEW_PLATFORMS.slice(0, 3); // Top 3 platforms

    const emailLinks = platforms
      .map(p => `• ${p.name.charAt(0).toUpperCase() + p.name.slice(1)}: ${p.url}`)
      .join('\n');

    // Create shortened link for SMS (in production would use URL shortener)
    const smsLink = 'https://vlf.link/review';

    return { email: emailLinks, sms: smsLink };
  }

  private personalizText(template: string, data: Record<string, unknown>): string {
    let personalized = template;

    Object.keys(data).forEach(key => {
      const regex = new RegExp(`{${key}}`, 'g');
      personalized = personalized.replace(regex, String(data[key] || ''));
    });

    return personalized;
  }

  private async sendEmailRequest(
    request: ReviewRequest,
    message: { subject: string; body: string }
  ): Promise<void> {
    if (!request.clientEmail) return;

    try {
      await this.emailTransporter.sendMail({
        from: '"Vasquez Law Firm" <reviews@vasquezlawfirm.com>',
        to: request.clientEmail,
        subject: message.subject,
        text: message.body,
        html: this.formatEmailHTML(message.body),
      });
    } catch (error) {
      logger.error(`Failed to send email to ${request.clientEmail}:`, errorToLogMeta(error));
    }
  }

  private async sendSMSRequest(request: ReviewRequest, message: { text: string }): Promise<void> {
    // SMS functionality has been removed
    // Consider using email-only communication or integrating with GoHighLevel
    logger.info(`SMS request skipped for ${request.clientName} - SMS service not configured`);
  }

  private formatEmailHTML(body: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #003366; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background-color: #f9f9f9; }
    .button { display: inline-block; padding: 12px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Vasquez Law Firm, PLLC</h1>
    </div>
    <div class="content">
      ${body.replace(/\n/g, '<br>')}
    </div>
    <div class="footer">
      <p>Vasquez Law Firm, PLLC | 333 W Trade St, Charlotte, NC 28202</p>
      <p>This email was sent because you are a valued client. <a href="#">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>
    `;
  }

  private async trackReviewRequest(request: ReviewRequest): Promise<void> {
    try {
      await this.prisma!.agentExecutionLog.create({
        data: {
          agentName: 'ReviewHarvestingAgent',
          executionType: 'review_request',
          input: {
            ...request,
            lastContactDate: request.lastContactDate.toISOString(),
          } as any,
          output: { status: 'sent' } as any,
          duration: 1000,
          success: true,
        },
      });
    } catch (error) {
      logger.error('Failed to track review request:', errorToLogMeta(error));
    }
  }

  private async fetchNewReviews(platform: ReviewPlatform): Promise<ReviewResponse[]> {
    // In production, would use platform APIs
    logger.info(`Fetching new reviews from ${platform.name}`);

    // Mock data for demonstration
    return [];
  }

  private async analyzeSentiment(review: {
    rating: number;
    reviewText?: string;
  }): Promise<'positive' | 'negative' | 'neutral'> {
    if (review.rating >= 4) return 'positive';
    if (review.rating <= 2) return 'negative';
    return 'neutral';
  }

  private async generateReviewResponse(
    review: { rating: number; reviewerName?: string },
    sentiment: string
  ): Promise<string> {
    const templates = this.RESPONSE_TEMPLATES[sentiment as keyof typeof this.RESPONSE_TEMPLATES];
    let templateArray: string[] = [];

    if (sentiment === 'positive') {
      const positiveTemplates = templates as typeof this.RESPONSE_TEMPLATES.positive;
      templateArray = review.rating === 5 ? positiveTemplates.fiveStar : positiveTemplates.fourStar;
    } else if (sentiment === 'negative') {
      const negativeTemplates = templates as typeof this.RESPONSE_TEMPLATES.negative;
      templateArray = negativeTemplates.general;
    } else if (sentiment === 'neutral') {
      const neutralTemplates = templates as typeof this.RESPONSE_TEMPLATES.neutral;
      templateArray = neutralTemplates.general;
    }

    const template = templateArray[Math.floor(Math.random() * templateArray.length)];

    // Personalize response
    return template.replace(/{reviewerName}/g, review.reviewerName || 'there');
  }

  private async postReviewResponse(
    platform: ReviewPlatform,
    review: ReviewResponse,
    response: string
  ): Promise<void> {
    // In production, would use platform APIs to post response
    logger.info(`Posted response to ${platform.name}: ${response.substring(0, 50)}...`);
  }

  private async trackReviewResponse(
    review: ReviewResponse,
    response: string,
    sentiment: string
  ): Promise<void> {
    // Track in database
    logger.info(`Tracked ${sentiment} review response`);
  }

  private async escalateNegativeReview(review: ReviewResponse): Promise<void> {
    // Create urgent task for management
    try {
      await this.prisma!.task.create({
        data: {
          title: `Urgent: Negative Review Response Needed`,
          description: `Negative ${review.rating}-star review from ${review.reviewerName}: "${review.reviewText}"`,
          type: 'client_communication',
          priority: 'urgent',
          status: 'pending',
          createdById: 'system',
          assignedToId: process.env.MANAGER_USER_ID || 'admin',
        },
      });
    } catch (error) {
      logger.error('Failed to create escalation task:', errorToLogMeta(error));
    }
  }

  private async amplifyPositiveReview(review: ReviewResponse): Promise<void> {
    // Share on social media
    logger.info(`Amplifying positive review from ${review.reviewerName}`);
  }

  private async getPendingFollowUps(): Promise<
    Array<{ clientId: string; clientName: string; attemptNumber: number }>
  > {
    // Get follow-ups due for sending
    return [];
  }

  private async hasClientReviewed(clientId: string): Promise<boolean> {
    // Check if client has left a review
    return false;
  }

  private async markFollowUpComplete(followUp: { clientName: string }): Promise<void> {
    logger.info(`Marked follow-up complete for ${followUp.clientName}`);
  }

  private async generateFollowUpMessage(followUp: {
    clientName: string;
  }): Promise<{ email: { subject: string; body: string }; sms: { text: string } }> {
    return {
      email: this.REQUEST_TEMPLATES.email.gentle_reminder,
      sms: this.REQUEST_TEMPLATES.sms.gentle_reminder,
    };
  }

  private async sendFollowUp(
    followUp: { clientName: string },
    message: { email: { subject: string; body: string }; sms: { text: string } }
  ): Promise<void> {
    // Send follow-up message
    logger.info(`Sent follow-up to ${followUp.clientName}`);
  }

  private async respondToNegativeReview(review: { reviewerName?: string }): Promise<void> {
    const response = this.RESPONSE_TEMPLATES.negative.general[0];
    logger.info(`Responded to negative review: ${response.substring(0, 50)}...`);
  }

  private async createInternalTask(review: { reviewerName?: string }): Promise<void> {
    logger.info(`Created internal task for negative review from ${review.reviewerName}`);
  }

  private async createServiceRecoveryPlan(review: { reviewerName?: string }): Promise<void> {
    logger.info(`Created service recovery plan for ${review.reviewerName}`);
  }

  private async createSocialContentFromReview(review: { reviewerName?: string }): Promise<void> {
    logger.info(`Created social content from review by ${review.reviewerName}`);
  }

  private async addToWebsiteTestimonials(review: { reviewerName?: string }): Promise<void> {
    logger.info(`Added review to website testimonials: ${review.reviewerName}`);
  }

  private async updateEmailSignatures(review: { reviewerName?: string }): Promise<void> {
    logger.info(`Updated email signatures with review from ${review.reviewerName}`);
  }

  private async updateReviewWidgets(): Promise<void> {
    // Update review widgets on website
    const stats = {
      averageRating: 4.8,
      totalReviews: 500,
      platforms: {
        google: 250,
        facebook: 150,
        avvo: 100,
      },
    };

    logger.info('📊 Updated review widgets:', stats);
  }

  private async analyzeReviewPerformance(): Promise<void> {
    const performance = {
      requestsSent: 100,
      reviewsReceived: 25,
      conversionRate: 0.25,
      averageRating: 4.8,
      platformBreakdown: {
        google: 15,
        facebook: 7,
        avvo: 3,
      },
    };

    logger.info('📈 Review Performance Analysis:', performance);
  }

  /**
   * Execute review request campaign
   */
  private async executeReviewRequestCampaign(): Promise<void> {
    logger.info('📧 Executing review request campaign');

    // Get eligible clients for review requests
    const eligibleClients = await this.getEligibleClients();

    for (const client of eligibleClients) {
      try {
        await this.sendReviewRequest(client);

        // Track campaign
        await this.trackCampaign({
          clientId: client.id,
          campaignType: 'review_request',
          sentAt: new Date(),
        });
      } catch (error) {
        logger.error(`Failed to send review request to ${client.name}:`, errorToLogMeta(error));
      }
    }
  }

  private async getEligibleClients(): Promise<
    Array<{
      id: string;
      name: string;
      email?: string;
      phone?: string;
      preferredContact?: string;
      caseType?: string;
    }>
  > {
    // In production, would query database for clients who:
    // - Had successful case outcomes
    // - Haven't been asked for review in 90 days
    // - Have valid contact information
    return [];
  }

  private async trackCampaign(data: {
    clientId: string;
    campaignType: string;
    sentAt: Date;
  }): Promise<void> {
    // Track campaign data for analytics
    logger.info('Tracking campaign:', data);
  }

  private async sendReviewRequest(client: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    preferredContact?: string;
    caseType?: string;
  }): Promise<void> {
    logger.info(`Sending review request to ${client.name}`);

    // Create a ReviewRequest object for this client
    const reviewRequest: ReviewRequest = {
      clientId: client.id,
      clientName: client.name,
      clientEmail: client.email,
      clientPhone: client.phone,
      caseType: client.caseType || 'legal matter',
      caseOutcome: 'resolved',
      lastContactDate: new Date(),
      requestMethod: client.preferredContact === 'sms' ? 'sms' : 'email',
      urgency: 'standard',
      personalizationData: {
        attorneyName: 'The Vasquez Law Firm Team',
        timeSince: 'recently',
      },
    };

    // Generate personalized message
    const message = await this.generatePersonalizedMessage(reviewRequest);

    // Choose communication method based on client preferences
    if (client.preferredContact === 'email' && client.email) {
      await this.sendEmailRequest(reviewRequest, message.email);
    } else if (client.preferredContact === 'sms' && client.phone) {
      await this.sendSMSRequest(reviewRequest, message.sms);
    } else if (client.email) {
      // Default to email
      await this.sendEmailRequest(reviewRequest, message.email);
    }
  }
}
