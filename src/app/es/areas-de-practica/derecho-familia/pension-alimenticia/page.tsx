import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
export const metadata: Metadata = {
  title: 'Abogados de Pensión Alimenticia NC | Manutención Infantil y Conyugal | YO PELEO POR TI™',
  description:
    'Abogados expertos en pensión alimenticia en Carolina del Norte. Manutención infantil, pensión conyugal, modificaciones, cumplimiento. Protegemos sus derechos financieros.',
  keywords:
    'pensión alimenticia NC, manutención infantil Carolina del Norte, alimony NC, child support Raleigh, modificación pensión Charlotte, spousal support Durham',
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/es/areas-de-practica/derecho-familia/pension-alimenticia',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/family-law/alimony',
      'es-ES':
        'https://www.vasquezlawnc.com/es/areas-de-practica/derecho-familia/pension-alimenticia',
    },
  },
};

const services = [
  {
    title: 'Manutención Infantil',
    description:
      'Establecimiento, modificación y cumplimiento de órdenes de manutención para niños.',
    features: [
      'Cálculo según pautas estatales',
      'Desviaciones de pautas',
      'Gastos médicos y cuidado infantil',
      'Actividades extracurriculares',
      'Modificaciones por cambio de ingresos',
      'Cumplimiento y colección',
    ],
  },
  {
    title: 'Pensión Conyugal (Alimony)',
    description: 'Determinación de pensión conyugal basada en necesidad y capacidad de pago.',
    features: [
      'Pensión temporal durante divorcio',
      'Pensión post-separación',
      'Pensión permanente',
      'Duración y cantidad',
      'Factores de mala conducta conyugal',
      'Terminación por cohabitación/matrimonio',
    ],
  },
];

const faqs = [
  {
    question: '¿Cómo se calcula la manutención infantil en NC?',
    answer:
      'Carolina del Norte usa pautas que consideran los ingresos de ambos padres, número de niños, costos de seguro médico, y cuidado infantil. También se consideran otros factores como tiempo de crianza.',
  },
];

export default function PensionAlimenticiaPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Pensión Alimenticia y Manutención"
      subtitle="Protegiendo Sus Derechos Financieros y de Sus Hijos"
      description="La manutención infantil y pensión conyugal son cruciales para estabilidad financiera. Luchamos por órdenes justas que protegen a familias."
      content={{
        introduction:
          'Carolina del Norte reconoce varios tipos de pensión alimenticia basados en circunstancias específicas. Analizamos ingresos, gastos, estilo de vida y capacidad de trabajo para asegurar acuerdos justos que protejan su futuro financiero.',
      }}
      services={services}
      faqs={faqs}
    />
  );
}
