import GreensboroCarAccidentsCercaDeMiClient from './greensboroCarAccidentsNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function GreensboroCarAccidentsCercaDeMiPage() {
  return <GreensboroCarAccidentsCercaDeMiClient />;
}
export const metadata = {
  title: 'Abogado de Accidentes de Auto Cerca de Mi en Greensboro, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de accidentes de auto cerca de usted en Greensboro, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords:
    'abogado de accidentes de auto cerca de mi, abogado de accidentes de auto Greensboro, abogado Greensboro, abogado de accidentes de auto NC, abogado español Greensboro',
  openGraph: {
    title: 'Abogado de Accidentes de Auto Cerca de Mi en Greensboro, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de accidentes de auto cerca de usted en Greensboro, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/greensboro-car-accidents-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/greensboro-car-accidents-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de Accidentes de Auto Cerca de Mi en Greensboro, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/greensboro-car-accidents-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/greensboro-car-accidents-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/greensboro-car-accidents-cerca-de-mi',
    },
  },
};
