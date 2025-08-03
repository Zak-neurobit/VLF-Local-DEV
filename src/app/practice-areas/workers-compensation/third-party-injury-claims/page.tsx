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

export default function ThirdPartyInjuryClaimsPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="workers-compensation"
      subArea="third-party-injury-claims"
      language="en"
    />
  );
}
