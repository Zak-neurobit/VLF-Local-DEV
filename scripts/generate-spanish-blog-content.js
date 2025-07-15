const fs = require('fs').promises;
const path = require('path');

// Translation mappings for blog categories and common terms
const translations = {
  categories: {
    immigration: 'inmigración',
    'personal-injury': 'lesiones-personales',
    'workers-compensation': 'compensación-laboral',
    'criminal-defense': 'defensa-criminal',
    'family-law': 'derecho-familiar',
    'traffic-violations': 'infracciones-tráfico',
  },
  common: {
    By: 'Por',
    'Published on': 'Publicado el',
    'Read More': 'Leer Más',
    Share: 'Compartir',
    Category: 'Categoría',
    Tags: 'Etiquetas',
    'Related Posts': 'Artículos Relacionados',
    Previous: 'Anterior',
    Next: 'Siguiente',
    Comments: 'Comentarios',
    'Leave a Comment': 'Dejar un Comentario',
    'Your Name': 'Su Nombre',
    'Your Email': 'Su Correo',
    'Your Comment': 'Su Comentario',
    Submit: 'Enviar',
  },
};

// Template for Spanish blog layout
const spanishBlogLayoutTemplate = `import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Blog Legal | Bufete de Abogados Vasquez',
  description: 'Últimas noticias legales, actualizaciones y consejos de nuestros abogados expertos en inmigración, lesiones personales y más.',
};

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Blog Legal</h1>
          <p className="text-lg text-gray-600">
            Mantente informado con las últimas noticias legales y actualizaciones
          </p>
        </header>
        {children}
      </div>
    </div>
  );
}
`;

// Template for Spanish blog index page
const spanishBlogIndexTemplate = `import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog Legal | Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description: 'Artículos legales, noticias y actualizaciones sobre inmigración, lesiones personales, compensación laboral y más.',
};

// This would normally come from a CMS or database
const blogPosts = [
  {
    id: 1,
    title: 'Cambios Recientes en las Leyes de Inmigración 2025',
    excerpt: 'Conozca los últimos cambios en las políticas de inmigración y cómo pueden afectar su caso.',
    category: 'Inmigración',
    author: 'William Vasquez',
    date: '2025-01-15',
    slug: 'cambios-leyes-inmigracion-2025',
    image: '/images/blog/immigration-changes.jpg'
  },
  {
    id: 2,
    title: 'Qué Hacer Después de un Accidente de Auto',
    excerpt: 'Pasos importantes a seguir inmediatamente después de verse involucrado en un accidente vehicular.',
    category: 'Lesiones Personales',
    author: 'Adrianna Ingram',
    date: '2025-01-10',
    slug: 'que-hacer-despues-accidente-auto',
    image: '/images/blog/car-accident-steps.jpg'
  },
  {
    id: 3,
    title: 'Derechos de los Trabajadores Lesionados en Carolina del Norte',
    excerpt: 'Comprenda sus derechos y beneficios disponibles si se lesiona en el trabajo.',
    category: 'Compensación Laboral',
    author: 'Mark Kelsey',
    date: '2025-01-05',
    slug: 'derechos-trabajadores-lesionados-nc',
    image: '/images/blog/workers-rights.jpg'
  }
];

const categories = [
  { name: 'Todos', slug: 'todos' },
  { name: 'Inmigración', slug: 'inmigracion' },
  { name: 'Lesiones Personales', slug: 'lesiones-personales' },
  { name: 'Compensación Laboral', slug: 'compensacion-laboral' },
  { name: 'Defensa Criminal', slug: 'defensa-criminal' },
  { name: 'Derecho Familiar', slug: 'derecho-familiar' }
];

export default function BlogPage() {
  return (
    <div className="space-y-8">
      {/* Categorías */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={\`/es/blog/categoria/\${category.slug}\`}
            className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm font-medium text-gray-700 hover:text-[#6B1F2E]"
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Lista de Artículos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gray-200">
              {/* Aquí iría la imagen del blog */}
              <div className="h-full flex items-center justify-center text-gray-400">
                <Calendar className="h-12 w-12" />
              </div>
            </div>
            <div className="p-6">
              <div className="text-sm text-[#C9974D] font-semibold mb-2">
                {post.category}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                <Link href={\`/es/blog/\${post.slug}\`} className="hover:text-[#6B1F2E] transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                </div>
              </div>
              <Link
                href={\`/es/blog/\${post.slug}\`}
                className="mt-4 inline-flex items-center text-[#6B1F2E] font-semibold hover:text-[#8B2635] transition-colors"
              >
                Leer Más
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center gap-2 mt-12">
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors">
          Anterior
        </button>
        <button className="px-4 py-2 bg-[#6B1F2E] text-white rounded-lg">
          1
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors">
          2
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors">
          3
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors">
          Siguiente
        </button>
      </div>
    </div>
  );
}
`;

