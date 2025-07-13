import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogados de Accidentes de Construcción en NC | OSHA | YO PELEO POR TI™',
  description:
    '¿Herido en obra de construcción? Abogados expertos en accidentes laborales y OSHA en Carolina del Norte. Compensación más allá de workers comp. Consulta GRATIS.',
  keywords:
    'abogado accidentes construcción Carolina Norte, caídas andamios Raleigh, lesiones obra Charlotte, violaciones OSHA NC, compensación trabajadores construcción',
  openGraph: {
    title: 'Abogados de Accidentes de Construcción - Vasquez Law Firm | NC',
    description:
      'Los sitios de construcción son peligrosos. Si se lesionó, merece más que compensación laboral. Luchamos por justicia completa. Llame 1-844-YO-PELEO',
    images: [
      {
        url: '/images/construction-accident-attorney.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogados de Accidentes de Construcción en Carolina del Norte',
      },
    ],
  },
};

export const runtime = 'nodejs';

export default function AccidentesDeConstruccionPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'accidentes-de-construccion',
    title: 'Abogados de Accidentes de Construcción',
    slug: 'accidentes-de-construccion',
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
