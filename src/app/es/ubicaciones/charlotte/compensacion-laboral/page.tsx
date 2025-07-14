import { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Abogado de Compensación Laboral en Charlotte, NC | Bufete Vasquez',
  description: 'Abogados de compensación laboral en Charlotte, NC. Lesiones en el trabajo, beneficios negados, reclamaciones laborales. Luchamos por sus derechos.',
  keywords: 'abogado compensación laboral Charlotte, lesiones trabajo Charlotte, workers comp Charlotte, beneficios laborales Charlotte',
  openGraph: {
    title: 'Abogado de Compensación Laboral en Charlotte, NC | Bufete Vasquez',
    description: 'Especialistas en compensación laboral en Charlotte, NC. Protegemos a trabajadores lesionados. Consulta gratuita.',
    url: 'https://vasquezlawfirm.com/es/ubicaciones/charlotte/compensacion-laboral',
    siteName: 'Bufete de Abogados Vasquez',
    locale: 'es_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://vasquezlawfirm.com/es/ubicaciones/charlotte/compensacion-laboral',
  },
};

export default function CharlotteWorkersCompPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-900 to-orange-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Compensación Laboral en Charlotte, NC
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Si se lesionó en el trabajo, tiene derechos. Luchamos para que reciba todos los beneficios que merece.
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
                className="bg-transparent border-2 border-white hover:bg-white hover:text-orange-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
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
              <div className="text-3xl font-bold text-orange-600 mb-2">$25M+</div>
              <div className="text-gray-700">Recuperado en Beneficios</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">1,800+</div>
              <div className="text-gray-700">Casos de Workers' Comp</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-700">Tasa de Éxito</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
              <div className="text-gray-700">Años de Experiencia</div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Cases */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tipos de Lesiones Laborales en Charlotte
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Representamos trabajadores en todas las industrias de Charlotte, desde construcción hasta hospitales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Construction Injuries */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lesiones de Construcción</h3>
              <p className="text-gray-600 mb-4">
                Charlotte está en constante crecimiento. Protegemos a trabajadores de construcción lesionados en proyectos locales.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Caídas desde altura</li>
                <li>• Accidentes con maquinaria pesada</li>
                <li>• Lesiones por objetos que caen</li>
                <li>• Electrocuciones</li>
                <li>• Lesiones de espalda por levantamiento</li>
              </ul>
            </div>

            {/* Manufacturing */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lesiones Industriales</h3>
              <p className="text-gray-600 mb-4">
                Representamos trabajadores en plantas manufactureras y almacenes de distribución en Charlotte.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Lesiones con maquinaria</li>
                <li>• Movimientos repetitivos</li>
                <li>• Exposición química</li>
                <li>• Lesiones de montacargas</li>
                <li>• Quemaduras y cortadas</li>
              </ul>
            </div>

            {/* Healthcare */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lesiones en Hospitales</h3>
              <p className="text-gray-600 mb-4">
                Protegemos a trabajadores de la salud en hospitales y clínicas de Charlotte.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Lesiones de espalda por levantar pacientes</li>
                <li>• Pinchaduras con agujas</li>
                <li>• Resbalones en pisos mojados</li>
                <li>• Exposición a enfermedades</li>
                <li>• Agresiones de pacientes</li>
              </ul>
            </div>

            {/* Office Injuries */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lesiones de Oficina</h3>
              <p className="text-gray-600 mb-4">
                Incluso los trabajos de oficina pueden causar lesiones que requieren compensación laboral.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Síndrome del túnel carpiano</li>
                <li>• Lesiones por esfuerzo repetitivo</li>
                <li>• Resbalones y caídas</li>
                <li>• Lesiones por ergonomía deficiente</li>
                <li>• Estrés relacionado con el trabajo</li>
              </ul>
            </div>

            {/* Transportation */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lesiones de Transporte</h3>
              <p className="text-gray-600 mb-4">
                Representamos conductores comerciales, trabajadores de UPS, FedEx y otras compañías de entrega.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Accidentes de vehículos comerciales</li>
                <li>• Lesiones por cargar/descargar</li>
                <li>• Ataques durante entregas</li>
                <li>• Lesiones en almacenes</li>
                <li>• Accidentes en el aeropuerto</li>
              </ul>
            </div>

            {/* Retail */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lesiones en Retail</h3>
              <p className="text-gray-600 mb-4">
                Trabajadores de tiendas, supermercados y centros comerciales también tienen derecho a compensación.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Lesiones por levantar mercancía</li>
                <li>• Resbalones en áreas de trabajo</li>
                <li>• Cortes con equipos</li>
                <li>• Robos y asaltos</li>
                <li>• Lesiones por estanterías que caen</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits You Deserve */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Beneficios que Usted Merece
            </h2>
            <p className="text-xl text-gray-600">
              La compensación laboral de Carolina del Norte debe cubrir todos sus gastos y pérdidas relacionadas con su lesión.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gastos Médicos</h3>
              <p className="text-gray-600 text-sm">
                100% de todos los gastos médicos relacionados con su lesión laboral.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Salarios Perdidos</h3>
              <p className="text-gray-600 text-sm">
                2/3 de su salario promedio semanal mientras no pueda trabajar.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rehabilitación</h3>
              <p className="text-gray-600 text-sm">
                Fisioterapia y entrenamiento vocacional para regresar al trabajo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Discapacidad</h3>
              <p className="text-gray-600 text-sm">
                Compensación por discapacidad permanente parcial o total.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Charlotte Workers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Principales Empleadores en Charlotte
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Sector Financiero</h3>
                  <p className="text-gray-600 text-sm">Bank of America, Wells Fargo, Credit Suisse - Lesiones ergonómicas y estrés laboral</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Sector Salud</h3>
                  <p className="text-gray-600 text-sm">Carolinas HealthCare, Presbyterian Healthcare - Lesiones de levantamiento y exposición</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Manufactura</h3>
                  <p className="text-gray-600 text-sm">Honeywell, Siemens - Lesiones industriales y con maquinaria</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Transporte</h3>
                  <p className="text-gray-600 text-sm">UPS, FedEx, Aeropuerto de Charlotte - Lesiones de carga y accidentes</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Construcción</h3>
                  <p className="text-gray-600 text-sm">Proyectos del centro de Charlotte - Caídas y lesiones con equipos</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Casos Exitosos de Workers' Comp
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-2">Trabajador de Construcción - $350K</h4>
                  <p className="text-gray-600 text-sm">
                    Caída desde andamio en proyecto del centro de Charlotte resultó en compensación total por discapacidad permanente.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-2">Enfermera - $180K</h4>
                  <p className="text-gray-600 text-sm">
                    Lesión de espalda por levantar paciente en Carolinas Medical Center, todos los gastos médicos cubiertos.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-2">Conductor de UPS - $225K</h4>
                  <p className="text-gray-600 text-sm">
                    Lesión de rodilla por paquete pesado, cirugía cubierta y compensación por discapacidad parcial.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-2">Trabajador de Almacén - $120K</h4>
                  <p className="text-gray-600 text-sm">
                    Síndrome del túnel carpiano por trabajo repetitivo, cirugía y reentrenamiento vocacional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-orange-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Proceso de Reclamación de Workers' Comp
            </h2>
            <p className="text-xl">
              Guiamos a nuestros clientes a través de cada paso del proceso de compensación laboral.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Reporte Inmediato</h3>
              <p>
                Ayudamos a reportar su lesión al empleador y completar los formularios requeridos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Atención Médica</h3>
              <p>
                Coordinamos con médicos aprobados para obtener el tratamiento que necesita.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Reclamación</h3>
              <p>
                Presentamos su reclamación ante la Comisión Industrial de Carolina del Norte.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Beneficios</h3>
              <p>
                Luchamos hasta obtener todos los beneficios médicos y de salarios que merece.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Se Lesionó en el Trabajo en Charlotte?
            </h2>
            <p className="text-xl text-gray-600">
              No deje que su empleador o su aseguradora le nieguen los beneficios que merece. Actúe ahora.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-8 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">🚨 ¿Lesión Laboral Reciente? 🚨</h3>
            <p className="mb-4">
              Tiene solo 30 días para reportar su lesión. No espere - llame ahora:
            </p>
            <Link
              href="tel:+17045550123"
              className="bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors inline-block"
            >
              (704) 555-0123 - Disponible 24/7
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}