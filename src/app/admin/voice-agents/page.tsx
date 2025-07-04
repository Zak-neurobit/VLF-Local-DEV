'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import { Loader2, Phone, Mic, Check, X } from 'lucide-react';

interface VoiceAgent {
  key: string;
  config: {
    agent_name: string;
    language: string;
    voice_id: string;
    prompt: string;
  };
}

interface RetellAgent {
  agent_id: string;
  agent_name: string;
  voice_id: string;
  language: string;
  created_at: string;
}

export default function VoiceAgentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState<RetellAgent[]>([]);
  const [localConfigs, setLocalConfigs] = useState<VoiceAgent[]>([]);
  const [phoneNumbers, setPhoneNumbers] = useState<any[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated' || (session && session.user.role !== 'ADMIN')) {
      router.push('/');
    }
  }, [session, status, router]);

  useEffect(() => {
    fetchAgents();
    fetchPhoneNumbers();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/retell/agents');
      const data = await response.json();
      setAgents(data.retellAgents || []);
      setLocalConfigs(data.localConfigs || []);
    } catch (error) {
      console.error('Failed to fetch agents:', error);
      toast.error('Failed to fetch voice agents');
    }
  };

  const fetchPhoneNumbers = async () => {
    try {
      const response = await fetch('/api/retell/phone-numbers');
      const data = await response.json();
      setPhoneNumbers(data.phoneNumbers || []);
    } catch (error) {
      console.error('Failed to fetch phone numbers:', error);
    }
  };

  const createAgent = async (agentType: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/retell/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', agentType }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`${agentType} agent created successfully`);
        fetchAgents();
      } else {
        throw new Error(data.error || 'Failed to create agent');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create agent');
    } finally {
      setLoading(false);
    }
  };

  const createAllAgents = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/retell/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create-all' }),
      });

      const data = await response.json();

      toast.success(`Created ${data.successful} agents, ${data.failed} failed`);

      fetchAgents();
    } catch (error) {
      toast.error('Failed to create agents');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Voice Agent Management</h1>
        <p className="text-muted-foreground">
          Manage Retell AI voice agents integrated with GoHighLevel
        </p>
      </div>

      <div className="grid gap-6">
        {/* API Status */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${agents.length > 0 ? 'bg-green-500' : 'bg-red-500'}`}
              />
              <span>Retell API: {agents.length > 0 ? 'Connected' : 'Not Connected'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${phoneNumbers.length > 0 ? 'bg-green-500' : 'bg-yellow-500'}`}
              />
              <span>Phone Numbers: {phoneNumbers.length} configured</span>
            </div>
          </div>
        </Card>

        {/* Agent Deployment */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Agent Deployment</h2>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Deploy all configured voice agents to Retell AI
            </p>
            <Button onClick={createAllAgents} disabled={loading} className="w-full sm:w-auto">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Deploy All Agents
            </Button>
          </div>
        </Card>

        {/* Local Agent Configurations */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Configured Agents</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {localConfigs.map(agent => {
              const isDeployed = agents.some(a =>
                a.agent_name.toLowerCase().includes(agent.key.toLowerCase())
              );

              return (
                <div key={agent.key} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{agent.config.agent_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {agent.config.language} • {agent.config.voice_id}
                      </p>
                    </div>
                    {isDeployed ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {agent.config.prompt.substring(0, 100)}...
                  </p>
                  {!isDeployed && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => createAgent(agent.key)}
                      disabled={loading}
                      className="w-full"
                    >
                      <Mic className="mr-2 h-4 w-4" />
                      Deploy Agent
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Deployed Agents */}
        {agents.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Deployed Agents</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Agent Name</th>
                    <th className="text-left py-2">Language</th>
                    <th className="text-left py-2">Voice</th>
                    <th className="text-left py-2">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map(agent => (
                    <tr key={agent.agent_id} className="border-b">
                      <td className="py-2">{agent.agent_name}</td>
                      <td className="py-2">{agent.language}</td>
                      <td className="py-2">{agent.voice_id}</td>
                      <td className="py-2">{new Date(agent.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Phone Numbers */}
        {phoneNumbers.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Phone Numbers</h2>
            <div className="space-y-2">
              {phoneNumbers.map(phone => (
                <div key={phone.phone_number} className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{phone.phone_number}</span>
                  {phone.agent_id && (
                    <span className="text-sm text-muted-foreground">→ {phone.agent_id}</span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
