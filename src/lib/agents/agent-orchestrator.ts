import { LegalConsultationAgent } from '@/lib/crewai/agents/legal-consultation-agent';
import { AppointmentSchedulingAgent } from '@/lib/crewai/agents/appointment-scheduling-agent';
import { DocumentAnalysisAgent } from '@/lib/crewai/agents/document-analysis-agent';
import { EnhancedIntakeAgent } from '@/lib/crewai/agents/enhanced-intake-agent';
import { RemovalDefenseAgent } from '@/lib/crewai/agents/removal-defense-agent';
import { BusinessImmigrationAgent } from '@/lib/crewai/agents/business-immigration-agent';
import { CriminalDefenseAgent } from '@/lib/crewai/agents/criminal-defense-agent';
import { AILATrainedRemovalDefenseAgent } from '@/lib/crewai/agents/aila-trained-removal-agent';
import { LeadValidationAgent } from '@/lib/agents/lead-validation-agent';
import { FollowUpAutomationAgent } from '@/lib/agents/follow-up-automation-agent';
import { logger } from '@/lib/logger';

export interface AgentContext {
  userId?: string;
  sessionId: string;
  language: string;
  history: Array<{ role: string; content: string }>;
  metadata?: Record<string, any>;
}

export interface AgentResponse {
  agent: string;
  response: string;
  suggestions?: string[];
  actions?: Array<{
    type: string;
    data: any;
  }>;
  handoff?: string;
}

export class AgentOrchestrator {
  private agents: Map<string, any>;
  private static instance: AgentOrchestrator;

  private constructor() {
    this.agents = new Map();
    this.initializeAgents();
  }

  static getInstance(): AgentOrchestrator {
    if (!AgentOrchestrator.instance) {
      AgentOrchestrator.instance = new AgentOrchestrator();
    }
    return AgentOrchestrator.instance;
  }

  private initializeAgents() {
    // Initialize all customer-facing agents
    this.agents.set('consultation', new LegalConsultationAgent());
    this.agents.set('appointment', new AppointmentSchedulingAgent());
    this.agents.set('document', new DocumentAnalysisAgent());
    this.agents.set('intake', new EnhancedIntakeAgent());
    this.agents.set('removal', new RemovalDefenseAgent());
    this.agents.set('business', new BusinessImmigrationAgent());
    this.agents.set('criminal', new CriminalDefenseAgent());
    this.agents.set('aila', new AILATrainedRemovalDefenseAgent());
    
    // Initialize automation agents
    this.agents.set('lead-validation', new LeadValidationAgent());
    this.agents.set('follow-up', new FollowUpAutomationAgent());

    logger.info('Agent Orchestrator initialized with 10 agents including automation specialists');
  }

  async routeMessage(message: string, context: AgentContext): Promise<AgentResponse> {
    try {
      // Analyze message intent
      const intent = await this.analyzeIntent(message, context);

      // Route to appropriate agent
      const agent = this.selectAgent(intent, context);

      if (!agent) {
        return {
          agent: 'orchestrator',
          response:
            'I can help you with legal consultations, scheduling appointments, document analysis, and more. What would you like assistance with?',
          suggestions: [
            'Schedule a consultation',
            'Ask about immigration law',
            'Check document requirements',
            'Learn about our services',
          ],
        };
      }

      // Execute agent action
      const response = await this.executeAgent(agent, message, context);

      return response;
    } catch (error) {
      logger.error('Agent orchestration error:', error);
      return {
        agent: 'orchestrator',
        response:
          'I apologize, but I encountered an error. Please try again or contact our office directly.',
        actions: [
          {
            type: 'show-contact',
            data: { phone: '(888) 979-8990' },
          },
        ],
      };
    }
  }

