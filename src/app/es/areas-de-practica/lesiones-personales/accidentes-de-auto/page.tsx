import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Abogados de Accidentes de Auto en Carolina del Norte | YO PELEO POR TI™',
  description:
    '¿Herido en un accidente de auto? Nuestros abogados en Raleigh, Charlotte y Smithfield luchan por compensación máxima. Sin honorarios si no ganamos. Consulta GRATIS.',
  keywords:
    'abogado accidentes auto Carolina Norte, accidente carro Raleigh, abogado choques Charlotte, compensación accidentes vehiculares, demanda accidente auto NC',
  openGraph: {
    title: 'Abogados de Accidentes de Auto en Carolina del Norte | Vasquez Law Firm',
    description:
      '¿Herido en un accidente de auto? Obtenga la compensación que merece. Más de 35 años de experiencia. Hablamos español. Llame al 1-844-YO-PELEO',
    images: [
      {
        url: '/images/car-accident-attorney.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogados de Accidentes de Auto en Carolina del Norte',
      },
    ],
  },
};

export default function AccidentesDeAutoPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'accidentes-de-auto',
    title: 'Abogados de Accidentes de Auto en Carolina del Norte',
    slug: 'accidentes-de-auto',
    excerpt: 'Blog post excerpt here - TODO: extract from content',
    content: `
      <div className="prose prose-lg max-w-none">
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
