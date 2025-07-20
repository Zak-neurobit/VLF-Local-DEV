'use client';

import { NewsTicker } from '@/components/ui/news-ticker';

export default function TickerTestPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Test 1: Static positioned ticker */}
      <div className="bg-yellow-500 p-2">
        <h2 className="text-black font-bold">Test 1: Static Ticker</h2>
      </div>
      <NewsTicker locale="en" />

      {/* Test 2: Fixed positioned ticker */}
      <div className="mt-20">
        <div className="bg-yellow-500 p-2">
          <h2 className="text-black font-bold">Test 2: Fixed Ticker (should be at very top)</h2>
        </div>
        <div className="fixed top-0 left-0 right-0 z-50">
          <NewsTicker locale="en" />
        </div>
      </div>

      {/* Test content */}
      <div className="p-8 pt-24">
        <h1 className="text-white text-3xl font-bold mb-4">News Ticker Test Page</h1>
        <p className="text-white mb-4">This page tests the NewsTicker component in isolation.</p>
        <p className="text-white mb-4">You should see:</p>
        <ul className="text-white list-disc list-inside space-y-2">
          <li>A static ticker after the yellow "Test 1" header</li>
          <li>A fixed ticker at the very top of the page (from Test 2)</li>
          <li>Both should have a burgundy gradient background</li>
          <li>Both should display news items or loading state</li>
        </ul>
        <div className="mt-8 p-4 bg-black/50 rounded">
          <h3 className="text-yellow-400 font-bold mb-2">Debug Info:</h3>
          <p className="text-white text-sm">
            Check the browser console for [NewsTicker] debug messages.
          </p>
          <p className="text-white text-sm">API endpoint: /api/news/ticker</p>
        </div>
      </div>
    </div>
  );
}
