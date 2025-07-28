import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premises Liability & Slip and Fall Lawyers NC & FL | Vasquez Law Firm',
  description:
    'Expert premises liability attorneys in Raleigh, Charlotte, Smithfield & Orlando. Slip and fall accidents, unsafe property conditions, negligent security. Free consultation.',
  keywords: [
    'slip and fall lawyer',
    'premises liability attorney',
    'trip and fall',
    'unsafe property',
    'negligent security',
    'store accident',
    'apartment injury',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Premises Liability & Slip and Fall Lawyers | Vasquez Law Firm',
    description:
      'Expert premises liability attorneys fighting for victims injured on unsafe properties.',
    type: 'website',
    images: [
      {
        url: '/images/premises-liability-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Premises Liability and Slip and Fall Lawyers',
      },
    ],
  },
};

export default function PremisesLiabilityPage() {
  const pageData = {
    practiceArea: 'Premises Liability',
    title: 'Professional Legal Services',
    description: 'Experienced attorneys providing comprehensive legal representation with personalized attention to your case.',
    heroTitle: 'Premises Liability Attorneys',
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

  return <PracticeAreaWrapper {...pageData} />;
}
