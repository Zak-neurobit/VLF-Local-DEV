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

export default function DomesticViolenceAbusePage() {
  return (
    <PracticeAreaWrapper
      practiceArea="criminal-defense"
      subArea="domestic-violence-abuse"
      language="en"
    />
  );
}
