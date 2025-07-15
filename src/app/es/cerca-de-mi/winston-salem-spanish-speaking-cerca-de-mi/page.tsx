'use client';

import { NearMeTemplate } from '@/components/templates/NearMeTemplate';
import { getNearMeCityBySlug, getPracticeAreaByKey } from '@/data/near-me-locations';

export default function WinstonSalemSpanishSpeakingNearMePage() {
  const cityData = getNearMeCityBySlug('winston-salem');
  const practiceArea = getPracticeAreaByKey('spanish-speaking');
  
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
  title: 'Abogado que Habla Español Cerca de Mi en Winston-Salem, NC | Vasquez Law Firm',
  description: 'Encuentre el mejor abogado que habla español cerca de usted en Winston-Salem, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
  keywords: 'abogado que habla español cerca de mi, abogado que habla español Winston-Salem, abogado Winston-Salem, abogado que habla español NC, abogado español Winston-Salem',
  openGraph: {
    title: 'Abogado que Habla Español Cerca de Mi en Winston-Salem, NC | Vasquez Law Firm',
    description: 'Encuentre el mejor abogado que habla español cerca de usted en Winston-Salem, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/winston-salem-spanish-speaking-cerca-de-mi',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/winston-salem-spanish-speaking-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado que Habla Español Cerca de Mi en Winston-Salem, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/winston-salem-spanish-speaking-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/winston-salem-immigration-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/winston-salem-spanish-speaking-cerca-de-mi'
    }
  }
};