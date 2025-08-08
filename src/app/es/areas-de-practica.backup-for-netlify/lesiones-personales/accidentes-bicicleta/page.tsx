import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Abogados de Accidentes de Bicicleta en NC | Máxima Compensación | YO PELEO POR TI™',
  description:
    'Abogados expertos en accidentes de bicicleta en Carolina del Norte. Luchamos por ciclistas lesionados contra conductores negligentes. Consulta GRATIS. No cobramos hasta ganar.',
  keywords:
    'abogado accidentes bicicleta NC, accidente ciclista Carolina del Norte, lesiones bicicleta Raleigh, abogado bicycle Charlotte, accidente bike Durham, compensación ciclista',
  openGraph: {
    title: 'Abogados de Accidentes de Bicicleta - Vasquez Law Firm | Carolina del Norte',
    description:
      'Protegemos los derechos de ciclistas lesionados. Compensación máxima por gastos médicos, salarios perdidos, y dolor y sufrimiento.',
    images: [{ url: '/images/personal-injury-bicycle-accidents.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical:
      'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/accidentes-bicicleta',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury/bicycle-accidents',
      'es-ES':
        'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/accidentes-bicicleta',
    },
  },
};

const services = [
  {
    title: 'Colisiones Vehículo vs Bicicleta',
    description:
      'Representación en accidentes donde vehículos golpean ciclistas, incluyendo intersecciones, cambios de carril y virajes.',
    features: [
      'Colisiones en intersecciones',
      'Vehículos que no ven ciclistas',
      'Accidentes de puerta (dooring)',
      'Virajes en derecho de paso',
      'Atropello y fuga',
      'Accidentes en zonas de construcción',
    ],
  },
  {
    title: 'Lesiones Catastróficas de Ciclismo',
    description:
      'Representación especializada para lesiones graves incluyendo lesiones cerebrales, fractura de columna, y amputaciones.',
    features: [
      'Lesiones cerebrales traumáticas',
      'Lesiones de médula espinal',
      'Fracturas múltiples y complejas',
      'Laceraciones y cicatrices',
      'Amputaciones',
      'Lesiones internas',
    ],
  },
  {
    title: 'Accidentes en Senderos y Parques',
    description:
      'Casos en senderos para bicicletas, parques, y propiedades donde condiciones peligrosas causan accidentes.',
    features: [
      'Mantenimiento inadecuado de senderos',
      'Obstáculos no marcados',
      'Iluminación inadecuada',
      'Superficies resbalosas o dañadas',
      'Falta de señalización de advertencia',
      'Responsabilidad del propietario',
    ],
  },
  {
    title: 'Productos Defectuosos de Bicicleta',
    description:
      'Casos donde fallas en bicicletas, cascos, o equipos causan accidentes y lesiones graves.',
    features: [
      'Fallas de frenos',
      'Defectos de ruedas y llantas',
      'Problemas de dirección',
      'Cascos defectuosos',
      'Fallas de asiento y componentes',
      'Responsabilidad del fabricante',
    ],
  },
  {
    title: 'Ciclistas Profesionales y Competitivos',
    description:
      'Representación especializada para ciclistas profesionales con pérdidas de carrera e ingresos únicos.',
    features: [
      'Pérdida de carrera profesional',
      'Contratos de patrocinio perdidos',
      'Ingresos futuros de competencia',
      'Entrenamiento y equipos especializados',
      'Rehabilitación de nivel élite',
      'Impacto en habilidades deportivas',
    ],
  },
  {
    title: 'Accidentes de Bicicleta Eléctrica',
    description:
      'Casos especializados para accidentes de e-bikes con consideraciones únicas de velocidad y regulación.',
    features: [
      'Velocidades más altas de e-bike',
      'Regulaciones específicas de e-bike',
      'Fallas de batería y motor',
      'Accidentes de aceleración',
      'Clasificaciones de clase de e-bike',
      'Seguro y cobertura únicos',
    ],
  },
  {
    title: 'Derechos de Ciclistas y Leyes NC',
    description:
      'Protección bajo las leyes de ciclismo de Carolina del Norte y educación sobre derechos de carretera.',
    features: [
      'Leyes de 3 pies de Carolina del Norte',
      'Derechos de carril de ciclistas',
      'Regulaciones de casco',
      'Leyes de luces y visibilidad',
      'Infracciones de tráfico relacionadas',
      'Educación de derechos de ciclistas',
    ],
  },
];

