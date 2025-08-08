import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';
export const metadata: Metadata = {
  title: 'Abogados de Negligencia Médica en NC | Errores Médicos | YO PELEO POR TI™',
  description:
    '¿Víctima de error médico? Abogados expertos en negligencia médica en Carolina del Norte. Diagnósticos erróneos, errores quirúrgicos, lesiones de parto. Consulta GRATIS.',
  keywords:
    'abogado negligencia médica Carolina Norte, mala práctica médica Raleigh, error médico Charlotte, demanda hospital NC, compensación error diagnóstico',
  openGraph: {
    title: 'Abogados de Negligencia Médica - Vasquez Law Firm | Carolina del Norte',
    description:
      'Los errores médicos son la tercera causa de muerte en USA. Si sufrió por negligencia médica, podemos ayudar. Consulta gratuita. Llame 1-844-YO-PELEO',
    images: [
      {
        url: '/images/medical-malpractice-attorney.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogados de Negligencia Médica en Carolina del Norte',
      },
    ],
  },
};

export default function NegligenciaMedicaPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'negligencia-medica',
    title: 'Abogados de Negligencia Médica',
    slug: 'negligencia-medica',
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
