'use client'

import React, { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { motion } from 'framer-motion'
import { CheckCircle2, ShoppingBag } from 'lucide-react'

interface StripeCheckoutFormProps {
  onSuccess: () => void
  amount: number
}

export default function StripeCheckoutForm({ onSuccess, amount }: StripeCheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [cardName, setCardName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsLoading(true)
    setErrorMessage(null)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    })

    if (error) {
      setErrorMessage(error.message || 'Ocurrió un error inesperado.')
      setIsLoading(false)
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess()
    } else {
      setErrorMessage('El pago no pudo completarse.')
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Visual Card Preview */}
      <div className="relative w-full aspect-[1.6/1] bg-gradient-to-br from-[#2B1B12] to-[#1A0F0A] rounded-2xl p-6 text-white shadow-premium flex flex-col justify-between overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShoppingBag size={120} />
          </div>
          <div className="flex justify-between items-start">
            <div className="w-12 h-10 bg-dantojo-gold/20 rounded-md border border-white/20" />
            <div className="text-right italic font-display text-xl opacity-80">D'Antojo</div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest opacity-60">Número de Tarjeta</p>
            <p className="text-xl tracking-[0.2em] font-mono whitespace-nowrap overflow-hidden">
                •••• •••• •••• ••••
            </p>
          </div>
          <div className="flex justify-between items-end">
            <div className="space-y-0.5">
                <p className="text-[10px] uppercase tracking-widest opacity-60">Titular</p>
                <p className="text-sm font-medium uppercase tracking-wider truncate max-w-[180px]">
                  {cardName || 'TU NOMBRE AQUÍ'}
                </p>
            </div>
            <div className="space-y-0.5 text-right">
                <p className="text-[10px] uppercase tracking-widest opacity-60">Expira</p>
                <p className="text-sm font-medium">MM/YY</p>
            </div>
          </div>
      </div>

      <div className="space-y-4">
        {/* Name input (Standalone to update visual card) */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-dantojo-coffee mb-1.5 ml-1">Nombre en la tarjeta</label>
          <input 
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.toUpperCase())}
            placeholder="COMO APARECE EN LA TARJETA"
            className="w-full px-4 py-3 rounded-xl bg-white border border-dantojo-tan focus:border-dantojo-gold outline-none transition-all uppercase text-sm"
            required
          />
        </div>

        {/* Stripe Payment Element (Numbers, Expiry, CVV) */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-dantojo-coffee mb-1.5 ml-1">Datos Bancarios (Seguros)</label>
          <div className="bg-white p-4 rounded-xl border border-dantojo-tan shadow-soft">
            <PaymentElement options={{ layout: 'tabs' }} />
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl">
          {errorMessage}
        </div>
      )}

      <div className="pt-6 border-t border-dantojo-tan">
        <button
          type="submit"
          disabled={!stripe || isLoading}
          className="w-full flex items-center justify-center gap-3 bg-[#2B1B12] text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-dantojo-dark transition-all shadow-premium active:scale-95 disabled:opacity-50"
        >
          {isLoading ? (
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
            />
          ) : (
            <>Pagar ${amount.toLocaleString()} MXN <CheckCircle2 size={20} /></>
          )}
        </button>
      </div>
    </form>
  )
}
