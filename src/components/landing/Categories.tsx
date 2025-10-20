"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import { ArrowRight } from "lucide-react"

interface Category {
  id: number
  name: string
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product-categories`)
        setCategories(res.data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent mb-4">
            Shop by Category
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Browse our curated selection of pet products, all verified and approved
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-muted-foreground">Loading categories...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.id}`}
                className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-primary/10 via-accent/20 to-primary/5 p-8 h-full flex flex-col justify-between min-h-[280px] border border-border">
                  <div>
                    <div className="text-5xl mb-4">🐾</div>
                    <h3 className="text-2xl font-bold text-primary mb-2">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">Discover the best in {category.name}</p>
                  </div>

                  <div className="flex items-center gap-2 mt-6 text-foreground font-medium group-hover:gap-4 transition-all duration-300">
                    <span>Explore</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Can't find what you're looking for?</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 hover:gap-3 transition-all"
          >
            Browse All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
