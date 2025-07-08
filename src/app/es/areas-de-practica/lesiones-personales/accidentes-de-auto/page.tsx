import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Phone, AlertTriangle, Shield, DollarSign, Clock, CheckCircle, Heart, Scale } from 'lucide-react';

const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});

const VoiceAssistant = dynamic(() => import('@/components/VirtualAssistant/VirtualAssistantWrapper').then(mod => mod.VirtualAssistantWrapper), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Abogados de Accidentes de Auto en Carolina del Norte | YO PELEO POR TI™',
  description: '¿Herido en un accidente de auto? Nuestros abogados en Raleigh, Charlotte y Smithfield luchan por compensación máxima. Sin honorarios si no ganamos. Consulta GRATIS.',
  keywords: 'abogado accidentes auto Carolina Norte, accidente carro Raleigh, abogado choques Charlotte, compensación accidentes vehiculares, demanda accidente auto NC',
  openGraph: {
    title: 'Abogados de Accidentes de Auto en Carolina del Norte | Vasquez Law Firm',
    description: '¿Herido en un accidente de auto? Obtenga la compensación que merece. Más de 35 años de experiencia. Hablamos español. Llame al 1-844-YO-PELEO',
    images: [{
      url: '/images/car-accident-attorney.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogados de Accidentes de Auto en Carolina del Norte'
    }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury/car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/accidentes-de-auto',
    },
  },
};

