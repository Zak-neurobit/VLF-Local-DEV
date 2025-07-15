'use client';

import { NearMeTemplate } from '@/components/templates/NearMeTemplate';
import { getNearMeCityBySlug, getPracticeAreaByKey } from '@/data/near-me-locations';

export default function ConcordDivorceNearMePage() {
  const cityData = getNearMeCityBySlug('concord');
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
  title: 'Abogado de Divorcio Cerca de Mi en Concord, NC | Vasquez Law Firm',
  description: 'Encuentre el mejor abogado de divorcio cerca de usted en Concord, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
  keywords: 'abogado de divorcio cerca de mi, abogado de divorcio Concord, abogado Concord, abogado de divorcio NC, abogado español Concord',
  openGraph: {
    title: 'Abogado de Divorcio Cerca de Mi en Concord, NC | Vasquez Law Firm',
    description: 'Encuentre el mejor abogado de divorcio cerca de usted en Concord, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/concord-divorce-cerca-de-mi',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/concord-divorce-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado de Divorcio Cerca de Mi en Concord, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/concord-divorce-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/concord-divorce-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/concord-divorce-cerca-de-mi'
    }
  }
};