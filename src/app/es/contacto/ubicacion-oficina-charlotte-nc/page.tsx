import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ubicacion Oficina Charlotte, NC - Vasquez Law Firm, PLLC',
  description:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
  openGraph: {
    title: 'Ubicacion Oficina Charlotte, NC - Vasquez Law Firm, PLLC',
    description:
      'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
    images: [{ url: '/images/og-default.jpg' }],
  },
};

export const runtime = 'nodejs';

export default function UbicacionOficinaCharlotteNcPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'ubicacion-oficina-charlotte-nc',
    title: 'Mapa e indicaciones – Charlotte',
    slug: 'ubicacion-oficina-charlotte-nc',
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
