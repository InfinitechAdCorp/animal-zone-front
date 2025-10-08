"use client"

import { useEffect, useState } from "react"
import ProductCard from "@/components/ProductCard"
import { Button } from "@/components/ui/button"

const sortOptions = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
]

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [sortBy, setSortBy] = useState("featured")
  const [searchTerm, setSearchTerm] = useState("") // ✅ search state
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [availability, setAvailability] = useState({
    inStock: false,
    outOfStock: false,
  })

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`)
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error("Failed to fetch products:", err)
      }
    }
    fetchProducts()
  }, [])

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product-categories`)
        const data = await res.json()
        setCategories([{ id: 0, name: "All Products" }, ...data])
      } catch (err) {
        console.error("Failed to fetch categories:", err)
      }
    }
    fetchCategories()
  }, [])

  // ✅ Filter products (includes search)
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === "All Products" ||
      product.category?.name === selectedCategory ||
      product.category === selectedCategory

    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    const matchesStock =
      (!availability.inStock && !availability.outOfStock) ||
      (availability.inStock && product.stock > 0) ||
      (availability.outOfStock && product.stock === 0)

    return matchesSearch && matchesCategory && matchesPrice && matchesStock
  })

  // ✅ Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case "rating":
        return (b.rating || 0) - (a.rating || 0)
      default:
        return 0
    }
  })

  // ✅ Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("All Products")
                    setAvailability({ inStock: false, outOfStock: false })
                    setPriceRange([0, 5000])
                    setSortBy("featured")
                    setSearchTerm("")
                    setCurrentPage(1)
                  }}
                  className="text-primary-800 hover:text-primary-600"
                >
                  Clear All
                </Button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.name)
                        setCurrentPage(1)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.name
                          ? "bg-green-50 text-primary font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {category.name}
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
                    onChange={(e) => {
                      setPriceRange([priceRange[0], Number.parseInt(e.target.value)])
                      setCurrentPage(1)
                    }}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>₱0</span>
                    <span>₱{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Availability</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700">
                    <input
                      type="checkbox"
                      checked={availability.inStock}
                      onChange={(e) => {
                        setAvailability((prev) => ({ ...prev, inStock: e.target.checked }))
                        setCurrentPage(1)
                      }}
                    />
                    In Stock
                  </label>
                  <label className="flex items-center gap-2 text-gray-700">
                    <input
                      type="checkbox"
                      checked={availability.outOfStock}
                      onChange={(e) => {
                        setAvailability((prev) => ({ ...prev, outOfStock: e.target.checked }))
                        setCurrentPage(1)
                      }}
                    />
                    Out of Stock
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                {/* ✅ Search Bar */}
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="border border-green-600 rounded-lg px-3 py-2 text-gray-800 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div className="flex items-center gap-4">
                <p className="text-gray-600 text-sm">
                  Showing{" "}
                  <span className="font-semibold">{currentProducts.length}</span> of{" "}
                  <span className="font-semibold">{sortedProducts.length}</span> products
                </p>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="border border-green-600 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.slug}
                  id={product.id}
                  slug={product.slug}
                  name={product.name}
                  price={product.price}
                  image={
                    product.images?.[0]
                      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[0]}`
                      : "/placeholder.png"
                  }
                  category={product.category?.name || product.category}
                  seller={product.seller}
                  inStock={product.stock > 0}
                  rating={product.rating || 0}
                  reviewCount={product.review_count || 0}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                <Button
                  variant="outline"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </Button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => goToPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
