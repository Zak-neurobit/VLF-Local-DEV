#!/usr/bin/env node

/**
 * Generate Next.js pages from enhanced JSON content
 * Converts the 305 enhanced JSON files into actual Next.js page components
 */

const fs = require('fs').promises;
const path = require('path');

const INPUT_PATH = path.join(process.cwd(), 'content-import/enhanced-complete');
const OUTPUT_PATH = path.join(process.cwd(), 'src/app');

// Page component templates
const pageTemplates = {
  attorney: `import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, Globe, Award, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: '{{title}}',
  description: '{{metaDescription}}',
  openGraph: {
    title: '{{ogTitle}}',
    description: '{{ogDescription}}',
    images: [{ url: '{{ogImage}}' }],
  },
};

export default function {{componentName}}Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-900 to-burgundy-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{{h1}}</h1>
            <p className="text-xl mb-8">Experienced Attorney at Vasquez Law Firm</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-gold-500 text-burgundy-900 px-8 py-3 rounded-md font-semibold hover:bg-gold-600 transition-colors">
                Schedule Consultation
              </Link>
              <Link href="tel:+18449673536" className="border-2 border-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-burgundy-900 transition-colors">
                Call 1-844-YO-PELEO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Attorney Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="prose prose-lg max-w-none">
                {{#contentSections}}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-burgundy-900 mb-4">{{title}}</h2>
                  <p className="text-gray-700">{{content}}</p>
                </div>
                {{/contentSections}}
              </div>

              {/* Practice Areas */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-burgundy-900 mb-6">Practice Areas</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/practice-areas/immigration" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Globe className="w-8 h-8 text-burgundy-700 mr-3" />
                    <span className="font-medium">Immigration Law</span>
                  </Link>
                  <Link href="/practice-areas/personal-injury" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Award className="w-8 h-8 text-burgundy-700 mr-3" />
                    <span className="font-medium">Personal Injury</span>
                  </Link>
                  <Link href="/practice-areas/criminal-defense" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <BookOpen className="w-8 h-8 text-burgundy-700 mr-3" />
                    <span className="font-medium">Criminal Defense</span>
                  </Link>
                  <Link href="/practice-areas/family-law" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Phone className="w-8 h-8 text-burgundy-700 mr-3" />
                    <span className="font-medium">Family Law</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
                <h3 className="text-xl font-bold text-burgundy-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <a href="tel:+18449673536" className="flex items-start text-gray-700 hover:text-burgundy-700">
                    <Phone className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span>1-844-YO-PELEO</span>
                  </a>
                  <a href="mailto:leads@vasquezlawfirm.com" className="flex items-start text-gray-700 hover:text-burgundy-700">
                    <Mail className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span>leads@vasquezlawfirm.com</span>
                  </a>
                  <div className="flex items-start text-gray-700">
                    <MapPin className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span>6801 Glenwood Ave<br />Raleigh, NC 27612</span>
                  </div>
                </div>
                <Link href="/contact" className="block w-full bg-burgundy-700 text-white text-center py-3 rounded-md mt-6 hover:bg-burgundy-800 transition-colors">
                  Schedule Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Enhanced Features */}
      <ChatWidget 
        userId="attorney-page"
        language="en"
      />
      <VoiceAssistant 
        language="en"
      />
      
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({{structuredData}}),
        }}
      />
    </div>
  );
}`,

  practiceArea: `import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Phone, ArrowRight, Scale, Users, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: '{{title}}',
  description: '{{metaDescription}}',
  openGraph: {
    title: '{{ogTitle}}',
    description: '{{ogDescription}}',
    images: [{ url: '{{ogImage}}' }],
  },
};

export default function {{componentName}}Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-900 to-burgundy-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{{h1}}</h1>
            <p className="text-xl mb-8">Experienced Legal Representation in North Carolina & Florida</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-gold-500 text-burgundy-900 px-8 py-3 rounded-md font-semibold hover:bg-gold-600 transition-colors">
                Get Free Consultation
              </Link>
              <Link href="tel:+18449673536" className="border-2 border-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-burgundy-900 transition-colors">
                Call 1-844-YO-PELEO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {{#contentSections}}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">{{title}}</h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>{{content}}</p>
                </div>
              </div>
              {{/contentSections}}

              {/* Services List */}
              <div className="bg-gray-50 p-8 rounded-lg mb-12">
                <h2 className="text-2xl font-bold text-burgundy-900 mb-6">Our Services Include:</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {{#services}}
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{{.}}</span>
                  </div>
                  {{/services}}
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h2 className="text-2xl font-bold text-burgundy-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {{#faqs}}
                  <div className="border-b pb-6">
                    <h3 className="text-xl font-semibold text-burgundy-800 mb-3">{{question}}</h3>
                    <p className="text-gray-700">{{answer}}</p>
                  </div>
                  {{/faqs}}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Box */}
              <div className="bg-burgundy-700 text-white p-6 rounded-lg mb-6 sticky top-4">
                <h3 className="text-xl font-bold mb-4">Free Case Evaluation</h3>
                <p className="mb-6">Get expert legal advice from our experienced attorneys. We speak English and Spanish.</p>
                <Link href="/contact" className="block w-full bg-gold-500 text-burgundy-900 text-center py-3 rounded-md font-semibold hover:bg-gold-600 transition-colors">
                  Contact Us Today
                </Link>
                <div className="mt-6 text-center">
                  <p className="text-sm mb-2">Or Call Us Now</p>
                  <a href="tel:+18449673536" className="text-2xl font-bold hover:text-gold-400">1-844-YO-PELEO</a>
                </div>
              </div>

              {/* Related Practice Areas */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-burgundy-900 mb-4">Related Services</h3>
                <div className="space-y-3">
                  {{#internalLinks}}
                  <Link href="{{href}}" className="flex items-center justify-between p-3 bg-white rounded hover:bg-gray-100 transition-colors">
                    <span className="text-gray-700">{{text}}</span>
                    <ArrowRight className="w-4 h-4 text-burgundy-700" />
                  </Link>
                  {{/internalLinks}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Enhanced Features */}
      <ChatWidget 
        userId="practice-area-page"
        language="en"
      />
      <VirtualAssistant 
        language="en"
      />
      
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({{structuredData}}),
        }}
      />
    </div>
  );
}`,

  location: `import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Calendar, Navigation } from 'lucide-react';

export const metadata: Metadata = {
  title: '{{title}}',
  description: '{{metaDescription}}',
  openGraph: {
    title: '{{ogTitle}}',
    description: '{{ogDescription}}',
    images: [{ url: '{{ogImage}}' }],
  },
};

export default function {{componentName}}Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-900 to-burgundy-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{{h1}}</h1>
            <p className="text-xl mb-8">Serving {{city}} and Surrounding Areas</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-gold-500 text-burgundy-900 px-8 py-3 rounded-md font-semibold hover:bg-gold-600 transition-colors">
                Schedule Consultation
              </Link>
              <a href="tel:{{phone}}" className="border-2 border-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-burgundy-900 transition-colors">
                Call {{phone}}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Office Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Office Details */}
            <div>
              <h2 className="text-3xl font-bold text-burgundy-900 mb-8">{{city}} Office Location</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-burgundy-800 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-burgundy-700 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{{address}}</p>
                      <p className="text-gray-600">{{city}}, {{state}} {{zip}}</p>
                    </div>
                  </div>
                  <a href="tel:{{phone}}" className="flex items-center text-gray-700 hover:text-burgundy-700">
                    <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>{{phone}}</span>
                  </a>
                  <a href="mailto:leads@vasquezlawfirm.com" className="flex items-center text-gray-700 hover:text-burgundy-700">
                    <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>leads@vasquezlawfirm.com</span>
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-burgundy-800 mb-4">Office Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Saturday - Sunday</span>
                    <span className="font-medium">By Appointment</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">24/7 Emergency Legal Services Available</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <a href="https://maps.google.com/?q={{address}}+{{city}}+{{state}}" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-burgundy-700 text-white py-3 rounded-md hover:bg-burgundy-800 transition-colors">
                  <Navigation className="w-5 h-5 mr-2" />
                  Get Directions
                </a>
                <Link href="/contact" className="flex items-center justify-center bg-gold-500 text-burgundy-900 py-3 rounded-md hover:bg-gold-600 transition-colors">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Link>
              </div>
            </div>

            {/* Practice Areas */}
            <div>
              <h2 className="text-3xl font-bold text-burgundy-900 mb-8">Legal Services in {{city}}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-3">Immigration Law</h3>
                  <p className="text-gray-700 mb-3">Comprehensive immigration services including green cards, citizenship, deportation defense, and visa applications.</p>
                  <Link href="/practice-areas/immigration" className="text-burgundy-700 hover:text-burgundy-900 font-medium">Learn More →</Link>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-3">Personal Injury</h3>
                  <p className="text-gray-700 mb-3">Fighting for maximum compensation in car accidents, slip and fall, and other injury cases. No fee unless we win.</p>
                  <Link href="/practice-areas/personal-injury" className="text-burgundy-700 hover:text-burgundy-900 font-medium">Learn More →</Link>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-3">Criminal Defense</h3>
                  <p className="text-gray-700 mb-3">Aggressive defense for DUI/DWI, drug charges, assault, and other criminal matters. 24/7 availability.</p>
                  <Link href="/practice-areas/criminal-defense" className="text-burgundy-700 hover:text-burgundy-900 font-medium">Learn More →</Link>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-3">Family Law</h3>
                  <p className="text-gray-700 mb-3">Compassionate representation in divorce, child custody, alimony, and other family matters.</p>
                  <Link href="/practice-areas/family-law" className="text-burgundy-700 hover:text-burgundy-900 font-medium">Learn More →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">Why Choose Vasquez Law Firm in {{city}}?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-burgundy-700 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-burgundy-800 mb-2">Bilingual Services</h3>
              <p className="text-gray-700">Full legal services in English and Spanish to better serve our diverse community.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-burgundy-700 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-burgundy-800 mb-2">35+ Years Experience</h3>
              <p className="text-gray-700">Proven track record of success in thousands of cases throughout North Carolina.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-burgundy-700 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-burgundy-800 mb-2">Free Consultation</h3>
              <p className="text-gray-700">No-obligation case evaluation to discuss your legal options and rights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({{structuredData}}),
        }}
      />
    </div>
  );
}`,

  blog: `import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: '{{title}}',
  description: '{{metaDescription}}',
  openGraph: {
    title: '{{ogTitle}}',
    description: '{{ogDescription}}',
    images: [{ url: '{{ogImage}}' }],
  },
};

export default function {{componentName}}BlogPost() {
  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-burgundy-900 to-burgundy-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/blog" className="text-gold-400 hover:text-gold-500">← Back to Blog</Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{{h1}}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{{publishDate}}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>Vasquez Law Firm</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{{readTime}} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {{#contentSections}}
              <div className="mb-8">
                {{#title}}<h2 className="text-2xl font-bold text-burgundy-900 mb-4">{{title}}</h2>{{/title}}
                <div className="text-gray-700">{{content}}</div>
              </div>
              {{/contentSections}}
            </div>

            {/* CTA Section */}
            <div className="bg-gray-50 p-8 rounded-lg mt-12">
              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Need Legal Assistance?</h3>
              <p className="text-gray-700 mb-6">If you have questions about {{topic}} or need legal representation, our experienced attorneys are here to help.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="bg-burgundy-700 text-white px-6 py-3 rounded-md hover:bg-burgundy-800 transition-colors">
                  Get Free Consultation
                </Link>
                <a href="tel:+18449673536" className="bg-gold-500 text-burgundy-900 px-6 py-3 rounded-md hover:bg-gold-600 transition-colors">
                  Call 1-844-YO-PELEO
                </a>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-burgundy-900 mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {{#relatedPosts}}
                <Link href="{{url}}" className="group">
                  <div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors">
                    <h4 className="text-lg font-semibold text-burgundy-800 mb-2 group-hover:text-burgundy-900">{{title}}</h4>
                    <p className="text-gray-600 text-sm mb-3">{{excerpt}}</p>
                    <span className="text-burgundy-700 font-medium flex items-center">
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </Link>
                {{/relatedPosts}}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({{structuredData}}),
        }}
      />
    </article>
  );
}`,

  general: `import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '{{title}}',
  description: '{{metaDescription}}',
  openGraph: {
    title: '{{ogTitle}}',
    description: '{{ogDescription}}',
    images: [{ url: '{{ogImage}}' }],
  },
};

export default function {{componentName}}Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-burgundy-900 to-burgundy-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{{h1}}</h1>
            <p className="text-xl">{{subtitle}}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {{#contentSections}}
              <div className="mb-8">
                {{#title}}<h2 className="text-2xl font-bold text-burgundy-900 mb-4">{{title}}</h2>{{/title}}
                <div className="text-gray-700">{{content}}</div>
              </div>
              {{/contentSections}}
            </div>

            {/* Internal Links */}
            {{#hasInternalLinks}}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-burgundy-900 mb-6">Related Pages</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {{#internalLinks}}
                <Link href="{{href}}" className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-gray-700">{{text}}</span>
                  <ArrowRight className="w-5 h-5 text-burgundy-700" />
                </Link>
                {{/internalLinks}}
              </div>
            </div>
            {{/hasInternalLinks}}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-burgundy-900 mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-700 mb-8">Contact us today for a free consultation with our experienced attorneys.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-burgundy-700 text-white px-8 py-3 rounded-md hover:bg-burgundy-800 transition-colors">
                Schedule Consultation
              </Link>
              <a href="tel:+18449673536" className="bg-gold-500 text-burgundy-900 px-8 py-3 rounded-md hover:bg-gold-600 transition-colors">
                Call 1-844-YO-PELEO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({{structuredData}}),
        }}
      />
    </div>
  );
}`,
};

