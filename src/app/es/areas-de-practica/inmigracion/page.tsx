import { Metadata } from 'next';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import ImmigrationPageContent from '@/components/practice-areas/ImmigrationPageContent';

export const metadata: Metadata = {
  title: 'Inmigración - Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description:
    'Abogados de inmigración experimentados en Carolina del Norte y Florida. Visas familiares, tarjetas verdes, ciudadanía, defensa de deportación, DACA. Consulta gratuita en español.',
  keywords: 'abogado inmigración, visas familiares, tarjetas verdes, ciudadanía, defensa deportación, DACA, inmigración Carolina del Norte, inmigración Florida',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion',
    },
  },
};

export default function InmigraciónPage() {
  return (
    <MasterLayout variant="default" showBreadcrumbs={true}>
      <ImmigrationPageContent language="es" />
    </MasterLayout>
  );
}
