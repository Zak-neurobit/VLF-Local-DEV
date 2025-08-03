import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'White Collar Crimes | Vasquez Law Firm',
  description: 'Defense against fraud, embezzlement, and financial crimes',
  keywords: 'white collar crimes, criminal defense, legal services, attorney, lawyer',
};

export default function WhiteCollarCrimesPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="criminal-defense"
      subArea="white-collar-crimes"
      language="en"
    />
  );
}
