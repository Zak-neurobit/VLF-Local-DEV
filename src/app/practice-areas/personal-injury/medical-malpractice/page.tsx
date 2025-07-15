import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical Malpractice Lawyers NC & FL | Hospital Negligence | Vasquez Law Firm',
  description:
    'Expert medical malpractice attorneys in Raleigh, Charlotte, Smithfield & Orlando. Surgical errors, misdiagnosis, birth injuries, hospital negligence. Free consultation.',
  keywords: [
    'medical malpractice lawyer',
    'hospital negligence',
    'surgical error',
    'misdiagnosis',
    'birth injury',
    'medication error',
    'medical mistake attorney',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Medical Malpractice Lawyers | Hospital Negligence | Vasquez Law Firm',
    description:
      'Expert medical malpractice attorneys fighting for victims of medical negligence and hospital errors.',
    type: 'website',
    images: [
      {
        url: '/images/medical-malpractice-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Medical Malpractice Lawyers',
      },
    ],
  },
};

export default function MedicalMalpracticePage() {
  const pageData = {
    practiceArea: 'Medical Malpractice',
    title: 'Professional Legal Services',
    description: 'Experienced attorneys providing comprehensive legal representation with personalized attention to your case.',
    heroTitle: 'Medical Malpractice Attorneys',
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
