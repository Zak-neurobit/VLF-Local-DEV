import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Return to Work | Vasquez Law Firm',
  description: 'Navigating return to work after workplace injury',
  keywords: 'return to work, workers compensation, legal services, attorney, lawyer',
};

export default function ReturntoWorkPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="workers-compensation"
      subArea="return-to-work"
      language="en"
    />
  );
}
