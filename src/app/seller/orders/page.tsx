"use client";

import React, { useEffect, useState } from "react";
import { getSellerOrders, updateOrderStatus } from "@/lib/api";
import { toast } from "sonner";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  useEffect(() => {
    if (token) {
      getSellerOrders(token)
        .then(setOrders)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [token]);

  async function handleStatusChange(orderId: number, newStatus: string) {
    if (!token) return;

    try {
      await updateOrderStatus(orderId, newStatus, token);

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: newStatus } : o
        )
      );

      toast.success(`Order #${orderId} marked as ${newStatus}.`, {
        description: "The order status was updated successfully.",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order status.", {
        description: "Please try again later.",
      });
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "shipped":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  }

  if (loading) return <p className="p-6 text-gray-600">Loading orders...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Orders</h1>
      <p className="text-gray-600 mb-4">
        Manage your customer orders below.
      </p>

      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Products Ordered</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No orders yet.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id} className="border-t align-top">
                <td className="p-3">{order.id}</td>
                <td className="p-3">
                  {order.customer_name || order.user?.name || "Unknown"}
                </td>

                {/* 🟢 Products Ordered */}
                <td className="p-3">
                  {order.items && order.items.length > 0 ? (
                    <div className="space-y-2">
                      {order.items.map((item: any) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 border rounded p-2"
                        >
                         {item.image && (
                            <img
                              src={item.image}
                              alt={item.product_name}
                              className="w-20 h-20 object-cover rounded-md border"
                            />
                          )}

                          <div>
                            <p className="font-medium text-sm">
                              {item.product_name}
                            </p>
                            <p className="text-xs text-gray-500">
                              x{item.quantity} • ₱
                              {Number(item.price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400">No products</span>
                  )}
                </td>

                <td className="p-3">₱{Number(order.total).toFixed(2)}</td>

                {/* 🟢 Colored Status */}
                <td className="p-3">
                  <span
                    className={`capitalize px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
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
  );
}
