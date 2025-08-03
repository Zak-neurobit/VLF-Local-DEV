import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Removal of Conditions (I-751) | Vasquez Law Firm',
  description: 'Removing conditions on permanent residence',
  keywords:
    'removal of conditions (i-751), immigration, family based, legal services, attorney, lawyer',
};

export default function RemovalofConditionsI751Page() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="family-based" language="en" />;
}
