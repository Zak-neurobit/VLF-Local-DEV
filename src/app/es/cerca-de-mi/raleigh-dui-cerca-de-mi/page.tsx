'use client';

import { NearMeTemplate } from '@/components/templates/NearMeTemplate';
import { getNearMeCityBySlug, getPracticeAreaByKey } from '@/data/near-me-locations';

export default function RaleighDuiNearMePage() {
  const cityData = getNearMeCityBySlug('raleigh');
  const practiceArea = getPracticeAreaByKey('dui');
  
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
  title: 'Abogado de DUI Cerca de Mi en Raleigh, NC | Vasquez Law Firm',
  description: 'Encuentre el mejor abogado de dui cerca de usted en Raleigh, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords: 'abogado de dui cerca de mi, abogado de dui Raleigh, abogado Raleigh, abogado de dui NC, abogado español Raleigh',
  openGraph: {
    title: 'Abogado de DUI Cerca de Mi en Raleigh, NC | Vasquez Law Firm',
    description: 'Encuentre el mejor abogado de dui cerca de usted en Raleigh, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/raleigh-dui-cerca-de-mi',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/raleigh-dui-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado de DUI Cerca de Mi en Raleigh, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/raleigh-dui-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/raleigh-dui-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/raleigh-dui-cerca-de-mi'
    }
  }
};