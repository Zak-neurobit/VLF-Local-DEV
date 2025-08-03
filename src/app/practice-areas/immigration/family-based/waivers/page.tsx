import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Waivers (I-601/I-601A) | Vasquez Law Firm',
  description: 'Waivers for inadmissibility grounds in immigration cases',
  keywords: 'waivers (i-601/i-601a), immigration, family based, legal services, attorney, lawyer',
};

export default function WaiversI601I601APage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="family-based" language="en" />;
}
