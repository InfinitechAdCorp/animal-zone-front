"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Star,
  Store,
  MapPin,
  Minus,
  Plus,
  FileText,
  PawPrint,
  Weight,
  Calendar,
  Leaf,
} from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${slug}`
        );
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [slug]);

  if (!product) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center text-gray-600">
          Loading product...
        </div>
      </>
    );
  }

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
            <Link href="/" className="hover:text-green-800">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-green-800">
              Shop
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">
              {product.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Image Gallery */}
            <div>
              
                <div className="relative w-full bg-white rounded-2xl shadow-lg overflow-hidden mb-4 flex items-center justify-center">
                  <div className="w-full h-[500px] flex items-center justify-center p-6 bg-gray-50">
                    <img
                      src={
                        product.images?.[selectedImage]
                          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[selectedImage]}`
                          : "/placeholder.png"
                      }
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {discountPercentage > 0 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs sm:text-sm font-bold">
                      -{discountPercentage}%
                    </span>
                  )}

                  {product.stock <= 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <span className="bg-white/90 text-red-600 font-bold px-6 py-3 rounded-lg shadow-lg">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

             

              {/* Thumbnails */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {product.images?.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-white rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-green-800 shadow-md"
                        : "border-gray-200 hover:border-green-400"
                    }`}
                  >
                    <div className="aspect-square flex items-center justify-center bg-gray-50 p-2">
                      <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${image}`}
                        alt={`${product.name} view ${index + 1}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </button>
                ))}
              </div>

            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="inline-block bg-green-800 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {product.product_category?.name || "Uncategorized"}
              </div>

              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

              <p className="text-gray-600 text-sm">
                Brand: <span className="font-medium">{product.brand}</span>
              </p>

              {/* Seller Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2">
              <div>
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-green-700" />
                  <span className="text-gray-700 text-sm">
                    Seller:{" "}
                    <span className="font-semibold text-green-800">
                      {product.seller.name}
                    </span>
                  </span>
                </div>

                {/* ✅ Location shown BELOW seller name */}
                {(product.seller.city || product.seller.province) && (
                  <div className="flex items-center gap-1 text-gray-600 text-sm mt-1 ml-6">
                    <MapPin className="w-4 h-4 text-green-700" />
                    <span>
                      {[product.seller.barangay, product.seller.city, product.seller.province, product.seller.region]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>
                )}
              </div>

              <Link
                href={`/store/${product.seller.slug}`}
                className="mt-3 sm:mt-0 bg-green-800 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-xl shadow-md transition-all"
              >
                Visit Store
              </Link>
            </div>


              {/* Pet Types */}
              {product.pet_types?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.pet_types.map((type: any, index: number) => (
                    <span
                      key={index}
                      className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"
                    >
                      <PawPrint className="w-3 h-3" /> {type.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Price Section */}
              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ₱{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      ₱{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-xs">Inclusive of all taxes</p>
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    product.stock > 0 ? "bg-green-800" : "bg-red-600"
                  }`}
                />
                <span
                  className={`font-medium ${
                    product.stock > 0
                      ? "text-green-800"
                      : "text-red-600"
                  }`}
                >
                  {product.stock > 0
                    ? `In Stock (${product.stock})`
                    : "Out of Stock"}
                </span>
              </div>

              {/* Product Details */}
              <div className="space-y-3 text-sm text-gray-700">
                {product.weight && (
                  <p className="flex items-center gap-2">
                    <Weight className="w-4 h-4 text-green-700" />
                    <span>Weight: {product.weight} kg</span>
                  </p>
                )}
                {product.expiration_date && (
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-700" />
                    <span>
                      Expiration Date:{" "}
                      {new Date(product.expiration_date).toLocaleDateString()}
                    </span>
                  </p>
                )}
                {product.ingredients && (
                  <p className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-700" />
                    <span>Ingredients: {product.ingredients}</span>
                  </p>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <div className="flex flex-wrap items-center gap-3">
                    {/* Quantity Controller */}
                    <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="p-3 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Minus />
                      </button>
                      <span className="px-6 py-3 font-semibold text-lg border-x-2 border-gray-300">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.stock}
                        className="p-3 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Plus />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <span className="text-gray-600 text-sm ml-2">
                      Subtotal: ₱{(product.price * quantity).toLocaleString()}
                    </span>

                    {/* Add to Cart Button */}
                 <AddToCartButton
                    productId={product.id}
                    quantity={quantity}
                    disabled={product.stock <= 0}
                    className="bg-green-800 hover:bg-green-700 text-white px-6 py-4 rounded-2xl shadow-md ml-2"
                  />

                  </div>

              </div>

              {/* Downloadable Documents */}
              {product.documents?.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Product Certifications
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {product.documents.map((doc: any, i: number) => (
                      <li key={i}>
                        <a
                          href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${doc.file_path}`}
                          target="_blank"
                          className="flex items-center gap-2 text-green-700 hover:underline"
                        >
                          <FileText className="w-4 h-4" />
                          View {doc.document_type.replace("_", " ")}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-10 bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Description
            </h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}