import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Abogados Cerca De Mí en Carolina del Norte | Encuentre Ayuda Legal Cerca de Usted | Vasquez Law Firm',
  description:
    'Encuentre los mejores abogados cerca de usted en NC. Inmigración, lesiones personales, defensa criminal, compensación laboral. Disponibilidad 24/7. Consulta gratuita. Se habla español.',
  keywords:
    'abogados cerca de mi, abogado cerca de mi, bufete de abogados cerca de mi, ayuda legal cerca de mi, abogado de inmigracion cerca de mi, abogado de lesiones personales cerca de mi',
  openGraph: {
    title: 'Abogados Cerca De Mí en Carolina del Norte | Vasquez Law Firm',
    description:
      'Encuentre ayuda legal cerca de usted en Carolina del Norte. Consulta gratuita. 30,000+ casos ganados. Disponibilidad 24/7.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi',
    images: [
      {
        url: '/images/vasquez-law-team-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Equipo de Abogados Vasquez Law Firm - Cerca de Usted',
      },
    ],
  },
};

export const runtime = 'nodejs';

export default function CercaDeMiPage() {
  const post = {
    id: 'cerca-de-mi',
    title: 'Encuentre Ayuda Legal Cerca de Usted en Carolina del Norte',
    slug: 'cerca-de-mi',
    excerpt: 'Encuentre los mejores abogados cerca de usted en Carolina del Norte. Consulta gratuita disponible.',
    content: `
      <div class="prose prose-lg max-w-none">
        <h1>Abogados Cerca De Mí en Carolina del Norte</h1>
        
        <p>¿Necesita un abogado cerca de usted en Carolina del Norte? Vasquez Law Firm está aquí para ayudarle con todas sus necesidades legales. Con más de 60 años de experiencia combinada y 30,000+ casos ganados, nuestro equipo de abogados bilingües está listo para representarle.</p>

        <h2>Nuestras Áreas de Práctica</h2>
        
        <h3>🌐 Ley de Inmigración</h3>
        <p>Especialistas en casos de inmigración, deportación, ciudadanía, residencia permanente, y más. Entendemos las complejidades del sistema de inmigración y luchamos por sus derechos.</p>

        <h3>🏥 Lesiones Personales</h3>
        <p>Accidentes de auto, lesiones en el trabajo, caídas, negligencia médica. No cobramos a menos que ganemos su caso.</p>

        <h3>⚖️ Defensa Criminal</h3>
        <p>Defensa agresiva para cargos criminales. Protegemos sus derechos y luchamos por el mejor resultado posible.</p>

        <h3>👥 Derecho Familiar</h3>
        <p>Divorcio, custodia, manutención de menores. Manejamos casos familiares con compasión y profesionalismo.</p>

        <h3>💼 Compensación Laboral</h3>
        <p>Lesiones en el trabajo, enfermedades ocupacionales, beneficios negados. Luchamos por la compensación que merece.</p>

        <h2>Ubicaciones Que Servimos</h2>
        <ul>
          <li><strong>Charlotte, NC</strong> - Nuestra oficina principal</li>
          <li><strong>Raleigh, NC</strong> - Sirviendo el área metropolitana</li>
          <li><strong>Cary, NC</strong> - Comunidad diversa</li>
          <li><strong>Durham, NC</strong> - Triangle área</li>
          <li><strong>Concord, NC</strong> - Condado de Cabarrus</li>
          <li><strong>Greensboro, NC</strong> - Piamonte Triad</li>
          <li><strong>Winston-Salem, NC</strong> - Condado de Forsyth</li>
          <li><strong>High Point, NC</strong> - Ciudad de los Muebles</li>
          <li><strong>Fayetteville, NC</strong> - Fort Liberty área</li>
          <li><strong>Wilmington, NC</strong> - Costa de Carolina</li>
        </ul>

        <h2>¿Por Qué Elegir Vasquez Law Firm?</h2>
        <ul>
          <li>✅ <strong>Consulta Gratuita</strong> - Sin costo inicial</li>
          <li>✅ <strong>Se Habla Español</strong> - Servicio completamente bilingüe</li>
          <li>✅ <strong>30,000+ Casos Ganados</strong> - Historial comprobado</li>
          <li>✅ <strong>Disponibilidad 24/7</strong> - Emergencias legales</li>
          <li>✅ <strong>60+ Años de Experiencia</strong> - Equipo experimentado</li>
          <li>✅ <strong>Sin Honorarios Hasta Ganar</strong> - Para casos de lesiones</li>
        </ul>

        <h2>Llame Ahora para Su Consulta Gratuita</h2>
        <p><strong>📞 1-844-YO-PELEO (1-844-967-3536)</strong></p>
        
        <p>No espere más. Su futuro es demasiado importante para dejarlo al azar. Contacte a Vasquez Law Firm hoy mismo y permítanos luchar por sus derechos.</p>

        <div class="bg-blue-50 p-6 rounded-lg mt-8">
          <h3 class="text-xl font-bold text-blue-800 mb-4">🚨 Emergencia Legal 24/7</h3>
          <p class="text-blue-700">¿Tiene una emergencia legal? Nuestro equipo está disponible 24 horas al día, 7 días a la semana para casos urgentes de inmigración, defensa criminal, y lesiones graves.</p>
        </div>
      </div>
    `,
    practiceArea: 'general',
    language: 'es' as const,
    publishedAt: new Date(),
    readTime: 8,
    author: DEFAULT_BLOG_AUTHOR,
    tags: ['abogados', 'cerca-de-mi', 'carolina-del-norte', 'consulta-gratuita'],
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