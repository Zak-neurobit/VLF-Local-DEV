import { Agent } from '@/lib/crewai/base';
import { z } from 'zod';
import { GoHighLevelService } from '@/services/gohighlevel';
import { logger } from '@/lib/logger';
import { errorToLogMeta, createErrorLogMeta } from '@/lib/logger/utils';
import { getPrismaClient } from '@/lib/prisma';

interface LeadData {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  caseType?: string;
  message?: string;
  source?: string;
  createdAt?: Date;
  customFields?: Record<string, unknown>;
  tags?: string[];
  preferredLanguage?: string;
  urgency?: string;
  location?: string;
  referralSource?: string;
  language?: string;
  practiceArea?: string;
  urgencyIndicators?: string[];
  previousInteractions?: Array<{
    type: string;
    date: string;
    outcome?: string;
    notes?: string;
  }>;
}

// Lead quality scoring schema
const LeadScoreSchema = z.object({
  score: z.number().min(0).max(100),
  tier: z.enum(['hot', 'warm', 'cold', 'invalid']),
  factors: z.object({
    urgency: z.number().min(0).max(25),
    caseValue: z.number().min(0).max(25),
    readiness: z.number().min(0).max(25),
    contactQuality: z.number().min(0).max(25),
  }),
  recommendations: z.array(z.string()),
  rejectionReasons: z.array(z.string()).optional(),
  followUpStrategy: z.string(),
  estimatedCaseValue: z.number().optional(),
  priorityLevel: z.enum(['urgent', 'high', 'medium', 'low']),
  practiceAreas: z.array(z.string()),
  languagePreference: z.enum(['en', 'es', 'bilingual']),
  validationTimestamp: z.string(),
  ghlContactId: z.string().optional(),
});

type LeadScore = z.infer<typeof LeadScoreSchema>;

export class LeadValidationAgent extends Agent {
  private ghl: GoHighLevelService;

  constructor() {
    super({
      name: 'LeadValidationAgent',
      role: 'Lead Validation Specialist',
      goal: 'Validate and score incoming leads to ensure only high-quality prospects enter the consultation pipeline',
      backstory: `You are an expert lead validation specialist with deep knowledge of legal services qualification criteria. 
                  You analyze potential clients to determine their urgency, case value, readiness to engage, and overall fit 
                  for the firm's services. You prevent spam, low-quality leads, and time-wasters from entering the pipeline 
                  while ensuring legitimate clients receive appropriate priority and routing.`,
    });

    this.ghl = new GoHighLevelService();
  }

  async validateLead(leadData: {
    name: string;
    email: string;
    phone: string;
    message: string;
    source: string;
    language?: string;
    practiceArea?: string;
    urgencyIndicators?: string[];
    previousInteractions?: Array<{
      type: string;
      date: string;
      outcome?: string;
      notes?: string;
    }>;
  }): Promise<LeadScore> {
    try {
      // Analyze lead quality factors
      const urgencyScore = this.calculateUrgencyScore(leadData);
      const caseValueScore = this.calculateCaseValueScore(leadData);
      const readinessScore = this.calculateReadinessScore(leadData);
      const contactQualityScore = this.calculateContactQualityScore(leadData);

      const totalScore = urgencyScore + caseValueScore + readinessScore + contactQualityScore;
      const tier = this.determineTier(totalScore);
      const priorityLevel = this.determinePriority(urgencyScore, totalScore);

      const validationResult: LeadScore = {
        score: totalScore,
        tier,
        factors: {
          urgency: urgencyScore,
          caseValue: caseValueScore,
          readiness: readinessScore,
          contactQuality: contactQualityScore,
        },
        recommendations: this.generateRecommendations(leadData, tier, totalScore),
        rejectionReasons: tier === 'invalid' ? this.getRejectionReasons(leadData) : undefined,
        followUpStrategy: this.determineFollowUpStrategy(tier, priorityLevel),
        estimatedCaseValue: this.estimateCaseValue(leadData),
        priorityLevel,
        practiceAreas: this.identifyPracticeAreas(leadData),
        languagePreference: this.detectLanguagePreference(leadData),
        validationTimestamp: new Date().toISOString(),
      };

      // Update lead in GHL with validation data
      const ghlContactId = await this.updateGHLContact(leadData, validationResult);

      // Add GHL contact ID to validation result
      validationResult.ghlContactId = ghlContactId;

      // Log validation for analytics
      await this.logValidation(leadData, validationResult);

      return validationResult;
    } catch (error) {
      logger.error('Lead validation error:', errorToLogMeta(error));
      throw error;
    }
  }

