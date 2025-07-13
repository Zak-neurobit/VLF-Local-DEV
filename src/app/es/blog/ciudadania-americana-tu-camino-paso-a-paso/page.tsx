import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ciudadanía Americana: Tu Camino Paso a Paso 2024 | YO PELEO POR TI™',
  description: 'Guía completa ciudadanía americana 2024: naturalización, requisitos, examen. Abogado veterano en NC/FL. YO PELEO POR TI™. Consulta gratuita 1-844-YO-PELEO',
  keywords: 'ciudadanía americana, naturalización, examen ciudadanía, abogado naturalización NC FL, YO PELEO POR TI',
  openGraph: {
    title: 'Ciudadanía Americana: Tu Camino Paso a Paso 2024',
    description: 'Conviértete en ciudadano americano con disciplina militar. Veterano abogado te guía al juramento.',
    type: 'article',
    locale: 'es_US',
  }

export const runtime = 'nodejs';

export default function CiudadaniaAmericanaTuCaminoPasoAPasoPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'ciudadania-americana-tu-camino-paso-a-paso',
    title: 'Ciudadania Americana Tu Camino Paso A Paso',
    slug: 'ciudadania-americana-tu-camino-paso-a-paso',
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
