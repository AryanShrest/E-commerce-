"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

const navItems = [
  { label: "Home", href: "/", icon: "fa-home" },
  { label: "Search", href: "/wines", icon: "fa-search" },
  { label: "Cart", href: "/cart", icon: "fa-shopping-cart" },
  { label: "Wishlist", href: "/wishlist", icon: "fa-heart" },
  { label: "Sign Up", href: "/account?mode=login", icon: "fa-user" },
];

export default function MobileBottomNav() {
  const { items } = useCart();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-gray-200 bg-white sm:hidden">
      {navItems.map(({ label, href, icon }) => (
        <Link
          key={label}
          href={href}
          className={`relative flex min-h-[3.75rem] flex-col items-center justify-center gap-1 text-[10px] ${label === "Home" ? "bg-[#4B1D7B] text-white" : "text-gray-500"}`}
        >
          <span className="relative">
            <i className={`fas ${icon} text-sm`} aria-hidden="true" />
            {label === "Cart" && cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-3.5 min-w-3.5 items-center justify-center rounded-full px-0.5 text-[8px] font-bold text-white" style={{ backgroundColor: "#dc2626" }}>
                {cartCount}
              </span>
            )}
          </span>
          {label}
        </Link>
      ))}
    </nav>
  );
}
