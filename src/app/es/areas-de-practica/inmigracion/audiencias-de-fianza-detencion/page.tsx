import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Abogados de Audiencia de Fianza por Detención en Raleigh, NC - Vasquez Law Firm, PLLC',
  description:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
  openGraph: {
    title: 'Abogados de Audiencia de Fianza por Detención en Raleigh, NC - Vasquez Law Firm, PLLC',
    description:
      'Abogados para Inmigrantes Colocados en Retenciones de ICE en Carolina del Norte ¿Alguien que ama ha sido detenido por el Departamento de Seguridad Nacional o el Servicio de Inmigración y Control de Aduanas de los Estados Unidos (ICE)? Si es así, es probable que lo coloquen en un centro de detención que sea, para todos los efectos, una cárcel antes y durante los procedimientos para su deportación de los Estados Unidos. El proceso de deportación puede llevar muchos meses o incluso años, por lo que es importante que se comunique con un abogado especializado en fianzas de inmigración tan pronto como su ser querido haya sido detenido. En Vasquez Law Firm, PLLC, nuestros compasivos abogados de fianzas de inmigración saben por lo que está pasando cuando un miembro de su familia está bajo la custodia del gobierno por asuntos de inmigración. Entendemos que tal situación puede ser caótica y confusa, y haremos todo lo posible para sacar a su ser querido de la cárcel lo más rápido posible. Con más de 35 años de experiencia legal combinada, estamos equipados para ayudarlo a usted y a su familia durante un momento difícil. ¿Qué es una Fianza de Inmigración? Cuando un ciudadano […]',
    images: [
      {
        url: '../../../../wp-content/uploads/2024/04/johnston-detention-bond-hearing-attorneys-1.jpg',
      },
    ],
  },
};

export default function AudienciasDeFianzaDetencionPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'audiencias-de-fianza-detencion',
    title: 'Abogados de Audiencia de Fianza por Detención en Raleigh, NC',
    slug: 'audiencias-de-fianza-detencion',
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
