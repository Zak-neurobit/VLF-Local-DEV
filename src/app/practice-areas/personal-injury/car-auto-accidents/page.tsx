import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Accident Lawyers North Carolina | Auto Accident Attorneys - Vasquez Law Firm',
  description:
    'Top car accident attorneys in NC. Maximum compensation for auto accident victims. Free consultation. No fee unless we win. Call 1-844-YO-PELEO today!',
  openGraph: {
    title: 'Car Accident Lawyers North Carolina | Auto Accident Attorneys - Vasquez Law Firm',
    description:
      'Top car accident attorneys in NC. Maximum compensation for auto accident victims. Free consultation. No fee unless we win. Call 1-844-YO-PELEO today!',
    images: [{ url: '../wp-content/uploads/2024/04/charlotte-nc-car-accident-lawyers.jpg' }],
  },
};

export default function CarAutoAccidentsPage() {
  const pageData = {
    practiceArea: 'Car Auto Accidents',
    title: 'Professional Legal Services',
    description: 'Experienced attorneys providing comprehensive legal representation with personalized attention to your case.',
    heroTitle: 'Car Auto Accidents Attorneys',
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
