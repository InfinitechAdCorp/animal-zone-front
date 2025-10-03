"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Star } from "lucide-react"
import { useState } from "react"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  category: string
  inStock: boolean
  seller: string
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  category,
  inStock,
  seller,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAddingToCart(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log(`Added product ${id} to cart`)
    setIsAddingToCart(false)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <Link
      href={`/products/${id}`}
      className="group bg-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden">
        {!imageError ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Product Info */}
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

        <Button
          onClick={handleAddToCart}
          disabled={!inStock || isAddingToCart}
          className={`w-full ${
            inStock
              ? "bg-primary hover:bg-primary/90 text-primary-foreground"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          } rounded-xl py-6 font-semibold transition-all duration-300 hover:shadow-lg`}
        >
          {isAddingToCart ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
              Adding...
            </span>
          ) : inStock ? (
            <span className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </span>
          ) : (
            "Out of Stock"
          )}
        </Button>
      </div>
    </Link>
  )
}
