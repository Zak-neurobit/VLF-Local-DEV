import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'T Visa (Trafficking Victims) | Vasquez Law Firm',
  description: 'Protection for victims of human trafficking through T visa',
  keywords: 't visa (trafficking victims), immigration, humanitarian, legal services, attorney, lawyer',
};

export default function TVisaTraffickingVictimsPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="humanitarian"
      language="en"
    />
  );
}
