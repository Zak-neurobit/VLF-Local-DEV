import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Abogados de Muerte Injusta en NC | Justicia para Familias | YO PELEO POR TI™',
  description:
    '¿Perdió un ser querido por negligencia? Abogados compasivos de muerte injusta en Carolina del Norte. Buscamos justicia y compensación para su familia. Consulta GRATIS.',
  keywords:
    'abogado muerte injusta Carolina Norte, wrongful death español, compensación familiar Raleigh, demanda muerte negligencia Charlotte, pérdida ser querido NC',
  openGraph: {
    title: 'Abogados de Muerte Injusta - Vasquez Law Firm | Carolina del Norte',
    description:
      'En su momento más difícil, estamos aquí para buscar justicia. Representamos familias que perdieron seres queridos por negligencia. Llame 1-844-YO-PELEO',
    images: [
      {
        url: '/images/wrongful-death-attorney.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogados de Muerte Injusta en Carolina del Norte',
      },
    ],
  },
};

export const runtime = 'nodejs';

export default function MuerteInjustaPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'muerte-injusta',
    title: 'Abogados de Muerte Injusta',
    slug: 'muerte-injusta',
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
    author: DEFAULT_BLOG_AUTHOR,
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
