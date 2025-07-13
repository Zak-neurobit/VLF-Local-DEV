'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function ImportDashboard() {
  const [importing, setImporting] = useState(false);
  const [status, setStatus] = useState<{
    isImporting: boolean;
    lastImport?: string;
    totalPages?: number;
    importedPages?: number;
    errors?: string[];
    stats?: {
      totalFiles?: number;
      hasAttorneys?: boolean;
      hasPracticeAreas?: boolean;
      hasLocations?: boolean;
      hasBlogPosts?: boolean;
      hasSEOReport?: boolean;
      files?: Array<{
        path: string;
        type: string;
        size: number;
        status: string;
      }>;
      errors?: string[];
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string[]>([]);

  const checkImportStatus = async () => {
    try {
      const response = await axios.get('/api/content-import');
      setStatus(response.data);
    } catch (err) {
      setError('Failed to check import status');
    }
  };

  const startImport = async () => {
    setImporting(true);
    setError(null);
    setProgress(['Starting import process...']);

    try {
      const response = await axios.post('/api/content-import', {
        action: 'import-all',
      });

      if (response.data.success) {
        setProgress(prev => [...prev, '✅ Import initiated successfully']);

        // Poll for status
        const interval = setInterval(async () => {
          await checkImportStatus();
        }, 5000);

        // Stop polling after 5 minutes
        setTimeout(() => clearInterval(interval), 300000);
      }
    } catch (err: unknown) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.error || err.message || 'Import failed'
        : 'Import failed';
      setError(errorMessage);
      setProgress(prev => [...prev, '❌ Import failed']);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl p-8"
        >
          <h1 className="text-3xl font-bold text-[#6B1F2E] mb-8">
            Vasquez Law Website Import Dashboard
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Import Controls */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Import Controls</h2>

              <div className="space-y-4">
                <button
                  onClick={startImport}
                  disabled={importing}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-all ${
                    importing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#6B1F2E] hover:bg-[#8B2635] text-white'
                  }`}
                >
                  {importing ? 'Importing...' : 'Start Full Website Import'}
                </button>

                <button
                  onClick={checkImportStatus}
                  className="w-full px-6 py-3 bg-[#C9974D] hover:bg-[#D4A574] text-white rounded-lg font-semibold transition-all"
                >
                  Check Import Status
                </button>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">{error}</p>
                </div>
              )}
            </div>

            {/* Import Progress */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Import Progress</h2>

              <div className="bg-gray-100 rounded-lg p-4 h-64 overflow-y-auto">
                {progress.length > 0 ? (
                  <ul className="space-y-2">
                    {progress.map((item, index) => (
                      <li key={index} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No import activity yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Import Status */}
          {status && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Import Status</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-700">Pages Imported</h3>
                  <p className="text-2xl font-bold text-blue-900">
                    {status.stats?.totalFiles || 0}
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-700">Components Ready</h3>
                  <div className="space-y-1 mt-2">
                    <p className="text-sm">Attorneys: {status.stats?.hasAttorneys ? '✅' : '❌'}</p>
                    <p className="text-sm">
                      Practice Areas: {status.stats?.hasPracticeAreas ? '✅' : '❌'}
                    </p>
                    <p className="text-sm">
                      Blog Posts: {status.stats?.hasBlogPosts ? '✅' : '❌'}
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-700">SEO Analysis</h3>
                  <p className="text-sm mt-2">
                    {status.stats?.hasSEOReport ? 'Report Available' : 'Not Generated'}
                  </p>
                </div>
              </div>

              {status.stats?.files && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Imported Files:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {status.stats.files.map((file, index) => (
                      <div
                        key={file.path || index}
                        className="text-sm bg-gray-100 rounded px-2 py-1"
                      >
                        {file.path}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SEO Strategy */}
          <div className="mt-8 bg-gradient-to-r from-[#6B1F2E] to-[#C9974D] text-white rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">SEO Strategy for DA 80</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Technical SEO</h3>
                <ul className="text-sm space-y-1">
                  <li>• Schema markup for all pages</li>
                  <li>• Core Web Vitals optimization</li>
                  <li>• Mobile-first responsive design</li>
                  <li>• XML sitemap & robots.txt</li>
                  <li>• HTTPS & security headers</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Content Strategy</h3>
                <ul className="text-sm space-y-1">
                  <li>• 100+ legal guides & resources</li>
                  <li>• Location-specific landing pages</li>
                  <li>• Bilingual content (EN/ES)</li>
                  <li>• Video content optimization</li>
                  <li>• Regular blog updates</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
