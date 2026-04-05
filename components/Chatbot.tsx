'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User, ChevronRight } from 'lucide-react'

const FAQ_OPTIONS = [
  { id: 'menu', text: 'Ver el Menú 🍰', response: '¡Claro! Nuestras especialidades te esperan. Puedes bajar a la sección de productos para ver todo lo que tenemos hoy.', action: 'scroll-productos' },
  { id: 'ubicacion', text: '¿Dónde están? 📍', response: 'Nos encantaría recibirte. Nuestra sucursal principal está en Calle del Sol #123, Ciudad de México. Abrimos de Martes a Domingo, de 9 AM a 8 PM.' },
  { id: 'humano', text: 'Hablar con un humano 👋', response: '¡Hola! Te pondré en contacto directo con nuestro equipo por WhatsApp.', action: 'whatsapp' },
]

const KNOWLEDGE_BASE = [
  { keywords: ['precio', 'costo', 'cuanto', 'vale', 'tarifa', 'barato', 'caro'], response: 'Nuestros pasteles artesanales varían entre $380 y $520 MXN. Las rebanadas individuales están entre $45 y $75 MXN. ¡Puedes ver el detalle en nuestra sección de Productos!' },
  { keywords: ['comprar', 'pedir', 'donde', 'ubicacion', 'sucursal', 'donde estan', 'direccion', 'local'], response: 'Estamos ubicados en Calle del Sol #123, CDMX. También puedes hacer tu pedido directamente aquí en la web y te enviará a WhatsApp para confirmar.' },
  { keywords: ['horario', 'abierto', 'cierran', 'hora', 'dias', 'mañana', 'tarde'], response: 'Abrimos de Martes a Domingo, de 9 AM a 8 PM. ¡Te esperamos para endulzar tu día!' },
  { keywords: ['envio', 'domicilio', 'entrega', 'casa', 'llevar'], response: '¡Sí! Contamos con servicio a domicilio en toda la zona metropolitana. El costo depende de la distancia, pero lo coordinamos contigo por WhatsApp al finalizar tu orden.' },
  { keywords: ['hola', 'buen dia', 'saludos', 'que tal', 'buenas', 'hey'], response: '¡Hola! Qué gusto saludarte. Soy el asistente de D\'Antojo. ¿Te gustaría saber sobre nuestros pasteles, horarios o cómo hacer un pedido?' },
  { keywords: ['gracias', 'gracias!', 'ok', 'entendido'], response: '¡De nada! Es un placer ayudarte. Si necesitas algo más, aquí estaré. ✨' },
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: '¡Hola! Soy el asistente virtual de D\'Antojo. ✨\n¿En qué puedo ayudarte hoy?', sender: 'bot' }
  ])
  const [showOptions, setShowOptions] = useState(true)
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSendMessage = (text: string) => {
    if (!text.trim() || isTyping) return

    // Add user message
    const userMsg = { id: Date.now(), text, sender: 'user' }
    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setShowOptions(false)
    setIsTyping(true)

    // Bot response logic
    setTimeout(() => {
      const lowerText = text.toLowerCase()
      let response = 'Lo siento, no entendí bien eso. ¿Podrías intentar con otra palabra o usar mis opciones rápidas? 🍰'
      
      // Look for keywords in Knowledge Base
      for (const entry of KNOWLEDGE_BASE) {
        if (entry.keywords.some(kw => lowerText.includes(kw))) {
          response = entry.response
          break
        }
      }

      const botMsg = { id: Date.now() + 1, text: response, sender: 'bot' }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)

      // Always show options after a while
      setTimeout(() => setShowOptions(true), 2000)
    }, 1200)
  }

  const handleOptionClick = (option: typeof FAQ_OPTIONS[0]) => {
    const userMsg = { id: Date.now(), text: option.text, sender: 'user' }
    setMessages(prev => [...prev, userMsg])
    setShowOptions(false)
    setIsTyping(true)

    setTimeout(() => {
      const botMsg = { id: Date.now() + 1, text: option.response, sender: 'bot' }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)

      if (option.action === 'scroll-productos') {
        window.location.href = '#productos'
      } else if (option.action === 'whatsapp') {
        window.open('https://wa.me/529931555701', '_blank')
      }

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
            initial={{ opacity: 0, y: 50, x: '-50%', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 50, x: '-50%', scale: 0.95 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 w-[350px] sm:w-[400px] bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-dantojo-tan/50 flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-[#2B1B12] p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-inner overflow-hidden">
                <img src="/images/D.png" alt="D'Antojo" className="w-6 h-auto" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-display text-base leading-tight">Asistente D'Antojo</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">En línea</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/20 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 bg-dantojo-cream/20 space-y-4 scroll-smooth flex flex-col"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                    msg.sender === 'bot' 
                      ? 'bg-white text-dantojo-dark border border-dantojo-tan/20 rounded-tl-none' 
                      : 'bg-[#2B1B12] text-white rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-dantojo-tan/20 flex gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-dantojo-gold rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-dantojo-gold rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-dantojo-gold rounded-full animate-bounce" />
                   </div>
                </div>
              )}

              {/* FAQ Options */}
              {showOptions && !isTyping && (
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] text-dantojo-coffee/40 uppercase tracking-widest font-bold mb-1 pl-1">Sugerencias rápidas:</p>
                  {FAQ_OPTIONS.map((option) => (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 5, backgroundColor: '#FDF8F3' }}
                      onClick={() => handleOptionClick(option)}
                      className="w-full text-left p-3 rounded-xl bg-white border border-dantojo-tan/30 text-dantojo-dark text-xs flex items-center justify-between group shadow-sm transition-all"
                    >
                      <span>{option.text}</span>
                      <ChevronRight size={14} className="text-dantojo-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-dantojo-tan/30">
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage(inputText)
                }}
                className="relative flex items-center gap-2"
              >
                <input 
                  type="text"
                  placeholder="Haz una pregunta..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-dantojo-cream/30 border border-dantojo-tan/50 rounded-full pl-5 pr-12 py-3 text-sm text-dantojo-dark placeholder:text-dantojo-coffee/40 focus:outline-none focus:ring-2 focus:ring-dantojo-gold/20 focus:border-dantojo-gold/50 transition-all"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="absolute right-1.5 w-10 h-10 bg-[#2B1B12] text-white rounded-full flex items-center justify-center hover:bg-dantojo-dark transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                >
                  <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
              <div className="mt-3 text-center">
                 <p className="text-[9px] text-dantojo-coffee/30 uppercase tracking-[0.2em] font-medium">
                  Atención Automatizada D'Antojo
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
