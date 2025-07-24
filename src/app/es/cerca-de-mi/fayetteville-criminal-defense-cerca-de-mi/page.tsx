import FayettevilleCriminalDefenseCercaDeMiClient from './fayettevilleCriminalDefenseNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function FayettevilleCriminalDefenseCercaDeMiPage() {
  return <FayettevilleCriminalDefenseCercaDeMiClient />;
}
export const metadata = {
  title: 'Abogado de Defensa Criminal Cerca de Mi en Fayetteville, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de defensa criminal cerca de usted en Fayetteville, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
  keywords:
    'abogado de defensa criminal cerca de mi, abogado de defensa criminal Fayetteville, abogado Fayetteville, abogado de defensa criminal NC, abogado español Fayetteville',
  openGraph: {
    title: 'Abogado de Defensa Criminal Cerca de Mi en Fayetteville, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de defensa criminal cerca de usted en Fayetteville, NC. Consultas gratuitas 24/7. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/fayetteville-criminal-defense-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/fayetteville-criminal-defense-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de Defensa Criminal Cerca de Mi en Fayetteville, NC',
      },
    ],
  },
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/es/cerca-de-mi/fayetteville-criminal-defense-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/fayetteville-criminal-defense-near-me',
      'es-ES':
        'https://www.vasquezlawnc.com/es/cerca-de-mi/fayetteville-criminal-defense-cerca-de-mi',
    },
  },
};
