import CaryDuiCercaDeMiClient from './caryduiNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function CaryDuiCercaDeMiPage() {
  return <CaryDuiCercaDeMiClient />;
}
export const metadata = {
  title: 'Abogado de DUI Cerca de Mi en Cary, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de dui cerca de usted en Cary, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords:
    'abogado de dui cerca de mi, abogado de dui Cary, abogado Cary, abogado de dui NC, abogado español Cary',
  openGraph: {
    title: 'Abogado de DUI Cerca de Mi en Cary, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de dui cerca de usted en Cary, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/cary-dui-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/cary-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de DUI Cerca de Mi en Cary, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/cary-dui-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/cary-dui-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/cary-dui-cerca-de-mi',
    },
  },
};
