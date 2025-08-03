import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'VAWA (Violence Against Women Act) | Vasquez Law Firm',
  description: 'Immigration relief under the Violence Against Women Act',
  keywords:
    'vawa (violence against women act), immigration, humanitarian, legal services, attorney, lawyer',
};

export default function VAWAViolenceAgainstWomenActPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="humanitarian" language="en" />;
}
