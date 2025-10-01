import { CheckCircle2 } from "lucide-react"

const benefits = [
  "FDA-approved products with verified certifications",
  "All sellers undergo strict verification process",
  "Government ID and business permit validation",
  "Product labels and expiration dates clearly displayed",
  "Secure payment and buyer protection",
  "Fast and reliable delivery service",
  "24/7 customer support for any concerns",
  "Easy returns and refund policy",
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-accent/30 via-background to-accent/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block mb-4">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                Trusted by Pet Owners
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent mb-6 text-balance">
              Why Choose Animal Zone?
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
              We're not just another online pet shop. Animal Zone is built on trust, quality, and a genuine love for
              pets. Every seller is verified, every product is approved, and every transaction is secure.
            </p>

            {/* Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-0.5 group-hover:bg-primary transition-colors border border-primary/20">
                    <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <p className="text-foreground font-medium leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-10 border-t border-border">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">500+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">50+</p>
                <p className="text-sm text-muted-foreground">Verified Sellers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">1000+</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/20 via-accent/30 to-primary/30 rounded-3xl p-8 sm:p-12 shadow-2xl border border-primary/20">
              {/* Main Content */}
              <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg mb-6 border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Seller Verification</p>
                    <p className="text-sm text-muted-foreground">100% Verified</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Government ID Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Business Permit Approved</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>FDA Certificate Valid</span>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Product Quality</p>
                    <p className="text-sm text-muted-foreground">FDA Approved</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Clear Product Labels</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Expiration Dates Listed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Quality Guaranteed</span>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/30 rounded-full opacity-50 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/40 rounded-full opacity-30 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}