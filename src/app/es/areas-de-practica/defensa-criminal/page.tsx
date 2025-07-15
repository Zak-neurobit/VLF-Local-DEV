import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Abogados de Defensa Criminal en NC | Protegemos Su Libertad 24/7 | YO PELEO POR TI™',
  description:
    'Defensa criminal agresiva en Carolina del Norte. DWI/DUI, drogas, asalto, violencia doméstica. Ex-fiscales con 98% tasa de éxito. Disponible 24/7. Consulta GRATIS: 1-844-YO-PELEO.',
  keywords:
    'abogado defensa criminal NC, criminal defense lawyer Raleigh, DWI attorney Charlotte, abogado drogas Durham, domestic violence lawyer NC',
  openGraph: {
    title: 'Abogados de Defensa Criminal - Vasquez Law Firm | Carolina del Norte',
    description:
      'Defensa agresiva para cargos criminales. Ex-fiscales que conocen el sistema. Disponibles 24/7 para emergencias.',
    images: [{ url: '/images/criminal-defense-attorney.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/defensa-criminal',
    },
  },
};

const services = [
  {
    title: 'DWI / DUI',
    description:
      'Defensa experta contra cargos de conducir bajo influencia con estrategias para proteger su licencia y libertad.',
    features: [
      'Primera ofensa y múltiples DWI',
      'Audiencias DMV para licencia',
      'Desafío de pruebas de aliento',
      'Field sobriety tests',
      'Reducción de cargos',
      'Programas de tratamiento',
    ],
  },
  {
    title: 'Cargos de Drogas',
    description:
      'Representación agresiva para todos los cargos relacionados con drogas, desde posesión hasta tráfico.',
    features: [
      'Posesión simple',
      'Posesión con intención',
      'Tráfico y distribución',
      'Conspiración de drogas',
      'Casos federales',
      'Programas de diversión',
    ],
  },
  {
    title: 'Violencia Doméstica',
    description:
      'Defensa sensible pero agresiva en casos de violencia doméstica con impacto en familia y empleo.',
    features: [
      'Órdenes de protección',
      'Cargos de asalto',
      'Violación de órdenes',
      'Impacto en custodia',
      'Consecuencias migratorias',
      'Programas de intervención',
    ],
  },
  {
    title: 'Crímenes Violentos',
    description:
      'Defensa seria para cargos graves incluyendo asalto, robo y otros crímenes violentos.',
    features: [
      'Asalto simple y agravado',
      'Robo a mano armada',
      'Secuestro',
      'Homicidio involuntario',
      'Defensa propia',
      'Negociación de fianzas',
    ],
  },
  {
    title: 'Robo y Hurto',
    description:
      'Protección contra cargos de propiedad que pueden afectar su futuro empleo y oportunidades.',
    features: [
      'Hurto menor (shoplifting)',
      'Robo mayor',
      'Malversación',
      'Recibir propiedad robada',
      'Robo de identidad',
      'Fraude con cheques',
    ],
  },
  {
    title: 'Crímenes Sexuales',
    description:
      'Defensa discreta y agresiva para acusaciones que pueden destruir reputaciones y vidas.',
    features: [
      'Acusaciones falsas',
      'Violación estatutaria',
      'Conducta sexual indebida',
      'Registro de ofensores',
      'Exposición indecente',
      'Solicitud',
    ],
  },
  {
    title: 'Armas de Fuego',
    description: 'Defensa de derechos de Segunda Enmienda y cargos relacionados con armas.',
    features: [
      'Portación ilegal',
      'Posesión por delincuente',
      'Portación oculta sin permiso',
      'Descarga de arma',
      'Armas en escuelas',
      'Restauración de derechos',
    ],
  },
  {
    title: 'Violación de Libertad Condicional',
    description:
      'Evite la cárcel cuando enfrente violaciones técnicas o nuevos cargos durante probatoria.',
    features: [
      'Violaciones técnicas',
      'Nuevos cargos criminales',
      'Audiencias de revocación',
      'Modificación de términos',
      'Terminación temprana',
      'Alternativas a revocación',
    ],
  },
  {
    title: 'Crímenes Federales',
    description:
      'Representación especializada en cortes federales con apuestas más altas y sentencias más severas.',
    features: [
      'Conspiración federal',
      'Crímenes de cuello blanco',
      'RICO',
      'Fraude bancario/postal',
      'Evasión de impuestos',
      'Cruce de líneas estatales',
    ],
  },
];

