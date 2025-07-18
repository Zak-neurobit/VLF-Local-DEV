import { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Abogado de Inmigración en Charlotte, NC | Bufete Vasquez',
  description:
    'Abogados de inmigración especializados en Charlotte, NC. Residencia permanente, ciudadanía, DACA, visas familiares y defensa contra deportación. Consulta gratuita.',
  keywords:
    'abogado inmigración Charlotte, residencia permanente Charlotte, ciudadanía Charlotte, DACA Charlotte, visas familiares Charlotte',
  openGraph: {
    title: 'Abogado de Inmigración en Charlotte, NC | Bufete Vasquez',
    description:
      'Especialistas en inmigración en Charlotte, NC. Ayudamos con residencia permanente, ciudadanía, DACA y más. Hablamos español.',
    url: 'https://vasquezlawfirm.com/es/ubicaciones/charlotte/inmigracion',
    siteName: 'Bufete de Abogados Vasquez',
    locale: 'es_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://vasquezlawfirm.com/es/ubicaciones/charlotte/inmigracion',
  },
};

export default function CharlotteImmigrationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Abogado de Inmigración en Charlotte, NC
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Expertos en leyes de inmigración que luchan por sus derechos y el futuro de su familia
              en Estados Unidos.
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

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Servicios de Inmigración en Charlotte
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos una gama completa de servicios de inmigración para ayudarle a navegar el
              complejo sistema legal estadounidense.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Green Cards */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Tarjetas Verdes (Residencia Permanente)
              </h3>
              <p className="text-gray-600 mb-4">
                Ayudamos con peticiones familiares, basadas en empleo, inversión y otras vías para
                obtener la residencia permanente.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Peticiones familiares (I-130)</li>
                <li>• Ajuste de estatus (I-485)</li>
                <li>• Procesamiento consular</li>
                <li>• Casos de EB-1, EB-2, EB-3</li>
              </ul>
            </div>

            {/* Citizenship */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 2v10h12V6H4z"
                    clipRule="evenodd"
                  />
                  <path d="M6 8h8v2H6zM6 10h8v2H6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ciudadanía Estadounidense</h3>
              <p className="text-gray-600 mb-4">
                Le guiamos a través del proceso de naturalización para convertirse en ciudadano
                estadounidense.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Preparación para el examen de ciudadanía</li>
                <li>• Formulario N-400</li>
                <li>• Entrevista de naturalización</li>
                <li>• Casos complejos de ciudadanía</li>
              </ul>
            </div>

            {/* DACA */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">DACA (Acción Diferida)</h3>
              <p className="text-gray-600 mb-4">
                Ayudamos con solicitudes iniciales, renovaciones y casos complejos de DACA.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Solicitudes iniciales de DACA</li>
                <li>• Renovaciones de DACA</li>
                <li>• Documentos de autorización de trabajo</li>
                <li>• Casos de elegibilidad compleja</li>
              </ul>
            </div>

            {/* Family Visas */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visas Familiares</h3>
              <p className="text-gray-600 mb-4">
                Reunimos familias a través de peticiones para cónyuges, hijos, padres y hermanos.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Visas de prometido(a) (K-1)</li>
                <li>• Peticiones para cónyuges</li>
                <li>• Peticiones para hijos</li>
                <li>• Peticiones para padres y hermanos</li>
              </ul>
            </div>

            {/* Removal Defense */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Defensa contra Deportación</h3>
              <p className="text-gray-600 mb-4">
                Defendemos agresivamente contra procedimientos de remoción en el Tribunal de
                Inmigración de Charlotte.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Audiencias de remoción</li>
                <li>• Cancelación de remoción</li>
                <li>• Asilo político</li>
                <li>• Apelaciones ante BIA</li>
              </ul>
            </div>

            {/* Work Visas */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visas de Trabajo</h3>
              <p className="text-gray-600 mb-4">
                Ayudamos a profesionales y trabajadores a obtener autorización para trabajar en
                Estados Unidos.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Visas H-1B para profesionales</li>
                <li>• Visas L-1 para transferencias</li>
                <li>• Certificación laboral PERM</li>
                <li>• Documentos de autorización de trabajo</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Local Charlotte Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Tribunal de Inmigración de Charlotte
              </h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 mb-4">
                  Tenemos amplia experiencia representando clientes en el Tribunal de Inmigración de
                  Charlotte, ubicado en:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <strong>Dirección:</strong> 6130 Tyvola Centre Dr, Charlotte, NC 28217
                  </p>
                  <p>
                    <strong>Jueces:</strong> Conocemos las preferencias y procedimientos de todos
                    los jueces locales
                  </p>
                  <p>
                    <strong>Casos:</strong> Manejamos audiencias maestras, individuales y de fianza
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">
                  Comunidad Hispana en Charlotte
                </h3>
                <p className="text-blue-800">
                  Charlotte tiene una de las poblaciones hispanas de más rápido crecimiento en
                  Carolina del Norte. Entendemos los desafíos únicos que enfrenta nuestra comunidad
                  y estamos aquí para ayudar.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Casos de Éxito en Charlotte</h2>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">Reunificación Familiar</h4>
                  <p className="text-gray-600 text-sm">
                    "Después de 8 años separada de mi esposo, finalmente pude traerlo a Charlotte.
                    El equipo del Bufete Vasquez manejó todo el proceso de visa K-1 perfectamente."
                  </p>
                  <p className="text-blue-600 text-sm mt-2">- Ana M., Charlotte</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">Defensa contra Deportación</h4>
                  <p className="text-gray-600 text-sm">
                    "Estaba en procedimientos de remoción y pensé que perdería todo. Lograron la
                    cancelación de mi deportación y ahora tengo mi tarjeta verde."
                  </p>
                  <p className="text-blue-600 text-sm mt-2">- Roberto L., Concord</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">Ciudadanía</h4>
                  <p className="text-gray-600 text-sm">
                    "Me ayudaron a prepararme para el examen de ciudadanía. Ahora soy ciudadano
                    americano y puedo votar por primera vez."
                  </p>
                  <p className="text-blue-600 text-sm mt-2">- Miguel R., Charlotte</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por Qué Elegir Nuestros Servicios de Inmigración?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Experiencia Local</h3>
              <p className="text-gray-600">
                Más de 15 años de experiencia en el Tribunal de Inmigración de Charlotte y
                conocimiento profundo de las leyes locales.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comunicación en Español</h3>
              <p className="text-gray-600">
                Todo nuestro equipo habla español fluidamente. Entendemos su cultura y sus
                necesidades específicas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Respuesta Rápida</h3>
              <p className="text-gray-600">
                Emergencias de inmigración requieren acción inmediata. Estamos disponibles 24/7 para
                casos urgentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Consulta Gratuita de Inmigración</h2>
            <p className="text-xl">
              Su futuro en Estados Unidos es demasiado importante para dejarlo al azar. Contáctenos
              hoy para una evaluación gratuita de su caso.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-8 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">¿Emergencia de Inmigración?</h3>
            <p className="mb-4">
              Si usted o un ser querido ha sido arrestado por ICE, llame inmediatamente:
            </p>
            <Link
              href="tel:+17045550124"
              className="bg-white text-red-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              (704) 555-0124 - Línea de Emergencia 24/7
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
