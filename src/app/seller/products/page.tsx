"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, XCircle, Package, Search, MoreHorizontal, Plus } from "lucide-react"
import Link from "next/link"

type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  dateAdded: string
  seller: string
  status: "Pending" | "Approved" | "Rejected" | "Out of Stock"
}

export default function AdminReviewPanel() {
  const [products, setProducts] = useState<Product[]>([])
  const [activeFilter, setActiveFilter] = useState("All Products")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Premium Dog Food",
        category: "Pet Food",
        price: 499,
        stock: 30,
        dateAdded: "9/26/2023",
        seller: "Albert Flores",
        status: "Approved",
      },
      {
        id: 2,
        name: "Cat Shampoo",
        category: "Grooming",
        price: 199,
        stock: 12,
        dateAdded: "9/25/2023",
        seller: "Eleanor Pena",
        status: "Pending",
      },
      {
        id: 3,
        name: "Dog Toy Set",
        category: "Toys",
        price: 299,
        stock: 0,
        dateAdded: "9/24/2023",
        seller: "Marvin McKinney",
        status: "Out of Stock",
      },
      {
        id: 4,
        name: "Pet Collar",
        category: "Accessories",
        price: 399,
        stock: 25,
        dateAdded: "9/23/2023",
        seller: "Jerome Bell",
        status: "Rejected",
      },
    ])
  }, [])

  const statusCounts = {
    pending: products.filter((p) => p.status === "Pending").length,
    approved: products.filter((p) => p.status === "Approved").length,
    rejected: products.filter((p) => p.status === "Rejected").length,
    outOfStock: products.filter((p) => p.status === "Out of Stock").length,
  }

  const filters = ["All Products", "Pending", "Approved", "Rejected", "Out of Stock"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Add Product Button */}
        <div className="flex justify-start">
            <Link href="/seller/products/add">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium shadow-md">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
          </Link>

        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{statusCounts.pending}</p>
                  <p className="text-sm text-gray-600 mt-1">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{statusCounts.approved}</p>
                  <p className="text-sm text-gray-600 mt-1">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{statusCounts.rejected}</p>
                  <p className="text-sm text-gray-600 mt-1">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                    <Package className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{statusCounts.outOfStock}</p>
                  <p className="text-sm text-gray-600 mt-1">Out of Stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Products</h2>
              <Button variant="ghost" size="icon" className="text-yellow-600 hover:bg-yellow-50">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                  className={
                    activeFilter === filter
                      ? "bg-teal-700 hover:bg-teal-800 text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }
                >
                  {filter}
                </Button>
              ))}
              <div className="ml-auto flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 border-gray-300"
                  />
                </div>
                <Button variant="outline" size="icon" className="bg-yellow-400 hover:bg-yellow-500 border-0">
                  <Search className="w-4 h-4 text-gray-900" />
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="text-gray-600 font-semibold">Product ID</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Product Name</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Category</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Price (₱)</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Stock</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Date Added</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Seller</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Status</TableHead>
                    <TableHead className="text-right text-gray-600 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product, index) => (
                    <TableRow
                      key={product.id}
                      className={`
                        border-b border-gray-100 hover:bg-gray-50 transition-colors
                        ${index === 2 ? "bg-yellow-50" : ""}
                      `}
                    >
                      <TableCell className="font-medium text-gray-900">
                        {product.id.toString().padStart(2, "0")}
                      </TableCell>
                      <TableCell className="text-gray-900 font-medium">{product.name}</TableCell>
                      <TableCell className="text-gray-600">{product.category}</TableCell>
                      <TableCell className="text-gray-900 font-medium">₱{product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-gray-600">{product.stock}</TableCell>
                      <TableCell className="text-gray-600">{product.dateAdded}</TableCell>
                      <TableCell className="text-gray-600">{product.seller}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`
                            ${
                              product.status === "Approved"
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : product.status === "Pending"
                                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                  : product.status === "Rejected"
                                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                                    : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                            }
                          `}
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                          <MoreHorizontal className="w-4 h-4 text-gray-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
              <span>Showing 1-4 of 4 results</span>
            </div>
          </CardContent>
        </Card>

        {/* Add New Product FAB */}
        <div className="fixed bottom-8 left-8">
          <Button className="bg-teal-700 hover:bg-teal-800 text-white rounded-full w-16 h-16 shadow-2xl">
            <span className="text-2xl">+</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
