"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); // This will come from your cart state management

  // Check if we're on a buyer route
  const isBuyerRoute = pathname?.startsWith("/(buyer)");
  const isLandingPage = pathname === "/";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl">🐾</div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              Animal<span className="text-orange-500">Zone</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-gray-600 hover:text-orange-500 transition-colors ${
                pathname === "/" ? "text-orange-500 font-semibold" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={`text-gray-600 hover:text-orange-500 transition-colors ${
                pathname === "/shop" ? "text-orange-500 font-semibold" : ""
              }`}
            >
              Shop
            </Link>
            <Link
              href="/#categories"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/#about"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            {/* Cart Button */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-orange-50"
              >
                <ShoppingCart className="h-6 w-6 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User/Auth Buttons */}
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-orange-500 hover:bg-orange-50"
              >
                <User className="h-5 w-5 mr-2" />
                Login
              </Button>
            </Link>

            <Link href="/register">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>

              <Link
                href="/"
                className="text-gray-600 hover:text-orange-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-gray-600 hover:text-orange-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/#categories"
                className="text-gray-600 hover:text-orange-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/#about"
                className="text-gray-600 hover:text-orange-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart {cartCount > 0 && `(${cartCount})`}
                  </Button>
                </Link>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}