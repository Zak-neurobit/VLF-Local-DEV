'use client';

import { useState } from 'react';
import PageLayout from '@/components/Layout/PageLayout';
import Section from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Script from 'next/script';
import { reviewSchema } from '@/lib/schema';
import { testimonials, Testimonial } from '@/data/testimonials';
import ExternalReviews from '@/components/reviews/ExternalReviews';
import ReviewWidget from '@/components/reviews/ReviewWidget';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  const [selectedService, setSelectedService] = useState<string>('all');

  // Get unique services for filtering
  const services = ['all', ...new Set(testimonials.map(t => t.service.split(' - ')[0]))];

  // Filter testimonials based on selected service
  const filteredTestimonials =
    selectedService === 'all'
      ? testimonials
      : testimonials.filter(t => t.service.includes(selectedService));

  // Generate schema markup for reviews
  const reviewSchemaData = testimonials.map(testimonial =>
    reviewSchema({
      author: testimonial.name,
      rating: testimonial.rating,
      text: testimonial.content,
      date: new Date(testimonial.date).toISOString(),
    })
  );

  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': 'https://www.vasquezlawnc.com/#organization',
    name: 'Vasquez Law Firm, PLLC',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: testimonials.length.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: reviewSchemaData.map(r => r),
  };

  return (
    <PageLayout>
      <Script
        id="testimonials-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aggregateRatingSchema),
        }}
      />
      <Section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-brand-charcoal mb-4">Client Testimonials</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Read what our clients have to say about their experience with Vasquez Law Firm.
                We're proud to have helped thousands of individuals and families with their legal
                needs.
              </p>
            </div>

            {/* Overall Rating Summary */}
            <Card className="mb-12">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Website Testimonials */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-brand-charcoal mb-4">
                      Website Reviews
                    </h3>
                    <div className="flex items-center justify-center mb-4">
                      <StarRating rating={5} />
                      <span className="ml-2 text-3xl font-bold text-brand-charcoal">5.0</span>
                    </div>
                    <p className="text-gray-600">
                      Based on {testimonials.length} client testimonials
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Direct feedback from our clients</p>
                  </div>

                  {/* External Reviews Widget */}
                  <div>
                    <h3 className="text-lg font-semibold text-brand-charcoal mb-4 text-center">
                      External Reviews
                    </h3>
                    <ReviewWidget variant="full" showSource={true} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-brand-charcoal mb-4 text-center">
                Filter by Practice Area
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {services.map(service => (
                  <button
                    key={service}
                    onClick={() => setSelectedService(service)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedService === service
                        ? 'bg-brand-skyblue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {service === 'all' ? 'All Reviews' : service}
                  </button>
                ))}
              </div>
            </div>

            {/* Website Testimonials Grid */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-center text-brand-charcoal mb-8">
                Website Testimonials
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {filteredTestimonials.map(testimonial => (
                  <Card key={testimonial.id} className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-brand-charcoal">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-600">{testimonial.location}</p>
                        </div>
                        <div className="text-right">
                          <StarRating rating={testimonial.rating} />
                          <p className="text-sm text-gray-500 mt-1">{testimonial.date}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="inline-block bg-brand-skyblue/10 text-brand-skyblue px-3 py-1 rounded-full text-sm font-medium">
                          {testimonial.service}
                        </span>
                      </div>

                      <p
                        className={`text-gray-700 leading-relaxed mb-4 ${testimonial.language === 'es' ? 'italic' : ''}`}
                      >
                        "{testimonial.content}"
                        {testimonial.language === 'es' && (
                          <span className="block text-xs text-gray-500 mt-2">
                            * Testimonio en español
                          </span>
                        )}
                      </p>

                      <p className="text-sm text-gray-500">Case Type: {testimonial.caseType}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* External Reviews Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-center text-brand-charcoal mb-8">
                Google & Yelp Reviews
              </h2>
              <ExternalReviews
                maxReviews={6}
                showSummary={true}
                showRefresh={false}
                autoRefresh={false}
              />
            </div>

            {/* Call to Action */}
            <div className="bg-brand-skyblue/10 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
                Ready to Work with a Trusted Law Firm?
              </h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Join the {filteredTestimonials.length === testimonials.length ? 'hundreds' : 'many'}{' '}
                of satisfied clients who have trusted Vasquez Law Firm with their legal needs. We're
                here to help you navigate your legal challenges with expertise and compassion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-block bg-brand-crimson text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-crimson/90 transition-colors"
                >
                  Schedule Consultation
                </a>
                <a
                  href="tel:7043580470"
                  className="inline-block bg-white text-brand-charcoal px-8 py-3 rounded-lg font-semibold border-2 border-brand-charcoal hover:bg-gray-50 transition-colors"
                >
                  Call (704) 358-0470
                </a>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <strong>Legal Disclaimer:</strong> These testimonials reflect the experiences of
                individual clients and do not constitute a guarantee, warranty, or prediction
                regarding the outcome of your legal matter. Past results do not guarantee or predict
                a similar outcome in any future case. Each case is unique and must be evaluated on
                its own merits. Client names have been abbreviated or changed to protect privacy.
                These testimonials are from real clients who have provided written consent for their
                use. Attorney advertising. Prior results do not guarantee a similar outcome.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
