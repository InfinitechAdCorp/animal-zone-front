"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type CartContextType = {
  cartCount: number
  updateCartCount: (count: number) => void
  incrementCartCount: () => void
  decrementCartCount: () => void
  incrementCart: (quantity: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0)

  // Load cart count from localStorage on mount
  useEffect(() => {
    const savedCount = localStorage.getItem("cartCount")
    if (savedCount) {
      setCartCount(Number.parseInt(savedCount, 10))
    }
  }, [])

  // Save cart count to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartCount", cartCount.toString())
  }, [cartCount])

  const updateCartCount = (count: number) => {
    setCartCount(Math.max(0, count))
  }

  const incrementCartCount = () => {
    setCartCount((prev) => prev + 1)
  }

  const decrementCartCount = () => {
    setCartCount((prev) => Math.max(0, prev - 1))
  }

  const incrementCart = (quantity: number) => {
    setCartCount((prev) => prev + quantity)
  }

  return (
    <CartContext.Provider
      value={{
        cartCount,
        updateCartCount,
        incrementCartCount,
        decrementCartCount,
        incrementCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
