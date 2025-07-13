import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Hacer un Pago | Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description: 'Realice pagos seguros a Vasquez Law Firm a través de nuestro socio de pago de confianza, LawPay. Procesamiento seguro para honorarios legales y anticipos.',
  keywords: 'hacer pago, pagar abogado, LawPay, pago seguro, honorarios legales, Vasquez Law Firm',
  openGraph: {
    title: 'Hacer un Pago | Bufete de Abogados Vasquez',
    description: 'Portal de pago seguro para clientes de Vasquez Law Firm',
    images: ['/images/og-payment.jpg'],
  },
};

export default function HacerPagoPage() {
  // Redirect to the main payment page which has Spanish language support
  redirect('/payment');
}