'use client'

import { ShoppingBag } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { useCart } from '../context/CartContext'
import Image from 'next/image'

import Link from 'next/link'
import { products } from '../data/products'

const featuredProducts = products.slice(0, 6)

export default function Products() {
  const { addItem } = useCart()

  return (
    <section
      id="productos"
      className="py-24 bg-dantojo-beige"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-medium text-dantojo-dark mb-4">
              Donde el sabor se vuelve arte
            </h2>
            <p className="text-dantojo-coffee/80 max-w-2xl mx-auto">
              Cada uno de nuestros productos es elaborado artesanalmente con los mejores ingredientes y el mayor cuidado
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-premium transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="aspect-square bg-white flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl text-dantojo-dark mb-2">
                    {product.name}
                  </h3>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <p className="text-dantojo-gold font-bold text-lg">
                        {product.price}
                      </p>
                      {product.slicePrice !== '-' && (
                        <div className="relative group/tooltip">
                          {/* Info badge */}
                          <div className="w-5 h-5 rounded-full bg-dantojo-tan/60 hover:bg-dantojo-gold/20 border border-dantojo-gold/30 flex items-center justify-center cursor-default transition-colors duration-200">
                            <span className="text-[9px] font-bold text-dantojo-coffee leading-none select-none">P&R</span>
                          </div>

                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none
                                          opacity-0 scale-95 translate-y-1
                                          group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-hover/tooltip:translate-y-0
                                          transition-all duration-200 ease-out z-20">
                            {/* Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
                                            border-l-[6px] border-l-transparent
                                            border-r-[6px] border-r-transparent
                                            border-t-[6px] border-t-[#2B1B12]" />
                            {/* Content */}
                            <div className="bg-[#2B1B12] text-white rounded-xl px-4 py-3 shadow-premium w-max max-w-[180px]">
                              <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">Precios</p>
                              <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between gap-4">
                                  <span className="text-[11px] text-white/70">🎂 Pastel completo</span>
                                  <span className="text-[12px] font-bold text-dantojo-gold whitespace-nowrap">{product.price}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                  <span className="text-[11px] text-white/70">🍰 Rebanada</span>
                                  <span className="text-[12px] font-bold text-dantojo-gold whitespace-nowrap">{product.slicePrice}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-dantojo-coffee/50 uppercase tracking-widest font-medium italic">
                       Postre Artesanal
                    </span>
                  </div>

                  <p className="text-xs text-dantojo-coffee/70 italic mb-6 leading-relaxed">
                    "Sabías que... {product.curiosity}"
                  </p>

                  <button 
                    onClick={() => addItem(product)}
                    className="group w-full flex items-center justify-center gap-0 hover:gap-2 bg-[#2B1B12] text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-soft"
                  >
                    <ShoppingBag size={18} className="min-w-[18px]" />
                    <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:max-w-[150px] opacity-0 group-hover:opacity-100 uppercase text-xs tracking-wider">
                      Añadir al carrito
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Button */}
          <div className="flex justify-center">
            <Link 
              href="/catalogo"
              className="flex items-center gap-3 bg-[#2B1B12] text-white px-10 py-5 rounded-full font-medium hover:bg-dantojo-dark transition-all duration-300 shadow-premium uppercase tracking-widest text-sm"
            >
              <ShoppingBag size={22} />
              ENCUENTRA MAS PRODUCTOS
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
