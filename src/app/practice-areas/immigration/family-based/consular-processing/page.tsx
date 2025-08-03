import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Consular Processing | Vasquez Law Firm',
  description: 'Obtaining immigrant visas through US consulates abroad',
  keywords: 'consular processing, immigration, family based, legal services, attorney, lawyer',
};

export default function ConsularProcessingPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="family-based" language="en" />;
}
