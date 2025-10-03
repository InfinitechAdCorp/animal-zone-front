import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Store } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary to-primary/80 min-h-[90vh] flex items-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8 relative z-20">
            <div className="inline-block transform translate-y-4">
              <span className="bg-white text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                Your Pet's Happiness, Our Priority
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight text-balance drop-shadow-lg">
              <span className="inline-block transform -rotate-3">Welcome to</span>
              <br />
              <span className="inline-block transform rotate-2">Animal Zone</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/95 max-w-2xl mx-auto lg:mx-0 text-pretty drop-shadow-md">
              Your trusted online marketplace for premium pet food, essentials, and supplies. Quality products, verified
              sellers, delivered to your doorstep.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/shop">
                <Button className="bg-amber-400 hover:bg-amber-500 text-gray-900 px-8 py-6 rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                </Button>
              </Link>

              <Link href="/seller/register">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-6 rounded-xl text-base sm:text-lg font-semibold w-full sm:w-auto bg-transparent transition-all duration-300"
                >
                  <Store className="mr-2 h-5 w-5" />
                  Become a Seller
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-white">500+</p>
                  <p className="text-sm text-white/90 drop-shadow-md">Happy Customers</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-white">100%</p>
                  <p className="text-sm text-white/90 drop-shadow-md">Verified Sellers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block h-[600px]">
            <div
              className="absolute top-10 right-60 text-white/40 animate-bounce z-15 hidden xl:block"
              style={{ animationDelay: "0s", animationDuration: "3s" }}
            >
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>
            {/* Circle 1 - Top Right with Dog Food */}
            <div className="absolute right-12 w-42 h-42 bg-white/30 rounded-full opacity-90 flex items-center justify-center xl:right-12 lg:right-4 lg:w-36 lg:h-36">
              <img
                src="/premium-dog-food-bag.png"
                alt="Premium Dog Food"
                className="w-30 h-30 object-contain lg:w-24 lg:h-24"
              />
            </div>

            <div className="absolute left-80 top-25 w-30 h-30 bg-white/30 rounded-full opacity-90 flex items-center justify-center xl:left-80 lg:left-60 lg:w-24 lg:h-24 lg:top-20">
              <img
                src="/premium-dog-food-bag-chicken-rice.png"
                alt="Premium Dog Food"
                className="w-28 h-28 object-contain lg:w-20 lg:h-20"
              />
            </div>

            <div className="absolute bottom-75 left-110 w-30 h-30 bg-white/30 rounded-full opacity-90 flex items-center justify-center xl:bottom-75 xl:left-110 lg:bottom-60 lg:left-80 lg:w-24 lg:h-24">
              <img
                src="/9171be51-c91d-4ffc-b882-7e60582fa12b.png"
                alt="Premium Dog Food"
                className="w-28 h-28 object-contain lg:w-20 lg:h-20"
              />
            </div>

            {/* Dog image with removed background */}
            <div className="absolute bottom-0 right-100 w-[700px] h-[700px] z-20 xl:w-[700px] xl:h-[700px] xl:right-100 lg:w-[500px] lg:h-[500px] lg:right-60">
              <img
                src="/tarsier-lizard.svg"
                alt="Happy dog"
                className="w-full h-full object-contain object-bottom drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))" }}
              />
            </div>

            <div className="absolute right-0 w-[700px] h-[700px] z-20 xl:w-[700px] xl:h-[700px] lg:w-[500px] lg:h-[500px] lg:-right-20">
              <img
                src="/snake.svg"
                alt="Happy dog"
                className="w-full h-full object-contain object-bottom drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))" }}
              />
            </div>

            {/* Paw prints on teal background */}
            <div
              className="absolute top-20 right-24 text-white/40 animate-bounce z-15 xl:top-20 xl:right-24 lg:top-16 lg:right-12"
              style={{ animationDelay: "0s", animationDuration: "3s" }}
            >
              <svg className="w-12 h-12 lg:w-10 lg:h-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>

            <div
              className="absolute top-48 right-4 text-white/35 animate-bounce z-25 xl:top-48 lg:top-36 lg:right-2"
              style={{ animationDelay: "0.5s", animationDuration: "2.5s" }}
            >
              <svg className="w-10 h-10 lg:w-8 lg:h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>

            <div
              className="absolute top-80 right-80 text-white/40 animate-bounce z-15 hidden xl:block"
              style={{ animationDelay: "0s", animationDuration: "3s" }}
            >
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>

            <div className="absolute bottom-60 right-90 w-[200px] h-[200px] z-20 xl:w-[200px] xl:h-[200px] xl:bottom-60 xl:right-90 lg:w-[150px] lg:h-[150px] lg:bottom-48 lg:right-60">
              <img
                src="/turtle.svg"
                alt="Happy dog"
                className="w-full h-full object-contain object-bottom drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))" }}
              />
            </div>

            {/* Floating badge elements */}
            <div
              className="absolute top-50 right-1 bg-white p-4 rounded-2xl shadow-xl animate-bounce z-30 xl:top-50 lg:top-40 lg:p-3"
              style={{ animationDuration: "3s" }}
            >
              <p className="text-sm font-bold text-emerald-600 lg:text-xs">FDA Approved</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute top-0 left-0 w-[70%] h-full bg-gradient-to-br from-amber-400 to-orange-500 origin-top-left z-0 lg:w-[70%] md:w-[60%]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 45% 100%, 0 100%)",
        }}
      >
        {/* Paw prints on yellow diagonal section */}
        <div
          className="absolute top-[40%] left-[30%] text-white/40 animate-bounce"
          style={{ animationDelay: "0.3s", animationDuration: "2.8s" }}
        >
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>

        <div
          className="absolute top-[60%] left-[20%] text-white/45 animate-bounce"
          style={{ animationDelay: "0.7s", animationDuration: "3.2s" }}
        >
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>

        <div
          className="absolute top-[50%] left-[40%] text-white/38 animate-bounce"
          style={{ animationDelay: "0.2s", animationDuration: "2.5s" }}
        >
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>
      </div>
      {/* Owl - Bottom Left - HIDDEN ON MOBILE/TABLET */}
      <div className="hidden lg:block absolute bottom-10 left-[30%] transform -translate-x-1/4 w-[250px] h-[250px] z-20 xl:w-[250px] xl:h-[250px] xl:bottom-10 xl:left-[30%] lg:w-[180px] lg:h-[180px] lg:bottom-5 lg:left-[28%]">
        <img
          src="/owl.svg"
          alt="Owl"
          className="w-full h-full object-contain drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))" }}
        />
      </div>

      {/* Parrot - Bottom Right - HIDDEN ON MOBILE/TABLET */}
      <div className="hidden lg:block absolute bottom-[520px] right-[220px] w-[500px] h-[500px] z-20 xl:w-[500px] xl:h-[500px] xl:bottom-[520px] xl:right-[220px] lg:w-[350px] lg:h-[350px] lg:bottom-[360px] lg:right-[120px]">
        <img
          src="/parrot.svg"
          alt="Parrot"
          className="w-full h-full object-contain drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))" }}
        />
      </div>

      {/* Monkey - Bottom Left Center - HIDDEN ON MOBILE/TABLET */}
      <div className="hidden lg:block absolute bottom-[720px] right-[70%] w-[400px] h-[300px] z-30 xl:w-[400px] xl:h-[300px] xl:bottom-[720px] lg:w-[280px] lg:h-[210px] lg:bottom-[480px]">
        <img
          src="/monkey.svg"
          alt="Monkey"
          className="w-full h-full object-contain drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))" }}
        />
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-5 hidden lg:block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-16 sm:h-20 fill-green-50">
          <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  )
}
