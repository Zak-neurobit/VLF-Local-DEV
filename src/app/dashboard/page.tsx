'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const DashboardProvider = dynamic(
  () => import('@/components/dashboard/DashboardContext').then(mod => mod.DashboardProvider),
  { ssr: false }
);

const ActivityMonitor = dynamic(() => import('@/components/dashboard/ActivityMonitor'), {
  ssr: false,
});

const LivingMetrics = dynamic(() => import('@/components/dashboard/LivingMetrics'), {
  ssr: false,
});

const AgentStatusPanel = dynamic(() => import('@/components/dashboard/AgentStatusPanel'), {
  ssr: false,
});

const DynamicHomepage = dynamic(() => import('@/components/dashboard/DynamicHomepage'), {
  ssr: false,
});

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'metrics', label: 'Live Metrics', icon: '📈' },
    { id: 'agents', label: 'Agent Status', icon: '🤖' },
    { id: 'activity', label: 'Activity Feed', icon: '🔥' },
    { id: 'homepage', label: 'Dynamic Homepage', icon: '🏠' }
  ];

  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">VLF Live Dashboard</h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">System Active</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  {new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <LivingMetrics />
                  </div>
                  <div>
                    <ActivityMonitor />
                  </div>
                </div>
                <AgentStatusPanel />
              </div>
            )}

            {activeTab === 'metrics' && (
              <LivingMetrics />
            )}

            {activeTab === 'agents' && (
              <AgentStatusPanel />
            )}

            {activeTab === 'activity' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ActivityMonitor />
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">System Performance</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Uptime</span>
                      <span className="text-green-600 font-semibold">99.9%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Response Time</span>
                      <span className="text-blue-600 font-semibold">&lt; 100ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Error Rate</span>
                      <span className="text-red-600 font-semibold">&lt; 0.1%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'homepage' && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <DynamicHomepage language="en" />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;