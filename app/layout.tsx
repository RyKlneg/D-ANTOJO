import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '../context/CartContext'
import CartDrawer from '../components/CartDrawer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: "D'Antojo",
  description: 'Pastelería artesanal con más de 25 años de experiencia creando momentos dulces inolvidables.',
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
    <html lang="es">
      <body className="antialiased">
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
