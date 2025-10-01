import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-2xl">🐾</span>
              </div>
              <h3 className="text-2xl font-bold text-background">Animal Zone</h3>
            </div>
            <p className="text-background/70 leading-relaxed">
              Your trusted marketplace for premium pet food, essentials, and supplies. Quality products from verified
              sellers.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-background/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-background/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-background/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-background mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="hover:text-primary transition-colors text-background/80">
                  Shop Products
                </Link>
              </li>
              <li>
                <Link href="/seller/register" className="hover:text-primary transition-colors text-background/80">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors text-background/80">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors text-background/80">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold text-background mb-4">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shop?category=food" className="hover:text-primary transition-colors text-background/80">
                  Pet Food
                </Link>
              </li>
              <li>
                <Link href="/shop?category=shampoo" className="hover:text-primary transition-colors text-background/80">
                  Pet Shampoo
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=essentials"
                  className="hover:text-primary transition-colors text-background/80"
                >
                  Pet Essentials
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=accessories"
                  className="hover:text-primary transition-colors text-background/80"
                >
                  Pet Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-background mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-background/80">Quezon City, Metro Manila, Philippines</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+639123456789" className="hover:text-primary transition-colors text-sm text-background/80">
                  +63 912 345 6789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:support@animalzone.ph"
                  className="hover:text-primary transition-colors text-sm text-background/80"
                >
                  support@animalzone.ph
                </a>
              </li>
            </ul>

            {/* Business Hours */}
            <div className="mt-6 bg-background/10 rounded-lg p-4">
              <p className="text-sm font-semibold text-background mb-2">Business Hours</p>
              <p className="text-xs text-background/70">Mon - Sat: 9:00 AM - 6:00 PM</p>
              <p className="text-xs text-background/70">Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/70 text-center sm:text-left">
              © {new Date().getFullYear()} Animal Zone. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/privacy" className="hover:text-primary transition-colors text-background/80">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors text-background/80">
                Terms of Service
              </Link>
              <Link href="/refund" className="hover:text-primary transition-colors text-background/80">
                Refund Policy
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="bg-background/10 px-4 py-2 rounded-lg text-xs font-semibold">🛡️ 100% Verified Sellers</div>
            <div className="bg-background/10 px-4 py-2 rounded-lg text-xs font-semibold">✅ FDA Approved</div>
            <div className="bg-background/10 px-4 py-2 rounded-lg text-xs font-semibold">🚚 Fast Delivery</div>
            <div className="bg-background/10 px-4 py-2 rounded-lg text-xs font-semibold">💳 Secure Payment</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
