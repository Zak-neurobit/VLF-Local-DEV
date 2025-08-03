import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Abogados de Multas de Tránsito en NC | Proteja Su Licencia | YO PELEO POR TI™',
  description:
    'Defensa experta contra multas de tránsito en Carolina del Norte. Proteja su licencia, puntos y seguro. Ex-fiscales con 20+ años de experiencia. Consulta GRATIS: 1-844-YO-PELEO.',
  keywords:
    'multa transito NC, traffic ticket lawyer Raleigh, speeding ticket Charlotte, abogado multas Durham, reckless driving attorney NC',
  openGraph: {
    title: 'Abogados de Multas de Tránsito - Vasquez Law Firm | Carolina del Norte',
    description:
      'No pague esa multa sin consultar. Protegemos su récord de manejo y evitamos aumentos de seguro. Consulta gratuita.',
    images: [{ url: '/images/traffic-ticket-attorney.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/multas-de-transito',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/traffic-tickets',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/multas-de-transito',
    },
  },
};

const services = [
  {
    title: 'Exceso de Velocidad',
    description:
      'Defensa contra multas por exceso de velocidad que pueden resultar en puntos y aumentos de seguro.',
    features: [
      'Velocidad en zona escolar',
      'Exceso de 15+ mph',
      'Carreras ilegales',
      'Velocidad en zona de trabajo',
      'Reducción de velocidad',
      'Programas de mejora del conductor',
    ],
  },
  {
    title: 'Conducción Imprudente',
    description:
      'Cargos serios que pueden resultar en suspensión de licencia y tiempo en la cárcel.',
    features: [
      'Conducción agresiva',
      'Cambios de carril peligrosos',
      'Seguir muy de cerca',
      'Competencias de velocidad',
      'Conducción temeraria',
      'Negociación a cargos menores',
    ],
  },
  {
    title: 'Violaciones de Semáforo',
    description:
      'Defensa contra multas por semáforos en rojo y señales de alto que afectan su récord.',
    features: [
      'Luz roja',
      'Señal de alto',
      'Vuelta ilegal',
      'Cámaras de tráfico',
      'Derecho de paso',
      'Desafío de evidencia',
    ],
  },
  {
    title: 'Sin Licencia/Seguro',
    description: 'Representación para conductores acusados de manejar sin documentos apropiados.',
    features: [
      'Sin licencia válida',
      'Licencia suspendida',
      'Sin seguro de auto',
      'Licencia expirada',
      'Restauración de privilegios',
      'Cumplimiento SR-22',
    ],
  },
  {
    title: 'Accidentes de Tráfico',
    description: 'Defensa cuando es citado después de un accidente automovilístico.',
    features: [
      'Falla en ceder el paso',
      'Seguir muy de cerca',
      'Cambio de carril inseguro',
      'Falla en reducir velocidad',
      'Disputas de responsabilidad',
      'Coordinación con reclamos',
    ],
  },
  {
    title: 'Violaciones CDL',
    description: 'Protección especializada para conductores comerciales y su medio de vida.',
    features: [
      'Violaciones de libro de registro',
      'Sobrepeso de carga',
      'Inspecciones DOT',
      'Violaciones de horas de servicio',
      'Protección de empleo',
      'Cumplimiento FMCSA',
    ],
  },
  {
    title: 'Puntos de Licencia',
    description: 'Estrategias para proteger su licencia de acumulación de puntos y suspensión.',
    features: [
      'Evaluación de puntos',
      'Audiencias DMV',
      'Privilegios limitados',
      'Escuela de tráfico',
      'Reducción de puntos',
      'Prevención de suspensión',
    ],
  },
  {
    title: 'Multas de Equipo',
    description:
      'Defensa contra citaciones por violaciones de equipo y modificaciones de vehículo.',
    features: [
      'Ventanas polarizadas',
      'Escape ruidoso',
      'Luces ilegales',
      'Problemas de registro',
      'Inspección fallida',
      'Corrección y desestimación',
    ],
  },
  {
    title: 'Multas Fuera del Estado',
    description: 'Manejo de multas recibidas mientras conducía fuera de Carolina del Norte.',
    features: [
      'Transferencia interestatal',
      'Impacto en licencia NC',
      'Comparecencia remota',
      'Compact Driver License',
      'Protección de récord',
      'Resolución sin viajar',
    ],
  },
];

const faqs = [
  {
    question: '¿Debo simplemente pagar mi multa de tránsito?',
    answer:
      'NO pague sin consultar primero. Pagar una multa es admitir culpabilidad y puede resultar en puntos en su licencia, aumentos de seguro de hasta 80%, y posible suspensión. Una consulta gratuita puede revelar opciones para proteger su récord.',
  },
  {
    question: '¿Cuántos puntos puedo tener antes de perder mi licencia?',
    answer:
      'En Carolina del Norte, acumular 12 puntos en 3 años resulta en suspensión. Pero incluso 1-2 puntos pueden aumentar significativamente su seguro. También, ciertas violaciones resultan en suspensión inmediata sin importar los puntos.',
  },
  {
    question: '¿Puedo ir a la escuela de tráfico para eliminar la multa?',
    answer:
      'Posiblemente. NC permite escuela de mejora del conductor una vez cada 3 años para ciertas violaciones. Puede eliminar puntos de seguro pero no siempre puntos DMV. Un abogado puede negociar mejores resultados que solo escuela de tráfico.',
  },
  {
    question: '¿Qué pasa si no me presento en corte?',
    answer:
      'No presentarse resulta en "Failure to Appear" (FTA), suspensión automática de licencia, y posible orden de arresto. Si perdió su fecha, contacte un abogado inmediatamente para resolver el FTA y restaurar su licencia.',
  },
  {
    question: '¿Vale la pena contratar un abogado para una multa de tránsito?',
    answer:
      'Sí. El costo de un abogado es mínimo comparado con años de seguros elevados. Frecuentemente podemos reducir o eliminar cargos, evitar puntos, y mantener su récord limpio. La mayoría de casos no requieren que usted vaya a corte.',
  },
];

