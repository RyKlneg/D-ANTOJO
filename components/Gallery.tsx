import ScrollReveal from './ScrollReveal'
import { Instagram, Facebook, Music2 } from 'lucide-react'

export default function Gallery() {
  return (
    <section
      id="galeria"
      className="py-24 bg-dantojo-cream overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Text Content */}
            <div className="text-left space-y-8">
              <h2 className="text-5xl lg:text-7xl font-display font-medium text-dantojo-dark leading-tight">
                EL ARTE DE <br /> LO DULCE
              </h2>
              <p className="text-dantojo-coffee text-lg lg:text-xl leading-relaxed max-w-lg mb-10">
                "Nuestras creaciones nacen de la pasión por la repostería y el amor por los detalles. Cada textura, cada color y cada forma están pensados para enamorar a primera vista."
              </p>

              {/* Social Media Section */}
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] font-bold text-dantojo-gold">Visítanos en nuestras redes</p>
                <div className="flex gap-4">
                  {[
                    { icon: Instagram, label: 'Instagram' },
                    { icon: Facebook, label: 'Facebook' },
                    { icon: Music2, label: 'TikTok' },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-14 h-14 rounded-2xl bg-white border border-dantojo-tan/50 flex items-center justify-center text-dantojo-dark shadow-soft transition-all duration-500 hover:-translate-y-2 hover:bg-[#2B1B12] hover:text-white"
                    >
                      <social.icon size={22} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: 4 Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square relative group overflow-hidden rounded-2xl shadow-soft">
                <img
                  src="/images/Local.jpg"
                  alt="Nuestro Local"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="aspect-square relative group overflow-hidden rounded-2xl shadow-soft">
                <img
                  src="/images/Cocina.jpg"
                  alt="Nuestra Cocina"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="aspect-square relative group overflow-hidden rounded-2xl shadow-soft">
                <img
                  src="/images/Clientes.jpg"
                  alt="Nuestros Clientes"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="aspect-square relative group overflow-hidden rounded-2xl shadow-soft">
                <img
                  src="/images/Fra.jpg"
                  alt="Historias Dulces"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
