import axios, { AxiosInstance } from 'axios';
import { logger } from '@/lib/logger';
import { cache, cacheKeys, CacheTTL } from '@/lib/cache';
import { callAnalysisQueue } from '@/lib/queue/bull';

interface RetellConfig {
  apiKey: string;
  baseURL?: string;
}

interface RetellAgent {
  agent_id: string;
  agent_name: string;
  voice_id: string;
  language: string;
  response_engine: {
    type: string;
    llm_id?: string;
    system_prompt?: string;
  };
  webhook_url?: string;
  interruption_sensitivity?: number;
  ambient_sound?: boolean;
  responsiveness?: number;
  voice_temperature?: number;
  voice_speed?: number;
  enable_backchannel?: boolean;
  reminder_trigger_ms?: number;
  reminder_max_count?: number;
}

interface RetellCall {
  call_id: string;
  agent_id: string;
  call_status: 'ongoing' | 'ended' | 'error';
  start_timestamp: number;
  end_timestamp?: number;
  transcript?: string;
  recording_url?: string;
  metadata?: Record<string, any>;
  from_number?: string;
  to_number?: string;
  direction?: 'inbound' | 'outbound';
  duration_ms?: number;
  disconnection_reason?: string;
}

interface CreateCallParams {
  agent_id: string;
  from_number: string;
  to_number: string;
  metadata?: Record<string, any>;
  override_agent_config?: Partial<RetellAgent>;
}

interface WebCallParams {
  agent_id: string;
  metadata?: Record<string, any>;
  override_agent_config?: Partial<RetellAgent>;
}

