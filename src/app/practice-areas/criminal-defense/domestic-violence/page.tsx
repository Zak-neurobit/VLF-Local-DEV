import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Domestic Violence Defense Lawyers NC & FL | Protective Orders | Vasquez Law Firm',
  description:
    'Expert domestic violence defense attorneys in Raleigh, Charlotte, Smithfield & Orlando. Defending false accusations, protective order violations, and domestic assault charges.',
  keywords:
    'domestic violence lawyer, protective order attorney, restraining order defense, domestic assault, false accusations, 50B order, criminal defense, Raleigh NC, Charlotte NC, Orlando FL',
  openGraph: {
    title: 'Domestic Violence Defense Lawyers | Protective Orders | Vasquez Law Firm',
    description:
      'Expert domestic violence defense attorneys protecting your rights against false accusations.',
    type: 'website',
    images: [
      {
        url: '/images/domestic-violence-defense-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Domestic Violence Defense Lawyers',
      },
    ],
  },
};

export default function DomesticViolencePage() {
  const pageData = {
    practiceArea: 'Domestic Violence',
    title: 'Professional Legal Services',
    description: 'Experienced attorneys providing comprehensive legal representation with personalized attention to your case.',
    heroTitle: 'Domestic Violence Attorneys',
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
