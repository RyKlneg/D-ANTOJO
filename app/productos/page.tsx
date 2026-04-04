'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search, ChevronRight } from 'lucide-react'
import { products, Product } from '@/data/products'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

const categories = ['Todos', 'Pasteles', 'Panadería', 'Galletas', 'Postres']

export default function ProductosPage() {
  const { addItem } = useCart()
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="min-h-screen bg-dantojo-beige pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-dantojo-coffee/60 uppercase tracking-widest mb-8">
           <Link href="/" className="hover:text-dantojo-gold transition-colors">Inicio</Link>
           <ChevronRight size={12} />
           <span className="text-dantojo-coffee">Catálogo Completo</span>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-display font-medium text-dantojo-dark mb-4">
              Nuestro Menú Completo
            </h1>
            <p className="text-dantojo-coffee/80 text-lg">
              Explora todas nuestras creaciones artesanales, desde pasteles clásicos hasta panadería tradicional.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dantojo-coffee/40 group-focus-within:text-dantojo-gold transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Buscar antojo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-dantojo-tan/50 focus:border-dantojo-gold outline-none shadow-soft transition-all"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                ? 'bg-[#2B1B12] text-white shadow-premium' 
                : 'bg-white text-dantojo-coffee hover:bg-dantojo-tan/20 border border-dantojo-tan/30'
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-premium transition-all duration-500 flex flex-col h-full border border-white/50"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-dantojo-beige/20">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-dantojo-dark uppercase tracking-widest shadow-sm">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl text-dantojo-dark mb-2 group-hover:text-dantojo-gold transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex justify-between items-baseline mb-4">
                    <p className="text-dantojo-gold font-bold text-lg">
                      {product.price}
                    </p>
                    {product.slicePrice !== '-' && (
                       <p className="text-[10px] text-dantojo-coffee/40 uppercase tracking-tighter">
                          Rebanada: <span className="font-medium text-dantojo-coffee/60">{product.slicePrice}</span>
                       </p>
                    )}
                  </div>

                  <p className="text-[11px] text-dantojo-coffee/70 italic mb-6 leading-relaxed flex-1">
                    "{product.curiosity}"
                  </p>

                  <button 
                    onClick={() => addItem(product)}
                    className="group w-full flex items-center justify-center gap-0 hover:gap-3 bg-[#2B1B12] text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-soft active:scale-95"
                  >
                    <ShoppingBag size={18} className="min-w-[18px]" />
                    <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:max-w-[150px] opacity-0 group-hover:opacity-100 uppercase text-xs tracking-widest">
                      Añadir Orden
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
             <div className="w-20 h-20 bg-dantojo-tan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-dantojo-tan" />
             </div>
             <p className="text-xl text-dantojo-dark font-display">No encontramos antojos con "{searchQuery}"</p>
             <p className="text-dantojo-coffee/60">Intenta con otra palabra o categoría.</p>
          </div>
        )}
      </div>
    </div>
  )
}
