import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'TN NAFTA Professional | Vasquez Law Firm',
  description: 'Work authorization for Canadian and Mexican professionals under USMCA',
  keywords: 'tn nafta professional, immigration, business, legal services, attorney, lawyer',
};

export default function TNNAFTAProfessionalPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="immigration"
      subArea="business"
      language="en"
    />
  );
}
