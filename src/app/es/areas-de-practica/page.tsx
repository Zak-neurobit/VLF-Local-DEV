import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Áreas de Práctica - Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description:
    'Servicios legales integrales en inmigración, lesiones personales, compensación laboral, defensa criminal, derecho familiar y infracciones de tráfico. Mejorados con tecnología IA.',
  keywords:
    'áreas de práctica, inmigración, lesiones personales, compensación laboral, defensa criminal, derecho familiar, infracciones tráfico, abogado español',
  openGraph: {
    title: 'Áreas de Práctica - Bufete de Abogados Vasquez',
    description:
      'Servicios legales integrales mejorados con tecnología IA. 60+ años de experiencia.',
    images: [{ url: '/images/BANNER_TRANS.PNG' }],
  },
};

export const runtime = 'nodejs';

export default function AreasDePracticaPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'areas-de-practica',
    title: 'Áreas de Práctica',
    slug: 'areas-de-practica',
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
