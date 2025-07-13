import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DACA 2024: Todo lo que Necesitas Saber Ahora | YO PELEO POR TI™',
  description: 'Guía completa DACA 2024: renovaciones, nuevas aplicaciones, derechos. Abogado veterano en NC/FL. YO PELEO POR TI™. Consulta gratuita 1-844-YO-PELEO',
  keywords: 'DACA 2024, renovación DACA, dreamers, inmigración, abogado DACA NC FL, YO PELEO POR TI',
  openGraph: {
    title: 'DACA 2024: Todo lo que Necesitas Saber Ahora',
    description: 'Protege tu estatus DACA con el veterano abogado. Estrategias militares para la victoria total.',
    type: 'article',
    locale: 'es_US',
  }

export const runtime = 'nodejs';

export default function DacaTodoLoQueNecesitasSaber2024Page() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'daca-todo-lo-que-necesitas-saber-2024',
    title: 'Daca Todo Lo Que Necesitas Saber 2024',
    slug: 'daca-todo-lo-que-necesitas-saber-2024',
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
