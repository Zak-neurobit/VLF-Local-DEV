import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Accidentes con Motorista Sin Seguro NC | Compensación Garantizada | YO PELEO POR TI™',
  description:
    'Víctimas de conductores sin seguro en Carolina del Norte. Protección UM/UIM, compensación de su propio seguro. No deje que la falta de seguro le impida cobrar.',
  keywords:
    'motorista sin seguro NC, uninsured motorist Carolina del Norte, UM UIM coverage, accidente sin seguro, conductor no asegurado Raleigh',
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/motorista-sin-seguro',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury/uninsured-motorist',
      'es-ES':
        'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/motorista-sin-seguro',
    },
  },
};

const services = [
  {
    title: 'Reclamaciones de Motorista Sin Seguro (UM)',
    description: 'Compensación a través de su propia póliza cuando el culpable no tiene seguro.',
    features: [
      'Conductores completamente sin seguro',
      'Activación de cobertura UM',
      'Negociación con su propio seguro',
      'Máximos de póliza disponibles',
      'Coordinación con otros beneficios',
      'Protección contra aumentos de primas',
    ],
  },
  {
    title: 'Motorista Sub-Asegurado (UIM)',
    description: 'Compensación adicional cuando el seguro del culpable es insuficiente.',
    features: [
      'Límites inadecuados del culpable',
      'Brecha entre daños y cobertura',
      'Activación de beneficios UIM',
      'Coordinación de múltiples pólizas',
      'Protección de liquidaciones',
      'Maximización de recuperación total',
    ],
  },
];

const faqs = [
  {
    question: '¿Qué pasa si el conductor que me golpeó no tiene seguro?',
    answer:
      'Si tiene cobertura de motorista sin seguro (UM) en su póliza, puede reclamar compensación de su propio seguro. Esta cobertura es obligatoria en NC a menos que la rechace por escrito.',
  },
];

export default function MotoristaSinSeguroPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Accidentes con Motorista Sin Seguro"
      subtitle="Compensación Cuando el Culpable No Puede Pagar"
      description="No deje que la falta de seguro del culpable le impida obtener compensación. Luchamos para activar todos los beneficios disponibles bajo su propia póliza."
      content={{
        introduction:
          'Millones de conductores manejan sin seguro o con cobertura insuficiente. Cuando le golpean, su propia póliza puede ser su salvación. Navegamos las reglas complejas para maximizar su recuperación.',
      }}
      services={services}
      faqs={faqs}
    />
  );
}
