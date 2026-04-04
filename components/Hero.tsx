import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F7C177] via-[#C4831A] to-[#D4942A] pt-20 overflow-hidden relative animate-fade-in"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:pl-4 lg:pr-80 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-[#ffffff] leading-tight">
              UN ANTOJO
              <br />
              <span className="text-[#2B1B12]">IMPOSIBLE DE</span>
              <br />
              OLVIDAR
            </h1>

            <p className="text-lg text-[#693D00] max-w-md mx-auto lg:mx-0">
              EL SABOR QUE NO PODRAS DEJAR DE PROBAR
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <a
                href="#productos"
                className="group inline-flex items-center gap-0 hover:gap-3 bg-[#2B1B12] text-white px-4 py-4 rounded-full font-medium hover:bg-dantojo-dark transition-all duration-300 shadow-premium"
              >
                <ArrowRight size={20} className="min-w-[20px]" />
                <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:max-w-[150px] opacity-0 group-hover:opacity-100 uppercase tracking-wider">
                  Ordena ya
                </span>
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[300px] md:h-[300px] lg:h-[400px] flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <img
              src="/images/Chocolate.png"
              alt="Chocolate Artesanal"
              className="absolute pointer-events-none select-none max-w-none
                         w-[500px] md:w-[400px] lg:w-[1200px]
                         -right-[80px] md:-right-[300px] lg:-right-[600px]
                         top-1/2 -translate-y-1/2 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
