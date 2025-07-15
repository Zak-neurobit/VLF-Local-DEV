'use client';

import { ModernPracticeAreaTemplateV3 } from '@/components/templates/ModernPracticeAreaTemplateV3';
import { getPracticeAreaByKey } from '@/data/practice-areas';

export default function LesionesPersonalesPage() {
  const practiceArea = getPracticeAreaByKey('personal-injury');

  if (!practiceArea) {
    return <div>Practice area not found</div>;
  }

  return <ModernPracticeAreaTemplateV3 practiceArea={practiceArea} language="es" />;
}

export const metadata = {
  title: 'Lesiones Personales | Abogados de Accidentes en NC y FL | Vasquez Law Firm',
  description:
    'Representación agresiva en lesiones personales en Carolina del Norte y Florida. Sin honorarios hasta ganar. Abogados bilingües. Llame (704) 533-7000.',
  keywords:
    'lesiones personales, abogados accidentes, accidentes auto, mala práctica médica, compensación accidentes, abogados bilingües lesiones',
  openGraph: {
    title: 'Lesiones Personales | Abogados de Accidentes en NC y FL | Vasquez Law Firm',
    description:
      'Representación agresiva en lesiones personales. Sin honorarios hasta ganar. Abogados bilingües experimentados.',
    url: 'https://www.vasquezlawnc.com/es/lesiones-personales',
    siteName: 'Vasquez Law Firm',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/personal-injury-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Lesiones Personales - Vasquez Law Firm',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/lesiones-personales',
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
