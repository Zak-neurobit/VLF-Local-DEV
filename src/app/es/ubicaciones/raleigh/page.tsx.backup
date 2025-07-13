import { Metadata } from 'next';
import Link from 'next/link';
import { Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Raleigh, NC | Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description: 'Abogados de inmigración, lesiones personales y defensa criminal. Más de 30,000 casos ganados. Consulta gratuita. Disponible 24/7.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Raleigh, NC</h1>
          <p className="text-xl max-w-3xl">
            YO PELEO POR TI™ - Representación legal confiable con más de 60 años de experiencia combinada.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">¿Necesita Ayuda Legal?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Contacte a nuestros abogados experimentados hoy para una consulta gratuita. 
              Disponible 24/7 para ayudarle con sus necesidades legales.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/es/contacto"
              className="bg-[#C9974D] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#B88740] transition-colors inline-block text-center"
            >
              Agendar Consulta Gratuita
            </Link>
            <a
              href="tel:1-844-967-3536"
              className="bg-white text-[#6B1F2E] border-2 border-[#6B1F2E] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#6B1F2E] hover:text-white transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              1-844-YO-PELEO
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
