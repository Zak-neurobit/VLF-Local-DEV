import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
import Link from 'next/link';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Abogado de Defensa Criminal en Charlotte, NC | Bufete Vasquez',
  description:
    'Abogados de defensa criminal en Charlotte, NC. DUI/DWI, delitos graves, delitos menores. Protegemos sus derechos. Disponible 24/7.',
  keywords:
    'abogado defensa criminal Charlotte, DUI Charlotte, delitos graves Charlotte, abogado criminal Charlotte NC',
  openGraph: {
    title: 'Abogado de Defensa Criminal en Charlotte, NC | Bufete Vasquez',
    description:
      'Defensa criminal agresiva en Charlotte, NC. Protegemos sus derechos constitucionales. Consulta gratuita.',
    url: 'https://vasquezlawfirm.com/es/ubicaciones/charlotte/defensa-criminal',
    siteName: 'Bufete de Abogados Vasquez',
    locale: 'es_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://vasquezlawfirm.com/es/ubicaciones/charlotte/defensa-criminal',
  },
};

export default function CharlotteCriminalDefensePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Defensa Criminal en Charlotte, NC
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Cuando su libertad está en riesgo, necesita un defensor experimentado que luche por
              sus derechos constitucionales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/es/contacto"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Consulta de Emergencia
              </Link>
              <Link
                href="tel:+17045550124"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                (704) 555-0124 - URGENTE
              </Link>
            </div>
            <p className="mt-4 text-lg text-yellow-300">
              <strong>
                Si fue arrestado, llame inmediatamente. Sus primeras decisiones son críticas.
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* Critical Information */}
      <section className="py-12 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">🚨 INFORMACIÓN CRÍTICA SI FUE ARRESTADO 🚨</h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-semibold mb-2">NO HABLE CON LA POLICÍA</h3>
                <p>Ejerce tu derecho a permanecer en silencio hasta que llegue tu abogado.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">PIDA UN ABOGADO</h3>
                <p>Diga claramente: "Quiero un abogado". No responda más preguntas.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">LLAME INMEDIATAMENTE</h3>
                <p>Mientras más rápido actuemos, mejor podemos proteger sus derechos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Cases */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Casos de Defensa Criminal en Charlotte
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Defendemos clientes en todos los tribunales del condado de Mecklenburg y el distrito
              occidental de Carolina del Norte.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* DUI/DWI */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    clipRule="evenodd"
                  />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">DUI/DWI</h3>
              <p className="text-gray-600 mb-4">
                Defensa agresiva contra cargos de conducir bajo la influencia en Charlotte y sus
                alrededores.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Primera ofensa DWI</li>
                <li>• DWI repetidas (multiple offenses)</li>
                <li>• Pruebas de campo de sobriedad</li>
                <li>• Desafío de resultados de breathalyzer</li>
                <li>• Suspensión de licencia</li>
              </ul>
            </div>

            {/* Felonies */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Delitos Graves (Felonías)</h3>
              <p className="text-gray-600 mb-4">
                Representación experta en casos de delitos graves con penas severas de prisión.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Robo y allanamiento</li>
                <li>• Asalto agravado</li>
                <li>• Delitos de drogas</li>
                <li>• Delitos sexuales</li>
                <li>• Delitos de armas de fuego</li>
              </ul>
            </div>

            {/* Misdemeanors */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-.257-.257A6 6 0 0118 8zM2 8a6 6 0 0112 0 6 6 0 01-12 0zm8-4a4 4 0 100 8 4 4 0 000-8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Delitos Menores</h3>
              <p className="text-gray-600 mb-4">
                Defensa de delitos menores que aún pueden tener consecuencias serias en su futuro.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Asalto simple</li>
                <li>• Hurto menor</li>
                <li>• Posesión de marihuana</li>
                <li>• Alteración del orden público</li>
                <li>• Violencia doméstica</li>
              </ul>
            </div>

            {/* Traffic Violations */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Violaciones de Tráfico</h3>
              <p className="text-gray-600 mb-4">
                Protegemos su licencia de conducir y su historial de manejo limpio.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Exceso de velocidad</li>
                <li>• Conducción imprudente</li>
                <li>• Manejo con licencia suspendida</li>
                <li>• Huir de la policía</li>
                <li>• Múltiples infracciones</li>
              </ul>
            </div>

            {/* Drug Crimes */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Delitos de Drogas</h3>
              <p className="text-gray-600 mb-4">
                Defensa contra cargos de drogas desde posesión simple hasta tráfico complejo.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Posesión de sustancias controladas</li>
                <li>• Intención de distribuir</li>
                <li>• Tráfico de drogas</li>
                <li>• Operaciones de laboratorio</li>
                <li>• Confiscación de bienes</li>
              </ul>
            </div>

            {/* White Collar */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Delitos de Cuello Blanco</h3>
              <p className="text-gray-600 mb-4">
                Defensa sofisticada para delitos financieros y comerciales complejos.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Fraude</li>
                <li>• Malversación de fondos</li>
                <li>• Evasión fiscal</li>
                <li>• Lavado de dinero</li>
                <li>• Delitos informáticos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Court Experience */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Experiencia en Tribunales de Charlotte
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Tribunal Superior del Condado de Mecklenburg
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Dirección:</strong> 832 E 4th St, Charlotte, NC 28202
                  </p>
                  <p className="text-gray-600">
                    Manejamos casos de delitos graves, apelaciones y procesamientos complejos ante
                    todos los jueces superiores.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Tribunal de Distrito de Mecklenburg
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Múltiples ubicaciones</strong> en Charlotte y el condado
                  </p>
                  <p className="text-gray-600">
                    Experiencia en delitos menores, DWI, violaciones de tráfico y audiencias
                    preliminares.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Tribunal Federal - Distrito Occidental de NC
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Dirección:</strong> 401 W Trade St, Charlotte, NC 28202
                  </p>
                  <p className="text-gray-600">
                    Representación en casos federales complejos incluyendo drogas, armas y delitos
                    de inmigración.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Casos Exitosos de Defensa</h2>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    DWI Grave - Charges Dismissed
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Cliente enfrentaba su tercera DWI. Desafiamos la parada de tráfico y logramos
                    que se desestimaran todos los cargos.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Tráfico de Drogas - Probation
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Negociamos desde 10 años de prisión hasta libertad condicional para padre de
                    familia sin antecedentes.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">Asalto Agravado - Not Guilty</h4>
                  <p className="text-gray-600 text-sm">
                    Jurado encontró a nuestro cliente inocente en caso de autodefensa después de
                    juicio de 3 días.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Fraude Federal - Reduced Sentence
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Logramos reducir sentencia de 8 años a 18 meses en caso de fraude complejo
                    federal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Immigration Consequences */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              ⚠️ Consecuencias de Inmigración de Casos Criminales
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Si no es ciudadano americano, una condena criminal puede resultar en deportación,
              inadmisibilidad, o negación de naturalización.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Delitos que Pueden Causar Deportación:</h3>
              <ul className="space-y-2">
                <li>• Delitos graves (felonías)</li>
                <li>• Delitos morales (crimes of moral turpitude)</li>
                <li>• Delitos de drogas (incluso posesión simple)</li>
                <li>• Delitos de violencia doméstica</li>
                <li>• Delitos de armas de fuego</li>
                <li>• Múltiples delitos menores</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Cómo Protegemos Su Estatus:</h3>
              <ul className="space-y-2">
                <li>• Análisis de consecuencias de inmigración</li>
                <li>• Negociación de cargos alternativos</li>
                <li>• Búsqueda de opciones que no afecten inmigración</li>
                <li>• Coordinación con abogados de inmigración</li>
                <li>• Defensa en corte de inmigración si es necesario</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestro Proceso de Defensa Criminal
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Consulta de Emergencia</h3>
              <p className="text-gray-600">
                Evaluación inmediata de su caso y asesoramiento sobre sus derechos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Investigación</h3>
              <p className="text-gray-600">
                Revisión completa de evidencia, testigos y procedimientos policiales.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Estrategia</h3>
              <p className="text-gray-600">
                Desarrollo de defensa agresiva basada en los hechos y la ley.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Resolución</h3>
              <p className="text-gray-600">Negociación favorable o defensa agresiva en juicio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Contacto de Emergencia para Defensa Criminal
            </h2>
            <p className="text-xl text-gray-600">
              El tiempo es crítico en casos criminales. Actúe ahora para proteger sus derechos.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-8 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">🚨 ¿FUE ARRESTADO? LLAME AHORA 🚨</h3>
            <p className="mb-4">
              No hable con la policía sin un abogado. Cada minuto cuenta para proteger sus derechos.
            </p>
            <Link
              href="tel:+17045550124"
              className="bg-white text-red-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              (704) 555-0124 - LÍNEA DE ARRESTOS 24/7
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
