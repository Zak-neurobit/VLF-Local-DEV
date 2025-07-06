import type { Metadata } from 'next'
import ResourceLeadCaptureForm from '@/components/ResourceLeadCaptureForm'
import Link from 'next/link'
import { Download, FileText, Calculator, Clock, Shield, BookOpen, Users, Scale } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Immigration Resources & Guides | Vasquez Law Firm',
  description: 'Free immigration resources including guides on visa processes, document checklists, timeline calculators, and more. Download helpful tools for your immigration journey.',
  keywords: 'immigration resources, visa guides, immigration checklists, USCIS forms, immigration timeline, free immigration help',
  openGraph: {
    title: 'Free Immigration Resources & Guides',
    description: 'Download comprehensive guides and tools to help navigate your immigration process.',
    images: ['/images/immigration-resources.jpg'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/resources/immigration',
    languages: {
      'en': '/resources/immigration',
      'es': '/es/recursos/inmigracion',
    },
  },
}

// Define resource types
interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'checklist' | 'calculator' | 'template';
  category: string;
  downloadUrl?: string;
  interactiveUrl?: string;
  icon: React.ComponentType<{ className?: string }>;
  featured?: boolean;
  languages?: ('en' | 'es')[];
}

const immigrationResources: Resource[] = [
  {
    id: 'immigration-process-guide-2024',
    title: '2024 Immigration Process Guide',
    description: 'Comprehensive guide covering all major visa types, timelines, document requirements, and step-by-step processes for U.S. immigration.',
    type: 'guide',
    category: 'General Immigration',
    downloadUrl: '/api/resources/download/immigration-process-guide',
    icon: BookOpen,
    featured: true,
    languages: ['en', 'es'],
  },
  {
    id: 'document-checklist-family-visa',
    title: 'Family-Based Visa Document Checklist',
    description: 'Complete checklist of all documents needed for family-based immigration petitions, including I-130 and adjustment of status.',
    type: 'checklist',
    category: 'Family Immigration',
    downloadUrl: '/api/resources/download/family-visa-checklist',
    icon: FileText,
    languages: ['en', 'es'],
  },
  {
    id: 'document-checklist-employment',
    title: 'Employment-Based Visa Document Checklist',
    description: 'Essential documents required for H-1B, L-1, EB categories, and other employment-based visa applications.',
    type: 'checklist',
    category: 'Employment Immigration',
    downloadUrl: '/api/resources/download/employment-visa-checklist',
    icon: FileText,
    languages: ['en'],
  },
  {
    id: 'processing-time-calculator',
    title: 'Visa Processing Time Calculator',
    description: 'Interactive tool to estimate processing times for different visa categories based on current USCIS data.',
    type: 'calculator',
    category: 'Tools',
    interactiveUrl: '/resources/calculators/visa-processing-time',
    icon: Calculator,
    featured: true,
  },
  {
    id: 'asylum-application-guide',
    title: 'Asylum Application Guide',
    description: 'Step-by-step guide for asylum seekers, including eligibility requirements, interview preparation, and timeline expectations.',
    type: 'guide',
    category: 'Humanitarian',
    downloadUrl: '/api/resources/download/asylum-guide',
    icon: Shield,
    languages: ['en', 'es'],
  },
  {
    id: 'citizenship-test-prep',
    title: 'U.S. Citizenship Test Preparation Guide',
    description: '100 civics questions with answers, English test tips, and interview preparation strategies.',
    type: 'guide',
    category: 'Citizenship',
    downloadUrl: '/api/resources/download/citizenship-test-prep',
    icon: Scale,
    featured: true,
    languages: ['en', 'es'],
  },
  {
    id: 'daca-renewal-checklist',
    title: 'DACA Renewal Checklist & Timeline',
    description: 'Complete checklist and timeline for DACA renewal applications, including required forms and supporting documents.',
    type: 'checklist',
    category: 'DACA',
    downloadUrl: '/api/resources/download/daca-renewal-checklist',
    icon: Clock,
    languages: ['en', 'es'],
  },
  {
    id: 'removal-defense-guide',
    title: 'Know Your Rights: Removal Defense Guide',
    description: 'Essential information about your rights in removal proceedings, court procedures, and possible forms of relief.',
    type: 'guide',
    category: 'Removal Defense',
    downloadUrl: '/api/resources/download/removal-defense-guide',
    icon: Shield,
    languages: ['en', 'es'],
  },
];

