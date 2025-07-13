import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deportación: 5 Pasos Urgentes que Debes Tomar HOY | YO PELEO POR TI™',
  description:
    'EMERGENCIA: Pasos urgentes contra deportación. Abogado veterano en NC/FL con estrategias militares. YO PELEO POR TI™. Llama 1-844-YO-PELEO',
  keywords:
    'deportación, inmigración emergencia, ICE, abogado deportación NC FL, YO PELEO POR TI, defensa inmigración',
  openGraph: {
    title: 'Deportación: 5 Pasos Urgentes que Debes Tomar HOY',
    description:
      'Estrategias militares de emergencia contra deportación. Veterano abogado te defiende ahora.',
    type: 'article',
    locale: 'es_US',
  },
};

export const runtime = 'nodejs';

export default function Deportacion5PasosUrgentesQueDebesTomarHoyPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'deportacion-5-pasos-urgentes-que-debes-tomar-hoy',
    title: 'Deportacion 5 Pasos Urgentes Que Debes Tomar Hoy',
    slug: 'deportacion-5-pasos-urgentes-que-debes-tomar-hoy',
    excerpt: 'Blog post excerpt here - TODO: extract from content',
    content: `
      <div class="prose prose-lg max-w-none">
        <!-- TODO: Migrate content from original file -->
        <p>This content needs to be migrated from the original file.</p>
      </div>
    `,
    practiceArea: 'general', // TODO: Determine correct practice area
    language: 'en' as const,
    publishedAt: new Date(),
    readTime: 5,
    author: {
      name: 'Vasquez Law Firm',
    },
    tags: [], // TODO: Add relevant tags
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
      relatedPosts={[]} // TODO: Add related posts
    />
  );
}
