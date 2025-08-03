import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Naturalization/Citizenship | Vasquez Law Firm',
  description: 'Becoming a US citizen through naturalization',
  keywords:
    'naturalization/citizenship, immigration, family based, legal services, attorney, lawyer',
};

export default function NaturalizationCitizenshipPage() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="family-based" language="en" />;
}
