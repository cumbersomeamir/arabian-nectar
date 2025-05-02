export const metadata = {
    title: 'Comprehensive Food Export Services | Arabian Nectar Trading',
    description: 'Discover our comprehensive suite of services including global sourcing, quality control, logistics, customized product development, and sustainable trade solutions.',
    keywords: 'food export services, global sourcing, quality control, logistics, supply chain management, Dubai food trade, Arabian Nectar Trading',
    openGraph: {
      title: 'Comprehensive Food Export Services | Arabian Nectar Trading',
      description: 'Premier food commodity export services including sourcing, logistics, quality control, and financial solutions. Specializing in rice, spices, and pulses.',
      url: 'https://arabian-nectar.com/services',
      siteName: 'Arabian Nectar Trading',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1595228702420-d3f503def93d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
          width: 1200,
          height: 630,
          alt: 'Arabian Nectar Trading Food Export Services',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Comprehensive Food Export Services | Arabian Nectar Trading',
      description: 'Premier food commodity export services including sourcing, logistics, quality control, and financial solutions. Specializing in rice, spices, and pulses.',
      images: ['https://images.unsplash.com/photo-1595228702420-d3f503def93d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: 'https://arabian-nectar.com/services',
    },
    manifest: 'https://arabian-nectar.com/manifest.json',
    // JSON-LD structured data for services
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Arabian Nectar Trading Food Export Services',
      serviceType: 'Food Export and Wholesale',
      provider: {
        '@type': 'Organization',
        name: 'Arabian Nectar Trading',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Dubai',
          addressRegion: 'Dubai',
          addressCountry: 'UAE'
        }
      },
      description: 'Comprehensive food commodity export services including global sourcing, logistics, quality control, and financial solutions. Specializing in high-quality rice, spices, and pulses.',
      areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 25.2048,
          longitude: 55.2708
        },
        geoRadius: '15000'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Arabian Nectar Trading Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Global Sourcing & Procurement'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Export & Wholesale Solutions'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Logistics & Supply Chain'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Quality Control & Certification'
            }
          }
        ]
      }
    }
  };