'use client';

import React, { useState, useEffect } from 'react';
// Removed chart imports - need to install react-chartjs-2
// Removed chart.js imports - need to install chart.js

// Register ChartJS components
// Chart.js registration disabled - need to install dependencies
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

interface VoiceAgentDashboardProps {
  className?: string;
}

export default function VoiceAgentDashboard({ className = '' }: VoiceAgentDashboardProps) {
  const [analytics, setAnalytics] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'quality' | 'insights' | 'recommendations'
  >('overview');

  useEffect(() => {
    fetchAnalytics();
  }, [selectedPeriod, selectedAgent]);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        period: selectedPeriod,
        ...(selectedAgent !== 'all' && { agentId: selectedAgent }),
      });

      const response = await fetch(`/api/voice/analytics?${params}`);
      const data = await response.json();

      if (data.success) {
        setAnalytics(data.analytics);
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error('Failed to fetch voice analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className={`text-center p-8 ${className}`}>
        <p className="text-gray-500">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Voice Agent Analytics</h2>
          <div className="flex space-x-3">
            <select
              value={selectedPeriod}
              onChange={e => setSelectedPeriod(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <select
              value={selectedAgent}
              onChange={e => setSelectedAgent(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Agents</option>
              {analytics.agentMetrics?.map((agent: any) => (
                <option key={agent.agentId} value={agent.agentId}>
                  {agent.agentName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1">
          {['overview', 'quality', 'insights', 'recommendations'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-t-lg capitalize ${
                activeTab === tab
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && <OverviewTab analytics={analytics} />}
        {activeTab === 'quality' && <QualityTab analytics={analytics} />}
        {activeTab === 'insights' && <InsightsTab analytics={analytics} />}
        {activeTab === 'recommendations' && (
          <RecommendationsTab recommendations={recommendations} />
        )}
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ analytics }: { analytics: any }) {
  const callVolumeData = {
    labels: analytics.callVolumeByHour.map((h: any) => `${h.hour}:00`),
    datasets: [
      {
        label: 'Call Volume',
        data: analytics.callVolumeByHour.map((h: any) => h.count),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const emotionalDistributionData = {
    labels: ['Calm', 'Anxious', 'Frustrated', 'Urgent', 'Confused'],
    datasets: [
      {
        data: [
          analytics.emotionalDistribution.calm,
          analytics.emotionalDistribution.anxious,
          analytics.emotionalDistribution.frustrated,
          analytics.emotionalDistribution.urgent,
          analytics.emotionalDistribution.confused,
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.5)',
          'rgba(251, 191, 36, 0.5)',
          'rgba(239, 68, 68, 0.5)',
          'rgba(236, 72, 153, 0.5)',
          'rgba(147, 51, 234, 0.5)',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Calls"
          value={analytics.totalCalls}
          change="+12%"
          positive={true}
        />
        <MetricCard
          title="Avg Duration"
          value={`${Math.round(analytics.averageCallDuration / 60)}m`}
          subtitle={`${Math.round(analytics.averageCallDuration)}s`}
        />
        <MetricCard
          title="Abandonment Rate"
          value={`${analytics.abandonmentRate.toFixed(1)}%`}
          change="-2%"
          positive={true}
        />
        <MetricCard
          title="Satisfaction Score"
          value={`${analytics.averageSatisfactionScore.toFixed(1)}/5`}
          change="+0.3"
          positive={true}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Volume by Hour</h3>
          {/* Chart disabled - need to install react-chartjs-2 */}
          <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded">
            <span className="text-gray-500">Chart visualization available after setup</span>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Caller Emotional States</h3>
          {/* Chart disabled - need to install react-chartjs-2 */}
          <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded">
            <span className="text-gray-500">Chart visualization available after setup</span>
          </div>
        </div>
      </div>

      {/* Agent Performance */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Calls
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Quality
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resolution Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analytics.agentMetrics.map((agent: any) => (
                <tr key={agent.agentId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {agent.agentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {agent.totalCalls}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span>{agent.averageQuality.toFixed(1)}%</span>
                      <QualityIndicator score={agent.averageQuality} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {agent.resolutionRate.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Quality Tab Component
function QualityTab({ analytics }: { analytics: any }) {
  const performanceTrendData = {
    labels: analytics.performanceTrend
      .slice(-7)
      .map((t: any) =>
        new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      ),
    datasets: [
      {
        label: 'Quality Score',
        data: analytics.performanceTrend.slice(-7).map((t: any) => t.quality),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Interaction Quality"
          value={`${analytics.averageInteractionQuality.toFixed(1)}%`}
          icon="🎯"
        />
        <MetricCard
          title="Clarity Score"
          value={`${analytics.averageClarityScore.toFixed(1)}%`}
          icon="💬"
        />
        <MetricCard
          title="Completion Rate"
          value={`${analytics.averageCompletionRate.toFixed(1)}%`}
          icon="✅"
        />
        <MetricCard title="Response Time" value={`${analytics.averageResponseTime}ms`} icon="⚡" />
      </div>

      {/* Performance Trend */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">7-Day Quality Trend</h3>
        {/* Chart disabled - need to install react-chartjs-2 */}
        <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded">
          <span className="text-gray-500">Chart visualization available after setup</span>
        </div>
      </div>

      {/* Top Issues */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Issues</h3>
        <div className="space-y-4">
          {analytics.commonIssues.map((issue: any, index: number) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{issue.issue}</p>
                <p className="text-sm text-gray-500">Frequency: {issue.frequency} calls</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {issue.resolutionRate}% resolved
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Insights Tab Component
function InsightsTab({ analytics }: { analytics: any }) {
  return (
    <div className="space-y-6">
      {/* Top Intents */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Call Intents</h3>
        <div className="space-y-3">
          {analytics.topIntents.map((intent: any, index: number) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getIntentIcon(intent.intent)}</span>
                <div>
                  <p className="font-medium text-gray-900 capitalize">{intent.intent}</p>
                  <p className="text-sm text-gray-500">{intent.count} calls</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  {intent.percentage.toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call Volume Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Busiest Hours</h3>
          <div className="space-y-2">
            {analytics.callVolumeByHour
              .sort((a: any, b: any) => b.count - a.count)
              .slice(0, 5)
              .map((hour: any) => (
                <div key={hour.hour} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {hour.hour}:00 - {hour.hour + 1}:00
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(hour.count / Math.max(...analytics.callVolumeByHour.map((h: any) => h.count))) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{hour.count}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Volume by Day</h3>
          <div className="space-y-2">
            {analytics.callVolumeByDay.map((day: any) => (
              <div key={day.day} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{day.day}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${(day.count / Math.max(...analytics.callVolumeByDay.map((d: any) => d.count))) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{day.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Insights Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Key Insights</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Peak call volume occurs between {findPeakHour(analytics.callVolumeByHour)}:00</li>
          <li>
            • {analytics.emotionalDistribution.anxious.toFixed(0)}% of callers show signs of anxiety
          </li>
          <li>
            • Average call resolution takes {Math.round(analytics.averageCallDuration / 60)} minutes
          </li>
          <li>
            • {analytics.topIntents[0]?.intent} is the most common call reason at{' '}
            {analytics.topIntents[0]?.percentage.toFixed(0)}%
          </li>
        </ul>
      </div>
    </div>
  );
}

// Recommendations Tab Component
function RecommendationsTab({ recommendations }: { recommendations: any }) {
  if (!recommendations) {
    return <div className="text-center py-8 text-gray-500">No recommendations available</div>;
  }

  return (
    <div className="space-y-6">
      {/* System Recommendations */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Improvements</h3>
        <div className="space-y-4">
          {recommendations.systemRecommendations.map((rec: any, index: number) => (
            <RecommendationCard key={index} recommendation={rec} />
          ))}
        </div>
      </div>

      {/* Agent-Specific Recommendations */}
      {recommendations.agentRecommendations.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Agent Training Recommendations
          </h3>
          <div className="space-y-4">
            {recommendations.agentRecommendations.map((agent: any) => (
              <div key={agent.agentId} className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900 mb-2">Agent {agent.agentId}</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {agent.recommendations.map((rec: string, index: number) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
                {agent.trainingNeeded.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-gray-500">Recommended Training:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {agent.trainingNeeded.map((training: string, index: number) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                        >
                          {training}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conversation Patterns */}
      {recommendations.conversationPatterns.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Conversation Pattern Insights
          </h3>
          <div className="space-y-3">
            {recommendations.conversationPatterns.map((pattern: any, index: number) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="text-2xl">💡</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{pattern.pattern}</p>
                  <p className="text-sm text-gray-600 mt-1">{pattern.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function MetricCard({ title, value, subtitle, change, positive, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <div className="flex items-baseline">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="ml-2 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {change && (
        <p className={`text-sm mt-1 ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change} from last period
        </p>
      )}
    </div>
  );
}

function QualityIndicator({ score }: { score: number }) {
  const color = score >= 90 ? 'text-green-500' : score >= 70 ? 'text-yellow-500' : 'text-red-500';
  return <span className={`ml-2 ${color}`}>●</span>;
}

function RecommendationCard({ recommendation }: { recommendation: any }) {
  const impactColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  };

  const effortColors = {
    high: 'bg-purple-100 text-purple-700',
    medium: 'bg-blue-100 text-blue-700',
    low: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900">{recommendation.recommendation}</h4>
        <div className="flex space-x-2">
          <span
            className={`text-xs px-2 py-1 rounded ${impactColors[recommendation.impact as keyof typeof impactColors]}`}
          >
            {recommendation.impact} impact
          </span>
          <span
            className={`text-xs px-2 py-1 rounded ${effortColors[recommendation.effort as keyof typeof effortColors]}`}
          >
            {recommendation.effort} effort
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-600">
        <p>
          {recommendation.metric}: {recommendation.currentValue} → {recommendation.targetValue}
        </p>
      </div>
    </div>
  );
}

// Helper functions
function getIntentIcon(intent: string): string {
  const icons: Record<string, string> = {
    immigration: '🗽',
    personal_injury: '🚗',
    workers_compensation: '👷',
    family_law: '👨‍👩‍👧',
    criminal_defense: '⚖️',
    unknown: '❓',
  };
  return icons[intent] || '📞';
}

function findPeakHour(hourData: any[]): string {
  const peak = hourData.reduce((max, curr) => (curr.count > max.count ? curr : max));
  return `${peak.hour}:00 - ${peak.hour + 1}:00`;
}
