'use client';

import React, { useState, useEffect } from 'react';
import { CompetitorActivity, CompetitiveAnalysis } from '@/lib/crewai/competitor-monitoring-system';

// Define competitor data interfaces
interface CompetitorData {
  id: string;
  name: string;
  website: string;
  practiceAreas: string[];
  trackingConfig?: {
    enabled: boolean;
  };
  _count?: {
    activities: number;
  };
  activities?: CompetitorActivity[];
}

interface CompetitorDashboardProps {
  className?: string;
}

// Helper functions for activity display
function getActivityIcon(activityType: string): string {
  const icons: Record<string, string> = {
    content_published: '📝',
    website_updated: '🌐',
    social_media: '📱',
    ranking_change: '📊',
    ad_campaign: '📢',
    new_review: '⭐',
    service_expansion: '🚀',
    default: '📌',
  };
  return icons[activityType] || icons.default;
}

function getActivityColor(activityType: string): string {
  const colors: Record<string, string> = {
    content_published: 'bg-blue-100 text-blue-800',
    website_updated: 'bg-green-100 text-green-800',
    social_media: 'bg-purple-100 text-purple-800',
    ranking_change: 'bg-yellow-100 text-yellow-800',
    ad_campaign: 'bg-red-100 text-red-800',
    new_review: 'bg-indigo-100 text-indigo-800',
    service_expansion: 'bg-pink-100 text-pink-800',
    default: 'bg-gray-100 text-gray-800',
  };
  return colors[activityType] || colors.default;
}

function getImpactBadge(impact: string): string {
  const badges: Record<string, string> = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
    default: 'bg-gray-100 text-gray-800',
  };
  return badges[impact] || badges.default;
}

export default function CompetitorDashboard({ className = '' }: CompetitorDashboardProps) {
  const [competitors, setCompetitors] = useState<CompetitorData[]>([]);
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorData | null>(null);
  const [activities, setActivities] = useState<CompetitorActivity[]>([]);
  const [analysis, setAnalysis] = useState<CompetitiveAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'analysis'>('overview');

  useEffect(() => {
    fetchCompetitors();
  }, []);

  const fetchCompetitors = async () => {
    try {
      const response = await fetch('/api/competitors');
      const data = await response.json();
      if (data.success) {
        setCompetitors(data.competitors);
      }
    } catch (error) {
      console.error('Failed to fetch competitors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCompetitorDetails = async (competitorId: string) => {
    try {
      const response = await fetch(`/api/competitors/${competitorId}`);
      const data = await response.json();
      if (data.success) {
        setSelectedCompetitor(data.competitor);
        setActivities(data.competitor.activities || []);
      }
    } catch (error) {
      console.error('Failed to fetch competitor details:', error);
    }
  };

  const triggerCompetitorCheck = async (competitorId: string) => {
    try {
      await fetch(`/api/competitors/${competitorId}/check`, {
        method: 'POST',
      });
      // Refresh competitor details after check
      await fetchCompetitorDetails(competitorId);
    } catch (error) {
      console.error('Failed to trigger competitor check:', error);
    }
  };

  const generateAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/competitors/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          period: 'monthly',
          competitorIds: competitors.map(c => c.id),
        }),
      });
      const data = await response.json();
      if (data.success) {
        setAnalysis(data.analysis);
        setActiveTab('analysis');
      }
    } catch (error) {
      console.error('Failed to generate analysis:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Helper functions for activity display could be added here if needed

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Competitor Monitoring</h2>
          <div className="flex space-x-3">
            <button
              onClick={generateAnalysis}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              {isAnalyzing ? 'Analyzing...' : 'Generate Analysis'}
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Competitor
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mt-6">
          {['overview', 'activities', 'analysis'].map(tab => (
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
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitors.map(competitor => (
              <CompetitorCard
                key={competitor.id}
                competitor={competitor}
                onSelect={() => {
                  fetchCompetitorDetails(competitor.id);
                  setActiveTab('activities');
                }}
                onCheck={() => triggerCompetitorCheck(competitor.id)}
              />
            ))}
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="space-y-4">
            {selectedCompetitor && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedCompetitor.name} - Recent Activities
                </h3>
                <p className="text-sm text-gray-600">{selectedCompetitor.website}</p>
              </div>
            )}

            {activities.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No activities recorded yet. Click {`"`}Check Now{`"`} to start monitoring.
              </div>
            ) : (
              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <ActivityCard key={index} activity={activity} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'analysis' && analysis && <CompetitiveAnalysisView analysis={analysis} />}
      </div>

      {/* Add Competitor Form Modal */}
      {showAddForm && (
        <AddCompetitorForm
          onClose={() => setShowAddForm(false)}
          onAdd={() => {
            fetchCompetitors();
            setShowAddForm(false);
          }}
        />
      )}
    </div>
  );
}

// Sub-components
interface CompetitorCardProps {
  competitor: CompetitorData;
  onSelect: () => void;
  onCheck: () => void;
}

