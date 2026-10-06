"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/products";
import { useCart } from "./CartProvider";
import { useToast } from "./ToastProvider";
import { useWishlist } from "./WishlistProvider";

const purple = "#4B1D7B";

export default function WishlistPageClient() {
  const { slugs, isLoaded, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const favoriteProducts = slugs.flatMap((slug) => {
    const product = products.find((candidate) => candidate.slug === slug);
    return product ? [product] : [];
  });
  const allSelected = favoriteProducts.length > 0 && favoriteProducts.every((product) => selectedSlugs.includes(product.slug));

  function toggleSelected(slug: string) {
    setSelectedSlugs((current) =>
      current.includes(slug) ? current.filter((currentSlug) => currentSlug !== slug) : [...current, slug],
    );
  }

  function toggleSelectAll() {
    setSelectedSlugs(allSelected ? [] : favoriteProducts.map((product) => product.slug));
  }

  function removeSelected() {
    selectedSlugs.forEach(removeFromWishlist);
    setSelectedSlugs([]);
  }

  function moveToCart(slug: string, title: string) {
    addItem(slug, 1);
    removeFromWishlist(slug);
    setSelectedSlugs((current) => current.filter((currentSlug) => currentSlug !== slug));
    showToast("Added to cart", `1 × ${title}`);
  }

  if (!isLoaded) {
    return <main className="min-h-72 flex-1 bg-gray-50 px-6 py-12 text-center text-gray-500">Loading your wishlist…</main>;
  }

  return (
    <main className="min-h-72 flex-1 bg-gray-50 px-6 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Wishlist</h1>
          {favoriteProducts.length > 0 && (
            <div className="flex items-center gap-2">
              {selectedSlugs.length > 0 && (
                <button
                  type="button"
                  onClick={removeSelected}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition hover:border-gray-400"
                >
                  Remove selected
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  clearWishlist();
                  setSelectedSlugs([]);
                }}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition hover:border-gray-400"
              >
                Clear wishlist
              </button>
            </div>
          )}
        </div>

        {favoriteProducts.length === 0 ? (
          <section className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
            <i className="far fa-heart text-3xl text-gray-400" aria-hidden="true" />
            <p className="mt-3 text-lg font-semibold text-gray-900">Your wishlist is empty</p>
            <p className="mt-2 text-sm text-gray-500">Tap a heart on a wine to save it here.</p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-lg px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: purple }}
            >
              Browse wines
            </Link>
          </section>
        ) : (
          <>
            <label className="mb-3 inline-flex cursor-pointer items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
              Select all items
            </label>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(4,minmax(0,244px))]">
              {favoriteProducts.map((product) => (
                <li key={product.slug} className="relative flex h-full min-h-[24rem] min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
                  <label className="absolute left-3 top-3 z-10 cursor-pointer rounded bg-white/90 p-1">
                    <input
                      type="checkbox"
                      checked={selectedSlugs.includes(product.slug)}
                      onChange={() => toggleSelected(product.slug)}
                      aria-label={`Select ${product.title}`}
                    />
                  </label>
                  <Link href={`/product/${product.slug}`} className="flex h-[200px] shrink-0 items-center justify-center bg-transparent p-4">
                    <Image src={product.img} alt={product.title} width={180} height={180} className="h-full object-contain" />
                  </Link>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <Link href={`/product/${product.slug}`} className="line-clamp-2 text-sm font-semibold leading-snug text-gray-800 hover:text-purple-700">
                      {product.title}
                    </Link>
                    <p className="mt-auto text-base font-bold text-gray-900">{product.price}</p>
                    <div className="grid grid-cols-[1fr_auto] gap-2">
                      <button
                        type="button"
                        onClick={() => moveToCart(product.slug, product.title)}
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                        style={{ backgroundColor: purple }}
                      >
                        <i className="fas fa-shopping-cart mr-2" aria-hidden="true" />
                        Move to cart
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(product.slug)}
                        aria-label={`Remove ${product.title} from wishlist`}
                        className="rounded-lg border border-gray-200 px-3 text-gray-500 transition hover:border-red-300 hover:text-red-600"
                      >
                        <i className="fas fa-trash-alt" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}
