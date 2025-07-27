import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Abogados de Lesiones de Médula Espinal en NC | Parálisis | YO PELEO POR TI™',
  description:
    '¿Sufrió lesión de médula espinal? Abogados expertos en parálisis y lesiones espinales en Carolina del Norte. Luchamos por compensación máxima. Consulta GRATIS.',
  keywords:
    'abogado lesiones médula espinal Carolina Norte, parálisis paraplejia tetraplejia, lesión espinal Raleigh, daño columna vertebral Charlotte, compensación parálisis NC',
  openGraph: {
    title: 'Abogados de Lesiones de Médula Espinal - Vasquez Law Firm | NC',
    description:
      'Las lesiones de médula espinal requieren cuidado de por vida. Obtenga compensación completa para tratamiento, rehabilitación y adaptaciones. Llame 1-844-YO-PELEO',
    images: [
      {
        url: '/images/spinal-cord-injury-attorney.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogados de Lesiones de Médula Espinal en Carolina del Norte',
      },
    ],
  },
};

export default function LesionesMedulaEspinalPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'lesiones-medula-espinal',
    title: 'Abogados de Lesiones de Médula Espinal',
    slug: 'lesiones-medula-espinal',
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