// Template for Spanish blog category pages
const spanishBlogCategoryTemplate = (
  categorySlug,
  categoryName
) => `import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: \`${categoryName} - Blog Legal | Bufete de Abogados Vasquez\`,
  description: \`Artículos y noticias sobre ${categoryName.toLowerCase()} de nuestros abogados expertos.\`,
};

export default function CategoryPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Categoría: ${categoryName}
        </h1>
        <p className="text-lg text-gray-600">
          Todos los artículos relacionados con ${categoryName.toLowerCase()}
        </p>
      </header>

      {/* Aquí iría la lista de artículos filtrados por categoría */}
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-600">
          Los artículos de esta categoría se mostrarán aquí.
        </p>
        <Link
          href="/es/blog"
          className="mt-4 inline-flex items-center text-[#6B1F2E] font-semibold hover:text-[#8B2635] transition-colors"
        >
          Ver todos los artículos
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
`;

async function generateSpanishBlogPages() {
  const blogDir = path.join(process.cwd(), 'src/app/es/blog');

  try {
    // Create blog directory
    await fs.mkdir(blogDir, { recursive: true });
    console.log('✅ Created /es/blog directory');

    // Create blog layout
    await fs.writeFile(path.join(blogDir, 'layout.tsx'), spanishBlogLayoutTemplate);
    console.log('✅ Created blog layout');

    // Create blog index page
    await fs.writeFile(path.join(blogDir, 'page.tsx'), spanishBlogIndexTemplate);
    console.log('✅ Created blog index page');

    // Create category directory and pages
    const categoryDir = path.join(blogDir, 'categoria');
    await fs.mkdir(categoryDir, { recursive: true });

    const categories = [
      { slug: 'inmigracion', name: 'Inmigración' },
      { slug: 'lesiones-personales', name: 'Lesiones Personales' },
      { slug: 'compensacion-laboral', name: 'Compensación Laboral' },
      { slug: 'defensa-criminal', name: 'Defensa Criminal' },
      { slug: 'derecho-familiar', name: 'Derecho Familiar' },
      { slug: 'infracciones-trafico', name: 'Infracciones de Tráfico' },
    ];

    for (const category of categories) {
      const catDir = path.join(categoryDir, category.slug);
      await fs.mkdir(catDir, { recursive: true });

      await fs.writeFile(
        path.join(catDir, 'page.tsx'),
        spanishBlogCategoryTemplate(category.slug, category.name)
      );
      console.log(`✅ Created category page: ${category.slug}`);
    }

    // Create [slug] directory for individual blog posts
    const slugDir = path.join(blogDir, '[slug]');
    await fs.mkdir(slugDir, { recursive: true });

    // Create dynamic blog post template
    const blogPostTemplate = `import { Metadata } from 'next';
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
  const posts = {
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
    title: \`\${post.title} | Bufete de Abogados Vasquez\`,
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
`;

    await fs.writeFile(path.join(slugDir, 'page.tsx'), blogPostTemplate);
    console.log('✅ Created dynamic blog post template');

    console.log('\\n✅ Spanish blog structure created successfully!');
  } catch (error) {
    console.error('❌ Error creating Spanish blog pages:', error);
  }
}

// Run the script
generateSpanishBlogPages().catch(console.error);
