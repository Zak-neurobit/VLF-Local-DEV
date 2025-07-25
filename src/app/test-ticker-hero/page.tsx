import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'News Ticker Hero Test',
  description: 'Testing the news ticker with hero variant',
};

export default function TestTickerHeroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#6B1F2E]/20 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-6xl font-bold text-white mb-8 text-center">
          Hero Section with News Ticker
        </h1>
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900/10 backdrop-blur-sm rounded-lg p-8 space-y-4">
            <p className="text-white text-center">
              This page is using the MasterLayout with variant="hero".
            </p>
            <p className="text-white text-center">
              The news ticker should still be visible at the very top, even with a hero section.
            </p>
            <div className="mt-8 p-4 bg-black/50 rounded">
              <h2 className="text-xl font-semibold text-[#C9974D] mb-2">Hero variant specifics:</h2>
              <ul className="list-disc list-inside text-white space-y-2">
                <li>Transparent header until scroll</li>
                <li>News ticker remains fixed at top</li>
                <li>Hero content has minimal top padding (32px for ticker)</li>
                <li>No breadcrumbs shown</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
