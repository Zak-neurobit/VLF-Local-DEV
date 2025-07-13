import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drug Crime Defense Lawyers NC & FL | Possession & Trafficking | Vasquez Law Firm',
  description:
    'Expert drug crime defense attorneys in Raleigh, Charlotte, Smithfield & Orlando. Possession, trafficking, manufacturing, distribution charges. Aggressive defense.',
  keywords:
    'drug crime lawyer, drug possession attorney, drug trafficking defense, controlled substance, narcotics attorney, marijuana lawyer, Raleigh NC, Charlotte NC, Orlando FL',
  openGraph: {
    title: 'Drug Crime Defense Lawyers | Possession & Trafficking | Vasquez Law Firm',
    description:
      'Expert drug crime defense attorneys fighting possession, trafficking, and distribution charges.',
    type: 'website',
    images: [
      {
        url: '/images/drug-crime-defense-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Drug Crime Defense Lawyers',
      }

export default function DrugCrimesPage() {
  const pageData = {
    practiceArea: 'Drug Crimes',
    heroTitle: 'Drug Crimes Attorneys',
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
