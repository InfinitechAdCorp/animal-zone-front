"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchCurrentUser } from "@/app/api/seller/fetchUser"
import { getDocumentUrl } from "@/app/api/seller/actions"

export default function SellerAccount() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const loadUser = async () => {
      console.log("🔎 Fetching user from /me API or localStorage...")
      const freshUser = await fetchCurrentUser()
      console.log("✅ API Response:", freshUser)

      if (freshUser) {
        setUser(freshUser)
        localStorage.setItem("user", JSON.stringify(freshUser))
      } else {
        const stored = localStorage.getItem("user")
        console.log("📦 LocalStorage user:", stored)
        if (stored) setUser(JSON.parse(stored))
      }
    }
    loadUser()
  }, [])

  console.log("👤 Current state.user:", user)

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
