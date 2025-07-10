'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.campaignAutomationService = exports.CampaignAutomationService = void 0;
const gohighlevel_1 = require('../../services/gohighlevel');
const prisma_1 = require('../../lib/prisma');
const logger_1 = require('../../lib/logger');
const date_fns_1 = require('date-fns');
class CampaignAutomationService {
  // Run daily campaign automation
  async runDailyCampaigns() {
    try {
      logger_1.logger.info('Starting daily campaign automation');
      await Promise.all([
        this.runBirthdayCampaigns(),
        this.runAnniversaryCampaigns(),
        this.runInactiveClientCampaigns(),
        this.runReviewRequestCampaigns(),
        this.runHolidayCampaigns(),
        this.runEducationalCampaigns(),
        this.runWinBackCampaigns(),
      ]);
      logger_1.logger.info('Daily campaign automation completed');
    } catch (error) {
      logger_1.logger.error('Daily campaign automation failed:', error);
    }
  }
  // Birthday campaigns
  async runBirthdayCampaigns() {
    try {
      const today = new Date();
      const contacts = await prisma_1.prisma.contact.findMany({
        where: {
          birthDate: {
            equals: today,
          },
          smsOptOut: false,
        },
      });
      const birthdayCampaignId = process.env.GHL_BIRTHDAY_CAMPAIGN_ID;
      if (!birthdayCampaignId) return;
      for (const contact of contacts) {
        if (contact.ghlId) {
          await gohighlevel_1.ghlService.triggerCampaign({
            contactId: contact.ghlId,
            campaignId: birthdayCampaignId,
          });
          logger_1.logger.info('Birthday campaign triggered', {
            contactId: contact.id,
            name: `${contact.firstName} ${contact.lastName}`,
          });
        }
      }
    } catch (error) {
      logger_1.logger.error('Birthday campaigns failed:', error);
    }
  }
  // Anniversary campaigns (1 year since becoming client)
  async runAnniversaryCampaigns() {
    try {
      const oneYearAgo = (0, date_fns_1.subDays)(new Date(), 365);
      const clients = await prisma_1.prisma.client.findMany({
        where: {
          createdAt: {
            gte: (0, date_fns_1.startOfDay)(oneYearAgo),
            lte: (0, date_fns_1.endOfDay)(oneYearAgo),
          },
          status: 'active',
        },
        include: {
          contact: true,
        },
      });
      const anniversaryCampaignId = process.env.GHL_ANNIVERSARY_CAMPAIGN_ID;
      if (!anniversaryCampaignId) return;
      for (const client of clients) {
        if (client.contact?.ghlId && !client.contact.smsOptOut) {
          await gohighlevel_1.ghlService.triggerCampaign({
            contactId: client.contact.ghlId,
            campaignId: anniversaryCampaignId,
          });
          logger_1.logger.info('Anniversary campaign triggered', {
            clientId: client.id,
            name: `${client.firstName} ${client.lastName}`,
          });
        }
      }
    } catch (error) {
      logger_1.logger.error('Anniversary campaigns failed:', error);
    }
  }
  // Inactive client re-engagement
  async runInactiveClientCampaigns() {
    try {
      const threeMonthsAgo = (0, date_fns_1.subDays)(new Date(), 90);
      const inactiveClients = await prisma_1.prisma.client.findMany({
        where: {
          lastContactDate: {
            lte: threeMonthsAgo,
          },
          status: 'active',
        },
        include: {
          contact: true,
        },
      });
      const reEngagementCampaignId = process.env.GHL_REENGAGEMENT_CAMPAIGN_ID;
      if (!reEngagementCampaignId) return;
      for (const client of inactiveClients) {
        if (client.contact?.ghlId && !client.contact.smsOptOut) {
          await gohighlevel_1.ghlService.triggerCampaign({
            contactId: client.contact.ghlId,
            campaignId: reEngagementCampaignId,
          });
          // Update last contact attempt
          await prisma_1.prisma.client.update({
            where: { id: client.id },
            data: { lastContactAttempt: new Date() },
          });
          logger_1.logger.info('Re-engagement campaign triggered', {
            clientId: client.id,
            lastContact: client.lastContactDate,
          });
        }
      }
    } catch (error) {
      logger_1.logger.error('Inactive client campaigns failed:', error);
    }
  }
  // Review request campaigns (30 days after case completion)
  async runReviewRequestCampaigns() {
    try {
      const thirtyDaysAgo = (0, date_fns_1.subDays)(new Date(), 30);
      const completedCases = await prisma_1.prisma.case.findMany({
        where: {
          status: 'closed',
          closedAt: {
            gte: (0, date_fns_1.startOfDay)(thirtyDaysAgo),
            lte: (0, date_fns_1.endOfDay)(thirtyDaysAgo),
          },
          reviewRequested: false,
        },
        include: {
          client: {
            include: {
              contact: true,
            },
          },
        },
      });
      const reviewCampaignId = process.env.GHL_REVIEW_REQUEST_CAMPAIGN_ID;
      if (!reviewCampaignId) return;
      for (const caseRecord of completedCases) {
        if (caseRecord.client.contact?.ghlId && !caseRecord.client.contact.smsOptOut) {
          await gohighlevel_1.ghlService.triggerCampaign({
            contactId: caseRecord.client.contact.ghlId,
            campaignId: reviewCampaignId,
          });
          // Mark review as requested
          await prisma_1.prisma.case.update({
            where: { id: caseRecord.id },
            data: { reviewRequested: true },
          });
          logger_1.logger.info('Review request campaign triggered', {
            caseId: caseRecord.id,
            clientId: caseRecord.clientId,
          });
        }
      }
    } catch (error) {
      logger_1.logger.error('Review request campaigns failed:', error);
    }
  }
  // Holiday campaigns
  async runHolidayCampaigns() {
    try {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      // Define holidays and their campaigns
      const holidays = {
        newYear: { date: [1, 1], campaignId: process.env.GHL_NEW_YEAR_CAMPAIGN_ID },
        thanksgiving: { date: [11, 23], campaignId: process.env.GHL_THANKSGIVING_CAMPAIGN_ID }, // Approximate
        christmas: { date: [12, 25], campaignId: process.env.GHL_CHRISTMAS_CAMPAIGN_ID },
        july4th: { date: [7, 4], campaignId: process.env.GHL_JULY4_CAMPAIGN_ID },
        hispanicHeritage: {
          date: [9, 15],
          campaignId: process.env.GHL_HISPANIC_HERITAGE_CAMPAIGN_ID,
        },
      };
      for (const [holiday, config] of Object.entries(holidays)) {
        if (config.date[0] === month && config.date[1] === day && config.campaignId) {
          // Get all active contacts
          const contacts = await prisma_1.prisma.contact.findMany({
            where: {
              smsOptOut: false,
              ghlId: { not: null },
            },
          });
          for (const contact of contacts) {
            if (contact.ghlId) {
              await gohighlevel_1.ghlService.triggerCampaign({
                contactId: contact.ghlId,
                campaignId: config.campaignId,
              });
            }
          }
          logger_1.logger.info(`${holiday} campaign triggered for ${contacts.length} contacts`);
        }
      }
    } catch (error) {
      logger_1.logger.error('Holiday campaigns failed:', error);
    }
  }
  // Educational campaigns (weekly tips based on practice area)
  async runEducationalCampaigns() {
    try {
      // Only run on Tuesdays
      const today = new Date();
      if (today.getDay() !== 2) return;
      // Get contacts by practice area interest
      const practiceAreas = ['immigration', 'personalInjury', 'criminal', 'family', 'workersComp'];
      for (const practiceArea of practiceAreas) {
        const campaignId = process.env[`GHL_EDUCATIONAL_${practiceArea.toUpperCase()}_CAMPAIGN_ID`];
        if (!campaignId) continue;
        const contacts = await prisma_1.prisma.contact.findMany({
          where: {
            tags: { has: `interested-${practiceArea}` },
            smsOptOut: false,
            ghlId: { not: null },
          },
        });
        for (const contact of contacts) {
          if (contact.ghlId) {
            await gohighlevel_1.ghlService.triggerCampaign({
              contactId: contact.ghlId,
              campaignId,
            });
          }
        }
        logger_1.logger.info(`Educational campaign triggered for ${practiceArea}`, {
          contactCount: contacts.length,
        });
      }
    } catch (error) {
      logger_1.logger.error('Educational campaigns failed:', error);
    }
  }
  // Win-back campaigns for lost opportunities
  async runWinBackCampaigns() {
    try {
      const sixMonthsAgo = (0, date_fns_1.subDays)(new Date(), 180);
      const lostLeads = await prisma_1.prisma.lead.findMany({
        where: {
          status: 'lost',
          updatedAt: {
            gte: (0, date_fns_1.startOfDay)(sixMonthsAgo),
            lte: (0, date_fns_1.endOfDay)(sixMonthsAgo),
          },
          winBackAttempted: false,
        },
      });
      const winBackCampaignId = process.env.GHL_WINBACK_CAMPAIGN_ID;
      if (!winBackCampaignId) return;
      for (const lead of lostLeads) {
        if (lead.ghlContactId) {
          await gohighlevel_1.ghlService.triggerCampaign({
            contactId: lead.ghlContactId,
            campaignId: winBackCampaignId,
          });
          // Mark win-back as attempted
          await prisma_1.prisma.lead.update({
            where: { id: lead.id },
            data: { winBackAttempted: true },
          });
          logger_1.logger.info('Win-back campaign triggered', {
            leadId: lead.id,
          });
        }
      }
    } catch (error) {
      logger_1.logger.error('Win-back campaigns failed:', error);
    }
  }
  // Segment contacts for targeted campaigns
  async segmentContactsForCampaign(criteria) {
    try {
      const where = {
        smsOptOut: false,
        ghlId: { not: null },
      };
      if (criteria.tags && criteria.tags.length > 0) {
        where.tags = { hasEvery: criteria.tags };
      }
      if (criteria.language) {
        where.metadata = {
          path: '$.language',
          equals: criteria.language,
        };
      }
      const contacts = await prisma_1.prisma.contact.findMany({ where });
      const targets = [];
      for (const contact of contacts) {
        // Additional filtering based on criteria
        let shouldInclude = true;
        if (criteria.practiceArea) {
          const hasInterest =
            contact.tags.includes(`interested-${criteria.practiceArea}`) ||
            contact.tags.includes(`practice-area-${criteria.practiceArea}`);
          if (!hasInterest) shouldInclude = false;
        }
        if (criteria.lastContactDays && contact.lastContactDate) {
          const daysSinceContact = Math.floor(
            (new Date().getTime() - contact.lastContactDate.getTime()) / (1000 * 60 * 60 * 24)
          );
          if (daysSinceContact < criteria.lastContactDays) shouldInclude = false;
        }
        if (shouldInclude && contact.ghlId) {
          targets.push({
            contactId: contact.ghlId,
            campaignId: '', // To be set by caller
            reason: `Segmented based on criteria: ${JSON.stringify(criteria)}`,
            data: {
              contactName: `${contact.firstName} ${contact.lastName}`,
              ...criteria,
            },
          });
        }
      }
      return targets;
    } catch (error) {
      logger_1.logger.error('Contact segmentation failed:', error);
      return [];
    }
  }
  // Execute bulk campaign
  async executeBulkCampaign(campaignId, targets) {
    const results = {
      success: 0,
      failed: 0,
      errors: [],
    };
    // Process in batches to avoid overwhelming GHL API
    const batchSize = 50;
    for (let i = 0; i < targets.length; i += batchSize) {
      const batch = targets.slice(i, i + batchSize);
      const promises = batch.map(async target => {
        try {
          await gohighlevel_1.ghlService.triggerCampaign({
            contactId: target.contactId,
            campaignId: target.campaignId || campaignId,
          });
          results.success++;
        } catch (error) {
          results.failed++;
          results.errors.push({
            contactId: target.contactId,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      });
      await Promise.all(promises);
      // Rate limiting between batches
      if (i + batchSize < targets.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    logger_1.logger.info('Bulk campaign executed', {
      campaignId,
      totalTargets: targets.length,
      success: results.success,
      failed: results.failed,
    });
    return results;
  }
  // Get campaign performance metrics
  async getCampaignMetrics(dateRange) {
    try {
      // This would integrate with GHL's reporting API
      // For now, return mock data structure
      return {
        campaigns: [
          {
            id: 'birthday-campaign',
            name: 'Birthday Greetings',
            sent: 45,
            delivered: 43,
            opened: 38,
            clicked: 12,
            responded: 8,
            conversionRate: 17.8,
          },
          {
            id: 'review-request',
            name: 'Review Requests',
            sent: 120,
            delivered: 118,
            opened: 95,
            clicked: 45,
            responded: 32,
            conversionRate: 26.7,
          },
        ],
        summary: {
          totalSent: 165,
          totalDelivered: 161,
          avgOpenRate: 82.6,
          avgClickRate: 35.4,
          avgResponseRate: 24.8,
        },
      };
    } catch (error) {
      logger_1.logger.error('Failed to get campaign metrics:', error);
      throw error;
    }
  }
}
exports.CampaignAutomationService = CampaignAutomationService;
// Export singleton instance
exports.campaignAutomationService = new CampaignAutomationService();
