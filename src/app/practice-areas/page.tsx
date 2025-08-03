import PracticeAreasPageContent from '@/components/PracticeAreasPageContent';
import { Metadata } from 'next';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Practice Areas - Vasquez Law Firm - YO PELEO POR TI™',
  description:
    'Comprehensive legal services in immigration, personal injury, workers compensation, criminal defense, family law, and traffic violations. Enhanced with AI technology.',
  keywords:
    'practice areas, immigration lawyer, personal injury attorney, workers compensation, criminal defense, family law, traffic violations, NC attorney',
  openGraph: {
    title: 'Practice Areas - Vasquez Law Firm',
    description:
      'Full-service legal representation enhanced with AI technology. 60+ years combined experience.',
    images: [{ url: '/images/BANNER_TRANS.PNG' }],
  },
};

export default function PracticeAreasPage() {
  return <PracticeAreasPageContent language="en" />;
}
