import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Link from 'next/link';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Abogados de Inmigración en NC | Expertos en Derecho Migratorio | YO PELEO POR TI™',
  description:
    'Abogados expertos en inmigración en Carolina del Norte. Visas, ciudadanía, deportación, asilo, DACA y más. 15+ años de experiencia. Consulta GRATIS: 1-844-YO-PELEO.',
  keywords:
    'abogado inmigracion Carolina Norte, immigration lawyer Raleigh, deportacion Charlotte NC, citizenship attorney Durham',
  openGraph: {
    title: 'Abogados de Inmigración - Vasquez Law Firm | Carolina del Norte',
    description:
      'Servicios completos de inmigración. Desde visas familiares hasta defensa de deportación. Hablamos español.',
    images: [{ url: '/images/immigration-attorney.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion',
    },
  },
};

const services = [
  {
    title: 'Visas Familiares y Peticiones',
    description:
      'Reunificación familiar a través del sistema migratorio estadounidense con tasas de aprobación excepcionales.',
    features: [
      'Peticiones I-130 para familiares',
      'Visas de prometido(a) K-1',
      'Procesamiento consular',
      'Ajuste de estatus',
      'Parientes inmediatos vs. preferencia',
      'Casos de extrema dureza',
    ],
  },
  {
    title: 'Defensa Contra Deportación',
    description:
      'Defensa agresiva en corte de inmigración para proteger su derecho a permanecer en Estados Unidos.',
    features: [
      'Procedimientos de remoción',
      'Cancelación de deportación',
      'Asilo defensivo',
      'Mociones para reabrir',
      'Apelaciones ante BIA',
      'Fianzas de inmigración',
    ],
  },
  {
    title: 'Asilo y Refugio',
    description: 'Protección para personas que enfrentan persecución en sus países de origen.',
    features: [
      'Aplicaciones afirmativas de asilo',
      'Asilo defensivo en corte',
      'Preparación para entrevistas',
      'Evidencia de país de origen',
      'Withholding of removal',
      'Protección bajo CAT',
    ],
  },
  {
    title: 'Ciudadanía y Naturalización',
    description: 'Guía experta a través del proceso de convertirse en ciudadano estadounidense.',
    features: [
      'Aplicación N-400',
      'Preparación para examen',
      'Waivers de inglés/cívica',
      'Casos complejos',
      'Apelaciones de denegación',
      'Ceremonia de juramento',
    ],
  },
  {
    title: 'DACA - Acción Diferida',
    description:
      'Protección y permisos de trabajo para jóvenes traídos a EE.UU. cuando eran niños.',
    features: [
      'Aplicaciones iniciales DACA',
      'Renovaciones cada 2 años',
      'Permisos de trabajo',
      'Advance parole',
      'Cambios de estatus',
      'Protección contra deportación',
    ],
  },
  {
    title: 'Visas de Trabajo',
    description:
      'Opciones de inmigración basadas en empleo para trabajadores calificados y profesionales.',
    features: [
      'Visas H-1B profesionales',
      'Transferencias L-1',
      'Visas O-1 habilidades extraordinarias',
      'Certificación laboral PERM',
      'EB-1, EB-2, EB-3',
      'National Interest Waiver',
    ],
  },
  {
    title: 'Waivers de Inadmisibilidad',
    description:
      'Supere barreras de inmigración causadas por violaciones previas o antecedentes criminales.',
    features: [
      'Waiver I-601 extrema dureza',
      'Waiver I-601A provisional',
      'Waiver I-212 reingreso',
      'Perdones por fraude',
      'Presencia ilegal',
      'Antecedentes criminales',
    ],
  },
  {
    title: 'Víctimas de Crimen',
    description: 'Protección migratoria para víctimas de crímenes y violencia doméstica.',
    features: [
      'Visa U para víctimas',
      'VAWA auto-peticiones',
      'Visa T tráfico humano',
      'Certificación policial',
      'Ajuste de estatus',
      'Derivados familiares',
    ],
  },
  {
    title: 'Detención y Fianzas',
    description:
      'Liberación rápida de detención migratoria y representación en audiencias de fianza.',
    features: [
      'Audiencias de fianza',
      'Determinación de custodia',
      'Liberación humanitaria',
      'Supervisión electrónica',
      'Habeas corpus',
      'Visitas a detenidos',
    ],
  },
];

const faqs = [
  {
    question: '¿Cuánto tiempo toma obtener una green card a través de un familiar?',
    answer:
      'El tiempo varía significativamente según la categoría. Parientes inmediatos (cónyuges, hijos menores de 21, padres de ciudadanos) pueden obtenerla en 8-14 meses. Otras categorías pueden tomar de 2 a 20+ años dependiendo del país de origen y la preferencia familiar.',
  },
  {
    question: '¿Qué pasa si mi visa expiró pero todavía estoy en EE.UU.?',
    answer:
      'Permanecer después de que expire su visa puede tener consecuencias serias. Acumula presencia ilegal que puede resultar en barras de 3 o 10 años. Es crucial consultar con un abogado inmediatamente para explorar opciones como extensión, cambio de estatus o salida voluntaria.',
  },
  {
    question: '¿Puedo trabajar mientras espero mi green card?',
    answer:
      'En muchos casos, sí. Puede solicitar un permiso de trabajo (EAD) mientras su ajuste de estatus está pendiente. Generalmente se aprueba en 3-5 meses. Con el EAD puede trabajar legalmente para cualquier empleador en EE.UU.',
  },
  {
    question: '¿Me deportarán si me detiene la policía?',
    answer:
      'No automáticamente. La policía local generalmente no puede deportarlo, pero pueden contactar a ICE. Sus derechos incluyen permanecer en silencio y pedir un abogado. Nunca firme nada sin consultar con un abogado de inmigración primero.',
  },
  {
    question: '¿Puedo viajar fuera de EE.UU. mientras mi caso está pendiente?',
    answer:
      'Depende de su estatus y tipo de caso. Algunos pueden solicitar "advance parole" para viajar. Salir sin permiso puede abandonar su aplicación o activar barras de reingreso. Siempre consulte con su abogado antes de viajar.',
  },
];