// URL mapping for old to new URLs
const urlMappings = {
  // Attorney pages
  'attorneys-adriana-ingram-index': 'attorneys/adriana-ingram',
  'attorneys-christopher-afanador-index': 'attorneys/christopher-afanador',
  'attorneys-jillian-baucom-index': 'attorneys/jillian-baucom',
  'attorneys-mark-kelsey-index': 'attorneys/mark-kelsey',
  'attorneys-roselyn-torrellas-index': 'attorneys/roselyn-v-torrellas',
  'attorneys-william-vasquez-attorney-index': 'william-vasquez-attorney',
  'judith-parkes-index': 'judith-parkes',

  // Practice areas - Immigration
  'immigration-index': 'practice-areas/immigration',
  'immigration-visa-process-index': 'practice-areas/immigration/visa-process',
  'es-areas-de-practica-inmigracion-ajuste-de-estatus-index':
    'es/areas-de-practica/inmigracion/ajuste-de-estatus',
  'es-areas-de-practica-inmigracion-asilo-refugiado-ayuda-legal-index':
    'es/areas-de-practica/inmigracion/asilo',
  'es-areas-de-practica-inmigracion-ciudadania-naturalizacion-index':
    'es/areas-de-practica/inmigracion/ciudadania',

  // Practice areas - Personal Injury
  'personal-injury-index': 'practice-areas/personal-injury',
  'personal-injury-car-auto-accidents-index': 'practice-areas/personal-injury/car-accidents',

  // Practice areas - Criminal Defense
  'criminal-defense-index': 'practice-areas/criminal-defense',

  // Practice areas - Family Law
  'family-law-index': 'practice-areas/family-law',
  'family-law-child-custody': 'practice-areas/family-law/child-custody',

  // Practice areas - Workers Comp
  'workers-compensation-job-injury-index': 'practice-areas/workers-compensation',

  // Locations
  'charlotte-nc-index': 'charlotte-nc',
  'durham-nc-index': 'durham-nc',
  'raleigh-nc-index': 'raleigh-nc',
  'smithfield-nc-index': 'smithfield-nc',
  'winston-salem-index': 'winston-salem',
  'orlando-fl-index': 'orlando-fl',

  // Spanish pages
  'es-index': 'es',
  'es-abogados-index': 'es/abogados',
  'es-contacto-index': 'es/contacto',

  // Other pages
  'contact-index': 'contact',
  'practice-areas-index': 'practice-areas',
  'scholarship-index': 'scholarship',
  'media-info-index': 'media-info',
  'blog-index': 'blog',
  't-visa-immigration-attorneys-index': 't-visa-immigration-attorneys',
};

