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
import { EventEmitter } from 'events';
import pLimit from 'p-limit';

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

export interface AgentMemory {
  shortTerm: Map<string, any>;
  longTerm: Map<string, any>;
  workingMemory: any[];
  lastAccessed: Date;
}

export interface InterAgentMessage {
  from: string;
  to: string;
  type: 'request' | 'response' | 'broadcast';
  payload: any;
  timestamp: Date;
  correlationId?: string;
}

export interface AgentPerformanceMetrics {
  requestCount: number;
  successCount: number;
  errorCount: number;
  averageResponseTime: number;
  lastResponseTime: number;
  cpuUsage?: number;
  memoryUsage?: number;
}

export class AgentOrchestrator extends EventEmitter {
  private agents: Map<string, any>;
  private agentTypes: Map<string, string>;
  private agentMemory: Map<string, AgentMemory>;
  private messageQueue: InterAgentMessage[];
  private performanceMetrics: Map<string, AgentPerformanceMetrics>;
  private concurrencyLimit: pLimit.Limit;
  private static instance: AgentOrchestrator;
  private parallelProcessingEnabled: boolean = false;
  private maxConcurrentRequests: number = 10;

  private constructor() {
    super();
    this.agents = new Map();
    this.agentTypes = new Map();
    this.agentMemory = new Map();
    this.messageQueue = [];
    this.performanceMetrics = new Map();
    this.concurrencyLimit = pLimit(this.maxConcurrentRequests);
    this.initializeAgents();
    this.startMessageProcessor();
  }

  static getInstance(): AgentOrchestrator {
    if (!AgentOrchestrator.instance) {
      AgentOrchestrator.instance = new AgentOrchestrator();
    }
    return AgentOrchestrator.instance;
  }

  private initializeAgents() {
    // Track successful and failed initializations
    const initResults = {
      success: [] as string[],
      failed: [] as string[],
    };

    // Helper function to safely create and register an agent
    const safeRegister = (name: string, createFn: () => any, type: string) => {
      try {
        const agent = createFn();
        this.registerAgentWithType(name, agent, type);
        initResults.success.push(name);
      } catch (error) {
        logger.error(`Failed to create agent ${name}:`, error);
        initResults.failed.push(name);
      }
    };

    // Initialize all customer-facing agents
    safeRegister('consultation', () => new LegalConsultationAgent(), 'crewai');
    safeRegister('appointment', () => new AppointmentSchedulingAgent(), 'crewai');
    safeRegister('document', () => new DocumentAnalysisAgent(), 'crewai');
    safeRegister('intake', () => new EnhancedIntakeAgent(), 'crewai');
    safeRegister('removal', () => new RemovalDefenseAgent(), 'crewai');
    safeRegister('business', () => new BusinessImmigrationAgent(), 'crewai');
    safeRegister('criminal', () => new CriminalDefenseAgent(), 'crewai');
    safeRegister('aila', () => new AILATrainedRemovalDefenseAgent(), 'crewai');
    
    // Initialize automation agents
    safeRegister('lead-validation', () => new LeadValidationAgent(), 'automation');
    safeRegister('follow-up', () => new FollowUpAutomationAgent(), 'automation');

    // Log initialization results
    logger.info(`Agent Orchestrator initialization complete:`, {
      totalAgents: this.agents.size,
      successful: initResults.success.length,
      failed: initResults.failed.length,
      failedAgents: initResults.failed,
    });

    // Emit initialization event
    this.emit('agents-initialized', { 
      count: this.agents.size, 
      success: initResults.success,
      failed: initResults.failed,
      hasErrors: initResults.failed.length > 0,
    });
  }

  private registerAgentWithType(name: string, agent: any, type: string) {
    try {
      this.agents.set(name, agent);
      this.agentTypes.set(name, type);
      this.initializeAgentMemory(name);
      this.initializeAgentMetrics(name);
      logger.info(`Successfully registered agent: ${name}`);
    } catch (error) {
      logger.error(`Failed to register agent ${name}:`, error);
      // Continue without this agent rather than failing completely
    }
  }

