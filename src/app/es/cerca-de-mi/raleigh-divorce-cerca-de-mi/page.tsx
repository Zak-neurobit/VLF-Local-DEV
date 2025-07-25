import RaleighDivorceCercaDeMiClient from './raleighdivorceNearMeClient';

export default function RaleighDivorceCercaDeMiPage() {
  return <RaleighDivorceCercaDeMiClient />;
}

export const metadata = {
  title: 'Abogado de Divorcio Cerca de Mi en Raleigh, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de divorcio cerca de usted en Raleigh, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords:
    'abogado de divorcio cerca de mi, abogado de divorcio Raleigh, abogado Raleigh, abogado de divorcio NC, abogado español Raleigh',
  openGraph: {
    title: 'Abogado de Divorcio Cerca de Mi en Raleigh, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de divorcio cerca de usted en Raleigh, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/raleigh-divorce-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/raleigh-divorce-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de Divorcio Cerca de Mi en Raleigh, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/raleigh-divorce-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/raleigh-divorce-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/raleigh-divorce-cerca-de-mi',
    },
  },
};
