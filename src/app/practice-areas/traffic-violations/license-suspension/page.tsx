import { Metadata } from 'next';
import { StandardizedPracticeAreaTemplate } from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'License Suspension | Vasquez Law Firm',
  description: 'Fighting license suspension and restoration',
  keywords: 'license suspension, traffic violations, legal services, attorney, lawyer',
};

export default function LicenseSuspensionPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="traffic-violations"
      subArea="license-suspension"
      language="en"
    />
  );
}
