"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, X, Store, TrendingUp, Shield, Users, Sparkles, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { registerSeller } from "@/lib/api"
import Link from "next/link" // ✅ make sure this is imported (you already have React Router)
import { LogIn } from "lucide-react"

// Philippine Location Data
// ✅ Corrected imports — match your file names exactly
import { regions } from "@/data/region"
import { provinces } from "@/data/province"
import { cities } from "@/data/cities"
import { barangay } from "@/data/barangay"



const steps = ["Account Info", "Business Info", "Verification Documents", "Review & Submit"]

export default function SellerRegisterPage() {
  const [filteredBarangays, setFilteredBarangays] = useState([])
  const [step, setStep] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Location state
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [filteredProvinces, setFilteredProvinces] = useState([])
  const [filteredCities, setFilteredCities] = useState([])
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    streetAddress: "",
    companyName: "",
    governmentIdType: "",
    governmentId: null as File | null,
    selfieWithId: null as File | null,
    proofOfAddress: null as File | null,
    businessPermitTypes: [] as string[],
    dtiSec: null as File | null,
    mayorsPermit: null as File | null,
    birCertificate: null as File | null,
    fdaCertificate: null as File | null,
    productLabels: null as File | null,
  })

  // Update filtered provinces when region changes
  useEffect(() => {
    if (selectedRegion) {
      const region = regions.find(r => r.region_code === selectedRegion)
      if (region) {
        const provinceList = provinces.filter(p => p.region_code === region.region_code)
        setFilteredProvinces(provinceList)
        setSelectedProvince("")
        setSelectedCity("")
        setFilteredCities([])
        setForm(prev => ({ ...prev, region: region.region_name, province: "", city: "" }))
      }
    } else {
      setFilteredProvinces([])
      setSelectedProvince("")
      setSelectedCity("")
      setFilteredCities([])
    }
  }, [selectedRegion])


  // Update filtered cities when province changes
  useEffect(() => {
    if (selectedProvince) {
      const province = provinces.find(p => p.province_code === selectedProvince)
      if (province) {
        const cityList = cities.filter(c => c.province_code === province.province_code)
        setFilteredCities(cityList)
        setSelectedCity("")
        setForm(prev => ({ ...prev, province: province.province_name, city: "" }))
      }
    } else {
      setFilteredCities([])
      setSelectedCity("")
    }
  }, [selectedProvince])

  // Update city in form when selected
  useEffect(() => {
    if (selectedCity) {
      const city = cities.find(c => c.city_code === selectedCity)
      if (city) {
        setForm(prev => ({ ...prev, city: city.city_name }))
      }
    }
  }, [selectedCity])

  useEffect(() => {
  if (selectedCity) {
    const cityBarangays = barangay.filter(b => b.city_code === selectedCity)
    setFilteredBarangays(cityBarangays)
    setForm(prev => ({ ...prev, barangay: "" }))
  } else {
    setFilteredBarangays([])
  }
}, [selectedCity])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement
    if (files) {
      setForm({ ...form, [name]: files[0] })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleCheckboxChange = (permitType: string) => {
    const updated = form.businessPermitTypes.includes(permitType)
      ? form.businessPermitTypes.filter((t) => t !== permitType)
      : [...form.businessPermitTypes, permitType]
    setForm({ ...form, businessPermitTypes: updated })
  }

  const handleFileRemove = (fieldName: string) => {
    setForm({ ...form, [fieldName]: null })
  }

  const handleFileView = (file: File | null) => {
    if (!file) return
    const url = URL.createObjectURL(file)
    window.open(url, "_blank")
  }

  const nextStep = () => {
    if (step === 0) {
      if (!form.name || !form.email || !form.password || !form.confirmPassword) {
        toast.error("Please fill in all account information fields")
        return
      }
      if (!form.region || !form.province || !form.city) {
        toast.error("Please select your complete location (Region, Province, City)")
        return
      }
      if (!form.streetAddress) {
        toast.error("Please enter your street address")
        return
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(form.email)) {
        toast.error("Please enter a valid email address")
        return
      }
      if (form.password !== form.confirmPassword) {
        toast.error("Passwords do not match")
        return
      }
      if (form.password.length < 8) {
        toast.error("Password must be at least 8 characters")
        return
      }
    }
    if (step === 1) {
      if (!form.companyName) {
        toast.error("Please enter your company name")
        return
      }
      if (form.businessPermitTypes.length === 0) {
        toast.error("Please select at least one business permit type")
        return
      }
      if (form.businessPermitTypes.includes("DTI/SEC") && !form.dtiSec) {
        toast.error("Please upload DTI/SEC document")
        return
      }
      if (form.businessPermitTypes.includes("Mayor's Permit") && !form.mayorsPermit) {
        toast.error("Please upload Mayor's Permit")
        return
      }
      if (form.businessPermitTypes.includes("BIR Certificate") && !form.birCertificate) {
        toast.error("Please upload BIR Certificate")
        return
      }
    }
    if (step === 2) {
      if (
        !form.governmentIdType ||
        !form.governmentId ||
        !form.selfieWithId ||
        !form.proofOfAddress ||
        !form.fdaCertificate ||
        !form.productLabels
      ) {
        toast.error("Please upload all required documents")
        return
      }
    }
    setStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0))

  const handleFinalSubmit = async () => {
    setIsSubmitting(true)
    const formData = new FormData()
    formData.append("name", form.name)
    formData.append("email", form.email)
    const formattedNumber = form.contactNumber ? "0" + form.contactNumber : ""
    formData.append("contact_number", formattedNumber)
    formData.append("password", form.password)
    formData.append("password_confirmation", form.password)
    formData.append("region", form.region)
    formData.append("province", form.province)
    formData.append("city", form.city)
    formData.append("barangay", form.barangay)
    formData.append("street_address", form.streetAddress)
    formData.append("company_name", form.companyName)
    formData.append("gov_id_type", form.governmentIdType)
    formData.append("business_permit_types", JSON.stringify(form.businessPermitTypes))
    if (form.dtiSec) formData.append("dti_sec", form.dtiSec)
    if (form.mayorsPermit) formData.append("mayors_permit", form.mayorsPermit)
    if (form.birCertificate) formData.append("bir_certificate", form.birCertificate)
    if (form.governmentId) formData.append("gov_id", form.governmentId)
    if (form.selfieWithId) formData.append("selfie_with_id", form.selfieWithId)
    if (form.proofOfAddress) formData.append("proof_of_address", form.proofOfAddress)
    if (form.fdaCertificate) formData.append("fda_certificate", form.fdaCertificate)
    if (form.productLabels) formData.append("product_labels", form.productLabels)

    try {
      const data = await registerSeller(formData)
      console.log("✅ Success:", data)
      toast.success("Seller registered successfully. Your account is under review. Please check your email to verify your email address before logging in.", {
        duration: 5000,
      })
      setForm({
        name: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: "",
        region: "",
        province: "",
        city: "",
        barangay: "",
        streetAddress: "",
        companyName: "",
        governmentIdType: "",
        governmentId: null,
        selfieWithId: null,
        proofOfAddress: null,
        businessPermitTypes: [],
        dtiSec: null,
        mayorsPermit: null,
        birCertificate: null,
        fdaCertificate: null,
        productLabels: null,
      })
      setSelectedRegion("")
      setSelectedProvince("")
      setSelectedCity("")
      setStep(0)
    } catch (err: any) {
      console.error("❌ Error:", err)
      const errorMessage = err.response?.data?.message || err.message || "Registration failed. Please try again."
      toast.error(errorMessage, {
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const FileUploadField = ({
    label,
    id,
    name,
    file,
  }: {
    label: string
    id: string
    name: string
    file: File | null
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <div className="flex gap-2">
        <Input
          id={id}
          name={name}
          type="file"
          accept="image/*,.pdf"
          onChange={handleChange}
          className="flex-1"
        />
        {file && (
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => handleFileView(file)}
              title="View file"
              className="border-green-600 text-green-700 hover:bg-green-50"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => handleFileRemove(name)}
              title="Remove file"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      {file && (
        <p className="text-xs text-gray-500">
          <CheckCircle2 className="inline h-3 w-3 mr-1 text-green-600" />
          {file.name}
        </p>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-700 to-green-900 text-white py-16 px-4 w-full">
        {/* ✅ Login button properly positioned */}
       <div className="absolute top-6 right-6 z-10">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-white text-green-700 font-semibold rounded-md shadow hover:bg-green-50 transition-all duration-200"
          >
            <LogIn className="h-4 w-4" /> {/* ✅ icon added */}
            Login Here
          </Link>
        </div>

        {/* ✅ Centered content */}
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-4">
            <Store className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Start Selling on Animal Zone Today!
          </h1>
          <p className="text-xl text-green-100 mb-12">
            Join thousands of successful sellers and grow your pet business with the Philippines' trusted animal marketplace
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Large Customer Base</h3>
              <p className="text-sm text-green-100">Reach thousands of pet lovers across the Philippines</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Grow Your Sales</h3>
              <p className="text-sm text-green-100">Powerful tools to boost your business growth</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Secure Platform</h3>
              <p className="text-sm text-green-100">Safe transactions with buyer protection</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Easy to Use</h3>
              <p className="text-sm text-green-100">Simple dashboard to manage your products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="shadow-xl border-t-4 border-t-green-600">
          <CardContent className="p-8">
            {/* Progress Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Step {step + 1} of {steps.length}</p>
                  <h2 className="text-2xl font-bold text-gray-900">{steps[step]}</h2>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-600">{Math.round(((step + 1) / steps.length) * 100)}%</p>
                  <p className="text-sm text-gray-500">Complete</p>
                </div>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  {steps.map((s, i) => (
                    <div key={i} className="flex items-center flex-1">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                        i <= step ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                      }`}>
                        {i < step ? <CheckCircle2 className="h-6 w-6" /> : i + 1}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className={`text-sm font-medium ${i <= step ? "text-green-600" : "text-gray-500"}`}>
                          {s}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-1 bg-gray-200 rounded-full absolute left-0 right-0 top-5 -z-10">
                  <div 
                    className="h-full bg-green-600 rounded-full transition-all duration-300"
                    style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Step Forms */}
            {step === 0 && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <Sparkles className="inline h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">Let's get started! Create your seller account in just a few minutes.</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Juan Dela Cruz" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="juan@example.com" />
                  <p className="text-xs text-gray-500">We'll send order notifications to this email</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number *</Label>
                  <div className="flex items-center gap-2 border rounded-md pr-3">
                    <span className="px-3 py-2 bg-gray-50 border-r text-sm font-medium text-gray-700">
                      🇵🇭 +63
                    </span>
                    <input
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      value={form.contactNumber}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "")
                        if (value && !value.startsWith("9")) {
                          toast.error("Philippine numbers must start with 9")
                          value = ""
                        }
                        if (value.length > 10) {
                          value = value.slice(0, 10)
                        }
                        setForm({ ...form, contactNumber: value })
                      }}
                      placeholder="9XX XXX XXXX"
                      className="flex-1 border-0 focus:ring-0"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Customers will use this to contact you</p>
                </div>

                {/* Philippine Location Comboboxes */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Business Location *</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="region">Region *</Label>
                    <select
                      id="region"
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select Region</option>
                      {regions.map((region) => (
                        <option key={region.region_code} value={region.region_code}>
                          {region.region_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="province">Province *</Label>
                    <select
                      id="province"
                      value={selectedProvince}
                      onChange={(e) => setSelectedProvince(e.target.value)}
                      disabled={!selectedRegion}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Province</option>
                      {filteredProvinces.map((province) => (
                        <option key={province.province_code} value={province.province_code}>
                          {province.province_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City/Municipality *</Label>
                    <select
                      id="city"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      disabled={!selectedProvince}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select City/Municipality</option>
                      {filteredCities.map((city) => (
                        <option key={city.city_code} value={city.city_code}>
                          {city.city_name}
                        </option>
                      ))}
                    </select>
                  </div>

                 <div className="space-y-2">
                  <Label htmlFor="barangay">Barangay *</Label>
                  <select
                    id="barangay"
                    name="barangay"
                    value={form.barangay}
                    onChange={handleChange}
                    disabled={!selectedCity}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Barangay</option>
                    {filteredBarangays.map((b) => (
                      <option key={b.brgy_code} value={b.brgy_name}>
                        {b.brgy_name}
                      </option>
                    ))}
                  </select>
                </div>


                  <div className="space-y-2">
                    <Label htmlFor="streetAddress">Street Address *</Label>
                    <Input
                      id="streetAddress"
                      name="streetAddress"
                      value={form.streetAddress}
                      onChange={handleChange}
                      placeholder="House/Unit No., Street Name, Subdivision"
                    />
                    <p className="text-xs text-gray-500">Enter your complete street address including house/building number</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Min. 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <Store className="inline h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">Tell us about your business. This helps build trust with customers!</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Company/Business Name *</Label>
                  <Input id="companyName" name="companyName" value={form.companyName} onChange={handleChange} placeholder="Your Business Name" />
                  <p className="text-xs text-gray-500">This will be displayed on your seller profile</p>
                </div>

                <div className="space-y-4">
                  <Label>Business Permits * (Select all that apply)</Label>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 border rounded-lg p-4 hover:bg-gray-50">
                      <input
                        type="checkbox"
                        id="dti"
                        checked={form.businessPermitTypes.includes("DTI/SEC")}
                        onChange={() => handleCheckboxChange("DTI/SEC")}
                        className="mt-1 h-5 w-5 text-green-800 rounded border-gray-300 focus:ring-green-500"
                      />
                      <div className="flex-1">
                        <label htmlFor="dti" className="font-medium text-gray-900 cursor-pointer">
                          DTI/SEC Registration
                        </label>
                        <p className="text-sm text-gray-500">
                          Department of Trade and Industry or Securities and Exchange Commission
                        </p>
                        {form.businessPermitTypes.includes("DTI/SEC") && (
                          <div className="mt-3">
                            <FileUploadField label="Upload DTI/SEC Document" id="dtiSec" name="dtiSec" file={form.dtiSec} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 border rounded-lg p-4 hover:bg-gray-50">
                      <input
                        type="checkbox"
                        id="mayors"
                        checked={form.businessPermitTypes.includes("Mayor's Permit")}
                        onChange={() => handleCheckboxChange("Mayor's Permit")}
                        className="mt-1 h-5 w-5 text-green-800 rounded border-gray-300 focus:ring-green-500"
                      />
                      <div className="flex-1">
                        <label htmlFor="mayors" className="font-medium text-gray-900 cursor-pointer">
                          Mayor's Permit
                        </label>
                        <p className="text-sm text-gray-500">Business permit from your local government unit</p>
                        {form.businessPermitTypes.includes("Mayor's Permit") && (
                          <div className="mt-3">
                            <FileUploadField label="Upload Mayor's Permit" id="mayorsPermit" name="mayorsPermit" file={form.mayorsPermit} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 border rounded-lg p-4 hover:bg-gray-50">
                      <input
                        type="checkbox"
                        id="bir"
                        checked={form.businessPermitTypes.includes("BIR Certificate")}
                        onChange={() => handleCheckboxChange("BIR Certificate")}
                        className="mt-1 h-5 w-5 text-green-800 rounded border-gray-300 focus:ring-green-500"
                      />
                      <div className="flex-1">
                        <label htmlFor="bir" className="font-medium text-gray-900 cursor-pointer">
                          BIR Certificate of Registration
                        </label>
                        <p className="text-sm text-gray-500">Bureau of Internal Revenue tax registration</p>
                        {form.businessPermitTypes.includes("BIR Certificate") && (
                          <div className="mt-3">
                            <FileUploadField label="Upload BIR Certificate" id="birCertificate" name="birCertificate" file={form.birCertificate} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}


            {step === 2 && (
              <div className="space-y-5">
                <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg mb-6">
                  <p className="text-sm text-green-800 font-medium flex items-start">
                    <Shield className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      Almost there! These documents help us verify your identity and keep Animal Zone safe for everyone.
                    </span>
                  </p>
                </div>

                <div>
                  <Label htmlFor="governmentIdType" className="text-sm font-semibold text-gray-700">
                    Government ID Type *
                  </Label>
                  <select
                    id="governmentIdType"
                    name="governmentIdType"
                    value={form.governmentIdType}
                    onChange={handleChange}
                    className="mt-1.5 flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select ID Type</option>
                    <option value="National ID">National ID (PhilSys) - Recommended</option>
                    <option value="Passport">Passport</option>
                    <option value="Driver's License">Driver's License</option>
                    <option value="UMID">UMID (Unified Multi-Purpose ID)</option>
                    <option value="PhilHealth ID">PhilHealth ID</option>
                    <option value="SSS ID">SSS ID</option>
                    <option value="Postal ID">Postal ID</option>
                    <option value="Voter's ID">Voter's ID</option>
                    <option value="PRC ID">PRC ID (Professional Regulation Commission)</option>
                  </select>
                </div>
                <FileUploadField
                  label="Government ID *"
                  id="governmentId"
                  name="governmentId"
                  file={form.governmentId}
                />
                <FileUploadField
                  label="Selfie with ID *"
                  id="selfieWithId"
                  name="selfieWithId"
                  file={form.selfieWithId}
                />
                <p className="text-xs text-gray-600 -mt-3 pl-1">Hold your ID next to your face for verification</p>

                <FileUploadField
                  label="Proof of Address *"
                  id="proofOfAddress"
                  name="proofOfAddress"
                  file={form.proofOfAddress}
                />
                <p className="text-xs text-gray-600 -mt-3 pl-1">
                  Utility bill, bank statement, or government document with your address
                </p>

                <FileUploadField
                  label="FDA Certificate *"
                  id="fdaCertificate"
                  name="fdaCertificate"
                  file={form.fdaCertificate}
                />
                <p className="text-xs text-gray-600 -mt-3 pl-1">
                  Food and Drug Administration certificate for pet products
                </p>

                <FileUploadField
                  label="Product Labels *"
                  id="productLabels"
                  name="productLabels"
                  file={form.productLabels}
                />
                <p className="text-xs text-gray-600 -mt-3 pl-1">
                  Sample labels or packaging of products you plan to sell
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Review Your Application</h3>
                  <p className="text-gray-600 mt-2">Please verify all information before submitting</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-green-900 text-lg">Account Information</h4>
                    </div>
                    <div className="space-y-2 text-sm bg-white/60 p-4 rounded-lg">
                      <div className="flex justify-between py-1.5 border-b border-green-100">
                        <span className="font-medium text-gray-700">Name:</span>
                        <span className="text-gray-900 font-semibold">{form.name}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-green-100">
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="text-gray-900 font-semibold">{form.email}</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="font-medium text-gray-700">Contact:</span>
                        <span className="text-gray-900 font-semibold">+63 {form.contactNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Store className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-blue-900 text-lg">Business Information</h4>
                    </div>
                    <div className="space-y-2 text-sm bg-white/60 p-4 rounded-lg">
                      <div className="flex justify-between py-1.5 border-b border-blue-100">
                        <span className="font-medium text-gray-700">Company:</span>
                        <span className="text-gray-900 font-semibold">{form.companyName}</span>
                      </div>
                      <div className="py-1.5 border-b border-blue-100">
                        <span className="font-medium text-gray-700 block mb-2">Permits:</span>
                        <div className="flex flex-wrap gap-2">
                          {form.businessPermitTypes.map((permit) => (
                            <span
                              key={permit}
                              className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                            >
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              {permit}
                            </span>
                          ))}
                        </div>
                      </div>

                      {form.businessPermitTypes.includes("DTI/SEC") && form.dtiSec && (
                        <div className="flex justify-between items-center py-1.5 border-b border-blue-100">
                          <span className="font-medium text-gray-700">DTI/SEC:</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFileView(form.dtiSec)}
                            className="text-blue-700 hover:text-blue-900 hover:bg-blue-100"
                          >
                            <Eye className="h-4 w-4 mr-1" /> {form.dtiSec?.name.slice(0, 20)}...
                          </Button>
                        </div>
                      )}

                      {form.businessPermitTypes.includes("Mayor's Permit") && form.mayorsPermit && (
                        <div className="flex justify-between items-center py-1.5 border-b border-blue-100">
                          <span className="font-medium text-gray-700">Mayor's Permit:</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFileView(form.mayorsPermit)}
                            className="text-blue-700 hover:text-blue-900 hover:bg-blue-100"
                          >
                            <Eye className="h-4 w-4 mr-1" /> {form.mayorsPermit?.name.slice(0, 20)}...
                          </Button>
                        </div>
                      )}

                      {form.businessPermitTypes.includes("BIR Certificate") && form.birCertificate && (
                        <div className="flex justify-between items-center py-1.5">
                          <span className="font-medium text-gray-700">BIR Certificate:</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFileView(form.birCertificate)}
                            className="text-blue-700 hover:text-blue-900 hover:bg-blue-100"
                          >
                            <Eye className="h-4 w-4 mr-1" /> {form.birCertificate?.name.slice(0, 20)}...
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-purple-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-purple-900 text-lg">Verification Documents</h4>
                    </div>
                    <div className="space-y-2 text-sm bg-white/60 p-4 rounded-lg">
                      <div className="flex justify-between items-center py-1.5 border-b border-purple-100">
                        <span className="font-medium text-gray-700">ID Type:</span>
                        <span className="text-gray-900 font-semibold">{form.governmentIdType}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-purple-100">
                        <span className="font-medium text-gray-700">Government ID:</span>
                        {form.governmentId && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFileView(form.governmentId)}
                            className="text-purple-700 hover:text-purple-900 hover:bg-purple-100"
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        )}
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-purple-100">
                        <span className="font-medium text-gray-700">Selfie with ID:</span>
                        {form.selfieWithId && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFileView(form.selfieWithId)}
                            className="text-purple-700 hover:text-purple-900 hover:bg-purple-100"
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        )}
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-purple-100">
                        <span className="font-medium text-gray-700">Proof of Address:</span>
                        {form.proofOfAddress && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFileView(form.proofOfAddress)}
                            className="text-purple-700 hover:text-purple-900 hover:bg-purple-100"
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        )}
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-purple-100">
                        <span className="font-medium text-gray-700">FDA Certificate:</span>
                        {form.fdaCertificate && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFileView(form.fdaCertificate)}
                            className="text-purple-700 hover:text-purple-900 hover:bg-purple-100"
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        )}
                      </div>
                      <div className="flex justify-between items-center py-1.5">
                        <span className="font-medium text-gray-700">Product Labels:</span>
                        {form.productLabels && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFileView(form.productLabels)}
                            className="text-purple-700 hover:text-purple-900 hover:bg-purple-100"
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 p-5 rounded-xl mt-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-6 w-6 text-green-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-900 mb-1">You're all set! 🎉</p>
                      <p className="text-sm text-green-800">
                        Once submitted, our team will review your application within 24-48 hours. You'll receive an
                        email notification once approved!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-6 border-t-2 border-gray-100">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="w-full sm:w-auto rounded-lg h-12 px-8 text-base font-medium border-2 border-gray-300 hover:bg-gray-50 bg-transparent"
                >
                  ← Back
                </Button>
              )}
              <div className={step === 0 ? "w-full" : "w-full sm:w-auto sm:ml-auto"}>
                {step < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 w-full rounded-lg h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Continue →
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 w-full rounded-lg h-12 px-8 text-base font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "🚀 Submit Application"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-700 mb-1">10,000+</div>
              <div className="text-sm text-gray-600">Active Sellers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-700 mb-1">50,000+</div>
              <div className="text-sm text-gray-600">Products Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-700 mb-1">24-48hrs</div>
              <div className="text-sm text-gray-600">Approval Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
