import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nursing Home Abuse Lawyers NC & FL | Elder Neglect Attorneys | Vasquez Law Firm',
  description:
    'Expert nursing home abuse attorneys in Raleigh, Charlotte, Smithfield & Orlando. Fighting elder abuse, neglect, bedsores, malnutrition. Free consultation.',
  keywords: [
    'nursing home abuse lawyer',
    'elder abuse attorney',
    'nursing home neglect',
    'bedsores',
    'elder malnutrition',
    'assisted living abuse',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Nursing Home Abuse Lawyers | Elder Neglect Attorneys | Vasquez Law Firm',
    description:
      'Expert nursing home abuse attorneys protecting elderly residents from neglect and abuse.',
    type: 'website',
    images: [
      {
        url: '/images/nursing-home-abuse-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Nursing Home Abuse Lawyers',
      }

export default function NursingHomeAbusePage() {
  const pageData = {
    practiceArea: 'Nursing Home Abuse',
    heroTitle: 'Nursing Home Abuse Attorneys',
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
