import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Accidentes con Vehículos de Emergencia NC | Compensación Especial | YO PELEO POR TI™',
  description:
    'Accidentes con ambulancias, camiones de bomberos, y vehículos policiales en Carolina del Norte. Reglas especiales de responsabilidad. Compensación completa disponible.',
  keywords:
    'accidente ambulancia NC, choque camión bomberos, accidente vehículo policial, emergency vehicle accident Carolina del Norte, sovereign immunity NC',
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/accidentes-emergencia',
    languages: {
      'en-US':
        'https://www.vasquezlawnc.com/practice-areas/personal-injury/emergency-vehicle-accidents',
      'es-ES':
        'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/accidentes-emergencia',
    },
  },
};

const services = [
  {
    title: 'Accidentes con Ambulancias',
    description: 'Casos complejos contra servicios médicos de emergencia y sus aseguradoras.',
    features: [
      'Ambulancias en respuesta de emergencia',
      'Transporte de rutina no emergencia',
      'Fallas en ceder derecho de paso',
      'Velocidades excesivas',
      'Mantenimiento inadecuado',
      'Entrenamiento insuficiente',
    ],
  },
  {
    title: 'Vehículos Policiales y Bomberos',
    description: 'Navegación de inmunidad soberana y responsabilidad gubernamental.',
    features: [
      'Persecuciones policiales',
      'Camiones de bomberos en emergencia',
      'Inmunidad soberana limitada',
      'Negligencia operacional vs discrecional',
      'Documentación especializada',
      'Plazos de aviso especiales',
    ],
  },
];

const faqs = [
  {
    question: '¿Puedo demandar al gobierno por accidente con vehículo de emergencia?',
    answer:
      'Sí, pero hay reglas especiales incluyendo avisos tempranos requeridos y límites de inmunidad soberana. Algunos casos están exentos de inmunidad bajo la excepción de función gubernamental.',
  },
];

export default function AccidentesEmergenciaPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Accidentes con Vehículos de Emergencia"
      subtitle="Navegando Casos Complejos Contra Entidades Gubernamentales"
      description="Los accidentes con vehículos de emergencia involucran reglas legales complejas. Tenemos experiencia navegando inmunidad soberana para obtener compensación justa."
      content={{
        introduction:
          'Los vehículos de emergencia tienen privilegios especiales pero no inmunidad total. Cuando causan accidentes por negligencia, las víctimas tienen derechos. Navegamos estas demandas complejas contra entidades gubernamentales.',
      }}
      services={services}
      faqs={faqs}
    />
  );
}
