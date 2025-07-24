import CaryDivorceCercaDeMiClient from './carydivorceNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function CaryDivorceCercaDeMiPage() {
  return <CaryDivorceCercaDeMiClient />;
}
export const metadata = {
  title: 'Abogado de Divorcio Cerca de Mi en Cary, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de divorcio cerca de usted en Cary, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords:
    'abogado de divorcio cerca de mi, abogado de divorcio Cary, abogado Cary, abogado de divorcio NC, abogado español Cary',
  openGraph: {
    title: 'Abogado de Divorcio Cerca de Mi en Cary, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de divorcio cerca de usted en Cary, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/cary-divorce-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/cary-divorce-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de Divorcio Cerca de Mi en Cary, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/cary-divorce-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/cary-divorce-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/cary-divorce-cerca-de-mi',
    },
  },
};
