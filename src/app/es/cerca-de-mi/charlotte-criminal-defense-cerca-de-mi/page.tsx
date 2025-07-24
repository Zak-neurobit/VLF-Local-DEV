import CharlotteCriminalDefenseCercaDeMiClient from './charlotteCriminalDefenseNearMeClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default function CharlotteCriminalDefenseCercaDeMiPage() {
  return <CharlotteCriminalDefenseCercaDeMiClient />;
}
export const metadata = {
  title: 'Abogado de Defensa Criminal Cerca de Mi en Charlotte, NC | Vasquez Law Firm',
  description:
    'Encuentre el mejor abogado de defensa criminal cerca de usted en Charlotte, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
  keywords:
    'abogado de defensa criminal cerca de mi, abogado de defensa criminal Charlotte, abogado Charlotte, abogado de defensa criminal NC, abogado español Charlotte',
  openGraph: {
    title: 'Abogado de Defensa Criminal Cerca de Mi en Charlotte, NC | Vasquez Law Firm',
    description:
      'Encuentre el mejor abogado de defensa criminal cerca de usted en Charlotte, NC. Consultas gratuitas 24/7. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-criminal-defense-cerca-de-mi',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/charlotte-criminal-defense-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogado de Defensa Criminal Cerca de Mi en Charlotte, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-criminal-defense-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/charlotte-criminal-defense-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-criminal-defense-cerca-de-mi',
    },
  },
};
