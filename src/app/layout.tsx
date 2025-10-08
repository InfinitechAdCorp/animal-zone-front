// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartContext"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Animal Zone - Your Trusted Pet Marketplace",
  description: "Premium pet food, essentials, and supplies from verified sellers. Quality products delivered to your doorstep.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <CartProvider>
        {children}
        <Toaster position="top-right" richColors />
        </CartProvider>
      </body>
    </html>
  );
}