import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Heart, Users, Scale, Clock, Shield, DollarSign, Phone, FileText, AlertTriangle, Home } from 'lucide-react';

const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});

const VoiceAssistant = dynamic(() => import('@/components/VirtualAssistant/VirtualAssistantWrapper').then(mod => mod.VirtualAssistantWrapper), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Abogados de Muerte Injusta en NC | Justicia para Familias | YO PELEO POR TI™',
  description: '¿Perdió un ser querido por negligencia? Abogados compasivos de muerte injusta en Carolina del Norte. Buscamos justicia y compensación para su familia. Consulta GRATIS.',
  keywords: 'abogado muerte injusta Carolina Norte, wrongful death español, compensación familiar Raleigh, demanda muerte negligencia Charlotte, pérdida ser querido NC',
  openGraph: {
    title: 'Abogados de Muerte Injusta - Vasquez Law Firm | Carolina del Norte',
    description: 'En su momento más difícil, estamos aquí para buscar justicia. Representamos familias que perdieron seres queridos por negligencia. Llame 1-844-YO-PELEO',
    images: [{
      url: '/images/wrongful-death-attorney.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogados de Muerte Injusta en Carolina del Norte'
    }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/muerte-injusta',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury/wrongful-death',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/muerte-injusta',
    },
  },
};

