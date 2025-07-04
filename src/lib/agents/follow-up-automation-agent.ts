import { Agent } from '@/lib/crewai/base';
import { GoHighLevelService } from '@/services/gohighlevel';
import { logger } from '@/lib/logger';
import { getPrismaClient } from '@/lib/prisma';
import { z } from 'zod';

const FollowUpSequenceSchema = z.object({
  contactId: z.string(),
  sequenceType: z.enum(['hot_lead', 'warm_lead', 'cold_lead', 'post_consultation', 'client_onboarding']),
  steps: z.array(z.object({
    delay: z.number(), // minutes from previous step
    action: z.enum(['email', 'sms', 'call', 'task', 'campaign']),
    content: z.string(),
    priority: z.enum(['high', 'medium', 'low']),
  })),
  personalizations: z.record(z.string()),
  stopConditions: z.array(z.string()),
});

type FollowUpSequence = z.infer<typeof FollowUpSequenceSchema>;

export class FollowUpAutomationAgent extends Agent {
  private ghl: GoHighLevelService;

  constructor() {
    super({
      role: 'Follow-Up Automation Specialist',
      goal: 'Create and manage intelligent follow-up sequences that convert leads into clients',
      backstory: `You are a master of follow-up automation with expertise in behavioral psychology and conversion optimization. 
                  You design personalized follow-up sequences that nurture leads at the perfect pace, never letting 
                  valuable prospects slip through the cracks while respecting their communication preferences.`,
      verbose: true,
      allowDelegation: false,
    });
    
    this.ghl = new GoHighLevelService();
  }

  async createFollowUpSequence(data: {
    contactId: string;
    leadScore: number;
    tier: string;
    practiceAreas: string[];
    urgencyLevel: string;
    languagePreference: string;
    previousInteractions?: any[];
  }): Promise<FollowUpSequence> {
    const sequenceType = this.determineSequenceType(data);
    const steps = this.generateFollowUpSteps(sequenceType, data);
    const personalizations = await this.generatePersonalizations(data);

    const sequence: FollowUpSequence = {
      contactId: data.contactId,
      sequenceType,
      steps,
      personalizations,
      stopConditions: [
        'appointment_scheduled',
        'became_client',
        'explicit_opt_out',
        'marked_lost',
      ],
    };

    await this.deploySequence(sequence);
    return sequence;
  }

  private determineSequenceType(data: any): FollowUpSequence['sequenceType'] {
    if (data.tier === 'hot') return 'hot_lead';
    if (data.tier === 'warm') return 'warm_lead';
    if (data.tier === 'cold') return 'cold_lead';
    return 'cold_lead';
  }

