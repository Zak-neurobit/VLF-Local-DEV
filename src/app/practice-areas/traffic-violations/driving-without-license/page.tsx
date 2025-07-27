import { Metadata } from 'next';
import { StandardizedPracticeAreaTemplate } from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Driving Without License | Vasquez Law Firm',
  description: 'Legal help for driving without a valid license',
  keywords: 'driving without license, traffic violations, legal services, attorney, lawyer',
};

export default function DrivingWithoutLicensePage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="traffic-violations"
      subArea="driving-without-license"
      language="en"
    />
  );
}
