"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import DeliveryLocationForm from "@/components/DeliveryLocationForm"
import { regions } from "@/data/region"
import { provinces } from "@/data/province"
import { cities } from "@/data/cities"
import { barangay } from "@/data/barangay"

export default function EditProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_number: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    street_address: "",
    postal_code: "",
  })

  // 🔹 Fetch profile data
  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken")
    if (!token) {
      toast.error("Please log in first")
      router.push("/login")
      return
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()

        if (res.ok && data.data) {
          const d = data.data
          setUser(d)
          setFormData({
            name: d.name ?? "",
            email: d.email ?? "",
            contact_number: d.contact_number ?? "",
            region: getRegionCode(d.region ?? ""),
            province: getProvinceCode(d.province ?? ""),
            city: getCityCode(d.city ?? ""),
            barangay: getBarangayCode(d.barangay ?? ""),
            street_address: d.street_address ?? "",
            postal_code: d.postal_code ?? "",
          })
        } else toast.error(data.message || "Failed to load profile")
      } catch {
        toast.error("Error fetching profile")
      }
    }

    fetchProfile()
  }, [router])

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 🔹 Conversion helpers
  const getRegionCode = (name: string) => regions.find((r) => r.region_name === name)?.region_code || ""
  const getProvinceCode = (name: string) => provinces.find((p) => p.province_name === name)?.province_code || ""
  const getCityCode = (name: string) => cities.find((c) => c.city_name === name)?.city_code || ""
  const getBarangayCode = (name: string) => barangay.find((b) => b.brgy_name === name)?.brgy_code || ""

  const getRegionName = (code: string) => regions.find((r) => r.region_code === code)?.region_name || ""
  const getProvinceName = (code: string) => provinces.find((p) => p.province_code === code)?.province_name || ""
  const getCityName = (code: string) => cities.find((c) => c.city_code === code)?.city_name || ""
  const getBarangayName = (code: string) => barangay.find((b) => b.brgy_code === code)?.brgy_name || ""

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem("token") || localStorage.getItem("authToken")
    if (!token) {
      toast.error("You must be logged in.")
      return
    }

    const payload = {
      ...formData,
      region: getRegionName(formData.region),
      province: getProvinceName(formData.province),
      city: getCityName(formData.city),
      barangay: getBarangayName(formData.barangay),
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (res.ok) {
        toast.success("Profile updated successfully!")
        localStorage.setItem("user", JSON.stringify(data.data))
      } else toast.error(data.message || "Failed to update profile")
    } catch {
      toast.error("An error occurred while updating profile")
    }
  }

  if (!user) return <p className="p-4 text-center text-muted-foreground">Loading...</p>

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-primary">Edit Profile</h1>

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" type="email" value={formData.email} disabled className="bg-gray-100" />
        </div>

        <div>
          <Label htmlFor="contact_number">Contact Number</Label>
          <Input
            id="contact_number"
            name="contact_number"
            type="tel"
            value={formData.contact_number}
            onChange={(e) => handleChange("contact_number", e.target.value)}
          />
        </div>

        {/* ✅ Location form moved to separate component */}
        <DeliveryLocationForm value={formData} onChange={handleChange} />

        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  )
}
