import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Link from 'next/link';
export const metadata: Metadata = {
  title:
    'Abogados de Defensa por Asalto y Agresión en NC | Proteja Su Libertad | YO PELEO POR TI™',
  description:
    'Abogados expertos en defensa por asalto y agresión en Carolina del Norte. Defensa agresiva contra cargos de asalto simple, agravado y agresión. Consulta GRATIS 24/7.',
  keywords:
    'abogado asalto NC, abogado agresión Carolina del Norte, defensa criminal asalto, abogado violencia Raleigh, defensa agresión Charlotte, abogado asalto simple Durham, asalto agravado Greensboro',
  openGraph: {
    title: 'Abogados de Defensa por Asalto y Agresión - Vasquez Law Firm | Carolina del Norte',
    description:
      'Defensa experta contra cargos de asalto y agresión. Protegemos su libertad y futuro con estrategias probadas de defensa criminal.',
    images: [{ url: '/images/criminal-defense-assault-battery.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/defensa-criminal/asalto-agresion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/criminal-defense/assault-battery',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/defensa-criminal/asalto-agresion',
    },
  },
};

const services = [
  {
    title: 'Asalto Simple',
    description:
      'Defensa contra cargos de asalto simple, incluyendo amenazas verbales, gestos intimidantes, y contacto físico menor.',
    features: [
      'Amenazas verbales y intimidación',
      'Gestos amenazantes',
      'Contacto físico menor',
      'Peleas de bar y discusiones',
      'Disputas familiares',
      'Malentendidos escalados',
    ],
  },
  {
    title: 'Asalto Agravado',
    description:
      'Defensa seria para cargos de asalto agravado con armas, lesiones graves, o contra oficiales públicos.',
    features: [
      'Asalto con arma mortal',
      'Lesiones corporales graves',
      'Asalto contra oficial de policía',
      'Intención de matar o herir gravemente',
      'Uso de objetos como armas',
      'Reducción de felonía a delito menor',
    ],
  },
  {
    title: 'Agresión y Lesiones',
    description:
      'Representación en casos de agresión que resultaron en lesiones físicas reales o amenaza de daño.',
    features: [
      'Lesiones corporales intencionales',
      'Agresión con contacto ofensivo',
      'Casos de autodefensa',
      'Defensa de terceros',
      'Provocación y consentimiento',
      'Evidencia médica y forense',
    ],
  },
  {
    title: 'Violencia en Relaciones',
    description:
      'Defensa especializada en casos de violencia entre parejas, ex-parejas, y miembros de familia.',
    features: [
      'Violencia doméstica relacionada',
      'Órdenes de protección',
      'Violaciones de órdenes existentes',
      'Impacto en custodia de niños',
      'Falsas acusaciones',
      'Mediación y programas alternativos',
    ],
  },
  {
    title: 'Peleas y Disturbios',
    description:
      'Representación en casos de peleas públicas, disturbios, y comportamiento violento en grupo.',
    features: [
      'Peleas en lugares públicos',
      'Comportamiento desordenado',
      'Disturbios y manifestaciones',
      'Violencia en eventos deportivos',
      'Peleas escolares',
      'Identificación errónea',
    ],
  },
  {
    title: 'Asalto con Consecuencias Específicas',
    description:
      'Defensa contra cargos de asalto con factores agravantes especiales o víctimas protegidas.',
    features: [
      'Asalto contra mujeres embarazadas',
      'Violencia contra ancianos',
      'Asalto en propiedad escolar',
      'Violencia contra trabajadores de salud',
      'Crímenes de odio',
      'Lesiones permanentes',
    ],
  },
];

const faqs = [
  {
    question: '¿Cuál es la diferencia entre asalto y agresión?',
    answer:
      'En Carolina del Norte, asalto es la amenaza o intento de causar daño físico, mientras que agresión implica contacto físico real. Ambos pueden ser delitos menores o felonías dependiendo de las circunstancias.',
  },
  {
    question: '¿Puedo alegar autodefensa?',
    answer:
      'Sí, la autodefensa es una defensa válida si usted razonablemente creía que estaba en peligro inmediato y usó solo la fuerza necesaria para protegerse. Debemos probar que su respuesta fue proporcional a la amenaza.',
  },
  {
    question: '¿Qué penas enfrento por asalto?',
    answer:
      'Asalto simple es típicamente un delito menor Clase 2 con hasta 30 días de cárcel. Asalto agravado puede ser una felonía con años de prisión. Las penalidades aumentan con antecedentes criminales.',
  },
  {
    question: '¿Afectará esto mi trabajo o inmigración?',
    answer:
      'Los cargos de asalto pueden afectar severamente el empleo, licencias profesionales, y estatus migratorio. Es crucial luchar contra estos cargos para proteger su futuro.',
  },
  {
    question: '¿Qué si la "víctima" no quiere cooperar?',
    answer:
      'Incluso si la víctima no quiere proceder, el estado puede continuar el caso. Sin embargo, esto puede debilitar significativamente su caso, y tenemos estrategias para aprovechar esta situación.',
  },
];

const content = (
  <>
    <h2 className="text-3xl font-bold mb-6">Defensa Agresiva Contra Cargos de Asalto y Agresión</h2>

    <p className="mb-6">
      Los cargos de asalto y agresión pueden destruir su reputación, carrera y libertad. Desde
      peleas simples hasta asalto agravado con armas, estos casos requieren defensa experta
      inmediata. En Vasquez Law Firm, entendemos que las situaciones pueden escalar rápidamente, y
      que buenas personas pueden enfrentar cargos serios por malentendidos o autodefensa.
    </p>

    <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8 text-black">
      <p className="text-lg font-semibold mb-2">⚠️ ACCIÓN INMEDIATA REQUERIDA</p>
      <p>
        Los cargos de asalto conllevan consecuencias inmediatas incluyendo arrestos, fianza, órdenes
        de protección, y pérdida de derechos de armas. No hable con la policía sin un abogado.
        <strong> Llame ahora: 1-844-YO-PELEO</strong>
      </p>
    </div>

    <h3 className="text-2xl font-bold mb-4">Estrategias de Defensa Especializada</h3>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Autodefensa y Defensa de Terceros</h4>
        <p className="text-sm mb-3">
          Si usted actuó para protegerse o proteger a otros, tenemos estrategias específicas para
          probar que su respuesta fue justificada y proporcional.
        </p>
        <ul className="space-y-2 text-sm">
          <li>• Reconstrucción de la escena</li>
          <li>• Testimonios de testigos</li>
          <li>• Evidencia de video/audio</li>
        </ul>
      </div>
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Desafío de Evidencia</h4>
        <p className="text-sm mb-3">
          Examinamos cada pieza de evidencia del estado para encontrar debilidades, inconsistencias,
          e identificación errónea que pueden llevar a desestimación.
        </p>
        <ul className="space-y-2 text-sm">
          <li>• Identificación de testigos oculares</li>
          <li>• Evidencia médica incompleta</li>
          <li>• Procedimientos policiales incorrectos</li>
        </ul>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Tipos de Casos de Asalto</h3>

    <div className="space-y-4 mb-8">
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          1
        </div>
        <div>
          <h4 className="font-bold">Asalto Simple (Delito Menor)</h4>
          <p>
            Amenazas, gestos intimidantes, o contacto físico menor. Penalidades: hasta 30 días de
            cárcel, libertad condicional, multas.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          2
        </div>
        <div>
          <h4 className="font-bold">Asalto con Arma Mortal (Felonía)</h4>
          <p>
            Uso de armas o objetos peligrosos. Penalidades: hasta varios años de prisión,
            antecedentes de felonía permanentes.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          3
        </div>
        <div>
          <h4 className="font-bold">Asalto Causando Lesión Corporal Grave</h4>
          <p>
            Lesiones que requieren atención médica significativa. Penalidades: prisión prolongada,
            restitución médica masiva.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          4
        </div>
        <div>
          <h4 className="font-bold">Asalto contra Oficial Público</h4>
          <p>
            Asalto contra policía, EMT, bomberos. Penalidades aumentadas automáticamente,
            tratamiento severo en corte.
          </p>
        </div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Consecuencias Más Allá de la Cárcel</h3>

    <div className="grid md:grid-cols-3 gap-4 mb-8">
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-xl font-bold text-primary mb-2">Empleo</div>
        <div className="text-sm">Pérdida de trabajo, licencias profesionales afectadas</div>
      </div>
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-xl font-bold text-primary mb-2">Familia</div>
        <div className="text-sm">Custodia de niños, órdenes de protección</div>
      </div>
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-xl font-bold text-primary mb-2">Derechos</div>
        <div className="text-sm">Pérdida de derechos de armas, votación</div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Casos Relacionados de Defensa Criminal</h3>

    <div className="grid md:grid-cols-2 gap-4 mb-8">
      <Link
        href="/es/areas-de-practica/defensa-criminal/violencia-domestica"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Violencia Doméstica →</h4>
        <p className="text-sm">Defensa especializada en casos familiares</p>
      </Link>
      <Link
        href="/es/areas-de-practica/defensa-criminal"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Defensa Criminal General →</h4>
        <p className="text-sm">Todos los servicios de defensa criminal</p>
      </Link>
    </div>
  </>
);

export default function AsaltoAgresionPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Abogados de Defensa por Asalto y Agresión"
      subtitle="Protegiendo Su Libertad y Futuro Contra Cargos Violentos"
      description="Cuando enfrente cargos de asalto o agresión, necesita defensa experta inmediata. Nuestros abogados luchan agresivamente para proteger su libertad y reputación."
      services={services}
      faqs={faqs}
      content={content}
    />
  );
}
