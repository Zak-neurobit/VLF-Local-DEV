import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Lesiones de Construcción y Compensación Laboral NC | YO PELEO POR TI™',
  description:
    'Abogados especializados en lesiones de construcción en Carolina del Norte. Caídas, accidentes con maquinaria, electrocución. Máxima compensación. Consulta GRATIS.',
  keywords:
    'lesiones construcción NC, accidentes construcción Carolina del Norte, compensación laboral construcción, caídas andamios, accidentes maquinaria pesada',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/compensacion-laboral/lesiones-construccion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/workers-compensation/construction-site-injuries',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/compensacion-laboral/lesiones-construccion',
    },
  },
};

const services = [
  {
    title: 'Caídas desde Altura',
    description: 'Lesiones por caídas de andamios, escaleras, techos y estructuras elevadas.',
    features: [
      'Caídas de andamios',
      'Accidentes de escaleras',
      'Caídas de techos',
      'Equipos de seguridad defectuosos',
      'Falta de protección contra caídas',
      'Plataformas inestables',
    ],
  },
  {
    title: 'Accidentes con Maquinaria Pesada',
    description: 'Lesiones causadas por grúas, excavadoras, y otros equipos de construcción.',
    features: [
      'Accidentes de grúas',
      'Lesiones con excavadoras',
      'Equipos de corte y perforación',
      'Vehículos de construcción',
      'Fallas mecánicas',
      'Mantenimiento inadecuado',
    ],
  },
  {
    title: 'Electrocución y Quemaduras',
    description: 'Lesiones eléctricas y quemaduras en sitios de construcción.',
    features: [
      'Contacto con líneas eléctricas',
      'Herramientas eléctricas defectuosas',
      'Cableado inseguro',
      'Falta de etiquetado/bloqueo',
      'Quemaduras por soldadura',
      'Exposición a químicos',
    ],
  },
];

const faqs = [
  {
    question: '¿Qué beneficios puedo recibir por lesiones de construcción?',
    answer: 'Compensación médica completa, beneficios de incapacidad, entrenamiento vocacional, y posibles demandas de terceros contra fabricantes de equipos o contratistas generales.',
  },
];

export default function LesionesConstructionPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Lesiones de Construcción"
      subtitle="Protegiendo Trabajadores de Construcción Lesionados"
      description="Los sitios de construcción están llenos de peligros. Cuando resulte lesionado, luchamos por la compensación completa y beneficios que merece."
      services={services}
      faqs={faqs}
    />
  );
}