import HighPointDivorceCercaDeMiClient from './HighPointdivorceNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function HighPointDivorceCercaDeMiPage() {
  return <HighPointDivorceCercaDeMiClient />;
}
export const metadata = {
  title: 'Abogado de Divorcio Cerca de Mi en High Point, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de divorcio cerca de usted en High Point, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
  keywords:
    'abogado de divorcio cerca de mi, abogado de divorcio High Point, abogado High Point, abogado de divorcio NC, abogado español High Point',
  openGraph: {
    title: 'Abogado de Divorcio Cerca de Mi en High Point, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de divorcio cerca de usted en High Point, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/high-point-divorce-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/high-point-divorce-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de Divorcio Cerca de Mi en High Point, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/high-point-divorce-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/high-point-divorce-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/high-point-divorce-cerca-de-mi',
    },
  },
};
