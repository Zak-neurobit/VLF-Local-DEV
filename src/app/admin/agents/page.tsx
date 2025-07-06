'use client';

import { useState, useEffect } from 'react';
import { Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface AgentStatus {
  name: string;
  status: 'active' | 'inactive' | 'error';
  lastCheck: string;
  itemsProcessed: number;
}

export default function AgentsDashboard() {
  const [agents, setAgents] = useState<AgentStatus[]>([
    {
      name: 'Competition Monitor',
      status: 'active',
      lastCheck: new Date().toISOString(),
      itemsProcessed: 0,
    },
    {
      name: 'Federal Register Listener',
      status: 'active',
      lastCheck: new Date().toISOString(),
      itemsProcessed: 0,
    },
    {
      name: 'Court Listener',
      status: 'active',
      lastCheck: new Date().toISOString(),
      itemsProcessed: 0,
    },
    {
      name: 'Legal Update Auto-Blogger',
      status: 'active',
      lastCheck: new Date().toISOString(),
      itemsProcessed: 0,
    },
    {
      name: 'Social Media Automation',
      status: 'active',
      lastCheck: new Date().toISOString(),
      itemsProcessed: 0,
    },
  ]);

  useEffect(() => {
    // Update agent status every 30 seconds
    const interval = setInterval(async () => {
      // In production, fetch real status from API
      setAgents(prev =>
        prev.map(agent => ({
          ...agent,
          lastCheck: new Date().toISOString(),
          itemsProcessed: agent.itemsProcessed + Math.floor(Math.random() * 5),
        }))
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Agents Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map(agent => (
            <div key={agent.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{agent.name}</h2>
                {agent.status === 'active' ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : agent.status === &apos;error&apos; ? (
                  <AlertCircle className="w-6 h-6 text-red-500" />
                ) : (
                  <Clock className="w-6 h-6 text-gray-400" />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span
                    className={`font-medium ${
                      agent.status === 'active'
                        ? 'text-green-600'
                        : agent.status === 'error'
                          ? 'text-red-600'
                          : 'text-gray-600'
                    }`}
                  >
                    {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last Check</span>
                  <span className="text-gray-900">
                    {new Date(agent.lastCheck).toLocaleTimeString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Items Processed</span>
                  <span className="text-gray-900 font-medium">{agent.itemsProcessed}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center">
                  <Activity className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-xs text-gray-500">
                    Running since {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">System Status</h3>
          <p className="text-sm text-blue-700">
            All agents are actively monitoring and creating content. The system is automatically:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-blue-700">
            <li>• Analyzing competitor content and repurposing in Vasquez voice</li>
            <li>• Monitoring federal law changes and creating blog posts</li>
            <li>• Tracking court decisions relevant to our practice areas</li>
            <li>• Generating SEO-optimized content from legal updates</li>
            <li>• Posting to all social media platforms hourly</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
