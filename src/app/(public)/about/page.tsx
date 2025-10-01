import { Heart, Shield, Users, Award, Leaf, Sparkles } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/10 via-accent/10 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Welcome to <span className="text-primary">AnimalZone</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">
              Your trusted partner in pet care and animal wellness. We're dedicated to providing the best products,
              services, and advice for your beloved companions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border border-border rounded-2xl p-8 sm:p-10 shadow-lg">
                <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  At AnimalZone, we believe every pet deserves the best care possible. Our mission is to make premium
                  pet products and expert advice accessible to all animal lovers, ensuring happy, healthy lives for pets
                  everywhere.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-accent/10 to-primary/5 border border-border rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Quality Guaranteed</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Every product is carefully selected and tested to meet our high standards for safety and
                        quality.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-accent/10 to-primary/5 border border-border rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Expert Support</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Our team of pet care specialists is always ready to help you make the best choices for your
                        pets.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-accent/10 to-primary/5 border border-border rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                      <Leaf className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Eco-Friendly</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We're committed to sustainability, offering eco-friendly products that are good for pets and the
                        planet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-accent/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our <span className="text-primary">Core Values</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              These principles guide everything we do at AnimalZone
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-background via-accent/5 to-primary/5 border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Heart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Compassion</h3>
              <p className="text-muted-foreground leading-relaxed">
                We treat every animal with love and respect, understanding their unique needs and personalities.
              </p>
            </div>

            <div className="bg-gradient-to-br from-background via-accent/5 to-primary/5 border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Award className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                We strive for the highest standards in everything we offer, from products to customer service.
              </p>
            </div>

            <div className="bg-gradient-to-br from-background via-accent/5 to-primary/5 border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Community</h3>
              <p className="text-muted-foreground leading-relaxed">
                We build strong relationships with pet owners, creating a supportive community of animal lovers.
              </p>
            </div>

            <div className="bg-gradient-to-br from-background via-accent/5 to-primary/5 border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Trust</h3>
              <p className="text-muted-foreground leading-relaxed">
                We earn your trust through transparency, reliability, and consistent delivery of our promises.
              </p>
            </div>

            <div className="bg-gradient-to-br from-background via-accent/5 to-primary/5 border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Innovation</h3>
              <p className="text-muted-foreground leading-relaxed">
                We continuously seek new ways to improve pet care and enhance the lives of animals and their owners.
              </p>
            </div>

            <div className="bg-gradient-to-br from-background via-accent/5 to-primary/5 border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Leaf className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Sustainability</h3>
              <p className="text-muted-foreground leading-relaxed">
                We're committed to protecting the environment for future generations of pets and people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border border-border rounded-2xl p-8 sm:p-12 shadow-lg">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
                Our <span className="text-primary">Story</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  AnimalZone was founded with a simple belief: every pet deserves the best. What started as a small
                  local pet store has grown into a trusted destination for pet owners across the region.
                </p>
                <p>
                  Over the years, we've built relationships with the best suppliers, veterinarians, and animal care
                  experts to ensure we offer only the finest products and most reliable advice. Our team is made up of
                  passionate pet lovers who understand the joy and responsibility of caring for animals.
                </p>
                <p>
                  Today, we continue to expand our offerings while staying true to our core mission: providing
                  exceptional care and products that help pets live their happiest, healthiest lives. Thank you for
                  being part of the AnimalZone family!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
