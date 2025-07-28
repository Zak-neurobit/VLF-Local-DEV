import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'CDL Violations | Vasquez Law Firm',
  description: 'Defense for commercial driver license violations',
  keywords: 'cdl violations, traffic violations, legal services, attorney, lawyer',
};

export default function CDLViolationsPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="traffic-violations"
      subArea="cdl-violations"
      language="en"
    />
  );
}