export class RetellService {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(config: RetellConfig) {
    this.apiKey = config.apiKey;
    this.client = axios.create({
      baseURL: config.baseURL || 'https://api.retellai.com',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 seconds
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      config => {
        const requestId = `retell-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        config.headers['X-Request-ID'] = requestId;

        logger.info('Retell API request', {
          requestId,
          method: config.method,
          url: config.url,
          data: config.data,
        });

        (config as any).metadata = { requestId, startTime: Date.now() };
        return config;
      },
      error => {
        logger.error('Retell request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      response => {
        if ((response.config as any).metadata) {
          const duration = Date.now() - (response.config as any).metadata.startTime;
          logger.info('Retell API response', {
            requestId: (response.config as any).metadata.requestId,
            status: response.status,
            duration,
          });
        }
        return response;
      },
      error => {
        if ((error.config as any)?.metadata) {
          const duration = Date.now() - (error.config as any).metadata.startTime;
          logger.error('Retell API error', {
            requestId: (error.config as any).metadata.requestId,
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
  async createAgent(data: Partial<RetellAgent>): Promise<RetellAgent> {
    const response = await this.client.post('/v2/create-agent', data);
    return response.data.agent_id ? response.data : response.data.agent;
  }

  async getAgent(agentId: string): Promise<RetellAgent | null> {
    const cacheKey = `retell:agent:${agentId}`;

    return cache.remember(
      cacheKey,
      async () => {
        try {
          const response = await this.client.get(`/v2/get-agent/${agentId}`);
          return response.data.agent;
        } catch (error: any) {
          if (error.response?.status === 404) {
            return null;
          }
          throw error;
        }
      },
      CacheTTL.LONG
    );
  }

  async updateAgent(agentId: string, data: Partial<RetellAgent>): Promise<RetellAgent> {
    const response = await this.client.patch(`/v2/update-agent/${agentId}`, data);

    // Clear cache
    await cache.delete(`retell:agent:${agentId}`);

    return response.data.agent;
  }

  async listAgents(): Promise<RetellAgent[]> {
    const cacheKey = 'retell:agents:list';

    return cache.remember(
      cacheKey,
      async () => {
        const response = await this.client.get('/v2/list-agents');
        return response.data.agents || [];
      },
      CacheTTL.MEDIUM
    );
  }

  async deleteAgent(agentId: string): Promise<void> {
    await this.client.delete(`/v2/delete-agent/${agentId}`);
    await cache.delete(`retell:agent:${agentId}`);
    await cache.delete('retell:agents:list');
  }

  // Call Management
  async createPhoneCall(params: CreateCallParams): Promise<RetellCall> {
    const response = await this.client.post('/v2/create-phone-call', params);
    const call = response.data;

    // Queue for analysis
    await callAnalysisQueue.add(
      'analyze-call',
      {
        callId: call.call_id,
        metadata: params.metadata,
      },
      { delay: 5000 }
    ); // Delay to ensure call data is available

    return call;
  }

  async createWebCall(params: WebCallParams): Promise<{ call_id: string; web_call_link: string }> {
    const response = await this.client.post('/v2/create-web-call', params);
    return response.data;
  }

  async getCall(callId: string): Promise<RetellCall | null> {
    const cacheKey = cacheKeys.call(callId);

    return cache.remember(
      cacheKey,
      async () => {
        try {
          const response = await this.client.get(`/v2/get-call/${callId}`);
          return response.data.call;
        } catch (error: any) {
          if (error.response?.status === 404) {
            return null;
          }
          throw error;
        }
      },
      CacheTTL.MEDIUM
    );
  }

  async listCalls(filters?: {
    agent_id?: string;
    limit?: number;
    sort_order?: 'ascending' | 'descending';
    filter_criteria?: {
      from_number?: string;
      to_number?: string;
      call_status?: string[];
    };
  }): Promise<RetellCall[]> {
    const response = await this.client.post('/v2/list-calls', filters || {});
    return response.data.calls || [];
  }

  async endCall(callId: string): Promise<void> {
    await this.client.post(`/v2/end-call/${callId}`);

    // Clear cache
    await cache.delete(cacheKeys.call(callId));

    // Queue for immediate analysis
    await callAnalysisQueue.add('analyze-call', {
      callId,
      priority: 'high',
    });
  }

  async getCallRecording(callId: string): Promise<{ recording_url: string; expires_at: number }> {
    const response = await this.client.get(`/v2/get-call-recording/${callId}`);
    return response.data;
  }

  async getCallTranscript(callId: string): Promise<string> {
    const cacheKey = cacheKeys.callTranscript(callId);

    return cache.remember(
      cacheKey,
      async () => {
        const call = await this.getCall(callId);
        if (!call?.transcript) {
          throw new Error('Call transcript not available');
        }
        return call.transcript;
      },
      CacheTTL.EXTRA_LONG
    );
  }

  // Analytics
  async getCallAnalytics(callId: string): Promise<any> {
    const response = await this.client.get(`/v2/get-call-analysis/${callId}`);
    return response.data;
  }

  async getAgentAnalytics(agentId: string, timeRange?: { start: Date; end: Date }): Promise<any> {
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
  async listVoices(): Promise<any[]> {
    const cacheKey = 'retell:voices:list';

    return cache.remember(
      cacheKey,
      async () => {
        const response = await this.client.get('/v2/list-voices');
        return response.data.voices || [];
      },
      CacheTTL.EXTRA_LONG
    );
  }

  // LLM Management
  async listLLMs(): Promise<any[]> {
    const cacheKey = 'retell:llms:list';

    return cache.remember(
      cacheKey,
      async () => {
        const response = await this.client.get('/v2/list-llms');
        return response.data.llms || [];
      },
      CacheTTL.EXTRA_LONG
    );
  }

  // Webhook handling
  verifyWebhook(signature: string, payload: string, secret: string): boolean {
    const crypto = require('crypto');
    const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  }

  async handleWebhookEvent(event: any): Promise<void> {
    logger.info('Retell webhook event', { type: event.event, callId: event.call?.call_id });

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
        logger.warn('Unknown Retell webhook event', { type: event.event });
    }
  }

  private async handleCallStarted(event: any): Promise<void> {
    const { call } = event;

    // Store call data
    await cache.set(cacheKeys.call(call.call_id), call, CacheTTL.LONG);

    // Log call start
    logger.info('Call started', {
      callId: call.call_id,
      agentId: call.agent_id,
      from: call.from_number,
      to: call.to_number,
    });
  }

  private async handleCallEnded(event: any): Promise<void> {
    const { call } = event;

    // Update call data
    await cache.set(cacheKeys.call(call.call_id), call, CacheTTL.LONG);

    // Queue for analysis
    await callAnalysisQueue.add('analyze-call', {
      callId: call.call_id,
      transcript: call.transcript,
      metadata: call.metadata,
      duration: call.duration_ms,
    });
  }

  private async handleCallAnalyzed(event: any): Promise<void> {
    const { call_id, analysis } = event;

    logger.info('Call analysis complete', {
      callId: call_id,
      sentiment: analysis.sentiment,
      summary: analysis.summary?.substring(0, 100),
    });
  }

  private async handleTranscriptReady(event: any): Promise<void> {
    const { call_id, transcript } = event;

    // Cache transcript
    await cache.set(cacheKeys.callTranscript(call_id), transcript, CacheTTL.EXTRA_LONG);
  }
}

// Singleton instance
let retellService: RetellService | null = null;

export function getRetellService(): RetellService {
  if (!retellService) {
    const apiKey = process.env.RETELL_API_KEY;
    if (!apiKey) {
      logger.warn('RETELL_API_KEY not set, Retell service will not be available');
      throw new Error('RETELL_API_KEY environment variable is not set');
    }
    retellService = new RetellService({ apiKey });
  }
  return retellService;
}

// Export types
export type { RetellAgent, RetellCall, CreateCallParams, WebCallParams };
