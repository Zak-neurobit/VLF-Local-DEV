import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'División de Propiedad en Divorcio NC | Distribución Equitativa | YO PELEO POR TI™',
  description:
    'Abogados expertos en división de propiedad y deudas en divorcios de Carolina del Norte. Distribución equitativa de bienes maritales. Protegemos su futuro financiero.',
  keywords:
    'división propiedad divorcio NC, distribución equitativa Carolina del Norte, bienes maritales, división deudas divorcio, property division lawyer Raleigh',
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/es/areas-de-practica/derecho-familia/division-propiedad',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/family-law/property-division',
      'es-ES':
        'https://www.vasquezlawnc.com/es/areas-de-practica/derecho-familia/division-propiedad',
    },
  },
};

const services = [
  {
    title: 'Bienes Raíces Maritales',
    description: 'División de casas, propiedades de inversión y otros bienes raíces.',
    features: [
      'Casa familiar principal',
      'Propiedades de inversión',
      'Terrenos y cabañas vacacionales',
      'Valoración profesional',
      'Opciones de venta vs retención',
      'Refinanciamiento de hipotecas',
    ],
  },
  {
    title: 'Activos Financieros',
    description: 'División de cuentas bancarias, inversiones y planes de retiro.',
    features: [
      'Cuentas bancarias y ahorros',
      'Planes 401(k) y IRA',
      'Acciones y bonos',
      'Pólizas de vida con valor efectivo',
      'Órdenes de relación doméstica cualificada',
      'Implicaciones fiscales',
    ],
  },
];

const faqs = [
  {
    question: '¿Qué es distribución equitativa en NC?',
    answer:
      'Carolina del Norte divide la propiedad marital de manera "equitativa" (justa), no necesariamente 50/50. La corte considera factores como duración del matrimonio, contribuciones de cada cónyuge, y necesidades futuras.',
  },
];

export default function DivisionPropiedadPage() {
  return (
    <ModernPracticeAreaTemplate
      title="División de Propiedad"
      subtitle="Protegiendo Su Futuro Financiero en el Divorcio"
      description="La división de propiedad puede determinar su seguridad financiera futura. Luchamos agresivamente por una distribución justa de todos los bienes maritales."
      content={{
        introduction:
          'Carolina del Norte sigue la ley de distribución equitativa, no de 50/50 automático. Esto significa que los activos se dividen justamente, no necesariamente igual. Protegemos sus intereses financieros durante este proceso complejo.',
      }}
      services={services}
      faqs={faqs}
    />
  );
}
