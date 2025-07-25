import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'Smithfield, NC Abogados de Inmigración para Salidas Forzadas Diferidas - Vasquez Law Firm, PLLC',
  description:
    '¿Necesita ayuda con Salidas Forzadas Diferidas en Smithfield, NC? Nuestros abogados de inmigración están listos para asesorarle. ¡Contáctenos hoy!',
  openGraph: {
    title:
      'Smithfield, NC Abogados de Inmigración para Salidas Forzadas Diferidas - Vasquez Law Firm, PLLC',
    description:
      '¿Necesita ayuda con Salidas Forzadas Diferidas en Smithfield, NC? Nuestros abogados de inmigración están listos para asesorarle. ¡Contáctenos hoy!',
    images: [
      {
        url: '../../../../wp-content/uploads/2024/04/venezuela-immigration-deportation-protection-1.jpg',
      },
    ],
  },
};


export default function MemorandoSobreSalidaForzadaDiferidaParaCiertosVenezolanosPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'memorando-sobre-salida-forzada-diferida-para-ciertos-venezolanos',
    title: 'Smithfield, NC Abogados de Inmigración para Salidas Forzadas Diferidas',
    slug: 'memorando-sobre-salida-forzada-diferida-para-ciertos-venezolanos',
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
