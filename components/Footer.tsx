import { Instagram, Facebook, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#2B1B12] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo Section */}
          <div className="lg:col-span-1">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4">
              <img
                src="/images/D.png"
                alt="D'Antojo Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Explora</h4>
            <ul className="space-y-2">
              <li>
                <a href="#nosotros" className="text-white/70 hover:text-white transition-colors">Nosotros</a>
              </li>
              <li>
                <a href="#productos" className="text-white/70 hover:text-white transition-colors">Productos</a>
              </li>
              <li>
                <a href="#galeria" className="text-white/70 hover:text-white transition-colors">Galería</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-medium mb-4">Horario</h4>
            <ul className="space-y-2 text-white/70">
              <li>Martes - Domingo</li>
              <li>9:00 AM - 8:00 PM</li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-medium mb-4">Atención al Cliente</h4>
            <div className="space-y-2 text-white/70 text-sm">
              <p>Dirección: Calle del Sol #123, Ciudad de México, CDMX.</p>
              <p>Teléfono: +52 55 1234 5678</p>
              <p>Email: contacto@dantojo.mx</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-dantojo-dark transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-dantojo-dark transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-dantojo-dark transition-colors"
              >
                <MessageCircle size={18} />
              </a>
            </div>

            {/* Legal Links */}
            <div className="text-white/60 text-sm text-center">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
              {' | '}
              <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
              {' | '}
              <a href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</a>
            </div>

            {/* Copyright */}
            <p className="text-white/50 text-sm">
              © 2026 D'Antojo. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
