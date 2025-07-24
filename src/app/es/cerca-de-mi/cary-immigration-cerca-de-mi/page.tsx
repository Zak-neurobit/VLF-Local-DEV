import CaryImmigrationCercaDeMiClient from './caryimmigrationNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function CaryImmigrationCercaDeMiPage() {
  return <CaryImmigrationCercaDeMiClient />;
}
export const metadata = {
  title: 'Abogado de Inmigración Cerca de Mi en Cary, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de inmigración cerca de usted en Cary, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords:
    'abogado de inmigración cerca de mi, abogado de inmigración Cary, abogado Cary, abogado de inmigración NC, abogado español Cary',
  openGraph: {
    title: 'Abogado de Inmigración Cerca de Mi en Cary, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de inmigración cerca de usted en Cary, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/cary-immigration-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/cary-immigration-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de Inmigración Cerca de Mi en Cary, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/cary-immigration-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/cary-immigration-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/cary-immigration-cerca-de-mi',
    },
  },
};
