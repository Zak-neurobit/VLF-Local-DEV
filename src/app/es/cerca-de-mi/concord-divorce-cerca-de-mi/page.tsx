import ConcordDivorceCercaDeMiClient from './concorddivorceNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function ConcordDivorceCercaDeMiPage() {
  return <ConcordDivorceCercaDeMiClient />;
}
export const metadata = {
  title: 'Abogado de Divorcio Cerca de Mi en Concord, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de divorcio cerca de usted en Concord, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
  keywords:
    'abogado de divorcio cerca de mi, abogado de divorcio Concord, abogado Concord, abogado de divorcio NC, abogado español Concord',
  openGraph: {
    title: 'Abogado de Divorcio Cerca de Mi en Concord, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de divorcio cerca de usted en Concord, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/concord-divorce-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/concord-divorce-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de Divorcio Cerca de Mi en Concord, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/concord-divorce-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/concord-divorce-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/concord-divorce-cerca-de-mi',
    },
  },
};
