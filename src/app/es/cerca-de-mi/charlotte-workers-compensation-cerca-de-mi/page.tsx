import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Charlotte Compensación Laboral Cerca De Mi | Vasquez Law Firm',
  description: 'Page content for Charlotte Compensación Laboral Cerca De Mi',
};

export default function charlotteworkerscompensationcercademiPage() {
  componentLogger.info('charlotte-workers-compensation-cerca-de-miPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Charlotte Compensación Laboral Cerca De Mi</h1>
        <p className="text-lg text-gray-600">This page is under development.</p>
      </div>
    </div>
  );
}