  private calculateUrgencyScore(leadData: {
    name: string;
    email: string;
    phone: string;
    message: string;
    source: string;
    language?: string;
    practiceArea?: string;
    urgencyIndicators?: string[];
    previousInteractions?: Array<{
      type: string;
      date: string;
      outcome?: string;
      notes?: string;
    }>;
  }): number {
    let score = 0;
    const message = leadData.message.toLowerCase();

    // Urgent keywords (max 25 points)
    const urgentKeywords = [
      'urgent',
      'emergency',
      'immediately',
      'asap',
      'court date',
      'deadline',
      'detention',
      'deportation',
      'removal proceedings',
      'ice',
      'detained',
      'arrested',
      'hearing tomorrow',
      'hearing next week',
      'visa expiring',
      'status expiring',
      'out of status',
    ];

    const urgencyMatches = urgentKeywords.filter(keyword => message.includes(keyword));
    score += Math.min(urgencyMatches.length * 5, 15);

    // Time-sensitive indicators
    if (message.match(/\d+\s*(day|week|month)s?\s*(left|remaining|until)/)) {
      score += 5;
    }

    // Previous urgency indicators
    if (leadData.urgencyIndicators && leadData.urgencyIndicators.length > 0) {
      score += 5;
    }

    return Math.min(score, 25);
  }

  private calculateCaseValueScore(leadData: {
    name: string;
    email: string;
    phone: string;
    message: string;
    source: string;
    language?: string;
    practiceArea?: string;
    urgencyIndicators?: string[];
    previousInteractions?: Array<{
      type: string;
      date: string;
      outcome?: string;
      notes?: string;
    }>;
  }): number {
    let score = 0;
    const message = leadData.message.toLowerCase();

    // High-value case indicators (max 25 points)
    const highValueIndicators = [
      'business immigration',
      'investor visa',
      'eb-5',
      'l1',
      'e2',
      'company',
      'startup',
      'investment',
      'multiple employees',
      'family petition',
      'citizenship',
      'green card',
      'permanent residence',
      'adjustment of status',
      'consular processing',
      'waiver',
      'appeal',
      'motion to reopen',
      'federal court',
    ];

    const valueMatches = highValueIndicators.filter(indicator => message.includes(indicator));
    score += Math.min(valueMatches.length * 5, 15);

    // Complex case indicators
    if (message.length > 500) {
      score += 5;
    }

    // Multiple family members
    const familyMatches = message.match(/family|spouse|children|parents/gi);
    if (familyMatches && familyMatches.length > 1) {
      score += 5;
    }

    return Math.min(score, 25);
  }

  private calculateReadinessScore(leadData: {
    name: string;
    email: string;
    phone: string;
    message: string;
    source: string;
    language?: string;
    practiceArea?: string;
    urgencyIndicators?: string[];
    previousInteractions?: Array<{
      type: string;
      date: string;
      outcome?: string;
      notes?: string;
    }>;
  }): number {
    let score = 0;
    const message = leadData.message.toLowerCase();

    // Readiness indicators (max 25 points)
    if (leadData.phone && leadData.phone.length >= 10) {
      score += 10;
    }

    if (leadData.email && leadData.email.includes('@') && !leadData.email.includes('test')) {
      score += 5;
    }

    // Decision-making language
    const readyPhrases = [
      'ready to hire',
      'need attorney',
      'looking for lawyer',
      'want to schedule',
      'consultation',
      'how much',
      'retainer',
      'payment plan',
      'when can we meet',
      'available appointment',
    ];

    const readyMatches = readyPhrases.filter(phrase => message.includes(phrase));
    score += Math.min(readyMatches.length * 3, 10);

    return Math.min(score, 25);
  }

