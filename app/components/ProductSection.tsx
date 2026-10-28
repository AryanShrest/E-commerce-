"use client";
import { useRef } from "react";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import FavoriteButton from "./FavoriteButton";

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:border-pink-200 hover:shadow-md">
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="flex h-28 items-center justify-center p-2 sm:h-[200px] sm:p-4">
          <img src={product.img} alt={product.title} className="h-full object-contain" />
        </Link>
        <FavoriteButton
          slug={product.slug}
          title={product.title}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-xs text-gray-500 shadow-sm transition hover:border-pink-600 hover:text-pink-700 sm:right-3 sm:top-3 sm:h-9 sm:w-9 sm:text-base"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-2 sm:gap-2 sm:p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-pink-700 sm:text-[11px]">
          {product.brand}
        </p>
        <Link href={`/product/${product.slug}`} className="line-clamp-2 text-xs font-semibold leading-snug text-gray-800 transition hover:text-pink-700 sm:text-sm">
          {product.title}
        </Link>
        <p className="mt-auto text-xs font-bold text-gray-900 sm:text-base">{formatPrice(product.price)}</p>
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
            <Link href="/shop" className="text-xs font-medium text-pink-700 hover:text-pink-800 hover:underline sm:text-sm">
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
