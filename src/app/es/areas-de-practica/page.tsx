import { Metadata } from 'next';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import PracticeAreasPageContent from '@/components/PracticeAreasPageContent';

export const metadata: Metadata = {
  title: 'Áreas de Práctica - Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description: 'Servicios legales integrales en inmigración, lesiones personales, compensación laboral, defensa criminal, derecho familiar y infracciones de tráfico. Mejorados con tecnología IA.',
  keywords: 'áreas de práctica, inmigración, lesiones personales, compensación laboral, defensa criminal, derecho familiar, infracciones tráfico, abogado español',
  openGraph: {
    title: 'Áreas de Práctica - Bufete de Abogados Vasquez',
    description: 'Servicios legales integrales mejorados con tecnología IA. 60+ años de experiencia.',
    images: [{ url: '/images/BANNER_TRANS.PNG' }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica',
    },
  },
};

export default function EsAreasDePracticaPage() {
  return (
    <MasterLayout variant="default" showBreadcrumbs={true}>
      <PracticeAreasPageContent language="es" />
    </MasterLayout>
  );
}
