'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.RetellService = void 0;
exports.getRetellService = getRetellService;
const axios_1 = __importDefault(require('axios'));
const logger_1 = require('@/lib/logger');
const cache_1 = require('@/lib/cache');
const bull_1 = require('@/lib/queue/bull');
class RetellService {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.client = axios_1.default.create({
      baseURL: config.baseURL || 'https://api.retellai.com',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 seconds
    });
    this.setupInterceptors();
  }
  setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      config => {
        const requestId = `retell-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        config.headers['X-Request-ID'] = requestId;
        logger_1.logger.info('Retell API request', {
          requestId,
          method: config.method,
          url: config.url,
          data: config.data,
        });
        config.metadata = { requestId, startTime: Date.now() };
        return config;
      },
      error => {
        logger_1.logger.error('Retell request error:', error);
        return Promise.reject(error);
      }
    );
    // Response interceptor
    this.client.interceptors.response.use(
      response => {
        if (response.config.metadata) {
          const duration = Date.now() - response.config.metadata.startTime;
          logger_1.logger.info('Retell API response', {
            requestId: response.config.metadata.requestId,
            status: response.status,
            duration,
          });
        }
        return response;
      },
      error => {
        if (error.config?.metadata) {
          const duration = Date.now() - error.config.metadata.startTime;
          logger_1.logger.error('Retell API error', {
            requestId: error.config.metadata.requestId,
            status: error.response?.status,
            duration,
            error: error.response?.data || error.message,
          });
        }
        return Promise.reject(error);
      }
    );
  }
  // Agent Management
  async createAgent(data) {
    const response = await this.client.post('/v2/create-agent', data);
    return response.data.agent_id ? response.data : response.data.agent;
  }
  async getAgent(agentId) {
    const cacheKey = `retell:agent:${agentId}`;
    return cache_1.cache.remember(
      cacheKey,
      async () => {
        try {
          const response = await this.client.get(`/v2/get-agent/${agentId}`);
          return response.data.agent;
        } catch (error) {
          if (error.response?.status === 404) {
            return null;
          }
          throw error;
        }
      },
      cache_1.CacheTTL.LONG
    );
  }
  async updateAgent(agentId, data) {
    const response = await this.client.patch(`/v2/update-agent/${agentId}`, data);
    // Clear cache
    await cache_1.cache.delete(`retell:agent:${agentId}`);
    return response.data.agent;
  }
  async listAgents() {
    const cacheKey = 'retell:agents:list';
    return cache_1.cache.remember(
      cacheKey,
      async () => {
        const response = await this.client.get('/v2/list-agents');
        return response.data.agents || [];
      },
      cache_1.CacheTTL.MEDIUM
    );
  }
  async deleteAgent(agentId) {
    await this.client.delete(`/v2/delete-agent/${agentId}`);
    await cache_1.cache.delete(`retell:agent:${agentId}`);
    await cache_1.cache.delete('retell:agents:list');
  }
  // Call Management
  async createPhoneCall(params) {
    const response = await this.client.post('/v2/create-phone-call', params);
    const call = response.data;
    // Queue for analysis
    await bull_1.callAnalysisQueue.add(
      'analyze-call',
      {
        callId: call.call_id,
        metadata: params.metadata,
      },
      { delay: 5000 }
    ); // Delay to ensure call data is available
    return call;
  }
  async createWebCall(params) {
    const response = await this.client.post('/v2/create-web-call', params);
    return response.data;
  }
  async getCall(callId) {
    const cacheKey = cache_1.cacheKeys.call(callId);
    return cache_1.cache.remember(
      cacheKey,
      async () => {
        try {
          const response = await this.client.get(`/v2/get-call/${callId}`);
          return response.data.call;
        } catch (error) {
          if (error.response?.status === 404) {
            return null;
          }
          throw error;
        }
      },
      cache_1.CacheTTL.MEDIUM
    );
  }
  async listCalls(filters) {
    const response = await this.client.post('/v2/list-calls', filters || {});
    return response.data.calls || [];
  }
  async endCall(callId) {
    await this.client.post(`/v2/end-call/${callId}`);
    // Clear cache
    await cache_1.cache.delete(cache_1.cacheKeys.call(callId));
    // Queue for immediate analysis
    await bull_1.callAnalysisQueue.add('analyze-call', {
      callId,
      priority: 'high',
    });
  }
  async getCallRecording(callId) {
    const response = await this.client.get(`/v2/get-call-recording/${callId}`);
    return response.data;
  }
  async getCallTranscript(callId) {
    const cacheKey = cache_1.cacheKeys.callTranscript(callId);
    return cache_1.cache.remember(
      cacheKey,
      async () => {
        const call = await this.getCall(callId);
        if (!call?.transcript) {
          throw new Error('Call transcript not available');
        }
        return call.transcript;
      },
      cache_1.CacheTTL.EXTRA_LONG
    );
  }
  // Analytics
  async getCallAnalytics(callId) {
    const response = await this.client.get(`/v2/get-call-analysis/${callId}`);
    return response.data;
  }
  async getAgentAnalytics(agentId, timeRange) {
    const params = timeRange
      ? {
          start_timestamp: timeRange.start.getTime(),
          end_timestamp: timeRange.end.getTime(),
        }
      : {};
    const response = await this.client.get(`/v2/get-agent-analytics/${agentId}`, { params });
    return response.data;
  }
  // Voice Management
  async listVoices() {
    const cacheKey = 'retell:voices:list';
    return cache_1.cache.remember(
      cacheKey,
      async () => {
        const response = await this.client.get('/v2/list-voices');
        return response.data.voices || [];
      },
      cache_1.CacheTTL.EXTRA_LONG
    );
  }
  // LLM Management
  async listLLMs() {
    const cacheKey = 'retell:llms:list';
    return cache_1.cache.remember(
      cacheKey,
      async () => {
        const response = await this.client.get('/v2/list-llms');
        return response.data.llms || [];
      },
      cache_1.CacheTTL.EXTRA_LONG
    );
  }
  // Webhook handling
  verifyWebhook(signature, payload, secret) {
    const crypto = require('crypto');
    const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  }
  async handleWebhookEvent(event) {
    logger_1.logger.info('Retell webhook event', {
      type: event.event,
      callId: event.call?.call_id,
    });
    switch (event.event) {
      case 'call_started':
        await this.handleCallStarted(event);
        break;
      case 'call_ended':
        await this.handleCallEnded(event);
        break;
      case 'call_analyzed':
        await this.handleCallAnalyzed(event);
        break;
      case 'transcript_ready':
        await this.handleTranscriptReady(event);
        break;
      default:
        logger_1.logger.warn('Unknown Retell webhook event', { type: event.event });
    }
  }
  async handleCallStarted(event) {
    const { call } = event;
    // Store call data
    await cache_1.cache.set(cache_1.cacheKeys.call(call.call_id), call, cache_1.CacheTTL.LONG);
    // Log call start
    logger_1.logger.info('Call started', {
      callId: call.call_id,
      agentId: call.agent_id,
      from: call.from_number,
      to: call.to_number,
    });
  }
  async handleCallEnded(event) {
    const { call } = event;
    // Update call data
    await cache_1.cache.set(cache_1.cacheKeys.call(call.call_id), call, cache_1.CacheTTL.LONG);
    // Queue for analysis
    await bull_1.callAnalysisQueue.add('analyze-call', {
      callId: call.call_id,
      transcript: call.transcript,
      metadata: call.metadata,
      duration: call.duration_ms,
    });
  }
  async handleCallAnalyzed(event) {
    const { call_id, analysis } = event;
    logger_1.logger.info('Call analysis complete', {
      callId: call_id,
      sentiment: analysis.sentiment,
      summary: analysis.summary?.substring(0, 100),
    });
  }
  async handleTranscriptReady(event) {
    const { call_id, transcript } = event;
    // Cache transcript
    await cache_1.cache.set(
      cache_1.cacheKeys.callTranscript(call_id),
      transcript,
      cache_1.CacheTTL.EXTRA_LONG
    );
  }
}
exports.RetellService = RetellService;
// Singleton instance
let retellService = null;
function getRetellService() {
  if (!retellService) {
    const apiKey = process.env.RETELL_API_KEY;
    if (!apiKey) {
      logger_1.logger.warn('RETELL_API_KEY not set, Retell service will not be available');
      throw new Error('RETELL_API_KEY environment variable is not set');
    }
    retellService = new RetellService({ apiKey });
  }
  return retellService;
}
