import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'EB-2 Advanced Degree/NIW | Vasquez Law Firm',
  description: 'Immigration for professionals with advanced degrees or exceptional ability',
  keywords: 'eb-2 advanced degree/niw, immigration, business, legal services, attorney, lawyer',
};

export default function EB2AdvancedDegreeNIWPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="business" language="en" />;
}
