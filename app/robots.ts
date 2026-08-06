import { MetadataRoute } from 'next'

// Site retired — nothing here should be crawled or indexed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}
