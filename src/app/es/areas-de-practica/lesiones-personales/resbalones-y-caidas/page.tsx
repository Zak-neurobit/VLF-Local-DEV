import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AlertTriangle, Home, Store, Building2, Construction, ShieldAlert, Camera, FileText, DollarSign, Phone } from 'lucide-react';

const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});

const VoiceAssistant = dynamic(() => import('@/components/VirtualAssistant/VirtualAssistantWrapper').then(mod => mod.VirtualAssistantWrapper), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Abogados de Resbalones y Caídas en NC | Responsabilidad de Locales | YO PELEO POR TI™',
  description: '¿Se cayó en una tienda, restaurante o propiedad privada? Abogados expertos en resbalones y caídas en Raleigh, Charlotte. Consulta GRATIS. Hablamos español.',
  keywords: 'abogado resbalones caídas Carolina Norte, slip and fall español, accidente tienda Walmart, caída restaurante, lesiones local comercial, demanda resbalón NC',
  openGraph: {
    title: 'Abogados de Resbalones y Caídas - Vasquez Law Firm | Carolina del Norte',
    description: 'Lesionado por condiciones peligrosas en una propiedad? Hacemos responsables a los dueños negligentes. Sin costo inicial. Llame 1-844-YO-PELEO',
    images: [{
      url: '/images/slip-fall-attorney.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogados de Resbalones y Caídas en Carolina del Norte'
    }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/resbalones-y-caidas',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury/premises-liability',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/resbalones-y-caidas',
    },
  },
};