  private calculateContactQualityScore(leadData: {
    name: string;
    email: string;
    phone: string;
    message: string;
    source: string;
    language?: string;
    practiceArea?: string;
    urgencyIndicators?: string[];
    previousInteractions?: Array<{
      type: string;
      date: string;
      outcome?: string;
      notes?: string;
    }>;
  }): number {
    let score = 0;

    // Contact quality (max 25 points)
    // Valid phone format
    if (leadData.phone && leadData.phone.match(/^\+?1?\d{10,}$/)) {
      score += 8;
    }

    // Professional email domain
    if (leadData.email && !leadData.email.match(/@(gmail|yahoo|hotmail|outlook)\.com$/)) {
      score += 5;
    }

    // Complete name
    if (leadData.name && leadData.name.split(' ').length >= 2) {
      score += 7;
    }

    // Message quality
    if (leadData.message.length > 50 && leadData.message.length < 2000) {
      score += 5;
    }

    return Math.min(score, 25);
  }

  private determineTier(score: number): 'hot' | 'warm' | 'cold' | 'invalid' {
    if (score >= 75) return 'hot';
    if (score >= 50) return 'warm';
    if (score >= 25) return 'cold';
    return 'invalid';
  }

  private determinePriority(
    urgencyScore: number,
    totalScore: number
  ): 'urgent' | 'high' | 'medium' | 'low' {
    if (urgencyScore >= 20 || totalScore >= 80) return 'urgent';
    if (urgencyScore >= 15 || totalScore >= 60) return 'high';
    if (totalScore >= 40) return 'medium';
    return 'low';
  }

  private generateRecommendations(
    leadData: {
      message: string;
      practiceArea?: string;
      urgencyIndicators?: string[];
    },
    tier: string,
    _score: number
  ): string[] {
    const recommendations = [];

    if (tier === 'hot') {
      recommendations.push('Schedule immediate consultation within 24 hours');
      recommendations.push('Assign to senior attorney for priority handling');
      recommendations.push('Send personalized video message from attorney');
    } else if (tier === 'warm') {
      recommendations.push('Schedule consultation within 48-72 hours');
      recommendations.push('Send detailed intake questionnaire');
      recommendations.push('Add to nurture campaign with case studies');
    } else if (tier === 'cold') {
      recommendations.push('Add to long-term nurture sequence');
      recommendations.push('Send educational content about services');
      recommendations.push('Schedule follow-up in 30 days');
    }

    // Specific recommendations based on practice area
    const practiceAreas = this.identifyPracticeAreas(leadData);
    if (practiceAreas.includes('removal-defense')) {
      recommendations.push('Flag for immediate removal defense team review');
    }
    if (practiceAreas.includes('business-immigration')) {
      recommendations.push('Schedule business immigration specialist consultation');
    }

    return recommendations;
  }

  private getRejectionReasons(leadData: LeadData): string[] {
    const reasons = [];

    if (!leadData.phone || leadData.phone.length < 10) {
      reasons.push('Invalid or missing phone number');
    }
    if (!leadData.email || !leadData.email.includes('@')) {
      reasons.push('Invalid email address');
    }
    if (!leadData.message || leadData.message.length < 20) {
      reasons.push('Message too short to determine needs');
    }
    if (leadData.message && leadData.message.match(/test|asdf|123/i)) {
      reasons.push('Appears to be test submission');
    }

    return reasons;
  }

