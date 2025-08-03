import { Metadata } from 'next';

import Link from 'next/link';
import { generateLocalBusinessSchema } from '@/lib/seo/local-seo-generator';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Abogado en Smithfield, NC | Bufete de Abogados Vasquez',
  description:
    'Bufete de abogados en Smithfield, NC especializado en inmigración, lesiones personales, defensa criminal y derecho familiar. Consulta gratuita en español.',
  keywords:
    'abogado Smithfield, bufete abogados Smithfield NC, inmigración Smithfield, lesiones personales Smithfield, defensa criminal Smithfield',
  openGraph: {
    title: 'Abogado en Smithfield, NC | Bufete de Abogados Vasquez',
    description:
      'Servicios legales profesionales en el condado de Johnston. Hablamos español. Consulta gratuita.',
    url: 'https://vasquezlawfirm.com/es/ubicaciones/smithfield',
    siteName: 'Bufete de Abogados Vasquez',
    locale: 'es_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://vasquezlawfirm.com/es/ubicaciones/smithfield',
    languages: {
      'en-US': 'https://vasquezlawfirm.com/locations/smithfield-nc',
      'es-US': 'https://vasquezlawfirm.com/es/ubicaciones/smithfield',
    },
  },
};

const smithfieldOfficeSchema = generateLocalBusinessSchema('smithfield');

export default function SmithfieldPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(smithfieldOfficeSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-900 to-teal-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Abogado en Smithfield, NC</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Servicios legales personalizados en el condado de Johnston. Cerca de casa, cerca de
                su corazón.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/es/contacto"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Consulta Gratuita
                </Link>
                <Link
                  href="tel:+19195550125"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-teal-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  (919) 555-0125
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
                  Nuestra Oficina en Smithfield
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-teal-600 mt-1">
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
                        115 South Third Street
                        <br />
                        Smithfield, NC 27577
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-teal-600 mt-1">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 font-medium">Teléfono:</p>
                      <p className="text-gray-600">(919) 555-0125</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-teal-600 mt-1">
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
                        Lunes - Viernes: 9:00 AM - 5:00 PM
                        <br />
                        Sábados: Por cita
                        <br />
                        Emergencias: 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ventajas de Smithfield</h3>
                <div className="space-y-4">
                  <p className="text-gray-600">Como oficina local en el condado de Johnston:</p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Atención personalizada y familiar</li>
                    <li>• Conocimiento profundo de la comunidad local</li>
                    <li>• Acceso fácil desde Clayton, Selma y Four Oaks</li>
                    <li>• Tarifas accesibles para familias trabajadoras</li>
                  </ul>
                  <div className="bg-teal-50 p-4 rounded-lg mt-4">
                    <p className="text-teal-800 font-semibold">
                      Línea de Emergencia: (919) 555-0126
                    </p>
                    <p className="text-teal-600 text-sm mt-1">
                      Disponible 24 horas para casos urgentes
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
                Áreas de Práctica en Smithfield
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Servimos a las familias trabajadoras del condado de Johnston con dedicación y
                comprensión.
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
                  Ayudamos a familias inmigrantes en áreas rurales con casos de inmigración.
                </p>
                <Link
                  href="/es/ubicaciones/smithfield/inmigracion"
                  className="text-teal-600 hover:text-teal-800 font-semibold"
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
                  Accidentes en US-70, I-95, y lesiones agrícolas e industriales.
                </p>
                <Link
                  href="/es/ubicaciones/smithfield/lesiones-personales"
                  className="text-teal-600 hover:text-teal-800 font-semibold"
                >
                  Más información →
                </Link>
              </div>

              {/* Criminal Defense */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 8a6 6 0 01-7.743 5.743L10 14l-.257-.257A6 6 0 0118 8zM2 8a6 6 0 0112 0 6 6 0 01-12 0zm8-4a4 4 0 100 8 4 4 0 000-8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Defensa Criminal</h3>
                <p className="text-gray-600 mb-4">
                  Representación en tribunales del condado de Johnston.
                </p>
                <Link
                  href="/es/ubicaciones/smithfield/defensa-criminal"
                  className="text-teal-600 hover:text-teal-800 font-semibold"
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
                  Casos de familia con valores tradicionales y respeto cultural.
                </p>
                <Link
                  href="/es/ubicaciones/smithfield/derecho-familiar"
                  className="text-teal-600 hover:text-teal-800 font-semibold"
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
                  Lesiones en granjas, plantas procesadoras y fábricas locales.
                </p>
                <Link
                  href="/es/ubicaciones/smithfield/compensacion-laboral"
                  className="text-teal-600 hover:text-teal-800 font-semibold"
                >
                  Más información →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Smithfield Specific Information */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Conocimiento Local de Smithfield
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Tribunales del Condado de Johnston
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Tribunal Superior del Condado de Johnston</li>
                      <li>• Tribunal de Distrito del Condado de Johnston</li>
                      <li>• Oficina del Sheriff del Condado de Johnston</li>
                      <li>• Centros de Detención Locales</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Comunidades que Servimos
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Clayton y Archer Lodge</li>
                      <li>• Selma y Micro</li>
                      <li>• Four Oaks y Benson</li>
                      <li>• Pine Level y Wilson's Mills</li>
                      <li>• Kenly y Princeton</li>
                      <li>• Áreas rurales del condado</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Testimonios de Clientes</h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <p className="text-gray-600 mb-4">
                      "Vivo en Clayton y necesitaba ayuda con mi caso de inmigración. La oficina en
                      Smithfield me quedó perfecta y me trataron como familia."
                    </p>
                    <p className="font-semibold text-gray-900">- Rosa L., Clayton</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow">
                    <p className="text-gray-600 mb-4">
                      "Después de mi accidente en US-70, obtuve compensación completa. Entienden las
                      necesidades de las familias trabajadoras."
                    </p>
                    <p className="font-semibold text-gray-900">- Manuel R., Selma</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow">
                    <p className="text-gray-600 mb-4">
                      "Como trabajador agrícola, obtuve todos mis beneficios cuando me lesioné.
                      Conocen bien la industria local."
                    </p>
                    <p className="font-semibold text-gray-900">- Pedro M., Four Oaks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Focus */}
        <section className="py-16 bg-teal-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Comprometidos con el Condado de Johnston</h2>
              <p className="text-xl max-w-3xl mx-auto">
                Como parte de la comunidad local, entendemos los desafíos únicos de las familias
                trabajadoras rurales.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌾</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Industria Agrícola</h3>
                <p>
                  Conocemos las necesidades legales de trabajadores agrícolas y propietarios de
                  granjas.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏡</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Valores Familiares</h3>
                <p>Respetamos las tradiciones familiares y valores comunitarios en cada caso.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Tarifas Accesibles</h3>
                <p>Ofrecemos tarifas justas y planes de pago para familias trabajadoras.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Consulta Gratuita en Smithfield
              </h2>
              <p className="text-xl text-gray-600">
                Contáctenos para discutir su caso legal. Estamos aquí para servirle.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </div>
    </>
  );
}
