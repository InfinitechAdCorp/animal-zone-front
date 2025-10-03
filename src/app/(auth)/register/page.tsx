"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Eye, EyeOff, PawPrint } from "lucide-react"
import { toast } from "sonner"
import { registerUser } from "@/app/api/auth"
import { useRouter } from "next/navigation" // ✅ add this

export default function BuyerRegisterPage() {
  const router = useRouter() // ✅ router instance
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact_number: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    // convert +63xxxxxxxxxx → 09xxxxxxxxx
    const formattedNumber = form.contact_number.startsWith("9")
      ? "0" + form.contact_number
      : form.contact_number

    try {
      await registerUser(
        form.name,
        form.email,
        form.password,
        formattedNumber
      )

      toast.success("Please verify your account in your email.") // ✅ updated message

      // redirect to login after 1.5s
      setTimeout(() => {
        router.push("/login")
      }, 1500)
    } catch (err: any) {
      toast.error(err.message || "Something went wrong")
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Header */}
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="bg-green rounded-full p-3">
                <PawPrint className="h-8 w-8 text-primary-foreground" />
              </div>
              <span className="text-3xl font-bold text-foreground">Animal Zone</span>
            </Link>
            <h1 className="text-3xl font-bold text-balance text-foreground">
              Create your account
            </h1>
            <p className="text-muted-foreground text-pretty">
              Join our community of pet lovers today
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
              </div>

              {/* Contact Number Field */}
              <div className="space-y-2">
                <Label htmlFor="contact_number" className="text-foreground">
                  Contact Number
                </Label>
                <div className="flex items-center">
                  <span className="px-3 bg-muted text-foreground rounded-l-md border border-r-0 border-input">
                    +63
                  </span>
                  <Input
                    id="contact_number"
                    name="contact_number"
                    type="text"
                    placeholder="9XXXXXXXXX"
                    value={form.contact_number}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "") // ✅ digits only

                      if (value.length === 1 && value !== "9") {
                        value = ""
                      }

                      if (value.length > 10) {
                        value = value.slice(0, 10)
                      }

                      setForm({ ...form, contact_number: value })
                    }}
                    onKeyDown={(e) => {
                      if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                        e.preventDefault()
                      }
                    }}
                    inputMode="numeric"
                    required
                    className="h-12 rounded-l-none"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be 10 digits, starting with 9 (e.g. 9123456789)
                </p>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <p className="text-xs text-muted-foreground text-pretty">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline font-medium">
                Privacy Policy
              </Link>
            </p>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 text-base" size="lg">
              Create account
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image/Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-green/20 via-accent/20 to-secondary/20 items-center justify-center p-12">
        <div className="max-w-lg space-y-6 text-center">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <img
              src="/happy-pets-animals-dogs-cats-illustration-friendly.jpg"
              alt="Happy pets illustration"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-balance text-foreground">
              Join our growing community
            </h2>
            <p className="text-lg text-pretty text-muted-foreground">
              Get access to exclusive deals, expert pet care tips, and connect with fellow pet
              parents.
            </p>
          </div>
          <div className="flex items-center justify-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Happy Pets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4.9★</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
