import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Expunción de Antecedentes Criminales NC | Limpie Su Récord | YO PELEO POR TI™',
  description:
    'Servicios de expunción en Carolina del Norte. Elimine arrestos, cargos desestimados, y ciertas condenas de su récord criminal. Segunda oportunidad garantizada.',
  keywords:
    'expunción NC, limpiar antecedentes criminales, expungement Carolina del Norte, eliminar arrestos, second chance act, record sealing',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/defensa-criminal/expuncion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/criminal-defense/expungement',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/defensa-criminal/expuncion',
    },
  },
};

const services = [
  {
    title: 'Cargos Desestimados',
    description: 'Eliminación de arrestos y cargos que no resultaron en condena.',
    features: [
      'Cargos desestimados por fiscal',
      'Absoluciones por jurado',
      'Casos no procesados',
      'Arrestos sin cargos',
      'Órdenes de no procesar',
      'Identidad errónea',
    ],
  },
  {
    title: 'Condenas Elegibles',
    description: 'Expunción de ciertas condenas bajo nuevas leyes de segunda oportunidad.',
    features: [
      'Delitos menores no violentos',
      'Ciertas felonías elegibles',
      'Condenas de drogas nivel bajo',
      'Crímenes de juventud',
      'Primera ofensa elegible',
      'Violaciones de tráfico menores',
    ],
  },
];

const faqs = [
  {
    question: '¿Puedo expungir una condena de DWI?',
    answer: 'No, las condenas de DWI no son elegibles para expunción en Carolina del Norte. Sin embargo, arrestos DWI que no resultaron en condena pueden ser expungidos.',
  },
];

export default function ExpuncionPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Expunción de Antecedentes Criminales"
      subtitle="Su Segunda Oportunidad Comienza Aquí"
      description="Un récord criminal no debe definir su futuro. Ayudamos a limpiar antecedentes para nuevas oportunidades de empleo, vivienda y educación."
      services={services}
      faqs={faqs}
    />
  );
}