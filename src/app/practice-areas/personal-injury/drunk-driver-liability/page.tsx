import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
};

export default function DrunkDriverLiabilityPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="personal-injury"
      subArea="drunk-driver-liability"
      language="en"
    />
  );
}
