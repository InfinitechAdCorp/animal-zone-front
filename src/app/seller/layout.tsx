"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Home, Package, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { fetchCurrentUser } from "@/app/api/seller/fetchUser"

const navItems = [
  { href: "/seller/dashboard", label: "Dashboard", icon: Home },
  { href: "/seller/products", label: "My Products", icon: Package },
  { href: "/seller/account", label: "Account", icon: Settings },
]

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const freshUser = await fetchCurrentUser()
      if (freshUser) {
        setVerificationStatus(freshUser.verification_status)
        localStorage.setItem("user", JSON.stringify(freshUser))
      }
      setLoading(false)
    }
    loadUser()
  }, [])

  // habang nagfe-fetch pa → show loader
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  // 👉 hide sidebar when on /seller/register
  if (pathname === "/seller/register") {
    return <main className="min-h-screen bg-gray-100 p-6">{children}</main>
  }

  const restrictedRoutes = ["/seller/dashboard", "/seller/products"]
  const isRestricted = restrictedRoutes.includes(pathname)

  if (verificationStatus === "pending" || verificationStatus === "rejected") {
    if (isRestricted) {
      return (
        <div className="flex min-h-screen bg-gray-100">
          <aside className="w-64 bg-white border-r shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-green-800">Seller Panel</h2>
            </div>
            <nav className="p-4 space-y-2">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition",
                    pathname === href && "bg-green-100 text-green-800 font-semibold"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              ))}
            </nav>
          </aside>

          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
              <h2 className="text-xl font-bold text-red-600 mb-4">
                You cannot access this page
              </h2>
              <p className="text-gray-600 mb-6">
                Your seller account is currently <b>{verificationStatus}</b>.  
                Please check your <b>Account</b> menu or your email for updates.
              </p>
              <Link href="/seller/account" className="text-green-700 underline font-medium">
                Go to Account
              </Link>
            </div>
          </main>
        </div>
      )
    }
  }

  // approved = full access
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-green-800">Seller Panel</h2>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition",
                  isActive && "bg-green-100 text-green-800 font-semibold"
                )}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
