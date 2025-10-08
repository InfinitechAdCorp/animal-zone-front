"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useCart } from "@/context/CartContext"
import { flyToCart } from "@/lib/flyToCart" // 🟢 import animation

interface AddToCartButtonProps {
  productId: number
  quantity?: number
  disabled?: boolean
  className?: string
}

export default function AddToCartButton({ 
  productId, 
  quantity = 1, 
  disabled = false, 
  className = "" 
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { incrementCart } = useCart()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // 🟢 Trigger flying animation immediately
    flyToCart(e)

    const token = localStorage.getItem("authToken")
    if (!token) {
      toast.error("Please login to add items to cart")
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity,
        }),
      })

      // 🔹 Handle backend response errors
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        const errorMessage = errorData.message || "Failed to add to cart"
        toast.error(errorMessage)
        return
      }

      // ✅ Success
      incrementCart(quantity)
      toast.success(`Added ${quantity} item(s) to cart`)
    } catch (error) {
      toast.error("An unexpected error occurred while adding to cart")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || isLoading}
      className={`flex items-center gap-2 ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <ShoppingCart className="w-4 h-4" />
      )}
      {isLoading ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
