import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Domestic Violence Defense Lawyers NC & FL | Protective Orders | Vasquez Law Firm',
  description:
    'Expert domestic violence defense attorneys in Raleigh, Charlotte, Smithfield & Orlando. Defending false accusations, protective order violations, and domestic assault charges.',
  keywords:
    'domestic violence lawyer, protective order attorney, restraining order defense, domestic assault, false accusations, 50B order, criminal defense, Raleigh NC, Charlotte NC, Orlando FL',
  openGraph: {
    title: 'Domestic Violence Defense Lawyers | Protective Orders | Vasquez Law Firm',
    description:
      'Expert domestic violence defense attorneys protecting your rights against false accusations.',
    type: 'website',
    images: [
      {
        url: '/images/domestic-violence-defense-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Domestic Violence Defense Lawyers',
      },
    ],
  },
};

export default function DomesticViolencePage() {
  return (
    <PracticeAreaWrapper
      practiceArea="criminal-defense"
      subArea="domestic-violence"
      language="en"
    />
  );
}
