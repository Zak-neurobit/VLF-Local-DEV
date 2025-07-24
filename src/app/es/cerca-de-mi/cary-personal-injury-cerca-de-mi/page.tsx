import CaryPersonalInjuryCercaDeMiClient from './caryPersonalInjuryNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function CaryPersonalInjuryCercaDeMiPage() {
  return <CaryPersonalInjuryCercaDeMiClient />;
}
export const metadata = {
  title: 'Abogado de Lesiones Personales Cerca de Mi en Cary, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de lesiones personales cerca de usted en Cary, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords:
    'abogado de lesiones personales cerca de mi, abogado de lesiones personales Cary, abogado Cary, abogado de lesiones personales NC, abogado español Cary',
  openGraph: {
    title: 'Abogado de Lesiones Personales Cerca de Mi en Cary, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de lesiones personales cerca de usted en Cary, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/cary-personal-injury-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/cary-personal-injury-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de Lesiones Personales Cerca de Mi en Cary, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/cary-personal-injury-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/cary-personal-injury-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/cary-personal-injury-cerca-de-mi',
    },
  },
};
