import { Metadata } from 'next';

import Link from 'next/link';
import { generateLocalBusinessSchema } from '@/lib/seo/local-seo-generator';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Abogado en Charlotte, NC | Bufete de Abogados Vasquez',
  description:
    'Bufete de abogados en Charlotte, NC especializado en inmigración, lesiones personales, defensa criminal y derecho familiar. Consulta gratuita en español.',
  keywords:
    'abogado Charlotte, bufete abogados Charlotte NC, inmigración Charlotte, lesiones personales Charlotte, defensa criminal Charlotte',
  openGraph: {
    title: 'Abogado en Charlotte, NC | Bufete de Abogados Vasquez',
    description:
      'Servicios legales profesionales en Charlotte, NC. Hablamos español. Consulta gratuita.',
    url: 'https://vasquezlawfirm.com/es/ubicaciones/charlotte',
    siteName: 'Bufete de Abogados Vasquez',
    locale: 'es_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://vasquezlawfirm.com/es/ubicaciones/charlotte',
    languages: {
      'en-US': 'https://vasquezlawfirm.com/locations/charlotte-nc',
      'es-US': 'https://vasquezlawfirm.com/es/ubicaciones/charlotte',
    },
  },
};

const charlotteOfficeSchema = generateLocalBusinessSchema('charlotte');

export default function CharlottePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(charlotteOfficeSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Abogado en Charlotte, NC</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Servicios legales profesionales en el corazón de Carolina del Norte. Defendemos sus
                derechos con experiencia y dedicación.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/es/contacto"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Consulta Gratuita
                </Link>
                <Link
                  href="tel:+17045550123"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  (704) 555-0123
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Office Information */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Nuestra Oficina en Charlotte
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-blue-600 mt-1">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 font-medium">Dirección:</p>
                      <p className="text-gray-600">
                        123 South Tryon Street
                        <br />
                        Charlotte, NC 28202
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-blue-600 mt-1">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 font-medium">Teléfono:</p>
                      <p className="text-gray-600">(704) 555-0123</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-blue-600 mt-1">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 font-medium">Horario:</p>
                      <p className="text-gray-600">
                        Lunes - Viernes: 9:00 AM - 6:00 PM
                        <br />
                        Sábados: 9:00 AM - 2:00 PM
                        <br />
                        Emergencias: 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contacto de Emergencia</h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Para asuntos urgentes fuera del horario de oficina:
                  </p>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-red-800 font-semibold">
                      Línea de Emergencia: (704) 555-0124
                    </p>
                    <p className="text-red-600 text-sm mt-1">
                      Disponible 24 horas para casos de inmigración, arrestos y lesiones graves
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Areas */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Áreas de Práctica en Charlotte
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ofrecemos servicios legales especializados para la comunidad hispana en Charlotte y
                sus alrededores.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Immigration */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Inmigración</h3>
                <p className="text-gray-600 mb-4">
                  Residencia permanente, ciudadanía, visas familiares, DACA, y defensa contra
                  deportación.
                </p>
                <Link
                  href="/es/ubicaciones/charlotte/inmigracion"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Más información →
                </Link>
              </div>

              {/* Personal Injury */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Lesiones Personales</h3>
                <p className="text-gray-600 mb-4">
                  Accidentes automovilísticos, lesiones en el trabajo, negligencia médica y más.
                </p>
                <Link
                  href="/es/ubicaciones/charlotte/lesiones-personales"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Más información →
                </Link>
              </div>

              {/* Criminal Defense */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 8a6 6 0 01-7.743 5.743L10 14l-.257-.257A6 6 0 0118 8zM2 8a6 6 0 0112 0 6 6 0 01-12 0zm8-4a4 4 0 100 8 4 4 0 000-8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Defensa Criminal</h3>
                <p className="text-gray-600 mb-4">
                  DUI/DWI, delitos menores y graves, violaciones de tráfico, y más.
                </p>
                <Link
                  href="/es/ubicaciones/charlotte/defensa-criminal"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Más información →
                </Link>
              </div>

              {/* Family Law */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Derecho Familiar</h3>
                <p className="text-gray-600 mb-4">
                  Divorcio, custodia de menores, pensión alimenticia, y adopción.
                </p>
                <Link
                  href="/es/ubicaciones/charlotte/derecho-familiar"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Más información →
                </Link>
              </div>

              {/* Workers' Compensation */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Compensación Laboral</h3>
                <p className="text-gray-600 mb-4">
                  Lesiones en el trabajo, beneficios negados, y reclamaciones laborales.
                </p>
                <Link
                  href="/es/ubicaciones/charlotte/compensacion-laboral"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Más información →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Local Information */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Conocimiento Local de Charlotte
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Tribunales Locales</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Tribunal Superior del Condado de Mecklenburg</li>
                      <li>• Tribunal de Distrito del Condado de Mecklenburg</li>
                      <li>• Tribunal Federal del Distrito Occidental de Carolina del Norte</li>
                      <li>• Tribunal de Inmigración de Charlotte</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Comunidades que Servimos
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Centro de Charlotte (Uptown)</li>
                      <li>• South End y Dilworth</li>
                      <li>• NoDa y Plaza Midwood</li>
                      <li>• Ballantyne y SouthPark</li>
                      <li>• Universidad de Carolina del Norte en Charlotte</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Testimonios de Clientes</h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <p className="text-gray-600 mb-4">
                      "El equipo del Bufete Vasquez me ayudó con mi caso de inmigración de manera
                      profesional y en español. Obtuve mi residencia permanente gracias a su
                      experiencia."
                    </p>
                    <p className="font-semibold text-gray-900">- María G., Charlotte</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow">
                    <p className="text-gray-600 mb-4">
                      "Después de mi accidente automovilístico en I-77, recibí la compensación que
                      merecía. Recomiendo sus servicios a toda la comunidad latina."
                    </p>
                    <p className="font-semibold text-gray-900">- Carlos R., Concord</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Consulta Gratuita en Charlotte
              </h2>
              <p className="text-xl text-gray-600">
                Contáctenos hoy para discutir su caso legal. Hablamos español.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </div>
    </>
  );
}
