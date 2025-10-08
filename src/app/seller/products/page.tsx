"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, XCircle, Package, Search, Plus } from "lucide-react"
import Link from "next/link"
import { getSellerProductsNew, updateProductStatus } from "@/lib/api"
import { toast } from "sonner"

type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  dateAdded: string
  status: "Pending" | "Approved" | "Rejected" | "Out of Stock"
}

export default function SellerProductPanel() {
  const [products, setProducts] = useState<Product[]>([])
  const [activeFilter, setActiveFilter] = useState("All Products")
  const [searchQuery, setSearchQuery] = useState("")

  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    outOfStock: 0,
  })

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) return

    const fetchProducts = async () => {
      try {
        const { products, counts } = await getSellerProductsNew(token)
        setProducts(products)
        setStatusCounts(counts)
      } catch (err) {
        console.error(err)
      }
    }

    fetchProducts()
  }, [])

  // ✅ Recalculate counts whenever products change
  useEffect(() => {
    const newCounts = {
      pending: products.filter((p) => p.status === "Pending").length,
      approved: products.filter((p) => p.status === "Approved").length,
      rejected: products.filter((p) => p.status === "Rejected").length,
      outOfStock: products.filter((p) => p.status === "Out of Stock").length,
    }
    setStatusCounts(newCounts)
  }, [products])

  const filteredProducts = products.filter((p) => {
    const matchesFilter = activeFilter === "All Products" || p.status === activeFilter
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const filters = ["All Products", "Pending", "Approved", "Rejected", "Out of Stock"]

  const handleStatusChange = async (id: number, status: string) => {
    const token = localStorage.getItem("authToken")
    if (!token) return

    try {
      await updateProductStatus(id, status, token)
      toast.success(`Product ${status} successfully`)
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: status as any } : p))
      )
    } catch (error) {
      toast.error("Failed to update status")
    }
  }

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
          {[
            { label: "Pending", count: statusCounts.pending, color: "blue", icon: Clock },
            { label: "Approved", count: statusCounts.approved, color: "green", icon: CheckCircle2 },
            { label: "Rejected", count: statusCounts.rejected, color: "red", icon: XCircle },
            { label: "Out of Stock", count: statusCounts.outOfStock, color: "orange", icon: Package },
          ].map(({ label, count, color, icon: Icon }) => (
            <Card key={label} className="bg-white shadow-md hover:shadow-lg transition-shadow border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center mb-3`}>
                      <Icon className={`w-6 h-6 text-${color}-600`} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                    <p className="text-sm text-gray-600 mt-1">{label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Products Table */}
        <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
          <CardContent className="p-6">
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
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price (₱)</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>₱{Number(product.price).toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{product.dateAdded}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              product.status === "Approved"
                                ? "bg-green-100 text-green-700"
                                : product.status === "Pending"
                                ? "bg-blue-100 text-blue-700"
                                : product.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                            }
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                        No products found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
