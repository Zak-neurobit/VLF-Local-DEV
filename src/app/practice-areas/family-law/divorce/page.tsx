import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NC Divorce Lawyer | Separation & Family Law Attorney | Vasquez Law Firm',
  description:
    'Compassionate divorce attorneys in North Carolina. We guide you through separation, absolute divorce, and complex property division. Se habla español.',
  keywords: [
    'divorce lawyer NC',
    'North Carolina divorce attorney',
    'separation agreement lawyer',
    'absolute divorce NC',
    'uncontested divorce attorney',
    'Charlotte divorce lawyer',
    'Raleigh family law attorney',
    'abogado divorcio NC',
    'equitable distribution lawyer',
    'NC divorce process',
  ],
  openGraph: {
    title: 'NC Divorce Lawyer | Compassionate Family Law Attorney',
    description:
      'Navigate your divorce with experienced attorneys who understand NC law. We protect your rights and future.',
    images: [
      {
        url: '/images/divorce-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Divorce Attorney',
      },
    ],
  },
};

export default function DivorcePage() {
  const pageData = {
    practiceArea: 'Divorce',
    title: 'Professional Legal Services',
    description: 'Experienced attorneys providing comprehensive legal representation with personalized attention to your case.',
    heroTitle: 'Divorce Attorneys',
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
