import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Abogados de Perdones de Inadmisibilidad en Raleigh, NC - Vasquez Law Firm, PLLC',
  description:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
  openGraph: {
    title: 'Abogados de Perdones de Inadmisibilidad en Raleigh, NC - Vasquez Law Firm, PLLC',
    description:
      'Abogados en Smithfield y Charlotte que Ayudan a Inmigrantes no Elegibles e Inadmisibles Hay muchas razones por las que un ciudadano extranjero puede resultar inadmisible o inelegible para una visa para ingresar legalmente a los Estados Unidos. Incluso es posible que un ciudadano extranjero sea considerado inadmisible incluso si ya está aquí en los Estados Unidos. Sin embargo, es posible que existan opciones disponibles que permitan a los inmigrantes no elegibles o inadmisibles obtener un perdon para ingresar o permanecer en los EE. UU. En Vasquez Law Firm, PLLC, nuestros abogados están equipados para manejar esta área altamente complicada de la ley de inmigración. Con más de 35 años de experiencia legal combinada, sabemos que cometer un error en el proceso de perdonpodría tener consecuencias graves, que posiblemente incluyan la deportación. Si usted o un ser querido ha sido considerado inadmisible por los funcionarios de inmigración de los EE. UU., nuestro equipo está listo y dispuesto a brindarle la orientación que necesita. Motivos de Inelegibilidad o Inadmisibilidad El gobierno de los EE. UU. mantiene una serie de estándares para los ciudadanos extranjeros que desean vivir y trabajar en los Estados Unidos. Las personas que no cumplan con esos estándares podrían […]',
    images: [
      {
        url: '../../../../wp-content/uploads/2024/04/smithfield-waivers-of-inadmissibility-lawyers-1.jpg',
      },
    ],
  },
};


export default function InadmisibilidadPerdonesInelegibleParaInmigrarPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'inadmisibilidad-perdones-inelegible-para-inmigrar',
    title: 'Abogados de Perdones de Inadmisibilidad en Raleigh, NC',
    slug: 'inadmisibilidad-perdones-inelegible-para-inmigrar',
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
