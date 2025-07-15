'use client';

import { NearMeTemplate } from '@/components/templates/NearMeTemplate';
import { getNearMeCityBySlug, getPracticeAreaByKey } from '@/data/near-me-locations';

export default function WinstonSalemWorkersCompensationNearMePage() {
  const cityData = getNearMeCityBySlug('winston-salem');
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
  title: 'Abogado de Compensación Laboral Cerca de Mi en Winston-Salem, NC | Vasquez Law Firm',
  description: 'Encuentre el mejor abogado de compensación laboral cerca de usted en Winston-Salem, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
  keywords: 'abogado de compensación laboral cerca de mi, abogado de compensación laboral Winston-Salem, abogado Winston-Salem, abogado de compensación laboral NC, abogado español Winston-Salem',
  openGraph: {
    title: 'Abogado de Compensación Laboral Cerca de Mi en Winston-Salem, NC | Vasquez Law Firm',
    description: 'Encuentre el mejor abogado de compensación laboral cerca de usted en Winston-Salem, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/winston-salem-workers-compensation-cerca-de-mi',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/winston-salem-workers-compensation-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado de Compensación Laboral Cerca de Mi en Winston-Salem, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/winston-salem-workers-compensation-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/winston-salem-workers-compensation-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/winston-salem-workers-compensation-cerca-de-mi'
    }
  }
};