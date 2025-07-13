import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guía Completa: Cómo Obtener la Residencia Permanente en 2024 | YO PELEO POR TI™',
  description: 'Guía completa para obtener la residencia permanente en 2024. Abogado veterano de inmigración en NC/FL. ¡YO PELEO POR TI™! Consulta gratuita 1-844-YO-PELEO',
  keywords: 'residencia permanente, green card, inmigración, abogado inmigración NC FL, YO PELEO POR TI',
  openGraph: {
    title: 'Guía Completa: Cómo Obtener la Residencia Permanente en 2024',
    description: 'Todo lo que necesitas saber sobre la residencia permanente. Abogado veterano te guía paso a paso.',
    type: 'article',
    locale: 'es_US',
  }

export const runtime = 'nodejs';

export default function GuiaCompletaResidenciaPermanente2024Page() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'guia-completa-residencia-permanente-2024',
    title: 'Guia Completa Residencia Permanente 2024',
    slug: 'guia-completa-residencia-permanente-2024',
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
    author: {
      name: 'Vasquez Law Firm',
    },
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
