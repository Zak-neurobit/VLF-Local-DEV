// Mock Retell AI service for local testing
import { NextRequest } from 'next/server';

interface RetellAgent {
  agent_id: string;
  agent_name: string;
  voice_id: string;
  language: string;
  webhook_url: string;
  created_at: string;
}

interface RetellCall {
  call_id: string;
  agent_id: string;
  from_number: string;
  to_number: string;
  status: 'ongoing' | 'ended' | 'error';
  duration: number;
  created_at: string;
}

class RetellMockService {
  private agents: Map<string, RetellAgent> = new Map();
  private calls: Map<string, RetellCall> = new Map();

  constructor() {
    // Initialize with default agents
    this.agents.set('agent-1', {
      agent_id: 'agent-1',
      agent_name: 'William Vasquez AI Assistant',
      voice_id: 'voice-professional-male',
      language: 'en-US',
      webhook_url: 'http://localhost:3000/api/retell/webhook',
      created_at: new Date().toISOString(),
    });

    this.agents.set('agent-2', {
      agent_id: 'agent-2',
      agent_name: 'Asistente AI de William Vasquez',
      voice_id: 'voice-professional-male',
      language: 'es-ES',
      webhook_url: 'http://localhost:3000/api/retell/webhook',
      created_at: new Date().toISOString(),
    });
  }

  // List all agents
  async listAgents(): Promise<RetellAgent[]> {
    return Array.from(this.agents.values());
  }

  // Get agent by ID
  async getAgent(agentId: string): Promise<RetellAgent | null> {
    return this.agents.get(agentId) || null;
  }

  // Create new agent
  async createAgent(data: Partial<RetellAgent>): Promise<RetellAgent> {
    const agent: RetellAgent = {
      agent_id: `agent-${Date.now()}`,
      agent_name: data.agent_name || 'New Agent',
      voice_id: data.voice_id || 'voice-default',
      language: data.language || 'en-US',
      webhook_url: data.webhook_url || 'http://localhost:3000/api/retell/webhook',
      created_at: new Date().toISOString(),
    };

    this.agents.set(agent.agent_id, agent);
    return agent;
  }

  // Update agent
  async updateAgent(agentId: string, data: Partial<RetellAgent>): Promise<RetellAgent | null> {
    const agent = this.agents.get(agentId);
    if (!agent) return null;

    const updatedAgent = { ...agent, ...data, agent_id: agentId };
    this.agents.set(agentId, updatedAgent);
    return updatedAgent;
  }

  // Delete agent
  async deleteAgent(agentId: string): Promise<boolean> {
    return this.agents.delete(agentId);
  }

  // Create a call
  async createCall(data: {
    agent_id: string;
    from_number: string;
    to_number: string;
  }): Promise<RetellCall> {
    const call: RetellCall = {
      call_id: `call-${Date.now()}`,
      agent_id: data.agent_id,
      from_number: data.from_number,
      to_number: data.to_number,
      status: 'ongoing',
      duration: 0,
      created_at: new Date().toISOString(),
    };

    this.calls.set(call.call_id, call);

    // Simulate call ending after random duration
    setTimeout(
      () => {
        const endedCall = this.calls.get(call.call_id);
        if (endedCall && endedCall.status === 'ongoing') {
          endedCall.status = 'ended';
          endedCall.duration = Math.floor(Math.random() * 300) + 30; // 30-330 seconds
          this.calls.set(call.call_id, endedCall);
        }
      },
      Math.random() * 10000 + 5000
    ); // 5-15 seconds

    return call;
  }

  // Get call by ID
  async getCall(callId: string): Promise<RetellCall | null> {
    return this.calls.get(callId) || null;
  }

  // List all calls
  async listCalls(): Promise<RetellCall[]> {
    return Array.from(this.calls.values());
  }

  // End a call
  async endCall(callId: string): Promise<RetellCall | null> {
    const call = this.calls.get(callId);
    if (!call) return null;

    call.status = 'ended';
    call.duration = Math.floor((Date.now() - new Date(call.created_at).getTime()) / 1000);
    this.calls.set(callId, call);
    return call;
  }

  // Simulate webhook event
  async sendWebhookEvent(event: any): Promise<void> {
    console.log('[Retell Mock] Webhook event:', event);
    // In a real implementation, this would POST to the webhook URL
  }
}

// Singleton instance
export const retellMock = new RetellMockService();

// Express-like handler for API routes
export function handleRetellMockRequest(req: NextRequest, pathname: string) {
  const method = req.method;
  const parts = pathname.replace('/api/retell/', '').split('/');

  if (parts[0] === 'agents') {
    if (method === 'GET' && parts.length === 1) {
      return retellMock.listAgents();
    }
    if (method === 'GET' && parts.length === 2) {
      return retellMock.getAgent(parts[1]);
    }
    if (method === 'POST' && parts.length === 1) {
      return req.json().then(data => retellMock.createAgent(data));
    }
    if (method === 'PUT' && parts.length === 2) {
      return req.json().then(data => retellMock.updateAgent(parts[1], data));
    }
    if (method === 'DELETE' && parts.length === 2) {
      return retellMock.deleteAgent(parts[1]);
    }
  }

  if (parts[0] === 'calls') {
    if (method === 'GET' && parts.length === 1) {
      return retellMock.listCalls();
    }
    if (method === 'GET' && parts.length === 2) {
      return retellMock.getCall(parts[1]);
    }
    if (method === 'POST' && parts.length === 1) {
      return req.json().then(data => retellMock.createCall(data));
    }
    if (method === 'POST' && parts.length === 3 && parts[2] === 'end') {
      return retellMock.endCall(parts[1]);
    }
  }

  return null;
}
