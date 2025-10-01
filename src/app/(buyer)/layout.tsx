import Navigation from "@/components/Navigation"
import Footer from "@/components/landing/Footer"

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  )
}