// Convert filename to component name
function toComponentName(filename) {
  return filename
    .replace(/\.json$/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
    .replace(/[^a-zA-Z0-9]/g, '');
}

// Convert old URL to new app router path
function getNewPath(oldUrl, filename) {
  // Remove .json extension and clean up
  const cleanFilename = filename.replace(/\.json$/, '');

  // Check URL mappings first
  if (urlMappings[cleanFilename]) {
    return urlMappings[cleanFilename];
  }

  // Clean up the URL
  let newPath = oldUrl
    .replace(/^\//, '') // Remove leading slash
    .replace(/\.html$/, '') // Remove .html
    .replace(/index$/, '') // Remove index
    .replace(/\/$/, '') // Remove trailing slash
    .replace(/[﹖?]/g, ''); // Remove special characters

  // Handle special cases
  if (newPath.includes('et_blog')) {
    newPath = newPath.replace(/\?et_blog.*$/, '').replace(/﹖et_blog.*$/, '');
  }

  // Handle pagination
  if (newPath.includes('/page/')) {
    newPath = newPath.replace(/\/page\/\d+/, '');
  }

  return newPath || 'home';
}

// Template processing with Mustache-like syntax
function processTemplate(template, data) {
  let processed = template;

  // Replace simple variables
  Object.keys(data).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    if (typeof data[key] === 'string') {
      processed = processed.replace(regex, data[key]);
    }
  });

  // Handle arrays/sections
  const sectionRegex = /{{#(\w+)}}([\s\S]*?){{\/\1}}/g;
  processed = processed.replace(sectionRegex, (match, key, content) => {
    if (Array.isArray(data[key]) && data[key].length > 0) {
      return data[key]
        .map(item => {
          let itemContent = content;
          if (typeof item === 'object') {
            Object.keys(item).forEach(itemKey => {
              itemContent = itemContent.replace(
                new RegExp(`{{${itemKey}}}`, 'g'),
                item[itemKey] || ''
              );
            });
          } else {
            itemContent = itemContent.replace(/{{\.}}/g, item);
          }
          return itemContent;
        })
        .join('');
    }
    return '';
  });

  // Handle conditionals
  processed = processed.replace(/{{#(\w+)}}([\s\S]*?){{\/\1}}/g, (match, key, content) => {
    return data[key] ? content : '';
  });

  // Clean up any remaining placeholders
  processed = processed.replace(/{{[^}]+}}/g, '');

  return processed;
}

// Extract location data from enhanced content
function extractLocationData(pageData) {
  const cityMatch = pageData.url.match(
    /\/(raleigh|charlotte|smithfield|durham|winston-salem|orlando)/i
  );
  if (cityMatch) {
    const city = cityMatch[1].charAt(0).toUpperCase() + cityMatch[1].slice(1).replace(/-/g, ' ');

    // Extract from schema if available
    const locationSchema = pageData.metadata.structuredData?.find(
      s => s['@type'] === 'LegalService' && s.address
    );
    if (locationSchema) {
      return {
        city,
        state: locationSchema.address.addressRegion || 'NC',
        address: locationSchema.address.streetAddress || '',
        zip: locationSchema.address.postalCode || '',
        phone: locationSchema.telephone || '+1-844-967-3536',
      };
    }
  }

  return {
    city: 'Raleigh',
    state: 'NC',
    address: '6801 Glenwood Ave',
    zip: '27612',
    phone: '+1-844-967-3536',
  };
}

// Generate page from enhanced JSON
async function generatePage(enhancedData, outputPath) {
  const { pageType } = enhancedData;
  let template = pageTemplates[pageType] || pageTemplates.general;

  // Prepare template data
  const templateData = {
    title: enhancedData.metadata.title || '',
    metaDescription: enhancedData.metadata.metaDescription || '',
    ogTitle: enhancedData.metadata.ogTitle || enhancedData.metadata.title || '',
    ogDescription:
      enhancedData.metadata.ogDescription || enhancedData.metadata.metaDescription || '',
    ogImage: enhancedData.metadata.ogImage || '/images/og-default.jpg',
    h1: enhancedData.content.h1 || enhancedData.metadata.title || '',
    componentName: toComponentName(path.basename(outputPath)),
    contentSections: enhancedData.contentSections || [],
    internalLinks: enhancedData.internalLinks || [],
    hasInternalLinks: enhancedData.internalLinks && enhancedData.internalLinks.length > 0,
    structuredData: JSON.stringify(enhancedData.metadata.structuredData || []),
  };

  // Add page-type specific data
  if (pageType === 'location') {
    Object.assign(templateData, extractLocationData(enhancedData));
  } else if (pageType === 'blog') {
    templateData.publishDate = new Date(enhancedData.extractedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    templateData.readTime = Math.ceil((enhancedData.content.mainContent?.length || 1000) / 200);
    templateData.topic = enhancedData.content.h1 || 'legal matters';
  } else if (pageType.includes('immigration') || pageType.includes('injury')) {
    // Extract services from schema
    const serviceSchema = enhancedData.metadata.structuredData?.find(
      s => s['@type'] === 'LegalService'
    );
    if (serviceSchema?.hasOfferCatalog?.itemListElement) {
      templateData.services = serviceSchema.hasOfferCatalog.itemListElement
        .map(item => item.itemOffered?.name || '')
        .filter(Boolean);
    }

    // Extract FAQs
    const faqSchema = enhancedData.metadata.structuredData?.find(s => s['@type'] === 'FAQPage');
    if (faqSchema?.mainEntity) {
      templateData.faqs = faqSchema.mainEntity.map(q => ({
        question: q.name || '',
        answer: q.acceptedAnswer?.text || '',
      }));
    }
  }

  // Process template
  const pageContent = processTemplate(template, templateData);

  // Write the file
  await fs.writeFile(outputPath, pageContent);
}

// Process all enhanced JSON files
async function processAllPages() {
  console.log('🚀 Starting Next.js page generation from enhanced content...\n');

  const categories = ['attorneys', 'practice-areas', 'locations', 'blog', 'spanish', 'pages'];
  const results = {
    generated: 0,
    failed: 0,
    skipped: 0,
    redirects: [],
  };

  for (const category of categories) {
    console.log(`\n📁 Processing ${category}...`);

    const inputDir = path.join(INPUT_PATH, category);
    const files = await fs.readdir(inputDir).catch(() => []);

    for (const file of files) {
      if (!file.endsWith('.json')) continue;

      try {
        const content = await fs.readFile(path.join(inputDir, file), 'utf-8');
        const pageData = JSON.parse(content);

        // Determine output path
        const newPath = getNewPath(pageData.url, file);
        const outputDir = path.join(OUTPUT_PATH, newPath);

        // Skip if it's a main category index that already exists
        const skipPaths = ['attorneys', 'practice-areas', 'blog', 'contact', 'es'];
        if (skipPaths.includes(newPath) && !newPath.includes('/')) {
          console.log(`  ⏭️  Skipping ${file} - page already exists`);
          results.skipped++;
          continue;
        }

        // Create directory
        await fs.mkdir(outputDir, { recursive: true });

        // Generate page
        await generatePage(pageData, path.join(outputDir, 'page.tsx'));

        console.log(`  ✅ Generated: ${newPath}/page.tsx`);
        results.generated++;

        // Track redirects needed
        if (pageData.url !== `/${newPath}`) {
          results.redirects.push({
            source: pageData.url.replace('.html', ''),
            destination: `/${newPath}`,
            permanent: true,
          });
        }
      } catch (error) {
        console.error(`  ❌ Failed: ${file} - ${error.message}`);
        results.failed++;
      }
    }
  }

  // Generate redirects configuration
  if (results.redirects.length > 0) {
    const redirectsConfig = {
      redirects: results.redirects.sort((a, b) => a.source.localeCompare(b.source)),
    };

    await fs.writeFile(
      path.join(process.cwd(), 'redirects.json'),
      JSON.stringify(redirectsConfig, null, 2)
    );
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 PAGE GENERATION COMPLETE');
  console.log('='.repeat(60));
  console.log(`✅ Generated: ${results.generated} pages`);
  console.log(`⏭️  Skipped: ${results.skipped} pages`);
  console.log(`❌ Failed: ${results.failed} pages`);
  console.log(`🔄 Redirects: ${results.redirects.length} configured`);

  console.log('\n📋 Next Steps:');
  console.log('1. Review generated pages in src/app/');
  console.log('2. Add redirects to next.config.js');
  console.log('3. Run: npm run build');
  console.log('4. Deploy to production\n');

  return results;
}

// Main execution
async function main() {
  try {
    // Check if enhanced content exists
    try {
      await fs.access(INPUT_PATH);
    } catch (error) {
      console.error(`❌ No enhanced content found at: ${INPUT_PATH}`);
      console.log('\nPlease run: node scripts/enhance-all-content-seo.js first\n');
      process.exit(1);
    }

    await processAllPages();
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generatePage, processAllPages };
