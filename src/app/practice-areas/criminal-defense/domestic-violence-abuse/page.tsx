import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
};

export default function DomesticViolenceAbusePage() {
  const pageData = {
    practiceArea: 'Domestic Violence Abuse',
    title: 'Professional Legal Services',
    description: 'Experienced attorneys providing comprehensive legal representation with personalized attention to your case.',
    heroTitle: 'Domestic Violence Abuse Attorneys',
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
