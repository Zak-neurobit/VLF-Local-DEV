'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TestNavigation() {
  const router = useRouter();
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toISOString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const testNavigation = async (path: string) => {
    try {
      addLog(`Starting navigation to: ${path}`);
      await router.push(path);
      addLog(`Navigation complete to: ${path}`);
    } catch (error) {
      addLog(`Navigation error: ${error instanceof Error ? error.message : String(error)}`);
      console.error('Navigation error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8">Navigation Test Page</h1>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Test Links</h2>
          <div className="space-y-2">
            <div>
              <Link href="/" className="text-blue-600 hover:underline">
                Home (Link component)
              </Link>
            </div>
            <div>
              <Link href="/contact" className="text-blue-600 hover:underline">
                Contacto (Link component)
              </Link>
            </div>
            <div>
              <Link href="/attorneys" className="text-blue-600 hover:underline">
                Abogados (Link component)
              </Link>
            </div>
            <div>
              <Link href="/practice-areas" className="text-blue-600 hover:underline">
                Áreas de Práctica (Link component)
              </Link>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Router Navigation</h2>
          <div className="space-y-2">
            <button
              onClick={() => testNavigation('/')}

                className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Navigate to Home
            </button>
            <button
              onClick={() => testNavigation('/contact')}

                className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Navigate to Contacto
            </button>
            <button
              onClick={() => testNavigation('/attorneys')}

                className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Navigate to Abogados
            </button>
            <button
              onClick={() => testNavigation('/practice-areas')}

                className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Navigate to Áreas de Práctica
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Navigation Logs</h2>
          <div className="bg-gray-800 p-4 rounded h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500">No navigation attempts yet</p>
            ) : (
              <pre className="text-xs font-mono whitespace-pre-wrap">{logs.join('\n')}</pre>
            )}
          </div>
          <button
            onClick={() => setLogs([])}

                className="mt-2 px-4 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
          >
            Clear Logs
          </button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-yellow-100 border border-yellow-400 rounded">
        <h3 className="font-semibold">Instructions:</h3>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Click on the Link components on the left to test normal Next.js navigation</li>
          <li>Click on the buttons to test programmatic router navigation</li>
          <li>Check the browser console for any errors</li>
          <li>Check the navigation logs on the right for any issues</li>
          <li>Open browser DevTools Network tab to see if requests are being made</li>
        </ol>
      </div>
    </div>
  );
}
