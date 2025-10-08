"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star, Plus, Minus } from "lucide-react"
import { useState } from "react"
import AddToCartButton from "@/components/AddToCartButton"

interface ProductCardProps {
  id: string
  slug: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  category: string
  inStock: boolean
  seller: string
  stock?: number
}

export default function ProductCard({
  id,
  name,
  slug,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  category,
  inStock,
  seller,
  stock = 10, // fallback value if not passed
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => setImageError(true)

  const handleQuantityChange = (change: number) => {
    const newQty = quantity + change
    if (newQty >= 1 && newQty <= stock) {
      setQuantity(newQty)
    }
  }

  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <Link
      href={`/products/${slug}`}
      className="group bg-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-full h-64 flex items-center justify-center overflow-hidden bg-gray-50">
        {!imageError ? (
          <img
            src={image}
            alt={name}
            className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            No Image
          </div>
        )}


        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
              -{discountPercentage}%
            </span>
          )}
          {!inStock && (
            <span className="bg-gray-800 text-white px-2 py-1 rounded-lg text-xs font-semibold">
              Out of Stock
            </span>
          )}
        </div>

        {/* Favorite */}
       
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-primary font-medium uppercase tracking-wide">
            {category}
          </span>
          <span className="text-xs text-muted-foreground">by {seller}</span>
        </div>

        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-300 text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {rating} ({reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-foreground">
            ₱{price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₱{originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <button
            onClick={(e) => {
              e.preventDefault()
              handleQuantityChange(-1)
            }}
            disabled={quantity <= 1}
            className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-semibold text-lg w-6 text-center">{quantity}</span>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleQuantityChange(1)
            }}
            disabled={quantity >= stock}
            className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart */}
        {inStock ? (
          <AddToCartButton
            productId={Number(id)}
            quantity={quantity}
            disabled={!inStock}
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 font-semibold transition-all duration-300 hover:shadow-lg"
          />
        ) : (
          <Button
            disabled
            className="w-full bg-muted text-muted-foreground cursor-not-allowed rounded-xl py-6"
          >
            Out of Stock
          </Button>
        )}
      </div>
    </Link>
  )
}
