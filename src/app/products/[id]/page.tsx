"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  Package,
  Store,
  MapPin,
  Minus,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams(); // get /products/[id] param
  const [product, setProduct] = useState<any | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch product dynamically
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading product...
      </div>
    );
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} of ${product.name} to cart`);
    // integrate cart API here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary-800">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary-800">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-primary-800">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
              <div className="aspect-square relative">
                <img
                  src={
                    product.images?.[selectedImage]
                      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[selectedImage]}`
                      : "/placeholder.png"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discountPercentage > 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                    -{discountPercentage}%
                  </span>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-gray-800 text-white px-6 py-3 rounded-lg text-lg font-bold">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {product.images?.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-white rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-green-800 shadow-md"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <div className="aspect-square">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${image}`}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="inline-block bg-green-800 text-white px-3 py-1 rounded-full text-sm font-medium">
              {product.category}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-900 font-semibold">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  ₱{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ₱{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-bold">
                    Save {discountPercentage}%
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm">Inclusive of all taxes</p>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <div className="w-3 h-3 bg-green-800 rounded-full"></div>
                  <span className="text-primary-600 font-medium">
                    In Stock ({product.stock} available)
                  </span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="px-6 py-3 font-semibold text-lg border-x-2 border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  <span className="text-gray-600">
                    Subtotal: ₱{(product.price * quantity).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-green-800 hover:bg-green-600 text-white py-6 rounded-xl text-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="mr-2 h-6 w-6" />
                  Add to Cart
                </Button>
                <Button
                  onClick={() => setIsFavorite(!isFavorite)}
                  variant="outline"
                  className="border-2 border-green-800 hover:bg-green-50 p-6 rounded-xl"
                >
                  <Heart
                    className={`h-6 w-6 ${
                      isFavorite ? "fill-green-800 text-green-800" : "text-green-800"
                    }`}
                  />
                </Button>
              </div>
            </div>

            {/* Seller */}
            {product.seller && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Store className="h-5 w-5 text-gray-600" />
                      <h3 className="font-bold text-lg text-gray-900">
                        {product.seller.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.seller.rating}</span>
                      </div>
                      <span>{product.seller.products} Products</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{product.seller.location}</span>
                    </div>
                  </div>
                  <Link href={`/sellers/${product.seller.id || ""}`}>
                    <Button variant="outline" size="sm">Visit Store</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
