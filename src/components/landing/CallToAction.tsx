import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Store } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-500 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div className="mb-8">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              🚀 Join Our Growing Community
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Start Your Pet Care Journey?
            </h2>
            
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Whether you're looking to shop for premium pet products or become a trusted seller, 
              Animal Zone is the perfect platform for you.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/shop">
              <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-6 rounded-xl text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto min-w-[200px]">
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/seller/register">
              <Button 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-6 rounded-xl text-base sm:text-lg font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300 hover:scale-105 w-full sm:w-auto min-w-[200px]"
              >
                <Store className="mr-2 h-5 w-5" />
                Become a Seller
              </Button>
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-white font-semibold">100% Verified</p>
              <p className="text-white/80 text-sm mt-1">All sellers verified</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-2">🚚</div>
              <p className="text-white font-semibold">Fast Delivery</p>
              <p className="text-white/80 text-sm mt-1">Nationwide shipping</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-2">💯</div>
              <p className="text-white font-semibold">Quality Assured</p>
              <p className="text-white/80 text-sm mt-1">FDA approved products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-16 sm:h-20 fill-gray-900">
          <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}