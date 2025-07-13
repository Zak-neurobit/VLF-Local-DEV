import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TPS Cancelado para Honduras y Nicaragua: Qué Hacer AHORA | YO PELEO POR TI™',
  description:
    'ALERTA: TPS cancelado para hondureños y nicaragüenses. Veterano abogado con estrategias militares urgentes. YO PELEO POR TI™. Llama 1-844-YO-PELEO',
  keywords:
    'TPS cancelado, Honduras Nicaragua, inmigración emergencia, abogado TPS NC FL, YO PELEO POR TI, defensa inmigración',
  openGraph: {
    title: 'TPS Cancelado para Honduras y Nicaragua: Qué Hacer AHORA',
    description:
      'Estrategias militares urgentes para hondureños y nicaragüenses afectados por cancelación TPS. Veterano abogado te defiende.',
    type: 'article',
    locale: 'es_US',
  },
};

export const runtime = 'nodejs';

export default function TpsCanceladoHondurasNicaraguaQueHacerPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'tps-cancelado-honduras-nicaragua-que-hacer',
    title: 'Tps Cancelado Honduras Nicaragua Que Hacer',
    slug: 'tps-cancelado-honduras-nicaragua-que-hacer',
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
