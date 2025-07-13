import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DWI/DUI Defense Attorney - YO PELEO POR TI™ | Vasquez Law Firm',
  description:
    'Aggressive DWI/DUI defense lawyers. Protect your license & freedom. 24/7 emergency response. License restoration help. Call 1-844-YO-PELEO now!',
  keywords: [
    'DWI attorney',
    'DUI lawyer',
    'drunk driving defense',
    'license restoration',
    'breathalyzer test',
    'field sobriety test',
    'North Carolina DWI defense',
  ],
  openGraph: {
    title: 'DWI/DUI Defense - I FIGHT FOR YOUR FREEDOM | Vasquez Law Firm',
    description:
      'Aggressive DWI/DUI defense attorneys. Protect your driving privileges and freedom. Emergency legal response available 24/7.',
    images: [
      {
        url: '/images/dwi-defense.jpg',
      }

export default function DwiDrunkDrivingPage() {
  const pageData = {
    practiceArea: 'Dwi Drunk Driving',
    heroTitle: 'Dwi Drunk Driving Attorneys',
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
