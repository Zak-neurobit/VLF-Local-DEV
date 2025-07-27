import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Motions to Reopen | Vasquez Law Firm',
  description: 'Reopening immigration cases for new evidence or changed circumstances',
  keywords: 'motions to reopen, immigration, removal defense, legal services, attorney, lawyer',
};

export default function MotionstoReopenPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="removal-defense"
      language="en"
    />
  );
}
