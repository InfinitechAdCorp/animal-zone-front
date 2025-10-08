"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Navigation from "@/components/Navigation"
import ProductCard from "@/components/ProductCard"
import { Store, Star, Package, Calendar } from "lucide-react"

interface Seller {
  id: number
  name: string
  email: string
  contact_number: string
  company_name: string
  slug: string
  created_at: string
  total_products: number
  average_rating: number

  // ✅ Add these
  region?: string
  province?: string
  city?: string
  barangay?: string
  street_address?: string
}


interface Product {
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
  stock: number
}

export default function SellerStorePage() {
  const { sellerSlug } = useParams()
  const [seller, setSeller] = useState<Seller | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  // ✅ Filter products
  const filteredProducts = products.filter((p) =>
    [p.name, p.category].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  // ✅ Paginated results
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const handlePageChange = (page: number) => setCurrentPage(page)

  useEffect(() => {
    if (!sellerSlug) return

    const fetchSellerAndProducts = async () => {
      try {
        setLoading(true)
        const [sellerRes, productsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sellers/slug/${sellerSlug}`),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sellers/slug/${sellerSlug}/products`)
        ])

        if (!sellerRes.ok || !productsRes.ok) throw new Error("Failed to fetch seller data")

        const sellerData = await sellerRes.json()
        const productsData = await productsRes.json()

        setSeller(sellerData)

        const transformedProducts = productsData.map((product: any) => ({
          id: product.id.toString(),
          slug: product.slug,
          name: product.name,
          price: product.price,
          originalPrice: product.original_price,
          image: product.images?.[0]
            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[0]}`
            : "/placeholder.png",
          rating: product.rating || 4.5,
          reviewCount: product.review_count || 0,
          category: product.category || "Pet Supplies",
          inStock: product.stock > 0,
          seller: product.seller_name || sellerData.name,
          stock: product.stock
        }))

        setProducts(transformedProducts)
      } catch (err) {
        console.error("Error fetching seller data:", err)
        setError("Failed to load seller information")
      } finally {
        setLoading(false)
      }
    }

    fetchSellerAndProducts()
  }, [sellerSlug])

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading store...</p>
          </div>
        </div>
      </>
    )
  }

  if (error || !seller) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Store Not Found</h2>
            <p className="text-gray-600 mb-4">{error || "The seller store you're looking for doesn't exist."}</p>
            <a href="/shop" className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Browse All Products
            </a>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        {/* Store Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-20 h-20 bg-green-800 rounded-full flex items-center justify-center">
                <Store className="w-10 h-10 text-white" />
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {seller.company_name || seller.name}
                </h1>
                <p className="text-gray-600 mb-1">Operated by {seller.name}</p>

                {/* ✅ Seller location below */}
                {(seller.city || seller.province) && (
                  <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-green-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z" />
                    </svg>
                    <span>
                      {[seller.barangay, seller.city, seller.province, seller.region]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>
                )}


                 <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span>{products.length} Products</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(seller.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Contact Store</p>
                <p className="font-medium">{seller.contact_number || "N/A"}</p>
                <p className="text-sm text-gray-600">{seller.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Store Products ({products.length})
            </h2>

            {/* 🔍 Search Bar */}
          <input
              type="text"
              placeholder="Search products..."
              className="w-full sm:w-72 border border-green-700 rounded-lg px-4 py-2 
              focus:outline-none focus:ring-2 focus:ring-green-700 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filtered Products */}
          {currentProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Products Found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or check back later for new products.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>

              {/* ✅ Pagination */}
              {totalPages >= 1 && (
                <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        currentPage === i + 1
                          ? "bg-green-700 text-white border-green-700"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
