import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: '42A Cancellation (Non-LPR) | Vasquez Law Firm',
  description: 'Cancellation of removal for non-permanent residents',
  keywords:
    '42a cancellation (non-lpr), immigration, removal defense, legal services, attorney, lawyer',
};

export default function FortyTwoACancellationNonLPRPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="removal-defense" language="en" />;
}
