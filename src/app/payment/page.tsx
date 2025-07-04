'use client';

import { useState } from 'react';
import { CreditCard, Lock, DollarSign, Building, AlertCircle } from 'lucide-react';

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<'authorize' | 'lawpay'>('lawpay');
  const [accountType, setAccountType] = useState<'operating' | 'trust'>('operating');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    amount: '',
    description: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    zipCode: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        paymentMethod === 'lawpay' ? '/api/payment/lawpay' : '/api/payment/authorize-net';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
          trustAccount: accountType === 'trust',
          paymentMethod: {
            card_number: formData.cardNumber,
            exp_month: formData.expiryDate.split('/')[0],
            exp_year: formData.expiryDate.split('/')[1],
            cvv: formData.cvv,
            postal_code: formData.zipCode,
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(`Payment successful! Transaction ID: ${result.transactionId || result.chargeId}`);
        // Reset form
        setFormData({
          clientName: '',
          clientEmail: '',
          amount: '',
          description: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          zipCode: '',
        });
      } else {
        alert(`Payment failed: ${result.error}`);
      }
    } catch (error) {
      alert('Payment error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="bg-[#6B1F2E] text-white p-6 rounded-t-lg">
            <h1 className="text-2xl font-bold flex items-center">
              <DollarSign className="w-6 h-6 mr-2" />
              Make a Payment
            </h1>
            <p className="text-sm mt-2 opacity-90">
              Secure payment processing for Vasquez Law Firm
            </p>
          </div>

          {/* Payment Method Selection */}
          <div className="p-6 border-b">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Payment Processor
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('lawpay')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentMethod === 'lawpay'
                    ? 'border-[#6B1F2E] bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Building className="w-6 h-6 mx-auto mb-2 text-[#6B1F2E]" />
                <span className="font-semibold">LawPay</span>
                <p className="text-xs text-gray-500 mt-1">Trust & Operating Accounts</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('authorize')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentMethod === 'authorize'
                    ? 'border-[#6B1F2E] bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="w-6 h-6 mx-auto mb-2 text-[#6B1F2E]" />
                <span className="font-semibold">Authorize.Net</span>
                <p className="text-xs text-gray-500 mt-1">Standard Processing</p>
              </button>
            </div>

            {/* Account Type for LawPay */}
            {paymentMethod === 'lawpay' && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Account Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="operating"
                      checked={accountType === 'operating'}
                      onChange={e => setAccountType(e.target.value as 'operating' | 'trust')}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-medium">Operating Account</span>
                      <p className="text-xs text-gray-500">For earned fees</p>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="trust"
                      checked={accountType === 'trust'}
                      onChange={e => setAccountType(e.target.value as 'operating' | 'trust')}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-medium">Trust Account</span>
                      <p className="text-xs text-gray-500">For retainers</p>
                    </div>
                  </label>
                </div>

                {accountType === 'trust' && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      Trust account funds will be held in compliance with North Carolina State Bar
                      rules and can only be withdrawn for earned fees or expenses.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Client Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.clientEmail}
                  onChange={e => setFormData({ ...formData, clientEmail: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Payment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Amount ($)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.01"
                  value={formData.amount}
                  onChange={e => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                  placeholder="Legal services - Case #12345"
                />
              </div>
            </div>

            {/* Card Information */}
            <div className="border-t pt-4 mt-6">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Card Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.expiryDate}
                      onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      required
                      value={formData.cvv}
                      onChange={e => setFormData({ ...formData, cvv: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                      placeholder="12345"
                      maxLength={5}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-start">
              <Lock className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">Secure Payment Processing</p>
                <p>
                  Your payment information is encrypted and processed securely through{' '}
                  {paymentMethod === 'lawpay' ? 'LawPay' : 'Authorize.Net'}. We never store your
                  credit card information.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6B1F2E] text-white py-3 rounded-lg font-semibold hover:bg-[#8B2635] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Processing...' : `Pay $${formData.amount || '0.00'}`}
            </button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
            <p className="text-center text-sm text-gray-600">
              Questions about your payment? Call{' '}
              <a href="tel:1-844-967-3536" className="text-[#C9974D] font-semibold">
                1-844-YO-PELEO
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