const faqs = [
  {
    question: '¿Qué debo hacer inmediatamente después de un accidente de bicicleta?',
    answer:
      'Busque atención médica inmediata, incluso si se siente bien. Documente la escena con fotos, obtenga información de seguros del conductor, y contacte a la policía. No admita culpa. Llámenos inmediatamente para proteger sus derechos.',
  },
  {
    question: '¿Quién paga mis gastos médicos después de un accidente de bicicleta?',
    answer:
      'Si otro conductor tuvo la culpa, su seguro debe cubrir sus gastos médicos. También puede usar su seguro de salud inicialmente y recuperar los costos más tarde. Luchamos para asegurar compensación completa.',
  },
  {
    question: '¿Puedo demandar si no llevaba casco?',
    answer:
      'Sí, puede demandar incluso sin casco. En NC, adultos no están requeridos por ley a usar cascos. Sin embargo, la falta de casco puede afectar el monto de daños si contribuyó a sus lesiones.',
  },
  {
    question: '¿Cuánto vale mi caso de accidente de bicicleta?',
    answer:
      'El valor depende de la severidad de lesiones, gastos médicos, salarios perdidos, dolor y sufrimiento, y circunstancias del accidente. Casos de bicicleta a menudo valen más debido a lesiones severas. Evaluamos su caso gratuitamente.',
  },
  {
    question: '¿Cuánto tiempo tengo para presentar una demanda?',
    answer:
      'En Carolina del Norte, generalmente tiene 3 años desde la fecha del accidente para presentar una demanda por lesiones personales. Sin embargo, actuar rápido preserva evidencia y fortalece su caso.',
  },
];

