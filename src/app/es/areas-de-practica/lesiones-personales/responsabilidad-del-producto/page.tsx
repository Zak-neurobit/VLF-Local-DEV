import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Package, AlertTriangle, Car, Pill, Baby, Zap, Shield, DollarSign, Phone, Scale } from 'lucide-react';

const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});

const VoiceAssistant = dynamic(() => import('@/components/VirtualAssistant/VirtualAssistantWrapper').then(mod => mod.VirtualAssistantWrapper), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Abogados de Responsabilidad del Producto en NC | Productos Defectuosos | YO PELEO POR TI™',
  description: '¿Herido por producto defectuoso? Abogados expertos en demandas contra fabricantes en Carolina del Norte. Autos, medicamentos, juguetes peligrosos. Consulta GRATIS.',
  keywords: 'abogado productos defectuosos Carolina Norte, responsabilidad fabricante Raleigh, demanda producto peligroso Charlotte, recall productos NC, compensación defectos diseño',
  openGraph: {
    title: 'Abogados de Responsabilidad del Producto - Vasquez Law Firm | NC',
    description: 'Los productos defectuosos causan miles de lesiones. Hacemos responsables a fabricantes negligentes. Sin costo inicial. Llame 1-844-YO-PELEO',
    images: [{
      url: '/images/product-liability-attorney.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogados de Responsabilidad del Producto en Carolina del Norte'
    }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/responsabilidad-del-producto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury/product-liability',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/responsabilidad-del-producto',
    },
  },
};

export default function ResponsabilidadDelProductoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-burgundy-900 to-black text-white py-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Package className="w-20 h-20 mx-auto mb-6 text-red-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Abogados de Responsabilidad del Producto
            </h1>
            <p className="text-2xl md:text-3xl text-gold-400 font-semibold mb-6">
              Cuando los Productos Fallan, las Empresas Pagan
            </p>
            <p className="text-xl mb-8">
              Los consumidores confían en que los productos sean seguros. 
              Cuando esa confianza se rompe, luchamos por justicia.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:18449673536"
                className="bg-red-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-red-700 transition-all transform hover:scale-105 animate-pulse"
              >
                PRODUCTO PELIGROSO? 1-844-YO-PELEO
              </a>
              <Link
                href="/es/consulta-gratuita"
                className="bg-gold-500 text-black px-8 py-4 rounded-md font-bold text-lg hover:bg-gold-400 transition-all"
              >
                Evaluación Gratuita del Caso
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Alert Section */}
      <section className="bg-red-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4">
            <AlertTriangle className="w-8 h-8 animate-bounce" />
            <p className="text-lg font-semibold text-center">
              ALERTA: Si fue herido por un producto, GUÁRDELO como evidencia. 
              No lo devuelva a la tienda - es prueba crítica para su caso.
            </p>
            <AlertTriangle className="w-8 h-8 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                Los Fabricantes Deben Garantizar la Seguridad de Sus Productos
              </h2>
              
              <p className="text-gray-700 mb-6">
                Cada año, productos defectuosos causan millones de lesiones y miles de muertes 
                en Estados Unidos. Desde autos con defectos mortales hasta juguetes que dañan 
                a niños, las empresas que priorizan ganancias sobre seguridad deben ser 
                responsabilizadas.
              </p>

              <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8">
                <Scale className="w-10 h-10 text-red-600 mb-3" />
                <p className="text-lg font-semibold text-gray-900">
                  Bajo la ley de Carolina del Norte, los fabricantes son estrictamente responsables 
                  por productos defectuosos - no necesita probar negligencia.
                </p>
                <p className="text-gray-700 mt-2">
                  Si el producto era defectuoso y causó lesiones, el fabricante debe pagar.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Tres Tipos de Defectos de Productos
              </h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg border-t-4 border-red-600">
                  <h4 className="font-bold text-burgundy-900 mb-2">1. Defectos de Diseño</h4>
                  <p className="text-gray-700 mb-2">
                    El producto es inherentemente peligroso por su diseño.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Ejemplo: SUV que vuelca fácilmente en curvas normales.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-t-4 border-orange-600">
                  <h4 className="font-bold text-burgundy-900 mb-2">2. Defectos de Fabricación</h4>
                  <p className="text-gray-700 mb-2">
                    Error durante la producción hace el producto peligroso.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Ejemplo: Frenos de auto mal instalados en fábrica.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-t-4 border-yellow-600">
                  <h4 className="font-bold text-burgundy-900 mb-2">3. Falta de Advertencias</h4>
                  <p className="text-gray-700 mb-2">
                    No informar sobre peligros conocidos del producto.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Ejemplo: Medicamento sin advertir efectos secundarios graves.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Productos Defectuosos Comunes que Manejamos
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Car className="w-10 h-10 text-red-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Vehículos y Partes de Auto</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Airbags defectuosos (Takata, otros)</li>
                    <li>• Llantas que explotan</li>
                    <li>• Frenos que fallan</li>
                    <li>• Cinturones de seguridad rotos</li>
                    <li>• Tanques de gas que explotan</li>
                    <li>• Sistemas de ignición defectuosos</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Pill className="w-10 h-10 text-red-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Medicamentos y Dispositivos Médicos</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Medicamentos con efectos mortales</li>
                    <li>• Implantes defectuosos (cadera, rodilla)</li>
                    <li>• Mallas quirúrgicas tóxicas</li>
                    <li>• Marcapasos que fallan</li>
                    <li>• Anticonceptivos peligrosos</li>
                    <li>• Jeringas contaminadas</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Baby className="w-10 h-10 text-red-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Productos para Niños</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Juguetes con partes pequeñas</li>
                    <li>• Cunas que colapsan</li>
                    <li>• Asientos de auto inseguros</li>
                    <li>• Productos con plomo/tóxicos</li>
                    <li>• Andadores peligrosos</li>
                    <li>• Ropa inflamable</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Zap className="w-10 h-10 text-red-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Productos del Hogar</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Electrodomésticos que causan incendios</li>
                    <li>• Herramientas eléctricas defectuosas</li>
                    <li>• Calentadores peligrosos</li>
                    <li>• Escaleras que colapsan</li>
                    <li>• Productos químicos mal etiquetados</li>
                    <li>• Muebles inestables</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Señales de que Tiene un Caso de Producto Defectuoso
              </h3>

              <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                <AlertTriangle className="w-10 h-10 text-yellow-600 mb-3" />
                <p className="font-semibold text-burgundy-900 mb-3">
                  Considere una demanda si:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ El producto funcionó mal durante uso normal</li>
                  <li>✓ No había advertencias adecuadas sobre el peligro</li>
                  <li>✓ Otros han reportado problemas similares</li>
                  <li>✓ Hay un recall o retiro del producto</li>
                  <li>✓ El producto no cumplió estándares de seguridad</li>
                  <li>✓ Las instrucciones eran confusas o incorrectas</li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Por Qué Necesita Abogados Especializados
              </h3>

              <div className="bg-burgundy-50 p-8 rounded-lg mb-8">
                <Shield className="w-12 h-12 text-burgundy-700 mb-4" />
                <p className="text-gray-700 mb-4">
                  Los casos de productos defectuosos son complejos y requieren:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-burgundy-900 mb-2">Recursos Extensivos</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• Ingenieros expertos</li>
                      <li>• Análisis de laboratorio</li>
                      <li>• Reconstrucción de accidentes</li>
                      <li>• Investigación de la empresa</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-burgundy-900 mb-2">Experiencia Legal</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• Conocimiento de regulaciones federales</li>
                      <li>• Historial contra grandes corporaciones</li>
                      <li>• Acceso a casos similares</li>
                      <li>• Capacidad de litigio nacional</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Pasos Críticos Si Fue Herido por un Producto
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-burgundy-900">Preserve la Evidencia</h4>
                    <p className="text-gray-700">NO tire el producto, empaque, recibos o instrucciones.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-burgundy-900">Documente Todo</h4>
                    <p className="text-gray-700">Fotos del producto, lesiones, lugar del incidente.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-burgundy-900">Busque Atención Médica</h4>
                    <p className="text-gray-700">Documente todas las lesiones y tratamientos.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-burgundy-900">No Hable con la Empresa</h4>
                    <p className="text-gray-700">Pueden usar sus palabras en su contra.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Recalls Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
              Recalls Recientes que Afectan a Carolina del Norte
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-3">
                  <Car className="w-8 h-8 text-red-600 mr-3" />
                  <h3 className="font-bold text-burgundy-900">Vehículos</h3>
                </div>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Ford F-150 - Problemas de transmisión</li>
                  <li>• Honda CR-V - Defectos de motor</li>
                  <li>• Tesla Model 3 - Sistema de autopilot</li>
                  <li>• GM pickups - Frenos defectuosos</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-3">
                  <Package className="w-8 h-8 text-red-600 mr-3" />
                  <h3 className="font-bold text-burgundy-900">Productos de Consumo</h3>
                </div>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Peloton - Caminadoras peligrosas</li>
                  <li>• Samsung - Lavadoras que explotan</li>
                  <li>• IKEA - Muebles que vuelcan</li>
                  <li>• Instant Pot - Ollas a presión defectuosas</li>
                </ul>
              </div>
            </div>
            
            <p className="text-center mt-8 text-gray-600">
              ¿Su producto no está en la lista? Aún puede tener un caso. Contáctenos para evaluación gratuita.
            </p>
          </div>
        </div>
      </section>

      {/* Case Results */}
      <section className="bg-burgundy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Resultados Contra Fabricantes Negligentes
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$2.8M</p>
                <h3 className="text-xl font-bold mb-2">Airbag Defectuoso</h3>
                <p>Airbag no se desplegó en choque frontal. Lesiones cerebrales traumáticas. 
                   Fabricante conocía el defecto pero no hizo recall.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$1.5M</p>
                <h3 className="text-xl font-bold mb-2">Medicamento Peligroso</h3>
                <p>Medicamento para diabetes causó falla renal. Empresa ocultó resultados 
                   de pruebas mostrando riesgos graves.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$975K</p>
                <h3 className="text-xl font-bold mb-2">Juguete Tóxico</h3>
                <p>Niño de 3 años envenenado por plomo en juguete importado. 
                   Daño neurológico permanente. Importador no hizo pruebas.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$3.2M</p>
                <h3 className="text-xl font-bold mb-2">Escalera Defectuosa</h3>
                <p>Trabajador cayó cuando escalera colapsó. Defecto de diseño conocido. 
                   Parálisis parcial permanente.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Companies Must Pay Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-burgundy-900 mb-8">
              Por Qué las Empresas Deben Pagar
            </h2>
            
            <div className="bg-gold-50 p-8 rounded-lg">
              <DollarSign className="w-12 h-12 text-burgundy-700 mx-auto mb-4" />
              <p className="text-lg text-gray-700 mb-6">
                Las demandas por productos defectuosos no solo buscan compensación individual. 
                También:
              </p>
              
              <ul className="text-left inline-block space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Fuerzan a empresas a hacer productos más seguros</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Previenen futuras lesiones y muertes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Castigan a quienes priorizan ganancias sobre seguridad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Compensan completamente a víctimas inocentes</span>
                </li>
              </ul>
              
              <p className="mt-6 font-semibold text-burgundy-900">
                Su caso puede salvar vidas futuras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-red-900 to-burgundy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Package className="w-16 h-16 mx-auto mb-6 text-red-400" />
            <h2 className="text-4xl font-bold mb-6">
              No Deje Que las Grandes Corporaciones Se Salgan con la Suya
            </h2>
            <p className="text-xl mb-8">
              Tienen equipos de abogados protegiendo sus intereses. 
              Usted merece la misma protección agresiva.
            </p>
            
            <div className="bg-white text-burgundy-900 p-8 rounded-lg inline-block shadow-2xl">
              <p className="text-3xl font-bold mb-4">YO PELEO POR TI™</p>
              <p className="text-xl mb-2">Evaluación 100% GRATUITA</p>
              <p className="text-lg mb-6">No Cobramos Si No Ganamos</p>
              <a
                href="tel:18449673536"
                className="bg-red-700 text-white px-10 py-5 rounded-md font-bold text-2xl hover:bg-red-800 transition-all inline-flex items-center"
              >
                <Phone className="mr-3" />
                1-844-YO-PELEO
              </a>
              <p className="mt-6 text-sm">
                Experiencia Nacional • Servicio Local • Hablamos Español
              </p>
            </div>
            
            <div className="mt-8 bg-yellow-400 text-black p-4 rounded-lg inline-block">
              <p className="font-bold">
                ⚠️ ACTÚE RÁPIDO: Límites de tiempo estrictos aplican. 
                La evidencia desaparece. Las empresas destruyen documentos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Info */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-700 mb-4">
              Representamos víctimas de productos defectuosos en todo Carolina del Norte 
              y podemos manejar casos nacionales a través de asociaciones.
            </p>
            <p className="font-semibold text-burgundy-900">
              Raleigh • Charlotte • Durham • Todo NC • Casos Nacionales
            </p>
          </div>
        </div>
      </section>

      {/* AI Components */}
      <ChatWidget userId="responsabilidad-producto-page" language="es" />
      <VoiceAssistant language="es" />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm - Abogados de Responsabilidad del Producto',
            description: 'Abogados especializados en demandas por productos defectuosos, recalls, defectos de diseño y fabricación en Carolina del Norte.',
            url: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/responsabilidad-del-producto',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '6801 Glenwood Ave',
              addressLocality: 'Raleigh',
              addressRegion: 'NC',
              postalCode: '27612',
              addressCountry: 'US'
            },
            areaServed: ['Raleigh', 'Charlotte', 'Durham', 'Winston-Salem', 'Greensboro', 'North Carolina', 'United States'],
            priceRange: 'Sin costo inicial - Base de contingencia',
            openingHours: 'Mo-Su 00:00-23:59',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '67'
            }
          }),
        }}
      />
    </div>
  );
}