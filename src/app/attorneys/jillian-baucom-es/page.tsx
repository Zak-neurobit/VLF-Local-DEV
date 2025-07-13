import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jillian baucom - Vasquez Law Firm, PLLC',
  description:
    'Jillian Baucom, experienced immigration attorney in Raleigh, NC. Dedicated to helping clients navigate the immigration process smoothly. Contact us today!',
  openGraph: {
    title: 'Jillian baucom - Vasquez Law Firm, PLLC',
    description:
      'Jillian Baucom, experienced immigration attorney in Raleigh, NC. Dedicated to helping clients navigate the immigration process smoothly. Contact us today!',
    images: [{ url: 'https://www.vasquezlawnc.com/images/attorneys/jillian-baucom.jpg' }],
  },
};

export const runtime = 'nodejs';

export default function JillianBaucomEsPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'jillian-baucom-es',
    title: 'Jillian Baucom',
    slug: 'jillian-baucom-es',
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
