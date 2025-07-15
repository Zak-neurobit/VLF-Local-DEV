import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Nuevos Requisitos Examen Médico para Residencia 2025 | YO PELEO POR TI™',
  description:
    'ALERTA: Nuevos requisitos médicos para residencia. Veterano abogado con estrategias para navegar cambios I-693. YO PELEO POR TI™. Llama 1-844-YO-PELEO',
  keywords:
    'examen médico I-693, residencia permanente, inmigración médica, abogado inmigración NC FL, YO PELEO POR TI',
  openGraph: {
    title: 'Nuevos Requisitos Examen Médico para Residencia 2025',
    description:
      'Cambios críticos en examen médico I-693. Veterano abogado con estrategias militares para cumplir nuevos requisitos.',
    type: 'article',
    locale: 'es_US',
  },
};

export const runtime = 'nodejs';

export default function ExamenMedicoResidenciaNuevosRequisitosPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'examen-medico-residencia-nuevos-requisitos',
    title: 'Examen Medico Residencia Nuevos Requisitos',
    slug: 'examen-medico-residencia-nuevos-requisitos',
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
