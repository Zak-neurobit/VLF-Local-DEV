'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AgentOrchestrator = void 0;
const legal_consultation_agent_1 = require('@/lib/crewai/agents/legal-consultation-agent');
const appointment_scheduling_agent_1 = require('@/lib/crewai/agents/appointment-scheduling-agent');
const document_analysis_agent_1 = require('@/lib/crewai/agents/document-analysis-agent');
const enhanced_intake_agent_1 = require('@/lib/crewai/agents/enhanced-intake-agent');
const removal_defense_agent_1 = require('@/lib/crewai/agents/removal-defense-agent');
const business_immigration_agent_1 = require('@/lib/crewai/agents/business-immigration-agent');
const criminal_defense_agent_1 = require('@/lib/crewai/agents/criminal-defense-agent');
const aila_trained_removal_agent_1 = require('@/lib/crewai/agents/aila-trained-removal-agent');
const lead_validation_agent_1 = require('@/lib/agents/lead-validation-agent');
const follow_up_automation_agent_1 = require('@/lib/agents/follow-up-automation-agent');
const logger_1 = require('@/lib/logger');
const events_1 = require('events');
const p_limit_1 = __importDefault(require('p-limit'));
class AgentOrchestrator extends events_1.EventEmitter {
  constructor() {
    super();
    this.parallelProcessingEnabled = false;
    this.maxConcurrentRequests = 10;
    this.agents = new Map();
    this.agentTypes = new Map();
    this.agentMemory = new Map();
    this.messageQueue = [];
    this.performanceMetrics = new Map();
    this.concurrencyLimit = (0, p_limit_1.default)(this.maxConcurrentRequests);
    this.initializeAgents();
    this.startMessageProcessor();
  }
  static getInstance() {
    if (!AgentOrchestrator.instance) {
      AgentOrchestrator.instance = new AgentOrchestrator();
    }
    return AgentOrchestrator.instance;
  }
  initializeAgents() {
    // Initialize all customer-facing agents
    this.registerAgentWithType(
      'consultation',
      new legal_consultation_agent_1.LegalConsultationAgent(),
      'crewai'
    );
    this.registerAgentWithType(
      'appointment',
      new appointment_scheduling_agent_1.AppointmentSchedulingAgent(),
      'crewai'
    );
    this.registerAgentWithType(
      'document',
      new document_analysis_agent_1.DocumentAnalysisAgent(),
      'crewai'
    );
    this.registerAgentWithType(
      'intake',
      new enhanced_intake_agent_1.EnhancedIntakeAgent(),
      'crewai'
    );
    this.registerAgentWithType(
      'removal',
      new removal_defense_agent_1.RemovalDefenseAgent(),
      'crewai'
    );
    this.registerAgentWithType(
      'business',
      new business_immigration_agent_1.BusinessImmigrationAgent(),
      'crewai'
    );
    this.registerAgentWithType(
      'criminal',
      new criminal_defense_agent_1.CriminalDefenseAgent(),
      'crewai'
    );
    this.registerAgentWithType(
      'aila',
      new aila_trained_removal_agent_1.AILATrainedRemovalDefenseAgent(),
      'crewai'
    );
    // Initialize automation agents
    this.registerAgentWithType(
      'lead-validation',
      new lead_validation_agent_1.LeadValidationAgent(),
      'automation'
    );
    this.registerAgentWithType(
      'follow-up',
      new follow_up_automation_agent_1.FollowUpAutomationAgent(),
      'automation'
    );
    logger_1.logger.info(
      'Agent Orchestrator initialized with 10 agents including automation specialists'
    );
    this.emit('agents-initialized', { count: this.agents.size });
  }
  registerAgentWithType(name, agent, type) {
    this.agents.set(name, agent);
    this.agentTypes.set(name, type);
    this.initializeAgentMemory(name);
    this.initializeAgentMetrics(name);
  }
  initializeAgentMemory(agentName) {
    this.agentMemory.set(agentName, {
      shortTerm: new Map(),
      longTerm: new Map(),
      workingMemory: [],
      lastAccessed: new Date(),
    });
  }
  initializeAgentMetrics(agentName) {
    this.performanceMetrics.set(agentName, {
      requestCount: 0,
      successCount: 0,
      errorCount: 0,
      averageResponseTime: 0,
      lastResponseTime: 0,
    });
  }
  async routeMessage(message, context) {
    const startTime = Date.now();
    try {
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
      // Execute with parallel processing if enabled
      let response;
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
      logger_1.logger.error('Agent orchestration error:', error);
      // Update error metrics
      if (this.selectAgent(await this.analyzeIntent(message, context), context)) {
        this.updateAgentMetrics(
          this.selectAgent(await this.analyzeIntent(message, context), context),
          false,
          Date.now() - startTime
        );
      }
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
  // Enable parallel processing
  enableParallelProcessing(maxConcurrent = 10) {
    this.parallelProcessingEnabled = true;
    this.maxConcurrentRequests = maxConcurrent;
    this.concurrencyLimit = (0, p_limit_1.default)(maxConcurrent);
    logger_1.logger.info(`Parallel processing enabled with ${maxConcurrent} concurrent requests`);
  }
  // Inter-agent communication
  async sendInterAgentMessage(message) {
    this.messageQueue.push(message);
    this.emit('inter-agent-message', message);
  }
  startMessageProcessor() {
    setInterval(() => {
      if (this.messageQueue.length > 0) {
        const message = this.messageQueue.shift();
        if (message) {
          this.processInterAgentMessage(message).catch(error => {
            logger_1.logger.error('Error processing inter-agent message:', error);
          });
        }
      }
    }, 100); // Process messages every 100ms
  }
  async processInterAgentMessage(message) {
    const targetAgent = this.agents.get(message.to);
    if (!targetAgent) {
      logger_1.logger.warn(`Target agent ${message.to} not found for message from ${message.from}`);
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
  async deliverMessage(agentName, message) {
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
  updateAgentMemory(agentName, key, value, persistent = false) {
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
  getAgentMemory(agentName, key) {
    const memory = this.agentMemory.get(agentName);
    if (!memory) return null;
    memory.lastAccessed = new Date();
    return memory.shortTerm.get(key) || memory.longTerm.get(key);
  }
  // Performance monitoring
  updateAgentMetrics(agentName, success, responseTime) {
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
  getAgentMetrics(agentName) {
    return this.performanceMetrics.get(agentName) || null;
  }
  getAllMetrics() {
    const allMetrics = {};
    for (const [agentName, metrics] of this.performanceMetrics) {
      allMetrics[agentName] = metrics;
    }
    return allMetrics;
  }
  async analyzeIntent(message, context) {
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
  selectAgent(intent, context) {
    // Check for specific routing in context
    if (context.metadata?.preferredAgent) {
      return context.metadata.preferredAgent;
    }
    // Map intent to agent
    const intentToAgent = {
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
  async executeAgent(agentName, message, context) {
    const agent = this.agents.get(agentName);
    if (!agent) {
      throw new Error(`Agent ${agentName} not found`);
    }
    logger_1.logger.info(`Executing ${agentName} agent`, { sessionId: context.sessionId });
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
  async handleConsultationAgent(agent, message, context) {
    const result = await agent.analyze({
      userId: context.userId || 'anonymous',
      description: message,
      caseType: 'general',
      urgency: 'medium',
      language: context.language,
      location: context.metadata?.location,
    });
    const response = {
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
  async handleAppointmentAgent(agent, message, context) {
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
  async handleDocumentAgent(agent, message, context) {
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
      language: context.language,
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
  async handleIntakeAgent(agent, message, context) {
    const intakeData = context.metadata?.intakeData || {};
    const result = await agent.processIntake({
      clientInput: message,
      preferredLanguage: context.language,
      isEmergency: false,
      contactInfo: context.metadata?.contactInfo,
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
  async extractAppointmentData(message, context) {
    // This would use NLP to extract date, time, and other appointment details
    // For now, return a simple structure
    return {
      complete: false,
      prompt: 'What date and time work best for you?',
      availableDates: await this.getAvailableDates(),
    };
  }
  async getAvailableDates() {
    // Get next 5 business days
    const dates = [];
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
  getAgentStatus() {
    const status = {};
    for (const [name, agent] of this.agents) {
      status[name] = agent !== null;
    }
    return status;
  }
  async testAgent(agentName, testMessage) {
    const agent = this.agents.get(agentName);
    if (!agent) {
      throw new Error(`Agent ${agentName} not found`);
    }
    const testContext = {
      sessionId: 'test-session',
      language: 'en',
      history: [],
    };
    return this.executeAgent(agentName, testMessage, testContext);
  }
  // New methods for deployment
  async registerAgent(name, type) {
    if (!this.agents.has(name)) {
      logger_1.logger.warn(`Agent ${name} not found in orchestrator`);
    }
    this.agentTypes.set(name, type);
    this.emit('agent-registered', { name, type });
  }
  async unregisterAgent(name) {
    this.agents.delete(name);
    this.agentTypes.delete(name);
    this.agentMemory.delete(name);
    this.performanceMetrics.delete(name);
    this.emit('agent-unregistered', { name });
  }
  async initializeChatAgent(name) {
    // Initialize chat-specific configurations
    logger_1.logger.info(`Initializing chat agent: ${name}`);
    this.emit('chat-agent-initialized', { name });
  }
  // Get agent communication stats
  getInterAgentCommunicationStats() {
    const stats = {
      totalMessages: 0,
      messagesByAgent: {},
      messageTypes: {
        request: 0,
        response: 0,
        broadcast: 0,
      },
    };
    // Analyze message queue and agent memories
    for (const [agentName, memory] of this.agentMemory) {
      const agentMessages = memory.workingMemory.filter(item => item.from || item.to).length;
      stats.messagesByAgent[agentName] = agentMessages;
      stats.totalMessages += agentMessages;
    }
    return stats;
  }
}
exports.AgentOrchestrator = AgentOrchestrator;
