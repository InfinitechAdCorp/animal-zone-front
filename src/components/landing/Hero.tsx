import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Store } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 min-h-[90vh] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8">
            <div className="inline-block">
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                🐾 Your Pet's Happiness, Our Priority
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
              Welcome to{" "}
              <span className="text-orange-500">Animal Zone</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Your trusted online marketplace for premium pet food, essentials, and supplies. 
              Quality products, verified sellers, delivered to your doorstep.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/shop">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 rounded-xl text-base sm:text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                </Button>
              </Link>
              
              <Link href="/seller/register">
                <Button variant="outline" className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-6 rounded-xl text-base sm:text-lg font-medium w-full sm:w-auto">
                  <Store className="mr-2 h-5 w-5" />
                  Become a Seller
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">500+</p>
                  <p className="text-sm text-gray-500">Happy Customers</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">100%</p>
                  <p className="text-sm text-gray-500">Verified Sellers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[500px] bg-gradient-to-br from-orange-200 to-orange-100 rounded-3xl overflow-hidden shadow-2xl">
              {/* Placeholder for hero image - replace with actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🐕🐈</div>
                  <p className="text-2xl font-bold text-orange-600">Premium Pet Care</p>
                  <p className="text-gray-600 mt-2">Quality products for your furry friends</p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-lg animate-bounce">
                <p className="text-sm font-semibold text-gray-800">🎉 FDA Approved</p>
              </div>
              
              <div className="absolute bottom-10 left-10 bg-white p-4 rounded-2xl shadow-lg animate-pulse">
                <p className="text-sm font-semibold text-gray-800">✨ Fast Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-16 sm:h-20 fill-white">
          <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}