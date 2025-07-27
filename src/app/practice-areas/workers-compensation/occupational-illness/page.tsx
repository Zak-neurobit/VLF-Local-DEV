import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Occupational Illness | Vasquez Law Firm',
  description: 'Compensation for work-related illnesses and diseases',
  keywords: 'occupational illness, workers compensation, legal services, attorney, lawyer',
};

export default function OccupationalIllnessPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="workers-compensation"
      subArea="occupational-illness"
      language="en"
    />
  );
}
