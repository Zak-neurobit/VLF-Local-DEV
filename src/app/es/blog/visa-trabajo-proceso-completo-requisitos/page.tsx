import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visa de Trabajo: Proceso Completo y Requisitos 2024 | YO PELEO POR TI™',
  description: 'Guía completa visas de trabajo 2024: H-1B, L-1, EB-2, EB-3. Abogado veterano en NC/FL. YO PELEO POR TI™. Consulta gratuita 1-844-YO-PELEO',
  keywords: 'visa trabajo, H-1B, L-1, EB-2, EB-3, inmigración empleo, abogado visa trabajo NC FL, YO PELEO POR TI',
  openGraph: {
    title: 'Visa de Trabajo: Proceso Completo y Requisitos 2024',
    description: 'Domina el proceso de visa de trabajo con estrategias militares del veterano abogado.',
    type: 'article',
    locale: 'es_US',
  }

export const runtime = 'nodejs';

export default function VisaTrabajoProcesoCompletoRequisitosPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'visa-trabajo-proceso-completo-requisitos',
    title: 'Visa Trabajo Proceso Completo Requisitos',
    slug: 'visa-trabajo-proceso-completo-requisitos',
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
