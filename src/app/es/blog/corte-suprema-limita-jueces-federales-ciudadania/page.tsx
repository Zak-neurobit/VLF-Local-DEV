import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corte Suprema Limita Jueces Federales: Impacto en Inmigración | YO PELEO POR TI™',
  description: 'ALERTA: Corte Suprema limita poder judicial. Veterano abogado analiza impacto en inmigración y ciudadanía. YO PELEO POR TI™. Llama 1-844-YO-PELEO',
  keywords: 'Corte Suprema, jueces federales, inmigración, ciudadanía, abogado inmigración NC FL, YO PELEO POR TI',
  openGraph: {
    title: 'Corte Suprema Limita Jueces Federales: Impacto en Inmigración',
    description: 'Análisis militar del fallo de Corte Suprema sobre jueces federales. Veterano abogado explica impacto en inmigración.',
    type: 'article',
    locale: 'es_US',
  }

export const runtime = 'nodejs';

export default function CorteSupremaLimitaJuecesFederalesCiudadaniaPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'corte-suprema-limita-jueces-federales-ciudadania',
    title: 'Corte Suprema Limita Jueces Federales Ciudadania',
    slug: 'corte-suprema-limita-jueces-federales-ciudadania',
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
