'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  id: number
  name: string
  price: string       // This will always store the whole cake price
  slicePrice?: string // Optional slice price
  selectedType: 'cake' | 'slice'
  image: string
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  cartCount: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  addItem: (product: any) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  toggleItemType: (id: number) => void
  clearCart: () => void
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('dantojo_cart_items')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Error parsing cart items', e)
      }
    }
  }, [])

  // Save to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('dantojo_cart_items', JSON.stringify(cartItems))
  }, [cartItems])

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  
  const subtotal = cartItems.reduce((total, item) => {
    const activePrice = item.selectedType === 'cake' ? item.price : (item.slicePrice || item.price)
    const priceNumeric = parseFloat(activePrice.replace(/[^0-9.]/g, ''))
    return total + priceNumeric * item.quantity
  }, 0)

  const addItem = (product: any) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1, selectedType: 'cake' }]
    })
    setIsCartOpen(true) // Open cart when item is added
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
      return
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const toggleItemType = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.slicePrice && item.slicePrice !== '-') {
          return {
            ...item,
            selectedType: item.selectedType === 'cake' ? 'slice' : 'cake'
          }
        }
        return item
      })
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        addItem,
        removeItem,
        updateQuantity,
        toggleItemType,
        clearCart,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
