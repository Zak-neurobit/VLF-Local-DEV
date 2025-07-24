import CharlotteSpanishSpeakingCercaDeMiClient from './charlotteSpanishSpeakingNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function CharlotteSpanishSpeakingCercaDeMiPage() {
  return <CharlotteSpanishSpeakingCercaDeMiClient />;
}
export const metadata = {
  title: 'Abogado que Habla Español Cerca de Mi en Charlotte, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado que habla español cerca de usted en Charlotte, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
  keywords:
    'abogado que habla español cerca de mi, abogado que habla español Charlotte, abogado Charlotte, abogado que habla español NC, abogado español Charlotte',
  openGraph: {
    title: 'Abogado que Habla Español Cerca de Mi en Charlotte, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado que habla español cerca de usted en Charlotte, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-spanish-speaking-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/charlotte-spanish-speaking-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado que Habla Español Cerca de Mi en Charlotte, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-spanish-speaking-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/charlotte-immigration-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-spanish-speaking-cerca-de-mi',
    },
  },
};
