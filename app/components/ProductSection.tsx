"use client";
import { useRef } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden h-full" style={{ minWidth: 0 }}>
      <Link href={`/product/${product.slug}`} className="flex items-center justify-center p-4" style={{ height: "200px" }}>
        <img src={product.img} alt={product.title} className="h-full object-contain" />
      </Link>
      <div className="flex flex-col flex-1 p-4 gap-2">
        <Link href={`/product/${product.slug}`} className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 hover:text-purple-700 transition">
          {product.title}
        </Link>
        <p className="text-sm text-gray-500 line-clamp-1">{product.variant}</p>
        {product.rating && (
          <div
            className="self-start flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-white text-xs font-bold"
            style={{ backgroundColor: "#4B1D7B" }}
          >
            <span>{product.rating.score}</span>
            <span className="font-normal opacity-80 truncate max-w-[90px]">{product.rating.source}</span>
          </div>
        )}
        <p className="text-base font-bold text-gray-900 mt-auto">{product.price}</p>
        <button
          className="w-full py-2 rounded-lg text-white text-sm font-semibold transition hover:opacity-90"
          style={{ backgroundColor: "#4B1D7B" }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function ProductSection({ title, products }: { title: string; products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth / 4;
      scrollRef.current.scrollLeft += dir === "left" ? -cardWidth : cardWidth;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
          {title}
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 bg-white border border-gray-200 rounded-full shadow hover:shadow-md flex items-center justify-center transition"
          >
            <i className="fas fa-chevron-left text-xs text-gray-600" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 bg-white border border-gray-200 rounded-full shadow hover:shadow-md flex items-center justify-center transition"
          >
            <i className="fas fa-chevron-right text-xs text-gray-600" />
          </button>
          <a href="#" className="text-sm font-medium hover:underline" style={{ color: "#4B1D7B" }}>
            View all
          </a>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="product-scroll overflow-x-auto"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(4, 1fr)`,
          gap: "16px",
        }}
      >
        {products.map((p, i) => (
          <ProductCard key={i} product={p} />
        ))}
      </div>
    </section>
  );
}
