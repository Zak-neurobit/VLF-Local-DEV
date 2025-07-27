import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Juvenile Defense | Vasquez Law Firm',
  description: 'Criminal defense for minors in juvenile court',
  keywords: 'juvenile defense, criminal defense, legal services, attorney, lawyer',
};

export default function JuvenileDefensePage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="criminal-defense"
      subArea="juvenile-defense"
      language="en"
    />
  );
}
