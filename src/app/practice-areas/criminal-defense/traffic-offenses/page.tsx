import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'NC Traffic Ticket Lawyer | Speeding & Moving Violations Attorney',
  description:
    'Fight traffic tickets in North Carolina. Our attorneys handle speeding, reckless driving, license issues, and CDL violations. Save your license and insurance rates.',
  keywords: [
    'traffic ticket lawyer NC',
    'North Carolina speeding ticket attorney',
    'reckless driving lawyer NC',
    'CDL traffic violation attorney',
    'license restoration lawyer Charlotte',
    'traffic court attorney Raleigh',
    'moving violation lawyer NC',
    'speeding ticket defense',
    'abogado multas trafico NC',
    'North Carolina DMV attorney',
  ],
  openGraph: {
    title: 'NC Traffic Ticket & Moving Violations Lawyer',
    description:
      "Don't just pay that ticket! We fight traffic violations to protect your license, insurance rates, and driving record.",
    images: [
      {
        url: '/images/traffic-offenses-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Traffic Violations Attorney',
      },
    ],
  },
};

export default function TrafficOffensesPage() {
  return (
    <PracticeAreaWrapper practiceArea="criminal-defense" subArea="traffic-offenses" language="en" />
  );
}
