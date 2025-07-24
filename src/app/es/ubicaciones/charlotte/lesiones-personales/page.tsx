import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
import Link from 'next/link';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Abogado de Lesiones Personales en Charlotte, NC | Bufete Vasquez',
  description:
    'Abogados de lesiones personales en Charlotte, NC. Accidentes automovilísticos, negligencia médica, lesiones en el trabajo. No cobramos a menos que ganemos.',
  keywords:
    'abogado lesiones personales Charlotte, accidentes auto Charlotte, negligencia médica Charlotte, compensación Charlotte',
  openGraph: {
    title: 'Abogado de Lesiones Personales en Charlotte, NC | Bufete Vasquez',
    description:
      'Especialistas en lesiones personales en Charlotte, NC. Luchamos por la máxima compensación. Consulta gratuita.',
    url: 'https://vasquezlawfirm.com/es/ubicaciones/charlotte/lesiones-personales',
    siteName: 'Bufete de Abogados Vasquez',
    locale: 'es_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://vasquezlawfirm.com/es/ubicaciones/charlotte/lesiones-personales',
  },
};

export default function CharlottePersonalInjuryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-900 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Abogado de Lesiones Personales en Charlotte
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Luchamos incansablemente por la máxima compensación para víctimas de accidentes y
              negligencia en Charlotte, NC.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/es/contacto"
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Consulta Gratuita
              </Link>
              <Link
                href="tel:+17045550123"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-red-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                (704) 555-0123
              </Link>
            </div>
            <p className="mt-4 text-lg">
              <strong>No cobramos a menos que ganemos su caso</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">$50M+</div>
              <div className="text-gray-700">Recuperado para Clientes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">2,500+</div>
              <div className="text-gray-700">Casos de Lesiones Ganados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">98%</div>
              <div className="text-gray-700">Tasa de Éxito</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-gray-700">Disponibilidad de Emergencia</div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Cases */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tipos de Casos de Lesiones Personales en Charlotte
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Representamos víctimas de todos los tipos de accidentes y negligencia en el área
              metropolitana de Charlotte.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Car Accidents */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    clipRule="evenodd"
                  />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accidentes Automovilísticos</h3>
              <p className="text-gray-600 mb-4">
                Representamos víctimas de accidentes en las principales carreteras de Charlotte,
                incluyendo I-77, I-85, y I-485.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Colisiones frontales y traseras</li>
                <li>• Accidentes de múltiples vehículos</li>
                <li>• Accidentes con conductores sin seguro</li>
                <li>• Casos de conductor ebrio (DUI)</li>
              </ul>
            </div>

            {/* Truck Accidents */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H13a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                  <path d="M14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accidentes de Camiones</h3>
              <p className="text-gray-600 mb-4">
                Casos complejos contra compañías de transporte y sus aseguradoras por accidentes
                devastadores.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Accidentes de tractor-remolque</li>
                <li>• Violaciones de horas de servicio</li>
                <li>• Mantenimiento inadecuado</li>
                <li>• Carga mal asegurada</li>
              </ul>
            </div>

            {/* Medical Malpractice */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Negligencia Médica</h3>
              <p className="text-gray-600 mb-4">
                Casos contra hospitales y médicos en Charlotte por errores médicos que causan
                lesiones graves.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Errores quirúrgicos</li>
                <li>• Diagnósticos erróneos</li>
                <li>• Errores de medicación</li>
                <li>• Negligencia en el parto</li>
              </ul>
            </div>

            {/* Workplace Injuries */}
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lesiones en el Trabajo</h3>
              <p className="text-gray-600 mb-4">
                Cuando la compensación laboral no es suficiente, demandamos a terceros responsables.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Accidentes de construcción</li>
                <li>• Lesiones con maquinaria</li>
                <li>• Caídas desde altura</li>
                <li>• Exposición a químicos tóxicos</li>
              </ul>
            </div>

            {/* Slip and Fall */}
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">Resbalones y Caídas</h3>
              <p className="text-gray-600 mb-4">
                Casos de responsabilidad civil contra propietarios negligentes en tiendas, oficinas
                y propiedades.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Pisos mojados sin señalización</li>
                <li>• Escaleras defectuosas</li>
                <li>• Iluminación inadecuada</li>
                <li>• Mantenimiento negligente</li>
              </ul>
            </div>

            {/* Wrongful Death */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Muerte Injusta</h3>
              <p className="text-gray-600 mb-4">
                Representamos familias que han perdido seres queridos debido a la negligencia de
                otros.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Accidentes fatales de tráfico</li>
                <li>• Negligencia médica fatal</li>
                <li>• Productos defectuosos</li>
                <li>• Accidentes laborales fatales</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Local Charlotte Focus */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Conocimiento Local de Charlotte
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Carreteras Peligrosas en Charlotte
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      • <strong>I-77:</strong> Una de las carreteras más peligrosas de NC
                    </li>
                    <li>
                      • <strong>I-85:</strong> Alto tráfico de camiones comerciales
                    </li>
                    <li>
                      • <strong>I-485 (The Loop):</strong> Múltiples puntos de congestión
                    </li>
                    <li>
                      • <strong>Independence Boulevard:</strong> Intersecciones peligrosas
                    </li>
                    <li>
                      • <strong>South Boulevard:</strong> Alto índice de accidentes peatonales
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Hospitales Principales
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Carolinas Medical Center</li>
                    <li>• Presbyterian Hospital</li>
                    <li>• Novant Health Charlotte</li>
                    <li>• Atrium Health Mercy</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Casos Exitosos en Charlotte</h2>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Accidente de Tractor-Remolque - $2.1M
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Familia hispana obtuvo compensación después de que conductor de camión se quedó
                    dormido en I-77, causando lesiones permanentes.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">Negligencia Médica - $1.8M</h4>
                  <p className="text-gray-600 text-sm">
                    Error quirúrgico en Carolinas Medical Center resultó en compensación por daños
                    permanentes y dolor.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Accidente de Construcción - $950K
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Trabajador inmigrante lesionado por equipo defectuoso en proyecto de desarrollo
                    en South End.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">Muerte Injusta - $1.2M</h4>
                  <p className="text-gray-600 text-sm">
                    Familia recibió compensación después de accidente fatal causado por conductor
                    ebrio en Independence Boulevard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestro Proceso de Lesiones Personales
            </h2>
            <p className="text-xl text-gray-600">
              Desde la consulta inicial hasta el acuerdo final, estamos con usted en cada paso.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Consulta Gratuita</h3>
              <p className="text-gray-600">
                Evaluamos su caso sin costo. Si no podemos ayudar, le diremos honestamente.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Investigación</h3>
              <p className="text-gray-600">
                Recopilamos evidencia, hablamos con testigos y reconstruimos el accidente.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Negociación</h3>
              <p className="text-gray-600">
                Luchamos agresivamente con las aseguradoras por la máxima compensación.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Resolución</h3>
              <p className="text-gray-600">
                Acuerdo justo o juicio exitoso. Usted recibe la compensación que merece.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              ¿Por Qué Elegir Nuestro Bufete para Su Caso de Lesiones?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Representación Agresiva</h3>
              <p>
                No nos conformamos con ofertas bajas. Luchamos hasta obtener la compensación
                completa que merece.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Red Médica</h3>
              <p>
                Trabajamos con los mejores médicos especializados para documentar sus lesiones y
                tratamiento.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Sin Honorarios Adelantados</h3>
              <p>Solo cobramos si ganamos su caso. Usted no arriesga nada por buscar justicia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Fue Lesionado en Charlotte? Contáctenos Ahora
            </h2>
            <p className="text-xl text-gray-600">
              Cada día que espera es evidencia que se pierde. Actúe ahora para proteger sus
              derechos.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-8 bg-yellow-400 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">🚨 ¿Acabó de Tener un Accidente? 🚨</h3>
            <p className="mb-4">
              No hable con aseguradoras sin un abogado. Llame ahora para proteger sus derechos:
            </p>
            <Link
              href="tel:+17045550123"
              className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors inline-block"
            >
              (704) 555-0123 - Disponible 24/7
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
