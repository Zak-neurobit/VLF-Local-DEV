'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { logger } from '@/lib/logger';

interface AgentStatus {
  name: string;
  status: 'active' | 'idle' | 'error';
  totalActions: number;
  successRate: number;
  lastActivity: string | null;
  recentHighlights: any[];
}

interface DashboardMetrics {
  agents: AgentStatus[];
  summary: {
    totalActions: number;
    averageSuccessRate: number;
    mostActive: string;
  };
}

export function SEODominationDashboard() {
  const [isRunning, setIsRunning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [executiveSummary, setExecutiveSummary] = useState<string>('');

  useEffect(() => {
    checkSystemStatus();
    const interval = setInterval(() => {
      if (isRunning) {
        fetchMetrics();
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [isRunning]);

  const checkSystemStatus = async () => {
    try {
      const response = await fetch('/api/seo-domination?action=status');
      const data = await response.json();
      setIsRunning(data.running);
      if (data.running) {
        await fetchMetrics();
      }
    } catch (error) {
      logger.error('Failed to check system status:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetrics = async () => {
    try {
      const [agentsResponse, summaryResponse] = await Promise.all([
        fetch('/api/seo-domination/agents'),
        fetch('/api/seo-domination?action=metrics'),
      ]);

      const agentsData = await agentsResponse.json();
      const summaryData = await summaryResponse.json();

      setMetrics(agentsData);
      setExecutiveSummary(summaryData.summary || '');
    } catch (error) {
      logger.error('Failed to fetch metrics:', error);
    }
  };

  const handleStartStop = async () => {
    setLoading(true);
    try {
      const action = isRunning ? 'stop' : 'start';
      const response = await fetch('/api/seo-domination', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();
      if (data.success) {
        setIsRunning(!isRunning);
        if (!isRunning) {
          // If starting, fetch metrics after a delay
          setTimeout(fetchMetrics, 3000);
        }
      }
    } catch (error) {
      logger.error('Failed to start/stop system:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerEmergencyResponse = async (situation: string) => {
    try {
      await fetch('/api/seo-domination', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'emergency', situation }),
      });
    } catch (error) {
      logger.error('Failed to trigger emergency response:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'idle':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getAgentIcon = (name: string) => {
    const icons: Record<string, string> = {
      BlogContentDominationAgent: '📝',
      GoogleMyBusinessKillerAgent: '📍',
      SocialMediaDestroyerAgent: '📱',
      ReviewHarvestingAgent: '⭐',
      CompetitorSpyAgent: '🕵️',
    };
    return icons[name] || '🤖';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading SEO Domination System...</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">🚀 SEO DOMINATION CONTROL CENTER 🔥</h1>
        <p className="text-lg text-gray-600">
          Autonomous SEO warfare system - Destroying competition 24/7
        </p>
      </div>

      {/* Control Panel */}
      <Card className="mb-8 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">System Control</h2>
            <p className={`text-lg ${isRunning ? 'text-green-500' : 'text-red-500'}`}>
              Status: {isRunning ? '🟢 ACTIVE - DOMINATING!' : '🔴 OFFLINE'}
            </p>
          </div>
          <Button
            onClick={handleStartStop}
            disabled={loading}
            className={`text-lg px-8 py-4 ${
              isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isRunning ? 'STOP DOMINATION' : 'START DOMINATION 🚀'}
          </Button>
        </div>

        {isRunning && (
          <div className="grid grid-cols-3 gap-4 mt-6">
            <Button
              onClick={() => triggerEmergencyResponse('ranking_drop')}
              className="bg-orange-600 hover:bg-orange-700"
            >
              🚨 Ranking Recovery
            </Button>
            <Button
              onClick={() => triggerEmergencyResponse('negative_review_spike')}
              className="bg-orange-600 hover:bg-orange-700"
            >
              🚨 Reputation Defense
            </Button>
            <Button
              onClick={() => triggerEmergencyResponse('competitor_attack')}
              className="bg-orange-600 hover:bg-orange-700"
            >
              🚨 Counter-Attack
            </Button>
          </div>
        )}
      </Card>

      {/* Agent Status Grid */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.agents.map(agent => (
            <Card key={agent.name} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="text-2xl">{getAgentIcon(agent.name)}</span>
                  {agent.name.replace('Agent', '')}
                </h3>
                <span className={`font-semibold ${getStatusColor(agent.status)}`}>
                  {agent.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Actions (24h):</span>
                  <span className="font-bold">{agent.totalActions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="font-bold">{(agent.successRate * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Activity:</span>
                  <span className="text-sm">
                    {agent.lastActivity
                      ? new Date(agent.lastActivity).toLocaleTimeString()
                      : 'Never'}
                  </span>
                </div>
              </div>

              {agent.recentHighlights.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold mb-2">Recent Actions:</h4>
                  <ul className="text-sm space-y-1">
                    {agent.recentHighlights.slice(0, 3).map((highlight, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>{highlight.type}</span>
                        <span className="text-xs text-gray-500">
                          (Impact: {highlight.impact}/10)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {metrics && (
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">📊 Domination Metrics</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500">
                {metrics.summary.totalActions}
              </div>
              <div className="text-lg">Total Actions (24h)</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500">
                {(metrics.summary.averageSuccessRate * 100).toFixed(1)}%
              </div>
              <div className="text-lg">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500">
                {getAgentIcon(metrics.summary.mostActive)}
              </div>
              <div className="text-lg">Most Active Agent</div>
              <div className="text-sm text-gray-600">
                {metrics.summary.mostActive?.replace('Agent', '')}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Executive Summary */}
      {executiveSummary && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">📋 Executive Summary</h2>
          <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded">
            {executiveSummary}
          </pre>
        </Card>
      )}

      {/* Live Activity Feed */}
      <Card className="mt-8 p-6">
        <h2 className="text-2xl font-bold mb-4">🔴 Live Activity Feed</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {/* This would show real-time activity */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-500">●</span>
            <span className="font-mono">12:34:56</span>
            <span>
              📝 BlogContentDomination: Created viral post targeting "immigration lawyer NC"
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-500">●</span>
            <span className="font-mono">12:33:45</span>
            <span>📍 GMBKiller: Posted 5-star review response</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-500">●</span>
            <span className="font-mono">12:32:30</span>
            <span>🕵️ CompetitorSpy: Detected competitor weakness - slow site speed</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
