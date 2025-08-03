import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Occupational Illness | Vasquez Law Firm',
  description: 'Compensation for work-related illnesses and diseases',
  keywords: 'occupational illness, workers compensation, legal services, attorney, lawyer',
};

export default function OccupationalIllnessPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="workers-compensation"
      subArea="occupational-illness"
      language="en"
    />
  );
}
