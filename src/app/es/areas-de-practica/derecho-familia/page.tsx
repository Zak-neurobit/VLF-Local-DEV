import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Abogados de Derecho Familiar en NC | Divorcios y Custodia | YO PELEO POR TI™',
  description:
    'Abogados compasivos pero agresivos en derecho familiar. Divorcios, custodia, manutención, violencia doméstica. Protegemos su familia. Consulta GRATIS: 1-844-YO-PELEO.',
  keywords:
    'abogado divorcio NC, family lawyer Raleigh, child custody Charlotte, alimony attorney Durham, domestic violence lawyer NC',
  openGraph: {
    title: 'Abogados de Derecho Familiar - Vasquez Law Firm | Carolina del Norte',
    description:
      'Guía experta a través de divorcios complejos y disputas de custodia. Protegemos sus intereses y los de sus hijos.',
    images: [{ url: '/images/family-law-attorney.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/derecho-familia',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/derecho-familia',
    },
  },
};

const services = [
  {
    title: 'Divorcio',
    description:
      'Guía experta a través del proceso de divorcio, protegiendo sus derechos y activos.',
    features: [
      'Divorcio sin disputas',
      'Divorcio contencioso',
      'División de propiedades',
      'Deudas y activos',
      'Acuerdos prenupciales',
      'Separación legal',
    ],
  },
  {
    title: 'Custodia de Hijos',
    description:
      'Luchando por el mejor interés de sus hijos con estrategias compasivas pero firmes.',
    features: [
      'Custodia física y legal',
      'Planes de crianza',
      'Modificaciones de custodia',
      'Relocalización parental',
      'Derechos de abuelos',
      'Casos interestatales',
    ],
  },
  {
    title: 'Manutención Infantil',
    description:
      'Asegurando apoyo financiero justo para sus hijos o defendiendo contra demandas injustas.',
    features: [
      'Cálculos de manutención',
      'Modificaciones por cambios',
      'Ejecución de órdenes',
      'Atrasos y contempt',
      'Gastos extraordinarios',
      'Cobertura médica',
    ],
  },
  {
    title: 'Manutención Conyugal',
    description: 'Negociando manutención conyugal justa, ya sea que la busque o la dispute.',
    features: [
      'Alimony temporal',
      'Alimony permanente',
      'Alimony rehabilitativo',
      'Modificaciones',
      'Terminación',
      'Consideraciones fiscales',
    ],
  },
  {
    title: 'Violencia Doméstica',
    description: 'Protección inmediata y representación compasiva para víctimas de abuso.',
    features: [
      'Órdenes de protección 50B',
      'Custodia de emergencia',
      'Exclusión del hogar',
      'Violaciones criminales',
      'Planes de seguridad',
      'Recursos para víctimas',
    ],
  },
  {
    title: 'División de Propiedades',
    description: 'Distribución equitativa de activos y deudas maritales con análisis experto.',
    features: [
      'Bienes raíces',
      'Cuentas de retiro',
      'Negocios familiares',
      'Deudas maritales',
      'Propiedad separada',
      'Valuaciones complejas',
    ],
  },
  {
    title: 'Adopciones',
    description: 'Facilitando adopciones con sensibilidad y experiencia legal completa.',
    features: [
      'Adopciones de padrastros',
      'Adopciones privadas',
      'Adopciones de familiares',
      'Terminación de derechos',
      'Adopciones adultas',
      'Estudios del hogar',
    ],
  },
  {
    title: 'Acuerdos Prematrimoniales',
    description: 'Protegiendo activos futuros y clarificando expectativas antes del matrimonio.',
    features: [
      'Protección de activos',
      'Herencias futuras',
      'Deudas prematrimoniales',
      'Negocios existentes',
      'Manutención futura',
      'Claúsulas sunset',
    ],
  },
  {
    title: 'Modificaciones Post-Divorcio',
    description: 'Ajustando órdenes existentes cuando la vida cambia después del divorcio.',
    features: [
      'Cambios de ingresos',
      'Relocalización',
      'Necesidades de los hijos',
      'Cohabitación',
      'Cambios médicos',
      'Edad de emancipación',
    ],
  },
];

const faqs = [
  {
    question: '¿Cuánto tiempo toma un divorcio en Carolina del Norte?',
    answer:
      'Mínimo 1 año de separación es requerido antes de poder solicitar divorcio. Divorcios sin disputas pueden finalizar en 45-60 días después de presentar. Casos disputados pueden tomar 6-18 meses dependiendo de custodia, propiedades, y otros asuntos. La separación debe ser continua e ininterrumpida.',
  },
  {
    question: '¿Cómo se determina la custodia de los hijos?',
    answer:
      'NC usa el estándar del "mejor interés del niño" considerando múltiples factores: estabilidad del hogar, salud mental/física de padres, historial de cuidado, preferencias del niño (si tiene edad), violencia doméstica, abuso de sustancias, y capacidad de co-parentalidad. No hay preferencia automática por madres o padres.',
  },
  {
    question: '¿Tengo derecho a manutención conyugal (alimony)?',
    answer:
      'Depende de múltiples factores: duración del matrimonio, ingresos y capacidad de ganar de cada cónyuge, contribuciones al matrimonio, edad y salud, nivel de vida marital, y mala conducta marital. Adulterio puede descalificar al cónyuge dependiente o requerir que el sostentador pague.',
  },
  {
    question: '¿Qué es distribución equitativa en NC?',
    answer:
      'NC divide propiedad marital "equitativamente" (justamente), no necesariamente 50/50. Propiedad marital incluye todo adquirido durante el matrimonio. Propiedad separada (pre-marital, herencias, regalos) generalmente no se divide. La corte considera muchos factores para determinar qué es justo.',
  },
  {
    question: '¿Puedo mudarme con mis hijos a otro estado?',
    answer:
      'Relocalización requiere permiso del otro padre o aprobación de la corte. Debe demostrar que la mudanza es por razón legítima (trabajo, familia, educación) y en el mejor interés de los niños. La corte considerará el impacto en la relación con el otro padre y puede modificar custodia.',
  },
];

