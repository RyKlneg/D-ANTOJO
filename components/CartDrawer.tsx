'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ArrowLeft, CreditCard, Banknote, Store, CheckCircle2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { QRCodeSVG } from 'qrcode.react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { createPaymentIntent } from '../app/actions/stripe'
import StripeCheckoutForm from './StripeCheckoutForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeItem,
    updateQuantity,
    subtotal
  } = useCart()

  // Card & Payment States
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isInitializingStripe, setIsInitializingStripe] = useState(false)

  // State for step and order
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [orderNumber, setOrderNumber] = useState('')
  const [isPaying, setIsPaying] = useState(false)

  // Reset step when drawer closes
  useEffect(() => {
    if (!isCartOpen) {
      setTimeout(() => {
        setStep(1)
        setPaymentMethod(null)
        setOrderNumber('')
        setClientSecret(null)
      }, 500)
    }
  }, [isCartOpen])

  const handleNext = async () => {
    if (step === 2 && paymentMethod === 'tarjeta') {
      setIsInitializingStripe(true)
      const res = await createPaymentIntent(subtotal)

      if (res.clientSecret) {
        setClientSecret(res.clientSecret)
        setStep(2.5)
      } else {
        alert('Error al iniciar el pago con tarjeta. Inténtalo de nuevo.')
      }
      setIsInitializingStripe(false)
    } else {
      setStep((prev: number) => Math.floor(prev) + 1)
    }
  }

  // Order number logic (keep as is)
  useEffect(() => {
    if (step === 3 && !orderNumber) {
      const num = Math.floor(1000 + Math.random() * 9000)
      setOrderNumber(`DT-${num}`)
    }
  }, [step, orderNumber])

  const handleBack = () => {
    if (step === 2.5) {
      setStep(2)
      setClientSecret(null)
    } else if (step === 3) {
      setStep(2) // Allow going back to methods
    } else {
      setStep((prev: number) => prev - 1)
    }
  }

  const handleFinalize = () => {
    const whatsappNumber = '521234567890' // Placeholder
    const itemsList = cartItems
      .map(item => `- ${item.name} x${item.quantity} (${item.price})`)
      .join('%0A')

    const paymentText = paymentMethod === 'tarjeta' ? 'Tarjeta' : paymentMethod === 'efectivo' ? 'Efectivo' : 'Pago en Sucursal'

    const message = `Hola! Me gustaría realizar un pedido de D'Antojo:%0A%0A*Pedido:* ${orderNumber}%0A*Método de Pago:* ${paymentText}%0A%0A*Productos:*%0A${itemsList}%0A%0A*Total:* $${subtotal.toLocaleString()} MXN%0A%0AGracias!`

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
    setIsCartOpen(false)
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-dantojo-cream shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-dantojo-tan flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                {step > 1 && (
                  <button onClick={handleBack} className="p-1 -ml-2 hover:bg-dantojo-beige rounded-full transition-colors text-dantojo-coffee">
                    <ArrowLeft size={20} />
                  </button>
                )}
                <div className="flex items-center gap-2">
                  <ShoppingBag className="text-dantojo-gold" size={24} />
                  <h2 className="text-xl font-display font-medium text-dantojo-dark">
                    {step === 1 ? 'Tu Carrito' : step === 2 ? 'Método de Pago' : step === 2.5 ? 'Datos de Tarjeta' : 'Confirmación'}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-dantojo-beige rounded-full transition-colors"
              >
                <X size={24} className="text-dantojo-coffee" />
              </button>
            </div>

            {/* Content Container */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1 flex flex-col overflow-hidden"
                  >
                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                          <div className="w-20 h-20 bg-dantojo-beige rounded-full flex items-center justify-center">
                            <ShoppingBag size={32} className="text-dantojo-tan" />
                          </div>
                          <div>
                            <p className="text-lg font-medium text-dantojo-dark">Tu carrito está vacío</p>
                            <p className="text-sm text-dantojo-coffee/60">¡Anímate a probar nuestras delicias!</p>
                          </div>
                          <button
                            onClick={() => setIsCartOpen(false)}
                            className="text-dantojo-gold font-medium hover:underline"
                          >
                            Volver a la tienda
                          </button>
                        </div>
                      ) : (
                        cartItems.map((item: any) => (
                          <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-soft">
                            <div className="w-20 h-20 bg-dantojo-beige rounded-xl overflow-hidden flex-shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                              <div className="flex justify-between items-start">
                                <h3 className="font-display text-dantojo-dark leading-tight">{item.name}</h3>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-dantojo-coffee/40 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="space-y-0.5">
                                  <p className="text-dantojo-gold font-bold">{item.price}</p>
                                  {item.slicePrice && (
                                    <p className="text-[10px] text-dantojo-coffee/40 uppercase tracking-tighter">
                                      Rebanada: <span className="font-medium text-dantojo-coffee/60">{item.slicePrice}</span>
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 bg-dantojo-beige/50 rounded-lg px-2 py-1">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 hover:text-dantojo-gold transition-colors"
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span className="text-sm font-bold min-w-[20px] text-center">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 hover:text-dantojo-gold transition-colors"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {/* Step 1 Footer */}
                    {cartItems.length > 0 && (
                      <div className="p-6 bg-white border-t border-dantojo-tan space-y-4">
                        <div className="flex justify-between items-center text-lg">
                          <span className="text-dantojo-coffee">Subtotal</span>
                          <span className="font-bold text-dantojo-dark">${subtotal.toLocaleString()} MXN</span>
                        </div>
                        <button
                          onClick={handleNext}
                          className="w-full flex items-center justify-center gap-3 bg-[#2B1B12] text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-dantojo-dark transition-all shadow-premium active:scale-95"
                        >
                          Siguiente <ArrowRight size={20} />
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex-1 p-6 flex flex-col space-y-6 overflow-y-auto"
                  >
                    <div className="space-y-2">
                      <h3 className="text-xl font-display text-dantojo-dark">Selecciona tu método de pago</h3>
                      <p className="text-sm text-dantojo-coffee/60 italic">Escoge la opción que más te convenga para completar tu pedido.</p>
                    </div>

                    <div className="space-y-4">
                      {[
                        { id: 'tarjeta', name: 'Tarjeta Crédito/Débito', icon: CreditCard },
                        { id: 'efectivo', name: 'Efectivo', icon: Banknote },
                        { id: 'sucursal', name: 'Pago en Sucursal', icon: Store },
                      ].map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 ${paymentMethod === method.id
                              ? 'border-dantojo-gold bg-dantojo-gold/5 shadow-md'
                              : 'border-dantojo-tan bg-white hover:border-dantojo-tan/60'
                            }`}
                        >
                          <div className={`p-3 rounded-xl ${paymentMethod === method.id ? 'bg-dantojo-gold text-white' : 'bg-dantojo-beige text-dantojo-coffee'}`}>
                            <method.icon size={24} />
                          </div>
                          <span className={`font-medium ${paymentMethod === method.id ? 'text-dantojo-dark' : 'text-dantojo-coffee'}`}>
                            {method.name}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="flex-1" />

                    <div className="pt-6 space-y-4 border-t border-dantojo-tan">
                      <button
                        disabled={!paymentMethod || isInitializingStripe}
                        onClick={handleNext}
                        className="w-full flex items-center justify-center gap-3 bg-[#2B1B12] text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-dantojo-dark transition-all shadow-premium active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isInitializingStripe ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                          />
                        ) : (
                          <>Continuar <ArrowRight size={20} /></>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2.5 && clientSecret && (
                  <motion.div
                    key="step2.5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex-1 p-6 flex flex-col space-y-8 overflow-y-auto"
                  >
                    <div className="space-y-1">
                      <h3 className="text-xl font-display text-dantojo-dark">Pagar Orden</h3>
                      <p className="text-xs text-dantojo-coffee/60">Procesado de forma segura por Stripe</p>
                    </div>

                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret,
                        appearance: {
                          theme: 'flat',
                          variables: {
                            colorPrimary: '#2B1B12',
                            colorBackground: '#ffffff',
                            colorText: '#2B1B12',
                            borderRadius: '12px',
                          }
                        }
                      }}
                    >
                      <StripeCheckoutForm
                        amount={subtotal}
                        onSuccess={() => setStep(3)}
                      />
                    </Elements>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex-1 p-6 flex flex-col items-center text-center space-y-8 overflow-y-auto"
                  >
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={40} />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-display text-dantojo-dark">¡Casi listo!</h3>
                      <p className="text-dantojo-coffee/80">Hemos generado tu número de pedido:</p>
                      <p className="text-3xl font-bold text-dantojo-gold tracking-widest">{orderNumber}</p>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-premium space-y-4 border border-dantojo-tan/50">
                      <QRCodeSVG value={orderNumber} size={150} level="H" includeMargin />
                      <p className="text-[10px] text-dantojo-coffee/60 uppercase tracking-widest">Escanea este código al pagar</p>
                    </div>

                    <div className="w-full bg-dantojo-beige/30 p-4 rounded-2xl text-left space-y-2">
                      <p className="text-sm font-bold text-dantojo-dark">Resumen de Pago:</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-dantojo-coffee">Método:</span>
                        <span className="capitalize font-medium text-dantojo-dark">{paymentMethod}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-dantojo-coffee">Total a pagar:</span>
                        <span className="font-bold text-dantojo-dark">${subtotal.toLocaleString()} MXN</span>
                      </div>
                    </div>

                    <div className="flex-1" />

                    <button
                      onClick={handleFinalize}
                      className="w-full bg-[#2B1B12] text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-dantojo-dark transition-all shadow-premium active:scale-95"
                    >
                      Finalizar
                    </button>
                    <p className="text-[10px] text-dantojo-coffee/60">
                      Al finalizar, te enviaremos a WhatsApp para confirmar los detalles de entrega.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
