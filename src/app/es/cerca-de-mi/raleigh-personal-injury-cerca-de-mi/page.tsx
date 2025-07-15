'use client';

import { NearMeTemplate } from '@/components/templates/NearMeTemplate';
import { getNearMeCityBySlug, getPracticeAreaByKey } from '@/data/near-me-locations';

export default function RaleighPersonalInjuryNearMePage() {
  const cityData = getNearMeCityBySlug('raleigh');
  const practiceArea = getPracticeAreaByKey('personal-injury');
  
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
  title: 'Abogado de Lesiones Personales Cerca de Mi en Raleigh, NC | Vasquez Law Firm',
  description: 'Encuentre el mejor abogado de lesiones personales cerca de usted en Raleigh, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords: 'abogado de lesiones personales cerca de mi, abogado de lesiones personales Raleigh, abogado Raleigh, abogado de lesiones personales NC, abogado español Raleigh',
  openGraph: {
    title: 'Abogado de Lesiones Personales Cerca de Mi en Raleigh, NC | Vasquez Law Firm',
    description: 'Encuentre el mejor abogado de lesiones personales cerca de usted en Raleigh, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/raleigh-personal-injury-cerca-de-mi',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/raleigh-personal-injury-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado de Lesiones Personales Cerca de Mi en Raleigh, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/raleigh-personal-injury-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/raleigh-personal-injury-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/raleigh-personal-injury-cerca-de-mi'
    }
  }
};