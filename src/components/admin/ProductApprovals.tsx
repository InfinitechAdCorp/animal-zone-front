"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Package, CheckCircle, XCircle, FileText, Eye, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { getPendingProducts, approveProduct, rejectProduct, getProductDocumentUrl } from "@/lib/api"

export default function ProductApprovals() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      toast.error("Unauthorized: Please login first")
      return
    }
    fetchData(token)
  }, [])

  const fetchData = async (token: string) => {
    setLoading(true)
    try {
      const productData = await getPendingProducts(token)
      setProducts(productData || [])
    } catch (err: any) {
      toast.error("Failed to load products: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (id: number, action: string) => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      toast.error("Unauthorized")
      return
    }
    const remarks = action === "rejected" ? prompt("Please provide a reason for rejection:") : ""

    if (action === "rejected" && !remarks) {
      toast.error("Rejection reason is required")
      return
    }

    try {
      if (action === "approved") {
        await approveProduct(id, remarks, token)
        toast.success("Product approved successfully!")
      } else {
        await rejectProduct(id, remarks, token)
        toast.success("Product rejected")
      }
      fetchData(token)
    } catch (err: any) {
      toast.error("Action failed: " + err.message)
    }
  }

  // Filter by search
  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.status?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filtered.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent outline-none text-sm sm:text-base"
          />
        </div>
      </div>

      {currentProducts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">No Pending Products</h3>
          <p className="text-sm text-gray-600">Approved products will no longer appear here.</p>
        </div>
      ) : (
        <>
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : product.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>

                {/* Documents */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Attached Files</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {product.documents?.map((doc: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => window.open(getProductDocumentUrl(doc.path), "_blank")}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        <span className="flex-1 text-left truncate">{doc.name}</span>
                        <Eye className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>

                {product.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAction(product.id, "approved")}
                      className="bg-green-800 hover:bg-green-600 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleAction(product.id, "rejected")}
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Pagination */}
          {filtered.length > itemsPerPage && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex justify-between items-center">
              <p className="text-xs text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filtered.length)} of {filtered.length} products
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