  private async analyzeIntent(message: string, context: AgentContext): Promise<string> {
    const lowerMessage = message.toLowerCase();

    // Simple intent detection (can be enhanced with AI)
    if (
      lowerMessage.includes('appointment') ||
      lowerMessage.includes('schedule') ||
      lowerMessage.includes('book')
    ) {
      return 'appointment';
    }

    if (
      lowerMessage.includes('document') ||
      lowerMessage.includes('form') ||
      lowerMessage.includes('paper')
    ) {
      return 'document';
    }

    if (
      lowerMessage.includes('removal') ||
      lowerMessage.includes('deportation') ||
      lowerMessage.includes('ice')
    ) {
      return 'removal';
    }

    if (
      lowerMessage.includes('business') ||
      lowerMessage.includes('h1b') ||
      lowerMessage.includes('employment')
    ) {
      return 'business';
    }

    if (
      lowerMessage.includes('criminal') ||
      lowerMessage.includes('arrest') ||
      lowerMessage.includes('charge')
    ) {
      return 'criminal';
    }

    if (
      lowerMessage.includes('intake') ||
      lowerMessage.includes('new client') ||
      lowerMessage.includes('start')
    ) {
      return 'intake';
    }

    // Default to consultation for general queries
    return 'consultation';
  }

  private selectAgent(intent: string, context: AgentContext): string | null {
    // Check for specific routing in context
    if (context.metadata?.preferredAgent) {
      return context.metadata.preferredAgent;
    }

    // Map intent to agent
    const intentToAgent: Record<string, string> = {
      appointment: 'appointment',
      document: 'document',
      removal: 'removal',
      business: 'business',
      criminal: 'criminal',
      intake: 'intake',
      consultation: 'consultation',
      aila: 'aila',
    };

    return intentToAgent[intent] || 'consultation';
  }

  private async executeAgent(
    agentName: string,
    message: string,
    context: AgentContext
  ): Promise<AgentResponse> {
    const agent = this.agents.get(agentName);

    if (!agent) {
      throw new Error(`Agent ${agentName} not found`);
    }

    logger.info(`Executing ${agentName} agent`, { sessionId: context.sessionId });

    switch (agentName) {
      case 'appointment':
        return this.handleAppointmentAgent(agent, message, context);

      case 'document':
        return this.handleDocumentAgent(agent, message, context);

      case 'intake':
        return this.handleIntakeAgent(agent, message, context);

      case 'consultation':
      default:
        return this.handleConsultationAgent(agent, message, context);
    }
  }

  private async handleConsultationAgent(
    agent: LegalConsultationAgent,
    message: string,
    context: AgentContext
  ): Promise<AgentResponse> {
    const result = await agent.analyze({
      userId: context.userId || 'anonymous',
      description: message,
      caseType: 'general',
      urgency: 'medium',
      language: context.language as 'en' | 'es',
      location: context.metadata?.location,
    });

    const response: AgentResponse = {
      agent: 'consultation',
      response: result.recommendations.join('\n\n'),
      suggestions: result.nextSteps,
    };

    // Add handoff if needed
    if (
      result.estimatedCaseComplexity === 'complex' ||
      result.nextSteps.some(step => step.toLowerCase().includes('appointment'))
    ) {
      response.handoff = 'appointment';
      response.actions = [
        {
          type: 'suggest-appointment',
          data: {
            complexity: result.estimatedCaseComplexity,
            practiceAreas: result.suggestedPracticeAreas,
          },
        },
      ];
    }

    return response;
  }

  private async handleAppointmentAgent(
    agent: AppointmentSchedulingAgent,
    message: string,
    context: AgentContext
  ): Promise<AgentResponse> {
    // Extract appointment details from message
    const appointmentData = await this.extractAppointmentData(message, context);

    if (!appointmentData.complete) {
      return {
        agent: 'appointment',
        response:
          appointmentData.prompt ||
          "I'd be happy to schedule a consultation for you. Could you please provide your preferred date and time?",
        actions: [
          {
            type: 'show-calendar',
            data: { availableDates: appointmentData.availableDates },
          },
        ],
      };
    }

    // First find available slots
    const slotsResponse = await agent.findAvailableSlots(appointmentData);

    if (!slotsResponse.availableSlots?.length) {
      return {
        agent: 'appointment',
        response: 'No available slots found',
        actions: [
          {
            type: 'show-alternatives',
            data: { slots: [] },
          },
        ],
      };
    }

    // Book the first available slot (in real app, user would select)
    const result = await agent.bookAppointment(
      context.userId || 'anonymous',
      slotsResponse.availableSlots[0],
      appointmentData
    );

    return {
      agent: 'appointment',
      response: result.success
        ? `Great! I've scheduled your consultation. Your confirmation number is ${result.confirmationNumber}. You'll receive a confirmation email shortly.`
        : `I'm sorry, I couldn't book that appointment. ${result.error || 'Please try a different time slot.'}`,
      actions: result.success
        ? [
            {
              type: 'appointment-confirmed',
              data: {
                confirmationNumber: result.confirmationNumber,
                slot: slotsResponse.availableSlots[0],
              },
            },
          ]
        : [
            {
              type: 'show-alternatives',
              data: { slots: slotsResponse.availableSlots },
            },
          ],
    };
  }

