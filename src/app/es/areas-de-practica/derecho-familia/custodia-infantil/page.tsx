import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Link from 'next/link';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Abogados de Custodia Infantil en NC | Protegemos a Sus Hijos | YO PELEO POR TI™',
  description:
    'Abogados expertos en custodia infantil en Carolina del Norte. Luchamos por los mejores intereses de sus hijos. Custodia física, legal, modificaciones. Consulta GRATIS.',
  keywords:
    'abogado custodia infantil NC, custodia niños Carolina del Norte, modificación custodia Raleigh, abogado family court Charlotte, custodia legal Durham, visitas hijos Greensboro',
  openGraph: {
    title: 'Abogados de Custodia Infantil - Vasquez Law Firm | Carolina del Norte',
    description:
      'Protegemos los derechos de padres y el bienestar de niños en casos de custodia. Representación compasiva y agresiva.',
    images: [{ url: '/images/family-law-child-custody.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/es/areas-de-practica/derecho-familia/custodia-infantil',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/family-law/child-custody',
      'es-ES':
        'https://www.vasquezlawnc.com/es/areas-de-practica/derecho-familia/custodia-infantil',
    },
  },
};

const services = [
  {
    title: 'Custodia Física',
    description: 'Determinación de dónde vivirán los niños y cuánto tiempo pasarán con cada padre.',
    features: [
      'Custodia física primaria',
      'Custodia física conjunta',
      'Horarios de visita',
      'Tiempo de vacaciones y días festivos',
      'Supervisión de visitas cuando necesario',
      'Intercambios y transportación',
    ],
  },
  {
    title: 'Custodia Legal',
    description:
      'Derechos para tomar decisiones importantes sobre la educación, salud, y bienestar del niño.',
    features: [
      'Decisiones médicas y de salud',
      'Elecciones educativas y escolares',
      'Actividades religiosas y culturales',
      'Decisiones sobre actividades extracurriculares',
      'Mudanzas y cambios de residencia',
      'Participación en deportes de contacto',
    ],
  },
  {
    title: 'Modificaciones de Custodia',
    description:
      'Cambios a órdenes existentes cuando las circunstancias cambian significativamente.',
    features: [
      'Cambio sustancial de circunstancias',
      'Reubicación de uno de los padres',
      'Cambios en horarios de trabajo',
      'Problemas de abuso o negligencia',
      'Necesidades cambiantes del niño',
      'Incumplimiento de órdenes existentes',
    ],
  },
  {
    title: 'Casos de Reubicación',
    description:
      'Representación cuando un padre quiere mudarse con los niños a una nueva ubicación.',
    features: [
      'Mudanzas dentro del estado',
      'Reubicaciones fuera del estado',
      'Mudanzas internacionales',
      'Factores de mejores intereses',
      'Impacto en relación con otro padre',
      'Nuevos horarios de visita a distancia',
    ],
  },
  {
    title: 'Derechos de Visita',
    description: 'Establecimiento y protección de tiempo de crianza para padres no custodios.',
    features: [
      'Horarios de visita regulares',
      'Visitas de fin de semana extendidas',
      'Tiempo de vacaciones',
      'Visitas supervisadas cuando necesario',
      'Comunicación telefónica/video',
      'Flexibilidad para eventos especiales',
    ],
  },
  {
    title: 'Custodia de Emergencia',
    description: 'Acción legal inmediata cuando los niños están en peligro o riesgo inmediato.',
    features: [
      'Órdenes de custodia de emergencia',
      'Órdenes de protección para niños',
      'Casos de abuso o negligencia',
      'Sustracción parental',
      'Situaciones de violencia doméstica',
      'Protección inmediata 24/7',
    ],
  },
  {
    title: 'Derechos de Abuelos',
    description: 'Representación para abuelos que buscan visitas o custodia de sus nietos.',
    features: [
      'Derechos de visita de abuelos',
      'Custodia por abuelos',
      'Casos de padres fallecidos',
      'Situaciones de padres no aptos',
      'Relaciones existentes significativas',
      'Mejores intereses del niño',
    ],
  },
];

