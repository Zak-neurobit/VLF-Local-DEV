import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Accidentes de Motocicleta - Vasquez Law Firm, PLLC',
  description:
    'Lesionado en un accidente de motocicleta? Nuestros abogados en Raleigh, NC luchan por la compensación que merece. ¡Contáctenos hoy para una consulta gratis!',
  openGraph: {
    title: 'Accidentes de Motocicleta - Vasquez Law Firm, PLLC',
    description:
      'Lesionado en un accidente de motocicleta? Nuestros abogados en Raleigh, NC luchan por la compensación que merece. ¡Contáctenos hoy para una consulta gratis!',
    images: [
      {
        url: '../../../../wp-content/uploads/2024/04/johnston-county-motorcycle-accident-injury-attorneys-1.jpg',
      },
    ],
  },
};


export default function AccidentesMotocicletaPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'accidentes-motocicleta',
    title: 'Accidentes de Motocicleta',
    slug: 'accidentes-motocicleta',
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
