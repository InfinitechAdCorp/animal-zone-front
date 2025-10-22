"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, XCircle, Package, Search, Plus } from "lucide-react"
import Link from "next/link"
import { getSellerProductsNew, updateProductStatus, updateProduct } from "@/lib/api";

import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"


type Product = {
  id: number
  name: string
  image?: string // 👈 Add this line
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
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editForm, setEditForm] = useState({ name: "", price: "", stock: "" })
  const [saving, setSaving] = useState(false)

  const handleEditClick = (product: Product) => {
  setEditingProduct(product)
  setEditForm({
    name: product.name,
    price: product.price.toString(),
    stock: product.stock.toString(),
  })
}

const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
}

const handleSaveChanges = async () => {
  if (!editingProduct) return
  setSaving(true)
  try {
    const formData = new FormData()
    formData.append("name", editForm.name)
    formData.append("price", editForm.price)
    formData.append("stock", editForm.stock)

    await updateProduct(editingProduct.id, formData)
    toast.success("Product updated successfully")

    setProducts((prev) =>
      prev.map((p) =>
        p.id === editingProduct.id
          ? { ...p, name: editForm.name, price: Number(editForm.price), stock: Number(editForm.stock) }
          : p
      )
    )

    setEditingProduct(null)
  } catch (err) {
    console.error(err)
    toast.error("Failed to update product")
  } finally {
    setSaving(false)
  }
}

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

        // ✅ Normalize statuses to consistent labels
        const normalized = products.map((p) => ({
              id: p.id,
              name: p.name,
              category: p.product_category?.name || "Uncategorized",
              price: p.price,
              stock: p.stock,
              dateAdded: new Date(p.created_at).toLocaleDateString(),
              status:
                p.status === "pending"
                  ? "Pending"
                  : p.status === "approved"
                  ? "Approved"
                  : p.status === "rejected"
                  ? "Rejected"
                  : p.stock <= 0
                  ? "Out of Stock"
                  : "Approved",
              image: p.images?.[0]?.image_path
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${p.images[0].image_path}`
                : "/placeholder.png", // ✅ fallback image
            }))


        setProducts(normalized)
        setStatusCounts(counts)
      } catch (err) {
        console.error("Error fetching products:", err)
      }
    }

    fetchProducts()
  }, [])

  // ✅ Automatically update counts when products change
  useEffect(() => {
    const newCounts = {
      pending: products.filter((p) => p.status === "Pending").length,
      approved: products.filter((p) => p.status === "Approved").length,
      rejected: products.filter((p) => p.status === "Rejected").length,
      outOfStock: products.filter((p) => p.status === "Out of Stock").length,
    }
    setStatusCounts(newCounts)
  }, [products])

  // ✅ Filter logic (by status + search)
  const filteredProducts = products.filter((p) => {
    const matchesFilter =
      activeFilter === "All Products" ? true : p.status.toLowerCase() === activeFilter.toLowerCase()
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
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${color}-600`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-sm text-gray-600">{label}</p>
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
                            <TableCell className="font-medium flex items-center gap-3">
                              {product.image && (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-12 h-12 object-cover rounded-md border"
                                />
                              )}
                              <span>{product.name}</span>
                            </TableCell>

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

                            {/* ✅ Add Edit button */}
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditClick(product)}
                                className="text-gray-600 hover:text-teal-700"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-5 h-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536M4 13v4h4l9.293-9.293a1 1 0 000-1.414L15.414 4.586a1 1 0 00-1.414 0L4 13z"
                                  />
                                </svg>
                              </Button>
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
      {editingProduct && (
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <Input
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              placeholder="Product name"
            />
            <Input
              name="price"
              type="number"
              value={editForm.price}
              onChange={handleEditChange}
              placeholder="Price"
            />
            <Input
              name="stock"
              type="number"
              value={editForm.stock}
              onChange={handleEditChange}
              placeholder="Stock"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setEditingProduct(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )}

    </div>

    
  )
}
