import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogados de Mordeduras de Perro en NC | Lesiones Graves | YO PELEO POR TI™',
  description:
    '¿Atacado por un perro? Abogados expertos en mordeduras de perro en Carolina del Norte. Obtenga compensación por lesiones, trauma y cicatrices. Consulta GRATIS.',
  keywords:
    'abogado mordeduras perro Carolina Norte, ataque perro Raleigh, lesiones mordida animal Charlotte, compensación ataque canino, demanda dueño perro NC',
  openGraph: {
    title: 'Abogados de Mordeduras de Perro - Vasquez Law Firm | Carolina del Norte',
    description:
      'Víctima de ataque de perro? El dueño es responsable. Luchamos por compensación justa para víctimas y familias. Llame 1-844-YO-PELEO',
    images: [
      {
        url: '/images/dog-bite-attorney.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogados de Mordeduras de Perro en Carolina del Norte',
      },
    ],
  },
};

export const runtime = 'nodejs';

export default function MordedurasDePerroPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'mordeduras-de-perro',
    title: 'Abogados de Mordeduras de Perro',
    slug: 'mordeduras-de-perro',
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
