import { Metadata } from 'next';
import ScholarshipsPageClient from '@/components/Scholarships/ScholarshipsPageClient';

export const metadata: Metadata = {
  title: 'Beca DACA Dreamer | Vasquez Law Firm - YO PELEO POR TI™',
  description:
    '$1,000 por semestre para receptores de DACA que buscan educación superior. Apoyo financiero para soñadores. Fecha límite: 27 de noviembre de 2024.',
  keywords:
    'beca DACA, beca dreamer, apoyo financiero DACA, educación superior DACA, Vasquez Law Firm beca',
  openGraph: {
    title: 'Beca DACA Dreamer de Vasquez Law Firm',
    description:
      '$1,000 por semestre para receptores de DACA. Apoyando sueños a través de la educación.',
    type: 'website',
    url: 'https://www.vasquezlawnc.com/es/becas',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/scholarship-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Beca DACA Dreamer',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/becas',
    languages: {
      en: '/scholarships',
      es: '/es/becas',
    },
  },
};

export default function BecasPage() {
  return <ScholarshipsPageClient language="es" />;
}
