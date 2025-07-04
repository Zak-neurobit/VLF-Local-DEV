'use client';

import { useState } from 'react';
import { CreditCard, Lock, DollarSign, ExternalLink, Building } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function PaymentPage() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const content = {
    en: {
      title: 'Make a Payment',
      subtitle: 'Secure payment processing for Vasquez Law Firm',
      description: 'Make secure payments to Vasquez Law Firm through our trusted payment partner, LawPay.',
      selectAccount: 'Select Account Type',
      operating: {
        title: 'Operating Account',
        description: 'For earned legal fees and expenses',
        buttonText: 'Pay to Operating Account',
      },
      trust: {
        title: 'Trust Account',
        description: 'For retainers and advance payments',
        buttonText: 'Pay to Trust Account',
      },
      security: {
        title: 'Secure Payment Processing',
        description: 'Your payment information is encrypted and processed securely through LawPay, a trusted payment solution specifically designed for law firms.',
      },
      alternative: {
        title: 'Alternative Payment Methods',
        description: 'We also accept payments through:',
        affirm: 'Affirm - Buy now, pay later options available',
      },
      contact: 'Questions about your payment? Call',
      notice: 'You will be redirected to LawPay\'s secure payment portal',
    },
    es: {
      title: 'Hacer un Pago',
      subtitle: 'Procesamiento seguro de pagos para Vasquez Law Firm',
      description: 'Realice pagos seguros a Vasquez Law Firm a través de nuestro socio de pago de confianza, LawPay.',
      selectAccount: 'Seleccionar Tipo de Cuenta',
      operating: {
        title: 'Cuenta Operativa',
        description: 'Para honorarios legales y gastos ganados',
        buttonText: 'Pagar a Cuenta Operativa',
      },
      trust: {
        title: 'Cuenta de Fideicomiso',
        description: 'Para anticipos y pagos por adelantado',
        buttonText: 'Pagar a Cuenta de Fideicomiso',
      },
      security: {
        title: 'Procesamiento Seguro de Pagos',
        description: 'Su información de pago está encriptada y procesada de forma segura a través de LawPay, una solución de pago confiable diseñada específicamente para bufetes de abogados.',
      },
      alternative: {
        title: 'Métodos de Pago Alternativos',
        description: 'También aceptamos pagos a través de:',
        affirm: 'Affirm - Opciones de compre ahora, pague después disponibles',
      },
      contact: '¿Preguntas sobre su pago? Llame al',
      notice: 'Será redirigido al portal de pago seguro de LawPay',
    },
  };

  const t = content[language];

  // LawPay URLs from the old website
  const lawpayOperatingUrl = 'https://secure.lawpay.com/pages/vasquezlawfirm/operating1';
  const lawpayTrustUrl = 'https://secure.lawpay.com/pages/vasquezlawfirm/';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-sm rounded ${
                language === 'en' 
                  ? 'bg-[#6B1F2E] text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`px-3 py-1 text-sm rounded ${
                language === 'es' 
                  ? 'bg-[#6B1F2E] text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              ES
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="bg-[#6B1F2E] text-white p-6 rounded-t-lg">
            <h1 className="text-3xl font-bold flex items-center">
              <DollarSign className="w-8 h-8 mr-3" />
              {t.title}
            </h1>
            <p className="text-sm mt-2 opacity-90">
              {t.subtitle}
            </p>
          </div>

          {/* Main Content */}
          <div className="p-8">
            <p className="text-lg text-gray-600 mb-8">
              {t.description}
            </p>

            {/* LawPay Logo */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <Image
                  src="/images/lawpay-placeholder.svg"
                  alt="LawPay"
                  width={200}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Account Type Selection */}
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{t.selectAccount}</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Operating Account */}
              <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-[#6B1F2E] transition-colors">
                <Building className="w-8 h-8 text-[#6B1F2E] mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t.operating.title}</h3>
                <p className="text-gray-600 mb-4">{t.operating.description}</p>
                <a
                  href={lawpayOperatingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-[#6B1F2E] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#8B2635] transition-colors"
                >
                  {t.operating.buttonText}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>

              {/* Trust Account */}
              <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-[#6B1F2E] transition-colors">
                <Lock className="w-8 h-8 text-[#6B1F2E] mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t.trust.title}</h3>
                <p className="text-gray-600 mb-4">{t.trust.description}</p>
                <a
                  href={lawpayTrustUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-[#6B1F2E] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#8B2635] transition-colors"
                >
                  {t.trust.buttonText}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>

            {/* Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-blue-800 text-center">
                <ExternalLink className="w-4 h-4 inline mr-2" />
                {t.notice}
              </p>
            </div>

            {/* Security Notice */}
            <div className="bg-gray-50 rounded-lg p-6 flex items-start mb-8">
              <Lock className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 mb-1">{t.security.title}</p>
                <p className="text-sm text-gray-600">
                  {t.security.description}
                </p>
              </div>
            </div>

            {/* Alternative Payment Methods */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.alternative.title}</h3>
              <p className="text-gray-600 mb-4">{t.alternative.description}</p>
              <div className="flex items-center gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Image
                    src="/images/affirm-placeholder.svg"
                    alt="Affirm"
                    width={100}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600">{t.alternative.affirm}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
            <p className="text-center text-gray-600">
              {t.contact}{' '}
              <a href="tel:1-844-967-3536" className="text-[#C9974D] font-bold">
                1-844-YO-PELEO (967-3536)
              </a>
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 text-center">
          <Link 
            href={language === 'es' ? '/es/contacto' : '/contact'} 
            className="text-[#6B1F2E] hover:text-[#8B2635] font-medium"
          >
            {language === 'es' ? '← Volver a Contacto' : '← Back to Contact'}
          </Link>
        </div>
      </div>
    </div>
  );
}