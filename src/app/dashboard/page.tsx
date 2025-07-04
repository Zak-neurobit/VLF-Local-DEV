'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { performanceMonitor } from '@/lib/monitoring/performance';

interface DashboardMetrics {
  activeChats: number;
  activeCalls: number;
  todaysCalls: number;
  avgCallDuration: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topIssues: Array<{ issue: string; count: number }>;
  agentPerformance: Array<{
    agentId: string;
    callsHandled: number;
    avgDuration: number;
    satisfaction: number;
  }>;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    performanceMonitor.start('dashboard-load');
    fetchMetrics();

    // Set up real-time updates
    const interval = setInterval(fetchMetrics, 30000); // Update every 30 seconds

    return () => {
      clearInterval(interval);
      performanceMonitor.end('dashboard-load');
    };
  }, [timeRange]);

  const fetchMetrics = async () => {
    try {
      const response = await fetch(`/api/dashboard/metrics?range=${timeRange}`);
      const data = await response.json();
      setMetrics(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="text-gray-600 mt-2">Real-time monitoring and analytics</p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6 flex gap-2">
          {(['today', 'week', 'month'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg capitalize ${
                timeRange === range
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Active Chats"
            value={metrics?.activeChats || 0}
            icon="💬"
            color="blue"
            trend={+12}
          />
          <MetricCard
            title="Active Calls"
            value={metrics?.activeCalls || 0}
            icon="📞"
            color="green"
            trend={+5}
          />
          <MetricCard
            title="Today's Calls"
            value={metrics?.todaysCalls || 0}
            icon="📊"
            color="purple"
            trend={+8}
          />
          <MetricCard
            title="Avg Call Duration"
            value={Math.round(metrics?.avgCallDuration || 0)}
            icon="⏱️"
            color="orange"
            trend={-2}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sentiment Analysis */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Call Sentiment</h3>
            <SentimentChart data={metrics?.sentimentBreakdown} />
          </div>

          {/* Top Issues */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Top Issues</h3>
            <div className="space-y-3">
              {metrics?.topIssues.map((issue, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700">{issue.issue}</span>
                  <span className="font-semibold">{issue.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Performance */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Agent Performance</h3>
            <div className="space-y-3">
              {metrics?.agentPerformance.map((agent, index) => (
                <div key={index} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Agent {agent.agentId.slice(-4)}</span>
                    <span className="text-sm text-gray-600">{agent.callsHandled} calls</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-500">Avg: {agent.avgDuration}m</span>
                    <span className="text-sm font-medium text-green-600">
                      {agent.satisfaction}% satisfaction
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Conversations */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Active Conversations</h3>
          <ActiveConversations />
        </div>
      </div>
    </div>
  );
}

// Component implementations...
function MetricCard({
  title,
  value,
  icon,
  color: _color,
  trend,
}: {
  title: string;
  value: number;
  icon: string;
  color: string;
  trend: number;
}) {
  // const colorClasses = {
  //   blue: 'bg-blue-100 text-blue-800',
  //   green: 'bg-green-100 text-green-800',
  //   purple: 'bg-purple-100 text-purple-800',
  //   orange: 'bg-orange-100 text-orange-800',
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow p-6"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}
            {trend}%
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </motion.div>
  );
}

function SentimentChart({
  data,
}: {
  data?: { positive: number; neutral: number; negative: number };
}) {
  if (!data) return null;

  const total = data.positive + data.neutral + data.negative;

  return (
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Positive</span>
          <span>{Math.round((data.positive / total) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${(data.positive / total) * 100}%` }}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Neutral</span>
          <span>{Math.round((data.neutral / total) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-yellow-500 h-3 rounded-full"
            style={{ width: `${(data.neutral / total) * 100}%` }}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Negative</span>
          <span>{Math.round((data.negative / total) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-red-500 h-3 rounded-full"
            style={{ width: `${(data.negative / total) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function ActiveConversations() {
  // This would fetch real data
  const conversations = [
    { id: 1, type: 'chat', user: 'Anonymous', topic: 'Immigration question', duration: '5m' },
    { id: 2, type: 'voice', user: '+1234567890', topic: 'Personal injury', duration: '12m' },
    { id: 3, type: 'chat', user: 'John D.', topic: 'Case update', duration: '3m' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Type</th>
            <th className="text-left py-2">User</th>
            <th className="text-left py-2">Topic</th>
            <th className="text-left py-2">Duration</th>
            <th className="text-left py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {conversations.map(conv => (
            <tr key={conv.id} className="border-b hover:bg-gray-50">
              <td className="py-3">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    conv.type === 'chat'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {conv.type === 'chat' ? '💬' : '📞'} {conv.type}
                </span>
              </td>
              <td className="py-3">{conv.user}</td>
              <td className="py-3">{conv.topic}</td>
              <td className="py-3">{conv.duration}</td>
              <td className="py-3">
                <button className="text-primary hover:underline text-sm">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
