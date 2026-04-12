'use client'

import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import emailjs from '@emailjs/browser'
import { motion, AnimatePresence } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    mensaje: '',
  })
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    setStatus('idle')

    try {
      const templateParams = {
        name: formData.nombre,        // Adding alternative for {{name}}
        from_name: formData.nombre,   // Keeping original for {{from_name}}
        phone: formData.telefono,     // Adding alternative for {{phone}}
        from_phone: formData.telefono,// Keeping original for {{from_phone}}
        email: formData.correo,      // Adding alternative for {{email}}
        reply_to: formData.correo,    // Keeping original for {{reply_to}}
        message: formData.mensaje,
      }

      // Send both admin notification and customer auto-reply
      await Promise.all([
        emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        ),
        emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID!,
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        )
      ])

      setStatus('success')
      setFormData({ nombre: '', telefono: '', correo: '', mensaje: '' })
      
      // Reset success status after a delay
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('Email error:', error)
      setStatus('error')
    } finally {
      setIsSending(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id="contacto"
      className="py-24 bg-dantojo-beige"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="bg-[#2B1B12] rounded-3xl overflow-hidden shadow-premium">
            <div className="grid lg:grid-cols-2">
              {/* Form Section */}
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl lg:text-4xl font-display font-medium text-white mb-8">
                  SOLICITAR INFORMACIÓN
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="nombre" className="block text-white/90 text-sm mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl bg-white border-0 text-dantojo-dark placeholder-dantojo-coffee/50 focus:outline-none focus:ring-2 focus:ring-dantojo-gold"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-white/90 text-sm mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl bg-white border-0 text-dantojo-dark placeholder-dantojo-coffee/50 focus:outline-none focus:ring-2 focus:ring-dantojo-gold"
                      placeholder="Tu teléfono"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="correo" className="block text-white/90 text-sm mb-2">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl bg-white border-0 text-dantojo-dark placeholder-dantojo-coffee/50 focus:outline-none focus:ring-2 focus:ring-dantojo-gold"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-white/90 text-sm mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-5 py-3 rounded-xl bg-white border-0 text-dantojo-dark placeholder-dantojo-coffee/50 focus:outline-none focus:ring-2 focus:ring-dantojo-gold resize-none"
                      placeholder="¿En qué podemos ayudarte?"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="group relative inline-flex items-center justify-center gap-3 bg-white text-dantojo-dark px-10 py-3 rounded-full font-medium hover:bg-dantojo-gold hover:text-white transition-all duration-500 overflow-hidden hover:scale-105 active:scale-95 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 uppercase tracking-widest text-sm transition-transform duration-500 group-hover:-translate-x-2">
                      {isSending ? 'Enviando...' : 'Enviar'}
                    </span>
                    {!isSending && (
                      <>
                        <div className="relative z-10 transition-all duration-500 transform group-hover:translate-x-4 group-hover:-translate-y-4 group-hover:opacity-0">
                          <Send size={18} />
                        </div>
                        <div className="absolute left-0 translate-x-[40%] opacity-0 group-hover:left-[60%] group-hover:opacity-100 transition-all duration-500 delay-100">
                          <Send size={18} />
                        </div>
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-green-400 font-medium"
                      >
                        <CheckCircle2 size={18} />
                        <span>¡Mensaje enviado con éxito! Te contactaremos pronto.</span>
                      </motion.div>
                    )}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 font-medium"
                      >
                        Ocurrió un error al enviar. Inténtalo de nuevo.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>

              {/* Image Section */}
              <div className="relative hidden lg:block overflow-hidden">
                <img
                  src="/images/Form.jpg"
                  alt="Contacto D'Antojo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
