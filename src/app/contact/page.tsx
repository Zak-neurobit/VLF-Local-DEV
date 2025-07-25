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
};

export default function ContactPage() {
  // Define all office locations for free consultations
  const offices = [
    {
      name: 'Smithfield Office',
      address: {
        street: '612 S Brightleaf Blvd',
        city: 'Smithfield',
        state: 'NC',
        zip: '27577',
      },
    },
    {
      name: 'Raleigh Office',
      address: {
        street: '4426 Louisburg Road',
        city: 'Raleigh',
        state: 'NC',
        zip: '27616',
      },
    },
    {
      name: 'Charlotte Office',
      address: {
        street: '5701 Executive Center Dr, Ste 103',
        city: 'Charlotte',
        state: 'NC',
        zip: '28212',
      },
    },
    {
      name: 'Orlando Office',
      address: {
        street: '1111 E Amelia Street',
        city: 'Orlando',
        state: 'FL',
        zip: '32803',
      },
    },
  ];

  return (
    <div>
      <ContactPageContent />
      {/* Add EventSchema for each office showing free consultations available */}
      {offices.map((office, index) => (
        <EventSchema
          key={`contact-event-${index}`}
          eventType="general"
          office={office}
          includeEmergency={index === 0} // Include emergency consultation schema only once
          pageType="contact"
        />
      ))}
    </div>
  );
}
