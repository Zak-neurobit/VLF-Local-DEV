import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Adjustment of Status | Vasquez Law Firm',
  description: 'Changing from temporary to permanent resident status',
  keywords: 'adjustment of status, immigration, family based, legal services, attorney, lawyer',
};

export default function AdjustmentofStatusPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="family-based" language="en" />;
}
