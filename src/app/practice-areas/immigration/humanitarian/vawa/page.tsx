import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'VAWA (Violence Against Women Act) | Vasquez Law Firm',
  description: 'Immigration relief under the Violence Against Women Act',
  keywords: 'vawa (violence against women act), immigration, humanitarian, legal services, attorney, lawyer',
};

export default function VAWAViolenceAgainstWomenActPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="humanitarian"
      language="en"
    />
  );
}
