import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Motions to Reopen | Vasquez Law Firm',
  description: 'Reopening immigration cases for new evidence or changed circumstances',
  keywords: 'motions to reopen, immigration, removal defense, legal services, attorney, lawyer',
};

export default function MotionstoReopenPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="removal-defense" language="en" />;
}
