import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: `Inmigración - Blog Legal | Bufete de Abogados Vasquez`,
  description: `Artículos y noticias sobre inmigración de nuestros abogados expertos.`,
};

export default function CategoryPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Categoría: Inmigración
        </h1>
        <p className="text-lg text-gray-600">
          Todos los artículos relacionados con inmigración
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
