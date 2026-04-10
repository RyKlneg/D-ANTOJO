'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navLinks = [
  { name: 'Inicio', section: 'inicio' },
  { name: 'Nosotros', section: 'nosotros' },
  { name: 'Productos', section: 'productos' },
  { name: 'Galería', section: 'galeria' },
  { name: 'Contáctanos', section: 'contacto' },
]

const scrollToSection = (sectionId: string) => {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [isScrolled, setIsScrolled] = useState(false)
  const { cartCount, setIsCartOpen } = useCart()

  // Precise section background mapping
  const sectionColors: Record<string, string> = {
    inicio: 'bg-[#C4831A]', // Match Hero main color
    nosotros: 'bg-[#FDF8F3]', // Match dantojo-cream
    productos: 'bg-[#F5F0E8]', // Match dantojo-beige 
    galeria: 'bg-[#FDF8F3]', // Match dantojo-cream
    contacto: 'bg-[#F5F0E8]', // Match dantojo-beige
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -80% 0px', // Trigger exactly when top of navbar enters
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          setActiveSection(sectionId)

          // Sync URL during scroll without hash
          const newPath = sectionId === 'inicio' ? '/' : `/${sectionId}`
          if (window.location.pathname !== newPath) {
            window.history.pushState(null, '', newPath)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Select all sections
    const sections = ['inicio', 'nosotros', 'productos', 'galeria', 'contacto']
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    window.addEventListener('scroll', handleScroll)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const isHomePage = pathname === '/'
  const currentBg = sectionColors[activeSection] || 'bg-dantojo-beige'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 backdrop-blur-sm ${!isHomePage ? 'bg-dantojo-beige' :
      isScrolled ? `${currentBg}` : 'bg-transparent'
      }`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:pl-4 lg:pr-12">
        <div className="flex items-center h-20 relative">
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center group">
              <div className="w-auto transform group-hover:scale-105 transition-transform duration-500">
                <img
                  src="/images/D.png"
                  alt="D'Antojo Logo"
                  className="h-10 md:h-14 w-auto object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Center: Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.section)}
                className="relative group py-2"
              >
                <span className="text-sm font-medium text-[#2B1B12] tracking-wide focus:outline-none">
                  {link.name.toUpperCase()}
                </span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#2B1B12] transform transition-transform duration-300 origin-center ${
                  activeSection === link.section
                    ? 'scale-x-100' 
                    : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>
            ))}
          </div>

          {/* Right: Cart & Mobile Menu */}
          <div className="flex-1 flex justify-end items-center gap-4">
            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="group relative flex items-center gap-0 hover:gap-2 bg-[#2B1B12] text-white px-3 py-2 rounded-full transition-all duration-300 shadow-soft"
            >
              <div className="relative">
                <ShoppingBag size={20} className="min-w-[20px]" />
                <AnimatePresence mode="popLayout">
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute -top-2 -right-2 bg-dantojo-gold text-dantojo-dark text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#2B1B12]"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold tracking-tighter transition-all duration-500 group-hover:max-w-[120px] opacity-0 group-hover:opacity-100 uppercase">
                Ir al carrito
              </span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-dantojo-dark"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-dantojo-cream border-t border-dantojo-tan">
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => { scrollToSection(link.section); setIsOpen(false) }}
                  className={`px-6 py-3 font-medium transition-colors text-left ${
                    activeSection === link.section
                      ? 'text-dantojo-gold bg-dantojo-tan/20' 
                      : 'text-dantojo-coffee hover:bg-dantojo-tan/50'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
