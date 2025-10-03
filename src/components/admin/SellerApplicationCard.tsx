"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, FileText, Eye, Clock } from "lucide-react"
import { getDocumentUrl } from "@/lib/api"

export default function SellerApplicationCard({ application, onAction, getStatusBadge }) {
  return (
    <div
      key={application.id}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                {application.company_name}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">{application.seller?.name}</p>
            </div>
            {getStatusBadge(application.status)}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Contact Information</p>
              <p className="text-sm sm:text-base text-gray-900 break-all">
                {application.seller?.email}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">Government ID Type</p>
              <p className="text-sm sm:text-base text-gray-900">{application.gov_id_type}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Business Permits</p>
              <div className="flex flex-wrap gap-1">
                {(() => {
                  let permitTypes: string[] = []
                  if (Array.isArray(application.business_permit_types)) {
                    permitTypes = application.business_permit_types
                  } else if (typeof application.business_permit_types === "string") {
                    try {
                      permitTypes = JSON.parse(application.business_permit_types)
                    } catch {
                      permitTypes = application.business_permit_types
                        .split(",")
                        .map((s) => s.trim())
                    }
                  }

                  return permitTypes.map((type, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-green-800 text-white rounded text-xs"
                    >
                      {type}
                    </span>
                  ))
                })()}
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs sm:text-sm text-gray-500 mb-2">Submitted Documents</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {[
                { key: "gov_id", label: "Government ID" },
                { key: "selfie_with_id", label: "Selfie with ID" },
                { key: "proof_of_address", label: "Proof of Address" },
                { key: "dti_sec", label: "DTI/SEC" },
                { key: "mayors_permit", label: "Mayor's Permit" },
                { key: "bir_certificate", label: "BIR Certificate" },
                { key: "fda_certificate", label: "FDA Certificate" },
                { key: "product_labels", label: "Product Labels" },
              ].map(
                (doc) =>
                  application[doc.key] && (
                    <button
                      key={doc.key}
                      onClick={() => window.open(getDocumentUrl(application[doc.key]), "_blank")}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm transition-colors"
                    >
                      <FileText className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1 text-left truncate">{doc.label}</span>
                      <Eye className="w-4 h-4 flex-shrink-0" />
                    </button>
                  )
              )}
            </div>
          </div>

          {application.remarks && (
            <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Admin Remarks:</p>
              <p className="text-xs sm:text-sm text-gray-600">{application.remarks}</p>
            </div>
          )}
        </div>

        {application.status === "pending" && (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              onClick={() => onAction(application.id, "approved")}
              className="bg-green-800 hover:bg-green-600 text-white text-sm sm:text-base"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve
            </Button>
            <Button
              onClick={() => onAction(application.id, "rejected")}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50 text-sm sm:text-base"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
