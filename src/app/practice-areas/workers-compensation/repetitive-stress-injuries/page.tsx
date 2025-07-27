import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Repetitive Stress Injuries | Vasquez Law Firm',
  description: 'Claims for carpal tunnel and other repetitive strain injuries',
  keywords: 'repetitive stress injuries, workers compensation, legal services, attorney, lawyer',
};

export default function RepetitiveStressInjuriesPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="workers-compensation"
      subArea="repetitive-stress-injuries"
      language="en"
    />
  );
}
