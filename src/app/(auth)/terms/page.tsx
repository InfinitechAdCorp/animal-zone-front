"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PawPrint } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="bg-green rounded-full p-2">
              <PawPrint className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Animal Zone</span>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="sm">
              Back to Register
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: October 2025</p>
          </div>

          <div className="prose prose-sm max-w-none space-y-6 text-foreground">
            {/* Introduction */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Animal Zone ("we," "us," "our," or "Company"). These Terms of Service ("Terms") govern your
                access to and use of our website, mobile application, and all related services (collectively, the
                "Service"). By accessing or using Animal Zone, you agree to be bound by these Terms. If you do not agree
                to any part of these Terms, you may not use our Service.
              </p>
            </section>

            {/* User Accounts */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">2. User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you create an account with Animal Zone, you agree to provide accurate, current, and complete
                information. You are responsible for maintaining the confidentiality of your password and account
                information. You agree to accept responsibility for all activities that occur under your account. You
                must notify us immediately of any unauthorized use of your account or any other breach of security.
              </p>
            </section>

            {/* Product Information */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">3. Product Information and Availability</h2>
              <p className="text-muted-foreground leading-relaxed">
                We strive to provide accurate descriptions and pricing for all products on our platform. However, we do
                not warrant that product descriptions, pricing, or other content is accurate, complete, or error-free.
                We reserve the right to correct any errors and to refuse or cancel any order. Product availability is
                subject to change without notice.
              </p>
            </section>

            {/* Ordering and Payment */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">4. Ordering and Payment</h2>
              <p className="text-muted-foreground leading-relaxed">
                By placing an order, you represent that you are at least 18 years old and have the legal authority to
                enter into a binding contract. All orders are subject to acceptance and confirmation by Animal Zone. We
                reserve the right to refuse or cancel any order at our sole discretion. Payment must be received before
                order processing. We accept various payment methods as displayed on our platform.
              </p>
            </section>

            {/* Shipping and Delivery */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">5. Shipping and Delivery</h2>
              <p className="text-muted-foreground leading-relaxed">
                We will make reasonable efforts to deliver your order within the estimated timeframe. However, we are
                not responsible for delays caused by shipping carriers, weather conditions, or other circumstances
                beyond our control. Risk of loss passes to you upon delivery to the carrier. You are responsible for
                inspecting your order upon receipt and reporting any damage or discrepancies within 48 hours.
              </p>
            </section>

            {/* Returns and Refunds */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">6. Returns and Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                Items may be returned within 30 days of purchase in original condition with all packaging and
                documentation. Refunds will be processed within 7-10 business days after we receive and inspect the
                returned item. Shipping costs are non-refundable unless the return is due to our error or a defective
                product. Certain items, including live animals and perishable goods, may not be returnable.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">7. Intellectual Property Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on the Animal Zone platform, including text, graphics, logos, images, and software, is the
                property of Animal Zone or its content suppliers and is protected by international copyright laws. You
                may not reproduce, distribute, or transmit any content without our prior written permission.
              </p>
            </section>

            {/* User Conduct */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">8. User Conduct</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree not to use the Service for any unlawful purpose or in any way that could damage, disable, or
                impair the Service. Prohibited conduct includes: harassment, threats, or abuse; posting false or
                misleading information; attempting to gain unauthorized access; and violating any applicable laws or
                regulations.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">9. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the fullest extent permitted by law, Animal Zone shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising from your use of or inability to use the Service,
                even if we have been advised of the possibility of such damages.
              </p>
            </section>

            {/* Disclaimer of Warranties */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">10. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Service is provided on an "as-is" and "as-available" basis. Animal Zone makes no warranties, express
                or implied, regarding the Service, including warranties of merchantability, fitness for a particular
                purpose, or non-infringement. We do not guarantee that the Service will be uninterrupted or error-free.
              </p>
            </section>

            {/* Indemnification */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">11. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify and hold harmless Animal Zone, its officers, directors, employees, and agents
                from any claims, damages, losses, or expenses arising from your use of the Service or violation of these
                Terms.
              </p>
            </section>

            {/* Termination */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">12. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to terminate or suspend your account and access to the Service at any time, with or
                without cause, and with or without notice. Upon termination, your right to use the Service will
                immediately cease.
              </p>
            </section>

            {/* Modifications to Terms */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">13. Modifications to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon
                posting to the Service. Your continued use of the Service following the posting of revised Terms means
                that you accept and agree to the changes.
              </p>
            </section>

            {/* Governing Law */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">14. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the Philippines, without
                regard to its conflict of law provisions. You agree to submit to the exclusive jurisdiction of the
                courts located in the Philippines.
              </p>
            </section>

            {/* Contact Information */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">15. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="text-foreground font-medium">Animal Zone Customer Support</p>
                <p className="text-muted-foreground">Email: support@animalzone.com</p>
                <p className="text-muted-foreground">Phone: +63 (2) 1234-5678</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
