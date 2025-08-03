import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Test Ticker | Vasquez Law Firm',
  description: 'Página en español para Test Ticker',
};

export default function testtickerPage() {
  componentLogger.info('test-tickerPage.render', {});

  return (
    <div className="min-h-screen bg-gray-900/50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Test Ticker</h1>
        <p className="text-lg text-gray-300">Esta página está en desarrollo.</p>
      </div>
    </div>
  );
}
