import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Probation Violation Defense Attorney | Vasquez Law Firm',
  description: 'Experienced probation violation defense attorneys in North Carolina. Protect your freedom and avoid jail time. Free consultation available 24/7.',
  keywords: 'probation violation attorney, probation violation lawyer, violated probation, North Carolina probation violation, criminal defense attorney',
  openGraph: {
    title: 'Probation Violation Defense Attorney | Vasquez Law Firm',
    description: 'Protect your freedom with experienced probation violation defense. Available 24/7.',
    images: ['/images/practice-areas/probation-violation.jpg'],
  },
};

export default function ProbationViolationPage() {
  const pageData = {
    practiceArea: 'Probation Violation',
    title: 'Professional Legal Services',
    description: 'Experienced attorneys providing comprehensive legal representation with personalized attention to your case.',
    heroTitle: 'Probation Violation Attorneys',
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
