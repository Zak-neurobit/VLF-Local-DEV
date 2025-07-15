'use client';

import { NearMeTemplate } from '@/components/templates/NearMeTemplate';
import { getNearMeCityBySlug, getPracticeAreaByKey } from '@/data/near-me-locations';

export default function WilmingtonPersonalInjuryNearMePage() {
  const cityData = getNearMeCityBySlug('wilmington');
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
  title: 'Abogado de Lesiones Personales Cerca de Mi en Wilmington, NC | Vasquez Law Firm',
  description: 'Encuentre el mejor abogado de lesiones personales cerca de usted en Wilmington, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords: 'abogado de lesiones personales cerca de mi, abogado de lesiones personales Wilmington, abogado Wilmington, abogado de lesiones personales NC, abogado español Wilmington',
  openGraph: {
    title: 'Abogado de Lesiones Personales Cerca de Mi en Wilmington, NC | Vasquez Law Firm',
    description: 'Encuentre el mejor abogado de lesiones personales cerca de usted en Wilmington, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/wilmington-personal-injury-cerca-de-mi',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/wilmington-personal-injury-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado de Lesiones Personales Cerca de Mi en Wilmington, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/wilmington-personal-injury-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/wilmington-personal-injury-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/wilmington-personal-injury-cerca-de-mi'
    }
  }
};