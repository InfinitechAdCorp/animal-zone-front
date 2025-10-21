"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Package,
  CheckCircle,
  XCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  ExternalLink,
} from "lucide-react";

interface ProductImage {
  id: number;
  product_id: number;
  image_path: string; // ✅ correct field
  url?: string;       // ✅ optional URL from accessor
}


interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  status: string;
  seller: { id: number; name: string };
  product_category: { id: number; name: string };
  pet_types: { id: number; name: string }[];
  documents?: ProductDocument[];
  images?: ProductImage[];
}

interface ProductDocument {
  id: number;
  product_id: number;
  document_type: string;
  file_path: string;
}

export default function ProductApprovals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // show 6 cards per page

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            Accept: "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();

      // Fetch documents for each product
      const productsWithDocs = await Promise.all(
        data.map(async (product: Product) => {
          try {
            const docRes = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/products/${product.id}/documents`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
              }
            );
            if (!docRes.ok) return { ...product, documents: [] };
            const docs = await docRes.json();
            return { ...product, documents: docs };
          } catch {
            return { ...product, documents: [] };
          }
        })
      );

      // ✅ Sort pending first
      const sorted = productsWithDocs.sort((a, b) => {
        const order = { pending: 1, approved: 2, rejected: 3 };
        return order[a.status as keyof typeof order] - order[b.status as keyof typeof order];
      });

      setProducts(sorted);
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

  const updateStatus = async (id: number, status: "approved" | "rejected") => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/products/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) throw new Error("Failed to update status");

      toast.success(`Product ${status} successfully`);
      fetchProducts();
    } catch (err) {
      console.error("❌ Error updating status:", err);
      toast.error("Failed to update status");
    }
  };

  const filtered = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.seller?.name?.toLowerCase().includes(q) ||
      p.product_category?.name?.toLowerCase().includes(q) ||
      p.status.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filtered.slice(startIndex, startIndex + itemsPerPage);

  const pendingCount = products.filter((p) => p.status === "pending").length;

  useEffect(() => setCurrentPage(1), [searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
            <Package className="w-5 h-5 text-green-800" />
            Product Approvals
            <Badge variant="secondary" className="ml-2 text-sm">
              {pendingCount} Pending
            </Badge>
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, seller, category, or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-sm sm:text-base"
          />
        </div>

        {currentProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 text-sm sm:text-base">
              No products found.
            </p>
          </div>
        ) : (
          <>
            {/* ✅ Responsive grid layout */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {currentProducts.map((p) => (
                <div
                  key={p.id}
                  className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition flex flex-col justify-between bg-white"
                >
                  {/* Image */}
                {p.images && p.images.length > 0 ? (
                    <a
                      href={
                        p.images[0]?.url ||
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${p.images[0]?.image_path}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={
                          p.images[0]?.url ||
                          `${process.env.NEXT_PUBLIC_BACKEND_URL}/${p.images[0]?.image_path}`
                        }
                        alt={p.name}
                        className="w-full h-40 object-cover rounded-lg border mb-3 cursor-pointer hover:opacity-90 transition"
                      />
                    </a>
                  ) : (
                    <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs mb-3">
                      No image
                    </div>
                  )}

                  {/* Info */}
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{p.name}</h3>
                  <p className="text-sm text-gray-500">Seller: {p.seller?.name || "N/A"}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    Category: {p.product_category?.name || "N/A"}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {p.pet_types?.map((t) => (
                      <Badge key={t.id} className="bg-gray-100 text-gray-700">
                        {t.name}
                      </Badge>
                    ))}
                  </div>

                  {/* Status + Price */}
                  <div className="mt-auto pt-2 flex justify-between items-center">
                    <Badge
                      variant={
                        p.status === "approved"
                          ? "default"
                          : p.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                      className="capitalize"
                    >
                      {p.status}
                    </Badge>
                    <p className="text-sm text-gray-500">
                      ₱{p.price} • Stock: {p.stock}
                    </p>
                  </div>

                  {/* Documents */}
                  {p.documents && p.documents.length > 0 && (
                    <div className="mt-3 border-t pt-2">
                      <h4 className="font-medium text-gray-800 flex items-center gap-1 mb-2">
                        <FileText className="w-4 h-4 text-green-700" />
                        Attached Documents
                      </h4>
                      <ul className="space-y-1">
                        {p.documents.map((doc) => (
                          <li
                            key={doc.id}
                            className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
                          >
                            <span className="text-sm text-gray-700">
                              {doc.document_type.replaceAll("_", " ")}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1 text-green-700 border-green-700 hover:bg-green-50"
                              onClick={() =>
                                window.open(
                                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/${doc.file_path}`,
                                  "_blank"
                                )
                              }
                            >
                              <ExternalLink className="w-4 h-4" />
                              View
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Approve/Reject */}
                  {p.status === "pending" && (
                    <div className="mt-3 flex gap-2">
                      <Button
                        onClick={() => updateStatus(p.id, "approved")}
                        className="bg-green-700 hover:bg-green-600 text-white flex-1"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => updateStatus(p.id, "rejected")}
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-50 flex-1"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {filtered.length > itemsPerPage && (
              <div className="flex justify-between items-center border-t pt-4 mt-6 text-sm text-gray-600">
                <p>
                  Showing {startIndex + 1}–
                  {Math.min(startIndex + itemsPerPage, filtered.length)} of{" "}
                  {filtered.length}
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    variant="outline"
                    size="sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
