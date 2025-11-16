/**
 * Schema.org Structured Data Component
 * Provides LocalBusiness JSON-LD markup for improved SEO
 */

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://lennoxfields.org',
    name: 'Lennox Fields Clinical Mental Health Services',
    alternateName: 'Lennox Fields Therapy',
    description: 'Evidence-based mental health counseling and therapy services in North Carolina and Indiana. Individual therapy, couples counseling, family therapy, and professional resources.',
    url: 'https://lennoxfields.org',
    logo: 'https://lennoxfields.org/logo.png',
    image: 'https://lennoxfields.org/images/og-image.jpg',
    priceRange: '$$',
    telephone: '+1-XXX-XXX-XXXX', // Update with actual phone
    email: 'contact@lennoxfields.org',

    // Address - Update with actual office address if physical location exists
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'North Carolina',
      addressRegion: 'NC',
      addressCountry: 'US'
    },

    // Areas served
    areaServed: [
      {
        '@type': 'State',
        name: 'North Carolina'
      },
      {
        '@type': 'State',
        name: 'Indiana'
      }
    ],

    // Services offered
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mental Health Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Individual Therapy',
            description: 'One-on-one therapy for anxiety, depression, trauma, and life transitions'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Couples Therapy',
            description: 'Marriage and relationship counseling using EFT and Gottman methods'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Family Therapy',
            description: 'Family counseling for communication, conflict resolution, and relationships'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Teen & Adolescent Therapy',
            description: 'Specialized therapy for teenagers and adolescents ages 13-18'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Career Counseling',
            description: 'Career guidance, job search support, and professional development'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Substance Use Treatment',
            description: 'Evidence-based treatment for substance use disorders and addiction'
          }
        }
      ]
    },

    // Opening hours - Update with actual schedule
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '09:00',
        closes: '15:00'
      }
    ],

    // Professional credentials
    founder: {
      '@type': 'Person',
      name: 'Tamara Walls',
      jobTitle: 'Licensed Professional Counselor Associate',
      description: 'M.Ed, LPCA - Licensed mental health counselor specializing in CBT, EMDR, and trauma-informed care',
      knowsAbout: ['Cognitive Behavioral Therapy', 'EMDR', 'Trauma Therapy', 'Career Counseling', 'Couples Therapy'],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: '[University Name]' // Update with actual education
      }
    },

    // Same as organization
    sameAs: [
      // Add actual social media profiles when created
      // 'https://www.facebook.com/lennoxfields',
      // 'https://www.linkedin.com/in/tamarawalls',
      // 'https://www.instagram.com/lennoxfields',
      // 'https://www.psychologytoday.com/us/therapists/tamara-walls'
    ],

    // Additional properties
    paymentAccepted: 'Cash, Credit Card, Check, Insurance',
    currenciesAccepted: 'USD',

    // Aggregated rating - Only add when you have real reviews
    // Do not uncomment until you have actual verified reviews
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: '5.0',
    //   reviewCount: '25'
    // }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
