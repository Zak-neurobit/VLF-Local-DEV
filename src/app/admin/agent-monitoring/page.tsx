'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  AlertCircle, 
  MessageSquare, 
  Phone, 
  FileText, 
  Brain,
  Users,
  Zap,
  RefreshCw,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface AgentData {
  id: string;
  name: string;
  type: 'chat' | 'voice' | 'crewai' | 'document';
  status: 'online' | 'offline' | 'busy' | 'error';
  activeSessions: number;
  queueLength: number;
  averageWaitTime: number;
  lastActivity: string;
  performance: {
    responseTime: number;
    successRate: number;
    satisfactionScore: number;
  };
}

interface SystemMetrics {
  totalActiveAgents: number;
  totalSessions: number;
  totalMessages: number;
  systemLoad: number;
  memoryUsage: number;
  uptime: number;
  alerts: Array<{
    level: 'info' | 'warning' | 'error' | 'critical';
    message: string;
    timestamp: string;
    agentId?: string;
  }>;
}

const AgentIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'chat':
      return <MessageSquare className="w-5 h-5" />;
    case &apos;voice&apos;:
      return <Phone className="w-5 h-5" />;
    case &apos;document&apos;:
      return <FileText className="w-5 h-5" />;
    case &apos;crewai&apos;:
      return <Brain className="w-5 h-5" />;
    default:
      return <Activity className="w-5 h-5" />;
  }
};

const StatusIndicator = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${colors[status] || colors.offline} animate-pulse`} />
      <span className="text-sm capitalize">{status}</span>
    </div>
  );
};

export default function AgentMonitoringDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    fetchMonitoringData();
    
    if (autoRefresh) {
      const interval = setInterval(fetchMonitoringData, 5000); // Refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [session, status, autoRefresh, router]);

  const fetchMonitoringData = async () => {
    try {
      const response = await fetch('/api/agents/monitor');
      if (!response.ok) throw new Error('Failed to fetch monitoring data');
      
      const data = await response.json();
      setAgents(data.agents || []);
      setMetrics(data.metrics || null);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching monitoring data:', error);
      setLoading(false);
    }
  };

  const handleAgentAction = async (agentId: string, action: string) => {
    try {
      const response = await fetch('/api/agents/monitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId, action }),
      });

      if (!response.ok) throw new Error('Failed to perform action');
      
      fetchMonitoringData();
    } catch (error) {
      console.error('Error performing agent action:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">AI Agent Command Center</h1>
            <p className="text-gray-400">Real-time monitoring and control of all AI agents</p>
          </div>
          <div className="flex gap-4">
            <Button
              variant={autoRefresh ? 'primary' : 'outline'}
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              Auto Refresh
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/admin/agents')}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Configure
            </Button>
          </div>
        </div>

        {/* System Overview */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-400 text-sm">Active Agents</p>
                      <p className="text-3xl font-bold text-white mt-1">{metrics.totalActiveAgents}</p>
                    </div>
                    <Brain className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-400 text-sm">Active Sessions</p>
                      <p className="text-3xl font-bold text-white mt-1">{metrics.totalSessions}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-400 text-sm">Messages (1h)</p>
                      <p className="text-3xl font-bold text-white mt-1">{metrics.totalMessages}</p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-400 text-sm">System Load</p>
                      <p className="text-3xl font-bold text-white mt-1">{metrics.systemLoad.toFixed(1)}%</p>
                    </div>
                    <Zap className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Alerts */}
        {metrics?.alerts && metrics.alerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">System Alerts</h2>
            <div className="space-y-2">
              {metrics.alerts.map((alert, index) => (
                <Alert key={index} className={`
                  ${alert.level === 'error' ? 'border-red-500 bg-red-500/10' : ''}
                  ${alert.level === 'warning' ? 'border-yellow-500 bg-yellow-500/10' : ''}
                  ${alert.level === 'info' ? 'border-blue-500 bg-blue-500/10' : ''}
                  ${alert.level === 'critical' ? 'border-red-600 bg-red-600/20 animate-pulse' : ''}
                `}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-white">
                    {alert.message}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Agent Grid */}
        <h2 className="text-2xl font-bold text-white mb-4">Agent Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedAgent(agent.id)}
                className="cursor-pointer"
              >
                <Card className={`
                  bg-slate-800/50 border-slate-700 
                  ${selectedAgent === agent.id ? 'ring-2 ring-blue-500' : ''}
                  ${agent.status === 'error' ? 'border-red-500' : ''}
                `}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <AgentIcon type={agent.type} />
                        <div>
                          <CardTitle className="text-white text-lg">{agent.name}</CardTitle>
                          <p className="text-gray-400 text-sm">{agent.type}</p>
                        </div>
                      </div>
                      <StatusIndicator status={agent.status} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Active Sessions</span>
                        <span className="text-white font-semibold">{agent.activeSessions}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Queue Length</span>
                        <span className="text-white font-semibold">{agent.queueLength}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Avg Wait Time</span>
                        <span className="text-white font-semibold">{agent.averageWaitTime}s</span>
                      </div>
                      
                      {/* Performance Metrics */}
                      <div className="pt-3 border-t border-slate-700">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-xs">Response Time</span>
                            <span className="text-white text-sm">{agent.performance.responseTime}ms</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-xs">Success Rate</span>
                            <span className="text-white text-sm">{(agent.performance.successRate * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-xs">Satisfaction</span>
                            <span className="text-white text-sm">⭐ {agent.performance.satisfactionScore.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {agent.status !== 'offline' && (
                        <div className="pt-3 flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAgentAction(agent.id, 'restart');
                            }}
                          >
                            Restart
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAgentAction(agent.id, agent.status === 'busy' ? 'pause' : 'resume');
                            }}
                          >
                            {agent.status === 'busy' ? 'Pause' : 'Resume'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}