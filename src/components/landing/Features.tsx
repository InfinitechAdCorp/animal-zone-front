import { Shield, Truck, Award, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Sellers",
    description: "All sellers are thoroughly vetted with government ID, business permits, and FDA certificates",
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "FDA-approved products with clear labels and expiration dates for your pet's safety",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Reliable shipping across Metro Manila and nationwide delivery options",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our customer support team is always ready to help you and your pets",
    color: "bg-purple-100 text-purple-600"
  }
];

export default function Features() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Pet Owners Trust Us
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            We're committed to providing the best shopping experience for you and your beloved pets
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}