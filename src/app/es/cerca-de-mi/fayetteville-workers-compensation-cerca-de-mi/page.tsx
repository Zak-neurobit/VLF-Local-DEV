'use client';

import { NearMeTemplate } from '@/components/templates/NearMeTemplate';
import { getNearMeCityBySlug, getPracticeAreaByKey } from '@/data/near-me-locations';

export default function FayettevilleWorkersCompensationNearMePage() {
  const cityData = getNearMeCityBySlug('fayetteville');
  const practiceArea = getPracticeAreaByKey('workers-compensation');
  
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
  title: 'Abogado de Compensación Laboral Cerca de Mi en Fayetteville, NC | Vasquez Law Firm',
  description: 'Encuentre el mejor abogado de compensación laboral cerca de usted en Fayetteville, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords: 'abogado de compensación laboral cerca de mi, abogado de compensación laboral Fayetteville, abogado Fayetteville, abogado de compensación laboral NC, abogado español Fayetteville',
  openGraph: {
    title: 'Abogado de Compensación Laboral Cerca de Mi en Fayetteville, NC | Vasquez Law Firm',
    description: 'Encuentre el mejor abogado de compensación laboral cerca de usted en Fayetteville, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/fayetteville-workers-compensation-cerca-de-mi',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/fayetteville-workers-compensation-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado de Compensación Laboral Cerca de Mi en Fayetteville, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/fayetteville-workers-compensation-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/fayetteville-workers-compensation-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/fayetteville-workers-compensation-cerca-de-mi'
    }
  }
};