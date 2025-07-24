import GreensboroSpanishSpeakingCercaDeMiClient from './greensuoroSpanishSpeakingNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function GreensboroSpanishSpeakingCercaDeMiPage() {
  return <GreensboroSpanishSpeakingCercaDeMiClient />;
}
export const metadata = {
  title: 'Abogado que Habla Español Cerca de Mi en Greensboro, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado que habla español cerca de usted en Greensboro, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords:
    'abogado que habla español cerca de mi, abogado que habla español Greensboro, abogado Greensboro, abogado que habla español NC, abogado español Greensboro',
  openGraph: {
    title: 'Abogado que Habla Español Cerca de Mi en Greensboro, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado que habla español cerca de usted en Greensboro, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/greensboro-spanish-speaking-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/greensboro-spanish-speaking-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado que Habla Español Cerca de Mi en Greensboro, NC',
      },
    ],
  },
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/es/cerca-de-mi/greensboro-spanish-speaking-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/greensboro-immigration-near-me',
      'es-ES':
        'https://www.vasquezlawnc.com/es/cerca-de-mi/greensboro-spanish-speaking-cerca-de-mi',
    },
  },
};
