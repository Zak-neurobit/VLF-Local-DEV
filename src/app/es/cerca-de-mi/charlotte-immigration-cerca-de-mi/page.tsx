'use client';

import { NearMeTemplate } from '@/components/templates/NearMeTemplate';
import { getNearMeCityBySlug, getPracticeAreaByKey } from '@/data/near-me-locations';

export default function CharlotteImmigrationNearMePage() {
  const cityData = getNearMeCityBySlug('charlotte');
  const practiceArea = getPracticeAreaByKey('immigration');
  
  if (!cityData || !practiceArea) {
    return <div>Page not found</div>;
  }

  return (
    <NearMeTemplate
      city={cityData.name}
      state={cityData.state}
      practiceArea={practiceArea}
      nearestOffice={cityData.nearestOffice}
      language="es"
    />
  );
}

export const metadata = {
  title: 'Abogado de Inmigración Cerca de Mi en Charlotte, NC | Vasquez Law Firm',
  description: 'Encuentre el mejor abogado de inmigración cerca de usted en Charlotte, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
  keywords: 'abogado de inmigración cerca de mi, abogado de inmigración Charlotte, abogado Charlotte, abogado de inmigración NC, abogado español Charlotte',
  openGraph: {
    title: 'Abogado de Inmigración Cerca de Mi en Charlotte, NC | Vasquez Law Firm',
    description: 'Encuentre el mejor abogado de inmigración cerca de usted en Charlotte, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-immigration-cerca-de-mi',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/charlotte-immigration-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado de Inmigración Cerca de Mi en Charlotte, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-immigration-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/charlotte-immigration-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-immigration-cerca-de-mi'
    }
  }
};