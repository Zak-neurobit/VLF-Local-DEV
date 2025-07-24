import GreensboroDuiCercaDeMiClient from './greensuoroduiNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function GreensboroDuiCercaDeMiPage() {
  return <GreensboroDuiCercaDeMiClient />;
}

export const metadata = {
  title: 'Abogado de DUI Cerca de Mi en Greensboro, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de dui cerca de usted en Greensboro, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords:
    'abogado de dui cerca de mi, abogado de dui Greensboro, abogado Greensboro, abogado de dui NC, abogado español Greensboro',
  openGraph: {
    title: 'Abogado de DUI Cerca de Mi en Greensboro, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de dui cerca de usted en Greensboro, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/greensboro-dui-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/greensboro-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de DUI Cerca de Mi en Greensboro, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/greensboro-dui-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/greensboro-dui-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/greensboro-dui-cerca-de-mi',
    },
  },
};
