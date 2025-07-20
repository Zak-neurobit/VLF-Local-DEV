import { Metadata } from 'next';
import { MasterLayout } from '@/design-system/templates/MasterLayout';

export const metadata: Metadata = {
  title: 'News Ticker Test',
  description: 'Testing the news ticker component',
};

export default function TestTickerPage() {
  return (
    <MasterLayout variant="default" showBreadcrumbs={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">News Ticker Test Page</h1>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 space-y-4">
          <p className="text-white">This page is using the MasterLayout with variant="default".</p>
          <p className="text-white">
            The news ticker should be visible at the very top of the page, above the header.
          </p>
          <p className="text-white">
            Check the browser console for debug messages from the NewsTicker component.
          </p>
          <div className="mt-8 p-4 bg-black/50 rounded">
            <h2 className="text-xl font-semibold text-[#C9974D] mb-2">Expected behavior:</h2>
            <ul className="list-disc list-inside text-white space-y-2">
              <li>News ticker appears at the very top with burgundy gradient background</li>
              <li>Shows "YO PELEO™ NOTICIAS" branding</li>
              <li>Displays news items that rotate every 5 seconds</li>
              <li>If no news items, shows "Loading news..." message</li>
              <li>Header appears below the ticker</li>
            </ul>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
}
