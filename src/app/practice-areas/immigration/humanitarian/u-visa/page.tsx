import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'U Visa (Crime Victims) | Vasquez Law Firm',
  description: 'Legal assistance for crime victims seeking U visa protection',
  keywords: 'u visa (crime victims), immigration, humanitarian, legal services, attorney, lawyer',
};

export default function UVisaCrimeVictimsPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="humanitarian"
      language="en"
    />
  );
}
