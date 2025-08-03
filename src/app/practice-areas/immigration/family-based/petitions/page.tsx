import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Family Petitions (I-130) | Vasquez Law Firm',
  description: 'Filing family-based immigration petitions for relatives',
  keywords: 'family petitions (i-130), immigration, family based, legal services, attorney, lawyer',
};

export default function FamilyPetitionsI130Page() {
  return <PracticeAreaWrapper practiceArea="immigration" subArea="family-based" language="en" />;
}
