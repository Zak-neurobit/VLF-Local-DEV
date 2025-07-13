import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Abogados de visas de inmigrantes en Raleigh, NC - Vasquez Law Firm, PLLC',
  description:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
  openGraph: {
    title: 'Abogados de visas de inmigrantes en Raleigh, NC - Vasquez Law Firm, PLLC',
    description:
      'Abogados en el condado de Wake que ayudan con peticiones de visa y entrevistas En Vasquez Law Firm, PLLC, nuestros abogados de inmigración calificados son expertos en manejar una amplia gama de asuntos relacionados con la obtención de visas de inmigrante para ciudadanos extranjeros que desean vivir en los Estados Unidos de forma permanente. Entendemos que el proceso de obtener una visa puede ser difícil y llevar mucho tiempo, y un solo error en el camino podría ser devastador para el caso del solicitante. Con esto en mente, brindamos orientación confiable y representación calificada tanto a solicitantes como a patrocinadores durante todo el proceso de visa. Visas de no inmigrante e inmigrante Los ciudadanos extranjeros que deseen venir a los Estados Unidos por un período prolongado de tiempo deben obtener una visa. Las visas temporales o de no inmigrante están disponibles para quienes vienen a los EE. UU. por motivos como el turismo, la educación o con fines laborales. Para aquellos que quieran permanecer en los Estados Unidos de forma permanente, se requiere una visa de inmigrante. Las visas de inmigrante están disponibles por motivos laborales, pero la mayoría de las visas de inmigrante se otorgan a parientes inmediatos y […]',
    images: [
      {
        url: '../../../../wp-content/uploads/2024/04/charlotte-immigrant-visa-application-attorneys-1.jpg',
      },
    ],
  },
};

export const runtime = 'nodejs';

export default function ProcesoDeVisaPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'proceso-de-visa',
    title: 'Abogados de visas de inmigrantes en Raleigh, NC',
    slug: 'proceso-de-visa',
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
