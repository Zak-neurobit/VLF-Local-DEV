import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Prenuptial Agreements | Vasquez Law Firm',
  description: 'Creating and reviewing prenuptial agreements',
  keywords: 'prenuptial agreements, family law, legal services, attorney, lawyer',
};

export default function PrenuptialAgreementsPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="family-law"
      subArea="prenuptial-agreements"
      language="en"
    />
  );
}
