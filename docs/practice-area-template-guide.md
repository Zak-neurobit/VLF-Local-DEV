# Practice Area Template Guide

## Overview

The `StandardizedPracticeAreaTemplate` is a comprehensive, reusable component for creating consistent practice area pages across the website. It supports both English and Spanish content and includes all necessary sections for a complete practice area page.

## Features

- **Hero Section**: Eye-catching title, subtitle, and description with animated background
- **Overview Section**: Main content area with highlights
- **Services Section**: Interactive service cards with expandable details
- **FAQ Section**: Expandable frequently asked questions
- **Attorney Expertise**: Showcase attorneys specializing in this practice area
- **Related Services**: Links to related practice areas
- **CTAs**: Multiple call-to-action sections throughout
- **SEO**: Built-in schema markup and metadata support
- **Bilingual**: Full support for English and Spanish content
- **Responsive**: Mobile-first design with smooth animations

## Usage

### Basic Implementation

```tsx
import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Your Practice Area | Vasquez Law Firm',
  description: 'Description for SEO',
};

export default function YourPracticeAreaPage() {
  return (
    <StandardizedPracticeAreaTemplate
      title="Practice Area Title"
      subtitle="Optional Subtitle"
      description="Brief description of the practice area"
      overview={{
        title: 'Overview Title', // Optional, defaults to "Overview"
        content: 'Detailed overview content...',
        highlights: ['Key point 1', 'Key point 2', 'Key point 3'],
      }}
      services={[
        {
          title: 'Service 1',
          description: 'Service description',
          features: ['Feature 1', 'Feature 2'],
        },
      ]}
      faqs={[
        {
          question: 'Common question?',
          answer: 'Detailed answer...',
        },
      ]}
    />
  );
}
```

### Complete Example with All Features

```tsx
import { Shield, FileText } from 'lucide-react';

const services = [
  {
    title: 'Service Name',
    description: 'What this service includes',
    icon: <Shield className="w-6 h-6" />, // Optional icon
    features: ['Detailed feature 1', 'Detailed feature 2', 'Detailed feature 3'],
    link: '/practice-areas/specific-service', // Optional link
  },
];

const faqs = [
  {
    question: 'How long does the process take?',
    answer: 'The timeline varies depending on...',
  },
  {
    question: 'What are the costs involved?',
    answer: 'We work on a contingency fee basis...',
  },
];

const attorneys = [
  {
    name: 'Attorney Name',
    role: 'Senior Attorney',
    experience: '15+ years experience',
    specializations: ['Specialization 1', 'Specialization 2'],
    image: '/images/attorneys/name.jpg', // Optional
  },
];

const relatedServices = [
  {
    title: 'Related Service',
    description: 'Brief description',
    link: '/practice-areas/related',
    urgency: 'high', // Optional: 'high', 'medium', 'low'
  },
];

export default function CompletePracticeAreaPage() {
  return (
    <StandardizedPracticeAreaTemplate
      // Core content
      title="Complete Practice Area Example"
      subtitle="Comprehensive Legal Services"
      description="Full description with all features enabled"
      // Main sections
      overview={{
        title: 'What We Do',
        content: 'Detailed explanation of services...',
        highlights: ['Free consultation', 'No fees unless we win', '24/7 availability'],
      }}
      services={services}
      faqs={faqs}
      attorneys={attorneys}
      relatedServices={relatedServices}
      // Custom CTAs (optional)
      cta={{
        primary: {
          text: 'Schedule Consultation',
          link: '/contact',
        },
        secondary: {
          text: 'Call Now',
          link: 'tel:1-844-967-3536',
        },
      }}
      // SEO metadata
      metadata={{
        title: 'SEO Title',
        description: 'SEO Description',
        keywords: 'keyword1, keyword2',
      }}
      // Language
      isSpanish={false}
      // Additional custom content
      additionalContent={
        <div>
          <h2>Custom Section</h2>
          <p>Any additional content you need...</p>
        </div>
      }
    />
  );
}
```

### Spanish Version

For Spanish pages, simply set `isSpanish={true}` and provide Spanish content:

```tsx
export default function SpanishPracticeAreaPage() {
  return (
    <StandardizedPracticeAreaTemplate
      isSpanish={true}
      title="Área de Práctica"
      subtitle="Subtítulo en Español"
      description="Descripción en español..."
      overview={{
        title: 'Resumen',
        content: 'Contenido en español...',
        highlights: ['Consulta gratuita', 'Sin honorarios si no ganamos'],
      }}
      services={[
        {
          title: 'Servicio 1',
          description: 'Descripción del servicio',
          features: ['Característica 1', 'Característica 2'],
        },
      ]}
      faqs={[
        {
          question: '¿Pregunta frecuente?',
          answer: 'Respuesta detallada...',
        },
      ]}
    />
  );
}
```

## Props Reference

### Required Props

- `title`: Main heading for the practice area
- `description`: Brief description shown in hero section
- `overview`: Object with content and optional highlights
- `services`: Array of services offered
- `faqs`: Array of frequently asked questions

### Optional Props

- `subtitle`: Secondary heading in hero section
- `attorneys`: Array of attorneys for this practice area
- `relatedServices`: Array of related practice areas
- `cta`: Custom call-to-action buttons
- `metadata`: SEO metadata
- `additionalContent`: Custom React content
- `isSpanish`: Boolean for Spanish language support

## Best Practices

1. **Keep FAQs Relevant**: Include 5-7 most common questions
2. **Service Features**: List 3-5 key features per service
3. **Attorney Info**: Include only attorneys who specialize in this area
4. **Related Services**: Link to 3-6 most relevant practice areas
5. **Highlights**: Use 4-6 key selling points in overview
6. **Custom Content**: Use `additionalContent` for practice-specific information

## Migration Guide

To migrate existing practice area pages:

1. Import the `StandardizedPracticeAreaTemplate`
2. Extract existing content into the appropriate props
3. Convert any custom sections to `additionalContent`
4. Add missing sections (FAQs, attorneys, etc.)
5. Test both English and Spanish versions

## Examples

See these files for reference implementations:

- `/src/app/practice-areas/personal-injury/car-accidents/page-new.tsx`
- `/src/app/practice-areas/immigration/page.tsx` (for comparison with old template)

## Support

For questions or issues with the template, contact the development team or refer to the component source at:
`/src/components/templates/StandardizedPracticeAreaTemplate.tsx`
