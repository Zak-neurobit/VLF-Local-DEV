import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'Abogados de Responsabilidad del Producto en NC | Productos Defectuosos | YO PELEO POR TI™',
  description:
    '¿Herido por producto defectuoso? Abogados expertos en demandas contra fabricantes en Carolina del Norte. Autos, medicamentos, juguetes peligrosos. Consulta GRATIS.',
  keywords:
    'abogado productos defectuosos Carolina Norte, responsabilidad fabricante Raleigh, demanda producto peligroso Charlotte, recall productos NC, compensación defectos diseño',
  openGraph: {
    title: 'Abogados de Responsabilidad del Producto - Vasquez Law Firm | NC',
    description:
      'Los productos defectuosos causan miles de lesiones. Hacemos responsables a fabricantes negligentes. Sin costo inicial. Llame 1-844-YO-PELEO',
    images: [
      {
        url: '/images/product-liability-attorney.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogados de Responsabilidad del Producto en Carolina del Norte',
      },
    ],
  },
};


export default function ResponsabilidadDelProductoPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'responsabilidad-del-producto',
    title: 'Abogados de Responsabilidad del Producto',
    slug: 'responsabilidad-del-producto',
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
