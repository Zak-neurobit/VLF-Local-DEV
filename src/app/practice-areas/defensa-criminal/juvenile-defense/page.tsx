import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Juvenile Defense | Vasquez Law Firm',
  description: 'Criminal defense for minors in juvenile court',
  keywords: 'juvenile defense, criminal defense, legal services, attorney, lawyer',
};

export default function JuvenileDefensePage() {
  return (
    <PracticeAreaWrapper practiceArea="criminal-defense" subArea="juvenile-defense" language="en" />
  );
}
