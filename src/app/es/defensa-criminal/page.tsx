import { ModernPracticeAreaTemplateV3 } from '@/components/templates/ModernPracticeAreaTemplateV3';
import { getPracticeAreaByKey } from '@/data/practice-areas';

export default function DefensaCriminalPage() {
  const practiceArea = getPracticeAreaByKey('criminal-defense');

  if (!practiceArea) {
    return <div>Practice area not found</div>;
  }

  return <ModernPracticeAreaTemplateV3 practiceArea={practiceArea} language="es" />;
}

export const metadata = {
  title: 'Defensa Criminal | Abogados de Defensa Criminal en NC y FL | Vasquez Law Firm',
  description:
    'Defensa criminal agresiva en Carolina del Norte y Florida. Abogados bilingües experimentados en casos criminales. Disponibles 24/7. Llame (704) 533-7000.',
  keywords:
    'defensa criminal, abogados defensa criminal, abogado criminal NC, abogado criminal FL, defensa DUI, abogados bilingües criminales, consulta criminal',
  openGraph: {
    title: 'Defensa Criminal | Abogados de Defensa Criminal en NC y FL | Vasquez Law Firm',
    description:
      'Defensa criminal agresiva en Carolina del Norte y Florida. Abogados bilingües experimentados. Disponibles 24/7.',
    url: 'https://www.vasquezlawnc.com/es/defensa-criminal',
    siteName: 'Vasquez Law Firm',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/criminal-defense-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Defensa Criminal - Vasquez Law Firm',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/defensa-criminal',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
