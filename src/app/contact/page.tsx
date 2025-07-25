import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Vasquez Law Firm',
  description: 'Contact Vasquez Law Firm for a free consultation.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <p className="text-lg mb-4">Call us at 1-844-YO-PELEO</p>
        <p>We have offices in Charlotte, NC and Orlando, FL.</p>
      </div>
    </div>
  );
}
