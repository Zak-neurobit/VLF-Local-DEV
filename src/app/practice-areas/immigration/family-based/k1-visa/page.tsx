import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'K-1 Fiancé(e) Visa | Vasquez Law Firm',
  description: 'Visa for foreign fiancé(e)s of US citizens',
  keywords: 'k-1 fiancé(e) visa, immigration, family based, legal services, attorney, lawyer',
};

export default function K1FianceVisaPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="family-based"
      language="en"
    />
  );
}