  private initializeAgentMemory(agentName: string) {
    this.agentMemory.set(agentName, {
      shortTerm: new Map(),
      longTerm: new Map(),
      workingMemory: [],
      lastAccessed: new Date(),
    });
  }

  private initializeAgentMetrics(agentName: string) {
    this.performanceMetrics.set(agentName, {
      requestCount: 0,
      successCount: 0,
      errorCount: 0,
      averageResponseTime: 0,
      lastResponseTime: 0,
    });
  }

  async routeMessage(message: string, context: AgentContext): Promise<AgentResponse> {
    const startTime = Date.now();
    
    try {
      // Check if orchestrator is properly initialized
      if (this.agents.size === 0) {
        logger.warn('No agents available in orchestrator');
        return this.getFallbackResponse(context.language);
      }

      // Analyze message intent
      const intent = await this.analyzeIntent(message, context);

      // Route to appropriate agent
      const agentName = this.selectAgent(intent, context);

      if (!agentName) {
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

      // Check if agent exists
      if (!this.agents.has(agentName)) {
        logger.warn(`Agent ${agentName} not found, using fallback`);
        return this.getFallbackResponse(context.language);
      }

      // Execute with parallel processing if enabled
      let response: AgentResponse;
      
      if (this.parallelProcessingEnabled) {
        response = await this.concurrencyLimit(() => 
          this.executeAgent(agentName, message, context)
        );
      } else {
        response = await this.executeAgent(agentName, message, context);
      }

      // Update metrics
      this.updateAgentMetrics(agentName, true, Date.now() - startTime);
      
      // Store in agent memory
      this.updateAgentMemory(agentName, context.sessionId, {
        message,
        response: response.response,
        timestamp: new Date(),
      });

      return response;
    } catch (error) {
      logger.error('Agent orchestration error:', error);
      
      // Update error metrics safely
      try {
        const intent = await this.analyzeIntent(message, context);
        const agentName = this.selectAgent(intent, context);
        if (agentName) {
          this.updateAgentMetrics(agentName, false, Date.now() - startTime);
        }
      } catch (metricsError) {
        logger.error('Failed to update error metrics:', metricsError);
      }
      
      return this.getFallbackResponse(context.language);
    }
  }

  private getFallbackResponse(language: string): AgentResponse {
    return {
      agent: 'orchestrator',
      response:
        language === 'es'
          ? 'Disculpa, estoy teniendo dificultades técnicas. Por favor llama a nuestra oficina al (888) 979-8990 para asistencia inmediata.'
          : 'I apologize, but I\'m experiencing technical difficulties. Please contact our office directly at (888) 979-8990 for immediate assistance.',
      actions: [
        {
          type: 'show-contact',
          data: { phone: '(888) 979-8990' },
        },
      ],
    };
  }

  // Enable parallel processing
  enableParallelProcessing(maxConcurrent: number = 10) {
    this.parallelProcessingEnabled = true;
    this.maxConcurrentRequests = maxConcurrent;
    this.concurrencyLimit = pLimit(maxConcurrent);
    logger.info(`Parallel processing enabled with ${maxConcurrent} concurrent requests`);
  }

  // Inter-agent communication
  async sendInterAgentMessage(message: InterAgentMessage) {
    this.messageQueue.push(message);
    this.emit('inter-agent-message', message);
  }

  private startMessageProcessor() {
    setInterval(() => {
      if (this.messageQueue.length > 0) {
        const message = this.messageQueue.shift();
        if (message) {
          this.processInterAgentMessage(message).catch(error => {
            logger.error('Error processing inter-agent message:', error);
          });
        }
      }
    }, 100); // Process messages every 100ms
  }

  private async processInterAgentMessage(message: InterAgentMessage) {
    const targetAgent = this.agents.get(message.to);
    
    if (!targetAgent) {
      logger.warn(`Target agent ${message.to} not found for message from ${message.from}`);
      return;
    }

    // Process message based on type
    if (message.type === 'broadcast') {
      // Broadcast to all agents except sender
      for (const [agentName, agent] of this.agents) {
        if (agentName !== message.from) {
          await this.deliverMessage(agentName, message);
        }
      }
    } else {
      await this.deliverMessage(message.to, message);
    }
  }

  private async deliverMessage(agentName: string, message: InterAgentMessage) {
    // Store message in agent's memory
    const memory = this.agentMemory.get(agentName);
    if (memory) {
      memory.workingMemory.push(message);
      memory.lastAccessed = new Date();
      
      // Limit working memory size
      if (memory.workingMemory.length > 100) {
        memory.workingMemory.shift();
      }
    }
    
    this.emit('message-delivered', { agent: agentName, message });
  }

  // Agent memory management
  updateAgentMemory(agentName: string, key: string, value: any, persistent: boolean = false) {
    const memory = this.agentMemory.get(agentName);
    if (!memory) return;

    if (persistent) {
      memory.longTerm.set(key, value);
    } else {
      memory.shortTerm.set(key, value);
      
      // Clear old short-term memories (older than 1 hour)
      const oneHourAgo = Date.now() - 3600000;
      for (const [k, v] of memory.shortTerm) {
        if (v.timestamp && v.timestamp < oneHourAgo) {
          memory.shortTerm.delete(k);
        }
      }
    }
    
    memory.lastAccessed = new Date();
  }

  getAgentMemory(agentName: string, key: string): any {
    const memory = this.agentMemory.get(agentName);
    if (!memory) return null;

    memory.lastAccessed = new Date();
    return memory.shortTerm.get(key) || memory.longTerm.get(key);
  }

  // Performance monitoring
  private updateAgentMetrics(agentName: string, success: boolean, responseTime: number) {
    const metrics = this.performanceMetrics.get(agentName);
    if (!metrics) return;

    metrics.requestCount++;
    if (success) {
      metrics.successCount++;
    } else {
      metrics.errorCount++;
    }
    
    metrics.lastResponseTime = responseTime;
    metrics.averageResponseTime = 
      (metrics.averageResponseTime * (metrics.requestCount - 1) + responseTime) / 
      metrics.requestCount;
    
    this.emit('metrics-updated', { agent: agentName, metrics });
  }

  getAgentMetrics(agentName: string): AgentPerformanceMetrics | null {
    return this.performanceMetrics.get(agentName) || null;
  }

  getAllMetrics(): Record<string, AgentPerformanceMetrics> {
    const allMetrics: Record<string, AgentPerformanceMetrics> = {};
    
    for (const [agentName, metrics] of this.performanceMetrics) {
      allMetrics[agentName] = metrics;
    }
    
    return allMetrics;
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

  // New methods for deployment
  async registerAgent(name: string, type: string): Promise<void> {
    if (!this.agents.has(name)) {
      logger.warn(`Agent ${name} not found in orchestrator`);
    }
    this.agentTypes.set(name, type);
    this.emit('agent-registered', { name, type });
  }

  async unregisterAgent(name: string): Promise<void> {
    this.agents.delete(name);
    this.agentTypes.delete(name);
    this.agentMemory.delete(name);
    this.performanceMetrics.delete(name);
    this.emit('agent-unregistered', { name });
  }

  async initializeChatAgent(name: string): Promise<void> {
    // Initialize chat-specific configurations
    logger.info(`Initializing chat agent: ${name}`);
    this.emit('chat-agent-initialized', { name });
  }

  // Get agent communication stats
  getInterAgentCommunicationStats() {
    const stats = {
      totalMessages: 0,
      messagesByAgent: {} as Record<string, number>,
      messageTypes: {
        request: 0,
        response: 0,
        broadcast: 0,
      },
    };

    // Analyze message queue and agent memories
    for (const [agentName, memory] of this.agentMemory) {
      const agentMessages = memory.workingMemory.filter(
        (item: any) => item.from || item.to
      ).length;
      stats.messagesByAgent[agentName] = agentMessages;
      stats.totalMessages += agentMessages;
    }

    return stats;
  }
}
