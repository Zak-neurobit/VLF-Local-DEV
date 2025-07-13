import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Make a Payment | Vasquez Law Firm, PLLC',
  description: 'Make secure payments to Vasquez Law Firm through our trusted payment partner, LawPay. Secure processing for legal fees and retainers.',
  keywords: 'make payment, pay attorney, LawPay, secure payment, legal fees, Vasquez Law Firm',
  openGraph: {
    title: 'Make a Payment | Vasquez Law Firm, PLLC',
    description: 'Secure payment portal for Vasquez Law Firm clients',
    images: ['/images/og-payment.jpg'],
  }

export const runtime = 'nodejs';

export default function MakePaymentPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'make-payment',
    title: 'Make Payment',
    slug: 'make-payment',
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
