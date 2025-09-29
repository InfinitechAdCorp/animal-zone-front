import { Search, ShoppingCart, Package, Heart } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Products",
    description: "Explore our wide selection of verified pet food, shampoos, and essentials",
    step: "01"
  },
  {
    icon: ShoppingCart,
    title: "Add to Cart",
    description: "Select your favorite products and add them to your shopping cart",
    step: "02"
  },
  {
    icon: Package,
    title: "Fast Delivery",
    description: "Get your orders delivered quickly and safely to your doorstep",
    step: "03"
  },
  {
    icon: Heart,
    title: "Happy Pets",
    description: "Watch your furry friends enjoy premium quality products",
    step: "04"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Shopping for your pets has never been easier. Follow these simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 -z-10" 
               style={{ width: 'calc(100% - 200px)', left: '100px' }} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Step Card */}
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 hover:border-orange-300 hover:shadow-xl transition-all duration-300 group">
                    {/* Step Number */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.step}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Mobile Arrow */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-block bg-orange-50 rounded-2xl px-8 py-6 border-2 border-orange-200">
            <p className="text-lg text-gray-700 mb-2">
              Ready to get started? 🎉
            </p>
            <p className="text-2xl font-bold text-orange-600">
              Join thousands of happy pet owners today!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}