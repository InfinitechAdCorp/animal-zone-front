"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Package, ShoppingBag } from "lucide-react"

export default function OrderHistoryPage() {
  const [loading, setLoading] = useState(false)

  // Sample mock data (frontend only)
  const [orders] = useState([
    {
      id: 1023,
      created_at: "2025-10-02T14:30:00Z",
      total_amount: 1299,
      status: "Delivered",
      items: [
        { id: 1, name: "Dog Leash", price: 499, quantity: 1 },
        { id: 2, name: "Pet Shampoo", price: 400, quantity: 2 },
      ],
    },
    {
      id: 1024,
      created_at: "2025-09-29T09:20:00Z",
      total_amount: 720,
      status: "Pending",
      items: [
        { id: 3, name: "Cat Toy Ball", price: 120, quantity: 3 },
        { id: 4, name: "Cat Food 1kg", price: 360, quantity: 1 },
      ],
    },
  ])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-muted-foreground">
        <Loader2 className="animate-spin mr-2" />
        Loading your orders...
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <ShoppingBag className="mx-auto mb-4 h-10 w-10 opacity-50" />
        <p>No orders found yet.</p>
      </div>
    )
  }

  // ✅ Color styling for statuses
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-600 bg-green-100 border-green-300"
      case "pending":
        return "text-yellow-600 bg-yellow-100 border-yellow-300"
      case "cancelled":
        return "text-red-600 bg-red-100 border-red-300"
      default:
        return "text-gray-600 bg-gray-100 border-gray-300"
    }
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-foreground text-center sm:text-left">
        🛍️ Order History
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="border border-border hover:shadow-md hover:scale-[1.01] transition-all duration-200"
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">
                  Order #{order.id}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString("en-PH", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="divide-y divide-border">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between py-2 text-sm"
                  >
                    <span className="text-foreground">{item.name}</span>
                    <span className="font-medium text-muted-foreground">
                      ₱{item.price} × {item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-border">
                <span className="font-semibold text-foreground">Total:</span>
                <span className="font-bold text-primary text-lg">
                  ₱{order.total_amount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className={`flex items-center gap-2 border ${getStatusColor(order.status)}`}
                >
                  <Package className="h-4 w-4" />
                  {order.status}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
