import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Abogados de Ciudadanía y Naturalización de Raleigh, NC - Vasquez Law Firm, PLLC',
  description:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
  openGraph: {
    title: 'Abogados de Ciudadanía y Naturalización de Raleigh, NC - Vasquez Law Firm, PLLC',
    description:
      'Abogados en Charlotte y Smithfield para Personas que Buscan Convertirse en Ciudadanos Estadounidenses De acuerdo con las leyes de los Estados Unidos, hay dos formas básicas de convertirse en ciudadano estadounidense legal. La primera forma, y la más común, es a través de tus padres. Los padres biológicos y legales de ciudadanos estadounidenses reciben la ciudadanía. Los hijos de ciudadanos extranjeros que obtienen la ciudadanía antes de que los hijos cumplan los 18 años también reciben la ciudadanía estadounidense en la mayoría de los casos. La otra forma de convertirse en ciudadano es a través de un proceso conocido como naturalización. El proceso de naturalización le permite a un ciudadano extranjero obtener la ciudadanía legal, así como las responsabilidades, derechos y protecciones que conlleva ser ciudadano estadounidense. En Vasquez Law Firm, PLLC, nuestros abogados de inmigración expertos ayudan a los clientes de toda la región con las solicitudes de naturalización. Tenemos más de 35 años de experiencia en la práctica de la ley de inmigración y conocemos bien los detalles para convertirse en ciudadanos legales. Nuestros abogados trabajarán en estrecha colaboración con usted para que comprenda completamente los requisitos de naturalización y lo ayudaremos a completar el proceso lo más […]',
    images: [
      {
        url: '../../../../wp-content/uploads/2024/04/charlotte-nc-citizenship-through-naturalization-lawyers-1.jpg',
      },
    ],
  },
};


export default function CiudadaniaPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'ciudadania',
    title: 'Abogados de Ciudadanía y Naturalización de Raleigh, NC',
    slug: 'ciudadania',
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
