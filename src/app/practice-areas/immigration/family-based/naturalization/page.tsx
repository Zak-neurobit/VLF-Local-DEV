import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Naturalization/Citizenship | Vasquez Law Firm',
  description: 'Becoming a US citizen through naturalization',
  keywords: 'naturalization/citizenship, immigration, family based, legal services, attorney, lawyer',
};

export default function NaturalizationCitizenshipPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="family-based"
      language="en"
    />
  );
}
