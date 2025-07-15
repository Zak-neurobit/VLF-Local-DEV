'use client';

import { ModernPracticeAreaTemplateV3 } from '@/components/templates/ModernPracticeAreaTemplateV3';
import { getPracticeAreaByKey } from '@/data/practice-areas';

export default function InmigracionPage() {
  const practiceArea = getPracticeAreaByKey('immigration');

  if (!practiceArea) {
    return <div>Practice area not found</div>;
  }

  return <ModernPracticeAreaTemplateV3 practiceArea={practiceArea} language="es" />;
}

export const metadata = {
  title: 'Ley de Inmigración | Abogados de Inmigración en NC y FL | Vasquez Law Firm',
  description:
    'Servicios legales expertos de inmigración en Carolina del Norte y Florida. Abogados bilingües experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'ley de inmigración, abogados de inmigración, inmigración NC, inmigración FL, abogados bilingües, servicios legales inmigración, consulta gratuita inmigración',
  openGraph: {
    title: 'Ley de Inmigración | Abogados de Inmigración en NC y FL | Vasquez Law Firm',
    description:
      'Servicios legales expertos de inmigración en Carolina del Norte y Florida. Abogados bilingües experimentados. Consultas gratuitas.',
    url: 'https://www.vasquezlawnc.com/es/inmigracion',
    siteName: 'Vasquez Law Firm',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/immigration-law-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ley de Inmigración - Vasquez Law Firm',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/inmigracion',
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
