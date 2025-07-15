import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { NEAR_ME_SERVICES, NEAR_ME_CITIES } from '@/lib/seo/near-me-page-generator';

export const metadata: Metadata = {
  title: 'Lawyers Near Me in North Carolina | Find Legal Help Near You | Vasquez Law Firm',
  description:
    'Find the best lawyers near you in NC. Immigration, personal injury, criminal defense, workers comp. 24/7 availability. Free consultation. Se habla español.',
  keywords:
    'lawyers near me, attorneys near me, law firm near me, abogado cerca de mi, legal help near me',
};

export default function NearMeHubPage() {
  return (
    <div className="min-h-screen bg-black">
      <section className="py-20 bg-gradient-to-br from-primary/20 via-black to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              Find Legal Help Near You in North Carolina
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Top-rated attorneys available 24/7 across NC. Free consultation. Se habla español.
              Choose your service and location below.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-300 transition-all"
              >
                <Phone className="mr-2" />
                Call Now: 1-844-YO-PELEO
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-all border border-white/20"
              >
                <MapPin className="mr-2" />
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Select Your Legal Service
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {NEAR_ME_SERVICES.map(service => (
                <div
                  key={service.slug}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
                >
                  <h3 className="text-2xl font-bold text-primary mb-4">{service.service}</h3>
                  <p className="text-gray-300 mb-6">
                    Find the best {service.service.toLowerCase()} near you in North Carolina.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Available in:</p>
                    <div className="flex flex-wrap gap-2">
                      {NEAR_ME_CITIES.slice(0, 3).map(city => (
                        <Link
                          key={city.slug}
                          href={`/near-me/${city.slug}-${service.slug}-near-me`}
                          className="text-sm px-3 py-1 bg-white/10 rounded-full hover:bg-primary hover:text-black transition-all"
                        >
                          {city.name}
                        </Link>
                      ))}
                      <span className="text-sm px-3 py-1 text-gray-400">
                        +{NEAR_ME_CITIES.length - 3} more
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-white text-center mb-12">Browse by City</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {NEAR_ME_CITIES.map(city => (
                <div key={city.slug} className="text-center">
                  <h4 className="font-semibold text-white mb-3">{city.name}</h4>
                  <div className="space-y-2">
                    {NEAR_ME_SERVICES.slice(0, 3).map(service => (
                      <Link
                        key={service.slug}
                        href={`/near-me/${city.slug}-${service.slug}-near-me`}
                        className="block text-sm text-gray-400 hover:text-primary transition-colors"
                      >
                        {service.service}
                      </Link>
                    ))}
                    <Link
                      href={`/locations/nc/${city.slug}`}
                      className="block text-sm text-primary hover:text-primary-300 transition-colors font-semibold"
                    >
                      View All Services →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary to-primary-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black text-black mb-6">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-xl text-black/80 mb-8">
              We serve all of North Carolina with every type of legal service. Call us now for
              immediate help.
            </p>
            <a
              href="tel:1-844-967-3536"
              className="inline-flex items-center px-8 py-4 bg-black text-primary font-bold rounded-lg hover:bg-gray-900 transition-all"
            >
              <Phone className="mr-2" />
              Call 24/7: 1-844-YO-PELEO
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
