import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Abogado de Compensación Laboral Cerca De Mí Concord NC | Disponible 24/7 | Consulta Gratuita',
  description:
    '¿Busca un abogado de compensación laboral cerca de usted en Concord? ⭐ Calificación 5 Estrellas • 60+ Años de Experiencia • Se Habla Español • Citas el Mismo Día • Llame 1-844-YO-PELEO',
  keywords:
    'abogado de compensacion laboral cerca de mi, abogado de lesiones en el trabajo cerca de mi, workers comp cerca de mi, abogado de compensación laboral concord nc cerca de mi, mejor abogado de compensación laboral cerca de mi, abogado de compensación laboral que habla español cerca de mi, abogado de compensación laboral de emergencia cerca de mi',
  openGraph: {
    title: 'Abogado de Compensación Laboral Cerca De Mí en Concord | Vasquez Law Firm',
    description:
      'Ayuda Legal de Emergencia 24/7 en Concord. Consulta Gratuita. 30,000+ Casos Ganados. Se Habla Español.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/concord-abogado-compensacion-laboral-cerca-de-mi',
    images: [
      {
        url: '/images/concord-office-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm Concord - Abogado de Compensación Laboral Cerca de Usted',
      },
    ],
  },
};

export const runtime = 'nodejs';

export default function ConcordAbogadocompensacionlaboralCercaDeMiPage() {
  const post = {
    id: 'concord-abogado-compensacion-laboral-cerca-de-mi',
    title: 'Abogado de Compensación Laboral Cerca De Mí en Concord',
    slug: 'concord-abogado-compensacion-laboral-cerca-de-mi',
    excerpt: 'Abogado de Compensación Laboral experimentado en Concord, NC. Consulta gratuita disponible 24/7.',
    content: `
      <div class="prose prose-lg max-w-none">
        <h1>Abogado de Compensación Laboral Cerca De Mí en Concord, NC</h1>
        
        <p>¿Necesita un abogado de compensación laboral cerca de usted en Concord? Vasquez Law Firm es su mejor opción. Con más de 60 años de experiencia combinada, nuestro equipo bilingüe está listo para luchar por sus derechos.</p>

        <h2>💼 Servicios de Abogado de Compensación Laboral en Concord</h2>
        
        <p>Nuestros servicios especializados incluyen:</p>
        <ul>
          <li>Lesiones en el trabajo</li>
          <li>Enfermedades ocupacionales</li>
          <li>Beneficios negados</li>
          <li>Discapacidad</li>
          <li>Compensación médica</li>
        </ul>

        <h2>🏙️ Por Qué Elegir Nuestros Servicios en Concord</h2>
        
        <h3>Experiencia Local</h3>
        <p>Conocemos las cortes de Concord y tenemos relaciones establecidas con el sistema legal local.</p>

        <h3>Servicio Bilingüe Completo</h3>
        <p>Todo nuestro personal habla español e inglés fluidamente. No necesitará un intérprete para comunicarse con nosotros.</p>

        <h3>Disponibilidad 24/7</h3>
        <p>Emergencias legales pueden ocurrir en cualquier momento. Estamos disponibles 24 horas al día para casos urgentes.</p>

        <h3>Consulta Gratuita</h3>
        <p>Evaluamos su caso sin costo alguno y le explicamos todas sus opciones legales.</p>

        <h2>📍 Sirviendo el Área de Concord</h2>
        <p>Nuestros abogados están disponibles para clientes en Concord y áreas circundantes.</p>

        <h2>🚨 Casos de Emergencia Legal</h2>
        <p>Si usted está enfrentando una situación legal urgente, no espere:</p>
        <ul>
          <li>🚨 Arrestos</li>
          <li>🚨 Accidentes graves</li>
          <li>🚨 Detención por ICE</li>
          <li>🚨 Órdenes judiciales</li>
        </ul>
        
        <p><strong>¡Llame INMEDIATAMENTE\! 📞 1-844-YO-PELEO</strong></p>

        <h2>💼 Historial de Éxito Comprobado</h2>
        <ul>
          <li>✅ 30,000+ casos ganados</li>
          <li>✅ 95% tasa de éxito</li>
          <li>✅ Millones en compensación obtenida</li>
          <li>✅ Décadas de experiencia</li>
          <li>✅ Calificación 5 estrellas</li>
        </ul>

        <h2>📞 Contacte a Su Abogado de Compensación Laboral en Concord Hoy</h2>
        
        <div class="bg-blue-50 p-6 rounded-lg mt-8">
          <h3 class="text-xl font-bold text-blue-800 mb-4">📞 Llame Ahora - Consulta Gratuita</h3>
          <p class="text-lg font-bold text-blue-700">1-844-YO-PELEO (1-844-967-3536)</p>
          <p class="text-blue-700 mt-2">Disponible 24/7 para emergencias legales</p>
        </div>

        <h2>⭐ Lo Que Dicen Nuestros Clientes de Concord</h2>
        <blockquote class="border-l-4 border-blue-500 pl-6 italic text-gray-700">
          "Vasquez Law Firm me ayudó enormemente con mi caso. Su equipo en Concord fue increíblemente profesional y siempre estuvieron disponibles para responder mis preguntas." - Cliente Satisfecho, Concord
        </blockquote>

        <p class="text-center text-lg font-bold mt-8">🚀 Su futuro comienza con una llamada. ¡Contacte a Vasquez Law Firm hoy mismo\!</p>
      </div>
    `,
    practiceArea: 'workers-compensation',
    language: 'es' as const,
    publishedAt: new Date(),
    readTime: 10,
    author: DEFAULT_BLOG_AUTHOR,
    tags: ['compensacion', 'concord', 'abogado', 'cerca-de-mi'],
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