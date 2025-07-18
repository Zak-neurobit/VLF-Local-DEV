import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Demandas de Terceros en Lesiones Laborales NC | Doble Compensación | YO PELEO POR TI™',
  description:
    'Demandas de terceros en lesiones laborales de Carolina del Norte. Compensación adicional más allá de workers comp. Productos defectuosos, contratistas negligentes.',
  keywords:
    'demandas terceros workers comp NC, third party lawsuit trabajo, lesiones laborales terceros, compensación adicional lesiones trabajo Carolina del Norte',
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/es/areas-de-practica/compensacion-laboral/demandas-terceros',
    languages: {
      'en-US':
        'https://www.vasquezlawnc.com/practice-areas/workers-compensation/third-party-injury-claims',
      'es-ES':
        'https://www.vasquezlawnc.com/es/areas-de-practica/compensacion-laboral/demandas-terceros',
    },
  },
};

const services = [
  {
    title: 'Productos Defectuosos en el Trabajo',
    description:
      'Demandas contra fabricantes cuando equipos defectuosos causan lesiones laborales.',
    features: [
      'Maquinaria industrial defectuosa',
      'Herramientas con fallas de diseño',
      'Equipos de seguridad inadecuados',
      'Falta de advertencias apropiadas',
      'Defectos de manufactura',
      'Responsabilidad estricta del producto',
    ],
  },
  {
    title: 'Contratistas y Subcontratistas Negligentes',
    description: 'Demandas contra terceros responsables por condiciones laborales peligrosas.',
    features: [
      'Negligencia de contratista general',
      'Subcontratistas irresponsables',
      'Mantenimiento inadecuado del sitio',
      'Falta de supervisión de seguridad',
      'Violaciones de códigos de construcción',
      'Coordinación inadecuada entre contratistas',
    ],
  },
];

const faqs = [
  {
    question: '¿Puedo demandar a terceros además de recibir workers comp?',
    answer:
      'Sí, puede recibir beneficios de compensación laboral de su empleador Y demandar a terceros culpables como fabricantes de equipos o contratistas. Esto puede resultar en compensación total mucho mayor.',
  },
];

export default function DemandasTercerosPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Demandas de Terceros"
      subtitle="Maximizando Compensación Más Allá de Workers Comp"
      description="Cuando terceros contribuyen a su lesión laboral, puede tener derecho a compensación adicional significativa más allá de beneficios de workers comp."
      content={{
        introduction:
          'Las demandas de terceros pueden duplicar o triplicar su compensación cuando fabricantes, contratistas u otras partes contribuyen a su lesión laboral. Exploramos todas las opciones para maximizar su recuperación.',
      }}
      services={services}
      faqs={faqs}
    />
  );
}
