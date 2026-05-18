import { Inter, Playfair_Display } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '../context/CartContext'
import dynamic from 'next/dynamic'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const InterFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const PlayfairFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

// Dynamically import components that are not critical for initial paint
const CartDrawer = dynamic(() => import('../components/CartDrawer'), { ssr: false })
const Chatbot = dynamic(() => import('../components/Chatbot'), { ssr: false })

export const metadata: Metadata = {
  metadataBase: new URL('https://d-antojo.vercel.app'),
  title: {
    default: "D'Antojo | Repostería Artesanal & Momentos Dulces en Querétaro",
    template: "%s | D'Antojo Querétaro",
  },
  description: 'Pastelería artesanal con más de 25 años de experiencia creando momentos dulces inolvidables en Querétaro. Pasteles personalizados, postres, tartas y más. ¡Pídelo a domicilio!',
  keywords: [
    'pastelería Querétaro',
    'repostería artesanal Querétaro',
    'pasteles personalizados Querétaro',
    'postres Querétaro',
    'tartas Querétaro',
    'pastel de cumpleaños Querétaro',
    'pastel de boda Querétaro',
    'dantojo',
    "D'Antojo",
    'repostería a domicilio Querétaro',
    'dulces artesanales Querétaro',
  ],
  authors: [{ name: "D'Antojo Repostería" }],
  creator: "D'Antojo",
  publisher: "D'Antojo",
  alternates: {
    canonical: 'https://d-antojo.vercel.app',
  },
  openGraph: {
    title: "D'Antojo | Repostería Artesanal en Querétaro",
    description: 'Más de 25 años creando momentos dulces inolvidables en Querétaro. Pasteles, postres y tartas artesanales.',
    url: 'https://d-antojo.vercel.app',
    siteName: "D'Antojo",
    images: [
      {
        url: '/images/D1.png',
        width: 1200,
        height: 630,
        alt: "D'Antojo Repostería Artesanal Querétaro",
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "D'Antojo | Repostería Artesanal en Querétaro",
    description: 'Más de 25 años creando momentos dulces inolvidables.',
    images: ['/images/D1.png'],
  },
  icons: {
    icon: '/images/D1.png',
    apple: '/images/D1.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  name: "D'Antojo",
  description: 'Pastelería artesanal con más de 25 años de experiencia en Querétaro.',
  url: 'https://d-antojo.vercel.app',
  logo: 'https://d-antojo.vercel.app/images/D1.png',
  image: 'https://d-antojo.vercel.app/images/D1.png',
  telephone: '', // ← Agrega tu teléfono aquí
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Querétaro',
    addressRegion: 'Querétaro',
    addressCountry: 'MX',
  },
  geo: {
    '@type': 'GeoCoordinates',
    // ← Agrega tus coordenadas para aparecer en Google Maps
    latitude: 20.5888, 
    longitude: -100.3899,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '10:00',
      closes: '18:00',
    },
  ],
  servesCuisine: 'Repostería Artesanal',
  priceRange: '$$',
  sameAs: [
    // ← Agrega tus redes sociales aquí
    // 'https://www.instagram.com/dantojo',
    // 'https://www.facebook.com/dantojo',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${InterFont.variable} ${PlayfairFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen">
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
          <Chatbot />
        </CartProvider>
      </body>
    </html>
  )
}
