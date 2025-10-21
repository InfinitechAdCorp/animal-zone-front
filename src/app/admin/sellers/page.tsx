"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Store, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { toast, Toaster } from "sonner"
import { getSellerApplications } from "@/lib/api"

export default function SellerListPage() {
  const [sellers, setSellers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      toast.error("Unauthorized: Please login first")
      return
    }
    fetchSellers(token)
  }, [])

  const fetchSellers = async (token: string) => {
    setLoading(true)
    try {
      const data = await getSellerApplications("all", token)
      setSellers(data || [])
    } catch (error: any) {
      toast.error("Failed to load sellers: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredSellers = sellers.filter(
    (seller) =>
      seller?.seller?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller?.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller?.status?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredSellers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSellers = filteredSellers.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-800 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm">Loading sellers...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          {/* 🧾 Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-green-800 rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Seller Directory</h1>
              <p className="text-gray-600 text-sm">
                View and manage registered sellers and their stores
              </p>
            </div>
          </div>

          {/* 🔎 Search Bar */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="relative">
              <Input
                placeholder="Search by seller name, store, or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10"
              />
              <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* 🗂️ Seller Table */}
          <Card className="overflow-hidden border border-gray-200 shadow-sm">
          <CardHeader className="bg-green-800 text-white py-4">
              <CardTitle className="text-lg font-semibold tracking-wide">Seller List</CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr className="text-left text-gray-700 text-sm">
                    <th className="px-6 py-3 border-b">#</th>
                    <th className="px-6 py-3 border-b">Seller Name</th>
                    <th className="px-6 py-3 border-b">Store Name</th>
                    <th className="px-6 py-3 border-b">Status</th>
                    <th className="px-6 py-3 border-b text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSellers.length > 0 ? (
                    currentSellers.map((seller, index) => (
                      <tr
                        key={seller.id}
                        className="hover:bg-gray-50 transition-colors text-sm"
                      >
                        <td className="px-6 py-3 border-b">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-6 py-3 border-b font-medium">
                          {seller.seller?.name || "N/A"}
                        </td>
                        <td className="px-6 py-3 border-b">
                          {seller.company_name || "N/A"}
                        </td>
                        <td className="px-6 py-3 border-b">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              seller.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : seller.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {seller.status?.charAt(0).toUpperCase() +
                              seller.status?.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-3 border-b text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              router.push(`/store/${seller.seller?.slug}`)
                            }
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center text-gray-500 py-8 text-sm"
                      >
                        No sellers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* 📄 Pagination */}
          {filteredSellers.length > 0 && (
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1}–
                {Math.min(endIndex, filteredSellers.length)} of{" "}
                {filteredSellers.length} sellers
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
