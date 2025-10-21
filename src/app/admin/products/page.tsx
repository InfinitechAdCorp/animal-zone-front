"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard2 from "@/components/landing/ProductCard2";

interface ProductImage {
  id: number;
  image_path: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  price: number;
  stock: number;
  status: string;
  seller: { id: number; name: string };
  product_category: { id: number; name: string };
  pet_types: { id: number; name: string }[];
  images?: ProductImage[];
  rating?: number;
  review_count?: number;
}

interface Category {
  id: number;
  name: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [petTypes, setPetTypes] = useState<Category[]>([]);
  const [productCategories, setProductCategories] = useState<Category[]>([]);
  const [selectedPetType, setSelectedPetType] = useState<string>("");
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [newPetType, setNewPetType] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [adding, setAdding] = useState(false);

  // ✅ Fetch all
  const fetchData = async () => {
    try {
      const [productsRes, petTypesRes, productCatsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/products`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            Accept: "application/json",
          },
        }),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pet-types`),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product-categories`),
      ]);

      if (!productsRes.ok) throw new Error("Failed to fetch products");

      const productsData = await productsRes.json();
      const petTypesData = await petTypesRes.json();
      const productCatsData = await productCatsRes.json();

      setProducts(productsData);
      setFilteredProducts(productsData);
      setPetTypes(petTypesData);
      setProductCategories(productCatsData);
    } catch (err) {
      console.error("❌ Error fetching data:", err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Filter logic
  useEffect(() => {
    let filtered = products;

    if (selectedPetType) {
      filtered = filtered.filter((product) =>
        product.pet_types?.some((pet) => pet.name === selectedPetType)
      );
    }

    if (selectedProductCategory) {
      filtered = filtered.filter(
        (product) => product.product_category?.name === selectedProductCategory
      );
    }

    setFilteredProducts(filtered);
  }, [selectedPetType, selectedProductCategory, products]);

  // ✅ Approve / Reject product
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
      fetchData();
    } catch (err) {
      console.error("❌ Error updating status:", err);
      toast.error("Failed to update status");
    }
  };

  // ✅ Add new Pet Type
  const handleAddPetType = async () => {
    if (!newPetType.trim()) return toast.error("Pet type name is required");
    setAdding(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pet-types`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ name: newPetType }),
      });

      if (!res.ok) throw new Error("Failed to add pet type");

      toast.success("Pet type added successfully");
      setNewPetType("");
      fetchData();
    } catch (err) {
      console.error("❌ Error adding pet type:", err);
      toast.error("Failed to add pet type");
    } finally {
      setAdding(false);
    }
  };

  // ✅ Add new Product Category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return toast.error("Category name is required");
    setAdding(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product-categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ name: newCategory }),
      });

      if (!res.ok) throw new Error("Failed to add category");

      toast.success("Product category added successfully");
      setNewCategory("");
      fetchData();
    } catch (err) {
      console.error("❌ Error adding category:", err);
      toast.error("Failed to add category");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Manage Seller Products</h1>

      {/* ✅ Add Pet Types and Categories */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h2 className="font-semibold mb-2">Add New Pet Type</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={newPetType}
              onChange={(e) => setNewPetType(e.target.value)}
              placeholder="e.g. Dog"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
            />
            <Button onClick={handleAddPetType} disabled={adding}>
              <PlusCircle className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h2 className="font-semibold mb-2">Add New Product Category</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g. Food, Toys"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
            />
            <Button onClick={handleAddCategory} disabled={adding}>
              <PlusCircle className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>
        </div>
      </div>

      {/* ✅ Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={selectedPetType}
          onChange={(e) => setSelectedPetType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
        >
          <option value="">All Pet Types</option>
          {petTypes.map((pet) => (
            <option key={pet.id} value={pet.name}>
              {pet.name}
            </option>
          ))}
        </select>

        <select
          value={selectedProductCategory}
          onChange={(e) => setSelectedProductCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
        >
          <option value="">All Product Categories</option>
          {productCategories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Products */}
      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="relative">
              <CardContent className="p-4">
                <ProductCard2
                  id={product.id.toString()}
                  slug={product.slug}
                  name={product.name}
                  price={product.price}
                  image={
                    product.images?.[0]?.image_path
                      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[0].image_path}`
                      : "/placeholder.png"
                  }
                  category={product.product_category?.name || "N/A"}
                  seller={product.seller?.name || "Unknown"}
                  inStock={product.stock > 0}
                  rating={product.rating || 0}
                  reviewCount={product.review_count || 0}
                  showAddToCart={false}
                  clickable={false}
                />

                {/* ✅ Approve / Reject Buttons */}
                {product.status === "pending" && (
                  <div className="flex justify-center gap-2 mt-4">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => updateStatus(product.id, "approved")}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateStatus(product.id, "rejected")}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}

                {/* ✅ Status Badge */}
                {product.status !== "pending" && (
                  <div className="text-center mt-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        product.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
