const fs = require('fs').promises;
const path = require('path');

// Complete Spanish page templates
const spanishTemplates = {
  '/es/page.tsx': `import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bufete de Abogados Vasquez - YO PELEO POR TI | Abogados de Inmigración y Lesiones Personales',
  description:
    'Representación legal honesta y confiable a un precio accesible. Más de 35 años de experiencia. Inmigración, lesiones personales, compensación laboral y defensa criminal. Disponible 24/7.',
  openGraph: {
    title: 'Bufete de Abogados Vasquez - YO PELEO POR TI',
    description:
      'Representación legal honesta y confiable. Más de 30,000 casos ganados. Abogado veterano de la Fuerza Aérea de EE.UU. Disponible 24/7 con asistencia de IA en español.',
  },
};

export default function EsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            YO PELEO POR TI
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8">
            Representación legal honesta y confiable a un precio accesible. 
            Más de 35 años luchando por los derechos de nuestra comunidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/es/contacto"
              className="bg-[#C9974D] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#B88740] transition-colors inline-block text-center"
            >
              Consulta Gratuita
            </Link>
            <a
              href="tel:1-844-967-3536"
              className="bg-white text-[#6B1F2E] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              1-844-YO-PELEO
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#6B1F2E]">35+</div>
              <div className="text-gray-600 mt-2">Años de Experiencia</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#6B1F2E]">30,000+</div>
              <div className="text-gray-600 mt-2">Casos Ganados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#6B1F2E]">24/7</div>
              <div className="text-gray-600 mt-2">Disponibilidad</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#6B1F2E]">95%</div>
              <div className="text-gray-600 mt-2">Tasa de Éxito</div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Nuestras Áreas de Práctica
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/es/areas-de-practica/inmigracion" className="group">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#6B1F2E]">
                  Inmigración
                </h3>
                <p className="text-gray-600">
                  Visas, tarjetas verdes, ciudadanía, asilo, defensa de deportación, 
                  reunificación familiar y más.
                </p>
              </div>
            </Link>
            <Link href="/es/areas-de-practica/lesiones-personales" className="group">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#6B1F2E]">
                  Lesiones Personales
                </h3>
                <p className="text-gray-600">
                  Accidentes de auto, resbalones y caídas, lesiones laborales, 
                  negligencia médica y más.
                </p>
              </div>
            </Link>
            <Link href="/es/areas-de-practica/compensacion-laboral" className="group">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#6B1F2E]">
                  Compensación Laboral
                </h3>
                <p className="text-gray-600">
                  Lesiones en el trabajo, beneficios por discapacidad, disputas 
                  con aseguradoras y más.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#C9974D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Necesitas Ayuda Legal?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contacta a nuestros abogados experimentados hoy para una consulta gratuita
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/es/contacto"
              className="bg-white text-[#6B1F2E] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Agendar Consulta
            </Link>
            <a
              href="tel:1-844-967-3536"
              className="bg-[#6B1F2E] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#8B2635] transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              Llamar Ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}`,

  '/es/contacto/page.tsx': `import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contacto - Bufete de Abogados Vasquez',
  description: 'Contáctanos para una consulta gratuita. Oficinas en Raleigh, Charlotte, Durham, Smithfield NC y Orlando FL. Disponible 24/7.',
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl max-w-3xl">
            Estamos aquí para ayudarte. Comunícate con nosotros para una consulta gratuita.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6B1F2E] focus:border-[#6B1F2E]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6B1F2E] focus:border-[#6B1F2E]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6B1F2E] focus:border-[#6B1F2E]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Caso
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6B1F2E] focus:border-[#6B1F2E]">
                    <option>Inmigración</option>
                    <option>Lesiones Personales</option>
                    <option>Compensación Laboral</option>
                    <option>Defensa Criminal</option>
                    <option>Derecho Familiar</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6B1F2E] focus:border-[#6B1F2E]"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#6B1F2E] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#8B2635] transition-colors"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-[#6B1F2E] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Teléfono</h3>
                    <p className="text-gray-600">1-844-YO-PELEO (1-844-967-3536)</p>
                    <p className="text-gray-600">Línea gratuita, disponible 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-[#6B1F2E] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Correo Electrónico</h3>
                    <p className="text-gray-600">leads@vasquezlawfirm.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-[#6B1F2E] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Horario de Oficina</h3>
                    <p className="text-gray-600">Lunes - Viernes: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Servicios de emergencia disponibles 24/7</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-8 mb-4">Nuestras Oficinas</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-[#6B1F2E] pl-4">
                  <h4 className="font-semibold">Raleigh (Oficina Principal)</h4>
                  <p className="text-gray-600">6801 Glenwood Ave, Raleigh, NC 27612</p>
                </div>
                
                <div className="border-l-4 border-[#6B1F2E] pl-4">
                  <h4 className="font-semibold">Charlotte</h4>
                  <p className="text-gray-600">Charlotte, NC</p>
                </div>
                
                <div className="border-l-4 border-[#6B1F2E] pl-4">
                  <h4 className="font-semibold">Durham</h4>
                  <p className="text-gray-600">Durham, NC</p>
                </div>
                
                <div className="border-l-4 border-[#6B1F2E] pl-4">
                  <h4 className="font-semibold">Orlando</h4>
                  <p className="text-gray-600">Orlando, FL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}`,

  '/es/abogados/page.tsx': `import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Nuestros Abogados - Bufete de Abogados Vasquez',
  description: 'Conoce a nuestro equipo de abogados experimentados. Más de 35 años de experiencia combinada luchando por los derechos de nuestros clientes.',
};

export default function AbogadosPage() {
  const attorneys = [
    {
      name: 'William Vasquez',
      title: 'Abogado Principal',
      image: '/images/william-vasquez.jpg',
      bio: 'Veterano de la Fuerza Aérea de EE.UU. con más de 35 años de experiencia legal. Fundador del Bufete de Abogados Vasquez.',
      link: '/william-vasquez-attorney'
    },
    {
      name: 'Judith Parkes',
      title: 'Abogada Senior',
      image: '/images/judith-parkes.jpg',
      bio: 'Especialista en inmigración con amplia experiencia en casos complejos de visa y ciudadanía.',
      link: '/judith-parkes'
    },
    {
      name: 'Christopher Afanador',
      title: 'Abogado Asociado',
      image: '/images/christopher-afanador.jpg',
      bio: 'Enfocado en lesiones personales y compensación laboral, luchando por la justicia de los trabajadores.',
      link: '/attorneys/christopher-afanador'
    },
    {
      name: 'Adrianna Ingram',
      title: 'Abogada Asociada',
      image: '/images/adrianna-ingram.jpg',
      bio: 'Dedicada a casos de derecho familiar e inmigración, ayudando a reunir familias.',
      link: '/attorneys/adrianna-ingram'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Abogados</h1>
          <p className="text-xl max-w-3xl">
            Un equipo dedicado de profesionales legales comprometidos a luchar por tus derechos
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Conoce a Nuestro Equipo</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestros abogados tienen décadas de experiencia combinada y un compromiso 
              inquebrantable con la justicia para nuestros clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {attorneys.map((attorney) => (
              <Link key={attorney.name} href={attorney.link} className="group">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    {/* Attorney image placeholder */}
                    <div className="flex items-center justify-center h-64 bg-gray-300">
                      <span className="text-gray-500">{attorney.name}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-[#6B1F2E]">
                      {attorney.name}
                    </h3>
                    <p className="text-[#C9974D] font-medium mb-3">{attorney.title}</p>
                    <p className="text-gray-600">{attorney.bio}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#C9974D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para Hablar con un Abogado?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Agenda una consulta gratuita con uno de nuestros abogados experimentados
          </p>
          <Link
            href="/es/contacto"
            className="bg-white text-[#6B1F2E] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
          >
            Agendar Consulta Gratuita
          </Link>
        </div>
      </section>
    </div>
  );
}`,
};

