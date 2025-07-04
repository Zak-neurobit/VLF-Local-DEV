import { Metadata } from 'next';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import PersonalInjuryPageContent from '@/components/practice-areas/PersonalInjuryPageContent';

export const metadata: Metadata = {
  title: 'Lesiones Personales - Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description:
    'Abogados de lesiones personales en Carolina del Norte y Florida. Accidentes de auto, resbalones y caídas, negligencia médica, accidentes de trabajo. No pagamos a menos que ganemos. Consulta gratuita.',
  keywords: 'abogado lesiones personales, accidentes auto, resbalones caídas, negligencia médica, accidentes trabajo, compensación víctimas, abogado accidentes Carolina Norte',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales',
    },
  },
};

export default function LesionesPersonalesPage() {
  return (
    <MasterLayout variant="default" showBreadcrumbs={true}>
      <PersonalInjuryPageContent language="es" />
    </MasterLayout>
  );
}
