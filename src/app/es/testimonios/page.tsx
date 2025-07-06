import { Metadata } from 'next';
import Link from 'next/link';
import { Star, Phone, MapPin, Calendar } from 'lucide-react';
import testimonials from '@/data/spanish-testimonials.json';

export const metadata: Metadata = {
  title: 'Testimonios del Cliente | Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description: 'Lea lo que nuestros clientes dicen sobre nosotros. Más de 30,000 casos ganados. Abogados de inmigración, lesiones personales y defensa criminal.',
};

export default function TestimoniosPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Testimonios del Cliente</h1>
          <p className="text-xl max-w-3xl">
            Vea lo que nuestros clientes dicen sobre nosotros. Más de 60 años de experiencia combinada sirviendo a la comunidad hispana.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-[#C9974D] text-[#C9974D]" />
              ))}
            </div>
            <span className="text-lg">4.5 de 5.0 basado en 363 reseñas</span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#C9974D] text-[#C9974D]" />
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {testimonial.date}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.review}&rdquo;</p>
                
                <div className="border-t pt-4">
                  <p className="font-semibold text-[#6B1F2E]">{testimonial.name}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">¿Necesita Ayuda Legal?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Únase a los miles de clientes satisfechos que hemos ayudado. 
              Contacte a nuestros abogados experimentados hoy para una consulta gratuita.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-[#6B1F2E] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">30,000+ Casos Ganados</h3>
              <p className="text-gray-600">Experiencia comprobada en inmigración, lesiones personales y defensa criminal</p>
            </div>
            <div className="text-center">
              <div className="bg-[#6B1F2E] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Disponible 24/7</h3>
              <p className="text-gray-600">Siempre estamos aquí cuando nos necesite, día o noche</p>
            </div>
            <div className="text-center">
              <div className="bg-[#6B1F2E] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Equipo Bilingüe</h3>
              <p className="text-gray-600">Todo nuestro equipo habla español e inglés con fluidez</p>
            </div>
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