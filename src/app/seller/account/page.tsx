"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchCurrentUser } from "@/app/api/seller/fetchUser"
import { getDocumentUrl } from "@/app/api/seller/actions"
import { updateSellerPaymentMethods } from "@/lib/api"
import { toast } from "sonner" // ✅ Import toast

export default function SellerAccount() {
  const [user, setUser] = useState<any>(null)
  const [preview, setPreview] = useState<Record<string, string>>({})
  const [isConfirming, setIsConfirming] = useState(false)
  const [pendingEnabled, setPendingEnabled] = useState<string[]>([])

  useEffect(() => {
    const loadUser = async () => {
      const freshUser = await fetchCurrentUser()
      if (freshUser) {
        setUser(freshUser)
        localStorage.setItem("user", JSON.stringify(freshUser))
      } else {
        const stored = localStorage.getItem("user")
        if (stored) setUser(JSON.parse(stored))
      }
    }
    loadUser()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, method: string) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview((prev) => ({
        ...prev,
        [method]: reader.result as string,
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const enabled: string[] = []

    ;["gcash", "paymaya", "bpi", "bdo"].forEach((m) => {
      if (formData.get(`${m}_enabled`)) enabled.push(m)
    })

    if (!enabled.length) {
      toast.warning("Please select at least one payment method.")
      return
    }

    // ✅ Store temporarily for confirmation
    setPendingEnabled(enabled)

    toast.info(
      `Are you sure you want to save these changes?\n\nThe checked payment methods will be visible to buyers, and the unchecked ones will be hidden.`,
      {
        description: `Selected: ${enabled.map((m) => m.toUpperCase()).join(", ")}`,
        action: {
          label: "Confirm Save",
          onClick: async () => {
            setIsConfirming(true)
            try {
              enabled.forEach((method) => {
                formData.append("enabled_methods[]", method)
              })

              const res = await updateSellerPaymentMethods(formData)
              toast.success("Payment methods saved successfully!")

              if (res.seller) {
                setUser(res.seller)
                localStorage.setItem("user", JSON.stringify(res.seller))
              }
            } catch (err: any) {
              toast.error("Error saving payment methods.", {
                description: err.message,
              })
            } finally {
              setIsConfirming(false)
            }
          },
        },
      }
    )
  }

  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-500">
        ⏳ Loading account info...
      </p>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Account Info */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Account Information</h2>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p>
            <b>Status:</b>{" "}
            <Badge
              variant={
                user.verification_status === "approved"
                  ? "success"
                  : user.verification_status === "rejected"
                  ? "destructive"
                  : "secondary"
              }
            >
              {user.verification_status}
            </Badge>
          </p>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-bold">Payment Methods</h2>
          <p className="text-sm text-gray-600 mb-4">
            Choose which payment options you want to accept from your customers.
            You can upload your QR codes for each selected method.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["gcash", "paymaya", "bpi", "bdo"].map((method) => (
                <div key={method} className="border p-3 rounded-lg space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={`${method}_enabled`}
                      defaultChecked={user.payment_methods?.some(
                        (pm: any) => pm.method === method && pm.enabled === 1
                      )}
                    />
                    <span className="capitalize">{method}</span>
                  </label>

                  <input
                    type="file"
                    name={`${method}_qr`}
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, method)}
                  />

                 {preview[method] ? (
                    <img
                      src={preview[method]}
                      alt={`${method} QR Preview`}
                      className="w-full h-40 object-cover rounded-lg border"
                    />
                  ) : (() => {
                      // Check payment_methods table first, then fallback to user fields
                      const paymentMethod = user?.payment_methods?.find(
                        (pm: any) => pm.method === method
                      )
                      const qrPath = paymentMethod?.qr_path || user?.[`${method}_qr`]
                      
                      if (!qrPath) {
                        return (
                          <p className="text-sm text-gray-400">
                            No {method} QR uploaded yet.
                          </p>
                        )
                      }

                      const qrUrl = qrPath.startsWith("http")
                        ? qrPath
                        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${qrPath}`

                      return (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            Current {method.toUpperCase()} QR:
                          </p>
                          <a
                            href={qrUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={qrUrl}
                              alt={`${method} QR`}
                              className="w-full h-40 object-cover rounded-lg border"
                            />
                          </a>
                        </div>
                      )
                    })()
                  }
                  
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={isConfirming}
              className={`mt-4 px-4 py-2 text-white rounded-md transition ${
                isConfirming
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isConfirming ? "Saving..." : "Save Payment Methods"}
            </button>
          </form>
        </CardContent>
      </Card>

      {/* Uploaded Documents */}
      {user.documents && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Uploaded Documents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(user.documents).map(([docType, pathOrId]) => {
                const url = getDocumentUrl(String(pathOrId), docType)
                return (
                  <div key={docType} className="space-y-2">
                    <p className="font-medium capitalize">{docType}</p>
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={url}
                          alt={docType}
                          className="w-full h-40 object-cover rounded-lg border"
                        />
                      </a>
                    ) : (
                      <p className="text-gray-500 text-sm">No file uploaded</p>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
