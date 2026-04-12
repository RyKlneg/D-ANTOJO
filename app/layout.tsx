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
  title: "D'Antojo | Repostería Artesanal & Momentos Dulces",
  description: 'Pastelería artesanal con más de 25 años de experiencia creando momentos dulces inolvidables en Querétaro. Pasteles, postres y más.',
  keywords: ['pastelería', 'repostería', 'artesanal', 'postres', 'querétaro', 'dantojo'],
  authors: [{ name: "D'Antojo" }],
  openGraph: {
    title: "D'Antojo | Repostería Artesanal",
    description: 'Más de 25 años creando momentos dulces inolvidables.',
    url: 'https://d-antojo.vercel.app',
    siteName: "D'Antojo",
    images: [
      {
        url: '/images/D1.png',
        width: 800,
        height: 600,
        alt: "D'Antojo Logo",
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "D'Antojo | Repostería Artesanal",
    description: 'Más de 25 años creando momentos dulces inolvidables.',
    images: ['/images/D1.png'],
  },
  icons: {
    icon: "/images/D1.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${InterFont.variable} ${PlayfairFont.variable}`}>
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
