import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Speeding Tickets | Vasquez Law Firm',
  description: 'Defense against speeding violations and traffic tickets',
  keywords: 'speeding tickets, traffic violations, legal services, attorney, lawyer',
};

export default function SpeedingTicketsPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="traffic-violations"
      subArea="speeding-tickets"
      language="en"
    />
  );
}
