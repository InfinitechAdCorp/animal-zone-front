"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Eye, EyeOff, PawPrint } from "lucide-react"
import { toast } from "sonner"

export default function BuyerRegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/buyer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        toast.success("Buyer registered successfully!")
      } else {
        toast.error("Registration failed")
      }
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong")
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
            <h1 className="text-3xl font-bold text-balance text-foreground">Create your account</h1>
            <p className="text-muted-foreground text-pretty">Join our community of pet lovers today</p>
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
            <h2 className="text-3xl font-bold text-balance text-foreground">Join our growing community</h2>
            <p className="text-lg text-pretty text-muted-foreground">
              Get access to exclusive deals, expert pet care tips, and connect with fellow pet parents.
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
