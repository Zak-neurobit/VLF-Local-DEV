import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Abogados de Responsabilidad de Locales en NC | Propiedad Insegura | YO PELEO POR TI™',
  description:
    '¿Herido en propiedad ajena? Abogados expertos en responsabilidad de locales en Carolina del Norte. Resbalones, seguridad inadecuada, piscinas. Consulta GRATIS.',
  keywords:
    'abogado responsabilidad locales Carolina Norte, premises liability español, propiedad insegura Raleigh, demanda dueño negligente Charlotte, compensación accidente local NC',
  openGraph: {
    title: 'Abogados de Responsabilidad de Locales - Vasquez Law Firm | NC',
    description:
      'Los dueños de propiedades deben mantener locales seguros. Si se lesionó por negligencia, podemos ayudar. Sin costo inicial. Llame 1-844-YO-PELEO',
    images: [
      {
        url: '/images/premises-liability-attorney.jpg',
        width: 1200,
        height: 630,
        alt: 'Abogados de Responsabilidad de Locales en Carolina del Norte',
      },
    ],
  },
};

export const runtime = 'nodejs';

export default function ResponsabilidadDeLocalesPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'responsabilidad-de-locales',
    title: 'Abogados de Responsabilidad de Locales',
    slug: 'responsabilidad-de-locales',
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
