import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Link from 'next/link';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Abogados de Infracciones de Tránsito en NC | Defensa Experta | YO PELEO POR TI™',
  description:
    'Defensa contra infracciones de tránsito en Carolina del Norte. Licencias suspendidas, multas acumuladas, violaciones comerciales. Consulta GRATIS: 1-844-YO-PELEO.',
  keywords:
    'infracciones transito NC, traffic violations lawyer Raleigh, suspended license Charlotte, CDL violations Durham, moving violations attorney NC',
  openGraph: {
    title: 'Abogados de Infracciones de Tránsito - Vasquez Law Firm | Carolina del Norte',
    description:
      'Defensa integral contra todas las infracciones de tránsito. Protegemos su licencia y récord de manejo.',
    images: [{ url: '/images/traffic-violations-attorney.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/infracciones-transito',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/traffic-violations',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/infracciones-transito',
    },
  },
};

const services = [
  {
    title: 'Licencia Suspendida',
    description:
      'Representación experta para restaurar privilegios de conducir y resolver suspensiones.',
    features: [
      'Suspensión por puntos',
      'FTA (Falla en aparecer)',
      'FTC (Falla en cumplir)',
      'Sin seguro válido',
      'Privilegios limitados',
      'Restauración completa',
    ],
  },
  {
    title: 'Múltiples Violaciones',
    description:
      'Defensa estratégica cuando enfrenta múltiples citaciones o violaciones acumuladas.',
    features: [
      'Consolidación de casos',
      'Negociación global',
      'Reducción de puntos totales',
      'Evitar suspensión',
      'Planes de pago',
      'Cumplimiento ordenado',
    ],
  },
  {
    title: 'Violaciones de Registro',
    description: 'Asistencia con problemas de registro vehicular y cumplimiento DMV.',
    features: [
      'Registro expirado',
      'Placas falsas/alteradas',
      'Sin registro',
      'Problemas de título',
      'Transferencias indebidas',
      'Cumplimiento DMV',
    ],
  },
  {
    title: 'Infracciones de Seguridad',
    description:
      'Defensa contra violaciones que afectan la seguridad vial y conllevan penalidades severas.',
    features: [
      'Zonas escolares',
      'Zonas de construcción',
      'Paso de autobús escolar',
      'Vehículos de emergencia',
      'Peatones en cruces',
      'Carriles HOV',
    ],
  },
  {
    title: 'Citaciones Comerciales',
    description: 'Protección especializada para conductores comerciales y sus medios de vida.',
    features: [
      'Violaciones DOT',
      'Peso y dimensiones',
      'Permisos especiales',
      'HAZMAT violations',
      'Libro de registro',
      'Inspecciones fallidas',
    ],
  },
  {
    title: 'Huir de la Escena',
    description: 'Defensa seria para cargos de abandonar la escena de un accidente.',
    features: [
      'Hit and run',
      'Dejar la escena',
      'Falla en reportar',
      'Daño a propiedad',
      'Lesiones personales',
      'Defensa de emergencia',
    ],
  },
  {
    title: 'Cámaras de Tráfico',
    description: 'Desafío de citaciones basadas en cámaras de luz roja y velocidad.',
    features: [
      'Cámaras de luz roja',
      'Cámaras de velocidad',
      'Evidencia fotográfica',
      'Calibración de equipo',
      'Identificación del conductor',
      'Defensas técnicas',
    ],
  },
  {
    title: 'Audiencias DMV',
    description: 'Representación en audiencias administrativas DMV para proteger su licencia.',
    features: [
      'Audiencias de suspensión',
      'Revisiones médicas',
      'Puntos excesivos',
      'Restauración de licencia',
      'Privilegios ocupacionales',
      'Apelaciones',
    ],
  },
  {
    title: 'Violaciones Juveniles',
    description: 'Protección especial para conductores jóvenes y sus futuros.',
    features: [
      'Licencias provisionales',
      'Restricciones violadas',
      'Toque de queda',
      'Pasajeros no permitidos',
      'Uso de celular',
      'Protección de récord',
    ],
  },
];

const faqs = [
  {
    question: '¿Por qué mi licencia fue suspendida sin que yo lo supiera?',
    answer:
      'Las suspensiones pueden ocurrir automáticamente por no pagar multas, no aparecer en corte (FTA), o acumular demasiados puntos. NC no siempre notifica antes de suspender. Si lo detienen con licencia suspendida, enfrenta cargos criminales. Podemos verificar su estatus y trabajar para restaurarla inmediatamente.',
  },
  {
    question: '¿Qué es una violación "moving" vs "non-moving"?',
    answer:
      'Las violaciones "moving" ocurren mientras el vehículo está en movimiento (velocidad, luz roja, cambio inseguro) y generalmente resultan en puntos. Las "non-moving" son estacionarias (parqueo, registro, equipo) y usualmente no dan puntos pero pueden tener multas altas. Ambas pueden afectar su récord.',
  },
  {
    question: '¿Puedo manejar mientras mi caso está pendiente?',
    answer:
      'Generalmente sí, a menos que su licencia ya esté suspendida o revocada. Sin embargo, acumular más violaciones mientras un caso está pendiente puede empeorar significativamente su situación. Es crucial resolver casos pendientes rápidamente.',
  },
  {
    question: '¿Qué pasa si ignoro una citación de tráfico?',
    answer:
      'NUNCA ignore una citación. Resulta en "Failure to Appear" (FTA), suspensión automática de licencia, multas adicionales, y posible orden de arresto. Incluso citaciones de otros estados pueden afectar su licencia de NC. Siempre responda a tiempo.',
  },
  {
    question: '¿Cómo afectan las infracciones mi CDL (licencia comercial)?',
    answer:
      'Los conductores CDL enfrentan estándares más estrictos. Violaciones en vehículo personal también afectan su CDL. Ciertas violaciones resultan en descalificación de CDL por meses o permanentemente. Es crítico proteger su CDL con defensa especializada.',
  },
];

