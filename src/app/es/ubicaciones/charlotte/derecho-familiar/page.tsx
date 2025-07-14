import { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Abogado de Derecho Familiar en Charlotte, NC | Bufete Vasquez',
  description: 'Abogados de derecho familiar en Charlotte, NC. Divorcio, custodia, pensión alimenticia, adopción. Protegemos a su familia con compasión y experiencia.',
  keywords: 'abogado derecho familiar Charlotte, divorcio Charlotte, custodia Charlotte, pensión alimenticia Charlotte, adopción Charlotte',
  openGraph: {
    title: 'Abogado de Derecho Familiar en Charlotte, NC | Bufete Vasquez',
    description: 'Especialistas en derecho familiar en Charlotte, NC. Protegemos los intereses de su familia. Consulta confidencial.',
    url: 'https://vasquezlawfirm.com/es/ubicaciones/charlotte/derecho-familiar',
    siteName: 'Bufete de Abogados Vasquez',
    locale: 'es_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://vasquezlawfirm.com/es/ubicaciones/charlotte/derecho-familiar',
  },
};

export default function CharlotteFamilyLawPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Abogado de Derecho Familiar en Charlotte
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Protegemos lo más importante para usted: su familia. Con compasión, experiencia y dedicación en cada caso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/es/contacto"
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Consulta Confidencial
              </Link>
              <Link
                href="tel:+17045550123"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-purple-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                (704) 555-0123
              </Link>
            </div>
            <p className="mt-4 text-lg">
              <strong>Todas las consultas son completamente confidenciales</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Servicios de Derecho Familiar en Charlotte
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Entendemos que los asuntos familiares son profundamente personales. Ofrecemos representación compasiva y efectiva.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Divorce */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Divorcio</h3>
              <p className="text-gray-600 mb-4">
                Guiamos a nuestros clientes a través del proceso de divorcio con dignidad y respeto, protegiendo sus intereses.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Divorcio no disputado (uncontested)</li>
                <li>• Divorcio disputado (contested)</li>
                <li>• Separación legal</li>
                <li>• División de bienes y deudas</li>
                <li>• Pensión conyugal (alimony)</li>
              </ul>
            </div>

            {/* Child Custody */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Custodia de Menores</h3>
              <p className="text-gray-600 mb-4">
                Priorizamos el bienestar de los niños mientras protegemos los derechos parentales de nuestros clientes.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Custodia física y legal</li>
                <li>• Planes de crianza (parenting plans)</li>
                <li>• Modificaciones de custodia</li>
                <li>• Derechos de visitación</li>
                <li>• Reubicación con menores</li>
              </ul>
            </div>

            {/* Child Support */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pensión Alimenticia</h3>
              <p className="text-gray-600 mb-4">
                Aseguramos que los niños reciban el apoyo financiero que necesitan y merecen.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cálculo de pensión alimenticia</li>
                <li>• Modificaciones de soporte</li>
                <li>• Cumplimiento de órdenes</li>
                <li>• Recuperación de pagos atrasados</li>
                <li>• Garnishment de salarios</li>
              </ul>
            </div>

            {/* Adoption */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Adopción</h3>
              <p className="text-gray-600 mb-4">
                Ayudamos a crear familias a través del proceso legal de adopción con cuidado y atención al detalle.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Adopción de hijastros</li>
                <li>• Adopción por familiares</li>
                <li>• Adopción de adultos</li>
                <li>• Terminación de derechos parentales</li>
                <li>• Procesos de consentimiento</li>
              </ul>
            </div>

            {/* Domestic Violence */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Órdenes de Protección</h3>
              <p className="text-gray-600 mb-4">
                Protegemos a víctimas de violencia doméstica con órdenes de restricción de emergencia y permanentes.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Órdenes de protección de emergencia</li>
                <li>• Órdenes de restricción permanentes</li>
                <li>• Defensa contra órdenes falsas</li>
                <li>• Modificaciones y extensiones</li>
                <li>• Violaciones de órdenes</li>
              </ul>
            </div>

            {/* Paternity */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Establecimiento de Paternidad</h3>
              <p className="text-gray-600 mb-4">
                Establecemos legalmente la paternidad para proteger los derechos de padres e hijos.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Pruebas de paternidad</li>
                <li>• Reconocimiento voluntario</li>
                <li>• Derechos del padre biológico</li>
                <li>• Legitimación de hijos</li>
                <li>• Cambios de apellido</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Charlotte Family Court */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Tribunal de Familia del Condado de Mecklenburg
              </h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 mb-4">
                  Tenemos amplia experiencia en el Tribunal de Familia de Charlotte y conocemos los procedimientos locales.
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Dirección:</strong> 832 E 4th St, Charlotte, NC 28202</p>
                  <p><strong>Mediación:</strong> Participamos en programas de mediación cuando es apropiado</p>
                  <p><strong>Servicios de apoyo:</strong> Coordinamos con consejeros familiares y especialistas</p>
                </div>
              </div>

              <div className="mt-6 bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-3">
                  Enfoque Bilingüe y Cultural
                </h3>
                <p className="text-purple-800">
                  Entendemos las dinámicas familiares de la comunidad latina y los desafíos únicos 
                  que enfrentan las familias inmigrantes en asuntos legales.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Testimonios de Familias
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">Custodia Exitosa</h4>
                  <p className="text-gray-600 text-sm">
                    "Después de un divorcio difícil, lograron que mantuviera la custodia de mis hijos. 
                    Me trataron con respeto y mantuvieron mis intereses como prioridad."
                  </p>
                  <p className="text-purple-600 text-sm mt-2">- Carmen L., Charlotte</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">Adopción de Hijastro</h4>
                  <p className="text-gray-600 text-sm">
                    "Hicieron que la adopción de mi hijastro fuera un proceso simple y lleno de alegría. 
                    Ahora somos oficialmente una familia."
                  </p>
                  <p className="text-purple-600 text-sm mt-2">- Roberto M., Concord</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">Divorcio Amigable</h4>
                  <p className="text-gray-600 text-sm">
                    "Nos ayudaron a divorciarnos de manera respetuosa, priorizando el bienestar de nuestros hijos. 
                    Evitaron una batalla legal costosa."
                  </p>
                  <p className="text-purple-600 text-sm mt-2">- Ana y Luis R., Charlotte</p>
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
              Nuestro Proceso de Derecho Familiar
            </h2>
            <p className="text-xl text-gray-600">
              Cada familia es única. Adaptamos nuestro enfoque a sus necesidades específicas.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Consulta Confidencial</h3>
              <p className="text-gray-600">
                Escuchamos su situación con empatía y respeto, en un ambiente confidencial.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Estrategia Personalizada</h3>
              <p className="text-gray-600">
                Desarrollamos un plan legal específico para sus metas familiares y financieras.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Representación Compasiva</h3>
              <p className="text-gray-600">
                Defendemos sus intereses mientras mantenemos la dignidad y el respeto.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Resolución Exitosa</h3>
              <p className="text-gray-600">
                Logramos resultados que protegen a su familia y le permiten seguir adelante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Considerations */}
      <section className="py-16 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Consideraciones Especiales para Familias Inmigrantes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Desafíos Únicos:</h3>
              <ul className="space-y-2">
                <li>• Documentos extranjeros que requieren traducción</li>
                <li>• Diferencias culturales en dinámicas familiares</li>
                <li>• Impacto del estatus migratorio en decisiones de custodia</li>
                <li>• Órdenes de protección y su efecto en inmigración</li>
                <li>• Jurisdicción internacional en casos de secuestro</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Nuestras Soluciones:</h3>
              <ul className="space-y-2">
                <li>• Coordinación con traductores certificados</li>
                <li>• Comprensión de tradiciones familiares latinas</li>
                <li>• Protección de información sensible de inmigración</li>
                <li>• Trabajo conjunto con abogados de inmigración</li>
                <li>• Experiencia en tratados internacionales</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Consulta Confidencial de Derecho Familiar
            </h2>
            <p className="text-xl text-gray-600">
              Su familia merece la mejor representación. Contáctenos para una consulta privada y confidencial.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}