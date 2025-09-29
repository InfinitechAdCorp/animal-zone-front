"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import Link from "next/link";
import { toast } from "sonner";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Pending" | "Approved" | "Rejected";
};

export default function SellerProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  // Dummy data – replace with fetch from backend
  useEffect(() => {
    setProducts([
      { id: 1, name: "Premium Dog Food", category: "Pet Food", price: 499, stock: 30, status: "Approved" },
      { id: 2, name: "Cat Shampoo", category: "Grooming", price: 199, stock: 12, status: "Pending" },
    ]);
  }, []);

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success("Product deleted!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">My Products</h1>
          <Link href="/seller/products/new">
            <Button className="bg-orange-500 hover:bg-orange-600">+ Add New Product</Button>
          </Link>
        </div>

        <Card className="shadow-lg rounded-2xl bg-white">
          <CardContent className="p-4 sm:p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price (₱)</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : product.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link href={`/seller/products/${product.id}/edit`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
