import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NC Traffic Ticket Lawyer | Speeding & Moving Violations Attorney',
  description:
    'Fight traffic tickets in North Carolina. Our attorneys handle speeding, reckless driving, license issues, and CDL violations. Save your license and insurance rates.',
  keywords: [
    'traffic ticket lawyer NC',
    'North Carolina speeding ticket attorney',
    'reckless driving lawyer NC',
    'CDL traffic violation attorney',
    'license restoration lawyer Charlotte',
    'traffic court attorney Raleigh',
    'moving violation lawyer NC',
    'speeding ticket defense',
    'abogado multas trafico NC',
    'North Carolina DMV attorney',
  ],
  openGraph: {
    title: 'NC Traffic Ticket & Moving Violations Lawyer',
    description:
      "Don't just pay that ticket! We fight traffic violations to protect your license, insurance rates, and driving record.",
    images: [
      {
        url: '/images/traffic-offenses-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Traffic Violations Attorney',
      },
    ],
  },
};

export default function TrafficOffensesPage() {
  const pageData = {
    practiceArea: 'Traffic Offenses',
    title: 'Professional Legal Services',
    description: 'Experienced attorneys providing comprehensive legal representation with personalized attention to your case.',
    heroTitle: 'Traffic Offenses Attorneys',
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