export default function ResbalonesYCaidasPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-burgundy-900 to-burgundy-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AlertTriangle className="w-16 h-16 mx-auto mb-6 text-yellow-400 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Abogados de Resbalones y Caídas
            </h1>
            <p className="text-2xl md:text-3xl text-gold-400 font-semibold mb-6">
              Los Dueños Son Responsables de Su Seguridad
            </p>
            <p className="text-xl mb-8">
              Si se lesionó por condiciones peligrosas en una propiedad, 
              tiene derecho a compensación. No es su culpa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:18449673536"
                className="bg-gold-500 text-burgundy-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-gold-400 transition-all transform hover:scale-105"
              >
                Consulta GRATIS: 1-844-YO-PELEO
              </a>
              <Link
                href="/es/consulta-gratuita"
                className="border-2 border-white bg-transparent px-8 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-burgundy-900 transition-all"
              >
                Evalúe Su Caso Ahora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Common Locations Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-8">
            Lugares Comunes de Resbalones y Caídas en Carolina del Norte
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <Store className="w-12 h-12 mx-auto mb-3 text-burgundy-700" />
              <h3 className="font-bold mb-2">Tiendas</h3>
              <p className="text-sm text-gray-600">Walmart, Target, Food Lion, Harris Teeter</p>
            </div>
            <div className="text-center">
              <Home className="w-12 h-12 mx-auto mb-3 text-burgundy-700" />
              <h3 className="font-bold mb-2">Restaurantes</h3>
              <p className="text-sm text-gray-600">McDonald's, Bojangles, restaurantes locales</p>
            </div>
            <div className="text-center">
              <Building2 className="w-12 h-12 mx-auto mb-3 text-burgundy-700" />
              <h3 className="font-bold mb-2">Edificios</h3>
              <p className="text-sm text-gray-600">Apartamentos, oficinas, hoteles</p>
            </div>
            <div className="text-center">
              <Construction className="w-12 h-12 mx-auto mb-3 text-burgundy-700" />
              <h3 className="font-bold mb-2">Áreas Públicas</h3>
              <p className="text-sm text-gray-600">Aceras, estacionamientos, parques</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                Sus Derechos Después de un Resbalón o Caída
              </h2>
              
              <p className="text-gray-700 mb-6">
                En Carolina del Norte, los dueños de propiedades tienen la obligación legal de mantener 
                sus locales seguros. Cuando fallan en esta responsabilidad y usted se lesiona, 
                tienen que pagar por los daños causados.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                <ShieldAlert className="w-8 h-8 text-yellow-600 mb-3" />
                <p className="text-lg font-semibold text-gray-900">
                  ¡IMPORTANTE! No firme nada ni hable con el seguro de la propiedad sin un abogado. 
                  Pueden usar sus palabras en su contra.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Condiciones Peligrosas que Causan Caídas
              </h3>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-burgundy-900 mb-2">Pisos Mojados o Resbalosos</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Derrames no limpiados</li>
                    <li>• Pisos recién trapeados sin señales</li>
                    <li>• Entradas mojadas por lluvia</li>
                    <li>• Cera excesiva en pisos</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-burgundy-900 mb-2">Defectos en el Piso</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Alfombras rotas o sueltas</li>
                    <li>• Baldosas levantadas</li>
                    <li>• Hoyos en el estacionamiento</li>
                    <li>• Grietas en aceras</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-burgundy-900 mb-2">Iluminación Inadecuada</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Escaleras oscuras</li>
                    <li>• Estacionamientos sin luz</li>
                    <li>• Pasillos mal iluminados</li>
                    <li>• Focos fundidos no reemplazados</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-burgundy-900 mb-2">Obstáculos y Desorden</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Cajas en pasillos</li>
                    <li>• Cables sueltos</li>
                    <li>• Mercancía mal colocada</li>
                    <li>• Basura o escombros</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Lo Que Necesitamos Probar para Ganar Su Caso
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-burgundy-900">El dueño sabía o debía saber del peligro</h4>
                    <p className="text-gray-700">La condición peligrosa existía por suficiente tiempo.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-burgundy-900">No arreglaron el problema ni pusieron advertencias</h4>
                    <p className="text-gray-700">Fallaron en su deber de mantener la propiedad segura.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-burgundy-900">Usted se lesionó como resultado directo</h4>
                    <p className="text-gray-700">Sus lesiones fueron causadas por la negligencia del dueño.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Pasos Críticos Después de Su Caída
              </h3>

              <div className="bg-red-50 p-6 rounded-lg mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Camera className="w-10 h-10 text-red-600 mb-3" />
                    <h4 className="font-bold text-burgundy-900 mb-2">1. Documente Todo</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>✓ Tome fotos del área peligrosa</li>
                      <li>✓ Fotografíe sus lesiones</li>
                      <li>✓ Guarde su ropa y zapatos</li>
                      <li>✓ Obtenga video de seguridad si es posible</li>
                    </ul>
                  </div>
                  <div>
                    <FileText className="w-10 h-10 text-red-600 mb-3" />
                    <h4 className="font-bold text-burgundy-900 mb-2">2. Reporte y Busque Ayuda</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>✓ Informe al gerente inmediatamente</li>
                      <li>✓ Pida una copia del reporte</li>
                      <li>✓ Obtenga nombres de testigos</li>
                      <li>✓ Busque atención médica urgente</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compensation Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
              Compensación que Puede Obtener
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-bold text-burgundy-900 mb-2">Gastos Médicos</h3>
                <p className="text-gray-700">
                  Emergencia, cirugías, terapia física, medicamentos, tratamiento futuro
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-bold text-burgundy-900 mb-2">Pérdida de Ingresos</h3>
                <p className="text-gray-700">
                  Salarios perdidos, incapacidad temporal o permanente, pérdida de oportunidades
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-bold text-burgundy-900 mb-2">Dolor y Sufrimiento</h3>
                <p className="text-gray-700">
                  Compensación por dolor físico, angustia emocional, pérdida de calidad de vida
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Examples */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
              Casos Exitosos de Resbalones y Caídas
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gold-50 p-6 rounded-lg border-l-4 border-gold-500">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-burgundy-900">Caída en Supermercado - Charlotte</h3>
                  <span className="text-2xl font-bold text-green-600">$385,000</span>
                </div>
                <p className="text-gray-700">
                  Cliente resbaló en derrame de aceite no limpiado. Fractura de cadera requirió cirugía.
                </p>
              </div>
              
              <div className="bg-gold-50 p-6 rounded-lg border-l-4 border-gold-500">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-burgundy-900">Escaleras Defectuosas - Raleigh</h3>
                  <span className="text-2xl font-bold text-green-600">$250,000</span>
                </div>
                <p className="text-gray-700">
                  Inquilino cayó por barandal roto. Lesiones de espalda permanentes.
                </p>
              </div>
              
              <div className="bg-gold-50 p-6 rounded-lg border-l-4 border-gold-500">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-burgundy-900">Estacionamiento Oscuro - Durham</h3>
                  <span className="text-2xl font-bold text-green-600">$175,000</span>
                </div>
                <p className="text-gray-700">
                  Empleada cayó en hoyo no visible. Tobillo roto y pérdida de trabajo.
                </p>
              </div>
            </div>
            
            <p className="text-center mt-6 text-sm text-gray-600">
              *Resultados específicos de cada caso. Los montos varían según las circunstancias.
            </p>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="bg-burgundy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Por Qué Somos los Mejores para Su Caso
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-bold text-gold-400 mb-4">Experiencia Probada</h3>
                <ul className="space-y-2">
                  <li>✓ Más de 35 años en lesiones personales</li>
                  <li>✓ Conocemos las tácticas de las aseguradoras</li>
                  <li>✓ Récord de casos ganados en NC</li>
                  <li>✓ Millones recuperados para clientes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gold-400 mb-4">Servicio Personal</h3>
                <ul className="space-y-2">
                  <li>✓ Atención 100% en español</li>
                  <li>✓ Disponibles 24/7 para emergencias</li>
                  <li>✓ Visitamos hospitales y hogares</li>
                  <li>✓ Trato directo con el abogado</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gold-500 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 mb-6">
              No Deje Que Le Echen la Culpa por Su Caída
            </h2>
            <p className="text-xl text-burgundy-800 mb-8">
              Las grandes empresas tienen equipos legales. Usted también merece representación fuerte.
            </p>
            
            <div className="bg-white p-8 rounded-lg inline-block shadow-xl">
              <p className="text-3xl font-bold text-burgundy-900 mb-4">
                YO PELEO POR TI™
              </p>
              <p className="text-xl mb-6">Consulta y Evaluación 100% GRATIS</p>
              <a
                href="tel:18449673536"
                className="bg-burgundy-900 text-white px-10 py-4 rounded-md font-bold text-2xl hover:bg-burgundy-800 transition-all inline-flex items-center"
              >
                <Phone className="mr-3" />
                1-844-YO-PELEO
              </a>
              <p className="mt-4 text-gray-600">
                No Paga Nada Si No Ganamos Su Caso
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-700 mb-2">Representamos víctimas en todo Carolina del Norte</p>
          <p className="font-semibold">Raleigh • Charlotte • Durham • Winston-Salem • Greensboro • Smithfield</p>
        </div>
      </section>

      {/* AI Components */}
      <ChatWidget userId="resbalones-caidas-page" language="es" />
      <VoiceAssistant language="es" />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm - Abogados de Resbalones y Caídas',
            description: 'Abogados especializados en casos de resbalones y caídas, responsabilidad de locales en Carolina del Norte. Consulta gratuita en español.',
            url: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/resbalones-y-caidas',
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
            priceRange: 'Contingencia - Solo cobramos si ganamos',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '93'
            }
          }),
        }}
      />
    </div>
  );
}