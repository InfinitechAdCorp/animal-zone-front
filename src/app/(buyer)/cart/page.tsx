"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Plus, Minus, Store, AlertCircle } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useCart } from "@/context/CartContext"
import { getCart } from "@/lib/api"
import { useRouter } from "next/navigation"

type CartItem = {
  id: number
  product_id: number
  name: string
  price: number
  quantity: number
  stock: number
  image: string
}

type SellerGroup = {
  seller_id: number
  seller_name: string
  seller_slug: string | null
  items: CartItem[]
}

export default function CartPage() {
  const [cartData, setCartData] = useState<SellerGroup[]>([])
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())
  const [selectAllBySeller, setSelectAllBySeller] = useState<Map<number, boolean>>(new Map())
  const { updateCartCount } = useCart()
  const router = useRouter()

  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      if (!token) return console.error("No token")

      const data = await getCart(token)
      setCartData(data)

      // Update cart count
      const totalQuantity = data.reduce(
        (sum: number, seller: SellerGroup) =>
          sum + seller.items.reduce((s: number, item: CartItem) => s + item.quantity, 0),
        0,
      )
      updateCartCount(totalQuantity)
    } catch (error) {
      console.error("Error loading cart:", error)
      toast.error("Failed to load cart")
    }
  }

  // Toggle individual item selection
  const toggleItemSelection = (itemId: number) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  // Toggle all items for a seller
  const toggleSellerSelection = (sellerId: number, items: CartItem[]) => {
    const allSelected = items.every((item) => selectedItems.has(item.id))

    setSelectedItems((prev) => {
      const newSet = new Set(prev)
      items.forEach((item) => {
        if (allSelected) {
          newSet.delete(item.id)
        } else {
          newSet.add(item.id)
        }
      })
      return newSet
    })
  }

  // Select all items in cart
  const toggleSelectAll = () => {
    const allItems = cartData.flatMap((seller) => seller.items)
    const allSelected = allItems.every((item) => selectedItems.has(item.id))

    if (allSelected) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(allItems.map((item) => item.id)))
    }
  }

  // Update quantity
  const updateQuantity = async (itemId: number, type: "increase" | "decrease") => {
    const seller = cartData.find((s) => s.items.some((i) => i.id === itemId))
    const item = seller?.items.find((i) => i.id === itemId)
    if (!item) return

    const newQty = type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1)

    // Check stock limit
    if (newQty > item.stock) {
      toast.error(`Only ${item.stock} items available in stock`)
      return
    }

    const oldQty = item.quantity

    // Optimistic update
    setCartData((prev) =>
      prev.map((s) => ({
        ...s,
        items: s.items.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i)),
      })),
    )

    try {
      const res = await fetch(`${backendUrl}/api/cart/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQty }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Failed to update cart")
      }

      toast.success("Cart updated")
      loadCart() // Refresh to get updated totals
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || "Error updating cart")

      // Revert on error
      setCartData((prev) =>
        prev.map((s) => ({
          ...s,
          items: s.items.map((i) => (i.id === itemId ? { ...i, quantity: oldQty } : i)),
        })),
      )
    }
  }

  // Remove item
  const removeItem = async (itemId: number) => {
    const confirmed = confirm("Remove this item from cart?")
    if (!confirmed) return

    const seller = cartData.find((s) => s.items.some((i) => i.id === itemId))
    const itemToRemove = seller?.items.find((i) => i.id === itemId)
    if (!itemToRemove) return

    // Remove from selection
    setSelectedItems((prev) => {
      const newSet = new Set(prev)
      newSet.delete(itemId)
      return newSet
    })

    // Optimistic update
    setCartData((prev) =>
      prev
        .map((s) => ({
          ...s,
          items: s.items.filter((i) => i.id !== itemId),
        }))
        .filter((s) => s.items.length > 0),
    )

    try {
      const res = await fetch(`${backendUrl}/api/cart/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error("Failed to delete item")

      toast.success("Item removed")
      loadCart() // Refresh cart
    } catch (err) {
      console.error(err)
      toast.error("Error removing item")
      loadCart() // Reload on error
    }
  }

  // Calculate totals for selected items
  const calculateTotals = () => {
    let subtotal = 0
    let hasStockIssue = false

    cartData.forEach((seller) => {
      seller.items.forEach((item) => {
        if (selectedItems.has(item.id)) {
          subtotal += item.price * item.quantity

          // Check if quantity exceeds stock
          if (item.quantity > item.stock) {
            hasStockIssue = true
          }
        }
      })
    })

    const shipping = subtotal > 0 ? 120 : 0
    const total = subtotal + shipping

    return { subtotal, shipping, total, hasStockIssue }
  }

  const { subtotal, shipping, total, hasStockIssue } = calculateTotals()
  const hasSelectedItems = selectedItems.size > 0
  const canCheckout = hasSelectedItems && !hasStockIssue

  const allItems = cartData.flatMap((s) => s.items)
  const allSelected = allItems.length > 0 && allItems.every((item) => selectedItems.has(item.id))

  const proceedToCheckout = () => {
    if (!canCheckout) return

    // Prepare checkout data with only selected items
    const checkoutItems: SellerGroup[] = cartData
      .map((seller) => ({
        ...seller,
        items: seller.items.filter((item) => selectedItems.has(item.id)),
      }))
      .filter((seller) => seller.items.length > 0)

    // Store in localStorage for checkout page
    localStorage.setItem("checkoutItems", JSON.stringify(checkoutItems))

    // Navigate to checkout
    router.push("/checkout")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">My Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Header */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
                  <div className="col-span-6 flex items-center gap-2">
                    <Checkbox checked={allSelected} onCheckedChange={toggleSelectAll} />
                    <span>Product</span>
                  </div>
                  <div className="col-span-2 text-center">Unit Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total Price</div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Groups */}
            {cartData.length > 0 ? (
              cartData.map((seller) => {
                const sellerItemsSelected = seller.items.every((item) => selectedItems.has(item.id))

                return (
                  <Card key={seller.seller_id} className="shadow-sm">
                    <CardContent className="p-4 space-y-4">
                      {/* Seller Header */}
                      <div className="flex items-center gap-2 pb-3 border-b">
                        <Checkbox
                          checked={sellerItemsSelected}
                          onCheckedChange={() => toggleSellerSelection(seller.seller_id, seller.items)}
                        />
                        <Store className="w-4 h-4 text-green-600" />
                        {seller.seller_slug ? (
                          <Link
                            href={`/store/${seller.seller_slug}`}
                            className="font-semibold text-gray-900 hover:text-green-600 transition-colors"
                          >
                            {seller.seller_name}
                          </Link>
                        ) : (
                          <span className="font-semibold text-gray-900">{seller.seller_name}</span>
                        )}
                      </div>

                      {/* Items */}
                      {seller.items.map((item) => {
                        const isSelected = selectedItems.has(item.id)
                        const stockExceeded = item.quantity > item.stock

                        return (
                          <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                            {/* Product Info */}
                            <div className="col-span-6 flex items-center gap-3">
                              <Checkbox checked={isSelected} onCheckedChange={() => toggleItemSelection(item.id)} />
                              <img
                                src={
                                  item.image?.startsWith("http")
                                    ? item.image
                                    : `${backendUrl}/${item.image?.replace(/^\/+/, "")}`
                                }
                                alt={item.name}
                                className="w-16 h-16 rounded-md object-cover"
                                onError={(e) => (e.currentTarget.src = "/no-image.png")}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-gray-900 truncate">{item.name}</p>
                                {stockExceeded && (
                                  <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                                    <AlertCircle className="w-3 h-3" />
                                    <span>Only {item.stock} in stock</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Unit Price */}
                            <div className="col-span-2 text-center text-sm">₱{Number(item.price).toFixed(2)}</div>

                            {/* Quantity Controls */}
                            <div className="col-span-2 flex items-center justify-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, "decrease")}
                                className="w-7 h-7"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, "increase")}
                                className="w-7 h-7"
                                disabled={item.quantity >= item.stock}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>

                            {/* Total Price */}
                            <div className="col-span-1 text-center text-sm font-semibold text-green-600">
                              ₱{(item.price * item.quantity).toFixed(2)}
                            </div>

                            {/* Delete */}
                            <div className="col-span-1 text-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(item.id)}
                                className="hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <Card className="shadow-sm">
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500 text-lg">Your cart is empty 🛒</p>
                  <Link href="/shop">
                    <Button className="mt-4 bg-transparent" variant="outline">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <Card className="shadow-sm h-fit sticky top-6">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({selectedItems.size} {selectedItems.size === 1 ? "item" : "items"})
                  </span>
                  <span className="font-medium">₱{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Fee</span>
                  <span className="font-medium">{shipping > 0 ? `₱${shipping}` : "Free"}</span>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-green-600">₱{total.toFixed(2)}</span>
              </div>

              {hasStockIssue && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Some items exceed available stock. Please adjust quantities before checkout.</span>
                </div>
              )}

              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium h-12"
                disabled={!canCheckout}
                onClick={proceedToCheckout}
              >
                {!hasSelectedItems
                  ? "Select items to checkout"
                  : hasStockIssue
                    ? "Adjust quantities"
                    : "Proceed to Checkout"}
              </Button>

              <Link href="/(buyer)/products">
                <Button variant="outline" className="w-full bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
