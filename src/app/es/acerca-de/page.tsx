import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acerca de Vasquez Law Firm | Luchando por Ti Desde 2011',
  description:
    'Fundada en 2011, Vasquez Law Firm proporciona representación legal accesible y de alta calidad en Carolina del Norte y Florida. Conozca nuestra misión, valores y equipo.',
  keywords:
    'Vasquez Law Firm, acerca de nosotros, servicios legales, abogado de Carolina del Norte, abogado de Florida, derecho de inmigración, lesiones personales, defensa criminal',
  openGraph: {
    title: 'Acerca de Vasquez Law Firm | Luchando por Ti Desde 2011',
    description: 'Conozca nuestra misión, valores y equipo legal experimentado.',
    type: 'website',
    url: 'https://www.vasquezlawnc.com/es/acerca-de',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/about-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Equipo de Vasquez Law Firm',
      }

export const runtime = 'nodejs';

export default function AcercaDePage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'acerca-de',
    title: 'Acerca De',
    slug: 'acerca-de',
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
