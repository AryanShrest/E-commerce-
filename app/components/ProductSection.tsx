"use client";
import { useRef } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "./FavoriteButton";

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="flex h-28 items-center justify-center p-2 sm:h-[200px] sm:p-4">
          <img src={product.img} alt={product.title} className="h-full object-contain" />
        </Link>
        <FavoriteButton
          slug={product.slug}
          title={product.title}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-xs text-gray-500 shadow-sm transition hover:border-purple-700 hover:text-purple-700 sm:right-3 sm:top-3 sm:h-9 sm:w-9 sm:text-base"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-2 sm:gap-2 sm:p-4">
        <Link href={`/product/${product.slug}`} className="line-clamp-2 text-xs font-semibold leading-snug text-gray-800 transition hover:text-purple-700 sm:text-sm">
          {product.title}
        </Link>
        <p className="line-clamp-1 text-[10px] text-gray-500 sm:text-sm">{product.variant}</p>
        {product.rating && (
          <div
            className="flex self-start items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white sm:gap-1.5 sm:px-2.5 sm:text-xs"
            style={{ backgroundColor: "#4B1D7B" }}
          >
            <span>{product.rating.score}</span>
            <span className="font-normal opacity-80 truncate max-w-[90px]">{product.rating.source}</span>
          </div>
        )}
        <p className="mt-auto text-xs font-bold text-gray-900 sm:text-base">{product.price}</p>
        <AddToCartButton
          slug={product.slug}
          title={product.title}
          className="w-full rounded-md py-1.5 text-[10px] font-semibold text-white transition hover:opacity-90 sm:rounded-lg sm:py-2 sm:text-sm"
        />
      </div>
    </div>
  );
}

export default function ProductSection({
  title,
  products,
  mobileCarousel = true,
  showHeading = true,
}: {
  title: string;
  products: Product[];
  mobileCarousel?: boolean;
  showHeading?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth / 4;
      scrollRef.current.scrollLeft += dir === "left" ? -cardWidth : cardWidth;
    }
  };

  return (
    <section className={`mx-auto max-w-7xl ${mobileCarousel ? "px-4 pb-6 sm:px-6 sm:pb-10" : "pb-6 sm:pb-10"}`}>
      {showHeading && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900 sm:text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            {title}
          </h2>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => scroll("left")}
              aria-label={`Scroll ${title} products left`}
              className="hidden h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow transition hover:shadow-md sm:flex"
            >
              <i className="fas fa-chevron-left text-xs text-gray-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label={`Scroll ${title} products right`}
              className="hidden h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow transition hover:shadow-md sm:flex"
            >
              <i className="fas fa-chevron-right text-xs text-gray-600" />
            </button>
            <Link href="/wines" className="text-xs font-medium hover:underline sm:text-sm" style={{ color: "#4B1D7B" }}>
              View all
            </Link>
          </div>
        </div>
      )}

      <div
        ref={scrollRef}
        className={`product-scroll ${mobileCarousel ? "product-scroll--carousel overflow-x-auto" : "product-scroll--listing overflow-visible"}`}
      >
        {products.map((p, i) => (
          <ProductCard key={i} product={p} />
        ))}
      </div>
    </section>
  );
}
