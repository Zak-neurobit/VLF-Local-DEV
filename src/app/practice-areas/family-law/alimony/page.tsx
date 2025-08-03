import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'NC Alimony Lawyer | Spousal Support Attorney | Vasquez Law Firm',
  description:
    'Navigating alimony and spousal support in North Carolina. Whether seeking or defending against alimony, our attorneys protect your financial future. Se habla español.',
  keywords: [
    'alimony lawyer NC',
    'North Carolina spousal support attorney',
    'post separation support lawyer',
    'permanent alimony attorney NC',
    'alimony modification lawyer',
    'Charlotte alimony attorney',
    'Raleigh spousal support lawyer',
    'abogado pension alimenticia',
    'alimony defense attorney NC',
    'spousal support calculation lawyer',
  ],
  openGraph: {
    title: 'NC Alimony & Spousal Support Lawyer',
    description:
      'Experienced representation in alimony cases. We help clients seek fair support or defend against excessive demands.',
    images: [
      {
        url: '/images/alimony-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Alimony Attorney',
      },
    ],
  },
};

export default function AlimonyPage() {
  return <PracticeAreaWrapper practiceArea="family-law" subArea="alimony" language="en" />;
}
