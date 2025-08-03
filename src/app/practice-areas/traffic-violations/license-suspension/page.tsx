import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'License Suspension | Vasquez Law Firm',
  description: 'Fighting license suspension and restoration',
  keywords: 'license suspension, traffic violations, legal services, attorney, lawyer',
};

export default function LicenseSuspensionPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="traffic-violations"
      subArea="license-suspension"
      language="en"
    />
  );
}
