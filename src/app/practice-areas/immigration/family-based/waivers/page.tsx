import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Waivers (I-601/I-601A) | Vasquez Law Firm',
  description: 'Waivers for inadmissibility grounds in immigration cases',
  keywords: 'waivers (i-601/i-601a), immigration, family based, legal services, attorney, lawyer',
};

export default function WaiversI601I601APage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="family-based"
      language="en"
    />
  );
}
