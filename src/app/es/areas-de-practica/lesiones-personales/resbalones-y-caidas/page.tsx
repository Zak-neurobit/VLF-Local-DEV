import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogados de Resbalones y Caídas en NC | Responsabilidad de Locales | YO PELEO POR TI™',
  description: '¿Se cayó en una tienda, restaurante o propiedad privada? Abogados expertos en resbalones y caídas en Raleigh, Charlotte. Consulta GRATIS. Hablamos español.',
  keywords: 'abogado resbalones caídas Carolina Norte, slip and fall español, accidente tienda Walmart, caída restaurante, lesiones local comercial, demanda resbalón NC',
  openGraph: {
    title: 'Abogados de Resbalones y Caídas - Vasquez Law Firm | Carolina del Norte',
    description: 'Lesionado por condiciones peligrosas en una propiedad? Hacemos responsables a los dueños negligentes. Sin costo inicial. Llame 1-844-YO-PELEO',
    images: [{
      url: '/images/slip-fall-attorney.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogados de Resbalones y Caídas en Carolina del Norte'
    }

export const runtime = 'nodejs';

export default function ResbalonesYCaidasPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'resbalones-y-caidas',
    title: 'Abogados de Resbalones y Caídas',
    slug: 'resbalones-y-caidas',
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