const content = (
  <>
    <h2 className="text-3xl font-bold mb-6">No Deje Que Una Multa Arruine Su Récord de Manejo</h2>

    <p className="mb-6">
      Recibir una multa de tránsito puede parecer un inconveniente menor, pero las consecuencias
      pueden perseguirlo por años. En Vasquez Law Firm, entendemos que su licencia de conducir es
      esencial para su trabajo, familia y vida diaria. Con más de 20 años defendiendo conductores en
      Carolina del Norte, sabemos exactamente cómo proteger su récord y mantener sus costos de
      seguro bajos.
    </p>

    <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8 text-black">
      <p className="text-lg font-semibold mb-2">⚠️ ADVERTENCIA: No Pague Esa Multa!</p>
      <p>
        Pagar una multa es admitir culpabilidad. Esto puede resultar en puntos, aumentos de seguro
        de hasta 80%, y posible suspensión de licencia. Consulte con un abogado primero - es GRATIS.
        Llame ahora: <strong>1-844-YO-PELEO</strong>
      </p>
    </div>

    <h3 className="text-2xl font-bold mb-4">El Verdadero Costo de Una Multa</h3>

    <div className="bg-black/20 p-6 rounded-lg mb-8">
      <p className="mb-4 font-semibold">Una multa de $200 puede costarle miles:</p>
      <ul className="space-y-2">
        <li>
          • <strong>Aumentos de seguro:</strong> 25-80% por 3-5 años
        </li>
        <li>
          • <strong>Puntos DMV:</strong> Acumulación hacia suspensión
        </li>
        <li>
          • <strong>Puntos de seguro:</strong> Tarifas más altas inmediatamente
        </li>
        <li>
          • <strong>Récord permanente:</strong> Visible a empleadores
        </li>
        <li>
          • <strong>Riesgo de suspensión:</strong> Pérdida de privilegios de conducir
        </li>
      </ul>
      <p className="mt-4 text-primary font-bold">
        Costo real de una multa no defendida: $3,000-$8,000 en 3 años
      </p>
    </div>

    <h3 className="text-2xl font-bold mb-4">Nuestro Proceso de Defensa</h3>

    <div className="space-y-4 mb-8">
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          1
        </div>
        <div>
          <h4 className="font-bold">Consulta Gratuita</h4>
          <p>Revisamos su multa, récord de manejo, y explicamos todas sus opciones sin costo.</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          2
        </div>
        <div>
          <h4 className="font-bold">Representación en Corte</h4>
          <p>Aparecemos por usted - la mayoría de clientes nunca tienen que ir a corte.</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          3
        </div>
        <div>
          <h4 className="font-bold">Negociación Experta</h4>
          <p>Trabajamos para reducir o eliminar cargos, evitar puntos, y proteger su récord.</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          4
        </div>
        <div>
          <h4 className="font-bold">Resolución Completa</h4>
          <p>Manejamos todo el papeleo y nos aseguramos que su caso se cierre correctamente.</p>
        </div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Por Qué Somos Diferentes</h3>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Experiencia Local</h4>
        <ul className="space-y-2 text-sm">
          <li>• 20+ años en cortes de NC</li>
          <li>• Conocemos todos los fiscales</li>
          <li>• Estrategias específicas por condado</li>
          <li>• Miles de multas resueltas</li>
        </ul>
      </div>
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Servicio Completo</h4>
        <ul className="space-y-2 text-sm">
          <li>• Usted no va a corte</li>
          <li>• Tarifas planas sin sorpresas</li>
          <li>• Notificaciones de cada paso</li>
          <li>• Garantía de satisfacción</li>
        </ul>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Tipos Específicos de Multas</h3>

    <div className="grid md:grid-cols-2 gap-4 mb-8">
      <Link
        href="/es/areas-de-practica/multas-de-transito/exceso-de-velocidad"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Exceso de Velocidad →</h4>
        <p className="text-sm">Proteja su récord contra multas de velocidad</p>
      </Link>
      <Link
        href="/es/areas-de-practica/multas-de-transito/conduccion-imprudente"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Conducción Imprudente →</h4>
        <p className="text-sm">Defensa contra cargos serios de tráfico</p>
      </Link>
    </div>
  </>
);

export default function MultasDeTransitoPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Abogados de Multas de Tránsito"
      subtitle="Protegemos Su Licencia y Récord de Manejo"
      description="No pague esa multa sin consultar. Nuestros abogados expertos pueden reducir o eliminar cargos, evitar puntos, y mantener sus costos de seguro bajos."
      services={services}
      faqs={faqs}
      content={content}
    />
  );
}
