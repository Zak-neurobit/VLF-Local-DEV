import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Denied Claims | Vasquez Law Firm',
  description: 'Appealing denied workers compensation claims',
  keywords: 'denied claims, workers compensation, legal services, attorney, lawyer',
};

export default function DeniedClaimsPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="workers-compensation"
      subArea="denied-claims"
      language="en"
    />
  );
}
