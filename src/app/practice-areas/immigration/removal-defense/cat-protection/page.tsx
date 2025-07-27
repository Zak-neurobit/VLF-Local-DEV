import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'CAT Protection | Vasquez Law Firm',
  description: 'Protection under Convention Against Torture',
  keywords: 'cat protection, immigration, removal defense, legal services, attorney, lawyer',
};

export default function CATProtectionPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="removal-defense"
      language="en"
    />
  );
}
