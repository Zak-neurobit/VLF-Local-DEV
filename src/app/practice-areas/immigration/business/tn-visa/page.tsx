import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'TN NAFTA Professional | Vasquez Law Firm',
  description: 'Work authorization for Canadian and Mexican professionals under USMCA',
  keywords: 'tn nafta professional, immigration, business, legal services, attorney, lawyer',
};

export default function TNNAFTAProfessionalPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="business" language="en" />;
}
