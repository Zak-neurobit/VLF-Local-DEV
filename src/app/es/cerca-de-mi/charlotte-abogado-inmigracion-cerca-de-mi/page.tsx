import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Abogado de Inmigración Cerca De Mí Charlotte NC | Disponible 24/7 | Consulta Gratuita',
  description:
    '¿Busca un abogado de inmigración cerca de usted en Charlotte? ⭐ Calificación 5 Estrellas • 60+ Años de Experiencia • Se Habla Español • Citas el Mismo Día • Llame 1-844-YO-PELEO',
  keywords:
    'abogado de inmigracion cerca de mi, abogado de inmigracion cerca de mi charlotte, abogado de inmigracion charlotte nc cerca de mi, mejor abogado de inmigracion cerca de mi, abogado de inmigracion que habla español cerca de mi, abogado de inmigracion de emergencia cerca de mi, abogado de deportacion cerca de mi charlotte, abogado de tarjeta verde cerca de mi, abogado de ciudadania cerca de mi',
  openGraph: {
    title: 'Abogado de Inmigración Cerca De Mí en Charlotte | Vasquez Law Firm',
    description:
      'Ayuda de Inmigración de Emergencia 24/7 en Charlotte. Consulta Gratuita. 30,000+ Casos Ganados. Se Habla Español.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-abogado-inmigracion-cerca-de-mi',
    images: [
      {
        url: '/images/charlotte-office-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Oficina Vasquez Law Firm Charlotte - Abogados de Inmigración Cerca de Usted',
      },
    ],
  },
};

export const runtime = 'nodejs';

