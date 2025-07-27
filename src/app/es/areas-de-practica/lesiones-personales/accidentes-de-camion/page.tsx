import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Abogados de Accidentes de Camión en NC | Lesiones Graves | YO PELEO POR TI™',
  description:
    'Accidentes de camiones comerciales causan lesiones devastadoras. Abogados expertos en Raleigh y Charlotte luchan contra grandes empresas. Consulta GRATIS 24/7.',
  keywords:
    'abogado accidentes camión Carolina Norte, accidente tráiler Raleigh, choque camión comercial Charlotte, demanda accidente camión NC, compensación lesiones graves',
  openGraph: {
    title: 'Abogados de Accidentes de Camión - Vasquez Law Firm | Carolina del Norte',
    description:
      'Lesiones por accidentes de camión? Enfrentamos a las grandes empresas de transporte. Más de 35 años de experiencia. Llame 1-844-YO-PELEO',
    images: [
      {
        url: '/images/truck-accident-attorney.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogados de Accidentes de Camión en Carolina del Norte',
      },
    ],
  },
};

export default function AccidentesDeCamionPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'accidentes-de-camion',
    title: 'Abogados de Accidentes de Camión',
    slug: 'accidentes-de-camion',
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