async function generateSpanishPages() {
  console.log('Generating proper Spanish content for Spanish pages...');

  for (const [filePath, content] of Object.entries(spanishTemplates)) {
    const fullPath = path.join(__dirname, '../src/app', filePath);

    try {
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content, 'utf8');
      console.log(`✓ Generated: ${filePath}`);
    } catch (error) {
      console.error(`✗ Failed to generate ${filePath}:`, error.message);
    }
  }

  // Also update the Spanish practice area pages
  const practiceAreas = [
    { path: 'inmigracion', name: 'Inmigración' },
    { path: 'lesiones-personales', name: 'Lesiones Personales' },
    { path: 'compensacion-laboral', name: 'Compensación Laboral' },
    { path: 'defensa-criminal', name: 'Defensa Criminal' },
    { path: 'derecho-familia', name: 'Derecho Familiar' },
  ];

  for (const area of practiceAreas) {
    const template = `import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '${area.name} - Bufete de Abogados Vasquez',
  description: 'Servicios legales de ${area.name.toLowerCase()}. Abogados experimentados listos para ayudarte. Consulta gratuita disponible.',
};

export default function ${area.name.replace(/\s+/g, '')}Page() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">${area.name}</h1>
          <p className="text-xl max-w-3xl">
            Abogados experimentados en ${area.name.toLowerCase()} listos para luchar por tus derechos.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p>
              Nuestro equipo de abogados especializados en ${area.name.toLowerCase()} está comprometido 
              a proporcionar representación legal de alta calidad. Con años de experiencia y un historial 
              comprobado de éxito, estamos aquí para ayudarte en cada paso del camino.
            </p>
            
            <h2>¿Por Qué Elegirnos?</h2>
            <ul>
              <li>Más de 35 años de experiencia combinada</li>
              <li>Consultas gratuitas en español</li>
              <li>Disponibles 24/7 para emergencias</li>
              <li>Historial comprobado de casos exitosos</li>
              <li>Representación agresiva y compasiva</li>
            </ul>
            
            <h2>Cómo Podemos Ayudarte</h2>
            <p>
              No importa la complejidad de tu caso, nuestros abogados tienen la experiencia y 
              dedicación necesarias para luchar por el mejor resultado posible. Ofrecemos:
            </p>
            <ul>
              <li>Evaluación gratuita de tu caso</li>
              <li>Estrategias legales personalizadas</li>
              <li>Comunicación clara y constante</li>
              <li>Representación en corte</li>
              <li>Negociación agresiva</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#C9974D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Necesitas Ayuda con ${area.name}?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contacta a nuestros abogados experimentados hoy para una consulta gratuita
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/es/contacto"
              className="bg-white text-[#6B1F2E] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Agendar Consulta
            </Link>
            <a
              href="tel:1-844-967-3536"
              className="bg-[#6B1F2E] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#8B2635] transition-colors inline-block"
            >
              Llamar: 1-844-YO-PELEO
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}`;

    const filePath = path.join(__dirname, `../src/app/es/areas-de-practica/${area.path}/page.tsx`);
    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, template, 'utf8');
      console.log(`✓ Generated: /es/areas-de-practica/${area.path}/page.tsx`);
    } catch (error) {
      console.error(`✗ Failed to generate ${area.path}:`, error.message);
    }
  }
}

async function main() {
  await generateSpanishPages();
  console.log('\nSpanish content generation completed!');
}

main().catch(console.error);
