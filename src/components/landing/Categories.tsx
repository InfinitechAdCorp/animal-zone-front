import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Pet Food",
    description: "Nutritious meals for dogs, cats, and more",
    emoji: "🍖",
    bgColor: "bg-gradient-to-br from-orange-100 to-orange-50",
    textColor: "text-orange-600",
    phase: "Phase 1"
  },
  {
    name: "Pet Shampoo",
    description: "Premium grooming products for healthy coats",
    emoji: "🧴",
    bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
    textColor: "text-blue-600",
    phase: "Phase 2"
  },
  {
    name: "Pet Essentials",
    description: "Everything your pet needs daily",
    emoji: "🎾",
    bgColor: "bg-gradient-to-br from-green-100 to-green-50",
    textColor: "text-green-600",
    phase: "Phase 2"
  },
  {
    name: "Pet Accessories",
    description: "Toys, collars, and fun accessories",
    emoji: "🦴",
    bgColor: "bg-gradient-to-br from-purple-100 to-purple-50",
    textColor: "text-purple-600",
    phase: "Coming Soon"
  }
];

export default function Categories() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Browse our curated selection of pet products, all verified and approved
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href="/shop"
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className={`${category.bgColor} p-8 h-full flex flex-col justify-between min-h-[280px]`}>
                {/* Phase Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                    {category.phase}
                  </span>
                </div>

                <div>
                  {/* Emoji Icon */}
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.emoji}
                  </div>

                  {/* Category Info */}
                  <h3 className={`text-2xl font-bold mb-2 ${category.textColor}`}>
                    {category.name}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="flex items-center gap-2 mt-6 text-gray-700 font-medium group-hover:gap-4 transition-all duration-300">
                  <span>Explore</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 hover:gap-3 transition-all"
          >
            Browse All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}