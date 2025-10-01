"use client";

import { useState } from "react";
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

// Sample product data - replace with API call
const productData = {
  id: "1",
  name: "Premium Dog Food - Chicken & Rice Formula",
  price: 1299,
  originalPrice: 1599,
  images: [
    "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800",
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800",
    "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=800",
  ],
  rating: 4.5,
  reviewCount: 128,
  category: "Dog Food",
  inStock: true,
  stock: 45,
  seller: {
    name: "PetMart Store",
    rating: 4.8,
    products: 234,
    location: "Quezon City, Metro Manila",
  },
  description:
    "Give your furry friend the nutrition they deserve with our Premium Dog Food. Made with real chicken as the first ingredient and wholesome brown rice, this formula is specially crafted to support your dog's overall health and vitality. Rich in protein, vitamins, and minerals, it promotes healthy skin, a shiny coat, and strong muscles.",
  features: [
    "Real chicken as the first ingredient",
    "No artificial colors, flavors, or preservatives",
    "Rich in protein for strong muscles",
    "Omega fatty acids for healthy skin and coat",
    "Fortified with vitamins and minerals",
    "Suitable for adult dogs of all breeds",
  ],
  specifications: {
    Weight: "5kg",
    "Protein Content": "26%",
    "Fat Content": "15%",
    "Crude Fiber": "4%",
    "Age Range": "Adult (1-7 years)",
    "Made In": "Philippines",
  },
};

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const discountPercentage = Math.round(
    ((productData.originalPrice - productData.price) / productData.originalPrice) *
      100
  );

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= productData.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} items to cart`);
    // Add to cart logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary-800">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary-800">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${productData.category}`}
            className="hover:text-primary-800"
          >
            {productData.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{productData.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
              <div className="aspect-square relative">
                <img
                  src={productData.images[selectedImage]}
                  alt={productData.name}
                  className="w-full h-full object-cover"
                />
                {discountPercentage > 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                    -{discountPercentage}%
                  </span>
                )}
                {!productData.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-gray-800 text-white px-6 py-3 rounded-lg text-lg font-bold">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {productData.images.map((image, index) => (
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
                      src={image}
                      alt={`${productData.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            <div className="inline-block bg-green-800 text-white px-3 py-1 rounded-full text-sm font-medium">
              {productData.category}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {productData.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(productData.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-900 font-semibold">
                  {productData.rating}
                </span>
              </div>
              <span className="text-gray-500">
                ({productData.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  ₱{productData.price.toLocaleString()}
                </span>
                {productData.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ₱{productData.originalPrice.toLocaleString()}
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

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {productData.inStock ? (
                <>
                  <div className="w-3 h-3 bg-green-800 rounded-full"></div>
                  <span className="text-primary-600 font-medium">
                    In Stock ({productData.stock} available)
                  </span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity Selector & Add to Cart */}
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
                      disabled={quantity >= productData.stock}
                      className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  <span className="text-gray-600">
                    Subtotal: ₱{(productData.price * quantity).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!productData.inStock}
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
                      isFavorite
                        ? "fill-green-800 text-primary-800"
                        : "text-primary-800"
                    }`}
                  />
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full border-2 border-gray-300 py-6 rounded-xl text-lg font-semibold"
              >
                Buy Now
              </Button>
            </div>

            {/* Features/Benefits */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
              <div className="text-center">
                <Truck className="h-8 w-8 text-primary-800 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                <p className="text-xs text-gray-500">Orders over ₱500</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-primary-800 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                <p className="text-xs text-gray-500">100% Protected</p>
              </div>
              <div className="text-center">
                <Package className="h-8 w-8 text-primary-800 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-500">7-day return</p>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Store className="h-5 w-5 text-gray-600" />
                    <h3 className="font-bold text-lg text-gray-900">
                      {productData.seller.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{productData.seller.rating}</span>
                    </div>
                    <span>{productData.seller.products} Products</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{productData.seller.location}</span>
                  </div>
                </div>
                <Link href={`/sellers/${productData.id}`}>
                  <Button variant="outline" size="sm">
                    Visit Store
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Description */}
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Product Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {productData.description}
              </p>
            </div>

            {/* Features */}
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Key Features
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {productData.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-800 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Specifications
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(productData.specifications).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-3 border-b border-gray-100"
                    >
                      <span className="font-medium text-gray-900">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You May Also Like
          </h2>
          <p className="text-gray-600 text-center py-8">
            Related products section - use ProductCard component here
          </p>
        </div>
      </div>
    </div>
  );
}