"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table"
import { Trash2, Plus, Minus } from "lucide-react"
import Link from "next/link"

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    // Mock data - replace with API call
    setCart([
      {
        id: 1,
        name: "Premium Dog Food",
        price: 499,
        quantity: 2,
        image: "/images/dog-food.jpg",
      },
      {
        id: 2,
        name: "Cat Shampoo",
        price: 199,
        quantity: 1,
        image: "/images/cat-shampoo.jpg",
      },
    ])
  }, [])

  const updateQuantity = (id: number, type: "increase" | "decrease") => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 120 : 0
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900">My Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Table */}
          <Card className="lg:col-span-2 shadow-lg border-0 rounded-2xl">
            <CardContent className="p-6 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-600">Product</TableHead>
                    <TableHead className="text-gray-600">Price</TableHead>
                    <TableHead className="text-gray-600">Quantity</TableHead>
                    <TableHead className="text-gray-600">Subtotal</TableHead>
                    <TableHead className="text-right text-gray-600">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <TableRow key={item.id} className="hover:bg-gray-50">
                        <TableCell className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
                          <span className="font-medium text-gray-900">{item.name}</span>
                        </TableCell>
                        <TableCell>₱{item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-8 h-8"
                              onClick={() => updateQuantity(item.id, "decrease")}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="px-2">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-8 h-8"
                              onClick={() => updateQuantity(item.id, "increase")}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>₱{(item.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-gray-500 py-6">
                        Your cart is empty 🛒
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="shadow-lg border-0 rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₱{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>{shipping > 0 ? `₱${shipping}` : "Free"}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>₱{total.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium shadow-md">
                Proceed to Checkout
              </Button>
              <Link href="/(buyer)/products">
                <Button variant="outline" className="w-full">
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
