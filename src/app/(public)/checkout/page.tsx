"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Store, MapPin, CreditCard, Building2, Smartphone } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"
import { placeOrder } from "@/lib/api"
import DeliveryLocationForm from "@/components/DeliveryLocationForm"
import { regions } from "@/data/region"
import { provinces } from "@/data/province"
import { cities } from "@/data/cities"
import { barangay } from "@/data/barangay"

type CheckoutItem = {
  id: number
  product_id: number
  name: string
  price: number
  quantity: number
  image: string
}

type SellerGroup = {
  seller_id: number
  seller_name: string
  seller_slug: string | null
  items: CheckoutItem[]
}

export default function CheckoutPage() {
  const router = useRouter()
  const [checkoutData, setCheckoutData] = useState<SellerGroup[]>([])
  const [paymentMethod, setPaymentMethod] = useState<string>("gcash")
  const [isProcessing, setIsProcessing] = useState(false)

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") || localStorage.getItem("authToken")
      : null

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    email: "",
    phone: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    street_address: "",
    postal_code: "",
  })

  useEffect(() => {
    const loadData = async () => {
      const selectedItemsData = localStorage.getItem("checkoutItems")
      if (!selectedItemsData) {
        toast.error("No items selected for checkout")
        router.push("/cart")
        return
      }

      try {
        const data = JSON.parse(selectedItemsData)
        setCheckoutData(data)
      } catch (error) {
        console.error("Error parsing checkout data:", error)
        toast.error("Invalid checkout data")
        router.push("/cart")
      }

      await loadUserInfo()
    }

    loadData()
  }, [])

  // 🧠 Safe helpers
  const getBarangayCode = (name: string) =>
    barangay.find(
      (b) => b.brgy_name?.trim()?.toLowerCase() === name?.trim()?.toLowerCase()
    )?.brgy_code || ""

  const getBarangayName = (code: string | number) =>
    barangay.find((b) => String(b.brgy_code) === String(code))?.brgy_name || ""

  const getRegionCode = (name: string) =>
    regions.find((r) => r.region_name === name)?.region_code || ""

  const getProvinceCode = (name: string) =>
    provinces.find((p) => p.province_name === name)?.province_code || ""

  const getCityCode = (name: string) =>
    cities.find((c) => c.city_name === name)?.city_code || ""

  const getRegionName = (code: string) =>
    regions.find((r) => r.region_code === code)?.region_name || ""

  const getProvinceName = (code: string) =>
    provinces.find((p) => p.province_code === code)?.province_name || ""

  const getCityName = (code: string) =>
    cities.find((c) => c.city_code === code)?.city_name || ""

  const loadUserInfo = async () => {
    if (!token) return

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      const data = await res.json()
      if (!res.ok || !data.data) {
        toast.error(data.message || "Failed to load user profile")
        return
      }

      const d = data.data

      setDeliveryInfo({
        name: d.name ?? "",
        email: d.email ?? "",
        phone: d.contact_number ?? "",
        region: getRegionCode(d.region ?? ""),
        province: getProvinceCode(d.province ?? ""),
        city: getCityCode(d.city ?? ""),
        barangay: getBarangayCode(d.barangay ?? ""),
        street_address: d.street_address ?? "",
        postal_code: d.postal_code ?? "",
      })
    } catch (error) {
      console.error("Error loading user info:", error)
      toast.error("Failed to load delivery information")
    }
  }

  const handleUpdateDeliveryInfo = async () => {
    if (!token) {
      toast.error("Please log in first")
      return
    }

    const payload = {
      name: deliveryInfo.name,
      email: deliveryInfo.email,
      contact_number: deliveryInfo.phone,
      region: getRegionName(deliveryInfo.region),
      province: getProvinceName(deliveryInfo.province),
      city: getCityName(deliveryInfo.city),
      barangay: getBarangayName(deliveryInfo.barangay),
      street_address: deliveryInfo.street_address,
      postal_code: deliveryInfo.postal_code,
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      )

      const data = await res.json()

      if (res.ok) {
        toast.success("Delivery information updated successfully!")
        localStorage.setItem("user", JSON.stringify(data.data))
      } else {
        toast.error(data.message || "Failed to update delivery info")
      }
    } catch (error) {
      console.error("Error updating delivery info:", error)
      toast.error("Error saving delivery info")
    }
  }

  const calculateTotals = () => {
    let subtotal = 0
    checkoutData.forEach((seller) => {
      seller.items.forEach((item) => {
        subtotal += Number(item.price) * item.quantity
      })
    })
    const shipping = 120
    const total = subtotal + shipping
    return { subtotal, shipping, total }
  }

  const handlePlaceOrder = async () => {
    const { name, email, phone, region, province, city, barangay, street_address } =
      deliveryInfo

    if (!name || !email || !phone || !region || !province || !city || !barangay || !street_address) {
      toast.error("Please fill in all delivery information")
      return
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method")
      return
    }

    setIsProcessing(true)
    try {
      const { subtotal, shipping, total } = calculateTotals()

      const orderData = {
        delivery_info: {
          name,
          email,
          phone,
          region: getRegionName(region),
          province: getProvinceName(province),
          city: getCityName(city),
          barangay: getBarangayName(barangay),
          street_address,
          postal_code: deliveryInfo.postal_code,
        },
        payment_method: paymentMethod,
        items: checkoutData.flatMap((seller) =>
          seller.items.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
          }))
        ),
        subtotal,
        shipping,
        total,
      }

      const result = await placeOrder(orderData, token as string)
      localStorage.removeItem("checkoutItems")

      toast.success("Order placed successfully!")
      router.push(`/orders/${result.order_id}`)
    } catch (error: any) {
      console.error("Error placing order:", error)
      toast.error(error.message || "Failed to place order")
    } finally {
      setIsProcessing(false)
    }
  }

  const { subtotal, shipping, total } = calculateTotals()
  const totalItems = checkoutData.reduce((sum, seller) => sum + seller.items.length, 0)

  if (checkoutData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 mb-4">Loading checkout...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <Link href="/cart">
            <Button variant="outline">Back to Cart</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* DELIVERY INFO */}
            <Card className="shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Delivery Information
                  </h2>
                </div>
                <DeliveryLocationForm
                  value={deliveryInfo}
                  onChange={(name, value) =>
                    setDeliveryInfo({ ...deliveryInfo, [name]: value })
                  }
                />

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    className="mt-3"
                    onClick={handleUpdateDeliveryInfo}
                  >
                    Update Delivery Info
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* PAYMENT METHOD */}
            <Card className="shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Payment Method
                  </h2>
                </div>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    {[
                      {
                        id: "gcash",
                        icon: <Smartphone className="w-5 h-5 text-blue-600" />,
                        title: "GCash",
                        desc: "Pay via GCash mobile wallet",
                      },
                      {
                        id: "bpi",
                        icon: <Building2 className="w-5 h-5 text-red-600" />,
                        title: "BPI Online Banking",
                        desc: "Bank of the Philippine Islands",
                      },
                      {
                        id: "bank_transfer",
                        icon: <Building2 className="w-5 h-5 text-green-600" />,
                        title: "Other Banks",
                        desc: "BDO, Metrobank, UnionBank, etc.",
                      },
                      {
                        id: "cod",
                        icon: <CreditCard className="w-5 h-5 text-gray-600" />,
                        title: "Cash on Delivery",
                        desc: "Pay when you receive your order",
                      },
                    ].map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label
                          htmlFor={method.id}
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          {method.icon}
                          <div>
                            <p className="font-medium">{method.title}</p>
                            <p className="text-xs text-gray-500">{method.desc}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* ORDER ITEMS */}
            <Card className="shadow-sm">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Order Items ({totalItems})
                </h2>
                {checkoutData.map((seller) => (
                  <div key={seller.seller_id} className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <Store className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-gray-900">
                        {seller.seller_name}
                      </span>
                    </div>
                    {seller.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 py-2 border-b last:border-none"
                      >
                        <img
                          src={
                            item.image?.startsWith("http")
                              ? item.image
                              : `${backendUrl}/${item.image?.replace(/^\/?/, "")}`
                          }
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md border"
                          onError={(e) =>
                            ((e.target as HTMLImageElement).src = "/placeholder.png")
                          }
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">
                            ₱{(Number(item.price) * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">
                            ₱{Number(item.price).toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <Card className="shadow-sm h-fit sticky top-6">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-medium">₱{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Fee</span>
                  <span className="font-medium">₱{shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₱{total.toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium h-12"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
              <p className="text-xs text-gray-500 text-center">
                By placing your order, you agree to our terms and conditions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
