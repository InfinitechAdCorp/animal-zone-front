import { Search, ShoppingCart, Package, Heart } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Browse Products",
    description: "Explore our wide selection of verified pet food, shampoos, and essentials",
    step: "01",
  },
  {
    icon: ShoppingCart,
    title: "Add to Cart",
    description: "Select your favorite products and add them to your shopping cart",
    step: "02",
  },
  {
    icon: Package,
    title: "Fast Delivery",
    description: "Get your orders delivered quickly and safely to your doorstep",
    step: "03",
  },
  {
    icon: Heart,
    title: "Happy Pets",
    description: "Watch your furry friends enjoy premium quality products",
    step: "04",
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Gradient Bokeh Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

        {/* Subtle Animal Paw Prints */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 text-6xl transform -rotate-12">🐾</div>
          <div className="absolute top-40 right-20 text-5xl transform rotate-45">🐾</div>
          <div className="absolute bottom-32 left-1/4 text-7xl transform rotate-12">🐾</div>
          <div className="absolute bottom-20 right-1/3 text-6xl transform -rotate-45">🐾</div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent mb-4">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Shopping for your pets has never been easier. Follow these simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative z-10">
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 -z-10"
            style={{ width: "calc(100% - 200px)", left: "100px" }} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  <div className="bg-card border-2 border-border rounded-2xl p-6 sm:p-8 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group">
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.step}
                    </div>
                    <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 border border-border">
                      <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16 relative z-10">
          <div className="inline-block bg-gradient-to-br from-accent/50 to-primary/10 rounded-2xl px-8 py-6 border-2 border-primary/20">
            <p className="text-lg text-foreground mb-2">Ready to get started?</p>
            <p className="text-2xl font-bold text-primary">Join thousands of happy pet owners today!</p>
          </div>
        </div>
      </div>
    </section>
  )
}