export default function AccidentesDeAutoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-700 text-white py-20">
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Abogados de Accidentes de Auto en Carolina del Norte
            </h1>
            <p className="text-2xl md:text-3xl text-gold-400 font-semibold mb-6">
              YO PELEO POR TI™
            </p>
            <p className="text-xl mb-8">
              Más de 35 años luchando por víctimas de accidentes. Sin honorarios si no ganamos.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:18449673536"
                className="bg-gold-500 text-burgundy-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-gold-400 transition-all transform hover:scale-105"
              >
                ¡Llame Ahora! 1-844-YO-PELEO
              </a>
              <Link
                href="/es/consulta-gratuita"
                className="border-2 border-white bg-transparent px-8 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-burgundy-900 transition-all"
              >
                Consulta Gratuita
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="bg-red-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-3">
            <AlertTriangle className="w-6 h-6" />
            <p className="text-lg font-semibold">
              ¡IMPORTANTE! El tiempo para presentar su reclamo es limitado. Actúe ahora.
            </p>
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                Obtenga la Compensación que Merece Después de un Accidente de Auto
              </h2>
              
              <p className="text-gray-700 mb-6">
                Si usted o un ser querido ha sido herido en un accidente de auto en Carolina del Norte, 
                necesita un abogado agresivo que luche por sus derechos. En Vasquez Law Firm, PLLC, 
                hemos recuperado millones de dólares para víctimas de accidentes en Raleigh, Charlotte, 
                Durham, Winston-Salem y todo NC.
              </p>

              <div className="bg-gold-50 border-l-4 border-gold-500 p-6 my-8">
                <p className="text-lg font-semibold text-burgundy-900">
                  "No permita que las compañías de seguros le paguen menos de lo que merece. 
                  Nosotros conocemos sus tácticas y sabemos cómo combatirlas."
                </p>
                <p className="text-sm mt-2 text-gray-600">- William Vasquez, Abogado Principal</p>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                ¿Por Qué Elegirnos para Su Caso de Accidente?
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <Shield className="w-8 h-8 text-gold-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-burgundy-900">Protegemos Sus Derechos</h4>
                    <p className="text-gray-700">No hable con las aseguradoras sin nosotros</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <DollarSign className="w-8 h-8 text-gold-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-burgundy-900">Máxima Compensación</h4>
                    <p className="text-gray-700">Luchamos por cada centavo que merece</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-8 h-8 text-gold-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-burgundy-900">Respuesta Rápida</h4>
                    <p className="text-gray-700">Disponibles 24/7 para emergencias</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="w-8 h-8 text-gold-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-burgundy-900">Atención Personal</h4>
                    <p className="text-gray-700">Su caso es nuestra prioridad</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Compensación que Podemos Conseguirle
              </h3>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Gastos Médicos:</strong> Facturas actuales y tratamiento futuro
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Salarios Perdidos:</strong> Tiempo perdido del trabajo y capacidad de ganar reducida
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Dolor y Sufrimiento:</strong> Compensación por su trauma físico y emocional
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Daños a la Propiedad:</strong> Reparación o reemplazo de su vehículo
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Daños Punitivos:</strong> En casos de negligencia grave
                  </span>
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Tipos de Accidentes que Manejamos
              </h3>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Scale className="w-5 h-5 text-burgundy-700 mr-2" />
                    <span>Choques por detrás</span>
                  </li>
                  <li className="flex items-center">
                    <Scale className="w-5 h-5 text-burgundy-700 mr-2" />
                    <span>Accidentes de intersección</span>
                  </li>
                  <li className="flex items-center">
                    <Scale className="w-5 h-5 text-burgundy-700 mr-2" />
                    <span>Colisiones frontales</span>
                  </li>
                  <li className="flex items-center">
                    <Scale className="w-5 h-5 text-burgundy-700 mr-2" />
                    <span>Accidentes con conductores ebrios</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Scale className="w-5 h-5 text-burgundy-700 mr-2" />
                    <span>Accidentes con Uber/Lyft</span>
                  </li>
                  <li className="flex items-center">
                    <Scale className="w-5 h-5 text-burgundy-700 mr-2" />
                    <span>Atropellos</span>
                  </li>
                  <li className="flex items-center">
                    <Scale className="w-5 h-5 text-burgundy-700 mr-2" />
                    <span>Accidentes de múltiples vehículos</span>
                  </li>
                  <li className="flex items-center">
                    <Scale className="w-5 h-5 text-burgundy-700 mr-2" />
                    <span>Conductores sin seguro</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
              Lo Que Dicen Nuestros Clientes
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-700 mb-4">
                  "Después de mi accidente, no sabía qué hacer. El equipo de Vasquez Law Firm 
                  me guió en cada paso y conseguí 5 veces más de lo que el seguro me ofrecía inicialmente."
                </p>
                <p className="font-semibold text-burgundy-900">- María G., Charlotte NC</p>
                <div className="text-gold-500">★★★★★</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-700 mb-4">
                  "Excelente servicio en español. Me trataron como familia y pelearon 
                  por mí hasta conseguir justicia. ¡100% recomendado!"
                </p>
                <p className="font-semibold text-burgundy-900">- Roberto P., Raleigh NC</p>
                <div className="text-gold-500">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-burgundy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              No Espere Más - El Tiempo Es Crítico
            </h2>
            <p className="text-xl mb-8">
              Las evidencias desaparecen. Los testigos olvidan. Las aseguradoras actúan rápido.
              <br />
              <strong>Proteja sus derechos AHORA.</strong>
            </p>
            
            <div className="bg-gold-500 text-burgundy-900 p-8 rounded-lg inline-block">
              <p className="text-2xl font-bold mb-4">Consulta 100% GRATUITA</p>
              <p className="text-xl mb-6">Sin Honorarios Si No Ganamos</p>
              <a
                href="tel:18449673536"
                className="bg-burgundy-900 text-white px-8 py-4 rounded-md font-bold text-xl hover:bg-burgundy-800 transition-all inline-block"
              >
                <Phone className="inline-block mr-2" />
                Llame Ya: 1-844-YO-PELEO
              </a>
            </div>
            
            <p className="mt-6 text-lg">
              Disponible 24/7 • Hablamos Español • Servimos todo Carolina del Norte
            </p>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-burgundy-900 text-center mb-8">
            Oficinas Convenientes en Todo Carolina del Norte
          </h3>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="font-semibold">Raleigh</p>
              <p className="text-sm text-gray-600">6801 Glenwood Ave</p>
            </div>
            <div>
              <p className="font-semibold">Charlotte</p>
              <p className="text-sm text-gray-600">4801 E Independence Blvd</p>
            </div>
            <div>
              <p className="font-semibold">Smithfield</p>
              <p className="text-sm text-gray-600">130 S 3rd St</p>
            </div>
            <div>
              <p className="font-semibold">Orlando, FL</p>
              <p className="text-sm text-gray-600">37 N Orange Ave</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Components */}
      <ChatWidget userId="accidentes-auto-page" language="es" />
      <VoiceAssistant language="es" />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm - Abogados de Accidentes de Auto',
            description: 'Abogados especializados en accidentes de auto en Carolina del Norte. Más de 35 años de experiencia. Sin honorarios si no ganamos.',
            url: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/accidentes-de-auto',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '6801 Glenwood Ave',
              addressLocality: 'Raleigh',
              addressRegion: 'NC',
              postalCode: '27612',
              addressCountry: 'US'
            },
            areaServed: ['Raleigh', 'Charlotte', 'Durham', 'Winston-Salem', 'Smithfield', 'North Carolina'],
            priceRange: 'Sin costo inicial - Contingencia',
            openingHours: 'Mo-Su 00:00-23:59',
            image: 'https://www.vasquezlawnc.com/images/car-accident-attorney.jpg',
            sameAs: [
              'https://www.facebook.com/vasquezlawfirm',
              'https://twitter.com/vasquezlawfirm',
              'https://www.linkedin.com/company/vasquez-law-firm'
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '127'
            }
          }),
        }}
      />
    </div>
  );
}