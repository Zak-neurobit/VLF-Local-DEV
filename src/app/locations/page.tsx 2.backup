import { Metadata } from 'next';
import Script from 'next/script';
import LocationsPageClient from './LocationsPageClient';

export const metadata: Metadata = {
  title: 'Office Locations - Vasquez Law Firm | NC & FL Legal Services',
  description: 'Visit our 4 convenient office locations across North Carolina and Florida. Smithfield, Raleigh, Charlotte, and Orlando offices with bilingual staff ready to serve you.',
  keywords: 'Vasquez Law Firm locations, NC law offices, FL law offices, immigration lawyer offices, personal injury attorney locations, bilingual law firm',
  openGraph: {
    title: 'Office Locations - Vasquez Law Firm | NC & FL Legal Services',
    description: '4 convenient locations in NC & FL. Free parking, wheelchair accessible, bilingual staff. Schedule your consultation today.',
    images: [{ url: '/images/locations-hero.jpg' }],
    url: 'https://www.vasquezlawnc.com/locations',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vasquez Law Firm Office Locations | NC & FL',
    description: '4 convenient locations with bilingual staff. Free consultation available.',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/locations',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones',
    },
  },
};

export default function Page() {
  return <LocationsPageClient />;
}