  private generateFollowUpSteps(type: string, data: any): FollowUpSequence['steps'] {
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

  private async generatePersonalizations(data: any): Promise<Record<string, string>> {
    const contact = await this.ghl.getContact(data.contactId);
    
    return {
      firstName: contact.firstName || 'Friend',
      practiceArea: this.formatPracticeArea(data.practiceAreas[0]),
      urgencyText: this.getUrgencyText(data.urgencyLevel, data.languagePreference),
      caseValueText: this.getCaseValueText(data.leadScore, data.languagePreference),
      attorneyName: this.assignAttorney(data.practiceAreas[0]),
      nextStepCTA: this.getNextStepCTA(data.tier, data.languagePreference),
    };
  }

  private formatPracticeArea(area: string): string {
    const formatted = {
      'family-immigration': 'Family Immigration',
      'business-immigration': 'Business Immigration',
      'removal-defense': 'Removal Defense',
      'citizenship': 'Citizenship & Naturalization',
      'asylum': 'Asylum Protection',
      'criminal-immigration': 'Criminal Immigration',
      'adjustment-status': 'Green Card / Adjustment of Status',
      'visa-services': 'Visa Services',
    };
    
    return formatted[area] || 'Immigration';
  }

  private getUrgencyText(level: string, lang: string): string {
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
    
    return texts[level as keyof typeof texts]?.[lang as 'en' | 'es'] || texts.medium.en;
  }

  private getCaseValueText(score: number, lang: string): string {
    if (score >= 80) {
      return lang === 'es' ? 'caso de alta prioridad' : 'high-priority case';
    }
    if (score >= 60) {
      return lang === 'es' ? 'caso importante' : 'important case';
    }
    return lang === 'es' ? 'consulta' : 'consultation';
  }

  private assignAttorney(practiceArea: string): string {
    const attorneyAssignments = {
      'removal-defense': 'Attorney Maria Rodriguez',
      'business-immigration': 'Attorney James Chen',
      'family-immigration': 'Attorney Sarah Williams',
      'criminal-immigration': 'Attorney Michael Davis',
    };
    
    return attorneyAssignments[practiceArea as keyof typeof attorneyAssignments] || 'Attorney William Vasquez';
  }

  private getNextStepCTA(tier: string, lang: string): string {
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
    
    return ctas[tier as keyof typeof ctas]?.[lang as 'en' | 'es'] || ctas.warm.en;
  }

  private getHotLeadEmailTemplate(data: any): string {
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

  private getWarmLeadEmailTemplate(data: any): string {
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

  private getColdLeadEmailTemplate(data: any): string {
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

  private async deploySequence(sequence: FollowUpSequence): Promise<void> {
    try {
      const prisma = getPrismaClient();
      if (!prisma) {
        logger.error('Prisma client not available');
        return;
      }
      
      // Log the sequence (model needs to be added to schema)
      logger.info('Follow-up sequence deployed:', {
        contactId: sequence.contactId,
        sequenceType: sequence.sequenceType,
        steps: sequence.steps,
        personalizations: sequence.personalizations,
        status: 'active',
        currentStep: 0,
      });

      // Schedule the first step
      await this.scheduleNextStep(sequence, 0);
      
      logger.info(`Follow-up sequence deployed for contact ${sequence.contactId}`);
    } catch (error) {
      logger.error('Error deploying follow-up sequence:', error);
      throw error;
    }
  }

  private async scheduleNextStep(sequence: FollowUpSequence, stepIndex: number): Promise<void> {
    if (stepIndex >= sequence.steps.length) return;

    const step = sequence.steps[stepIndex];
    
    // Schedule the action based on the delay
    setTimeout(async () => {
      try {
        // Check stop conditions
        const shouldStop = await this.checkStopConditions(sequence);
        if (shouldStop) {
          logger.info(`Stopping sequence for ${sequence.contactId} due to stop condition`);
          return;
        }

        // Execute the step
        await this.executeStep(sequence, step);

        // Schedule next step
        await this.scheduleNextStep(sequence, stepIndex + 1);
      } catch (error) {
        logger.error(`Error executing step ${stepIndex}:`, error);
      }
    }, step.delay * 60 * 1000); // Convert minutes to milliseconds
  }

  private async checkStopConditions(sequence: FollowUpSequence): Promise<boolean> {
    // For now, we'll skip stop condition checks
    // In production, you'd check the contact's tags and status
    return false;
  }

  private async executeStep(sequence: FollowUpSequence, step: FollowUpSequence['steps'][0]): Promise<void> {
    const content = this.replacePersonalizations(step.content, sequence.personalizations);

    switch (step.action) {
      case 'email':
        // Email sending via GHL - would need to implement this method
        logger.info('Would send email:', {
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
        logger.info('Would trigger campaign:', {
          contactId: sequence.contactId,
          campaignName: content,
        });
        break;
    }

    logger.info(`Executed ${step.action} for contact ${sequence.contactId}`);
  }

  private replacePersonalizations(content: string, personalizations: Record<string, string>): string {
    let result = content;
    
    for (const [key, value] of Object.entries(personalizations)) {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    
    return result;
  }

  private getAssignedUser(priority: string): string {
    // Assign based on priority
    if (priority === 'high') {
      return process.env.GHL_SENIOR_USER_ID || 'default';
    }
    return process.env.GHL_DEFAULT_USER_ID || 'default';
  }

  async execute(input: any): Promise<any> {
    return this.createFollowUpSequence(input);
  }
}

export const followUpAutomationAgent = new FollowUpAutomationAgent();