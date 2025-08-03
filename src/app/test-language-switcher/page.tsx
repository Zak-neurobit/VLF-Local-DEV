'use client';

import { usePathname } from 'next/navigation';
import MainNav from '@/components/Navigation/MainNav';
import { LanguageSwitcher } from '@/components/Navigation/LanguageSwitcher';

export default function TestLanguageSwitcher() {
  const pathname = usePathname();
  const currentLang = pathname?.startsWith('/es') ? 'es' : 'en';

  return (
    <div>
      <MainNav />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Página de Prueba del Selector de Idioma</h1>

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Estado Actual:</h2>
          <ul className="space-y-2">
            <li>
              <strong>Ruta Actual:</strong> {pathname}
            </li>
            <li>
              <strong>Idioma Detectado:</strong> {currentLang}
            </li>
          </ul>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Variante Toggle:</h3>
            <LanguageSwitcher variant="toggle" showFlags={true} showLabels={true} />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Variante Dropdown:</h3>
            <LanguageSwitcher variant="dropdown" showFlags={true} showLabels={true} />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Variante Mínima:</h3>
            <LanguageSwitcher variant="minimal" showFlags={false} showLabels={true} />
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Enlaces de Prueba:</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="text-blue-600 hover:underline">
                Página Principal en Inglés
              </a>
            </li>
            <li>
              <a href="/es" className="text-blue-600 hover:underline">
                Página Principal en Español
              </a>
            </li>
            <li>
              <a href="/blog" className="text-blue-600 hover:underline">
                Blog en Inglés
              </a>
            </li>
            <li>
              <a href="/es/blog" className="text-blue-600 hover:underline">
                Blog en Español
              </a>
            </li>
            <li>
              <a href="/contact" className="text-blue-600 hover:underline">
                Contact en Inglés
              </a>
            </li>
            <li>
              <a href="/es/contacto" className="text-blue-600 hover:underline">
                Contact en Español
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