  private determineFollowUpStrategy(tier: string, priority: string): string {
    if (tier === 'hot' && priority === 'urgent') {
      return 'Immediate phone call + SMS + email within 5 minutes';
    }
    if (tier === 'hot') {
      return 'Phone call within 1 hour, follow-up email with appointment link';
    }
    if (tier === 'warm') {
      return 'Personalized email within 2 hours, SMS reminder, phone call within 24 hours';
    }
    if (tier === 'cold') {
      return 'Add to email nurture sequence, monthly check-ins';
    }
    return 'Archive for future reference';
  }

  private estimateCaseValue(leadData: LeadData): number {
    const message = (leadData.message || '').toLowerCase();
    let baseValue = 2500; // Minimum case value

    // Business immigration multipliers
    if (message.includes('eb-5') || message.includes('investor')) {
      baseValue *= 10;
    } else if (message.includes('l1') || message.includes('e2')) {
      baseValue *= 4;
    } else if (message.includes('business') || message.includes('company')) {
      baseValue *= 3;
    }

    // Family cases
    if (message.includes('family') && message.includes('multiple')) {
      baseValue *= 2.5;
    }

    // Complex cases
    if (message.includes('appeal') || message.includes('federal court')) {
      baseValue *= 2;
    }

    // Removal defense
    if (message.includes('removal') || message.includes('deportation')) {
      baseValue *= 1.8;
    }

    return Math.round(baseValue);
  }

  private identifyPracticeAreas(leadData: { message: string; practiceArea?: string }): string[] {
    const message = leadData.message.toLowerCase();
    const areas = [];

    const practiceAreaKeywords = {
      'family-immigration': ['family', 'spouse', 'parent', 'child', 'petition', 'i-130'],
      'business-immigration': [
        'business',
        'company',
        'investor',
        'employment',
        'h1b',
        'l1',
        'e2',
        'eb',
      ],
      'removal-defense': ['removal', 'deportation', 'detained', 'ice', 'court', 'judge'],
      citizenship: ['citizenship', 'naturalization', 'n-400', 'citizen'],
      asylum: ['asylum', 'refugee', 'persecution', 'fear'],
      'criminal-immigration': ['criminal', 'conviction', 'arrest', 'plea'],
      'adjustment-status': ['adjustment', 'green card', 'permanent', 'i-485'],
      'visa-services': ['visa', 'tourist', 'student', 'temporary', 'b1', 'b2', 'f1'],
    };

    for (const [area, keywords] of Object.entries(practiceAreaKeywords)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        areas.push(area);
      }
    }

