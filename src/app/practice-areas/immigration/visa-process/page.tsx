import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Raleigh, NC Immigrant Visa Attorneys - Vasquez Law Firm, PLLC',
  description:
    'Need a visa? Raleigh, NC immigrant visa attorneys provide expert legal guidance for work, family, and investor visas. Get trusted representation today.',
  openGraph: {
    title: 'Raleigh, NC Immigrant Visa Attorneys - Vasquez Law Firm, PLLC',
    description:
      'Need a visa? Raleigh, NC immigrant visa attorneys provide expert legal guidance for work, family, and investor visas. Get trusted representation today.',
    images: [
      {
        url: '../../wp-content/uploads/2024/04/charlotte-immigrant-visa-application-attorneys.jpg',
      }

export default function VisaProcessPage() {
  const pageData = {
    practiceArea: 'Visa Process',
    heroTitle: 'Visa Process Attorneys',
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
