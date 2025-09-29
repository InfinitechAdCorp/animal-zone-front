import { CheckCircle2 } from "lucide-react";

const benefits = [
  "FDA-approved products with verified certifications",
  "All sellers undergo strict verification process",
  "Government ID and business permit validation",
  "Product labels and expiration dates clearly displayed",
  "Secure payment and buyer protection",
  "Fast and reliable delivery service",
  "24/7 customer support for any concerns",
  "Easy returns and refund policy"
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block mb-4">
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                🏆 Trusted by Pet Owners
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Animal Zone?
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We're not just another online pet shop. Animal Zone is built on trust, quality, 
              and a genuine love for pets. Every seller is verified, every product is approved, 
              and every transaction is secure.
            </p>

            {/* Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5 group-hover:bg-orange-500 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-10 border-t border-gray-200">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-orange-500 mb-1">500+</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-orange-500 mb-1">50+</p>
                <p className="text-sm text-gray-600">Verified Sellers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-orange-500 mb-1">1000+</p>
                <p className="text-sm text-gray-600">Products</p>
              </div>
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-orange-200 to-orange-100 rounded-3xl p-8 sm:p-12 shadow-2xl">
              {/* Main Content */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Seller Verification</p>
                    <p className="text-sm text-gray-600">100% Verified</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Government ID Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Business Permit Approved</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>FDA Certificate Valid</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Product Quality</p>
                    <p className="text-sm text-gray-600">FDA Approved</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Clear Product Labels</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Expiration Dates Listed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Quality Guaranteed</span>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-300 rounded-full opacity-50 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-400 rounded-full opacity-30 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}