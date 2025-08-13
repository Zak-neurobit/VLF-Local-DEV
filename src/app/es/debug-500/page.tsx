'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Debug500Page() {
  const [errors, setErrors] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    // Capture any global errors
    const handleError = (event: ErrorEvent) => {
      setErrors(prev => [
        ...prev,
        `Global Error: ${event.message} at ${event.filename}:${event.lineno}:${event.colno}`,
      ]);
      // Prevent default error handling
      event.preventDefault();
    };

    // Capture unhandled promise rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      setErrors(prev => [...prev, `Unhandled Promise Rejection: ${event.reason}`]);
      event.preventDefault();
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    // Check console for errors
    const originalError = console.error;
    console.error = (...args) => {
      setErrors(prev => [...prev, `Console Error: ${args.join(' ')}`]);
      originalError.apply(console, args);
    };

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
      console.error = originalError;
    };
  }, []);

  const testNavigation = async (path: string) => {
    try {
      setErrors(prev => [...prev, `Attempting navigation to: ${path}`]);
      await router.push(path);
      setErrors(prev => [...prev, `Successfully navigated to: ${path}`]);
    } catch (error) {
      setErrors(prev => [
        ...prev,
        `Navigation error: ${error instanceof Error ? error.message : String(error)}`,
      ]);
    }
  };

  const checkWindowState = () => {
    const state = {
      pathname: window.location.pathname,
      href: window.location.href,
      nextRouter: router ? 'Available' : 'Not Available',
      documentReady: document.readyState,
      hydrated: mounted,
    };
    setErrors(prev => [...prev, `Window State: ${JSON.stringify(state, null, 2)}`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-4">Debug 500 Errors</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Current State</h2>
        <div className="bg-gray-800 p-4 rounded">
          <p>Mounted: {mounted ? 'Yes' : 'No'}</p>
          <p>Current Path: {typeof window !== 'undefined' ? window.location.pathname : 'N/A'}</p>
          <p>Errors Captured: {errors.length}</p>
        </div>
      </div>

      <div className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold mb-2">Test Actions</h2>
        <button
          onClick={() => testNavigation('/contact')}

                className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Navigate to /contact
        </button>
        <button
          onClick={() => testNavigation('/attorneys')}

                className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Navigate to /attorneys
        </button>
        <button
          onClick={() => (window.location.href = '/contact')}

                className="block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Hard Navigate to /contact (window.location)
        </button>
        <button
          onClick={checkWindowState} className="block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Check Window State
        </button>
        <button
          onClick={() => {
            throw new Error('Test Error - This is intentional');
        }}
 className="block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Trigger Test Error
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Error Log</h2>
        <div className="bg-gray-900 text-white p-4 rounded h-96 overflow-y-auto">
          {errors.length === 0 ? (
            <p className="text-gray-400">No errors captured yet...</p>
          ) : (
            <pre className="text-xs font-mono whitespace-pre-wrap">
              {errors.map((error, index) => (
                <div key={index}

                className="mb-2 pb-2 border-b border-gray-700">
                  [{new Date().toISOString()}] {error}
                </div>
              ))}
            </pre>
          )}
        </div>
        <button
          onClick={() => setErrors([])}

                className="mt-2 px-4 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
        >
          Clear Errors
        </button>
      </div>

      <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
        <h3 className="font-semibold mb-2">Debugging Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Open browser DevTools (F12)</li>
          <li>Go to Console tab to see any JavaScript errors</li>
          <li>Go to Network tab to see HTTP requests</li>
          <li>Try navigating using the buttons above</li>
          <li>Check if any errors appear in the Error Log</li>
          <li>Try the "Hard Navigate" button to see if it\'s a client-side routing issue</li>
        </ol>
      </div>
    </div>
  );
}
