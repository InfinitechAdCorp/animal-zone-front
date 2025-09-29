import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Categories from "@/components/landing/Categories";
import HowItWorks from "@/components/landing/HowItWorks";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Categories />
      <HowItWorks />
      <WhyChooseUs />
      <CallToAction />
      <Footer />
    </main>
  );
}