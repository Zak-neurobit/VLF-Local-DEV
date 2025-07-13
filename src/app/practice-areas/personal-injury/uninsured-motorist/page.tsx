import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Uninsured Motorist Accident Lawyer NC | UM/UIM Claims Attorney',
  description:
    'Hit by an uninsured or underinsured driver in North Carolina? Our UM/UIM attorneys fight insurance companies for the compensation you deserve.',
  keywords: [
    'uninsured motorist lawyer NC',
    'underinsured motorist attorney North Carolina',
    'UM UIM claims lawyer',
    'uninsured driver accident NC',
    'underinsured motorist coverage',
    'Charlotte uninsured motorist attorney',
  ],
  openGraph: {
    title: 'NC Uninsured/Underinsured Motorist Claims Lawyer',
    description:
      "Hit by an uninsured driver? Don't let lack of insurance leave you without compensation. We fight for your UM/UIM benefits.",
    images: [
      {
        url: '/images/uninsured-motorist-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Uninsured Motorist Claims Attorney North Carolina',
      },
    ],
  },
};

export default function UninsuredMotoristPage() {
  const pageData = {
    practiceArea: 'Uninsured Motorist',
    heroTitle: 'Uninsured Motorist Attorneys',
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
