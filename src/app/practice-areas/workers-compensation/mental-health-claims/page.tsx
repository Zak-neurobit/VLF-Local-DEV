import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NC Mental Health Workers Comp Lawyer | PTSD & Workplace Stress Attorney',
  description:
    'Suffering from PTSD, anxiety, or depression from workplace trauma in North Carolina? Our workers comp attorneys fight for mental health injury benefits.',
  keywords: [
    'mental health workers comp lawyer NC',
    'PTSD workers compensation attorney',
    'workplace stress claim lawyer North Carolina',
    'anxiety depression workers comp',
    'psychological injury attorney NC',
    'workplace trauma lawyer Charlotte',
  ],
};

export default function MentalHealthClaimsPage() {
  const pageData = {
    practiceArea: 'Mental Health Claims',
    heroTitle: 'Mental Health Claims Attorneys',
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
