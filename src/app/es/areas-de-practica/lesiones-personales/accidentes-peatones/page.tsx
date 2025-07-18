import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Abogados de Accidentes de Peatones NC | Máxima Compensación | YO PELEO POR TI™',
  description:
    'Abogados expertos en accidentes de peatones en Carolina del Norte. Atropellos, cruces peatonales, lesiones graves. Compensación completa. No cobramos hasta ganar.',
  keywords:
    'abogado accidentes peatones NC, atropello peatón Carolina del Norte, cruce peatonal accidente, lesiones peatón Raleigh, compensación peatones Charlotte',
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/accidentes-peatones',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury/pedestrian-accidents',
      'es-ES':
        'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/accidentes-peatones',
    },
  },
};

const services = [
  {
    title: 'Atropellos en Cruces Peatonales',
    description:
      'Representación cuando vehículos golpean peatones en cruces marcados y no marcados.',
    features: [
      'Cruces peatonales marcados',
      'Intersecciones no controladas',
      'Falta de ceder derecho de paso',
      'Semáforos peatonales',
      'Zonas escolares',
      'Paradas de autobús',
    ],
  },
  {
    title: 'Accidentes de Atropello y Fuga',
    description: 'Casos donde conductores huyen después de golpear peatones.',
    features: [
      'Investigación de fuga',
      'Identificación de conductor',
      'Seguro de conductor no asegurado',
      'Compensación de víctimas de crimen',
      'Evidencia de video vigilancia',
      'Reconstrucción de accidentes',
    ],
  },
];

const faqs = [
  {
    question: '¿Qué debo hacer si me atropella un vehículo?',
    answer:
      'Busque atención médica inmediata, incluso si se siente bien. Llame a la policía, obtenga información del conductor y testigos, y contacte a un abogado antes de hablar con seguros.',
  },
];

export default function AccidentesPeatonesPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Abogados de Accidentes de Peatones"
      subtitle="Protegiendo los Derechos de Peatones Lesionados"
      description="Los peatones son extremadamente vulnerables en accidentes vehiculares. Luchamos agresivamente por compensación completa para lesiones devastadoras."
      content={{
        introduction:
          'Los peatones sufren lesiones desproporcionadamente graves en accidentes vehiculares. Sin protección de carrocería, enfrentan fracturas, traumatismo craneal y muerte. Los conductores deben ceder paso siempre.',
      }}
      services={services}
      faqs={faqs}
    />
  );
}
