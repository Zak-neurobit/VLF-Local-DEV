import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Abogados de Inmigración de Asilo en Charlotte, NC - Vasquez Law Firm, PLLC',
  description:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
  openGraph: {
    title: 'Abogados de Inmigración de Asilo en Charlotte, NC - Vasquez Law Firm, PLLC',
    description:
      'Abogados para Refugiados y Asilados en Raleigh y Smithfield, NC Durante más de 200 años, Estados Unidos ha ofrecido seguridad y protección a personas y familias oprimidas de todo el mundo. De hecho, la libertad de la opresión fue uno de los ideales sobre los que se fundó nuestra nación. Aquellos que enfrentan persecución política, religiosa, personal y de otro tipo en sus países de origen, comúnmente buscan un refugio seguro en Estados Unidos. Con esto en mente, las leyes de inmigración estadounidenses permiten que esas personas soliciten asilo, que a menudo es el primer paso hacia la residencia permanente legal y la eventual ciudadanía. Los abogados de inmigración con experiencia en Vasquez Law Firm, PLLC comprenden completamente las complejidades que pueden surgir en los casos relacionados con el asilo. También sabemos lo que se necesita para obtener resultados favorables. Con más de 35 años de experiencia combinada en leyes de inmigración, nuestros abogados tienen el conocimiento, los recursos y las herramientas para ayudarlo a usted y a sus seres queridos a encontrar la seguridad que busca aquí en los Estados Unidos. ¿Qué es el Asilo? De acuerdo con las leyes de inmigración de los Estados Unidos, una persona que […]',
    images: [
      {
        url: '../../../../wp-content/uploads/2024/04/north-carolina-asylum-and-refugees-attorneys-1.jpg',
      },
    ],
  },
};

export const runtime = 'nodejs';

export default function AsiloPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'asilo',
    title: 'Abogados de Inmigración de Asilo en Charlotte, NC',
    slug: 'asilo',
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
