import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Speeding Tickets | Vasquez Law Firm',
  description: 'Defense against speeding violations and traffic tickets',
  keywords: 'speeding tickets, traffic violations, legal services, attorney, lawyer',
};

export default function SpeedingTicketsPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="traffic-violations"
      subArea="speeding-tickets"
      language="en"
    />
  );
}
