'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User, ChevronRight } from 'lucide-react'

const FAQ_OPTIONS = [
  { id: 'menu', text: 'Ver el Menú 🍰', response: '¡Claro! Nuestras especialidades te esperan. Puedes bajar a la sección de productos para ver todo lo que tenemos hoy.', action: 'scroll-productos' },
  { id: 'ubicacion', text: '¿Dónde están? 📍', response: 'Nos encantaría recibirte. Nuestra sucursal principal está en Calle del Sol #123, Ciudad de México. Abrimos de Martes a Domingo, de 9 AM a 8 PM.' },
  { id: 'humano', text: 'Hablar con un humano 👋', response: '¡Hola! Te pondré en contacto directo con nuestro equipo por WhatsApp.', action: 'whatsapp' },
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: '¡Hola! Soy el asistente virtual de D\'Antojo. ✨\n¿En qué puedo ayudarte hoy?', sender: 'bot' }
  ])
  const [showOptions, setShowOptions] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleOptionClick = (option: typeof FAQ_OPTIONS[0]) => {
    // Add user message
    const userMsg = { id: Date.now(), text: option.text, sender: 'user' }
    setMessages(prev => [...prev, userMsg])
    setShowOptions(false)

    // Bot response delay
    setTimeout(() => {
      const botMsg = { id: Date.now() + 1, text: option.response, sender: 'bot' }
      setMessages(prev => [...prev, botMsg])

      // Execute actions
      if (option.action === 'scroll-productos') {
        window.location.href = '#productos'
      } else if (option.action === 'whatsapp') {
        window.open('https://wa.me/529931555701', '_blank')
      }

      // Re-show options after a short delay
      setTimeout(() => setShowOptions(true), 1500)
    }, 800)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#2B1B12] text-[#C9A962] rounded-full flex items-center justify-center shadow-premium relative group overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.5 }}>
              <div className="relative">
                <MessageCircle size={32} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#2B1B12] animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-dantojo-tan/50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#2B1B12] p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-inner">
                <img src="/images/D.png" alt="D'Antojo" className="w-8 h-auto" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-display text-lg leading-tight">Asistente D'Antojo</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-white/60 text-xs">En línea</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 h-[400px] overflow-y-auto p-6 bg-dantojo-cream/30 space-y-4 scroll-smooth"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === 'bot' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                    msg.sender === 'bot' 
                      ? 'bg-white text-dantojo-dark border border-dantojo-tan/30 rounded-tl-none' 
                      : 'bg-[#2B1B12] text-white rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {!showOptions && messages[messages.length - 1].sender === 'user' && (
                <div className="flex justify-start">
                   <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-dantojo-tan/30 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-dantojo-gold rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-dantojo-gold rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-dantojo-gold rounded-full animate-bounce" />
                   </div>
                </div>
              )}

              {/* FAQ Options */}
              {showOptions && (
                <div className="space-y-2 pt-2">
                  {FAQ_OPTIONS.map((option) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ x: 5, backgroundColor: '#FDF8F3' }}
                      onClick={() => handleOptionClick(option)}
                      className="w-full text-left p-4 rounded-2xl bg-white border border-dantojo-tan/50 text-dantojo-dark text-sm flex items-center justify-between group shadow-sm transition-all"
                    >
                      <span>{option.text}</span>
                      <ChevronRight size={16} className="text-dantojo-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-dantojo-tan text-center">
              <p className="text-[10px] text-dantojo-coffee/40 uppercase tracking-[0.2em] font-medium">
                D'Antojo Repostería Artesanal
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
