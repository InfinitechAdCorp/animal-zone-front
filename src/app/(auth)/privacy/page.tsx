"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PawPrint } from "lucide-react"

export default function PrivacyPage() {
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
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: October 2025</p>
          </div>

          <div className="prose prose-sm max-w-none space-y-6 text-foreground">
            {/* Introduction */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Animal Zone ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy
                Policy explains how we collect, use, disclose, and safeguard your information when you visit our website
                and mobile application (collectively, the "Service"). Please read this Privacy Policy carefully. If you
                do not agree with our policies and practices, please do not use our Service.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    When you register for an account, place an order, or contact us, we collect personal information
                    such as your name, email address, phone number, postal address, and payment information.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We automatically collect certain information about your device and how you interact with our
                    Service, including IP address, browser type, operating system, pages visited, and the time and date
                    of your visits.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Cookies and Tracking Technologies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies, web beacons, and similar tracking technologies to enhance your experience, remember
                    your preferences, and analyze how you use our Service.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Processing and fulfilling your orders</li>
                <li>Sending transactional emails and order updates</li>
                <li>Providing customer support and responding to inquiries</li>
                <li>Personalizing your experience and improving our Service</li>
                <li>Conducting marketing and promotional activities</li>
                <li>Analyzing usage patterns and trends</li>
                <li>Detecting and preventing fraud and security issues</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">4. Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. However, we may share your
                information with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Service providers who assist us in operating our website and conducting our business</li>
                <li>Payment processors to process your transactions</li>
                <li>Shipping carriers to deliver your orders</li>
                <li>Law enforcement when required by law or to protect our rights</li>
                <li>Business partners with your consent</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                over the Internet or electronic storage is completely secure. We cannot guarantee absolute security of
                your information.
              </p>
            </section>

            {/* Your Privacy Rights */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">6. Your Privacy Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to opt-out of marketing communications</li>
                <li>The right to data portability</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                To exercise any of these rights, please contact us using the information provided in the Contact Us
                section.
              </p>
            </section>

            {/* Cookies and Tracking */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">7. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Service uses cookies to enhance your experience. Most web browsers are set to accept cookies by
                default. You can usually choose to set your browser to remove or reject cookies. Please note that
                removing or rejecting cookies may affect the functionality of our Service.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">8. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Service may contain links to third-party websites and applications. We are not responsible for the
                privacy practices of these external sites. We encourage you to review the privacy policies of any
                third-party sites before providing your personal information.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">9. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Service is not intended for children under the age of 13. We do not knowingly collect personal
                information from children under 13. If we become aware that we have collected information from a child
                under 13, we will take steps to delete such information and terminate the child's account.
              </p>
            </section>

            {/* International Data Transfers */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">10. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to, stored in, and processed in countries other than your country of
                residence. These countries may have data protection laws that differ from your home country. By using
                our Service, you consent to the transfer of your information to countries outside your country of
                residence.
              </p>
            </section>

            {/* Data Retention */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">11. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to provide our Service, fulfill the
                purposes outlined in this Privacy Policy, and comply with legal obligations. You may request deletion of
                your information at any time, subject to certain legal requirements.
              </p>
            </section>

            {/* Marketing Communications */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">12. Marketing Communications</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may send you promotional emails about new products, special offers, and other information we think
                may interest you. You can opt-out of these communications at any time by clicking the "unsubscribe" link
                in our emails or by contacting us directly.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">13. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other
                operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
                updated Privacy Policy on our Service and updating the "Last updated" date. Your continued use of our
                Service following the posting of revised Privacy Policy means that you accept and agree to the changes.
              </p>
            </section>

            {/* Contact Information */}
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">14. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="text-foreground font-medium">Animal Zone Privacy Team</p>
                <p className="text-muted-foreground">Email: privacy@animalzone.com</p>
                <p className="text-muted-foreground">Phone: +63 (2) 1234-5678</p>
                <p className="text-muted-foreground">Address: Manila, Philippines</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
