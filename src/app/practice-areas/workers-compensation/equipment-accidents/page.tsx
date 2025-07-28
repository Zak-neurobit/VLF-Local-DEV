import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NC Equipment Accident Workers Comp Lawyer | Machinery Injury Attorney',
  description:
    'Injured by workplace equipment in North Carolina? Our workers comp attorneys fight for maximum benefits for forklift, crane, and industrial accidents.',
  keywords: [
    'equipment accident lawyer NC',
    'machinery injury workers comp attorney',
    'forklift accident lawyer',
    'crane accident workers compensation',
    'industrial equipment injury NC',
    'workplace machinery accident attorney',
  ],
};

export default function EquipmentAccidentsPage() {
  const pageData = {
    practiceArea: 'Equipment Accidents',
    title: 'Professional Legal Services',
    description: 'Experienced attorneys providing comprehensive legal representation with personalized attention to your case.',
    heroTitle: 'Equipment Accidents Attorneys',
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