export default function MuerteInjustaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="w-16 h-16 mx-auto mb-6 text-white opacity-80" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Abogados de Muerte Injusta
            </h1>
            <p className="text-2xl md:text-3xl text-gold-400 font-semibold mb-6">
              Honrando Su Memoria, Buscando Justicia
            </p>
            <p className="text-xl mb-8 text-gray-200">
              Cuando la negligencia de otros causa una pérdida irreparable, 
              luchamos por justicia y compensación para su familia.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:18449673536"
                className="bg-gold-500 text-black px-8 py-4 rounded-md font-bold text-lg hover:bg-gold-400 transition-all"
              >
                Hable con Nosotros: 1-844-YO-PELEO
              </a>
              <Link
                href="/es/consulta-gratuita"
                className="border-2 border-white bg-transparent px-8 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-black transition-all"
              >
                Consulta Confidencial Gratuita
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Compassion Message */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 italic">
              "Entendemos que ninguna cantidad de dinero puede reemplazar a su ser querido. 
              Nuestro objetivo es obtener justicia y asegurar que su familia esté protegida financieramente."
            </p>
            <p className="mt-3 font-semibold text-burgundy-900">- William Vasquez, Abogado Principal</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                Apoyo Legal Compasivo en Su Momento Más Difícil
              </h2>
              
              <p className="text-gray-700 mb-6">
                Perder a un ser querido es devastador. Cuando esa pérdida es causada por la 
                negligencia o acciones intencionales de otro, el dolor se mezcla con la ira 
                y la necesidad de justicia. En Vasquez Law Firm, manejamos su caso con la 
                compasión y dedicación que su familia merece.
              </p>

              <div className="bg-burgundy-50 border-l-4 border-burgundy-700 p-6 mb-8">
                <Users className="w-10 h-10 text-burgundy-700 mb-3" />
                <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                  ¿Quién Puede Presentar una Demanda por Muerte Injusta en NC?
                </h3>
                <p className="text-gray-700 mb-3">Bajo la ley de Carolina del Norte:</p>
                <ul className="text-gray-700 space-y-1">
                  <li>• El representante personal del patrimonio del fallecido</li>
                  <li>• El cónyuge sobreviviente</li>
                  <li>• Los hijos (incluidos los adoptados)</li>
                  <li>• Los padres (si no hay cónyuge ni hijos)</li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Causas Comunes de Muerte Injusta
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-burgundy-900 mb-3">Accidentes de Tráfico</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Accidentes de auto y camión</li>
                    <li>• Conductores ebrios</li>
                    <li>• Atropellos de peatones</li>
                    <li>• Accidentes de motocicleta</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-burgundy-900 mb-3">Negligencia Médica</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Errores quirúrgicos</li>
                    <li>• Diagnósticos erróneos</li>
                    <li>• Errores de medicación</li>
                    <li>• Negligencia en emergencias</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-burgundy-900 mb-3">Accidentes Laborales</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Accidentes de construcción</li>
                    <li>• Exposición a químicos</li>
                    <li>• Fallas de equipo</li>
                    <li>• Caídas desde altura</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-burgundy-900 mb-3">Productos Defectuosos</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Vehículos defectuosos</li>
                    <li>• Medicamentos peligrosos</li>
                    <li>• Dispositivos médicos fallidos</li>
                    <li>• Productos de consumo inseguros</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Compensación para Su Familia
              </h3>

              <div className="bg-gold-50 p-8 rounded-lg mb-8">
                <DollarSign className="w-12 h-12 text-burgundy-700 mb-4" />
                <p className="text-gray-700 mb-4">
                  Aunque ninguna cantidad puede reemplazar su pérdida, la compensación puede 
                  ayudar a su familia a mantener estabilidad financiera:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-burgundy-900 mb-2">Daños Económicos</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>✓ Gastos médicos finales</li>
                      <li>✓ Gastos funerarios y entierro</li>
                      <li>✓ Pérdida de ingresos futuros</li>
                      <li>✓ Pérdida de beneficios laborales</li>
                      <li>✓ Valor de servicios domésticos</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-burgundy-900 mb-2">Daños No Económicos</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>✓ Pérdida de compañía</li>
                      <li>✓ Pérdida de guía parental</li>
                      <li>✓ Dolor y sufrimiento (antes de morir)</li>
                      <li>✓ Pérdida de consorcio</li>
                      <li>✓ Angustia emocional de la familia</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Tiempo Límite Crítico
              </h3>

              <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8">
                <Clock className="w-10 h-10 text-red-600 mb-3" />
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Solo tiene 2 años para presentar una demanda por muerte injusta en NC
                </p>
                <p className="text-gray-700">
                  El tiempo comienza desde la fecha del fallecimiento. No espere - 
                  necesitamos tiempo para investigar y construir un caso fuerte.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
              Cómo Ayudamos a Su Familia
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Shield className="w-10 h-10 text-burgundy-700 mb-3" />
                <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                  Manejamos Todo el Proceso Legal
                </h3>
                <p className="text-gray-700">
                  Nos encargamos de toda la carga legal para que usted pueda enfocarse 
                  en su familia y el proceso de duelo.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Scale className="w-10 h-10 text-burgundy-700 mb-3" />
                <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                  Investigación Exhaustiva
                </h3>
                <p className="text-gray-700">
                  Contratamos expertos, obtenemos evidencia y construimos el caso más 
                  fuerte posible para su familia.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Heart className="w-10 h-10 text-burgundy-700 mb-3" />
                <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                  Apoyo Compasivo
                </h3>
                <p className="text-gray-700">
                  Entendemos su dolor. Tratamos a cada familia con respeto, dignidad 
                  y compasión genuina.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <DollarSign className="w-10 h-10 text-burgundy-700 mb-3" />
                <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                  Sin Costos por Adelantado
                </h3>
                <p className="text-gray-700">
                  No paga nada a menos que ganemos. Cubrimos todos los costos del caso 
                  hasta obtener compensación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Examples */}
      <section className="bg-burgundy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Justicia para Familias de Carolina del Norte
            </h2>
            
            <div className="space-y-8">
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">Padre de Familia - Accidente de Camión</h3>
                  <span className="text-2xl font-bold text-gold-400">$4.2M</span>
                </div>
                <p>
                  Conductor de camión exhausto causó accidente fatal en I-40. 
                  Dejó esposa y 3 hijos menores. Compensación aseguró educación universitaria 
                  y estabilidad financiera familiar.
                </p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">Madre Joven - Negligencia Médica</h3>
                  <span className="text-2xl font-bold text-gold-400">$3.5M</span>
                </div>
                <p>
                  Hospital ignoró signos de preeclampsia. Muerte evitable durante parto. 
                  Compensación para esposo y bebé recién nacido incluye cuidado a largo plazo.
                </p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">Trabajador de Construcción</h3>
                  <span className="text-2xl font-bold text-gold-400">$2.8M</span>
                </div>
                <p>
                  Caída desde andamio defectuoso. Empresa no siguió normas de seguridad. 
                  Familia recibió compensación más allá de beneficios de compensación laboral.
                </p>
              </div>
            </div>
            
            <p className="text-center mt-8 text-sm">
              *Cada caso es único. Resultados específicos dependen de las circunstancias.
            </p>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
              Recursos de Apoyo para el Duelo
            </h2>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <p className="text-gray-700 mb-6">
                Además de representación legal, conectamos a las familias con recursos de apoyo:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Home className="w-5 h-5 text-burgundy-700 mr-2 mt-1" />
                    <span>Grupos de apoyo para el duelo en español</span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="w-5 h-5 text-burgundy-700 mr-2 mt-1" />
                    <span>Consejeros especializados en pérdida traumática</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="w-5 h-5 text-burgundy-700 mr-2 mt-1" />
                    <span>Servicios para niños que perdieron padres</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FileText className="w-5 h-5 text-burgundy-700 mr-2 mt-1" />
                    <span>Ayuda con planificación financiera</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-burgundy-700 mr-2 mt-1" />
                    <span>Asistencia con beneficios del gobierno</span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="w-5 h-5 text-burgundy-700 mr-2 mt-1" />
                    <span>Conexiones con organizaciones benéficas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 to-burgundy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="w-16 h-16 mx-auto mb-6 text-white opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Permítanos Luchar por Justicia Mientras Usted Sana
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              En su momento de pérdida, necesita abogados compasivos pero agresivos 
              que busquen justicia para su ser querido.
            </p>
            
            <div className="bg-white text-burgundy-900 p-8 rounded-lg inline-block shadow-2xl">
              <p className="text-3xl font-bold mb-4">YO PELEO POR TI™</p>
              <p className="text-xl mb-2">Consulta Privada y Gratuita</p>
              <p className="text-lg mb-6">Sin Honorarios Si No Ganamos</p>
              <a
                href="tel:18449673536"
                className="bg-burgundy-900 text-white px-10 py-5 rounded-md font-bold text-2xl hover:bg-burgundy-800 transition-all inline-flex items-center"
              >
                <Phone className="mr-3" />
                1-844-YO-PELEO
              </a>
              <p className="mt-6 text-sm">
                Disponible 24/7 • Visitamos Su Hogar • 100% Confidencial
              </p>
            </div>
            
            <div className="mt-8">
              <p className="text-lg">
                "No está solo en esto. Estamos aquí para ayudar a su familia 
                a encontrar justicia y paz."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-700 mb-4">
              Entendemos que puede ser difícil salir de casa en este momento. 
              <strong> Podemos visitarlo</strong> o manejar todo por teléfono y correo.
            </p>
            <div className="bg-white p-6 rounded-lg shadow inline-block">
              <p className="font-semibold text-burgundy-900 mb-2">Oficinas en:</p>
              <p className="text-gray-600">
                Raleigh • Charlotte • Durham • Smithfield • Orlando, FL
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Components */}
      <ChatWidget userId="muerte-injusta-page" language="es" />
      <VoiceAssistant language="es" />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm - Abogados de Muerte Injusta',
            description: 'Abogados compasivos especializados en casos de muerte injusta en Carolina del Norte. Buscamos justicia y compensación para familias en duelo.',
            url: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/muerte-injusta',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '6801 Glenwood Ave',
              addressLocality: 'Raleigh',
              addressRegion: 'NC',
              postalCode: '27612',
              addressCountry: 'US'
            },
            areaServed: ['Raleigh', 'Charlotte', 'Durham', 'Winston-Salem', 'Greensboro', 'North Carolina'],
            priceRange: 'Sin costo inicial - Base de contingencia',
            openingHours: 'Mo-Su 00:00-23:59',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              reviewCount: '43'
            }
          }),
        }}
      />
    </div>
  );
}