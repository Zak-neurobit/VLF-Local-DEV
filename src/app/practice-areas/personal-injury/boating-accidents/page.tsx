import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NC Boating Accident Lawyer | Watercraft Injury Attorney | Vasquez Law Firm',
  description:
    'Injured in a boating or watercraft accident in North Carolina? Our experienced maritime attorneys fight for victims on NC lakes and coastal waters. Se habla español.',
  keywords: [
    'boating accident lawyer NC',
    'North Carolina watercraft accident attorney',
    'boat crash lawyer Lake Norman',
    'Jordan Lake boating accident attorney',
    'NC maritime injury lawyer',
    'jet ski accident lawyer North Carolina',
    'abogado accidente barco',
    'Outer Banks boating accident attorney',
    'NC boat accident compensation',
    'watercraft injury claim North Carolina',
  ],
  openGraph: {
    title: 'NC Boating Accident Lawyer | Watercraft Injury Attorney',
    description:
      'Fighting for boating accident victims on North Carolina waters. We overcome contributory negligence defenses and maritime law complexities. Free consultation.',
    images: [
      {
        url: '/images/boating-accident-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Boating Accident Attorney',
      }

export default function BoatingAccidentsPage() {
  const pageData = {
    practiceArea: 'Boating Accidents',
    heroTitle: 'Boating Accidents Attorneys',
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
