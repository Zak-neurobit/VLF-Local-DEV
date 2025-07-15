'use client';

import { NearMeTemplate } from '@/components/templates/NearMeTemplate';
import { getNearMeCityBySlug, getPracticeAreaByKey } from '@/data/near-me-locations';

export default function DurhamImmigrationNearMePage() {
  const cityData = getNearMeCityBySlug('durham');
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
  title: 'Abogado de Inmigración Cerca de Mi en Durham, NC | Vasquez Law Firm',
  description: 'Encuentre el mejor abogado de inmigración cerca de usted en Durham, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords: 'abogado de inmigración cerca de mi, abogado de inmigración Durham, abogado Durham, abogado de inmigración NC, abogado español Durham',
  openGraph: {
    title: 'Abogado de Inmigración Cerca de Mi en Durham, NC | Vasquez Law Firm',
    description: 'Encuentre el mejor abogado de inmigración cerca de usted en Durham, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/durham-immigration-cerca-de-mi',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/durham-immigration-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado de Inmigración Cerca de Mi en Durham, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/durham-immigration-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/durham-immigration-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/durham-immigration-cerca-de-mi'
    }
  }
};