const faqs = [
  {
    question: '¿Qué factores considera la corte para determinar custodia?',
    answer:
      'Carolina del Norte se enfoca en los "mejores intereses del niño" considerando: capacidad de cada padre para cuidar al niño, estabilidad del hogar, relación del niño con cada padre, necesidades físicas y emocionales del niño, historial de violencia doméstica, y preferencias del niño si es suficientemente maduro.',
  },
  {
    question: '¿Puede un padre mudarse fuera del estado con los niños?',
    answer:
      'Depende de la orden de custodia existente. Generalmente, un padre necesita permiso de corte o consentimiento del otro padre para mudarse fuera del estado con los niños. La corte considerará si la mudanza es en los mejores intereses del niño.',
  },
  {
    question: '¿Qué pasa si el otro padre no respeta la orden de custodia?',
    answer:
      'Las violaciones de órdenes de custodia pueden resultar en desacato a la corte, multas, tiempo de cárcel, pérdida de tiempo de crianza, o cambios en la custodia. Documentamos violaciones y buscamos remedios apropiados.',
  },
  {
    question: '¿Pueden los abuelos obtener derechos de visita?',
    answer:
      'Sí, bajo ciertas circunstancias. Los abuelos pueden buscar visitas si tienen una relación sustancial con el nieto y las visitas son en los mejores intereses del niño. Esto es más común cuando los padres están divorciados, separados, o uno ha fallecido.',
  },
  {
    question: '¿Cuándo puede modificarse una orden de custodia?',
    answer:
      'Las órdenes de custodia pueden modificarse cuando hay un "cambio sustancial de circunstancias" que afecta los mejores intereses del niño. Ejemplos incluyen reubicación, cambios en estilo de vida, problemas de abuso, o necesidades cambiantes del niño.',
  },
];

