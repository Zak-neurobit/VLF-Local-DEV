import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Abogados de Responsabilidad de Locales NC | Resbalones y Caídas | YO PELEO POR TI™',
  description:
    'Lesiones en propiedades ajenas en Carolina del Norte. Resbalones, caídas, condiciones peligrosas. Responsabilidad de propietarios. Compensación completa.',
  keywords:
    'responsabilidad locales NC, resbalones caídas Carolina del Norte, premises liability lawyer, accidentes propiedades, negligencia propietario Raleigh',
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/responsabilidad-locales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury/premises-liability',
      'es-ES':
        'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/responsabilidad-locales',
    },
  },
};

const services = [
  {
    title: 'Resbalones y Caídas',
    description: 'Lesiones causadas por superficies mojadas, irregulares o mal mantenidas.',
    features: [
      'Pisos mojados sin señalización',
      'Superficies irregulares',
      'Escalones dañados',
      'Alfombras sueltas',
      'Hielo y nieve no removida',
      'Iluminación inadecuada',
    ],
  },
  {
    title: 'Condiciones Peligrosas',
    description: 'Accidentes causados por mantenimiento inadecuado de propiedades.',
    features: [
      'Techos que se colapsan',
      'Estructuras inestables',
      'Equipos defectuosos',
      'Seguridad inadecuada',
      'Piscinas sin protección',
      'Estacionamientos peligrosos',
    ],
  },
];

const faqs = [
  {
    question: '¿Tengo un caso si me caí en propiedad ajena?',
    answer:
      'Depende de si el propietario conocía o debería haber conocido la condición peligrosa y falló en advertir o reparar. Debe probarse negligencia del propietario.',
  },
];

export default function ResponsabilidadLocalesPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Responsabilidad de Locales"
      subtitle="Cuando Propietarios Negligentes Causan Lesiones"
      description="Los propietarios tienen responsabilidad de mantener sus propiedades seguras. Cuando fallan, luchamos por compensación completa para víctimas lesionadas."
      content={{
        introduction:
          'Los propietarios deben mantener condiciones seguras o advertir sobre peligros. Cuando pisos mojados, escalones rotos o iluminación inadecuada causan lesiones, hay responsabilidad legal.',
      }}
      services={services}
      faqs={faqs}
    />
  );
}
