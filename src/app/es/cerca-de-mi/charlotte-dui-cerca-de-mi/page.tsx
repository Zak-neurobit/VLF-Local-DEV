import CharlotteDuiCercaDeMiClient from './charlotteduiNearMeClient';

export default function CharlotteDuiCercaDeMiPage() {
  return <CharlotteDuiCercaDeMiClient />;
}
export const metadata = {
  title: 'Abogado de DUI Cerca de Mi en Charlotte, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de dui cerca de usted en Charlotte, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
  keywords:
    'abogado de dui cerca de mi, abogado de dui Charlotte, abogado Charlotte, abogado de dui NC, abogado español Charlotte',
  openGraph: {
    title: 'Abogado de DUI Cerca de Mi en Charlotte, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de dui cerca de usted en Charlotte, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-dui-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/charlotte-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de DUI Cerca de Mi en Charlotte, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-dui-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/charlotte-dui-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-dui-cerca-de-mi',
    },
  },
};
