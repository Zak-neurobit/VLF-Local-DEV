'use client';

import { useState } from 'react';

export default function TestGHLPage() {
  const [testResult, setTestResult] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'test@example.com',
    phone: '+1234567890',
    practiceArea: 'Immigration',
    message: 'This is a test contact submission',
  });

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ghl/test');
      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      setTestResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const testContactCreation = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ghl/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      setTestResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const testContactForm = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          caseType: formData.practiceArea,
          preferredContact: 'email',
          language: 'en',
        }),
      });
      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      setTestResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">GoHighLevel Integration Test</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Form Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Practice Area</label>
              <select
                value={formData.practiceArea}
                onChange={e => setFormData({ ...formData, practiceArea: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Immigration">Immigration</option>
                <option value="Personal Injury">Personal Injury</option>
                <option value="Workers Compensation">Workers Compensation</option>
                <option value="Criminal Defense">Criminal Defense</option>
                <option value="Family Law">Family Law</option>
                <option value="Traffic Law">Traffic Law</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="space-y-4">
            <button
              onClick={testConnection}
              disabled={loading}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Testing...' : 'Test GHL Connection'}
            </button>
            <button
              onClick={testContactCreation}
              disabled={loading}
              className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed ml-0 md:ml-4"
            >
              {loading ? 'Creating...' : 'Test Direct Contact Creation'}
            </button>
            <button
              onClick={testContactForm}
              disabled={loading}
              className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed ml-0 md:ml-4"
            >
              {loading ? 'Submitting...' : 'Test Full Contact Form'}
            </button>
          </div>
        </div>

        {testResult && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Important Notes</h3>
          <ul className="text-yellow-700 space-y-1">
            <li>• Make sure your .env.local file has GHL_API_KEY and GHL_LOCATION_ID set</li>
            <li>• Test contacts will be created in your actual GHL instance</li>
            <li>• Use test email addresses that you control</li>
            <li>• Check your GHL dashboard to confirm contacts are being created</li>
            <li>• Remove test contacts after testing to keep your data clean</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            🔧 Environment Variables Needed
          </h3>
          <pre className="text-blue-700 text-sm">
            {`# Add these to your .env.local file:
GHL_API_KEY=your-ghl-api-key
GHL_LOCATION_ID=your-location-id
GHL_API_URL=https://rest.gohighlevel.com/v1`}
          </pre>
        </div>
      </div>
    </div>
  );
}
