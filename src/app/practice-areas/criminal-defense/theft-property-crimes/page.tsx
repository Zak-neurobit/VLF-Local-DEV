import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Theft & Property Crime Defense Lawyers NC & FL | Vasquez Law Firm',
  description:
    'Expert theft and property crime defense attorneys in Raleigh, Charlotte, Smithfield & Orlando. Shoplifting, burglary, robbery, embezzlement, fraud defense.',
  keywords: [
    'theft defense lawyer',
    'property crime attorney',
    'shoplifting',
    'burglary',
    'robbery',
    'embezzlement',
    'fraud',
    'larceny',
    'criminal defense',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Theft & Property Crime Defense Lawyers | Vasquez Law Firm',
    description:
      'Expert theft and property crime defense attorneys protecting your freedom and future.',
    type: 'website',
    images: [
      {
        url: '/images/theft-property-crime-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Theft and Property Crime Defense Lawyers',
      }

export default function TheftPropertyCrimesPage() {
  const pageData = {
    practiceArea: 'Theft Property Crimes',
    heroTitle: 'Theft Property Crimes Attorneys',
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
