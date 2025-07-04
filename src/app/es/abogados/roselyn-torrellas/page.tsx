import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Roselyn V. Torrellas - Abogado - Vasquez Law Firm, PLLC',
  description: '',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Roselyn V. Torrellas - Abogado</h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Consulta Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-white text-burgundy-900 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                1-844-YO-PELEO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-4">Family Law Attorney</h2>
                <p className="text-gray-700">
                  Roselyn Torrellas se especializa en asuntos de derecho familiar incluyendo
                  divorcio, custodia de menores y asuntos de manutención.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Educación</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>J.D., University of Miami School of Law</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Admisiones al Colegio de Abogados
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>North Carolina</li>
                  <li>Florida</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Áreas de Práctica</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Family Law</li>
                  <li>Divorce</li>
                  <li>Child Custody</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 mb-4">
              ¿Listo para Comenzar?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Contacte a nuestros abogados experimentados hoy para una consulta gratuita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-burgundy-700 text-white font-bold rounded-full hover:bg-burgundy-800 transition-colors"
              >
                Programar Consulta
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                Llamar Ahora
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
