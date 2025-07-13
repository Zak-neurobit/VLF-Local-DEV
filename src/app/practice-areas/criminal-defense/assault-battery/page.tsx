import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Assault & Battery Defense | Vasquez Law Firm',
  description:
    'Experienced assault and battery defense attorneys in North Carolina. Free consultation. Se habla español.',
  keywords: [
    'assault battery lawyer NC',
    'assault defense attorney',
    'battery charges lawyer',
    'criminal defense',
  ],
  openGraph: {
    title: 'Assault & Battery Defense | Vasquez Law Firm',
    description: 'Expert assault and battery defense in North Carolina.',
  },
};

export default function AssaultBatteryPage() {
  const pageData = {
    practiceArea: 'Assault Battery',
    heroTitle: 'Assault Battery Attorneys',
    heroSubtitle: 'Experienced legal representation',
    urgencyLevel: 'medium' as const,
    emergencyMessage: '',
    services: [], // TODO: Add services
    faqs: [], // TODO: Add FAQs
    testimonials: [], // TODO: Add testimonials
    statistics: [],
    processSteps: [],
    language: 'en' as const,
  };

  return <ModernPracticeAreaTemplateV2 {...pageData} />;
}
