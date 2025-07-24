import WilmingtonImmigrationCercaDeMiClient from './wilmingtonimmigrationNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function WilmingtonImmigrationCercaDeMiPage() {
  return <WilmingtonImmigrationCercaDeMiClient />;
}

export const metadata = {
  title: 'Abogado de Inmigración Cerca de Mi en Wilmington, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de inmigración cerca de usted en Wilmington, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords:
    'abogado de inmigración cerca de mi, abogado de inmigración Wilmington, abogado Wilmington, abogado de inmigración NC, abogado español Wilmington',
  openGraph: {
    title: 'Abogado de Inmigración Cerca de Mi en Wilmington, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de inmigración cerca de usted en Wilmington, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/wilmington-immigration-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/wilmington-immigration-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de Inmigración Cerca de Mi en Wilmington, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/wilmington-immigration-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/wilmington-immigration-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/wilmington-immigration-cerca-de-mi',
    },
  },
};
