import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Guardianship | Vasquez Law Firm',
  description: 'Establishing legal guardianship for minors or incapacitated adults',
  keywords: 'guardianship, family law, legal services, attorney, lawyer',
};

export default function GuardianshipPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="family-law"
      subArea="guardianship"
      language="en"
    />
  );
}
