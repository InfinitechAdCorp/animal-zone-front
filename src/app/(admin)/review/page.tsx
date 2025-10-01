"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, Store, Package, FileText, Shield, Eye } from "lucide-react"
import { toast, Toaster } from "sonner"
import { getSellerApplications, getAdminStatistics, approveSeller, rejectSeller, getDocumentUrl } from "@/lib/api"

export default function AdminReviewPanel() {
  const [activeTab, setActiveTab] = useState("sellers")
  const [sellerApplications, setSellerApplications] = useState([])
  const [statistics, setStatistics] = useState({
    pending_sellers: 0,
    approved_today: 0,
  })
  const [loading, setLoading] = useState(true)
  const [pendingProducts, setPendingProducts] = useState(0) // Added pendingProducts variable to fix ReferenceError

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [sellersData, statsData] = await Promise.all([getSellerApplications("all"), getAdminStatistics()])

      if (sellersData.success) {
        setSellerApplications(sellersData.data)
      }

      if (statsData.success) {
        setStatistics(statsData.data)
        setPendingProducts(statsData.data.pending_products || 0) // TODO: Implement product approvals functionality
      }
    } catch (error) {
      toast.error("Failed to load data: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSellerAction = async (id, action) => {
    const remarks = action === "rejected" ? prompt("Please provide a reason for rejection:") : ""

    if (action === "rejected" && !remarks) {
      toast.error("Rejection reason is required")
      return
    }

    try {
      if (action === "approved") {
        await approveSeller(id, remarks)
        toast.success("Seller approved successfully!")
      } else {
        await rejectSeller(id, remarks)
        toast.success("Seller rejected")
      }

      // Refresh data
      fetchData()
    } catch (error) {
      toast.error("Action failed: " + error.message)
    }
  }

  const viewDocument = (sellerId, documentType) => {
    const url = getDocumentUrl(sellerId, documentType)
    window.open(url, "_blank")
  }

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      approved: "bg-white-800 text-white border-green-200",
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

  const pendingSellers = sellerApplications.filter((app) => app.status === "pending").length

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
                <h1 className="text-3xl font-bold text-gray-900">Admin Review Panel</h1>
                <p className="text-gray-600">Manage seller applications and product approvals</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-sm font-medium">Pending Sellers</p>
                <Store className="w-5 h-5 text-primary-800" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{statistics.pending_sellers}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-sm font-medium">Total Sellers</p>
                <Store className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{statistics.total_sellers || 0}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-sm font-medium">Approved Today</p>
                <CheckCircle className="w-5 h-5 text-primary-800" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{statistics.approved_today}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-sm font-medium">Approved Total</p>
                <CheckCircle className="w-5 h-5 text-primary-800" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{statistics.approved_sellers || 0}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("sellers")}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                  activeTab === "sellers"
                    ? "text-primary-600 border-b-2 border-green-800 bg-green-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Store className="w-5 h-5" />
                  Seller Applications ({pendingSellers})
                </div>
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                  activeTab === "products"
                    ? "text-primary-600 border-b-2 border-green-800 bg-green-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Package className="w-5 h-5" />
                  Product Approvals ({pendingProducts})
                </div>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {sellerApplications.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Yet</h3>
                <p className="text-gray-600">Seller applications will appear here when submitted.</p>
              </div>
            ) : (
              sellerApplications.map((application) => (
                <div
                  key={application.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{application.company_name}</h3>
                          <p className="text-gray-600">{application.seller?.name}</p>
                        </div>
                        {getStatusBadge(application.status)}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Contact Information</p>
                          <p className="text-gray-900">{application.seller?.email}</p>
                          <p className="text-sm text-gray-500 mt-2">Government ID Type</p>
                          <p className="text-gray-900">{application.gov_id_type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Business Permits</p>
                          <div className="flex flex-wrap gap-1">
                            {application.business_permit_types &&
                              application.business_permit_types.map((type, index) => (
                                <span
                                  key={index}
                                  className="inline-block px-2 py-1 bg-green-800 text-primary-700 rounded text-xs"
                                >
                                  {type}
                                </span>
                              ))}
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Applied: {new Date(application.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-2">Submitted Documents</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {application.gov_id && (
                            <button
                              onClick={() => viewDocument(application.id, "gov_id")}
                              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              <span className="flex-1 text-left">Government ID</span>
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          {application.selfie_with_id && (
                            <button
                              onClick={() => viewDocument(application.id, "selfie_with_id")}
                              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              <span className="flex-1 text-left">Selfie with ID</span>
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          {application.proof_of_address && (
                            <button
                              onClick={() => viewDocument(application.id, "proof_of_address")}
                              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              <span className="flex-1 text-left">Proof of Address</span>
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          {application.dti_sec && (
                            <button
                              onClick={() => viewDocument(application.id, "dti_sec")}
                              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              <span className="flex-1 text-left">DTI/SEC</span>
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          {application.mayors_permit && (
                            <button
                              onClick={() => viewDocument(application.id, "mayors_permit")}
                              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              <span className="flex-1 text-left">Mayor's Permit</span>
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          {application.bir_certificate && (
                            <button
                              onClick={() => viewDocument(application.id, "bir_certificate")}
                              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              <span className="flex-1 text-left">BIR Certificate</span>
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          {application.fda_certificate && (
                            <button
                              onClick={() => viewDocument(application.id, "fda_certificate")}
                              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              <span className="flex-1 text-left">FDA Certificate</span>
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          {application.product_labels && (
                            <button
                              onClick={() => viewDocument(application.id, "product_labels")}
                              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              <span className="flex-1 text-left">Product Labels</span>
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {application.remarks && (
                        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 mb-1">Admin Remarks:</p>
                          <p className="text-sm text-gray-600">{application.remarks}</p>
                        </div>
                      )}
                    </div>

                    {application.status === "pending" && (
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-40">
                        <Button
                          onClick={() => handleSellerAction(application.id, "approved")}
                          className="bg-green-800 hover:bg-green-600 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleSellerAction(application.id, "rejected")}
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
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
