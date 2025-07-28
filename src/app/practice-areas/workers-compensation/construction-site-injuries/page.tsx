import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Construction Site Injury Lawyers NC & FL | Workers Comp | Vasquez Law Firm',
  description:
    'Expert construction accident attorneys in Raleigh, Charlotte, Smithfield & Orlando. Falls, equipment injuries, electrocutions. Get workers comp benefits.',
  keywords: [
    'construction accident lawyer',
    'construction site injury',
    'workers compensation',
    'scaffold falls',
    'equipment accidents',
    'OSHA violations',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Construction Site Injury Lawyers | Workers Comp | Vasquez Law Firm',
    description:
      'Expert construction accident attorneys fighting for injured construction workers rights and benefits.',
    type: 'website',
    images: [
      {
        url: '/images/construction-site-injury-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Construction Site Injury Lawyers',
      },
    ],
  },
};

export default function ConstructionSiteInjuriesPage() {
  const pageData = {
    practiceArea: 'Construction Site Injuries',
    title: 'Professional Legal Services',
    description: 'Experienced attorneys providing comprehensive legal representation with personalized attention to your case.',
    heroTitle: 'Construction Site Injuries Attorneys',
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
