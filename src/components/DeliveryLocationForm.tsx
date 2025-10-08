"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { regions } from "@/data/region"
import { provinces } from "@/data/province"
import { cities } from "@/data/cities"
import { barangay } from "@/data/barangay"

interface DeliveryLocationFormProps {
  value?: {
    region: string
    province: string
    city: string
    barangay: string
    street_address: string
    postal_code: string
  }
  onChange: (name: string, value: string) => void
}

export default function DeliveryLocationForm({ value, onChange }: DeliveryLocationFormProps) {
  const safeValue = value || {
    region: "",
    province: "",
    city: "",
    barangay: "",
    street_address: "",
    postal_code: "",
  }

  // 🔹 Helper functions to convert names/codes (centralized here)
  const getRegionCode = (name: string) => regions.find((r) => r.region_name === name)?.region_code || ""
  const getProvinceCode = (name: string) => provinces.find((p) => p.province_name === name)?.province_code || ""
  const getCityCode = (name: string) => cities.find((c) => c.city_name === name)?.city_code || ""
  const getBarangayCode = (name: string) => barangay.find((b) => b.brgy_name === name)?.brgy_code || ""

  const getRegionName = (code: string) => regions.find((r) => r.region_code === code)?.region_name || ""
  const getProvinceName = (code: string) => provinces.find((p) => p.province_code === code)?.province_name || ""
  const getCityName = (code: string) => cities.find((c) => c.city_code === code)?.city_name || ""
  const getBarangayName = (code: string) => barangay.find((b) => b.brgy_code === code)?.brgy_name || ""

  // 🔹 Dynamic filtering for dependent dropdowns
  const filteredProvinces = provinces.filter((p) => p.region_code === safeValue.region)
  const filteredCities = cities.filter((c) => c.province_code === safeValue.province)
  const filteredBarangays = barangay.filter((b) => b.city_code === safeValue.city)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    onChange(name, value)
  }

  const disabledStyle = "bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed"

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="region">Region</Label>
        <select
          id="region"
          name="region"
          value={safeValue.region}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
        >
          <option value="">Select Region</option>
          {regions.map((r) => (
            <option key={r.region_code} value={r.region_code}>
              {r.region_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="province">Province</Label>
        <select
          id="province"
          name="province"
          value={safeValue.province}
          onChange={handleChange}
          className={`w-full border rounded-md p-2 ${!safeValue.region ? disabledStyle : ""}`}
          disabled={!safeValue.region}
        >
          <option value="">Select Province</option>
          {filteredProvinces.map((p) => (
            <option key={p.province_code} value={p.province_code}>
              {p.province_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="city">City</Label>
        <select
          id="city"
          name="city"
          value={safeValue.city}
          onChange={handleChange}
          className={`w-full border rounded-md p-2 ${!safeValue.province ? disabledStyle : ""}`}
          disabled={!safeValue.province}
        >
          <option value="">Select City</option>
          {filteredCities.map((c) => (
            <option key={c.city_code} value={c.city_code}>
              {c.city_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="barangay">Barangay</Label>
        <select
          id="barangay"
          name="barangay"
          value={safeValue.barangay}
          onChange={handleChange}
          className={`w-full border rounded-md p-2 ${!safeValue.city ? disabledStyle : ""}`}
          disabled={!safeValue.city}
        >
          <option value="">Select Barangay</option>
          {filteredBarangays.map((b) => (
            <option key={b.brgy_code} value={b.brgy_code}>
              {b.brgy_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="street_address">Street Address</Label>
        <Input
          id="street_address"
          name="street_address"
          placeholder="e.g., Purok 5, Mabini St., Zone 2"
          value={safeValue.street_address}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="postal_code">Postal Code</Label>
        <Input
          id="postal_code"
          name="postal_code"
          placeholder="e.g., 1001"
          value={safeValue.postal_code}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
