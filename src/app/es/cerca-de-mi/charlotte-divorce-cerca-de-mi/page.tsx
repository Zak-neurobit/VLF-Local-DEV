'use client';

import { NearMeTemplate } from '@/components/templates/NearMeTemplate';
import { getNearMeCityBySlug, getPracticeAreaByKey } from '@/data/near-me-locations';

export default function CharlotteDivorceNearMePage() {
  const cityData = getNearMeCityBySlug('charlotte');
  const practiceArea = getPracticeAreaByKey('divorce');
  
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
  title: 'Abogado de Divorcio Cerca de Mi en Charlotte, NC | Vasquez Law Firm',
  description: 'Encuentre el mejor abogado de divorcio cerca de usted en Charlotte, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
  keywords: 'abogado de divorcio cerca de mi, abogado de divorcio Charlotte, abogado Charlotte, abogado de divorcio NC, abogado español Charlotte',
  openGraph: {
    title: 'Abogado de Divorcio Cerca de Mi en Charlotte, NC | Vasquez Law Firm',
    description: 'Encuentre el mejor abogado de divorcio cerca de usted en Charlotte, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-divorce-cerca-de-mi',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/charlotte-divorce-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado de Divorcio Cerca de Mi en Charlotte, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-divorce-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/charlotte-divorce-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-divorce-cerca-de-mi'
    }
  }
};