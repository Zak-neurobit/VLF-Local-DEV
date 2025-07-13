import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Historias de Éxito en Inmigración NC/FL: Victorias Reales | YO PELEO POR TI™',
  description:
    'Casos reales ganados: Residencias, asilos, deportaciones detenidas en NC/FL. Veterano abogado con victorias comprobadas. YO PELEO POR TI™. Llama 1-844-YO-PELEO',
  keywords:
    'historias éxito inmigración, casos ganados NC FL, abogado inmigración exitoso, YO PELEO POR TI, veterano abogado',
  openGraph: {
    title: 'Historias de Éxito en Inmigración NC/FL: Victorias Reales',
    description:
      'Casos reales de inmigración ganados en Carolina del Norte y Florida. Veterano abogado con historial comprobado de victorias.',
    type: 'article',
    locale: 'es_US',
  },
};

export const runtime = 'nodejs';

export default function HistoriasExitoInmigracionNcFlPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'historias-exito-inmigracion-nc-fl',
    title: 'Historias Exito Inmigracion Nc Fl',
    slug: 'historias-exito-inmigracion-nc-fl',
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
