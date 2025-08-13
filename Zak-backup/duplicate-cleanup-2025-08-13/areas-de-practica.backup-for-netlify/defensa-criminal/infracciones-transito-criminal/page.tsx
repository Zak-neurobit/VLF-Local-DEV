import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
export const metadata: Metadata = {
  title: 'Infracciones de Tránsito Criminales NC | Defensa Experta | YO PELEO POR TI™',
  description:
    'Defensa contra infracciones criminales de tránsito en Carolina del Norte. Conducción imprudente, carreras callejeras, evasión. Evite cárcel y antecedentes.',
  keywords:
    'infracciones tránsito criminales NC, conducción imprudente Carolina del Norte, carreras callejeras, evasión policial, reckless driving criminal defense',
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/es/areas-de-practica/defensa-criminal/infracciones-transito-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/criminal-defense/traffic-offenses',
      'es-ES':
        'https://www.vasquezlawnc.com/es/areas-de-practica/defensa-criminal/infracciones-transito-criminal',
    },
  },
};

const services = [
  {
    title: 'Conducción Imprudente Criminal',
    description: 'Defensa contra cargos de delito menor por conducción peligrosa.',
    features: [
      'Velocidades excesivas (15+ mph)',
      'Conducción agresiva',
      'Maniobras peligrosas',
      'Carreras en vía pública',
      'Reducción a violaciones civiles',
      'Evitar antecedentes criminales',
    ],
  },
  {
    title: 'Evasión de Policía',
    description: 'Defensa seria contra cargos de huir o evadir oficiales de ley.',
    features: [
      'Falta de detención a oficial',
      'Huir en vehículo',
      'Evasión a pie',
      'Circunstancias agravantes',
      'Intención de evadir',
      'Defensa de malentendido',
    ],
  },
];

const faqs = [
  {
    question: '¿Cuál es la diferencia entre multa de tránsito y cargo criminal?',
    answer:
      'Las multas de tránsito son infracciones civiles, mientras que conducción imprudente es un delito menor criminal que puede resultar en cárcel, antecedentes permanentes, y pérdida de licencia.',
  },
];

export default function InfraccionesTransitoCriminalPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Infracciones de Tránsito Criminales"
      subtitle="Cuando Multas de Tránsito Se Vuelven Cargos Criminales"
      description="Algunas infracciones de tránsito cruzan la línea hacia lo criminal. Proporcionamos defensa agresiva para proteger su libertad y récord limpio."
      content={{
        introduction:
          'No todas las infracciones de tránsito son simples multas. Conducción imprudente, carreras callejeras y evasión son crímenes que pueden resultar en cárcel y antecedentes permanentes.',
      }}
      services={services}
      faqs={faqs}
    />
  );
}