function CompetitorCard({ competitor, onSelect, onCheck }: CompetitorCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-gray-900">{competitor.name}</h4>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            competitor.trackingConfig?.enabled
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {competitor.trackingConfig?.enabled ? 'Active' : 'Paused'}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-2">{competitor.website}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {competitor.practiceAreas?.slice(0, 3).map((area: string, index: number) => (
          <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
            {area}
          </span>
        ))}
        {competitor.practiceAreas?.length > 3 && (
          <span className="text-xs text-gray-500">+{competitor.practiceAreas.length - 3}</span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{competitor._count?.activities || 0} activities</span>
        <div className="flex space-x-2">
          <button
            onClick={e => {
              e.stopPropagation();
              onCheck();
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            Check Now
          </button>
          <button onClick={onSelect} className="text-gray-600 hover:text-gray-900">
            View →
          </button>
        </div>
      </div>
    </div>
  );
}

function ActivityCard({ activity }: { activity: CompetitorActivity }) {
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">{getActivityIcon(activity.activityType)}</span>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span
                className={`px-2 py-1 text-xs rounded-full ${getActivityColor(activity.activityType)}`}
              >
                {activity.activityType.replace('_', ' ')}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${getImpactBadge(activity.impact)}`}>
                {activity.impact} impact
              </span>
              {activity.requiresResponse && (
                <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                  Response needed
                </span>
              )}
            </div>

            {activity.details.title && (
              <h5 className="font-medium text-gray-900 mb-1">{activity.details.title}</h5>
            )}

            {activity.details.description && (
              <p className="text-sm text-gray-600 mb-2">{activity.details.description}</p>
            )}

            {activity.details.url && (
              <a
                href={activity.details.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                View source →
              </a>
            )}
          </div>
        </div>

        <span className="text-xs text-gray-500">
          {new Date(activity.timestamp).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

function CompetitiveAnalysisView({ analysis }: { analysis: CompetitiveAnalysis }) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Analysis Period: {analysis.period}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">Competitors Analyzed</h4>
            <p className="text-2xl font-bold text-gray-900">{analysis.competitors.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">Market Trends</h4>
            <p className="text-2xl font-bold text-gray-900">{analysis.marketTrends.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">Action Items</h4>
            <p className="text-2xl font-bold text-gray-900">{analysis.actionItems.length}</p>
          </div>
        </div>
      </div>

      {/* Competitor SWOT Analysis */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">Competitor Analysis</h4>
        {analysis.competitors.map(comp => (
          <div key={comp.competitorId} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h5 className="font-medium text-gray-900">{comp.name}</h5>
              <span className="text-sm font-semibold text-blue-600">
                Score: {comp.overallScore}/100
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <h6 className="text-xs font-medium text-green-700 mb-1">Strengths</h6>
                <ul className="text-xs text-gray-600 space-y-1">
                  {comp.strengths.slice(0, 3).map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h6 className="text-xs font-medium text-red-700 mb-1">Weaknesses</h6>
                <ul className="text-xs text-gray-600 space-y-1">
                  {comp.weaknesses.slice(0, 3).map((w, i) => (
                    <li key={i}>• {w}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h6 className="text-xs font-medium text-blue-700 mb-1">Opportunities</h6>
                <ul className="text-xs text-gray-600 space-y-1">
                  {comp.opportunities.slice(0, 3).map((o, i) => (
                    <li key={i}>• {o}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h6 className="text-xs font-medium text-yellow-700 mb-1">Threats</h6>
                <ul className="text-xs text-gray-600 space-y-1">
                  {comp.threats.slice(0, 3).map((t, i) => (
                    <li key={i}>• {t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Items */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">Recommended Actions</h4>
        <div className="space-y-2">
          {analysis.actionItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between border rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    item.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : item.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                  }`}
                >
                  {item.priority}
                </span>
                <span className="text-sm text-gray-900">{item.action}</span>
              </div>
              <span className="text-xs text-gray-500">Due: {item.deadline}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface AddCompetitorFormProps {
  onClose: () => void;
  onAdd: () => void;
}

interface CompetitorFormData {
  name: string;
  website: string;
  practiceAreas: string[];
  locations: string[];
}

function AddCompetitorForm({ onClose, onAdd }: AddCompetitorFormProps) {
  const [formData, setFormData] = useState<CompetitorFormData>({
    name: '',
    website: '',
    practiceAreas: [],
    locations: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/competitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onAdd();
      }
    } catch (error) {
      console.error('Failed to add competitor:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Competitor</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Competitor Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website URL *</label>
            <input
              type="url"
              required
              value={formData.website}
              onChange={e => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Practice Areas</label>
            <select
              multiple
              value={formData.practiceAreas}
              onChange={e => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                setFormData({ ...formData, practiceAreas: selected });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="immigration">Immigration</option>
              <option value="personal_injury">Personal Injury</option>
              <option value="workers_compensation">Workers Compensation</option>
              <option value="family_law">Family Law</option>
              <option value="criminal_defense">Criminal Defense</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Locations</label>
            <input
              type="text"
              value={formData.locations.join(', ')}
              onChange={e =>
                setFormData({
                  ...formData,
                  locations: e.target.value
                    .split(',')
                    .map(l => l.trim())
                    .filter(Boolean),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Charlotte, Raleigh, Durham"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Competitor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