// Group resources by category
const resourcesByCategory = immigrationResources.reduce((acc, resource) => {
  if (!acc[resource.category]) {
    acc[resource.category] = [];
  }
  acc[resource.category].push(resource);
  return acc;
}, {} as Record<string, Resource[]>);

// Get featured resources
const featuredResources = immigrationResources.filter(r => r.featured);

export default function ImmigrationResourcesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Immigration Resources & Guides
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Download comprehensive guides, checklists, and tools to help you navigate the U.S. immigration system with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#featured"
                className="bg-white text-[#6B1F2E] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Browse Resources
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-[#6B1F2E] transition-all inline-flex items-center justify-center"
              >
                Get Legal Help
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section id="featured" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Resources
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our most popular and comprehensive resources to help you get started
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredResources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <div key={resource.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] rounded-full flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {resource.description}
                      </p>
                      
                      {/* Language badges */}
                      {resource.languages && (
                        <div className="flex gap-2 mb-6">
                          {resource.languages.map(lang => (
                            <span key={lang} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                              {lang === 'en' ? 'English' : 'Español'}
                            </span>
                          ))}
                        </div>
                      )}

                      <ResourceLeadCaptureForm
                        resourceId={resource.id}
                        resourceTitle={resource.title}
                        resourceUrl={resource.downloadUrl || resource.interactiveUrl}
                        resourceType={resource.downloadUrl ? 'download' : 'redirect'}
                        practiceArea="immigration"
                        className="mt-auto"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* All Resources by Category */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                All Immigration Resources
              </h2>
              <p className="text-lg text-gray-600">
                Browse our complete library of immigration resources organized by category
              </p>
            </div>

            {Object.entries(resourcesByCategory).map(([category, resources]) => (
              <div key={category} className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Users className="w-6 h-6 text-[#6B1F2E]" />
                  {category}
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources.map((resource) => {
                    const Icon = resource.icon;
                    return (
                      <div key={resource.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-[#6B1F2E]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {resource.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-3">
                              {resource.description}
                            </p>
                            
                            {/* Type badge */}
                            <span className="inline-block px-3 py-1 bg-[#6B1F2E]/10 text-[#6B1F2E] text-xs font-medium rounded-full mb-4">
                              {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                            </span>
                          </div>
                        </div>
                        
                        {resource.downloadUrl ? (
                          <a
                            href={resource.downloadUrl}
                            className="w-full bg-[#6B1F2E] hover:bg-[#8B2635] text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                          >
                            <Download className="w-4 h-4" />
                            Download Now
                          </a>
                        ) : (
                          <Link
                            href={resource.interactiveUrl!}
                            className="w-full bg-[#6B1F2E] hover:bg-[#8B2635] text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                          >
                            <Calculator className="w-4 h-4" />
                            Use Calculator
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Help Section */}
      <section className="py-16 bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Need Personalized Legal Guidance?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              While these resources are helpful starting points, every immigration case is unique. 
              Our experienced attorneys can provide personalized advice and representation tailored to your specific situation.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-white/80">Years of Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">5,000+</div>
                <div className="text-white/80">Cases Handled</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-white/80">Success Rate</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-[#6B1F2E] font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                Schedule Free Consultation
              </Link>
              <a
                href="tel:1-866-302-3427"
                className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-[#6B1F2E] transition-all inline-flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Call 1-866-302-3427
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}