export default function CharlotteAbogadoInmigracionCercaDeMiPage() {
  const post = {
    id: 'charlotte-abogado-inmigracion-cerca-de-mi',
    title: 'Abogado de Inmigración Cerca De Mí en Charlotte',
    slug: 'charlotte-abogado-inmigracion-cerca-de-mi',
    excerpt: 'Abogado de inmigración experimentado en Charlotte, NC. Consulta gratuita disponible 24/7.',
    content: `
      <div class="prose prose-lg max-w-none">
        <h1>Abogado de Inmigración Cerca De Mí en Charlotte, NC</h1>
        
        <p>¿Necesita un abogado de inmigración cerca de usted en Charlotte? Vasquez Law Firm es su mejor opción para todos sus asuntos de inmigración. Con más de 60 años de experiencia combinada, nuestro equipo bilingüe está listo para luchar por sus derechos de inmigración.</p>

        <h2>🌐 Servicios de Inmigración en Charlotte</h2>
        
        <h3>Deportación y Defensa de Remoción</h3>
        <p>Si usted o un ser querido enfrenta procedimientos de deportación, necesita representación legal inmediata. Nuestros abogados de inmigración en Charlotte tienen experiencia defendiendo casos complejos de deportación.</p>

        <h3>Residencia Permanente (Tarjeta Verde)</h3>
        <p>Ayudamos con aplicaciones de residencia permanente basadas en:</p>
        <ul>
          <li>Peticiones familiares</li>
          <li>Empleo</li>
          <li>Asilo político</li>
          <li>Ajuste de estatus</li>
        </ul>

        <h3>Ciudadanía Estadounidense</h3>
        <p>Guiamos a clientes a través del proceso de naturalización, incluyendo:</p>
        <ul>
          <li>Preparación para el examen</li>
          <li>Documentación requerida</li>
          <li>Representación en entrevistas</li>
          <li>Apelaciones si es necesario</li>
        </ul>

        <h3>Visas Familiares</h3>
        <p>Reunificación familiar a través de:</p>
        <ul>
          <li>Visas de prometido(a) K-1</li>
          <li>Peticiones I-130</li>
          <li>Visas de pariente inmediato</li>
          <li>Categorías de preferencia familiar</li>
        </ul>

        <h3>Visas de Trabajo</h3>
        <p>Asistencia con visas basadas en empleo:</p>
        <ul>
          <li>H-1B, L-1, O-1</li>
          <li>Certificación laboral PERM</li>
          <li>Visas de inversionista E-2</li>
          <li>TN para profesionales del NAFTA</li>
        </ul>

        <h2>🏙️ Por Qué Elegir Nuestros Servicios en Charlotte</h2>
        
        <h3>Experiencia Local</h3>
        <p>Conocemos las cortes de inmigración de Charlotte y tenemos relaciones establecidas con oficiales locales de USCIS.</p>

        <h3>Servicio Bilingüe Completo</h3>
        <p>Todo nuestro personal habla español e inglés fluidamente. No necesitará un intérprete para comunicarse con nosotros.</p>

        <h3>Disponibilidad 24/7</h3>
        <p>Emergencias de inmigración pueden ocurrir en cualquier momento. Estamos disponibles 24 horas al día para casos urgentes.</p>

        <h3>Consulta Gratuita</h3>
        <p>Evaluamos su caso sin costo alguno y le explicamos todas sus opciones legales.</p>

        <h2>📍 Convenientemente Ubicado en Charlotte</h2>
        <p>Nuestra oficina de Charlotte está estratégicamente ubicada para servir a clientes en toda el área metropolitana, incluyendo:</p>
        <ul>
          <li>Uptown Charlotte</li>
          <li>South End</li>
          <li>NoDa</li>
          <li>University City</li>
          <li>Ballantyne</li>
          <li>Cornelius</li>
          <li>Huntersville</li>
          <li>Matthews</li>
          <li>Mint Hill</li>
          <li>Pineville</li>
        </ul>

        <h2>🚨 Casos de Emergencia de Inmigración</h2>
        <p>Si usted está enfrentando:</p>
        <ul>
          <li>🚨 Detención por ICE</li>
          <li>🚨 Orden de deportación</li>
          <li>🚨 Redada en el lugar de trabajo</li>
          <li>🚨 Negación de entrada en el aeropuerto</li>
        </ul>
        
        <p><strong>¡Llame INMEDIATAMENTE! 📞 1-844-YO-PELEO</strong></p>

        <h2>💼 Historial de Éxito Comprobado</h2>
        <ul>
          <li>✅ 30,000+ casos de inmigración ganados</li>
          <li>✅ 95% tasa de éxito en casos de asilo</li>
          <li>✅ 1,000+ deportaciones detenidas</li>
          <li>✅ 5,000+ residencias permanentes obtenidas</li>
          <li>✅ 2,000+ ciudadanías aprobadas</li>
        </ul>

        <h2>📞 Contacte a Su Abogado de Inmigración en Charlotte Hoy</h2>
        
        <div class="bg-blue-50 p-6 rounded-lg mt-8">
          <h3 class="text-xl font-bold text-blue-800 mb-4">📞 Llame Ahora - Consulta Gratuita</h3>
          <p class="text-lg font-bold text-blue-700">1-844-YO-PELEO (1-844-967-3536)</p>
          <p class="text-blue-700 mt-2">Disponible 24/7 para emergencias de inmigración</p>
        </div>

        <h2>⭐ Lo Que Dicen Nuestros Clientes de Charlotte</h2>
        <blockquote class="border-l-4 border-blue-500 pl-6 italic text-gray-700">
          "Vasquez Law Firm me ayudó a obtener mi residencia permanente después de años de lucha. Su equipo en Charlotte fue increíblemente profesional y siempre estuvieron disponibles para responder mis preguntas." - María G., Charlotte
        </blockquote>

        <blockquote class="border-l-4 border-blue-500 pl-6 italic text-gray-700 mt-4">
          "Cuando mi esposo fue detenido por ICE, llamé a Vasquez Law Firm y me ayudaron inmediatamente. Gracias a ellos, él está libre y estamos juntos como familia." - Carmen R., South End
        </blockquote>

        <p class="text-center text-lg font-bold mt-8">🚀 Su futuro en Estados Unidos comienza con una llamada. ¡Contacte a Vasquez Law Firm hoy mismo!</p>
      </div>
    `,
    practiceArea: 'immigration',
    language: 'es' as const,
    publishedAt: new Date(),
    readTime: 12,
    author: DEFAULT_BLOG_AUTHOR,
    tags: ['inmigración', 'charlotte', 'abogado', 'cerca-de-mi'],
  };

  const categories = [
    {
      id: 'immigration',
      name: { en: 'Immigration Law', es: 'Ley de Inmigración' },
      slug: { en: 'immigration', es: 'inmigracion' },
      icon: '🌐',
      postCount: 45,
    },
    {
      id: 'personal-injury',
      name: { en: 'Personal Injury', es: 'Lesiones Personales' },
      slug: { en: 'personal-injury', es: 'lesiones-personales' },
      icon: '🏥',
      postCount: 32,
    },
    {
      id: 'criminal-defense',
      name: { en: 'Criminal Defense', es: 'Defensa Criminal' },
      slug: { en: 'criminal-defense', es: 'defensa-criminal' },
      icon: '⚖️',
      postCount: 28,
    },
  ];

  return (
    <BlogPageTemplate
      posts={[]}
      categories={categories}
      isArticlePage={true}
      currentPost={post}
      relatedPosts={[]}
    />
  );
}