const content = (
  <>
    <h2 className="text-3xl font-bold mb-6">Protegiendo los Mejores Intereses de Sus Hijos</h2>

    <p className="mb-6">
      Los casos de custodia infantil son algunos de los más emotivos y complejos en el derecho
      familiar. Como padre, sus hijos son lo más importante en su vida, y entendemos la ansiedad y
      estrés que viene con batallas de custodia. En Vasquez Law Firm, combinamos compasión con
      representación agresiva para proteger sus derechos parentales y asegurar que sus hijos tengan
      el mejor futuro posible.
    </p>

    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 text-black">
      <p className="text-lg font-semibold mb-2">👨‍👩‍👧‍👦 PRIORIDAD: LOS NIÑOS PRIMERO</p>
      <p>
        En todos los casos de custodia, nos enfocamos en los mejores intereses de sus hijos mientras
        protegemos agresivamente sus derechos como padre.
        <strong> Consulta GRATUITA: 1-844-YO-PELEO</strong>
      </p>
    </div>

    <h3 className="text-2xl font-bold mb-4">Tipos de Custodia en Carolina del Norte</h3>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Custodia Física</h4>
        <p className="text-sm mb-3">Determina dónde vive el niño día a día.</p>
        <ul className="space-y-2 text-sm">
          <li>
            • <strong>Primaria:</strong> El niño vive principalmente con un padre
          </li>
          <li>
            • <strong>Conjunta:</strong> El niño pasa tiempo significativo con ambos
          </li>
          <li>
            • <strong>Exclusiva:</strong> Un padre tiene todo el tiempo físico
          </li>
        </ul>
      </div>
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Custodia Legal</h4>
        <p className="text-sm mb-3">Determina quién toma decisiones importantes.</p>
        <ul className="space-y-2 text-sm">
          <li>
            • <strong>Conjunta:</strong> Ambos padres toman decisiones juntos
          </li>
          <li>
            • <strong>Exclusiva:</strong> Un padre toma todas las decisiones
          </li>
          <li>
            • <strong>Limitada:</strong> Decisiones específicas para cada padre
          </li>
        </ul>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Factores de "Mejores Intereses del Niño"</h3>

    <div className="space-y-4 mb-8">
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          1
        </div>
        <div>
          <h4 className="font-bold">Seguridad y Bienestar Físico</h4>
          <p>
            La corte prioriza la seguridad física del niño, considerando historial de violencia,
            abuso, o negligencia.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          2
        </div>
        <div>
          <h4 className="font-bold">Estabilidad y Continuidad</h4>
          <p>
            Mantener estabilidad en escuela, comunidad, y rutinas diarias es importante para el
            desarrollo del niño.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          3
        </div>
        <div>
          <h4 className="font-bold">Capacidad de Crianza</h4>
          <p>
            Habilidad de cada padre para proporcionar amor, cuidado, supervisión, y guía apropiada.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          4
        </div>
        <div>
          <h4 className="font-bold">Relación Padre-Hijo</h4>
          <p>
            La fuerza y calidad de la relación entre el niño y cada padre, incluyendo vínculos
            emocionales.
          </p>
        </div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Proceso Típico de Caso de Custodia</h3>

    <div className="space-y-4 mb-8">
      <div className="flex items-start">
        <span className="text-primary text-2xl font-bold mr-4">1.</span>
        <div>
          <h3 className="text-xl font-semibold mb-2">Presentación de Petición</h3>
          <p className="text-gray-300">
            Presentamos documentos legales formales solicitando custodia específica y arreglos de
            visita.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <span className="text-primary text-2xl font-bold mr-4">2.</span>
        <div>
          <h3 className="text-xl font-semibold mb-2">Mediación (Si Es Requerida)</h3>
          <p className="text-gray-300">
            Muchos condados requieren mediación para intentar resolver disputas fuera de corte.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <span className="text-primary text-2xl font-bold mr-4">3.</span>
        <div>
          <h3 className="text-xl font-semibold mb-2">Investigación y Descubrimiento</h3>
          <p className="text-gray-300">
            Recopilamos evidencia, documentos, registros, y testimonios para apoyar su caso.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <span className="text-primary text-2xl font-bold mr-4">4.</span>
        <div>
          <h3 className="text-xl font-semibold mb-2">Audiencia o Juicio</h3>
          <p className="text-gray-300">
            Si no se alcanza acuerdo, presentamos su caso ante un juez para decisión final.
          </p>
        </div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Documentación Importante</h3>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Documentos Para Recopilar</h4>
        <ul className="space-y-2 text-sm">
          <li>• Registros escolares y médicos</li>
          <li>• Comprobantes de ingresos y gastos</li>
          <li>• Registros de participación en actividades del niño</li>
          <li>• Comunicaciones con el otro padre</li>
          <li>• Testimonios de testigos</li>
          <li>• Evaluaciones psicológicas si aplicable</li>
        </ul>
      </div>
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Qué Evitar Hacer</h4>
        <ul className="space-y-2 text-sm">
          <li>• Hablar mal del otro padre al niño</li>
          <li>• Usar al niño como mensajero</li>
          <li>• Violar órdenes temporales</li>
          <li>• Rechazar tiempo de visita ordenado</li>
          <li>• Hacer cambios mayores sin consultar</li>
          <li>• Documentar conversaciones ilegalmente</li>
        </ul>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Casos Especiales de Custodia</h3>

    <div className="grid md:grid-cols-3 gap-4 mb-8">
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-xl font-bold text-primary mb-2">Violencia Doméstica</div>
        <div className="text-sm">Protección especial y custodia supervisada</div>
      </div>
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-xl font-bold text-primary mb-2">Abuso de Sustancias</div>
        <div className="text-sm">Tratamiento requerido y monitoreo</div>
      </div>
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-xl font-bold text-primary mb-2">Necesidades Especiales</div>
        <div className="text-sm">Consideraciones de cuidado médico</div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Casos Relacionados de Derecho Familiar</h3>

    <div className="grid md:grid-cols-2 gap-4 mb-8">
      <Link
        href="/es/areas-de-practica/derecho-familia/divorcio"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Divorcio →</h4>
        <p className="text-sm">Servicios completos de divorcio</p>
      </Link>
      <Link
        href="/es/areas-de-practica/derecho-familia/pension-alimenticia"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Pensión Alimenticia →</h4>
        <p className="text-sm">Manutención de niños y cónyuge</p>
      </Link>
    </div>
  </>
);

export default function CustodiaInfantilPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Abogados de Custodia Infantil"
      subtitle="Protegiendo Sus Derechos Parentales y el Futuro de Sus Hijos"
      description="Los casos de custodia son emotivos y complejos. Proporcionamos representación compasiva pero agresiva para proteger sus derechos parentales y los mejores intereses de sus hijos."
      services={services}
      faqs={faqs}
      content={content}
    />
  );
}
