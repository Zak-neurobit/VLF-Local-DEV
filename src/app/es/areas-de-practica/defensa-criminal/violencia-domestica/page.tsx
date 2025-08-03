import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
export const metadata: Metadata = {
  title:
    'Abogados de Defensa por Violencia Doméstica NC | Protección Legal 24/7 | YO PELEO POR TI™',
  description:
    'Defensa experta contra cargos de violencia doméstica en Carolina del Norte. Protegemos sus derechos familiares, empleo e inmigración. Consulta CONFIDENCIAL.',
  keywords:
    'abogado violencia doméstica NC, defensa domestic violence Carolina del Norte, órdenes protección, asalto familiar, domestic battery lawyer',
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/es/areas-de-practica/defensa-criminal/violencia-domestica',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/criminal-defense/domestic-violence',
      'es-ES':
        'https://www.vasquezlawnc.com/es/areas-de-practica/defensa-criminal/violencia-domestica',
    },
  },
};

const services = [
  {
    title: 'Defensa contra Cargos de Violencia Doméstica',
    description: 'Protección integral contra acusaciones que pueden destruir su familia y futuro.',
    features: [
      'Asalto contra pareja/ex-pareja',
      'Violencia contra miembros familiares',
      'Amenazas e intimidación',
      'Acoso y hostigamiento',
      'Violación de órdenes de protección',
      'Defensa de falsas acusaciones',
    ],
  },
  {
    title: 'Órdenes de Protección',
    description: 'Defensa contra órdenes restrictivas y protección de sus derechos.',
    features: [
      'Audiencias de órdenes temporales',
      'Defensa en audiencias permanentes',
      'Modificación de órdenes existentes',
      'Violaciones alegadas',
      'Impacto en custodia de niños',
      'Derechos de armas afectados',
    ],
  },
];

const faqs = [
  {
    question: '¿Afectará esto la custodia de mis hijos?',
    answer:
      'Los cargos de violencia doméstica pueden impactar severamente la custodia. Trabajamos para proteger tanto su caso criminal como sus derechos parentales.',
  },
];

export default function ViolenciaDomesticaPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Defensa por Violencia Doméstica"
      subtitle="Protegiendo Su Familia, Libertad y Futuro"
      description="Los cargos de violencia doméstica afectan toda su vida. Proporcionamos defensa sensible pero agresiva para proteger su libertad y relaciones familiares."
      content={{
        introduction:
          'Los cargos de violencia doméstica impactan custodia de niños, empleo, vivienda e inmigración. Manejamos estos casos sensibles con la experiencia y discreción que merecen.',
      }}
      services={services}
      faqs={faqs}
    />
  );
}
