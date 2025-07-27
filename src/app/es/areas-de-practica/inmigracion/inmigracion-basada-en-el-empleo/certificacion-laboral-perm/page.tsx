import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Abogado de Certificación Laboral PERM de Raleigh - Vasquez Law Firm, PLLC',
  description:
    '¿Necesita ayuda con la certificación laboral PERM en Raleigh, NC? Nuestro abogado experto en inmigración facilita el proceso. ¡Contáctenos hoy!',
  openGraph: {
    title: 'Abogado de Certificación Laboral PERM de Raleigh - Vasquez Law Firm, PLLC',
    description:
      '¿Necesita ayuda con la certificación laboral PERM en Raleigh, NC? Nuestro abogado experto en inmigración facilita el proceso. ¡Contáctenos hoy!',
    images: [
      {
        url: '../../../../../wp-content/uploads/2024/04/Raleigh-PERM-Labor-Certification-Lawyers-1.jpg',
      },
    ],
  },
};

export default function CertificacionLaboralPermPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'certificacion-laboral-perm',
    title: 'Abogado de Certificación Laboral PERM de Raleigh',
    slug: 'certificacion-laboral-perm',
    excerpt: 'Blog post excerpt here - TODO: extract from content',
    content: `
      <div className="prose prose-lg max-w-none">
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
