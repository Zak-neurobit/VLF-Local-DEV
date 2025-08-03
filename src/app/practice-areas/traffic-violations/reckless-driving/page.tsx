import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Reckless Driving | Vasquez Law Firm',
  description: 'Legal defense for reckless driving charges',
  keywords: 'reckless driving, traffic violations, legal services, attorney, lawyer',
};

export default function RecklessDrivingPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="traffic-violations"
      subArea="reckless-driving"
      language="en"
    />
  );
}
