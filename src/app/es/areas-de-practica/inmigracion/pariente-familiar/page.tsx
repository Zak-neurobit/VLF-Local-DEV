import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Abogados de inmigración familiar en Raleigh, NC - Vasquez Law Firm, PLLC',
  description:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
  openGraph: {
    title: 'Abogados de inmigración familiar en Raleigh, NC - Vasquez Law Firm, PLLC',
    description:
      'Abogados de visas familiares en los condados de Wake y Johnston, Carolina del Norte En Vasquez Law Firm, PLLC, nuestros abogados brindan asistencia a personas y familias en toda la región con sus preocupaciones de inmigración más complicadas. Las leyes federales que se aplican a la inmigración basada en la familia pueden ser complejas y confusas, y puede ser un desafío comprender y cumplir con los requisitos de la ley. Por eso es tan importante trabajar en estrecha colaboración con un abogado de inmigración familiar calificado mientras busca ofrecer una vida mejor y nuevas oportunidades a sus seres queridos. Tenemos la experiencia, el conocimiento y los recursos para ayudarlo a obtener las visas necesarias para los miembros de su familia en una variedad de circunstancias o situaciones. Los abogados calificados de nuestra firma tienen más de 35 años de experiencia combinada en el manejo de asuntos de inmigración relacionados con la familia. Sabemos anticiparnos y abordar los problemas potenciales con anticipación para que no se conviertan en obstáculos serios. Nuestro equipo está dedicado a ayudarlo a asegurar un resultado favorable para su familiar, sin importar los desafíos que puedan surgir. Asesor de inmigración para familias en Carolina del Norte El […]',
    images: [
      {
        url: '../../../../wp-content/uploads/2024/04/wake-county-family-based-immigration-lawyers-1.jpg',
      },
    ],
  },
};


export default function ParienteFamiliarPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'pariente-familiar',
    title: 'Abogados de inmigración familiar en Raleigh, NC',
    slug: 'pariente-familiar',
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
