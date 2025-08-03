import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Asylum Defense | Vasquez Law Firm',
  description: 'Defense against deportation through asylum claims',
  keywords: 'asylum defense, immigration, removal defense, legal services, attorney, lawyer',
};

export default function AsylumDefensePage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="removal-defense" language="en" />;
}
