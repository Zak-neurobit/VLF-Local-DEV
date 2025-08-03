import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'T Visa (Trafficking Victims) | Vasquez Law Firm',
  description: 'Protection for victims of human trafficking through T visa',
  keywords:
    't visa (trafficking victims), immigration, humanitarian, legal services, attorney, lawyer',
};

export default function TVisaTraffickingVictimsPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="humanitarian" language="en" />;
}
