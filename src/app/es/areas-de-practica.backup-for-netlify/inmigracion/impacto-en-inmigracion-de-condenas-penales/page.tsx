import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';
export const metadata: Metadata = {
  title: 'Abogados de Inmigración con Condenas Penales en Raleigh, NC - Vasquez Law Firm, PLLC',
  description:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
  openGraph: {
    title: 'Abogados de Inmigración con Condenas Penales en Raleigh, NC - Vasquez Law Firm, PLLC',
    description:
      'Abogados en Charlotte y Smithfield para Inmigrantes que Enfrentan Cargos Criminales Las leyes que se refieren a asuntos de inmigración en los Estados Unidos son increíblemente complejas. Los ciudadanos extranjeros que vienen de otros países a los EE. UU. a menudo desconocen cómo varios factores podrían afectar su capacidad para permanecer en los Estados Unidos legalmente. Estos mismos factores podrían incluso afectar su estado migratorio en general. Para muchos inmigrantes potenciales, un problema común es ser acusado o condenado por un delito. Aquellos que se encuentran aquí legalmente, así como los inmigrantes indocumentados, con frecuencia no consideran que ser condenados por muchos tipos de cargos criminales podría hacer que los funcionarios de inmigración inicien procedimientos de expulsión y deportación. En Vasquez Law Firm, PLLC, nuestros abogados expertos tienen una vasta experiencia tanto en asuntos de inmigración como en defensa criminal. Con más de 35 años de experiencia legal combinada, tenemos el conocimiento, las habilidades y los recursos para ayudar a los no ciudadanos en toda la región a proteger sus mejores intereses, sus derechos y su estatus migratorio en los Estados Unidos. Cómo el procesamiento penal podría afectar el estado migratorio Como ciudadano no estadounidense, si lo declaran culpable de […]',
    images: [
      {
        url: '../../../../wp-content/uploads/2024/04/meckelenburg-county-criminal-convictions-for-immigrants-lawyers-1.jpg',
      },
    ],
  },
};

export default function ImpactoEnInmigracionDeCondenasPenalesPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'impacto-en-inmigracion-de-condenas-penales',
    title: 'Abogados de Inmigración con Condenas Penales en Raleigh, NC',
    slug: 'impacto-en-inmigracion-de-condenas-penales',
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
