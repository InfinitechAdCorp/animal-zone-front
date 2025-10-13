"use client"

import React, { useEffect, useState } from "react"
import { getSellerOrders, updateOrderStatus } from "@/lib/api"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null

  useEffect(() => {
    if (token) {
      getSellerOrders(token)
        .then(setOrders)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [token])

  async function handleStatusChange(orderId: number, newStatus: string) {
    if (!token) return
    try {
      await updateOrderStatus(orderId, newStatus, token)
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      )
    } catch (err) {
      alert("Failed to update status.")
      console.error(err)
    }
  }

  if (loading) return <p className="p-6 text-gray-600">Loading orders...</p>
  if (error) return <p className="p-6 text-red-600">{error}</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Orders</h1>
      <p className="text-gray-600 mb-4">Manage your customer orders below.</p>

      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No orders yet.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.user?.name || "Unknown"}</td>
                <td className="p-3">₱{Number(order.total).toFixed(2)}</td>
                <td className="p-3 capitalize">{order.status}</td>
                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
