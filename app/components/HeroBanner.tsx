"use client";
import Link from "next/link";
import { useState } from "react";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1600&q=80",
    headline: "A Toast Worth Remembering",
    sub: "Discover Wines Made for Every Celebration",
  },
  {
    img: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1600&q=80",
    headline: "Explore the World of Wine",
    sub: "From Bordeaux to Burgundy and Beyond",
  },
  {
    img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1600&q=80",
    headline: "Curated for Connoisseurs",
    sub: "Hand-Selected Bottles for Every Occasion",
  },
];

export default function HeroBanner() {
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a - 1 + slides.length) % slides.length);
  const next = () => setActive((a) => (a + 1) % slides.length);
  const { img, headline, sub } = slides[active];

  return (
    <section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-8">
      <div className="relative h-56 overflow-hidden rounded-xl sm:h-96 sm:rounded-2xl">
        <img src={img} alt={headline} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />

        <button
          onClick={prev}
          aria-label="Previous promotion"
          className="absolute left-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/70 sm:left-5 sm:h-9 sm:w-9"
        >
          <i className="fas fa-chevron-left text-sm" />
        </button>
        <button
          onClick={next}
          aria-label="Next promotion"
          className="absolute right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/70 sm:right-5 sm:h-9 sm:w-9"
        >
          <i className="fas fa-chevron-right text-sm" />
        </button>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-white">
          <h2 className="mb-1 text-center text-lg font-semibold sm:mb-3 sm:text-4xl md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            {headline}
          </h2>
          <div className="mb-1 h-px w-10 bg-white/60 sm:mb-3 sm:w-16" />
          <p className="mb-2 text-center text-[10px] text-white/90 sm:mb-6 sm:text-base md:text-lg">{sub}</p>
          <Link
            href="/wines"
            className="rounded-md px-4 py-1.5 text-[10px] font-semibold tracking-wide text-white transition hover:opacity-90 sm:px-6 sm:py-2.5 sm:text-sm"
            style={{ backgroundColor: "#2E1054" }}
          >
            SHOP NOW
          </Link>
        </div>

        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show promotion ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-white/90" : "w-6 bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
