"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Package, Clock, CheckCircle2, XCircle, TrendingUp } from "lucide-react"
import Link from "next/link"

type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  dateAdded: string
  status: "Pending" | "Approved" | "Rejected" | "Out of Stock"
}

export default function SellerDashboard() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Mock Data - Replace with API call
    setProducts([
      {
        id: 1,
        name: "Premium Dog Food",
        category: "Pet Food",
        price: 499,
        stock: 30,
        dateAdded: "9/26/2023",
        status: "Approved",
      },
      {
        id: 2,
        name: "Cat Shampoo",
        category: "Grooming",
        price: 199,
        stock: 12,
        dateAdded: "9/25/2023",
        status: "Pending",
      },
      {
        id: 3,
        name: "Dog Toy Set",
        category: "Toys",
        price: 299,
        stock: 0,
        dateAdded: "9/24/2023",
        status: "Out of Stock",
      },
    ])
  }, [])

  const stats = {
    totalProducts: products.length,
    pending: products.filter((p) => p.status === "Pending").length,
    approved: products.filter((p) => p.status === "Approved").length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
          
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-md border-0">
            <CardContent className="p-6 flex items-center gap-4">
              <Package className="w-10 h-10 text-teal-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
                <p className="text-sm text-gray-600">Total Products</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0">
            <CardContent className="p-6 flex items-center gap-4">
              <Clock className="w-10 h-10 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-sm text-gray-600">Pending Approval</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0">
            <CardContent className="p-6 flex items-center gap-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.approved}</p>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0">
            <CardContent className="p-6 flex items-center gap-4">
              <XCircle className="w-10 h-10 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{stats.outOfStock}</p>
                <p className="text-sm text-gray-600">Out of Stock</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Products */}
        <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recent Products</h2>
              <Link href="/seller/products">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.slice(0, 3).map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id.toString().padStart(2, "0")}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>₱{product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        className={`
                          ${
                            product.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : product.status === "Pending"
                                ? "bg-blue-100 text-blue-700"
                                : product.status === "Rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-orange-100 text-orange-700"
                          }
                        `}
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Sales Overview (Placeholder) */}
        <Card className="bg-white shadow-lg border-0 rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <TrendingUp className="w-10 h-10 text-purple-600" />
            <div>
              <p className="text-lg font-bold text-gray-900">₱12,450</p>
              <p className="text-sm text-gray-600">Total Sales (This Month)</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
