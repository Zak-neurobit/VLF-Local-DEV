import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Adoption | Vasquez Law Firm',
  description: 'Legal assistance with adoption proceedings',
  keywords: 'adoption, family law, legal services, attorney, lawyer',
};

export default function AdoptionPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="family-law"
      subArea="adoption"
      language="en"
    />
  );
}
