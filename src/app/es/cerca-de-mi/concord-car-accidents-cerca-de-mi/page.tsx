import ConcordCarAccidentsCercaDeMiClient from './concordCarAccidentsNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function ConcordCarAccidentsCercaDeMiPage() {
  return <ConcordCarAccidentsCercaDeMiClient />;
}
export const metadata = {
  title: 'Abogado de Accidentes de Auto Cerca de Mi en Concord, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de accidentes de auto cerca de usted en Concord, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
  keywords:
    'abogado de accidentes de auto cerca de mi, abogado de accidentes de auto Concord, abogado Concord, abogado de accidentes de auto NC, abogado español Concord',
  openGraph: {
    title: 'Abogado de Accidentes de Auto Cerca de Mi en Concord, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de accidentes de auto cerca de usted en Concord, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/concord-car-accidents-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/concord-car-accidents-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de Accidentes de Auto Cerca de Mi en Concord, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/concord-car-accidents-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/concord-car-accidents-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/concord-car-accidents-cerca-de-mi',
    },
  },
};
