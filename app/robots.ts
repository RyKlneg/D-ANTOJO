import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/actions/', '/api/'],
    },
    sitemap: 'https://d-antojo.vercel.app/sitemap.xml',
  }
}
