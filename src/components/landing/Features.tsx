import { Shield, Truck, Award, Headphones } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Verified Sellers",
    description: "All sellers are thoroughly vetted with government ID, business permits, and FDA certificates",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "FDA-approved products with clear labels and expiration dates for your pet's safety",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Reliable shipping across Metro Manila and nationwide delivery options",
    color: "bg-accent text-primary",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our customer support team is always ready to help you and your pets",
    color: "bg-purple-100 text-purple-600",
  },
]

export default function Features() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-green-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent mb-4 text-balance">
            Why Pet Owners Trust Us
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-pretty">
            We're committed to providing the best shopping experience for you and your beloved pets
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group bg-card border border-border rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">{feature.title}</h3>

                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}