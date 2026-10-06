"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { useWishlist } from "./WishlistProvider";

const shippingStates = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

export default function Header() {
  const { items } = useCart();
  const { slugs: favoriteSlugs } = useWishlist();
  const [shippingState, setShippingState] = useState("NY");
  const [shippingMenuOpen, setShippingMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-6 py-3">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" aria-label="CoreCraft Technologies home" className="flex flex-shrink-0 items-center">
            <Image
              src="/corecraft-logo.png"
              alt="CoreCraft Technologies"
              width={324}
              height={229}
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search wines, regions, producers..."
                className="w-full px-5 py-2 pr-12 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 transition"
                style={{ "--tw-ring-color": "#4B1D7B33" } as React.CSSProperties}
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-700 transition">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-5 flex-shrink-0">
            <div className="relative">
              <span className="block text-xs text-gray-500">Ship to</span>
              <button
                type="button"
                onClick={() => {
                  setShippingMenuOpen((open) => !open);
                  setAccountMenuOpen(false);
                }}
                aria-expanded={shippingMenuOpen}
                aria-haspopup="listbox"
                className="flex items-center gap-1 text-sm font-medium text-gray-900"
              >
                {shippingState}
                <i className="fas fa-chevron-down text-xs text-gray-500" aria-hidden="true" />
              </button>
              {shippingMenuOpen && (
                <ul
                  role="listbox"
                  aria-label="Choose shipping state"
                  className="absolute right-0 top-full z-40 mt-3 max-h-80 w-64 overflow-y-auto rounded-xl border border-gray-200 bg-white p-1 shadow-lg"
                >
                  {shippingStates.map((state) => (
                    <li key={state.code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={shippingState === state.code}
                        onClick={() => {
                          setShippingState(state.code);
                          setShippingMenuOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition hover:bg-gray-100 ${shippingState === state.code ? "bg-gray-50 font-medium" : ""}`}
                      >
                        <span>{state.code} — {state.name}</span>
                        {shippingState === state.code && <i className="fas fa-check text-sm" aria-hidden="true" />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setAccountMenuOpen((open) => !open);
                  setShippingMenuOpen(false);
                }}
                aria-label="Open account menu"
                aria-expanded={accountMenuOpen}
                aria-haspopup="menu"
                className="text-lg text-gray-700 transition hover:text-purple-700"
              >
                <i className="far fa-user" aria-hidden="true" />
              </button>
              {accountMenuOpen && (
                <div role="menu" className="absolute right-0 top-full z-40 mt-3 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                  <Link
                    href="/account?mode=login"
                    role="menuitem"
                    onClick={() => setAccountMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-900 transition hover:bg-gray-100"
                  >
                    <i className="fas fa-sign-in-alt w-4" aria-hidden="true" />
                    Login
                  </Link>
                  <Link
                    href="/account?mode=signup"
                    role="menuitem"
                    onClick={() => setAccountMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-900 transition hover:bg-gray-100"
                  >
                    <i className="far fa-user w-4" aria-hidden="true" />
                    Register
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/wishlist"
              aria-label={`Wishlist with ${favoriteSlugs.length} ${favoriteSlugs.length === 1 ? "item" : "items"}`}
              className="relative text-lg text-gray-700 transition hover:text-purple-700"
            >
              <i className="far fa-heart" aria-hidden="true" />
              {favoriteSlugs.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white" style={{ backgroundColor: "#4B1D7B" }}>
                  {favoriteSlugs.length}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              aria-label={`Shopping cart with ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
              className="relative text-lg text-gray-700 transition hover:text-purple-700"
            >
              <i className="fas fa-shopping-cart" aria-hidden="true" />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white" style={{ backgroundColor: "#4B1D7B" }}>
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
}
