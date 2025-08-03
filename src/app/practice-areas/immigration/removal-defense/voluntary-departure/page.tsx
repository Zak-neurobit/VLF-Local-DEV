import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Voluntary Departure | Vasquez Law Firm',
  description: 'Leaving the US voluntarily to avoid deportation consequences',
  keywords: 'voluntary departure, immigration, removal defense, legal services, attorney, lawyer',
};

export default function VoluntaryDeparturePage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="removal-defense" language="en" />;
}
