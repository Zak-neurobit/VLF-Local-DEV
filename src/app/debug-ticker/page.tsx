'use client';

import { useEffect, useState } from 'react';

export default function DebugTickerPage() {
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/news/ticker?category=immigration&limit=5&locale=en')
      .then(res => res.json())
      .then(data => {
        console.log('API Response:', data);
        setApiResponse(data);
      })
      .catch(err => {
        console.error('API Error:', err);
        setError(err.message);
      });
  }, []);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">News Ticker Debug Page</h1>

      {/* Test 1: Simple ticker UI */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Test 1: Static Ticker UI</h2>
        <div className="bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white py-2 px-4 h-[32px] flex items-center">
          <div className="flex items-center space-x-4">
            <span className="text-[#C9974D] font-bold text-sm uppercase tracking-wider">
              YO PELEO™ NOTICIAS
            </span>
            <span className="text-white">This is a test news item that should be visible</span>
          </div>
        </div>
      </div>

      {/* Test 2: Fixed position ticker */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Test 2: Fixed Position (Look at page top)</h2>
        <div
          className="fixed top-0 left-0 right-0 z-[9999]"
          style={{
            backgroundColor: '#6B1F2E',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
          }}
        >
          <span className="text-[#C9974D] font-bold text-sm uppercase tracking-wider mr-4">
            FIXED TICKER TEST
          </span>
          <span className="text-white text-sm">
            If you see this at the top, fixed positioning works
          </span>
        </div>
      </div>

      {/* Test 3: API Response */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Test 3: API Response</h2>
        <div className="bg-black/50 p-4 rounded">
          <pre className="text-xs overflow-auto">
            {error ? (
              <span className="text-red-400">Error: {error}</span>
            ) : (
              JSON.stringify(apiResponse, null, 2)
            )}
          </pre>
        </div>
      </div>

      {/* Test 4: Import actual component */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Test 4: Actual NewsTicker Component</h2>
        <div className="border border-white/20 p-4 rounded">
          <p className="mb-4 text-sm text-gray-400">
            The actual NewsTicker component should appear below:
          </p>
          <div className="overflow-hidden">
            {/* We`ll import it dynamically to avoid SSR issues */}
            <TickerWrapper />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-yellow-500/20 p-4 rounded">
        <h3 className="font-bold mb-2">What to check:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Test 1 should show a burgundy bar with yellow "YO PELEO™ NOTICIAS" text</li>
          <li>Test 2 should appear fixed at the very top of the page</li>
          <li>Test 3 should show the API response (check for posts array)</li>
          <li>Test 4 should show the actual NewsTicker component</li>
          <li>Check browser console for any errors</li>
        </ol>
      </div>
    </div>
  );
}

function TickerWrapper() {
  const [Component, setComponent] = useState<any>(null);

  useEffect(() => {
    import('@/components/ui/news-ticker').then(mod => {
      setComponent(() => mod.NewsTicker);
    });
  }, []);

  if (!Component) return <div>Loading component...</div>;

  return <Component locale="en" />;
}