const content = (
  <>
    <h2 className="text-3xl font-bold mb-6">Su Futuro en Estados Unidos Comienza Aquí</h2>

    <p className="mb-6">
      En Vasquez Law Firm, entendemos que navegar el complejo sistema de inmigración estadounidense
      puede ser abrumador y aterrador. Con más de 15 años de experiencia exclusivamente en leyes de
      inmigración, hemos ayudado a miles de familias a alcanzar sus sueños americanos. Desde simples
      renovaciones de visa hasta complejas defensas de deportación, tenemos el conocimiento y la
      experiencia para manejar cualquier desafío migratorio.
    </p>

    <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-8 text-black">
      <p className="text-lg font-semibold mb-2">¿Tiene una Emergencia Migratoria?</p>
      <p>
        Si enfrenta deportación inminente, detención por ICE, o tiene una fecha límite urgente,
        estamos disponibles 24/7. Llame ahora: <strong>1-844-YO-PELEO</strong>
      </p>
    </div>

    <h3 className="text-2xl font-bold mb-4">Por Qué Somos Diferentes</h3>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Experiencia Comprobada</h4>
        <ul className="space-y-2 text-sm">
          <li>• 15+ años exclusivamente en inmigración</li>
          <li>• Miles de casos exitosos</li>
          <li>• Ex-fiscales que conocen el sistema</li>
          <li>• Licenciados en múltiples estados</li>
        </ul>
      </div>
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Servicio Completo</h4>
        <ul className="space-y-2 text-sm">
          <li>• Consultas GRATIS en español</li>
          <li>• Planes de pago flexibles</li>
          <li>• Representación en corte incluida</li>
          <li>• Actualizaciones constantes de su caso</li>
        </ul>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Tipos de Casos Que NO Tomamos</h3>

    <p className="mb-6">
      Para mejor servir a nuestros clientes, NO manejamos: visas de turista (B1/B2), visas de
      estudiante (F-1), o casos de inmigración de negocios corporativos. Nos enfocamos en
      reunificación familiar, protección humanitaria, y defensa contra deportación.
    </p>

    <h3 className="text-2xl font-bold mb-4">Su Primera Consulta</h3>

    <div className="bg-black/20 p-6 rounded-lg mb-8">
      <p className="mb-4">Durante su consulta GRATUITA de 30 minutos:</p>
      <ul className="space-y-2">
        <li>✓ Revisaremos su historial migratorio completo</li>
        <li>✓ Identificaremos todas las opciones disponibles</li>
        <li>✓ Explicaremos los riesgos y beneficios</li>
        <li>✓ Proporcionaremos un presupuesto transparente</li>
        <li>✓ Responderemos todas sus preguntas</li>
      </ul>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <div className="text-center">
        <h4 className="font-bold text-primary mb-2">Oficina Principal</h4>
        <p className="text-sm">
          Raleigh, NC
          <br />
          Lunes-Viernes: 9AM-6PM
          <br />
          Sábados: 10AM-2PM
        </p>
      </div>
      <div className="text-center">
        <h4 className="font-bold text-primary mb-2">Otras Ubicaciones</h4>
        <p className="text-sm">
          Charlotte, NC
          <br />
          Durham, NC
          <br />
          Orlando, FL
        </p>
      </div>
      <div className="text-center">
        <h4 className="font-bold text-primary mb-2">Consultas Virtuales</h4>
        <p className="text-sm">
          Disponible nacionalmente
          <br />
          Zoom, teléfono, WhatsApp
          <br />
          Documentos por email
        </p>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Sub-Especialidades de Inmigración</h3>

    <div className="grid md:grid-cols-2 gap-4 mb-8">
      <Link
        href="/es/areas-de-practica/inmigracion/ajuste-de-estatus"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Ajuste de Estatus →</h4>
        <p className="text-sm">Obtenga su green card sin salir de EE.UU.</p>
      </Link>
      <Link
        href="/es/areas-de-practica/inmigracion/ciudadania"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Ciudadanía →</h4>
        <p className="text-sm">Conviértase en ciudadano estadounidense</p>
      </Link>
      <Link
        href="/es/areas-de-practica/inmigracion/deportacion-remocion-defensa"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Defensa de Deportación →</h4>
        <p className="text-sm">Proteja su derecho a permanecer en EE.UU.</p>
      </Link>
      <Link
        href="/es/areas-de-practica/inmigracion/asilo"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Asilo →</h4>
        <p className="text-sm">Protección para personas perseguidas</p>
      </Link>
    </div>
  </>
);

export default function InmigracionPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Abogados de Inmigración"
      subtitle="Expertos en Derecho Migratorio con Más de 15 Años de Experiencia"
      description="Desde visas familiares hasta casos complejos de deportación, nuestro equipo de abogados especializados en inmigración lucha incansablemente por mantener a las familias juntas y proteger el sueño americano."
      services={services}
      faqs={faqs}
      content={content}
    />
  );
}
