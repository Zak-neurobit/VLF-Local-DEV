import { Metadata } from 'next';
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
            href={`/es/blog/categoria/${category.slug}`}
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
                <Link href={`/es/blog/${post.slug}`} className="hover:text-[#6B1F2E] transition-colors">
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
                href={`/es/blog/${post.slug}`}
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
