import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Theft, Larceny & Shoplifting Defense Attorney | Vasquez Law Firm',
  description: 'Experienced theft crime defense attorneys in North Carolina. Defending against shoplifting, larceny, embezzlement, and theft charges. Free consultation.',
  keywords: 'theft attorney, larceny lawyer, shoplifting defense, North Carolina theft charges, criminal defense attorney, embezzlement lawyer',
  openGraph: {
    title: 'Theft, Larceny & Shoplifting Defense Attorney | Vasquez Law Firm',
    description: 'Protect your future with experienced theft crime defense. Free consultation available.',
    images: ['/images/practice-areas/theft-defense.jpg'],
  },
};

export default function TheftLarcenyShopliftingPage() {
  const pageData = {
    practiceArea: 'Theft Larceny Shoplifting',
    title: 'Professional Legal Services',
    description: 'Experienced attorneys providing comprehensive legal representation with personalized attention to your case.',
    heroTitle: 'Theft Larceny Shoplifting Attorneys',
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
