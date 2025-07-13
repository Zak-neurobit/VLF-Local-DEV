'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ContentStats {
  blogsGenerated: number;
  landingPagesGenerated: number;
  practiceAreaPagesGenerated: number;
  totalGenerated: number;
}

interface CalendarEvent {
  contentId: string;
  contentType: string;
  scheduledFor: string;
  platforms: string[];
  status: string;
  content?: {
    title: string;
    practiceArea?: string;
    language?: string;
  };
}

export default function ContentFactoryDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generationResult, setGenerationResult] = useState<ContentStats | null>(null);
  const [calendar, setCalendar] = useState<Record<string, CalendarEvent[]>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user.role !== 'ADMIN') {
      router.push('/');
    } else {
      fetchCalendar();
    }
  }, [session, status, router]);

  const fetchCalendar = async () => {
    try {
      const response = await fetch('/api/content-factory/calendar');
      const data = await response.json();
      
      if (data.success) {
        setCalendar(data.calendar);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch content calendar');
    }
  };

  const runContentGeneration = async () => {
    setLoading(true);
    setError(null);
    setGenerationResult(null);

    try {
      const response = await fetch('/api/content-factory/generate', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setGenerationResult(data.details);
        // Refresh calendar after generation
        await fetchCalendar();
      } else {
        setError(data.error || 'Content generation failed');
      }
    } catch (err) {
      setError('Failed to run content generation');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Content Factory Dashboard
            </h1>

            {/* Content Generation Section */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Content Generation
              </h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Content generation runs automatically every day at 5 AM EST.
                      You can also trigger it manually below.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={runContentGeneration}
                disabled={loading}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Content...
                  </>
                ) : (
                  'Run Content Generation'
                )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Generation Results */}
              {generationResult && (
                <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        Content Generation Successful!
                      </h3>
                      <div className="mt-2 text-sm text-green-700">
                        <ul className="list-disc list-inside space-y-1">
                          <li>Blog Posts Generated: {generationResult.blogsGenerated}</li>
                          <li>Landing Pages Generated: {generationResult.landingPagesGenerated}</li>
                          <li>Practice Area Pages Generated: {generationResult.practiceAreaPagesGenerated}</li>
                          <li className="font-semibold">Total Generated: {generationResult.totalGenerated}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Content Calendar Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Publishing Calendar
              </h2>

              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Content
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Platforms
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(calendar).map(([date, events]) => (
                      events.map((event, index) => (
                        <tr key={`${date}-${index}`}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(event.scheduledFor).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {event.content?.title || 'Untitled'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {event.contentType}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <div className="flex flex-wrap gap-1">
                              {event.platforms.map(platform => (
                                <span
                                  key={platform}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                  {platform}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              event.status === 'published' 
                                ? 'bg-green-100 text-green-800'
                                : event.status === 'failed'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {event.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
                
                {Object.keys(calendar).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No scheduled content found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}