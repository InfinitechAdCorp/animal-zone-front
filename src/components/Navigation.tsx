"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Search, Menu, X, LogOut } from "lucide-react"
import { useState, useEffect } from "react"

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("authToken")
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Escape key close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false)
    }

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  // Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact Us" },
  ]

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  return (
    <nav
      className={`sticky top-0 z-50 bg-gradient-to-r from-background via-background to-accent/10 border-b border-border backdrop-blur-sm transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
            <div className="text-xl sm:text-2xl">🐾</div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
              Animal<span className="text-primary">Zone</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm xl:text-base text-muted-foreground hover:text-primary transition-colors ${
                  pathname === link.href ? "text-primary font-semibold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-accent">
                <ShoppingCart className="h-5 w-5 xl:h-6 xl:w-6 text-muted-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 xl:h-5 xl:w-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* If logged in */}
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">Hi, {user.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-red-500 hover:bg-accent text-sm"
                >
                  <LogOut className="h-4 w-4 lg:mr-2" />
                  <span className="hidden lg:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-primary hover:bg-accent text-sm"
                  >
                    <User className="h-4 w-4 xl:h-5 xl:w-5 lg:mr-2" />
                    <span className="hidden lg:inline">Login</span>
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Buttons */}
          <div className="flex md:hidden items-center space-x-2">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-accent h-9 w-9">
                <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <button
              className="p-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-muted-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-muted-foreground hover:text-primary hover:bg-accent py-2.5 px-3 rounded-md transition-colors ${
                    pathname === link.href ? "text-primary font-semibold bg-accent/50" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Auth Buttons */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                {user ? (
                  <>
                    <span className="text-sm text-muted-foreground px-3">Hi, {user.name}</span>
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-center bg-transparent">
                        <User className="h-5 w-5 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
