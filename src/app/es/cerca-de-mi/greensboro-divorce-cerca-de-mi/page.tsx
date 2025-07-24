import GreensboroDivorceCercaDeMiClient from './greensuorodivorceNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function GreensboroDivorceCercaDeMiPage() {
  return <GreensboroDivorceCercaDeMiClient />;
}

export const metadata = {
  title: 'Abogado de Divorcio Cerca de Mi en Greensboro, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de divorcio cerca de usted en Greensboro, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords:
    'abogado de divorcio cerca de mi, abogado de divorcio Greensboro, abogado Greensboro, abogado de divorcio NC, abogado español Greensboro',
  openGraph: {
    title: 'Abogado de Divorcio Cerca de Mi en Greensboro, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de divorcio cerca de usted en Greensboro, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/greensboro-divorce-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/greensboro-divorce-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de Divorcio Cerca de Mi en Greensboro, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/greensboro-divorce-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/greensboro-divorce-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/greensboro-divorce-cerca-de-mi',
    },
  },
};
