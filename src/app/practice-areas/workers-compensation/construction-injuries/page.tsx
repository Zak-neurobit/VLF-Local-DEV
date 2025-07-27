import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Construction Injuries | Vasquez Law Firm',
  description: 'Workers compensation for construction site accidents',
  keywords: 'construction injuries, workers compensation, legal services, attorney, lawyer',
};

export default function ConstructionInjuriesPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="workers-compensation"
      subArea="construction-injuries"
      language="en"
    />
  );
}