const content = (
  <>
    <h2 className="text-3xl font-bold mb-6">
      Justicia Para Ciclistas Lesionados en Carolina del Norte
    </h2>

    <p className="mb-6">
      Los ciclistas enfrentan riesgos únicos en las carreteras de Carolina del Norte. Sin la
      protección de un vehículo, incluso accidentes menores pueden resultar en lesiones
      catastróficas. Como ciclistas nosotros mismos, entendemos la vulnerabilidad que sienten en la
      carretera y luchamos incansablemente para proteger sus derechos y obtener la compensación
      completa que merecen.
    </p>

    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 text-black">
      <p className="text-lg font-semibold mb-2">🚴‍♂️ DEFENDEMOS CICLISTAS</p>
      <p>
        Como abogados que también somos ciclistas, entendemos sus desafíos únicos. No cobramos
        honorarios a menos que ganemos su caso.
        <strong> Consulta GRATUITA: 1-844-YO-PELEO</strong>
      </p>
    </div>

    <h3 className="text-2xl font-bold mb-4">Estadísticas Alarmantes de Seguridad Ciclista</h3>

    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white/10 p-6 rounded-lg text-center">
        <div className="text-3xl font-bold text-primary mb-2">800+</div>
        <div className="text-sm">Ciclistas mueren anualmente en EE.UU.</div>
      </div>
      <div className="bg-white/10 p-6 rounded-lg text-center">
        <div className="text-3xl font-bold text-primary mb-2">75%</div>
        <div className="text-sm">De muertes de ciclistas involucran vehículos</div>
      </div>
      <div className="bg-white/10 p-6 rounded-lg text-center">
        <div className="text-3xl font-bold text-primary mb-2">40%</div>
        <div className="text-sm">Ocurren en intersecciones</div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Causas Comunes de Accidentes de Bicicleta</h3>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Errores del Conductor</h4>
        <ul className="space-y-2 text-sm">
          <li>• No ver ciclistas en puntos ciegos</li>
          <li>• Virar sin verificar ciclistas</li>
          <li>• Seguir muy de cerca (tailgating)</li>
          <li>• Cambios de carril sin señalizar</li>
          <li>• Abrir puertas sin mirar (dooring)</li>
          <li>• Conducir distraído o ebrio</li>
        </ul>
      </div>
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Condiciones Peligrosas</h4>
        <ul className="space-y-2 text-sm">
          <li>• Carriles para bicicletas mal diseñados</li>
          <li>• Baches y superficies dañadas</li>
          <li>• Señalización inadecuada</li>
          <li>• Zonas de construcción sin protección</li>
          <li>• Iluminación insuficiente</li>
          <li>• Intersecciones mal diseñadas</li>
        </ul>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Leyes de Ciclismo en Carolina del Norte</h3>

    <div className="space-y-4 mb-8">
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          1
        </div>
        <div>
          <h4 className="font-bold">Ley de 3 Pies</h4>
          <p>
            Los conductores deben dejar al menos 3 pies de espacio al pasar ciclistas. Violaciones
            conllevan multas y responsabilidad por accidentes.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          2
        </div>
        <div>
          <h4 className="font-bold">Derechos de Carril</h4>
          <p>
            Las bicicletas tienen derecho a usar carriles completos cuando no hay carriles
            designados para bicicletas disponibles.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          3
        </div>
        <div>
          <h4 className="font-bold">Requisitos de Luces</h4>
          <p>
            Luz blanca frontal y reflector o luz roja trasera requeridos desde el atardecer hasta el
            amanecer.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          4
        </div>
        <div>
          <h4 className="font-bold">Leyes de Casco</h4>
          <p>
            Ciclistas menores de 16 años deben usar cascos. Adultos no están requeridos por ley,
            pero se recomienda fuertemente.
          </p>
        </div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Tipos de Compensación Disponible</h3>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Daños Económicos</h4>
        <ul className="space-y-2 text-sm">
          <li>• Gastos médicos pasados y futuros</li>
          <li>• Salarios perdidos y capacidad de ingresos</li>
          <li>• Daños a bicicleta y equipo</li>
          <li>• Modificaciones de hogar/vehículo</li>
          <li>• Costos de rehabilitación</li>
          <li>• Gastos de cuidado a largo plazo</li>
        </ul>
      </div>
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Daños No Económicos</h4>
        <ul className="space-y-2 text-sm">
          <li>• Dolor y sufrimiento físico</li>
          <li>• Angustia emocional y mental</li>
          <li>• Pérdida de disfrute de vida</li>
          <li>• Desfiguración y cicatrices</li>
          <li>• Pérdida de relación de pareja</li>
          <li>• Impacto en calidad de vida</li>
        </ul>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Por Qué Elegir Vasquez Law Firm</h3>

    <div className="grid md:grid-cols-3 gap-4 mb-8">
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-2xl font-bold text-primary mb-2">Ciclistas</div>
        <div className="text-sm">Somos ciclistas que entienden sus desafíos</div>
      </div>
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-2xl font-bold text-primary mb-2">Sin Costo</div>
        <div className="text-sm">No cobramos a menos que ganemos</div>
      </div>
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-2xl font-bold text-primary mb-2">Experiencia</div>
        <div className="text-sm">60+ años de experiencia combinada</div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Casos Relacionados de Lesiones Personales</h3>

    <div className="grid md:grid-cols-2 gap-4 mb-8">
      <Link
        href="/es/areas-de-practica/lesiones-personales/accidentes-peatones"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Accidentes de Peatones →</h4>
        <p className="text-sm">Protección para peatones lesionados</p>
      </Link>
      <Link
        href="/es/areas-de-practica/lesiones-personales"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Lesiones Personales →</h4>
        <p className="text-sm">Todos los servicios de lesiones personales</p>
      </Link>
    </div>
  </>
);

export default function AccidentesBicicletaPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Abogados de Accidentes de Bicicleta"
      subtitle="Protegiendo los Derechos de Ciclistas Lesionados"
      description="Cuando un conductor negligente lo lesiona mientras andaba en bicicleta, luchamos incansablemente por la compensación completa que merece. Consulta gratuita - no cobramos hasta ganar."
      services={services}
      faqs={faqs}
      content={content}
    />
  );
}
