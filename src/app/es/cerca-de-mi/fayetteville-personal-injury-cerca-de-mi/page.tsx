import FayettevillePersonalInjuryCercaDeMiClient from './fayettevillePersonalInjuryNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function FayettevillePersonalInjuryCercaDeMiPage() {
  return <FayettevillePersonalInjuryCercaDeMiClient />;
}
export const metadata = {
  title: 'Abogado de Lesiones Personales Cerca de Mi en Fayetteville, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de lesiones personales cerca de usted en Fayetteville, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords:
    'abogado de lesiones personales cerca de mi, abogado de lesiones personales Fayetteville, abogado Fayetteville, abogado de lesiones personales NC, abogado español Fayetteville',
  openGraph: {
    title: 'Abogado de Lesiones Personales Cerca de Mi en Fayetteville, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de lesiones personales cerca de usted en Fayetteville, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/fayetteville-personal-injury-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/fayetteville-personal-injury-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de Lesiones Personales Cerca de Mi en Fayetteville, NC',
      },
    ],
  },
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/es/cerca-de-mi/fayetteville-personal-injury-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/fayetteville-personal-injury-near-me',
      'es-ES':
        'https://www.vasquezlawnc.com/es/cerca-de-mi/fayetteville-personal-injury-cerca-de-mi',
    },
  },
};