const content = (
  <>
    <h2 className="text-3xl font-bold mb-6">Protegemos Su Derecho a Conducir</h2>

    <p className="mb-6">
      En Carolina del Norte, perder su licencia de conducir puede significar perder su trabajo,
      educación, y capacidad de mantener a su familia. En Vasquez Law Firm, entendemos que conducir
      no es un lujo - es una necesidad. Con décadas de experiencia defendiendo todo tipo de
      infracciones de tránsito, sabemos cómo proteger su licencia y minimizar el impacto en su vida.
    </p>

    <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-8 text-black">
      <p className="text-lg font-semibold mb-2">⚠️ ¿Licencia Suspendida?</p>
      <p>
        Manejar con licencia suspendida es un CRIMEN en NC. Puede resultar en arresto, cárcel, y
        suspensión más larga. Si cree que su licencia puede estar suspendida, NO MANEJE. Llámenos
        inmediatamente: <strong>1-844-YO-PELEO</strong>
      </p>
    </div>

    <h3 className="text-2xl font-bold mb-4">Consecuencias Que Muchos Ignoran</h3>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Impacto Inmediato</h4>
        <ul className="space-y-2 text-sm">
          <li>• Multas que aumentan con recargos</li>
          <li>• Puntos en su licencia</li>
          <li>• Aumento de seguro inmediato</li>
          <li>• Posible suspensión de licencia</li>
          <li>• Antecedentes criminales</li>
        </ul>
      </div>
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Consecuencias a Largo Plazo</h4>
        <ul className="space-y-2 text-sm">
          <li>• Problemas de empleo</li>
          <li>• Seguro caro por años</li>
          <li>• Dificultad para rentar autos</li>
          <li>• Impacto en custodia de hijos</li>
          <li>• Problemas con inmigración</li>
        </ul>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Nuestro Enfoque de Defensa</h3>

    <div className="space-y-4 mb-8">
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          1
        </div>
        <div>
          <h4 className="font-bold">Análisis Completo</h4>
          <p>
            Revisamos su récord completo, puntos acumulados, y estado de licencia para entender el
            panorama total.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          2
        </div>
        <div>
          <h4 className="font-bold">Estrategia Personalizada</h4>
          <p>
            Desarrollamos un plan específico para su situación, considerando su historial y
            necesidades.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          3
        </div>
        <div>
          <h4 className="font-bold">Negociación Experta</h4>
          <p>
            Trabajamos con fiscales y DMV para reducir o eliminar penalidades y proteger su
            licencia.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          4
        </div>
        <div>
          <h4 className="font-bold">Protección Continua</h4>
          <p>Le asesoramos sobre cómo mantener su récord limpio y evitar problemas futuros.</p>
        </div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Casos Especiales Que Manejamos</h3>

    <div className="bg-black/20 p-6 rounded-lg mb-8">
      <ul className="grid md:grid-cols-2 gap-4">
        <li className="flex items-start">
          <span className="text-primary mr-2">✓</span>
          <span>Conductores comerciales (CDL) con su sustento en riesgo</span>
        </li>
        <li className="flex items-start">
          <span className="text-primary mr-2">✓</span>
          <span>Conductores jóvenes protegiendo su futuro</span>
        </li>
        <li className="flex items-start">
          <span className="text-primary mr-2">✓</span>
          <span>Profesionales que necesitan licencia limpia</span>
        </li>
        <li className="flex items-start">
          <span className="text-primary mr-2">✓</span>
          <span>Inmigrantes evitando complicaciones legales</span>
        </li>
        <li className="flex items-start">
          <span className="text-primary mr-2">✓</span>
          <span>Múltiples violaciones requiriendo estrategia compleja</span>
        </li>
        <li className="flex items-start">
          <span className="text-primary mr-2">✓</span>
          <span>Violaciones fuera del estado afectando licencia NC</span>
        </li>
      </ul>
    </div>

    <h3 className="text-2xl font-bold mb-4">Actúe Rápido - El Tiempo Importa</h3>

    <p className="mb-6">
      Muchas infracciones tienen plazos estrictos para responder. Esperar puede resultar en
      suspensión automática, órdenes de arresto, y pérdida de opciones de defensa. No arriesgue su
      futuro - obtenga ayuda profesional inmediatamente.
    </p>
  </>
);

export default function InfraccionesTransitoPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Abogados de Infracciones de Tránsito"
      subtitle="Defendemos Su Licencia y Futuro"
      description="Desde licencias suspendidas hasta violaciones CDL, protegemos su derecho a conducir con defensa experta y resultados comprobados."
      services={services}
      faqs={faqs}
      content={content}
    />
  );
}