const content = (
  <>
    <h2 className="text-3xl font-bold mb-6">Protegiendo Su Familia Durante Tiempos Difíciles</h2>

    <p className="mb-6">
      Los asuntos de derecho familiar son profundamente personales y emocionalmente desafiantes. En
      Vasquez Law Firm, combinamos compasión con representación agresiva para proteger lo que más
      importa: su familia, sus hijos, y su futuro. Con décadas de experiencia en las cortes de
      familia de Carolina del Norte, entendemos las leyes y sabemos cómo luchar por sus derechos.
    </p>

    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 text-black">
      <p className="text-lg font-semibold mb-2">💙 Su Familia es Nuestra Prioridad</p>
      <p>
        Sabemos que está pasando por uno de los momentos más difíciles de su vida. Estamos aquí para
        guiarlo con empatía y experiencia. Primera consulta GRATIS y confidencial:{' '}
        <strong>1-844-YO-PELEO</strong>
      </p>
    </div>

    <h3 className="text-2xl font-bold mb-4">Por Qué Elegirnos Para Su Caso Familiar</h3>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Experiencia Que Importa</h4>
        <ul className="space-y-2 text-sm">
          <li>• 35+ años en derecho familiar NC</li>
          <li>• Miles de divorcios manejados</li>
          <li>• Expertos en custodia compleja</li>
          <li>• Certificados en derecho familiar</li>
          <li>• Mediadores capacitados</li>
        </ul>
      </div>
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Enfoque Personalizado</h4>
        <ul className="space-y-2 text-sm">
          <li>• Estrategias únicas para cada familia</li>
          <li>• Comunicación en español</li>
          <li>• Disponibles para emergencias</li>
          <li>• Actualizaciones constantes</li>
          <li>• Compasión con resultados</li>
        </ul>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">El Proceso Legal Familiar</h3>

    <div className="space-y-4 mb-8">
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          1
        </div>
        <div>
          <h4 className="font-bold">Consulta Confidencial</h4>
          <p>
            Evaluamos su situación, explicamos sus derechos, y desarrollamos una estrategia inicial.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          2
        </div>
        <div>
          <h4 className="font-bold">Preparación del Caso</h4>
          <p>
            Recopilamos documentos, preparamos peticiones, y establecemos posiciones de negociación.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          3
        </div>
        <div>
          <h4 className="font-bold">Negociación/Mediación</h4>
          <p>Buscamos acuerdos favorables fuera de corte para ahorrar tiempo, dinero y estrés.</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          4
        </div>
        <div>
          <h4 className="font-bold">Litigio si Necesario</h4>
          <p>Si no hay acuerdo, luchamos agresivamente en corte por sus derechos e intereses.</p>
        </div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Protección Para Situaciones Urgentes</h3>

    <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8 text-black">
      <p className="font-bold mb-2">Ayuda Inmediata 24/7:</p>
      <ul className="space-y-1 text-sm">
        <li>• Órdenes de protección por violencia doméstica</li>
        <li>• Custodia de emergencia</li>
        <li>• Exclusión del cónyuge abusivo del hogar</li>
        <li>• Protección de activos antes del divorcio</li>
        <li>• Prevención de secuestro parental</li>
      </ul>
    </div>

    <h3 className="text-2xl font-bold mb-4">Costos y Opciones de Pago</h3>

    <p className="mb-6">Entendemos que el divorcio crea estrés financiero. Ofrecemos:</p>
    <ul className="mb-8 space-y-2">
      <li>• Consulta inicial GRATUITA</li>
      <li>• Tarifas planas para casos simples</li>
      <li>• Planes de pago flexibles</li>
      <li>• Aceptamos tarjetas de crédito</li>
      <li>• Cotizaciones transparentes sin sorpresas</li>
    </ul>

    <h3 className="text-2xl font-bold mb-4">Áreas Específicas de Derecho Familiar</h3>

    <div className="grid md:grid-cols-2 gap-4 mb-8">
      <Link
        href="/es/areas-de-practica/derecho-familia/divorcio"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Divorcio →</h4>
        <p className="text-sm">Guía completa a través del proceso de divorcio</p>
      </Link>
      <Link
        href="/es/areas-de-practica/derecho-familia/custodia-hijos"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Custodia de Hijos →</h4>
        <p className="text-sm">Protegiendo el mejor interés de sus hijos</p>
      </Link>
    </div>
  </>
);

export default function DerechoFamiliarPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Abogados de Derecho Familiar"
      subtitle="Compasión y Fuerza Cuando Más Lo Necesita"
      description="Divorcios, custodia, manutención y más. Protegemos sus derechos y los de sus hijos con experiencia y dedicación."
      services={services}
      faqs={faqs}
      content={content}
    />
  );
}
