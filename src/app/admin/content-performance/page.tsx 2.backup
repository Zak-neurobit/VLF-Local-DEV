'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface PerformanceMetrics {
  contentId: string;
  title: string;
  type: string;
  publishedAt: string;
  viewsFirstHour: number;
  viewsFirstDay: number;
  totalViews: number;
  engagementRate: number;
  conversionRate: number;
  searchPosition?: number;
  hasRichSnippet?: boolean;
  seoScore?: number;
}

export default function ContentPerformanceDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7days');

  const fetchPerformanceData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/content-factory/performance?range=${dateRange}`);
      const data = await response.json();
      
      if (data.success) {
        setMetrics(data.metrics);
      }
    } catch (err) {
      console.error('Failed to fetch performance data:', err);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || !['ADMIN', 'ATTORNEY'].includes(session.user.role)) {
      router.push('/');
    } else {
      fetchPerformanceData();
    }
  }, [session, status, router, fetchPerformanceData]);

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!session || !['ADMIN', 'ATTORNEY'].includes(session.user.role)) {
    return null;
  }

  const getPerformanceColor = (rate: number, type: 'engagement' | 'conversion' | 'position') => {
    if (type === 'position') {
      if (rate <= 10) return 'text-green-600';
      if (rate <= 20) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      if (rate >= 5) return 'text-green-600';
      if (rate >= 2) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Content Performance Dashboard
              </h1>
              
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Content Published
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {metrics.length}
                  </dd>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Views
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {metrics.reduce((sum, m) => sum + m.totalViews, 0).toLocaleString()}
                  </dd>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Avg Engagement Rate
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {metrics.length > 0 
                      ? (metrics.reduce((sum, m) => sum + m.engagementRate, 0) / metrics.length).toFixed(2)
                      : 0}%
                  </dd>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Rich Snippets Won
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {metrics.filter(m => m.hasRichSnippet).length}
                  </dd>
                </div>
              </div>
            </div>

            {/* Performance Table */}
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center">
                  <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="ml-2">Loading performance data...</span>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Content
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Published
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Views (1h/1d/Total)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Engagement
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Conversion
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SERP
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SEO Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {metrics.map((metric) => (
                      <tr key={metric.contentId}>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                          {metric.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {metric.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(metric.publishedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {metric.viewsFirstHour}/{metric.viewsFirstDay}/{metric.totalViews}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`font-medium ${getPerformanceColor(metric.engagementRate, 'engagement')}`}>
                            {metric.engagementRate.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`font-medium ${getPerformanceColor(metric.conversionRate, 'conversion')}`}>
                            {metric.conversionRate.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {metric.searchPosition ? (
                            <>
                              <span className={`font-medium ${getPerformanceColor(metric.searchPosition, 'position')}`}>
                                #{metric.searchPosition.toFixed(0)}
                              </span>
                              {metric.hasRichSnippet && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                  Rich Snippet
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-1 max-w-[100px]">
                              <div className="bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    (metric.seoScore || 0) >= 80 
                                      ? 'bg-green-600' 
                                      : (metric.seoScore || 0) >= 60 
                                      ? 'bg-yellow-600' 
                                      : 'bg-red-600'
                                  }`}
                                  style={{ width: `${metric.seoScore || 0}%` }}
                                />
                              </div>
                            </div>
                            <span className="ml-2 text-sm text-gray-900">
                              {metric.seoScore || 0}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {metrics.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No performance data available for the selected period
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}