import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NC Expungement Lawyer | Criminal Record Expunction Attorney',
  description:
    'Clear your criminal record in North Carolina. Our expungement attorneys help you get a fresh start by removing arrests, dismissals, and convictions. Se habla español.',
  keywords: [
    'expungement lawyer NC',
    'North Carolina criminal record expunction',
    'clear criminal record attorney',
    'NC expungement eligibility lawyer',
    'criminal record removal Charlotte',
    'expunction attorney Raleigh',
    'felony expungement NC',
    'misdemeanor expungement lawyer',
    'abogado expungement record criminal',
    'North Carolina record clearing attorney',
  ],
  openGraph: {
    title: 'NC Expungement Lawyer | Clear Your Criminal Record',
    description:
      "Get a fresh start. We help eligible individuals remove criminal records through North Carolina's expungement process.",
    images: [
      {
        url: '/images/expungement-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Expungement Attorney',
      },
    ],
  },
};

export default function ExpungementPage() {
  const pageData = {
    practiceArea: 'Expungement',
    heroTitle: 'Expungement Attorneys',
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
