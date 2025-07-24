import GreensboroImmigrationCercaDeMiClient from './greensuoroimmigrationNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function GreensboroImmigrationCercaDeMiPage() {
  return <GreensboroImmigrationCercaDeMiClient />;
}

export const metadata = {
  title: 'Abogado de Inmigración Cerca de Mi en Greensboro, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de inmigración cerca de usted en Greensboro, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords:
    'abogado de inmigración cerca de mi, abogado de inmigración Greensboro, abogado Greensboro, abogado de inmigración NC, abogado español Greensboro',
  openGraph: {
    title: 'Abogado de Inmigración Cerca de Mi en Greensboro, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de inmigración cerca de usted en Greensboro, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/greensboro-immigration-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/greensboro-immigration-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de Inmigración Cerca de Mi en Greensboro, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/greensboro-immigration-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/greensboro-immigration-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/greensboro-immigration-cerca-de-mi',
    },
  },
};