  private async handleDocumentAgent(
    agent: DocumentAnalysisAgent,
    message: string,
    context: AgentContext
  ): Promise<AgentResponse> {
    // Check if documents are attached
    if (!context.metadata?.documents) {
      return {
        agent: 'document',
        response:
          "I can help analyze your documents. Please upload the documents you'd like me to review.",
        actions: [
          {
            type: 'request-upload',
            data: {
              acceptedFormats: ['pdf', 'jpg', 'png', 'doc', 'docx'],
              maxSize: '10MB',
            },
          },
        ],
      };
    }

    const result = await agent.analyzeDocument({
      documentPath: context.metadata.documents[0], // Analyze first document
      documentType: 'other',
      analysisType: 'full-analysis',
      language: context.language as 'en' | 'es',
      urgency: 'medium',
      clientId: context.userId || 'anonymous',
    });

    return {
      agent: 'document',
      response: result.summary,
      suggestions: result.recommendedActions,
      actions:
        result.complianceIssues && result.complianceIssues.length > 0
          ? [
              {
                type: 'highlight-issues',
                data: {
                  issues: result.complianceIssues,
                  missingDocuments: result.missingDocuments,
                  requiresReview: result.requiresAttorneyReview,
                },
              },
            ]
          : undefined,
    };
  }

  private async handleIntakeAgent(
    agent: EnhancedIntakeAgent,
    message: string,
    context: AgentContext
  ): Promise<AgentResponse> {
    const intakeData = context.metadata?.intakeData || {};

    const result = await agent.processIntake({
      clientInput: message,
      preferredLanguage: context.language as 'en' | 'es',
      isEmergency: false,
      contactInfo: context.metadata?.contactInfo as any,
    });

    return {
      agent: 'intake',
      response: result.summary,
      suggestions: result.nextSteps,
      actions: [
        {
          type: 'intake-complete',
          data: {
            practiceArea: result.practiceArea,
            urgencyLevel: result.urgencyLevel,
            requiredDocuments: result.requiredDocuments,
            estimatedResponseTime: result.estimatedResponseTime,
          },
        },
      ],
    };
  }

  private async extractAppointmentData(message: string, context: AgentContext): Promise<any> {
    // This would use NLP to extract date, time, and other appointment details
    // For now, return a simple structure
    return {
      complete: false,
      prompt: 'What date and time work best for you?',
      availableDates: await this.getAvailableDates(),
    };
  }

  private async getAvailableDates(): Promise<string[]> {
    // Get next 5 business days
    const dates: string[] = [];
    const today = new Date();
    let daysAdded = 0;

    while (dates.length < 5) {
      today.setDate(today.getDate() + 1);
      const dayOfWeek = today.getDay();

      // Skip weekends
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push(today.toISOString().split('T')[0]);
      }

      daysAdded++;
      if (daysAdded > 10) break; // Safety limit
    }

    return dates;
  }

  // Admin methods
  getAgentStatus(): Record<string, boolean> {
    const status: Record<string, boolean> = {};

    for (const [name, agent] of this.agents) {
      status[name] = agent !== null;
    }

    return status;
  }

  async testAgent(agentName: string, testMessage: string): Promise<any> {
    const agent = this.agents.get(agentName);

    if (!agent) {
      throw new Error(`Agent ${agentName} not found`);
    }

    const testContext: AgentContext = {
      sessionId: 'test-session',
      language: 'en',
      history: [],
    };

    return this.executeAgent(agentName, testMessage, testContext);
  }
}
