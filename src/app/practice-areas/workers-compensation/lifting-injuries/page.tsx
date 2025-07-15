import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NC Lifting Injury Workers Comp Lawyer | Back Injury Attorney',
  description:
    'Suffered a lifting injury at work in North Carolina? Our workers comp attorneys fight denied claims and get maximum benefits for back and spine injuries.',
  keywords: [
    'lifting injury lawyer NC',
    'back injury workers comp attorney',
    'spine injury workplace lawyer',
    'herniated disc workers compensation',
    'lifting accident attorney NC',
    'workplace back injury lawyer',
  ],
};

export default function LiftingInjuriesPage() {
  const pageData = {
    practiceArea: 'Lifting Injuries',
    title: 'Professional Legal Services',
    description: 'Experienced attorneys providing comprehensive legal representation with personalized attention to your case.',
    heroTitle: 'Lifting Injuries Attorneys',
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
