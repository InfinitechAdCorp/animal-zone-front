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

  console.log("[v0] Product:", name, "Image path:", image, "Error:", imageError)

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

  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <Link href={`/products/${id}`}>
      <div className="group bg-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <div className="text-center text-muted-foreground">
                <ShoppingCart className="h-16 w-16 mx-auto mb-2" />
                <p className="text-sm">Product Image</p>
              </div>
            </div>
          ) : (
            <img
              src={
                image ||
                `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(name + " " + category + " product")}`
              }
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={handleImageError}
              onLoad={() => console.log("[v0] Image loaded successfully:", image)}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                -{discountPercentage}%
              </span>
            )}
            {!inStock && (
              <span className="bg-foreground text-background px-2 py-1 rounded-lg text-xs font-semibold">
                Out of Stock
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-3 right-3 bg-background p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
          </button>

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-foreground bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category & Seller */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-primary font-medium uppercase tracking-wide">{category}</span>
            <span className="text-xs text-muted-foreground">by {seller}</span>
          </div>

          {/* Product Name */}
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
                    i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
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
            <span className="text-2xl font-bold text-foreground">₱{price.toLocaleString()}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">₱{originalPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Add to Cart Button */}
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
      </div>
    </Link>
  )
}
