import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Disability Benefits | Vasquez Law Firm',
  description: 'Securing disability benefits for workplace injuries',
  keywords: 'disability benefits, workers compensation, legal services, attorney, lawyer',
};

export default function DisabilityBenefitsPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="workers-compensation"
      subArea="disability-benefits"
      language="en"
    />
  );
}
