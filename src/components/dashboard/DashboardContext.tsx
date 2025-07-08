'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSocket } from '@/hooks/useSocket';

interface AgentActivity {
  id: string;
  name: string;
  task: string;
  status: 'idle' | 'working' | 'completed' | 'error';
  progress: number;
  lastActivity: Date;
  performance: {
    success: number;
    errors: number;
    efficiency: number;
  };
}

interface LiveMetrics {
  visitorCount: number;
  conversationsActive: number;
  reviewsToday: number;
  contentCreated: number;
  rankingChanges: number;
  socialEngagement: number;
  leadGeneration: number;
  conversionRate: number;
}

interface DashboardData {
  agents: AgentActivity[];
  metrics: LiveMetrics;
  recentActivity: Array<{
    id: string;
    type: 'content' | 'review' | 'lead' | 'call' | 'social';
    message: string;
    timestamp: Date;
    success: boolean;
  }>;
  systemHealth: {
    uptime: number;
    performance: number;
    errors: number;
    lastUpdate: Date;
  };
}

interface DashboardContextType {
  data: DashboardData;
  isConnected: boolean;
  refreshData: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { socket, isConnected } = useSocket();
  const [data, setData] = useState<DashboardData>({
    agents: [],
    metrics: {
      visitorCount: 0,
      conversationsActive: 0,
      reviewsToday: 0,
      contentCreated: 0,
      rankingChanges: 0,
      socialEngagement: 0,
      leadGeneration: 0,
      conversionRate: 0
    },
    recentActivity: [],
    systemHealth: {
      uptime: 0,
      performance: 0,
      errors: 0,
      lastUpdate: new Date()
    }
  });

  useEffect(() => {
    if (!socket) return;

    // Listen for real-time updates
    socket.on('dashboard:update', (newData: Partial<DashboardData>) => {
      setData(prev => ({ ...prev, ...newData }));
    });

    socket.on('agent:activity', (activity: AgentActivity) => {
      setData(prev => ({
        ...prev,
        agents: prev.agents.map(agent => 
          agent.id === activity.id ? activity : agent
        )
      }));
    });

    socket.on('metrics:update', (metrics: LiveMetrics) => {
      setData(prev => ({ ...prev, metrics }));
    });

    socket.on('activity:new', (activity: DashboardData['recentActivity'][0]) => {
      setData(prev => ({
        ...prev,
        recentActivity: [activity, ...prev.recentActivity.slice(0, 49)]
      }));
    });

    // Request initial data
    socket.emit('dashboard:subscribe');

    return () => {
      socket.off('dashboard:update');
      socket.off('agent:activity');
      socket.off('metrics:update');
      socket.off('activity:new');
      socket.emit('dashboard:unsubscribe');
    };
  }, [socket]);

  const refreshData = () => {
    if (socket) {
      socket.emit('dashboard:refresh');
    }
  };

  return (
    <DashboardContext.Provider value={{ data, isConnected, refreshData }}>
      {children}
    </DashboardContext.Provider>
  );
};