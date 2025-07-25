'use client';

import { useEffect, useState } from 'react';

export default function TestErrorIsolation() {
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);

    // Listen for any navigation errors
    const handleNavigationError = (e: any) => {
      console.error('Navigation error:', e);
      setErrors(prev => [...prev, `Navigation error: ${e.message || e}`]);
    };

    // Check if we\'re on an error page by looking at the DOM
    const checkForErrorPage = () => {
      const pageContent = document.body.textContent || '';
      const pageTitle = document.title;

      if (pageContent.includes('500') || pageTitle.includes('500')) {
        setErrors(prev => [...prev, `Detected 500 error page - Title: ${pageTitle}`]);
      }

      // Check for Next.js error overlay
      const errorOverlay = document.querySelector('#__next-build-error');
      if (errorOverlay) {
        setErrors(prev => [...prev, 'Next.js build error overlay detected']);
      }
    };

    // Listen for router events
    if (typeof window !== 'undefined' && window.next?.router) {
      const router = window.next.router;
      router.events?.on('routeChangeError', handleNavigationError);
    }

    // Check immediately and after a delay
    checkForErrorPage();
    setTimeout(checkForErrorPage, 1000);

    // Monitor console errors
    const originalError = console.error;
    console.error = (...args) => {
      setErrors(prev => [...prev, `Console error: ${args.join(' ')}`]);
      originalError(...args);
    };

    return () => {
      console.error = originalError;
      if (typeof window !== 'undefined' && window.next?.router) {
        window.next.router.events?.off('routeChangeError', handleNavigationError);
      }
    };
  }, []);

  const navigateWithFetch = async (path: string) => {
    try {
      setErrors(prev => [...prev, `Fetching ${path}...`]);
      const response = await fetch(path);
      const status = response.status;
      const statusText = response.statusText;

      setErrors(prev => [...prev, `Fetch ${path} returned: ${status} ${statusText}`]);

      if (status === 500) {
        const text = await response.text();
        setErrors(prev => [...prev, `500 Error content preview: ${text.substring(0, 200)}...`]);
      }
    } catch (error) {
      setErrors(prev => [
        ...prev,
        `Fetch error: ${error instanceof Error ? error.message : String(error)}`,
      ]);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Error Isolation Test</h1>

      <div className="mb-4">
        <p>Mounted: {mounted ? 'Yes' : 'No'}</p>
        <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
      </div>

      <div className="space-y-2 mb-4">
        <button
          onClick={() => navigateWithFetch('/contact')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Test Fetch /contact
        </button>
        <button
          onClick={() => navigateWithFetch('/api/health/socket')}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Test Fetch API
        </button>
        <button
          onClick={() => (window.location.href = '/contact')}
          className="px-4 py-2 bg-purple-500 text-white rounded"
        >
          Hard Navigate to /contact
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">Error Log:</h2>
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {errors.length === 0 ? (
            <p className="text-gray-500">No errors detected</p>
          ) : (
            errors.map((error, i) => (
              <div key={i} className="text-sm font-mono">
                {error}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Add global type declaration
declare global {
  interface Window {
    next?: {
      router: {
        events?: {
          on: (event: string, handler: Function) => void;
          off: (event: string, handler: Function) => void;
        };
      };
    };
  }
}
