import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Abogados de Defensa por Crímenes de Drogas NC | Evite Prisión | YO PELEO POR TI™',
  description:
    'Defensa agresiva contra cargos de drogas en Carolina del Norte. Posesión, tráfico, conspiración. Protegemos su libertad e inmigración. Disponible 24/7.',
  keywords:
    'abogado crímenes drogas NC, defensa posesión drogas, tráfico drogas Carolina del Norte, conspiración drogas, marijuana charges NC',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/defensa-criminal/crimenes-drogas',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/criminal-defense/drug-crimes',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/defensa-criminal/crimenes-drogas',
    },
  },
};

const services = [
  {
    title: 'Posesión de Drogas',
    description: 'Defensa contra cargos de posesión simple y con intención de distribuir.',
    features: [
      'Marihuana/Cannabis',
      'Cocaína y crack',
      'Heroína y opioides',
      'Metanfetaminas',
      'Medicamentos prescritos',
      'Drogas sintéticas',
    ],
  },
  {
    title: 'Tráfico y Distribución',
    description: 'Defensa seria contra cargos de felonía que conllevan décadas de prisión.',
    features: [
      'Tráfico de grandes cantidades',
      'Distribución y venta',
      'Conspiración de drogas',
      'Operaciones de manufactura',
      'Casos federales RICO',
      'Confiscación de activos',
    ],
  },
];

const faqs = [
  {
    question: '¿Qué es la diferencia entre posesión y tráfico?',
    answer: 'La diferencia principal es la cantidad. Ciertas cantidades resultan automáticamente en cargos de tráfico con penalidades mucho más severas, incluso sin evidencia de venta.',
  },
];

export default function CrimenesDrogasPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Defensa por Crímenes de Drogas"
      subtitle="Luchando Contra Cargos Que Pueden Destruir Su Vida"
      description="Los cargos de drogas conllevan penalidades severas y consecuencias de por vida. Proporcionamos defensa experta para proteger su libertad y futuro."
      services={services}
      faqs={faqs}
    />
  );
}