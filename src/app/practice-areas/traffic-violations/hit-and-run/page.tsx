import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Hit and Run | Vasquez Law Firm',
  description: 'Defense against hit and run charges',
  keywords: 'hit and run, traffic violations, legal services, attorney, lawyer',
};

export default function HitandRunPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="traffic-violations"
      subArea="hit-and-run"
      language="en"
    />
  );
}
