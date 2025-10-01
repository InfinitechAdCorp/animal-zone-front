"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, PlusCircle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/seller/dashboard", label: "Dashboard", icon: Home },
  { href: "/seller/products", label: "My Products", icon: Package },
  { href: "/seller/settings", label: "Settings", icon: Settings },
];

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-green-800">Seller Panel</h2>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition",
                  isActive && "bg-green-100 text-green-800 font-semibold"
                )}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
