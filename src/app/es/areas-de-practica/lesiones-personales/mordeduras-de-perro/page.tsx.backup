import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Dog, AlertTriangle, Baby, Heart, Shield, FileWarning, Hospital, DollarSign, Phone, Scale } from 'lucide-react';

const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});

const VoiceAssistant = dynamic(() => import('@/components/VirtualAssistant/VirtualAssistantWrapper').then(mod => mod.VirtualAssistantWrapper), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Abogados de Mordeduras de Perro en NC | Lesiones Graves | YO PELEO POR TI™',
  description: '¿Atacado por un perro? Abogados expertos en mordeduras de perro en Carolina del Norte. Obtenga compensación por lesiones, trauma y cicatrices. Consulta GRATIS.',
  keywords: 'abogado mordeduras perro Carolina Norte, ataque perro Raleigh, lesiones mordida animal Charlotte, compensación ataque canino, demanda dueño perro NC',
  openGraph: {
    title: 'Abogados de Mordeduras de Perro - Vasquez Law Firm | Carolina del Norte',
    description: 'Víctima de ataque de perro? El dueño es responsable. Luchamos por compensación justa para víctimas y familias. Llame 1-844-YO-PELEO',
    images: [{
      url: '/images/dog-bite-attorney.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogados de Mordeduras de Perro en Carolina del Norte'
    }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/mordeduras-de-perro',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury/dog-bites',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/mordeduras-de-perro',
    },
  },
};

