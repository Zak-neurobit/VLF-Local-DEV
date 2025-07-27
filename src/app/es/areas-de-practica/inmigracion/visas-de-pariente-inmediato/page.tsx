import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'Abogados de inmigración de Raleigh para visas de familiares inmediatas - Vasquez Law Firm, PLLC',
  description:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
  openGraph: {
    title:
      'Abogados de inmigración de Raleigh para visas de familiares inmediatas - Vasquez Law Firm, PLLC',
    description:
      'Abogados que ayudan a ciudadanos estadounidenses a reunir a sus familias a través de la inmigración en Charlotte y Smithfield, NC Según las leyes de inmigración actuales de los Estados Unidos, existen varios métodos disponibles para los ciudadanos estadounidenses para traer a familiares que viven en el extranjero a los Estados Unidos legalmente. El método correcto para su situación dependerá de los familiares que desee traer a los Estados Unidos, entre otros factores. En Vasquez Law Firm, PLLC, nuestros abogados compasivos manejan una amplia gama de asuntos de inmigración basados en la familia. Con más de 35 años de experiencia, entendemos que el proceso de obtención de las visas y otras credenciales necesarias puede ser complicado y llevar mucho tiempo. Sin embargo, también reconocemos los beneficios que disfrutan las familias cuando pueden estar juntas legalmente en los Estados Unidos. Si está buscando obtener cualquier tipo de visa familiar para sus seres queridos, nuestro equipo está listo y dispuesto a brindarle la orientación y representación que necesita. ¿Quienes son los parientes inmediatos? El término “parientes inmediatos” tiene un significado muy específico según las leyes de inmigración de EE. UU. Se refiere al cónyuge e hijos solteros menores de 21 años de […]',
    images: [
      {
        url: '../../../../wp-content/uploads/2024/04/north-carolina-immediate-relative-immigration-attorneys-1.jpg',
      },
    ],
  },
};

export default function VisasDeParienteInmediatoPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'visas-de-pariente-inmediato',
    title: 'Abogados de inmigración de Raleigh para visas de familiares inmediatas',
    slug: 'visas-de-pariente-inmediato',
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
