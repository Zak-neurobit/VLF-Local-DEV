import FayettevilleDuiCercaDeMiClient from './fayettevilleduiNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function FayettevilleDuiCercaDeMiPage() {
  return <FayettevilleDuiCercaDeMiClient />;
}
export const metadata = {
  title: 'Abogado de DUI Cerca de Mi en Fayetteville, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de dui cerca de usted en Fayetteville, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords:
    'abogado de dui cerca de mi, abogado de dui Fayetteville, abogado Fayetteville, abogado de dui NC, abogado español Fayetteville',
  openGraph: {
    title: 'Abogado de DUI Cerca de Mi en Fayetteville, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de dui cerca de usted en Fayetteville, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/fayetteville-dui-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/fayetteville-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de DUI Cerca de Mi en Fayetteville, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/fayetteville-dui-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/fayetteville-dui-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/fayetteville-dui-cerca-de-mi',
    },
  },
};