export default function MordedurasDePeroPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-burgundy-900 to-burgundy-800 text-white py-20">
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Dog className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Abogados de Mordeduras de Perro
            </h1>
            <p className="text-2xl md:text-3xl text-gold-400 font-semibold mb-6">
              Los Dueños Son Responsables Por Sus Mascotas
            </p>
            <p className="text-xl mb-8">
              Si usted o su hijo fue atacado por un perro, merece justicia y compensación completa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:18449673536"
                className="bg-red-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-red-700 transition-all transform hover:scale-105 animate-pulse"
              >
                URGENTE: 1-844-YO-PELEO
              </a>
              <Link
                href="/es/consulta-gratuita"
                className="bg-gold-500 text-burgundy-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-gold-400 transition-all"
              >
                Consulta Gratuita Hoy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Alert Section */}
      <section className="bg-yellow-500 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-burgundy-900" />
            <p className="text-lg font-bold text-burgundy-900 text-center">
              ATENCIÓN: Las heridas de perro pueden infectarse rápidamente. 
              Busque atención médica INMEDIATA y llámenos después.
            </p>
            <AlertTriangle className="w-8 h-8 text-burgundy-900" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                Las Mordeduras de Perro Causan Lesiones Físicas y Emocionales Graves
              </h2>
              
              <p className="text-gray-700 mb-6">
                En Carolina del Norte, los dueños de perros son estrictamente responsables cuando 
                su mascota ataca a alguien. No importa si el perro &ldquo;nunca había mordido antes&rdquo; - 
                el dueño debe pagar por todas las lesiones y daños causados.
              </p>

              <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8">
                <Baby className="w-10 h-10 text-red-600 mb-3" />
                <p className="text-lg font-semibold text-burgundy-900">
                  Los niños son las víctimas más frecuentes de ataques de perros
                </p>
                <p className="text-gray-700 mt-2">
                  El 60% de las víctimas son menores de 12 años. Las lesiones faciales en niños 
                  pueden requerir múltiples cirugías reconstructivas durante años.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Tipos de Lesiones por Mordeduras de Perro
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-burgundy-700">
                  <Hospital className="w-8 h-8 text-burgundy-700 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Lesiones Físicas</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Heridas profundas y laceraciones</li>
                    <li>• Daño a nervios y tendones</li>
                    <li>• Fracturas por caídas</li>
                    <li>• Infecciones graves (rabia, tétanos)</li>
                    <li>• Cicatrices permanentes</li>
                    <li>• Desfiguración facial</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-burgundy-700">
                  <Heart className="w-8 h-8 text-burgundy-700 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Trauma Emocional</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Trastorno de estrés postraumático</li>
                    <li>• Miedo extremo a los perros</li>
                    <li>• Ansiedad y depresión</li>
                    <li>• Pesadillas recurrentes</li>
                    <li>• Problemas para dormir</li>
                    <li>• Necesidad de terapia psicológica</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                La Ley de Carolina del Norte Protege a las Víctimas
              </h3>

              <div className="bg-gold-50 p-6 rounded-lg mb-8">
                <Scale className="w-10 h-10 text-burgundy-700 mb-3" />
                <h4 className="font-bold text-burgundy-900 mb-2">Responsabilidad Estricta del Dueño</h4>
                <p className="text-gray-700 mb-3">
                  Bajo la ley de NC, el dueño es responsable aunque:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>✓ El perro nunca haya mordido antes</li>
                  <li>✓ El dueño no supiera que era agresivo</li>
                  <li>✓ El perro estuviera con correa</li>
                  <li>✓ La víctima no provocó al animal</li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Razas de Perros Más Peligrosas en Ataques
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
                <div className="bg-gray-100 p-4 rounded">
                  <p className="font-bold">Pit Bulls</p>
                  <p className="text-sm text-gray-600">65% de muertes</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                  <p className="font-bold">Rottweilers</p>
                  <p className="text-sm text-gray-600">10% de muertes</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                  <p className="font-bold">Pastor Alemán</p>
                  <p className="text-sm text-gray-600">4.6% de muertes</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                  <p className="font-bold">Mastiff</p>
                  <p className="text-sm text-gray-600">3.5% de muertes</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 text-center mb-8">
                *Estadísticas de DogsBite.org. Cualquier perro puede morder - el dueño siempre es responsable.
              </p>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Qué Hacer Después de un Ataque de Perro
              </h3>

              <div className="bg-red-50 p-6 rounded-lg mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Shield className="w-8 h-8 text-red-600 mb-3" />
                    <h4 className="font-bold text-burgundy-900 mb-2">Acciones Inmediatas</h4>
                    <ol className="text-gray-700 space-y-1 text-sm list-decimal list-inside">
                      <li>Busque atención médica urgente</li>
                      <li>Llame a la policía o control animal</li>
                      <li>Identifique al dueño del perro</li>
                      <li>Tome fotos de las heridas</li>
                      <li>Obtenga información de testigos</li>
                    </ol>
                  </div>
                  <div>
                    <FileWarning className="w-8 h-8 text-red-600 mb-3" />
                    <h4 className="font-bold text-burgundy-900 mb-2">Preserve la Evidencia</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• Guarde toda la ropa dañada</li>
                      <li>• Documente el progreso de curación</li>
                      <li>• Mantenga todos los récords médicos</li>
                      <li>• Registre gastos y tiempo perdido</li>
                      <li>• No hable con el seguro del dueño</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compensation Section */}
      <section className="bg-burgundy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Compensación que Podemos Conseguirle
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 p-6 rounded-lg">
                <DollarSign className="w-10 h-10 text-gold-400 mb-3" />
                <h3 className="text-xl font-bold mb-3">Daños Económicos</h3>
                <ul className="space-y-2">
                  <li>• Facturas médicas y hospitalarias</li>
                  <li>• Cirugías reconstructivas</li>
                  <li>• Medicamentos y vacunas</li>
                  <li>• Terapia física y psicológica</li>
                  <li>• Salarios perdidos</li>
                  <li>• Tratamiento futuro</li>
                </ul>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <Heart className="w-10 h-10 text-gold-400 mb-3" />
                <h3 className="text-xl font-bold mb-3">Daños No Económicos</h3>
                <ul className="space-y-2">
                  <li>• Dolor y sufrimiento</li>
                  <li>• Angustia emocional</li>
                  <li>• Cicatrices y desfiguración</li>
                  <li>• Pérdida de calidad de vida</li>
                  <li>• Trauma psicológico</li>
                  <li>• Daños punitivos (casos graves)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Examples */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
              Casos Recientes de Mordeduras de Perro
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-burgundy-900">Niña de 7 años - Charlotte</h3>
                  <span className="text-2xl font-bold text-green-600">$450,000</span>
                </div>
                <p className="text-gray-700 mb-2">
                  Atacada por pit bull del vecino. Lesiones faciales severas requirieron 
                  3 cirugías reconstructivas.
                </p>
                <p className="text-sm text-gray-600">Incluye tratamiento futuro y terapia</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-burgundy-900">Cartero - Raleigh</h3>
                  <span className="text-2xl font-bold text-green-600">$275,000</span>
                </div>
                <p className="text-gray-700 mb-2">
                  Rottweiler suelto atacó durante entrega. Daño permanente en brazo derecho.
                </p>
                <p className="text-sm text-gray-600">Pérdida de capacidad laboral</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-burgundy-900">Mujer embarazada - Durham</h3>
                  <span className="text-2xl font-bold text-green-600">$325,000</span>
                </div>
                <p className="text-gray-700 mb-2">
                  Derribada por dos perros grandes. Complicaciones en embarazo y trauma emocional.
                </p>
                <p className="text-sm text-gray-600">Cuidado prenatal especial incluido</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-burgundy-900">Adolescente - Winston-Salem</h3>
                  <span className="text-2xl font-bold text-green-600">$185,000</span>
                </div>
                <p className="text-gray-700 mb-2">
                  Mordeduras múltiples de pastor alemán. Cicatrices permanentes en piernas.
                </p>
                <p className="text-sm text-gray-600">Tratamiento láser para cicatrices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-8">
              ¿Quién Paga por Sus Lesiones?
            </h2>
            
            <div className="bg-gold-50 p-8 rounded-lg">
              <p className="text-lg text-gray-700 mb-6">
                La mayoría de las veces, el seguro del hogar del dueño del perro cubre las mordeduras. 
                Nosotros nos encargamos de:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Identificar todas las pólizas de seguro aplicables</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Negociar con las aseguradoras agresivamente</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Buscar activos del dueño si no hay seguro</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Documentar todos sus daños completamente</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Luchar por compensación máxima</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Ir a juicio si es necesario</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-red-700 to-burgundy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Dog className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-4xl font-bold mb-6">
              No Deje Que el Trauma de un Ataque de Perro Arruine Su Vida
            </h2>
            <p className="text-xl mb-8">
              Merece compensación completa por sus lesiones físicas y emocionales. 
              Nosotros enfrentamos a los dueños irresponsables y sus aseguradoras.
            </p>
            
            <div className="bg-white text-burgundy-900 p-8 rounded-lg inline-block shadow-2xl">
              <p className="text-3xl font-bold mb-4">YO PELEO POR TI™</p>
              <p className="text-xl mb-2">Consulta y Evaluación GRATIS</p>
              <p className="text-lg mb-6">No Cobramos Si No Ganamos</p>
              <a
                href="tel:18449673536"
                className="bg-red-700 text-white px-10 py-5 rounded-md font-bold text-2xl hover:bg-red-800 transition-all inline-flex items-center"
              >
                <Phone className="mr-3" />
                1-844-YO-PELEO
              </a>
              <p className="mt-6 text-sm">
                Disponible 24/7 • Visitamos Hospitales • Hablamos Español
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Warning */}
      <section className="bg-yellow-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
            <p className="text-lg font-semibold text-gray-800">
              IMPORTANTE: Documente sus heridas AHORA. Las fotos tempranas son evidencia crítica. 
              El seguro del dueño puede contactarlo - NO hable con ellos sin un abogado.
            </p>
          </div>
        </div>
      </section>

      {/* AI Components */}
      <ChatWidget userId="mordeduras-perro-page" language="es" />
      <VoiceAssistant language="es" />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm - Abogados de Mordeduras de Perro',
            description: 'Abogados especializados en casos de mordeduras y ataques de perros en Carolina del Norte. Representamos víctimas de todas las edades.',
            url: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/mordeduras-de-perro',
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
              ratingValue: '4.9',
              reviewCount: '76'
            }
          }),
        }}
      />
    </div>
  );
}