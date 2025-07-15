import { Metadata } from 'next';
import ScholarshipsPageClient from '@/components/Scholarships/ScholarshipsPageClient';

export const metadata: Metadata = {
  title: 'DACA Dreamer Scholarship | Vasquez Law Firm - I FIGHT FOR YOU™',
  description:
    '$1,000 per semester for DACA recipients pursuing higher education. Financial support for dreamers. Deadline: November 27, 2024.',
  keywords:
    'DACA scholarship, dreamer scholarship, DACA financial aid, DACA higher education, Vasquez Law Firm scholarship',
  openGraph: {
    title: 'Vasquez Law Firm DACA Dreamer Scholarship',
    description: '$1,000 per semester for DACA recipients. Empowering dreams through education.',
    type: 'website',
    url: 'https://www.vasquezlawnc.com/scholarships',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/scholarship-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DACA Dreamer Scholarship',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/scholarships',
    languages: {
      en: '/scholarships',
      es: '/es/becas',
    },
  },
};

export default function ScholarshipsPage() {
  return <ScholarshipsPageClient language="en" />;
}
