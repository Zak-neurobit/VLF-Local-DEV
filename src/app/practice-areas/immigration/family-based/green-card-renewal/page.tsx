import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Green Card Renewal | Vasquez Law Firm',
  description: 'Renewing or replacing permanent resident cards',
  keywords: 'green card renewal, immigration, family based, legal services, attorney, lawyer',
};

export default function GreenCardRenewalPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="family-based" language="en" />;
}
