'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.followUpAutomationAgent = exports.FollowUpAutomationAgent = void 0;
const base_1 = require('@/lib/crewai/base');
const gohighlevel_1 = require('@/services/gohighlevel');
const logger_1 = require('@/lib/logger');
const prisma_1 = require('@/lib/prisma');
const zod_1 = require('zod');
const FollowUpSequenceSchema = zod_1.z.object({
  contactId: zod_1.z.string(),
  sequenceType: zod_1.z.enum([
    'hot_lead',
    'warm_lead',
    'cold_lead',
    'post_consultation',
    'client_onboarding',
  ]),
  steps: zod_1.z.array(
    zod_1.z.object({
      delay: zod_1.z.number(), // minutes from previous step
      action: zod_1.z.enum(['email', 'sms', 'call', 'task', 'campaign']),
      content: zod_1.z.string(),
      priority: zod_1.z.enum(['high', 'medium', 'low']),
    })
  ),
  personalizations: zod_1.z.record(zod_1.z.string()),
  stopConditions: zod_1.z.array(zod_1.z.string()),
});
class FollowUpAutomationAgent extends base_1.Agent {
  constructor() {
    super({
      name: 'FollowUpAutomationAgent',
      role: 'Follow-Up Automation Specialist',
      goal: 'Create and manage intelligent follow-up sequences that convert leads into clients',
      backstory: `You are a master of follow-up automation with expertise in behavioral psychology and conversion optimization. 
                  You design personalized follow-up sequences that nurture leads at the perfect pace, never letting 
                  valuable prospects slip through the cracks while respecting their communication preferences.`,
    });
    this.ghl = new gohighlevel_1.GoHighLevelService();
  }
  async createFollowUpSequence(data) {
    const sequenceType = this.determineSequenceType(data);
    const steps = this.generateFollowUpSteps(sequenceType, data);
    const personalizations = await this.generatePersonalizations(data);
    const sequence = {
      contactId: data.contactId,
      sequenceType,
      steps,
      personalizations,
      stopConditions: ['appointment_scheduled', 'became_client', 'explicit_opt_out', 'marked_lost'],
    };
    await this.deploySequence(sequence);
    return sequence;
  }
  determineSequenceType(data) {
    if (data.tier === 'hot') return 'hot_lead';
    if (data.tier === 'warm') return 'warm_lead';
    if (data.tier === 'cold') return 'cold_lead';
    return 'cold_lead';
  }
  generateFollowUpSteps(type, data) {
    const isSpanish = data.languagePreference === 'es';
    switch (type) {
      case 'hot_lead':
        return [
          {
            delay: 5, // 5 minutes
            action: 'sms',
            content: isSpanish
              ? `Hola {{firstName}}, soy del equipo legal de Vasquez Law. Vi su consulta sobre {{practiceArea}}. ¿Podemos hablar ahora? Es urgente.`
              : `Hi {{firstName}}, this is the Vasquez Law team. I saw your urgent {{practiceArea}} inquiry. Can we talk now?`,
            priority: 'high',
          },
          {
            delay: 10, // 10 minutes after SMS
            action: 'call',
            content: 'Urgent consultation call for {{practiceArea}} case',
            priority: 'high',
          },
          {
            delay: 30, // 30 minutes if no response
            action: 'email',
            content: this.getHotLeadEmailTemplate(data),
            priority: 'high',
          },
          {
            delay: 1440, // 24 hours
            action: 'task',
            content: 'Personal follow-up call from attorney for high-value lead',
            priority: 'high',
          },
        ];
      case 'warm_lead':
        return [
          {
            delay: 60, // 1 hour
            action: 'email',
            content: this.getWarmLeadEmailTemplate(data),
            priority: 'medium',
          },
          {
            delay: 1440, // 24 hours
            action: 'sms',
            content: isSpanish
              ? `{{firstName}}, ¿tuvo oportunidad de revisar nuestra información sobre {{practiceArea}}? Estamos aquí para ayudar.`
              : `{{firstName}}, did you get a chance to review our {{practiceArea}} information? We're here to help.`,
            priority: 'medium',
          },
          {
            delay: 4320, // 3 days
            action: 'campaign',
            content: 'warm_lead_education_series',
            priority: 'medium',
          },
        ];
      case 'cold_lead':
        return [
          {
            delay: 1440, // 24 hours
            action: 'email',
            content: this.getColdLeadEmailTemplate(data),
            priority: 'low',
          },
          {
            delay: 10080, // 1 week
            action: 'campaign',
            content: 'monthly_newsletter',
            priority: 'low',
          },
        ];
      default:
        return [];
    }
  }
  async generatePersonalizations(data) {
    const contact = await this.ghl.findContactByEmail(data.contactId); // TODO: Add findContactById method
    return {
      firstName: contact?.firstName || 'Friend',
      practiceArea: this.formatPracticeArea(data.practiceAreas[0]),
      urgencyText: this.getUrgencyText(data.urgencyLevel, data.languagePreference),
      caseValueText: this.getCaseValueText(data.leadScore, data.languagePreference),
      attorneyName: this.assignAttorney(data.practiceAreas[0]),
      nextStepCTA: this.getNextStepCTA(data.tier, data.languagePreference),
    };
  }
  formatPracticeArea(area) {
    const formatted = {
      'family-immigration': 'Family Immigration',
      'business-immigration': 'Business Immigration',
      'removal-defense': 'Removal Defense',
      citizenship: 'Citizenship & Naturalization',
      asylum: 'Asylum Protection',
      'criminal-immigration': 'Criminal Immigration',
      'adjustment-status': 'Green Card / Adjustment of Status',
      'visa-services': 'Visa Services',
    };
    return formatted[area] || 'Immigration';
  }
  getUrgencyText(level, lang) {
    const texts = {
      urgent: {
        en: 'requires immediate attention',
        es: 'requiere atención inmediata',
      },
      high: {
        en: 'is time-sensitive',
        es: 'es urgente',
      },
      medium: {
        en: 'should be addressed soon',
        es: 'debe ser atendido pronto',
      },
      low: {
        en: 'can be planned ahead',
        es: 'puede ser planificado',
      },
    };
    return texts[level]?.[lang] || texts.medium.en;
  }
  getCaseValueText(score, lang) {
    if (score >= 80) {
      return lang === 'es' ? 'caso de alta prioridad' : 'high-priority case';
    }
    if (score >= 60) {
      return lang === 'es' ? 'caso importante' : 'important case';
    }
    return lang === 'es' ? 'consulta' : 'consultation';
  }
  assignAttorney(practiceArea) {
    const attorneyAssignments = {
      'removal-defense': 'Attorney Maria Rodriguez',
      'business-immigration': 'Attorney James Chen',
      'family-immigration': 'Attorney Sarah Williams',
      'criminal-immigration': 'Attorney Michael Davis',
    };
    return attorneyAssignments[practiceArea] || 'Attorney William Vasquez';
  }
  getNextStepCTA(tier, lang) {
    const ctas = {
      hot: {
        en: 'Schedule Your Urgent Consultation Now',
        es: 'Agende Su Consulta Urgente Ahora',
      },
      warm: {
        en: 'Book Your Free Consultation',
        es: 'Reserve Su Consulta Gratuita',
      },
      cold: {
        en: 'Learn More About Our Services',
        es: 'Conozca Más Sobre Nuestros Servicios',
      },
    };
    return ctas[tier]?.[lang] || ctas.warm.en;
  }
  getHotLeadEmailTemplate(data) {
    return `
Subject: URGENT: {{practiceArea}} Case - Immediate Action Required

Dear {{firstName}},

Your {{practiceArea}} matter {{urgencyText}}. I'm {{attorneyName}}, and I'm personally handling your {{caseValueText}}.

I've cleared my schedule to speak with you TODAY about:
- Your immediate legal options
- Critical deadlines you're facing
- How we can protect your rights starting now

My direct line: (704) 775-9113

Or click here to book an emergency consultation: [BOOKING_LINK]

Time is critical. Let's talk within the next 2 hours.

{{attorneyName}}
Vasquez Law Firm, PLLC

P.S. I've handled hundreds of cases like yours. You're not alone, and we WILL find a solution.
    `;
  }
  getWarmLeadEmailTemplate(data) {
    return `
Subject: {{firstName}}, About Your {{practiceArea}} Question

Hi {{firstName}},

Thank you for reaching out about your {{practiceArea}} matter. I understand this {{urgencyText}}.

Based on what you've shared, here are your next steps:

1. Schedule a detailed consultation (free, 30 minutes)
2. Bring any relevant documents you have
3. We'll create a personalized legal strategy

{{nextStepCTA}}: [BOOKING_LINK]

In the meantime, I'm sending you our {{practiceArea}} guide with:
✓ Common questions answered
✓ Document checklist
✓ Timeline expectations
✓ Success stories from similar cases

Questions? Reply to this email or call (704) 775-9113.

Looking forward to helping you,
{{attorneyName}}
Vasquez Law Firm, PLLC
    `;
  }
  getColdLeadEmailTemplate(data) {
    return `
Subject: {{firstName}}, Still Thinking About Your {{practiceArea}} Needs?

Hi {{firstName}},

I wanted to follow up on your {{practiceArea}} inquiry. I know these decisions take time, and you want to make sure you have the right legal team.

Here's what sets Vasquez Law Firm apart:
• 60+ years of combined experience
• Thousands of successful cases
• Bilingual team (English/Spanish)
• Payment plans available

When you're ready, we're here to help. No pressure, just support.

Free resources for you:
- {{practiceArea}} FAQ Guide: [LINK]
- Client Success Stories: [LINK]  
- Legal Rights Checklist: [LINK]

Stay informed,
{{attorneyName}}
Vasquez Law Firm, PLLC

P.S. Immigration laws change frequently. Follow us for updates: [SOCIAL_LINKS]
    `;
  }
  async deploySequence(sequence) {
    try {
      const prisma = (0, prisma_1.getPrismaClient)();
      if (!prisma) {
        logger_1.logger.error('Prisma client not available');
        return;
      }
      // Log the sequence (model needs to be added to schema)
      logger_1.logger.info('Follow-up sequence deployed:', {
        contactId: sequence.contactId,
        sequenceType: sequence.sequenceType,
        steps: sequence.steps,
        personalizations: sequence.personalizations,
        status: 'active',
        currentStep: 0,
      });
      // Schedule the first step
      await this.scheduleNextStep(sequence, 0);
      logger_1.logger.info(`Follow-up sequence deployed for contact ${sequence.contactId}`);
    } catch (error) {
      logger_1.logger.error('Error deploying follow-up sequence:', error);
      throw error;
    }
  }
  async scheduleNextStep(sequence, stepIndex) {
    if (stepIndex >= sequence.steps.length) return;
    const step = sequence.steps[stepIndex];
    // Schedule the action based on the delay
    setTimeout(
      async () => {
        try {
          // Check stop conditions
          const shouldStop = await this.checkStopConditions(sequence);
          if (shouldStop) {
            logger_1.logger.info(
              `Stopping sequence for ${sequence.contactId} due to stop condition`
            );
            return;
          }
          // Execute the step
          await this.executeStep(sequence, step);
          // Schedule next step
          await this.scheduleNextStep(sequence, stepIndex + 1);
        } catch (error) {
          logger_1.logger.error(`Error executing step ${stepIndex}:`, error);
        }
      },
      step.delay * 60 * 1000
    ); // Convert minutes to milliseconds
  }
  async checkStopConditions(sequence) {
    // For now, we'll skip stop condition checks
    // In production, you'd check the contact's tags and status
    return false;
  }
  async executeStep(sequence, step) {
    const content = this.replacePersonalizations(step.content, sequence.personalizations);
    switch (step.action) {
      case 'email':
        // Email sending via GHL - would need to implement this method
        logger_1.logger.info('Would send email:', {
          contactId: sequence.contactId,
          subject: content.split('\n')[0].replace('Subject: ', ''),
          body: content.split('\n').slice(2).join('\n'),
        });
        break;
      case 'sms':
        await this.ghl.sendSMS({
          contactId: sequence.contactId,
          message: content,
        });
        break;
      case 'call':
        await this.ghl.createTask({
          contactId: sequence.contactId,
          title: content,
          body: `Follow-up call for ${sequence.sequenceType} sequence`,
          dueDate: new Date(),
          assignedTo: this.getAssignedUser(step.priority),
        });
        break;
      case 'task':
        await this.ghl.createTask({
          contactId: sequence.contactId,
          title: content,
          body: `Automated task from follow-up sequence`,
          dueDate: new Date(),
        });
        break;
      case 'campaign':
        // Trigger campaign - would need campaign ID mapping
        logger_1.logger.info('Would trigger campaign:', {
          contactId: sequence.contactId,
          campaignName: content,
        });
        break;
    }
    logger_1.logger.info(`Executed ${step.action} for contact ${sequence.contactId}`);
  }
  replacePersonalizations(content, personalizations) {
    let result = content;
    for (const [key, value] of Object.entries(personalizations)) {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return result;
  }
  getAssignedUser(priority) {
    // Assign based on priority
    if (priority === 'high') {
      return process.env.GHL_SENIOR_USER_ID || 'default';
    }
    return process.env.GHL_DEFAULT_USER_ID || 'default';
  }
  async execute(input) {
    return this.createFollowUpSequence(input);
  }
}
exports.FollowUpAutomationAgent = FollowUpAutomationAgent;
exports.followUpAutomationAgent = new FollowUpAutomationAgent();
