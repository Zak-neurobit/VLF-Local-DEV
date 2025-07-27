import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'White Collar Crimes | Vasquez Law Firm',
  description: 'Defense against fraud, embezzlement, and financial crimes',
  keywords: 'white collar crimes, criminal defense, legal services, attorney, lawyer',
};

export default function WhiteCollarCrimesPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="criminal-defense"
      subArea="white-collar-crimes"
      language="en"
    />
  );
}
