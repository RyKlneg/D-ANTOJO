'use client'

import { ShoppingBag } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { useCart } from '../context/CartContext'

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
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[300px] h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl text-dantojo-dark mb-2">
                    {product.name}
                  </h3>

                  <div className="flex justify-between items-center mb-4">
                    <p className="text-dantojo-gold font-bold text-lg">
                      {product.price}
                    </p>
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
              href="/productos"
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
