'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Test500Comprehensive() {
  const [testResults, setTestResults] = useState<
    Array<{
      test: string;
      result: 'pending' | 'success' | 'error';
      message: string;
      timestamp: string;
    }>
  >([]);
  const router = useRouter();

  const addResult = (test: string, result: 'success' | 'error', message: string) => {
    setTestResults(prev => [
      ...prev,
      {
        test,
        result,
        message,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  useEffect(() => {
    // Monitor for any 500 errors
    const checkForErrors = () => {
      // Check if we\'re on an error page
      if (document.title.includes('500') || document.body.textContent?.includes('500')) {
        addResult('Page Check', 'error', 'Found 500 error on page');
      }
    };

    // Check periodically
    const interval = setInterval(checkForErrors, 1000);

    // Check on initial load
    checkForErrors();

    return () => clearInterval(interval);
  }, []);

  const runTests = async () => {
    setTestResults([]);

    // Test 1: Direct navigation with router.push
    try {
      addResult('Router Push Test', 'pending', 'Testing router.push("/contact")...');
      await router.push('/contact');
      // Wait a bit to see if error occurs
      await new Promise(resolve => setTimeout(resolve, 2000));
      addResult('Router Push Test', 'success', 'Successfully navigated to /contact');
    } catch (error) {
      addResult(
        'Router Push Test',
        'error',
        `Failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    // Test 2: Prefetch test
    try {
      addResult('Prefetch Test', 'pending', 'Testing router.prefetch("/attorneys")...');
      router.prefetch('/attorneys');
      await new Promise(resolve => setTimeout(resolve, 1000));
      addResult('Prefetch Test', 'success', 'Successfully prefetched /attorneys');
    } catch (error) {
      addResult(
        'Prefetch Test',
        'error',
        `Failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    // Test 3: Check current route
    try {
      addResult('Route Check', 'pending', 'Checking current route...');
      const currentPath = window.location.pathname;
      addResult('Route Check', 'success', `Current path: ${currentPath}`);
    } catch (error) {
      addResult(
        'Route Check',
        'error',
        `Failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    // Test 4: Fetch test to check API
    try {
      addResult('API Test', 'pending', 'Testing API endpoint...');
      const response = await fetch('/api/health/socket');
      if (response.status === 500) {
        addResult('API Test', 'error', `Server returned 500 error`);
      } else {
        addResult('API Test', 'success', `API returned status: ${response.status}`);
      }
    } catch (error) {
      addResult(
        'API Test',
        'error',
        `Failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    // Test 5: Check for middleware issues
    try {
      addResult('Middleware Test', 'pending', 'Checking middleware behavior...');
      const response = await fetch('/contact', { method: 'HEAD' });
      addResult('Middleware Test', 'success', `HEAD request returned: ${response.status}`);
    } catch (error) {
      addResult(
        'Middleware Test',
        'error',
        `Failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  const testSpecificRoute = async (route: string) => {
    try {
      addResult(`Route Test: ${route}`, 'pending', `Testing navigation to ${route}...`);

      // First try fetch
      const response = await fetch(route);
      if (response.status === 500) {
        addResult(`Route Test: ${route}`, 'error', `Fetch returned 500 error`);
        return;
      }

      // Then try navigation
      await router.push(route);
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if we ended up on error page
      if (document.title.includes('500') || window.location.pathname.includes('500')) {
        addResult(`Route Test: ${route}`, 'error', `Navigation resulted in 500 error page`);
      } else {
        addResult(`Route Test: ${route}`, 'success', `Successfully navigated to ${route}`);
      }
    } catch (error) {
      addResult(
        `Route Test: ${route}`,
        'error',
        `Failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-4">Comprehensive 500 Error Testing</h1>

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h2 className="text-lg font-semibold mb-2">How to reproduce 500 errors:</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Click "Run All Tests" to check various navigation methods</li>
          <li>Try clicking the test links below</li>
          <li>Watch the test results for any 500 errors</li>
          <li>Check browser console (F12) for additional errors</li>
          <li>Check Network tab for any 500 responses</li>
        </ol>
      </div>

      <div className="mb-6 space-y-4">
        <button
          onClick={runTests}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Run All Tests
        </button>

        <div className="space-y-2">
          <h3 className="font-semibold">Test Specific Routes:</h3>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => testSpecificRoute('/contact')}
              className="px-4 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
            >
              Test /contact
            </button>
            <button
              onClick={() => testSpecificRoute('/attorneys')}
              className="px-4 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
            >
              Test /attorneys
            </button>
            <button
              onClick={() => testSpecificRoute('/practice-areas')}
              className="px-4 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
            >
              Test /practice-areas
            </button>
            <button
              onClick={() => testSpecificRoute('/blog')}
              className="px-4 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
            >
              Test /blog
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Direct Link Tests:</h3>
          <div className="space-x-4">
            <Link href="/contact" className="text-blue-600 hover:underline">
              Contact (Link)
            </Link>
            <Link href="/attorneys" className="text-blue-600 hover:underline">
              Attorneys (Link)
            </Link>
            <Link href="/practice-areas" className="text-blue-600 hover:underline">
              Practice Areas (Link)
            </Link>
            <a href="/contact" className="text-green-600 hover:underline">
              Contact (Anchor)
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Test Results:</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {testResults.length === 0 ? (
            <p className="text-gray-500">No tests run yet</p>
          ) : (
            testResults.map((result, index) => (
              <div
                key={index}
                className={`p-2 rounded ${
                  result.result === 'error'
                    ? 'bg-red-100 border border-red-300'
                    : result.result === 'success'
                      ? 'bg-green-100 border border-green-300'
                      : 'bg-yellow-100 border border-yellow-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-semibold">{result.test}:</span>
                    <span className="ml-2">{result.message}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-semibold mb-2">Common causes of 500 errors:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Server-side rendering errors in page components</li>
          <li>Missing environment variables</li>
          <li>Middleware errors or infinite redirects</li>
          <li>API route errors</li>
          <li>Memory or resource exhaustion</li>
          <li>Hydration mismatches between server and client</li>
        </ul>
      </div>
    </div>
  );
}
