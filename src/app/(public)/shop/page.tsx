"use client"

import { useState } from "react"
import ProductCard from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { ChevronDown, SlidersHorizontal } from "lucide-react"

// Sample product data - replace with API call
const products = [
  {
    id: "1",
    name: "Premium Dog Food - Chicken & Rice Formula",
    price: 1299,
    originalPrice: 1599,
    image: "/premium-dog-food-bag-chicken-rice-formula.jpg",
    rating: 4.5,
    reviewCount: 128,
    category: "Dog Food",
    inStock: true,
    seller: "PetMart Store",
  },
  {
    id: "2",
    name: "Cat Litter Box with Hood - Large Size",
    price: 899,
    originalPrice: 1199,
    image: "/cat-litter-box-with-hood-large-size.jpg",
    rating: 4.8,
    reviewCount: 89,
    category: "Cat Supplies",
    inStock: true,
    seller: "Feline Friends",
  },
  {
    id: "3",
    name: "Interactive Dog Toy Set - 5 Pieces",
    price: 599,
    image: "/interactive-colorful-dog-toys-set.jpg",
    rating: 4.3,
    reviewCount: 56,
    category: "Toys",
    inStock: true,
    seller: "PlayPet Shop",
  },
  {
    id: "4",
    name: "Aquarium Filter System - 50 Gallon",
    price: 2499,
    originalPrice: 2999,
    image: "/aquarium-filter-system-50-gallon.jpg",
    rating: 4.6,
    reviewCount: 43,
    category: "Fish Supplies",
    inStock: false,
    seller: "AquaPro",
  },
  {
    id: "5",
    name: "Bird Cage Deluxe - Stainless Steel",
    price: 3499,
    image: "/deluxe-stainless-steel-bird-cage.jpg",
    rating: 4.7,
    reviewCount: 32,
    category: "Bird Supplies",
    inStock: true,
    seller: "Avian Paradise",
  },
  {
    id: "6",
    name: "Organic Cat Food - Salmon Formula",
    price: 1099,
    originalPrice: 1399,
    image: "/organic-cat-food-salmon-formula-bag.jpg",
    rating: 4.9,
    reviewCount: 156,
    category: "Cat Food",
    inStock: true,
    seller: "Whiskers & Co",
  },
]

const categories = [
  "All Products",
  "Dog Food",
  "Cat Food",
  "Dog Supplies",
  "Cat Supplies",
  "Toys",
  "Fish Supplies",
  "Bird Supplies",
]

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Best Rating", value: "rating" },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 5000])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-2">Shop All Products</h1>
          <p className="text-white">Discover premium pet supplies from verified sellers</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                <Button variant="ghost" size="sm" className="text-primary-800 hover:text-primary-600">
                  Clear All
                </Button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? "bg-green-50 text-primary font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>₱0</span>
                    <span>₱{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Stock Status */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Availability</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-800 focus:ring-green-800" />
                    <span className="text-gray-600">In Stock</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-800 focus:ring-green-800" />
                    <span className="text-gray-600">Out of Stock</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{products.length}</span> products
                </p>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Mobile Filter Toggle */}
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex-1 sm:flex-none"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>

                  {/* Sort Dropdown */}
                  <div className="relative flex-1 sm:flex-none">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent cursor-pointer"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button className="bg-green-800 hover:bg-green-600 text-white">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
