import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Keep in-progress / private / auth / tokenized routes out of search results
      // until they are launched. Public marketing pages remain crawlable.
      disallow: [
        '/api/',
        '/portal/',
        '/auth/',
        '/dashboard',
        '/pricing',
        '/client/',
        '/tethered-together',
      ],
    },
    sitemap: 'https://lennoxfields.com/sitemap.xml',
  }
}
