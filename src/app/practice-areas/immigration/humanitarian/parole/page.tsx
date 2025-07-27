import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Parole & Humanitarian Parole | Vasquez Law Firm',
  description: 'Temporary admission for urgent humanitarian reasons',
  keywords: 'parole & humanitarian parole, immigration, humanitarian, legal services, attorney, lawyer',
};

export default function ParoleHumanitarianParolePage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="humanitarian"
      language="en"
    />
  );
}
