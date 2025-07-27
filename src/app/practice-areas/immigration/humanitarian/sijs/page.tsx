import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Special Immigrant Juvenile Status | Vasquez Law Firm',
  description: 'Protection for abused, abandoned, or neglected children',
  keywords: 'special immigrant juvenile status, immigration, humanitarian, legal services, attorney, lawyer',
};

export default function SpecialImmigrantJuvenileStatusPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="humanitarian"
      language="en"
    />
  );
}
