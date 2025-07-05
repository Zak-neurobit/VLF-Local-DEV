import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// This would normally fetch from a CMS or database
async function getBlogPost(slug: string) {
  // Simulated blog post data
  const posts: Record<string, {
    title: string;
    content: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
  }> = {
    'cambios-leyes-inmigracion-2025': {
      title: 'Cambios Recientes en las Leyes de Inmigración 2025',
      content: 'Contenido completo del artículo aquí...',
      excerpt: 'Conozca los últimos cambios en las políticas de inmigración y cómo pueden afectar su caso.',
      category: 'Inmigración',
      author: 'William Vasquez',
      date: '2025-01-15',
      readTime: '5 min'
    }
  };
  
  return posts[slug] || null;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Artículo no encontrado',
    };
  }
  
  return {
    title: `${post.title} | Bufete de Abogados Vasquez`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <article className="max-w-4xl mx-auto">
      <Link
        href="/es/blog"
        className="inline-flex items-center text-[#6B1F2E] font-semibold hover:text-[#8B2635] mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al Blog
      </Link>
      
      <header className="mb-8">
        <div className="text-[#C9974D] font-semibold mb-2">{post.category}</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        <div className="flex items-center justify-between text-sm text-gray-500 pb-4 border-b">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
            </div>
            <span>{post.readTime} de lectura</span>
          </div>
          
          <button className="flex items-center gap-1 hover:text-[#6B1F2E] transition-colors">
            <Share2 className="h-4 w-4" />
            <span>Compartir</span>
          </button>
        </div>
      </header>
      
      <div className="prose prose-lg max-w-none">
        <p className="lead text-xl text-gray-600 mb-6">{post.excerpt}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      
      {/* CTA Section */}
      <div className="mt-12 p-8 bg-gray-100 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">¿Necesita Ayuda Legal?</h3>
        <p className="text-gray-600 mb-6">
          Nuestros abogados expertos están listos para ayudarle. Programe una consulta gratuita hoy.
        </p>
        <Link
          href="/es/contacto"
          className="bg-[#C9974D] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B88740] transition-colors inline-block"
        >
          Agendar Consulta Gratuita
        </Link>
      </div>
    </article>
  );
}
