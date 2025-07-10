'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== 'default') __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
exports.leadCaptureService = exports.LeadCaptureService = void 0;
const gohighlevel_1 = require('../../services/gohighlevel');
const prisma_1 = require('../../lib/prisma');
const logger_1 = require('../../lib/logger');
const zod_1 = require('zod');
// Lead capture schemas
const LeadCaptureSchema = zod_1.z.object({
  firstName: zod_1.z.string(),
  lastName: zod_1.z.string(),
  email: zod_1.z.string().email(),
  phone: zod_1.z.string(),
  practiceArea: zod_1.z.enum([
    'immigration',
    'personalInjury',
    'criminal',
    'family',
    'workersComp',
    'traffic',
  ]),
  message: zod_1.z.string().optional(),
  source: zod_1.z.string(),
  language: zod_1.z.enum(['en', 'es']).default('en'),
  urgency: zod_1.z.enum(['immediate', 'soon', 'planning']).optional(),
  metadata: zod_1.z.record(zod_1.z.any()).optional(),
});
const WebFormSchema = LeadCaptureSchema.extend({
  formId: zod_1.z.string(),
  pageUrl: zod_1.z.string(),
  ipAddress: zod_1.z.string().optional(),
  userAgent: zod_1.z.string().optional(),
});
class LeadCaptureService {
  // Process new lead from website
  async captureWebLead(data) {
    try {
      const validated = WebFormSchema.parse(data);
      // Create contact in GHL
      const contact = await gohighlevel_1.ghlService.upsertContact({
        firstName: validated.firstName,
        lastName: validated.lastName,
        email: validated.email,
        phone: validated.phone,
        tags: [
          'website-lead',
          `practice-area-${validated.practiceArea}`,
          `language-${validated.language}`,
          `urgency-${validated.urgency || 'planning'}`,
          `source-${validated.source}`,
        ],
        source: validated.source,
        customFields: {
          practiceArea: validated.practiceArea,
          initialMessage: validated.message,
          captureDate: new Date().toISOString(),
          formId: validated.formId,
          pageUrl: validated.pageUrl,
          language: validated.language,
          urgency: validated.urgency,
          ...validated.metadata,
        },
      });
      // Create lead in database
      const lead = await prisma_1.prisma.lead.create({
        data: {
          ghlContactId: contact.id,
          firstName: validated.firstName,
          lastName: validated.lastName,
          email: validated.email,
          phone: validated.phone,
          practiceArea: validated.practiceArea,
          source: validated.source,
          sourceDetails: {
            formId: validated.formId,
            pageUrl: validated.pageUrl,
            ipAddress: validated.ipAddress,
            userAgent: validated.userAgent,
          },
          message: validated.message,
          language: validated.language,
          urgency: validated.urgency,
          status: 'new',
          metadata: validated.metadata || {},
        },
      });
      // Trigger appropriate campaign based on practice area and urgency
      await this.triggerLeadNurtureCampaign(contact.id, validated);
      // Create opportunity in GHL
      await this.createLeadOpportunity(contact.id, validated);
      // Send immediate notification for urgent leads
      if (validated.urgency === 'immediate') {
        await this.notifyTeamOfUrgentLead(lead, validated);
      }
      logger_1.logger.info('Web lead captured', {
        leadId: lead.id,
        ghlContactId: contact.id,
        practiceArea: validated.practiceArea,
      });
      return { lead, contact };
    } catch (error) {
      logger_1.logger.error('Failed to capture web lead:', error);
      throw error;
    }
  }
  // Trigger nurture campaign based on lead data
  async triggerLeadNurtureCampaign(contactId, data) {
    try {
      // Determine campaign based on practice area and language
      const campaignMap = {
        immigration: {
          en: process.env.GHL_IMMIGRATION_NURTURE_EN || '',
          es: process.env.GHL_IMMIGRATION_NURTURE_ES || '',
        },
        personalInjury: {
          en: process.env.GHL_PERSONAL_INJURY_NURTURE_EN || '',
          es: process.env.GHL_PERSONAL_INJURY_NURTURE_ES || '',
        },
        criminal: {
          en: process.env.GHL_CRIMINAL_NURTURE_EN || '',
          es: process.env.GHL_CRIMINAL_NURTURE_ES || '',
        },
        family: {
          en: process.env.GHL_FAMILY_LAW_NURTURE_EN || '',
          es: process.env.GHL_FAMILY_LAW_NURTURE_ES || '',
        },
        workersComp: {
          en: process.env.GHL_WORKERS_COMP_NURTURE_EN || '',
          es: process.env.GHL_WORKERS_COMP_NURTURE_ES || '',
        },
        traffic: {
          en: process.env.GHL_TRAFFIC_NURTURE_EN || '',
          es: process.env.GHL_TRAFFIC_NURTURE_ES || '',
        },
      };
      const campaignId = campaignMap[data.practiceArea]?.[data.language];
      if (campaignId) {
        await gohighlevel_1.ghlService.triggerCampaign({
          contactId,
          campaignId,
        });
      } else {
        // Fallback to generic nurture campaign
        const genericCampaignId = process.env.GHL_GENERIC_NURTURE_CAMPAIGN_ID;
        if (genericCampaignId) {
          await gohighlevel_1.ghlService.triggerCampaign({
            contactId,
            campaignId: genericCampaignId,
          });
        }
      }
    } catch (error) {
      logger_1.logger.error('Failed to trigger nurture campaign:', error);
    }
  }
  // Create opportunity in GHL pipeline
  async createLeadOpportunity(contactId, data) {
    try {
      const pipelineId = process.env.GHL_LEAD_PIPELINE_ID || '';
      const stageId = process.env.GHL_NEW_LEAD_STAGE_ID || '';
      if (!pipelineId || !stageId) {
        logger_1.logger.warn('GHL pipeline not configured for opportunities');
        return;
      }
      await gohighlevel_1.ghlService.createOpportunity({
        contactId,
        name: `${data.firstName} ${data.lastName} - ${data.practiceArea}`,
        pipelineId,
        stageId,
        customFields: {
          practiceArea: data.practiceArea,
          language: data.language,
          urgency: data.urgency,
          source: data.source,
          captureDate: new Date().toISOString(),
        },
      });
    } catch (error) {
      logger_1.logger.error('Failed to create lead opportunity:', error);
    }
  }
  // Notify team of urgent lead
  async notifyTeamOfUrgentLead(lead, data) {
    try {
      // Get attorneys for the practice area
      const attorneys = await prisma_1.prisma.user.findMany({
        where: {
          role: 'ATTORNEY',
          practiceAreas: {
            has: data.practiceArea,
          },
          phoneNumber: { not: null },
        },
      });
      // Send SMS notifications via GHL
      for (const attorney of attorneys) {
        if (attorney.phoneNumber) {
          await gohighlevel_1.ghlService.sendSMSByPhone(
            attorney.phoneNumber,
            `🚨 URGENT LEAD: ${data.firstName} ${data.lastName} needs immediate ${data.practiceArea} help. Phone: ${data.phone}. Check CRM for details.`,
            ['urgent-lead-notification', 'attorney-alert']
          );
        }
      }
      // Also send email notification
      const emailService = (
        await Promise.resolve().then(() => __importStar(require('../../services/email')))
      ).emailService;
      await emailService.sendEmail({
        to: process.env.URGENT_LEAD_EMAIL || 'intake@vasquezlawnc.com',
        subject: `🚨 Urgent ${data.practiceArea} Lead: ${data.firstName} ${data.lastName}`,
        template: 'urgent-lead-notification',
        data: {
          lead: data,
          leadId: lead.id,
          crmLink: `${process.env.GHL_APP_URL}/contacts/${lead.ghlContactId}`,
        },
      });
    } catch (error) {
      logger_1.logger.error('Failed to notify team of urgent lead:', error);
    }
  }
  // Process chat lead
  async captureChatLead(data) {
    try {
      // Extract contact info from conversation if not provided
      const contactInfo = this.extractContactInfoFromChat(data.messages);
      const leadData = {
        firstName: data.firstName || contactInfo.firstName || 'Chat',
        lastName: data.lastName || contactInfo.lastName || 'Visitor',
        email: data.email || contactInfo.email || 'unknown@chat.com',
        phone: data.phone || contactInfo.phone || '0000000000',
        practiceArea: data.practiceArea || contactInfo.practiceArea || 'immigration',
        source: 'website-chat',
        language: contactInfo.language || 'en',
        message: data.messages.map(m => `${m.role}: ${m.content}`).join('\n'),
        metadata: {
          conversationId: data.conversationId,
          messageCount: data.messages.length,
        },
      };
      return await this.captureWebLead({
        ...leadData,
        formId: 'chat-widget',
        pageUrl: 'website-chat',
      });
    } catch (error) {
      logger_1.logger.error('Failed to capture chat lead:', error);
      throw error;
    }
  }
  // Extract contact info from chat messages
  extractContactInfoFromChat(messages) {
    const info = {
      firstName: 'Chat',
      lastName: 'Visitor',
      language: 'en',
    };
    // Simple pattern matching - in production, use NLP
    for (const msg of messages) {
      const content = msg.content.toLowerCase();
      // Detect phone numbers
      const phoneMatch = content.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/);
      if (phoneMatch) {
        info.phone = phoneMatch[0].replace(/\D/g, '');
      }
      // Detect email
      const emailMatch = content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
      if (emailMatch) {
        info.email = emailMatch[0];
      }
      // Detect practice area
      if (
        content.includes('immigration') ||
        content.includes('visa') ||
        content.includes('green card')
      ) {
        info.practiceArea = 'immigration';
      } else if (content.includes('accident') || content.includes('injury')) {
        info.practiceArea = 'personalInjury';
      } else if (content.includes('criminal') || content.includes('arrest')) {
        info.practiceArea = 'criminal';
      } else if (content.includes('divorce') || content.includes('custody')) {
        info.practiceArea = 'family';
      }
      // Detect language
      if (content.includes('español') || content.includes('spanish')) {
        info.language = 'es';
      }
      // Extract name (basic pattern)
      const nameMatch = content.match(/my name is (\w+)\s*(\w*)/i);
      if (nameMatch) {
        info.firstName = nameMatch[1];
        info.lastName = nameMatch[2] || 'Unknown';
      }
    }
    return info;
  }
  // Process phone lead
  async capturePhoneLead(data) {
    try {
      // Check if contact exists
      let contact = await gohighlevel_1.ghlService.findContactByPhone(data.fromNumber);
      if (!contact) {
        // Create new contact
        contact = await gohighlevel_1.ghlService.upsertContact({
          firstName: 'Phone',
          lastName: 'Lead',
          phone: data.fromNumber,
          tags: ['phone-lead', 'inbound-call'],
          source: 'phone-call',
          customFields: {
            firstCallDate: new Date().toISOString(),
            callDuration: data.duration,
          },
        });
      }
      // Create lead record
      const lead = await prisma_1.prisma.lead.create({
        data: {
          ghlContactId: contact.id,
          firstName: contact.firstName || 'Phone',
          lastName: contact.lastName || 'Lead',
          phone: data.fromNumber,
          source: 'phone-call',
          sourceDetails: {
            callId: data.callId,
            duration: data.duration,
            recordingUrl: data.recordingUrl,
          },
          message: data.transcription || data.agentNotes,
          status: 'contacted',
          metadata: {
            callId: data.callId,
            toNumber: data.toNumber,
          },
        },
      });
      // Trigger phone lead follow-up campaign
      const phoneCampaignId = process.env.GHL_PHONE_LEAD_CAMPAIGN_ID;
      if (phoneCampaignId) {
        await gohighlevel_1.ghlService.triggerCampaign({
          contactId: contact.id,
          campaignId: phoneCampaignId,
        });
      }
      return { lead, contact };
    } catch (error) {
      logger_1.logger.error('Failed to capture phone lead:', error);
      throw error;
    }
  }
  // Score lead based on various factors
  async scoreAndPrioritizeLead(leadId) {
    try {
      const lead = await prisma_1.prisma.lead.findUnique({
        where: { id: leadId },
      });
      if (!lead) return;
      let score = 0;
      const factors = {};
      // Urgency factor
      if (lead.urgency === 'immediate') {
        score += 30;
        factors.urgency = 30;
      } else if (lead.urgency === 'soon') {
        score += 20;
        factors.urgency = 20;
      }
      // Practice area value
      const practiceAreaScores = {
        personalInjury: 25,
        immigration: 20,
        criminal: 20,
        family: 15,
        workersComp: 15,
        traffic: 10,
      };
      score += practiceAreaScores[lead.practiceArea] || 10;
      factors.practiceArea = practiceAreaScores[lead.practiceArea] || 10;
      // Contact info completeness
      if (lead.email && lead.email !== 'unknown@chat.com') {
        score += 10;
        factors.emailProvided = 10;
      }
      if (lead.phone && lead.phone !== '0000000000') {
        score += 15;
        factors.phoneProvided = 15;
      }
      // Source quality
      const sourceScores = {
        'website-form': 15,
        'website-chat': 10,
        'phone-call': 20,
        referral: 25,
        'google-ads': 15,
        'facebook-ads': 12,
        organic: 10,
      };
      score += sourceScores[lead.source] || 5;
      factors.source = sourceScores[lead.source] || 5;
      // Message content analysis
      if (lead.message) {
        const urgentKeywords = ['urgent', 'emergency', 'immediately', 'asap', 'today'];
        const hasUrgentKeywords = urgentKeywords.some(keyword =>
          lead.message.toLowerCase().includes(keyword)
        );
        if (hasUrgentKeywords) {
          score += 10;
          factors.urgentKeywords = 10;
        }
      }
      // Update lead with score
      await prisma_1.prisma.lead.update({
        where: { id: leadId },
        data: {
          score,
          scoreFactors: factors,
          priority: score >= 70 ? 'high' : score >= 40 ? 'medium' : 'low',
        },
      });
      // Update GHL contact with score
      if (lead.ghlContactId) {
        await gohighlevel_1.ghlService.upsertContact({
          phone: lead.phone,
          firstName: lead.firstName,
          lastName: lead.lastName,
          customFields: {
            leadScore: score,
            leadPriority: score >= 70 ? 'high' : score >= 40 ? 'medium' : 'low',
          },
        });
      }
      logger_1.logger.info('Lead scored', {
        leadId,
        score,
        factors,
      });
      return { score, factors };
    } catch (error) {
      logger_1.logger.error('Failed to score lead:', error);
    }
  }
  // Get lead analytics
  async getLeadAnalytics(dateRange) {
    try {
      const where = dateRange
        ? {
            createdAt: {
              gte: dateRange.start,
              lte: dateRange.end,
            },
          }
        : {};
      const [
        totalLeads,
        leadsByPracticeArea,
        leadsBySource,
        leadsByStatus,
        averageScore,
        conversionRate,
      ] = await Promise.all([
        // Total leads
        prisma_1.prisma.lead.count({ where }),
        // Leads by practice area
        prisma_1.prisma.lead.groupBy({
          by: ['practiceArea'],
          where,
          _count: true,
        }),
        // Leads by source
        prisma_1.prisma.lead.groupBy({
          by: ['source'],
          where,
          _count: true,
        }),
        // Leads by status
        prisma_1.prisma.lead.groupBy({
          by: ['status'],
          where,
          _count: true,
        }),
        // Average lead score
        prisma_1.prisma.lead.aggregate({
          where,
          _avg: { score: true },
        }),
        // Conversion rate (leads that became clients)
        prisma_1.prisma.lead.count({
          where: {
            ...where,
            status: 'converted',
          },
        }),
      ]);
      return {
        totalLeads,
        leadsByPracticeArea: leadsByPracticeArea.map(item => ({
          practiceArea: item.practiceArea,
          count: item._count,
        })),
        leadsBySource: leadsBySource.map(item => ({
          source: item.source,
          count: item._count,
        })),
        leadsByStatus: leadsByStatus.map(item => ({
          status: item.status,
          count: item._count,
        })),
        averageScore: averageScore._avg.score || 0,
        conversionRate: totalLeads > 0 ? (conversionRate / totalLeads) * 100 : 0,
      };
    } catch (error) {
      logger_1.logger.error('Failed to get lead analytics:', error);
      throw error;
    }
  }
}
exports.LeadCaptureService = LeadCaptureService;
// Export singleton instance
exports.leadCaptureService = new LeadCaptureService();
