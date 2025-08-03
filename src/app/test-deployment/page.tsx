import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Test Deployment | Vasquez Law Firm',
  description: 'Página en español para Test Deployment',
};

export default function testdeploymentPage() {
  componentLogger.info('test-deploymentPage.render', {});

  return (
    <div className="min-h-screen bg-gray-900/50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Test Deployment</h1>
        <p className="text-lg text-gray-300">Esta página está en desarrollo.</p>
      </div>
    </div>
  );
}
