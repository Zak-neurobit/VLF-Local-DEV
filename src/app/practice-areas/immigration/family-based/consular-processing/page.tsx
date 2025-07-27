import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Consular Processing | Vasquez Law Firm',
  description: 'Obtaining immigrant visas through US consulates abroad',
  keywords: 'consular processing, immigration, family based, legal services, attorney, lawyer',
};

export default function ConsularProcessingPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="family-based"
      language="en"
    />
  );
}
