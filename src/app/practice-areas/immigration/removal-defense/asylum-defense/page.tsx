import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Asylum Defense | Vasquez Law Firm',
  description: 'Defense against deportation through asylum claims',
  keywords: 'asylum defense, immigration, removal defense, legal services, attorney, lawyer',
};

export default function AsylumDefensePage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="removal-defense"
      language="en"
    />
  );
}
