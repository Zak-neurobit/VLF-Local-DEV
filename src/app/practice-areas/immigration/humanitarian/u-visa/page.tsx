import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'U Visa (Crime Victims) | Vasquez Law Firm',
  description: 'Legal assistance for crime victims seeking U visa protection',
  keywords: 'u visa (crime victims), immigration, humanitarian, legal services, attorney, lawyer',
};

export default function UVisaCrimeVictimsPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="humanitarian" language="en" />;
}
