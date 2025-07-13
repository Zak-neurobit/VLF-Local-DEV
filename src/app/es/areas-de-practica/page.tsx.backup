import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Áreas de Práctica - Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description:
    'Servicios legales integrales en inmigración, lesiones personales, compensación laboral, defensa criminal, derecho familiar y infracciones de tráfico. Mejorados con tecnología IA.',
  keywords:
    'áreas de práctica, inmigración, lesiones personales, compensación laboral, defensa criminal, derecho familiar, infracciones tráfico, abogado español',
  openGraph: {
    title: 'Áreas de Práctica - Bufete de Abogados Vasquez',
    description:
      'Servicios legales integrales mejorados con tecnología IA. 60+ años de experiencia.',
    images: [{ url: '/images/BANNER_TRANS.PNG' }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica',
    },
  },
};

const practiceAreas = [
  {
    id: 'inmigracion',
    title: 'Ley de Inmigración',
    icon: '🌍',
    description:
      'Servicios integrales de inmigración incluyendo peticiones familiares, visas de empleo, naturalización y defensa contra deportación.',
    services: [
      'Inmigración Familiar',
      'Visas de Empleo',
      'Tarjetas Verdes',
      'Ciudadanía/Naturalización',
      'Defensa contra Deportación',
      'DACA/TPS',
    ],
    urgency: 'high' as const,
    href: '/es/areas-de-practica/inmigracion',
  },
  {
    id: 'lesiones-personales',
    title: 'Lesiones Personales',
    icon: '🏥',
    description:
      'Luchando por la máxima compensación para víctimas de accidentes. Sin honorarios a menos que ganemos su caso.',
    services: [
      'Accidentes de Auto',
      'Accidentes de Camión',
      'Accidentes de Motocicleta',
      'Resbalones y Caídas',
      'Negligencia Médica',
      'Muerte Injusta',
    ],
    urgency: 'critical' as const,
    href: '/es/areas-de-practica/lesiones-personales',
  },
  {
    id: 'compensacion-laboral',
    title: 'Compensación Laboral',
    icon: '👷',
    description:
      'Protegiendo los derechos de trabajadores lesionados y asegurando los beneficios que merece.',
    services: [
      'Lesiones Laborales',
      'Enfermedades Ocupacionales',
      'Beneficios por Discapacidad',
      'Tratamiento Médico',
      'Salarios Perdidos',
      'Apelaciones',
    ],
    urgency: 'high' as const,
    href: '/es/areas-de-practica/compensacion-laboral',
  },
  {
    id: 'defensa-criminal',
    title: 'Defensa Criminal',
    icon: '⚖️',
    description: 'Estrategias de defensa agresivas para proteger su libertad y futuro.',
    services: [
      'DWI/DUI',
      'Cargos de Drogas',
      'Asalto',
      'Violencia Doméstica',
      'Robo',
      'Crímenes Federales',
    ],
    urgency: 'critical' as const,
    href: '/es/areas-de-practica/defensa-criminal',
  },
  {
    id: 'derecho-familiar',
    title: 'Derecho Familiar',
    icon: '👨‍👩‍👧‍👦',
    description: 'Representación compasiva para todos los asuntos legales familiares.',
    services: [
      'Divorcio',
      'Custodia de Menores',
      'Manutención Infantil',
      'Pensión Alimenticia',
      'División de Propiedad',
      'Adopción',
    ],
    urgency: 'medium' as const,
    href: '/es/areas-de-practica/derecho-familia',
  },
  {
    id: 'infracciones-transito',
    title: 'Infracciones de Tráfico',
    icon: '🚗',
    description: 'Protegiendo su récord de manejo y minimizando penalidades.',
    services: [
      'Multas por Exceso de Velocidad',
      'Conducción Imprudente',
      'Suspensión de Licencia',
      'Violaciones CDL',
      'Atropello y Fuga',
      'Problemas de Seguro',
    ],
    urgency: 'medium' as const,
    href: '/es/areas-de-practica/infracciones-transito',
  },
];

const urgencyColors = {
  critical: 'from-red-600 to-red-800 border-red-500',
  high: 'from-orange-600 to-orange-800 border-orange-500',
  medium: 'from-blue-600 to-blue-800 border-blue-500',
};

const urgencyLabels = {
  critical: '🚨 CRÍTICO',
  high: '⚡ URGENTE',
  medium: '📅 IMPORTANTE',
};

export default function AreasDePracticaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="animate-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Áreas de Práctica
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto">
              Servicios Legales Integrales con Más de 60 Años de Experiencia Combinada
            </p>
            <p className="text-lg mb-10 text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Nuestro equipo de abogados experimentados ofrece representación legal experta en todas
              las áreas principales del derecho. No importa su situación legal, tenemos la
              experiencia y dedicación para luchar por sus derechos y obtener los mejores resultados
              posibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1-844-YO-PELEO"
                className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-400 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Llamar Ahora: 1-844-YO-PELEO
              </a>
              <a
                href="/es/contacto"
                className="border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 hover:text-black transition-all duration-300"
              >
                Consulta GRATIS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cómo Podemos Ayudarle</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Seleccione el área legal que necesita para obtener más información sobre cómo podemos
              representarlo
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {practiceAreas.map((area, index) => (
              <div
                key={area.id}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105"
              >
                {/* Urgency Badge */}
                <div
                  className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${urgencyColors[area.urgency]} text-white`}
                >
                  {urgencyLabels[area.urgency]}
                </div>

                <div className="relative z-10 p-6">
                  {/* Icon and Title */}
                  <div className="flex items-start mb-4">
                    <div className="text-3xl mr-4 mt-1">{area.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                        {area.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 text-sm leading-relaxed">{area.description}</p>

                  {/* Services */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-yellow-400 mb-3 uppercase tracking-wide">
                      Servicios Incluidos:
                    </h4>
                    <div className="space-y-2">
                      {area.services.slice(0, 4).map((service, serviceIndex) => (
                        <div key={serviceIndex} className="flex items-center text-xs text-gray-300">
                          <span className="text-yellow-500 mr-2">✓</span>
                          {service}
                        </div>
                      ))}
                      {area.services.length > 4 && (
                        <div className="text-xs text-gray-400 italic">
                          +{area.services.length - 4} servicios más...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={area.href}
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-4 py-2 rounded-lg font-bold text-sm hover:from-yellow-400 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Ver Detalles
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por Qué Elegirnos?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Combinamos experiencia, dedicación y resultados comprobados
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">60+</div>
              <div className="text-sm text-gray-300">Años de Experiencia Combinada</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">30K+</div>
              <div className="text-sm text-gray-300">Clientes Ayudados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">98%</div>
              <div className="text-sm text-gray-300">Tasa de Éxito</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-sm text-gray-300">Disponibilidad</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            No Espere Más Para Obtener la Ayuda Legal Que Necesita
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Consulta gratuita disponible. Hablamos español. Estamos aquí para luchar por sus
            derechos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1-844-YO-PELEO"
              className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-400 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Llamar Ahora: 1-844-YO-PELEO
            </a>
            <a
              href="/es/contacto"
              className="border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 hover:text-black transition-all duration-300"
            >
              Consulta Gratis Online
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Consulta gratuita • No cobra a menos que ganemos • Disponible 24/7
          </p>
        </div>
      </section>
    </div>
  );
}
