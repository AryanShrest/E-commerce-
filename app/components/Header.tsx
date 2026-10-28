"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { brands, categories } from "@/lib/products";
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

const brandColor = "#E45D89";

const navLinkClass =
  "flex items-center gap-1.5 px-3 py-3 text-sm font-medium text-white transition hover:bg-white/15";

export default function Header() {
  const { items } = useCart();
  const { slugs: favoriteSlugs } = useWishlist();
  const [shippingState, setShippingState] = useState("NY");
  const [shippingMenuOpen, setShippingMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 sm:py-3">
          <div className="flex items-center justify-between gap-3 sm:gap-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen((open) => !open);
                  setShippingMenuOpen(false);
                }}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                className="text-lg text-gray-800 md:hidden"
              >
                <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`} aria-hidden="true" />
              </button>

              {/* Logo */}
              <Link href="/" aria-label="Beauticuty home" className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
                <Image
                  src="/zymowine-logo.png"
                  alt="Beauticuty"
                  width={551}
                  height={551}
                  className="h-11 w-11 object-contain sm:h-14 sm:w-14"
                />
                <span
                  className="whitespace-nowrap font-serif text-[17px] font-medium leading-none tracking-[0.04em] text-gray-900 sm:text-[26px] sm:tracking-[0.06em]"
                  style={{ fontVariantCaps: "small-caps" }}
                >
                  Beauticuty
                </span>
              </Link>
            </div>

            {/* Search */}
            <div className="hidden max-w-3xl flex-1 md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search your beauty"
                  aria-label="Search your beauty"
                  className="w-full rounded-full border border-gray-300 bg-white px-5 py-2.5 pr-12 text-sm text-gray-700 transition placeholder:text-gray-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
                />
                <button
                  aria-label="Search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-gray-500 transition hover:text-pink-700"
                >
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>

            {/* Right icons */}
            <div className="flex flex-shrink-0 items-center gap-3 sm:gap-5">
              <div className="relative hidden sm:block">
                <span className="block text-xs text-gray-500">Ship to</span>
                <button
                  type="button"
                  onClick={() => {
                    setShippingMenuOpen((open) => !open);
                    setAccountMenuOpen(false);
                  }}
                  aria-expanded={shippingMenuOpen}
                  aria-haspopup="listbox"
                  className="flex items-center gap-1 text-xs font-medium text-gray-900 sm:text-sm"
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
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition hover:bg-pink-50 ${shippingState === state.code ? "bg-pink-50 font-medium" : ""}`}
                        >
                          <span>{state.code} — {state.name}</span>
                          {shippingState === state.code && <i className="fas fa-check text-sm" aria-hidden="true" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => {
                    setAccountMenuOpen((open) => !open);
                    setShippingMenuOpen(false);
                  }}
                  aria-label="Open account menu"
                  aria-expanded={accountMenuOpen}
                  aria-haspopup="menu"
                  className="text-lg text-gray-700 transition hover:text-pink-700"
                >
                  <i className="far fa-user" aria-hidden="true" />
                </button>
                {accountMenuOpen && (
                  <div role="menu" className="absolute right-0 top-full z-40 mt-3 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                    <Link
                      href="/account?mode=login"
                      role="menuitem"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-900 transition hover:bg-pink-50"
                    >
                      <i className="fas fa-sign-in-alt w-4" aria-hidden="true" />
                      Login
                    </Link>
                    <Link
                      href="/account?mode=signup"
                      role="menuitem"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-900 transition hover:bg-pink-50"
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
                className="relative hidden text-lg text-gray-700 transition hover:text-pink-700 sm:block"
              >
                <i className="far fa-heart" aria-hidden="true" />
                {favoriteSlugs.length > 0 && (
                  <span
                    className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white"
                    style={{ backgroundColor: brandColor }}
                  >
                    {favoriteSlugs.length}
                  </span>
                )}
              </Link>
              <Link
                href="/cart"
                aria-label={`Shopping cart with ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
                className="relative hidden text-lg text-gray-700 transition hover:text-pink-700 sm:block"
              >
                <i className="fas fa-shopping-cart" aria-hidden="true" />
                {itemCount > 0 && (
                  <span
                    className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white"
                    style={{ backgroundColor: brandColor }}
                  >
                    {itemCount}
                  </span>
                )}
              </Link>
              <Link
                href="/account?mode=login"
                className="flex items-center gap-2 text-xs font-semibold text-white sm:hidden"
                style={{ backgroundColor: brandColor, borderRadius: 9999, padding: "6px 10px" }}
              >
                <i className="far fa-user" aria-hidden="true" />
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {mobileMenuOpen && (
            <nav className="mt-3 max-h-[70vh] overflow-y-auto border-t border-pink-100 pb-3 pt-3 md:hidden">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-pink-50">
                Home
              </Link>
              {categories.map((category) => (
                <details key={category.slug} className="group border-b border-pink-50">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-800 hover:bg-pink-50">
                    {category.label}
                    <i className="fas fa-chevron-down text-[10px] text-gray-400 transition group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="pb-2 pl-4">
                    {category.subs.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/shop/${category.slug}?sub=${sub.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-pink-50 hover:text-pink-700"
                      >
                        {sub.label}
                      </Link>
                    ))}
                    <Link
                      href={`/shop/${category.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm font-semibold text-pink-700 hover:bg-pink-50"
                    >
                      Shop all {category.label}
                    </Link>
                  </div>
                </details>
              ))}
              <details className="group border-b border-pink-50">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-800 hover:bg-pink-50">
                  Brands
                  <i className="fas fa-chevron-down text-[10px] text-gray-400 transition group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="max-h-64 overflow-y-auto pb-2 pl-4">
                  {brands.map((brand) => (
                    <Link
                      key={brand}
                      href={`/shop?brand=${encodeURIComponent(brand)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-pink-50 hover:text-pink-700"
                    >
                      {brand}
                    </Link>
                  ))}
                </div>
              </details>
              <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-800 hover:bg-pink-50">
                Shop All
              </Link>
              <Link href="/gift-card" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-pink-50">
                Gift Card
              </Link>
              <Link href="/account?mode=login" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-pink-50">Login</Link>
              <Link href="/account?mode=signup" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-pink-50">Register</Link>
              <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-pink-50">Wishlist ({favoriteSlugs.length})</Link>
            </nav>
          )}
        </div>
      </header>

      {/* Sticky category menu */}
      <div className="sticky top-0 z-40 hidden md:block" style={{ backgroundColor: brandColor }}>
        <nav aria-label="Categories" className="mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6">
          <Link href="/" className={navLinkClass}>
            Home
          </Link>
          {categories.map((category) => (
            <div
              key={category.slug}
              className="relative"
              onMouseEnter={() => setOpenDropdown(category.slug)}
              onMouseLeave={() => setOpenDropdown((current) => (current === category.slug ? null : current))}
            >
              <Link
                href={`/shop/${category.slug}`}
                aria-expanded={openDropdown === category.slug}
                aria-haspopup="true"
                onClick={() => setOpenDropdown((current) => (current === category.slug ? null : category.slug))}
                className={navLinkClass}
              >
                {category.label}
                <i className="fas fa-chevron-down text-[9px] text-white/80" aria-hidden="true" />
              </Link>
              {openDropdown === category.slug && (
                <div className="absolute left-1/2 top-full z-40 w-56 -translate-x-1/2 pt-1">
                  <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                    {category.subs.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/shop/${category.slug}?sub=${sub.slug}`}
                        onClick={() => setOpenDropdown(null)}
                        className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-pink-50 hover:text-pink-700"
                      >
                        {sub.label}
                      </Link>
                    ))}
                    <Link
                      href={`/shop/${category.slug}`}
                      onClick={() => setOpenDropdown(null)}
                      className="mt-1 block rounded-lg border-t border-gray-100 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-pink-700 transition hover:text-pink-800"
                    >
                      Shop all {category.label}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("brands")}
            onMouseLeave={() => setOpenDropdown((current) => (current === "brands" ? null : current))}
          >
            <button
              type="button"
              aria-expanded={openDropdown === "brands"}
              aria-haspopup="true"
              onClick={() => setOpenDropdown((current) => (current === "brands" ? null : "brands"))}
              className={navLinkClass}
            >
              Brands
              <i className="fas fa-chevron-down text-[9px] text-white/80" aria-hidden="true" />
            </button>
            {openDropdown === "brands" && (
              <div className="absolute left-1/2 top-full z-40 w-64 -translate-x-1/2 pt-1">
                <div className="max-h-80 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                  {brands.map((brand) => (
                    <Link
                      key={brand}
                      href={`/shop?brand=${encodeURIComponent(brand)}`}
                      onClick={() => setOpenDropdown(null)}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-pink-50 hover:text-pink-700"
                    >
                      {brand}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/gift-card" className={navLinkClass}>
            Gift Card
          </Link>
        </nav>
      </div>
    </>
  );
}
