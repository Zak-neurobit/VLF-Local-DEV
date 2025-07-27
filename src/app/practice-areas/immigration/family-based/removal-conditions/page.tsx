import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Removal of Conditions (I-751) | Vasquez Law Firm',
  description: 'Removing conditions on permanent residence',
  keywords: 'removal of conditions (i-751), immigration, family based, legal services, attorney, lawyer',
};

export default function RemovalofConditionsI751Page() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="family-based"
      language="en"
    />
  );
}
