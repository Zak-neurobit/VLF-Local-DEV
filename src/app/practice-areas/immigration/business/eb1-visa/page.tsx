import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'EB-1 Extraordinary Ability | Vasquez Law Firm',
  description: 'Employment-based immigration for individuals with extraordinary abilities',
  keywords: 'eb-1 extraordinary ability, immigration, business, legal services, attorney, lawyer',
};

export default function EB1ExtraordinaryAbilityPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="business"
      language="en"
    />
  );
}