const faqs = [
  {
    question: '¿Qué debo hacer si me arrestan?',
    answer:
      'Permanezca en silencio y pida un abogado inmediatamente. No hable con la policía sin representación legal. Tiene derecho a permanecer callado y cualquier cosa que diga puede usarse en su contra. Llámenos 24/7 al 1-844-YO-PELEO.',
  },
  {
    question: '¿Cuánto cobra un abogado de defensa criminal?',
    answer:
      'Nuestros honorarios varían según la complejidad del caso. Ofrecemos consultas GRATUITAS, planes de pago flexibles, y en algunos casos trabajamos por tarifa plana. No deje que el costo le impida obtener la defensa que necesita.',
  },
  {
    question: '¿Puedo limpiar mi récord criminal?',
    answer:
      'Posiblemente. Carolina del Norte permite expungement (eliminación) de ciertos cargos después de períodos de espera específicos. Cargos desestimados, absoluciones, y algunas condenas pueden ser elegibles. Evaluamos su elegibilidad gratuitamente.',
  },
  {
    question: '¿Qué pasa si soy culpable?',
    answer:
      'Ser culpable no significa que deba declararse culpable. Tenemos muchas estrategias para reducir cargos, minimizar sentencias, o encontrar alternativas a la cárcel. Un buen abogado puede hacer una gran diferencia incluso en casos difíciles.',
  },
  {
    question: '¿Afectará un cargo criminal mi estatus migratorio?',
    answer:
      'Muchos cargos criminales tienen consecuencias migratorias severas. Es crucial tener un abogado que entienda ambas leyes. Trabajamos para proteger tanto su libertad como su estatus migratorio.',
  },
];

const content = (
  <>
    <h2 className="text-3xl font-bold mb-6">Defensa Criminal Agresiva Cuando Más Lo Necesita</h2>

    <p className="mb-6">
      Enfrentar cargos criminales es una de las experiencias más aterradoras de la vida. Su
      libertad, trabajo, familia y futuro están en juego. En Vasquez Law Firm, entendemos lo que
      está en riesgo. Con ex-fiscales en nuestro equipo que conocen el sistema desde adentro,
      luchamos incansablemente para proteger sus derechos y obtener el mejor resultado posible.
    </p>

    <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8 text-black">
      <p className="text-lg font-semibold mb-2">⚠️ ADVERTENCIA: El Tiempo es Crítico</p>
      <p>
        Los primeros días después de un arresto son cruciales. La evidencia puede perderse, los
        testigos desaparecer, y los plazos legales vencer. No espere - llame ahora:
        <strong> 1-844-YO-PELEO</strong>
      </p>
    </div>

    <h3 className="text-2xl font-bold mb-4">Por Qué Somos Diferentes</h3>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Ex-Fiscales en Su Equipo</h4>
        <p className="text-sm mb-3">
          Nuestros abogados incluyen ex-fiscales que saben exactamente cómo el estado construye
          casos - y cómo desmantelarlos.
        </p>
        <ul className="space-y-2 text-sm">
          <li>• Conocemos sus tácticas</li>
          <li>• Anticipamos sus movimientos</li>
          <li>• Negociamos desde posición de fuerza</li>
        </ul>
      </div>
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Disponibles 24/7</h4>
        <p className="text-sm mb-3">
          Los arrestos no esperan horarios de oficina. Estamos disponibles noches, fines de semana y
          días festivos.
        </p>
        <ul className="space-y-2 text-sm">
          <li>• Respuesta inmediata</li>
          <li>• Visitas a la cárcel</li>
          <li>• Audiencias de fianza rápidas</li>
        </ul>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Proceso de Defensa Criminal</h3>

    <div className="space-y-4 mb-8">
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          1
        </div>
        <div>
          <h4 className="font-bold">Consulta de Emergencia</h4>
          <p>
            Evaluación inmediata de su caso y protección de sus derechos desde el primer momento.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          2
        </div>
        <div>
          <h4 className="font-bold">Investigación Completa</h4>
          <p>
            Recopilamos evidencia, entrevistamos testigos, y encontramos debilidades en el caso del
            estado.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          3
        </div>
        <div>
          <h4 className="font-bold">Negociación Agresiva</h4>
          <p>
            Luchamos por desestimación, reducción de cargos, o programas alternativos antes del
            juicio.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          4
        </div>
        <div>
          <h4 className="font-bold">Defensa en Juicio</h4>
          <p>
            Si es necesario, presentamos una defensa agresiva en corte para proteger su libertad.
          </p>
        </div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Resultados Que Hablan</h3>

    <div className="grid md:grid-cols-3 gap-4 mb-8">
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-3xl font-bold text-primary mb-2">98%</div>
        <div className="text-sm">Tasa de Éxito</div>
      </div>
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-3xl font-bold text-primary mb-2">5000+</div>
        <div className="text-sm">Casos Ganados</div>
      </div>
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-3xl font-bold text-primary mb-2">24/7</div>
        <div className="text-sm">Disponibilidad</div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Casos Específicos de Defensa Criminal</h3>

    <div className="grid md:grid-cols-2 gap-4 mb-8">
      <Link
        href="/es/areas-de-practica/defensa-criminal/dui-dwi"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">DUI/DWI →</h4>
        <p className="text-sm">Proteja su licencia y libertad</p>
      </Link>
      <Link
        href="/es/areas-de-practica/defensa-criminal/violacion-de-libertad-condicional"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Violación de Probatoria →</h4>
        <p className="text-sm">Evite volver a la cárcel</p>
      </Link>
    </div>
  </>
);

export default function DefensaCriminalPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Abogados de Defensa Criminal"
      subtitle="Ex-Fiscales Luchando Por Su Libertad 24/7"
      description="Cuando su libertad está en juego, necesita abogados que conocen el sistema desde adentro. Defensa agresiva para todos los cargos criminales."
      services={services}
      faqs={faqs}
      content={content}
    />
  );
}
