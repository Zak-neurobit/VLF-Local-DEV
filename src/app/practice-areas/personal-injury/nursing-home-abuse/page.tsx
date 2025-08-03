import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Nursing Home Abuse Lawyers NC & FL | Elder Neglect Attorneys | Vasquez Law Firm',
  description:
    'Expert nursing home abuse attorneys in Raleigh, Charlotte, Smithfield & Orlando. Fighting elder abuse, neglect, bedsores, malnutrition. Free consultation.',
  keywords: [
    'nursing home abuse lawyer',
    'elder abuse attorney',
    'nursing home neglect',
    'bedsores',
    'elder malnutrition',
    'assisted living abuse',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Nursing Home Abuse Lawyers | Elder Neglect Attorneys | Vasquez Law Firm',
    description:
      'Expert nursing home abuse attorneys protecting elderly residents from neglect and abuse.',
    type: 'website',
    images: [
      {
        url: '/images/nursing-home-abuse-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Nursing Home Abuse Lawyers',
      },
    ],
  },
};

export default function NursingHomeAbusePage() {
  return (
    <PracticeAreaWrapper
      practiceArea="personal-injury"
      subArea="nursing-home-abuse"
      language="en"
    />
  );
}
