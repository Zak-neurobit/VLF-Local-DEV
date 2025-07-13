import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogados de Denegación de Visas de Inmigración en Raleigh - Vasquez Law Firm, PLLC',
  description:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
  openGraph: {
    title: 'Abogados de Denegación de Visas de Inmigración en Raleigh - Vasquez Law Firm, PLLC',
    description:
      'Abogados para apelar la denegación de visas de inmigrante en el condado de Wake, NC La denegación de una solicitud de visa de inmigrante puede ser devastadora para los planes que usted y su familia han hecho para el futuro. Puede ser abrumador y confuso, y es posible que sienta que no hay nada que pueda hacer para solucionar la situación. La buena noticia es que una solicitud de visa denegada no es necesariamente el final del camino para sus planes. En Vasquez Law Firm, PLLC, nuestros abogados de inmigración calificados están equipados para ayudarlo a tomar medidas después de una denegación de visa, ya sea que la visa fuera para usted o un miembro de su familia. Podemos ayudarlo si ya se encuentra en los Estados Unidos o si aún se encuentra en el extranjero. Con más de 35 años de experiencia combinada en leyes de inmigración, tenemos los antecedentes, los recursos y las herramientas para brindarle la mejor oportunidad de éxito al apelar la denegación de su visa. Abogados de Inmigración del Condado de Johnston para Reconsideración de Visas En la gran mayoría de los casos, la denegación de una solicitud de visa debe apelarse dentro de los […]',
    images: [
      {
        url: '../../../../wp-content/uploads/2024/04/charlotte-visa-denial-appeals-attorneys-1.jpg',
      }

export const runtime = 'nodejs';

export default function AyudaApelacionesDenegacionDeVisaPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'ayuda-apelaciones-denegacion-de-visa',
    title: 'Abogados de Denegación de Visas de Inmigración en Raleigh',
    slug: 'ayuda-apelaciones-denegacion-de-visa',
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
