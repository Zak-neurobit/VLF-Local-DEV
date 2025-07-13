import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Blog Legal | Perspectivas y Noticias de Expertos | Bufete de Abogados Vasquez',
  description:
    'Manténgase informado con análisis legal experto sobre inmigración, lesiones personales, defensa criminal, compensación laboral y derecho familiar en Carolina del Norte y Florida.',
  keywords:
    'blog legal, derecho de inmigración, lesiones personales, defensa criminal, compensación laboral, derecho familiar, abogado de Carolina del Norte, abogado de Florida, asesoría legal',
  openGraph: {
    title: 'Blog Legal | Bufete de Abogados Vasquez',
    description:
      'Perspectivas legales expertas y actualizaciones para Carolina del Norte y Florida',
    type: 'website',
    url: 'https://www.vasquezlawnc.com/es/blog',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/blog-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Legal del Bufete de Abogados Vasquez',
      },
    ],
  },
};

export const runtime = 'nodejs';

export default function BlogPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'blog',
    title: 'Blog',
    slug: 'blog',
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
