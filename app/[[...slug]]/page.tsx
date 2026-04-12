'use client'

import React, { useEffect } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Products from '@/components/Products'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'

interface PageProps {
  params: {
    slug?: string[]
  }
}

export default function Home({ params }: PageProps) {
  useEffect(() => {
    // If we have a slug (e.g., /nosotros), scroll to that section on mount
    if (params.slug && params.slug.length > 0) {
      const sectionId = params.slug[0]
      const element = document.getElementById(sectionId)
      if (element) {
        // Small delay to ensure all components are rendered and layout is ready
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 500)
        return () => clearTimeout(timer)
      }
    }
  }, [params.slug])

  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Products />
      <Gallery />
      <Contact />
    </main>
  )
}
