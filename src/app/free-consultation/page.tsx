'use client';

import { useState } from 'react';
import PageLayout from '@/components/Layout/PageLayout';
import Section from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Phone, Mail, MessageSquare, Clock, FileText } from 'lucide-react';

export default function FreeConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    caseType: '',
    preferredLanguage: 'English',
    preferredContact: 'phone',
    preferredTime: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add actual submission logic here
  };

  const benefits = [
    {
      icon: Phone,
      title: 'Multiple Contact Options',
      description: 'In-person, phone, or video consultations available',
    },
    {
      icon: MessageSquare,
      title: 'Bilingual Service',
      description: 'Consultations available in English and Spanish',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Evening and weekend appointments available',
    },
    {
      icon: FileText,
      title: 'Case Evaluation',
      description: 'Thorough review of your legal situation',
    },
  ];

  const consultationSteps = [
    {
      number: '1',
      title: 'Submit Your Information',
      description: 'Fill out the form below or call us directly',
    },
    {
      number: '2',
      title: 'We Review Your Case',
      description: 'Our team reviews your information to match you with the right attorney',
    },
    {
      number: '3',
      title: 'Schedule Your Consultation',
      description: "We'll contact you within 24 hours to schedule your free consultation",
    },
    {
      number: '4',
      title: 'Meet with Your Attorney',
      description: 'Discuss your case and learn about your legal options',
    },
  ];

  return (
    <PageLayout>
      <Section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-brand-charcoal mb-4">
                Schedule Your Free Consultation
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Take the first step toward resolving your legal matter. Our experienced attorneys
                are ready to listen to your story and provide guidance on your best options.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-brand-skyblue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-brand-skyblue" />
                      </div>
                      <h3 className="font-semibold text-brand-charcoal mb-2">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Consultation Form */}
              <div>
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-brand-charcoal mb-6">
                      Request Your Free Consultation
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-skyblue focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-skyblue focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-skyblue focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="caseType"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Case Type *
                        </label>
                        <select
                          id="caseType"
                          name="caseType"
                          required
                          value={formData.caseType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-skyblue focus:border-transparent"
                        >
                          <option value="">Select a case type</option>
                          <option value="immigration">Immigration</option>
                          <option value="personal-injury">Personal Injury</option>
                          <option value="criminal-defense">Criminal Defense</option>
                          <option value="workers-comp">Workers' Compensation</option>
                          <option value="family-law">Family Law</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="preferredLanguage"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Preferred Language
                        </label>
                        <select
                          id="preferredLanguage"
                          name="preferredLanguage"
                          value={formData.preferredLanguage}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-skyblue focus:border-transparent"
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Español</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Contact Method
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="preferredContact"
                              value="phone"
                              checked={formData.preferredContact === 'phone'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            Phone
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="preferredContact"
                              value="email"
                              checked={formData.preferredContact === 'email'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            Email
                          </label>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Brief Description of Your Case
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-skyblue focus:border-transparent"
                          placeholder="Please provide a brief description of your legal matter..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-brand-crimson text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-crimson/90 transition-colors"
                      >
                        Request Free Consultation
                      </button>

                      <p className="text-sm text-gray-600 text-center">
                        By submitting this form, you agree to our{' '}
                        <a href="/privacy-policy" className="text-brand-skyblue hover:underline">
                          Privacy Policy
                        </a>
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Right Side Content */}
              <div>
                {/* How It Works */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-charcoal mb-6">How It Works</h2>
                  <div className="space-y-4">
                    {consultationSteps.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-brand-skyblue text-white rounded-full flex items-center justify-center font-bold mr-4">
                          {step.number}
                        </div>
                        <div>
                          <h3 className="font-semibold text-brand-charcoal mb-1">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What to Expect */}
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-brand-charcoal mb-4">What to Expect</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          30-60 minute consultation with an experienced attorney
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          Review of your legal situation and documents
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          Explanation of your legal rights and options
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          Honest assessment of your case strengths and challenges
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          Clear explanation of fees and next steps
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-brand-charcoal mb-4">Prefer to Call?</h3>
                    <p className="text-gray-700 mb-4">
                      Speak directly with our team to schedule your consultation:
                    </p>
                    <div className="space-y-3">
                      <a
                        href="tel:7043580470"
                        className="flex items-center text-brand-skyblue hover:text-brand-crimson transition-colors"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        <span className="font-semibold">(704) 358-0470</span>
                      </a>
                      <a
                        href="mailto:info@vasquezlawnc.com"
                        className="flex items-center text-brand-skyblue hover:text-brand-crimson transition-colors"
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        <span>info@vasquezlawnc.com</span>
                      </a>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <strong>Office Hours:</strong>
                        <br />
                        Monday - Friday: 8:30 AM - 5:30 PM
                        <br />
                        Weekend appointments available by request
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
