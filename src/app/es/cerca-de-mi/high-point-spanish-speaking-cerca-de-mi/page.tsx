'use client';

import { NearMeTemplate } from '@/components/templates/NearMeTemplate';
import { getNearMeCityBySlug, getPracticeAreaByKey } from '@/data/near-me-locations';

export default function HighPointSpanishSpeakingNearMePage() {
  const cityData = getNearMeCityBySlug('high-point');
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
  title: 'Abogado que Habla Español Cerca de Mi en High Point, NC | Vasquez Law Firm',
  description: 'Encuentre el mejor abogado que habla español cerca de usted en High Point, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
  keywords: 'abogado que habla español cerca de mi, abogado que habla español High Point, abogado High Point, abogado que habla español NC, abogado español High Point',
  openGraph: {
    title: 'Abogado que Habla Español Cerca de Mi en High Point, NC | Vasquez Law Firm',
    description: 'Encuentre el mejor abogado que habla español cerca de usted en High Point, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/high-point-spanish-speaking-cerca-de-mi',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/high-point-spanish-speaking-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado que Habla Español Cerca de Mi en High Point, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/high-point-spanish-speaking-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/high-point-immigration-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/high-point-spanish-speaking-cerca-de-mi'
    }
  }
};