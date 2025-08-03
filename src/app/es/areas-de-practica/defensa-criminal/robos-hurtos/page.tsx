import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Abogados de Defensa por Robo y Hurto NC | Evite Prisión | YO PELEO POR TI™',
  description:
    'Defensa experta contra cargos de robo, hurto y shoplifting en Carolina del Norte. Protegemos su libertad, empleo y futuro. Consulta GRATIS 24/7.',
  keywords:
    'abogado robo NC, defensa hurto Carolina del Norte, shoplifting lawyer, theft charges, larceny defense, robo menor mayor NC',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/defensa-criminal/robos-hurtos',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/criminal-defense/theft-property-crimes',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/defensa-criminal/robos-hurtos',
    },
  },
};

const services = [
  {
    title: 'Hurto Menor (Shoplifting)',
    description: 'Defensa contra cargos de robo en tiendas que pueden afectar empleo y educación.',
    features: [
      'Primera ofensa de shoplifting',
      'Programas de diversión',
      'Servicios comunitarios',
      'Evitar antecedentes permanentes',
      'Restitución vs multas',
      'Prohibiciones de tiendas',
    ],
  },
  {
    title: 'Robo Mayor y Felonías',
    description: 'Defensa seria contra cargos de felonía por robo de propiedades valiosas.',
    features: [
      'Robo de vehículos',
      'Robo residencial',
      'Robo comercial',
      'Robo a mano armada',
      'Reducción de cargos',
      'Evitar prisión obligatoria',
    ],
  },
];

const faqs = [
  {
    question: '¿Cuál es la diferencia entre hurto menor y mayor?',
    answer:
      'En NC, hurto menor involucra propiedad valorada en menos de $1,000 (delito menor). Hurto mayor es $1,000+ (felonía). Los límites y penalidades son muy diferentes.',
  },
];

export default function RobosHurtosPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Defensa por Robo y Hurto"
      subtitle="Protegiendo Su Futuro Contra Cargos de Propiedad"
      description="Los cargos de robo pueden arruinar oportunidades de empleo y educación. Proporcionamos defensa agresiva para proteger su libertad y reputación."
      content={{
        introduction:
          'Los cargos de robo y hurto van desde shoplifting menor hasta felony armed robbery. Cada nivel tiene consecuencias devastadoras para empleo, educación e inmigración. Luchamos por su futuro.',
      }}
      services={services}
      faqs={faqs}
    />
  );
}
