import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Vasquez Law Firm | Fighting for You Since 2011',
  description:
    'Founded in 2011, Vasquez Law Firm provides accessible, high-quality legal representation across North Carolina and Florida. Learn about our mission, values, and team.',
  keywords:
    'Vasquez Law Firm, about us, legal services, North Carolina attorney, Florida lawyer, immigration law, personal injury, criminal defense',
  openGraph: {
    title: 'About Vasquez Law Firm | Fighting for You Since 2011',
    description: 'Learn about our mission, values, and experienced legal team.',
    type: 'website',
    url: 'https://www.vasquezlawnc.com/about',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/about-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm Team',
      },
    ],
  },
};

export const runtime = 'nodejs';

export default function AboutPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'about',
    title: 'About',
    slug: 'about',
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
