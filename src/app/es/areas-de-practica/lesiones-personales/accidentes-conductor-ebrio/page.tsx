import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Abogados de Accidentes con Conductor Ebrio NC | Justicia Garantizada | YO PELEO POR TI™',
  description:
    'Víctimas de conductores ebrios en Carolina del Norte. Lesiones graves por DUI/DWI. Compensación punitiva disponible. Justicia y máxima compensación.',
  keywords:
    'accidente conductor ebrio NC, víctima DUI Carolina del Norte, demanda conductor borracho, compensación punitiva drunk driver, DWI accident lawyer',
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/accidentes-conductor-ebrio',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury/drunk-driver-accidents',
      'es-ES':
        'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/accidentes-conductor-ebrio',
    },
  },
};

const services = [
  {
    title: 'Lesiones por Conductores Intoxicados',
    description:
      'Máxima compensación incluyendo daños punitivos contra conductores irresponsables.',
    features: [
      'Accidentes causados por DUI/DWI',
      'Lesiones catastróficas',
      'Muerte por negligencia',
      'Daños punitivos disponibles',
      'Compensación aumentada',
      'Responsabilidad clara del conductor',
    ],
  },
  {
    title: 'Casos de Dram Shop',
    description:
      'Demandas contra bares y restaurantes que sirvieron alcohol a conductores visiblemente intoxicados.',
    features: [
      'Responsabilidad de establecimientos',
      'Servicio excesivo de alcohol',
      'Entrenamiento inadecuado de personal',
      'Violaciones de licencia de licor',
      'Múltiples fuentes de compensación',
      'Investigación de consumo',
    ],
  },
];

const faqs = [
  {
    question: '¿Puedo obtener daños punitivos contra un conductor ebrio?',
    answer:
      'Sí, Carolina del Norte permite daños punitivos contra conductores ebrios cuando su comportamiento fue especialmente imprudente o malicioso. Esto puede aumentar significativamente su compensación.',
  },
];

export default function AccidentesConductorEbrioPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Accidentes con Conductor Ebrio"
      subtitle="Justicia y Compensación Máxima Para Víctimas"
      description="Los conductores ebrios causan accidentes devastadores y prevenibles. Luchamos por justicia completa y compensación máxima para víctimas inocentes."
      content={{
        introduction:
          'Los conductores ebrios representan un peligro mortal en nuestras carreteras. Sus decisiones irresponsables causan lesiones devastadoras y muerte. Las víctimas merecen compensación máxima y justicia completa.',
      }}
      services={services}
      faqs={faqs}
    />
  );
}
