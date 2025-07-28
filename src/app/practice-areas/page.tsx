import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Practice Areas - Vasquez Law Firm - YO PELEO POR TI™',
  description:
    'Comprehensive legal services in immigration, personal injury, workers compensation, criminal defense, family law, and traffic violations. Enhanced with AI technology.',
  keywords:
    'practice areas, immigration lawyer, personal injury attorney, workers compensation, criminal defense, family law, traffic violations, NC attorney',
  openGraph: {
    title: 'Practice Areas - Vasquez Law Firm',
    description:
      'Full-service legal representation enhanced with AI technology. 60+ years combined experience.',
    images: [{ url: '/images/BANNER_TRANS.PNG' }],
  },
};

export default function PracticeAreasPage() {
  const pageData = {
    practiceArea: 'Practice Areas',
    title: 'Professional Legal Services',
    description: 'Experienced attorneys providing comprehensive legal representation with personalized attention to your case.',
    heroTitle: 'Practice Areas Attorneys',
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
