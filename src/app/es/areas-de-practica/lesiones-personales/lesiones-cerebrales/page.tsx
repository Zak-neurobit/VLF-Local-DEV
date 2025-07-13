import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogados de Lesiones Cerebrales en NC | TBI Traumático | YO PELEO POR TI™',
  description:
    '¿Sufrió lesión cerebral traumática? Abogados expertos en TBI en Carolina del Norte. Luchamos por compensación completa para cuidado de por vida. Consulta GRATIS.',
  keywords:
    'abogado lesiones cerebrales Carolina Norte, TBI traumatic brain injury español, conmoción cerebral Raleigh, daño cerebral Charlotte, compensación lesión cabeza NC',
  openGraph: {
    title: 'Abogados de Lesiones Cerebrales Traumáticas - Vasquez Law Firm | NC',
    description:
      'Las lesiones cerebrales cambian vidas para siempre. Obtenga compensación para tratamiento médico, rehabilitación y cuidado futuro. Llame 1-844-YO-PELEO',
    images: [
      {
        url: '/images/brain-injury-attorney.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogados de Lesiones Cerebrales en Carolina del Norte',
      },
    ],
  },
};

export const runtime = 'nodejs';

export default function LesionesCerebralesPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'lesiones-cerebrales',
    title: 'Abogados de Lesiones Cerebrales Traumáticas',
    slug: 'lesiones-cerebrales',
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
