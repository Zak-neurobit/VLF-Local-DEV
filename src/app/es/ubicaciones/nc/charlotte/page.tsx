import { Metadata } from 'next';
import { LocationPageTemplateFixed } from '@/components/locations/LocationPageTemplateFixed';

export const metadata: Metadata = {
  title: `Abogado de Inmigración y Defensa Criminal en Charlotte NC | Vasquez Law Firm`,
  description: `Abogados experimentados en Charlotte sirviendo al Condado de Mecklenburg. Ley de inmigración, defensa criminal, lesiones personales, derecho familiar. Consulta gratuita.`,
  keywords: `abogado de inmigración Charlotte, abogado defensa criminal Charlotte, abogado lesiones personales Charlotte, abogado DWI Charlotte, abogado Condado Mecklenburg`,
  openGraph: {
    title: `Abogados de Inmigración y Defensa Criminal en Charlotte - Vasquez Law Firm`,
    description: `Representación legal de confianza en Charlotte, NC. Inmigración, defensa criminal, lesiones personales. Llame 1-844-YO-PELEO.`,
    images: ['/og-charlotte.jpg'],
    locale: 'es_ES',
    alternateLocale: 'en_US',
  },
  alternates: {
    languages: {
      'en-US': `/locations/nc/charlotte`,
      'es-ES': `/es/ubicaciones/nc/charlotte`,
    },
  },
};

export default function CharlotteNCPageES() {
  return (
    <LocationPageTemplateFixed
      city="Charlotte"
      state="NC"
      language="es"
      nearbyOffice={{
        name: 'Oficina de Charlotte',
        address: '5701 Executive Center Dr, Ste 103, Charlotte, NC 28212',
        phone: '(704) 266-2998',
      }}
    />
  );
}