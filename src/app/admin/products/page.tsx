     "use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  status: string;
  seller: { id: number; name: string };
  product_category: { id: number; name: string }; // ✅ correct
  pet_types: { id: number; name: string }[];
}


export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Approve / Reject product
  const updateStatus = async (id: number, status: "approved" | "rejected") => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/products/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      toast.success(`Product ${status} successfully`);
      fetchProducts(); // reload list
    } catch (err) {
      console.error("❌ Error updating status:", err);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Seller Products</h1>

      <Card>
        <CardContent className="p-4">
          {loading ? (
            <p className="text-gray-500">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Seller</th>
                    <th className="px-4 py-2 border">Category</th>
                    <th className="px-4 py-2 border">Pet Types</th>
                    <th className="px-4 py-2 border">Price</th>
                    <th className="px-4 py-2 border">Stock</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="px-4 py-2 border">{p.id}</td>
                      <td className="px-4 py-2 border font-medium">{p.name}</td>
                      <td className="px-4 py-2 border">{p.seller?.name || "N/A"}</td>
                     <td className="px-4 py-2 border">{p.product_category?.name || "N/A"}</td>
                      <td className="px-4 py-2 border">
                        {p.pet_types.map((t) => (
                          <Badge key={t.id} className="mr-1">{t.name}</Badge>
                        ))}
                      </td>
                      <td className="px-4 py-2 border">₱{p.price}</td>
                      <td className="px-4 py-2 border">{p.stock}</td>
                      <td className="px-4 py-2 border">
                        <Badge
                          variant={
                            p.status === "approved"
                              ? "default"
                              : p.status === "pending"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {p.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-2 border space-x-2">
                        {p.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => updateStatus(p.id, "approved")}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updateStatus(p.id, "rejected")}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
