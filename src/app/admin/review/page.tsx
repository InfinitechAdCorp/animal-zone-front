"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, Store, Package, Shield, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { toast, Toaster } from "sonner"
import { getSellerApplications, getAdminStatistics, approveSeller, rejectSeller, getDocumentUrl } from "@/lib/api"
import SellerApplicationCard from "@/components/admin/SellerApplicationCard"
import ProductApprovals from "@/components/admin/ProductApprovals"

export default function AdminReviewPanel() {
  const [activeTab, setActiveTab] = useState("sellers")
  const [sellerApplications, setSellerApplications] = useState<any[]>([])
  const [statistics, setStatistics] = useState<any>({
    pending_sellers: 0,
    approved_today: 0,
  })
  const [loading, setLoading] = useState(true)
  const [pendingProducts, setPendingProducts] = useState(0)
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
      const [sellersData, statsData] = await Promise.all([
        getSellerApplications("all", token),
        getAdminStatistics(token),
      ])

      setSellerApplications(sellersData || [])
      setStatistics(statsData || {})
    } catch (error: any) {
      toast.error("Failed to load data: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSellerAction = async (id: number, action: string) => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      toast.error("Unauthorized")
      return
    }

    const remarks =
      action === "rejected" ? prompt("Please provide a reason for rejection:") : ""

    if (action === "rejected" && !remarks) {
      toast.error("Rejection reason is required")
      return
    }

    try {
      if (action === "approved") {
        await approveSeller(id, remarks, token)
        toast.success("Seller approved successfully!")
      } else {
        await rejectSeller(id, remarks, token)
        toast.success("Seller rejected")
      }
      fetchData(token)
    } catch (error: any) {
      toast.error("Action failed: " + error.message)
    }
  }

  const viewDocument = (sellerId: number, documentType: string) => {
    const url = getDocumentUrl(sellerId, documentType)
    window.open(url, "_blank")
  }

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      approved: "bg-green-100 text-green-700 border-green-200",
      rejected: "bg-red-100 text-red-700 border-red-200",
    }

    const icons = {
      pending: <Clock className="w-4 h-4" />,
      approved: <CheckCircle className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />,
    }

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`}
      >
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const pendingSellers = sellerApplications.filter(
    (app) => app.status === "pending"
  ).length

  // Filter applications based on search query
  const filteredApplications = sellerApplications.filter((app) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      app.company_name?.toLowerCase().includes(searchLower) ||
      app.seller?.name?.toLowerCase().includes(searchLower) ||
      app.seller?.email?.toLowerCase().includes(searchLower) ||
      app.status?.toLowerCase().includes(searchLower)
    )
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentApplications = filteredApplications.slice(startIndex, endIndex)

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-green-800 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Admin Review Panel
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Manage seller applications and product approvals
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-xs sm:text-sm font-medium">
                  Pending Sellers
                </p>
                <Store className="w-4 h-4 sm:w-5 sm:h-5 text-green-800" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {statistics.pending_sellers}
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-xs sm:text-sm font-medium">
                  Total Sellers
                </p>
                <Store className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {statistics.total_sellers || 0}
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-xs sm:text-sm font-medium">
                  Approved Today
                </p>
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-800" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {statistics.approved_today}
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-xs sm:text-sm font-medium">
                  Approved Total
                </p>
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-800" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {statistics.approved_sellers || 0}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("sellers")}
                className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 text-center font-medium transition-colors ${
                  activeTab === "sellers"
                    ? "text-green-600 border-b-2 border-green-800 bg-green-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Store className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">
                    Seller Applications ({pendingSellers})
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 text-center font-medium transition-colors ${
                  activeTab === "products"
                    ? "text-green-600 border-b-2 border-green-800 bg-green-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">
                    Product Approvals ({pendingProducts})
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {/* Search Bar */}
           
            {activeTab === "sellers" ? (
                <>
                  {/* 🔎 Search Bar */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search by company, seller name, email, or status..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                      />
                      <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {currentApplications.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
                      <Store className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                        {searchQuery ? "No Results Found" : "No Applications Yet"}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        {searchQuery
                          ? "Try adjusting your search terms"
                          : "Seller applications will appear here when submitted."}
                      </p>
                    </div>
                  ) : (
                    <>
                      {currentApplications.map((application) => (
                        <SellerApplicationCard
                          key={application.id}
                          application={application}
                          onAction={handleSellerAction}
                          getStatusBadge={getStatusBadge}
                        />
                      ))}
                      {/* Pagination */}
                      {filteredApplications.length > itemsPerPage && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                              Showing {startIndex + 1} to{" "}
                              {Math.min(endIndex, filteredApplications.length)} of{" "}
                              {filteredApplications.length} applications
                            </p>

                            <div className="flex items-center justify-center gap-2">
                              <Button
                                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                variant="outline"
                                className="flex items-center gap-1 text-xs sm:text-sm"
                                size="sm"
                              >
                                <ChevronLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">Previous</span>
                              </Button>

                              <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                  if (
                                    page === 1 ||
                                    page === totalPages ||
                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                  ) {
                                    return (
                                      <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                                          currentPage === page
                                            ? "bg-green-800 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                      >
                                        {page}
                                      </button>
                                    )
                                  } else if (
                                    page === currentPage - 2 ||
                                    page === currentPage + 2
                                  ) {
                                    return (
                                      <span
                                        key={page}
                                        className="px-1 sm:px-2 text-gray-400 text-xs sm:text-sm"
                                      >
                                        ...
                                      </span>
                                    )
                                  }
                                  return null
                                })}
                              </div>

                              <Button
                                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                variant="outline"
                                className="flex items-center gap-1 text-xs sm:text-sm"
                                size="sm"
                              >
                                <span className="hidden sm:inline">Next</span>
                                <ChevronRight className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                    </>
                  )}
                </>
              ) : (
                <ProductApprovals />
              )}

          </div>
        </div>
      </div>
    </>
  )
}
