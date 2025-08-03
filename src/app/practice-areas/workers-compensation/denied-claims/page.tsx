import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Denied Claims | Vasquez Law Firm',
  description: 'Appealing denied workers compensation claims',
  keywords: 'denied claims, workers compensation, legal services, attorney, lawyer',
};

export default function DeniedClaimsPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="workers-compensation"
      subArea="denied-claims"
      language="en"
    />
  );
}
