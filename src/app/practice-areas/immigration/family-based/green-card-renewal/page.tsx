import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Green Card Renewal | Vasquez Law Firm',
  description: 'Renewing or replacing permanent resident cards',
  keywords: 'green card renewal, immigration, family based, legal services, attorney, lawyer',
};

export default function GreenCardRenewalPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="family-based"
      language="en"
    />
  );
}
