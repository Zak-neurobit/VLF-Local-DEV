import wilmingtonduiNearMeClient from './wilmingtonduiNearMeClient';

export default function wilmingtonduiNearMePage() {
  return <wilmingtonduiNearMeClient />;
}

export const metadata = {
  title: 'Abogado de DUI Cerca de Mi en Wilmington, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de dui cerca de usted en Wilmington, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords:
    'abogado de dui cerca de mi, abogado de dui Wilmington, abogado Wilmington, abogado de dui NC, abogado español Wilmington',
  openGraph: {
    title: 'Abogado de DUI Cerca de Mi en Wilmington, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de dui cerca de usted en Wilmington, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/wilmington-dui-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/wilmington-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de DUI Cerca de Mi en Wilmington, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/wilmington-dui-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/wilmington-dui-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/wilmington-dui-cerca-de-mi',
    },
  },
};
