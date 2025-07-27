import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Prosecutorial Discretion | Vasquez Law Firm',
  description: 'Requesting discretion in deportation proceedings',
  keywords: 'prosecutorial discretion, immigration, removal defense, legal services, attorney, lawyer',
};

export default function ProsecutorialDiscretionPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="removal-defense"
      language="en"
    />
  );
}
