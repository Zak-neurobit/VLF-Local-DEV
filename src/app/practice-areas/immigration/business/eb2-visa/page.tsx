import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'EB-2 Advanced Degree/NIW | Vasquez Law Firm',
  description: 'Immigration for professionals with advanced degrees or exceptional ability',
  keywords: 'eb-2 advanced degree/niw, immigration, business, legal services, attorney, lawyer',
};

export default function EB2AdvancedDegreeNIWPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="business"
      language="en"
    />
  );
}
