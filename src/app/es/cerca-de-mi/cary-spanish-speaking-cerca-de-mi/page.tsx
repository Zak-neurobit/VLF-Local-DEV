import CarySpanishSpeakingCercaDeMiClient from './carySpanishSpeakingNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function CarySpanishSpeakingCercaDeMiPage() {
  return <CarySpanishSpeakingCercaDeMiClient />;
}
export const metadata = {
  title: 'Abogado que Habla Español Cerca de Mi en Cary, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado que habla español cerca de usted en Cary, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords:
    'abogado que habla español cerca de mi, abogado que habla español Cary, abogado Cary, abogado que habla español NC, abogado español Cary',
  openGraph: {
    title: 'Abogado que Habla Español Cerca de Mi en Cary, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado que habla español cerca de usted en Cary, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/cary-spanish-speaking-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/cary-spanish-speaking-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado que Habla Español Cerca de Mi en Cary, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/cary-spanish-speaking-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/cary-immigration-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/cary-spanish-speaking-cerca-de-mi',
    },
  },
};
