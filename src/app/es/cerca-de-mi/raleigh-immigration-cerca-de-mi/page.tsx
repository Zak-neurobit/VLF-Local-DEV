import RaleighImmigrationCercaDeMiClient from './raleighimmigrationNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function RaleighImmigrationCercaDeMiPage() {
  return <RaleighImmigrationCercaDeMiClient />;
}

export const metadata = {
  title: 'Abogado de Inmigración Cerca de Mi en Raleigh, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de inmigración cerca de usted en Raleigh, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords:
    'abogado de inmigración cerca de mi, abogado de inmigración Raleigh, abogado Raleigh, abogado de inmigración NC, abogado español Raleigh',
  openGraph: {
    title: 'Abogado de Inmigración Cerca de Mi en Raleigh, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de inmigración cerca de usted en Raleigh, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/raleigh-immigration-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/raleigh-immigration-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de Inmigración Cerca de Mi en Raleigh, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/raleigh-immigration-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/raleigh-immigration-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/raleigh-immigration-cerca-de-mi',
    },
  },
};