    return areas.length > 0 ? areas : ['general-immigration'];
  }

  private detectLanguagePreference(leadData: LeadData): 'en' | 'es' | 'bilingual' {
    const message = leadData.message || '';

    // Spanish indicators
    const spanishPatterns = [
      /[áéíóúñ¿¡]/,
      /\b(hola|gracias|por favor|necesito|ayuda|abogado|mi |para |con |esta?|son|tiene)\b/i,
    ];

    const hasSpanish = spanishPatterns.some(pattern => pattern.test(message));
    const hasEnglish = /[a-zA-Z]{3,}/.test(message);

    if (hasSpanish && hasEnglish) return 'bilingual';
    if (hasSpanish) return 'es';
    return 'en';
  }

  private async updateGHLContact(leadData: LeadData, validation: LeadScore): Promise<string> {
    try {
      // Find or create contact in GHL
      let contact = await this.ghl.findContactByEmail(leadData.email || '');

      if (!contact) {
        const nameParts = (leadData.name || 'Unknown').split(' ');
        contact = await this.ghl.upsertContact({
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(' '),
          email: leadData.email || '',
          phone: leadData.phone || '',
          source: leadData.source,
          tags: [
            'lead-validation',
            `tier-${validation.tier}`,
            `priority-${validation.priorityLevel}`,
          ],
        });
      }

      // Update contact with validation data
      const fallbackNameParts = (leadData.name || 'Unknown').split(' ');
      contact = await this.ghl.upsertContact({
        firstName: contact.firstName || fallbackNameParts[0],
        lastName: contact.lastName || fallbackNameParts.slice(1).join(' '),
        email: leadData.email || '',
        phone: leadData.phone || '',
        tags: [
          'lead-validation',
          `tier-${validation.tier}`,
          `priority-${validation.priorityLevel}`,
          `score-${validation.score}`,
          ...validation.practiceAreas.map(area => `practice-${area}`),
          `lang-${validation.languagePreference}`,
        ],
        customFields: {
          lead_score: validation.score.toString(),
          lead_tier: validation.tier,
          priority_level: validation.priorityLevel,
          estimated_case_value: validation.estimatedCaseValue?.toString() || '',
          validation_timestamp: validation.validationTimestamp,
          practice_areas: validation.practiceAreas.join(', '),
          language_preference: validation.languagePreference,
          follow_up_strategy: validation.followUpStrategy,
        },
      });

      // Add to appropriate pipeline stage based on tier
      const pipelineStages: Record<string, string> = {
        hot: process.env.GHL_HOT_LEADS_STAGE_ID || 'hot-leads-stage',
        warm: process.env.GHL_WARM_LEADS_STAGE_ID || 'warm-leads-stage',
        cold: process.env.GHL_COLD_LEADS_STAGE_ID || 'cold-leads-stage',
        invalid: process.env.GHL_INVALID_LEADS_STAGE_ID || 'invalid-leads-stage',
      };

      await this.ghl.createOpportunity({
        contactId: contact.id,
        name: `${leadData.name} - ${validation.practiceAreas[0]}`,
        pipelineId: process.env.GHL_PIPELINE_ID!,
        stageId: pipelineStages[validation.tier],
        value: validation.estimatedCaseValue,
      });

      // Trigger appropriate campaigns
      if (validation.tier === 'hot' && process.env.GHL_HOT_LEAD_CAMPAIGN_ID) {
        await this.ghl.triggerCampaign({
          contactId: contact.id,
          campaignId: process.env.GHL_HOT_LEAD_CAMPAIGN_ID,
        });
      } else if (validation.tier === 'warm' && process.env.GHL_WARM_LEAD_CAMPAIGN_ID) {
        await this.ghl.triggerCampaign({
          contactId: contact.id,
          campaignId: process.env.GHL_WARM_LEAD_CAMPAIGN_ID,
        });
      }

      return contact.id;
    } catch (error) {
      logger.error('Error updating GHL contact:', errorToLogMeta(error));
      throw error;
    }
  }

  private async logValidation(
    leadData: {
      name: string;
      email: string;
      phone: string;
      message: string;
      source: string;
      language?: string;
      practiceArea?: string;
      urgencyIndicators?: string[];
      previousInteractions?: Array<{
        type: string;
        date: string;
        outcome?: string;
        notes?: string;
      }>;
    },
    validation: LeadScore
  ): Promise<void> {
    try {
      const prisma = getPrismaClient();
      if (!prisma) {
        logger.error('Prisma client not available');
        return;
      }

      // For now, log to console since leadValidation model needs to be added
      logger.info('Lead validation completed:', {
        email: leadData.email,
        score: validation.score,
        tier: validation.tier,
        priorityLevel: validation.priorityLevel,
        practiceAreas: validation.practiceAreas,
        languagePreference: validation.languagePreference,
        estimatedCaseValue: validation.estimatedCaseValue,
        factors: validation.factors,
        recommendations: validation.recommendations,
        followUpStrategy: validation.followUpStrategy,
        source: leadData.source,
        validatedAt: new Date(validation.validationTimestamp),
      });
    } catch (error) {
      logger.error('Error logging validation:', errorToLogMeta(error));
    }
  }

  async execute(input: LeadData): Promise<LeadScore> {
    return this.validateLead({
      name: input.name || '',
      email: input.email || '',
      phone: input.phone || '',
      message: input.message || '',
      source: input.source || 'unknown',
      language: input.language,
      practiceArea: input.practiceArea,
      urgencyIndicators: input.urgencyIndicators,
      previousInteractions: input.previousInteractions,
    });
  }
}

// Export singleton instance
export const leadValidationAgent = new LeadValidationAgent();
