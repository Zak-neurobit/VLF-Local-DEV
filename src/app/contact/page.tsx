import React from 'react';
import { Metadata } from 'next';
import ContactPageContent from '@/components/ContactPageContent';
import { EventSchema } from '@/components/SEO/EventSchema';

export const metadata: Metadata = {
  title: 'Contact Us | Free Consultation 24/7 | Vasquez Law Firm',
  description:
    'Contact Vasquez Law Firm for a free consultation. Available 24/7 with AI assistant. Offices in NC & FL. Call 1-844-YO-PELEO or chat now.',
  keywords:
    'contact immigration lawyer, free consultation, 24/7 legal help, immigration attorney near me, personal injury lawyer contact',
  openGraph: {
    title: 'Contact Vasquez Law Firm | Free Consultation Available 24/7',
    description:
      'Get immediate legal help. AI assistant available 24/7. Free consultation for immigration, personal injury, criminal defense, and workers comp cases.',
    url: 'https://www.vasquezlawnc.com/contact',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Vasquez Law Firm - Available 24/7',
      },
    ],
  },
};

export default function ContactPage() {
  const offices = [
    {
      name: 'Charlotte Office',
      phone: '1-844-YO-PELEO',
      hours: 'Monday - Friday: 9:00 AM - 5:00 PM',
      address: {
        street: '4801 E Independence Blvd Suite 200',
        city: 'Charlotte',
        state: 'NC',
        zip: '28212',
      },
    },
    {
      name: 'Orlando Office',
      phone: '1-844-YO-PELEO',
      hours: 'Monday - Friday: 9:00 AM - 5:00 PM',
      address: {
        street: '1111 E Amelia Street',
        city: 'Orlando',
        state: 'FL',
        zip: '32803',
      },
    },
  ];

  return (
    <main>
      <ContactPageContent />
      <div className="sr-only">
        {offices.map((office, index) => (
          <EventSchema
            key={`contact-event-${index}`}
            eventType="general"
            office={office}
            includeEmergency={index === 0}
            pageType="contact"
          />
        ))}
      </div>
    </main>
  );
}
