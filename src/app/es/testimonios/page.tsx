import { Metadata } from 'next';
import TestimonialsPageClient from '@/components/testimonials/TestimonialsPageClient';

export const metadata: Metadata = {
  title: 'Testimonios del Cliente | Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description:
    'Lea lo que nuestros clientes dicen sobre nosotros. Más de 30,000 casos ganados. Abogados de inmigración, lesiones personales y defensa criminal.',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/testimonios',
    languages: {
      en: '/testimonials',
      es: '/es/testimonios',
    },
  },
};

export default function TestimoniosPage() {
  return <TestimonialsPageClient language="es" />;
}
