import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'EB-3 Skilled Workers | Vasquez Law Firm',
  description: 'Employment-based immigration for skilled workers and professionals',
  keywords: 'eb-3 skilled workers, immigration, business, legal services, attorney, lawyer',
};

export default function EB3SkilledWorkersPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="business"
      language="en"
    />
  );
}
