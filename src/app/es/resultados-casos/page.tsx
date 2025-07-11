import { Metadata } from 'next';
import CaseResultsPageClient from '@/components/CaseResults/CaseResultsPageClient';

export const metadata: Metadata = {
  title: 'Resultados de Casos | Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description:
    'Vea nuestros resultados exitosos de casos en inmigración, lesiones personales, defensa criminal y compensación laboral. Victorias reales para clientes reales.',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/resultados-casos',
    languages: {
      en: '/case-results',
      es: '/es/resultados-casos',
    },
  },
};

export default function ResultadosCasosPage() {
  return <CaseResultsPageClient language="es" />;
}
