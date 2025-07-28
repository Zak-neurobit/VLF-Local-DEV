import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Reckless Driving | Vasquez Law Firm',
  description: 'Legal defense for reckless driving charges',
  keywords: 'reckless driving, traffic violations, legal services, attorney, lawyer',
};

export default function RecklessDrivingPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="traffic-violations"
      subArea="reckless-driving"
      language="en"
    />
  );
}
