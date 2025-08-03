import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Hit and Run | Vasquez Law Firm',
  description: 'Defense against hit and run charges',
  keywords: 'hit and run, traffic violations, legal services, attorney, lawyer',
};

export default function HitandRunPage() {
  return (
    <PracticeAreaWrapper practiceArea="traffic-violations" subArea="hit-and-run" language="en" />
  );
}
