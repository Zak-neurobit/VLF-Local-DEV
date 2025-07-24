import WinstonSalemCarAccidentsCercaDeMiClient from './WinstonSalemCarAccidentsNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function WinstonSalemCarAccidentsCercaDeMiPage() {
  return <WinstonSalemCarAccidentsCercaDeMiClient />;
}
export const metadata = {
  title: 'Abogado de Accidentes de Auto Cerca de Mi en Winston-Salem, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de accidentes de auto cerca de usted en Winston-Salem, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
  keywords:
    'abogado de accidentes de auto cerca de mi, abogado de accidentes de auto Winston-Salem, abogado Winston-Salem, abogado de accidentes de auto NC, abogado español Winston-Salem',
  openGraph: {
    title: 'Abogado de Accidentes de Auto Cerca de Mi en Winston-Salem, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de accidentes de auto cerca de usted en Winston-Salem, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/winston-salem-car-accidents-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/winston-salem-car-accidents-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de Accidentes de Auto Cerca de Mi en Winston-Salem, NC',
      },
    ],
  },
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/es/cerca-de-mi/winston-salem-car-accidents-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/winston-salem-car-accidents-near-me',
      'es-ES':
        'https://www.vasquezlawnc.com/es/cerca-de-mi/winston-salem-car-accidents-cerca-de-mi',
    },
  },
};
