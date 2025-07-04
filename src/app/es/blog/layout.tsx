import { Metadata } from 'next';
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
