"use client";
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
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="relative rounded-2xl overflow-hidden h-80">
        <img src={img} alt={headline} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />

        <button
          onClick={prev}
          className="absolute left-5 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition z-10"
        >
          <i className="fas fa-chevron-left text-sm" />
        </button>
        <button
          onClick={next}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition z-10"
        >
          <i className="fas fa-chevron-right text-sm" />
        </button>

        <div className="relative h-full flex flex-col items-center justify-center text-white z-10 px-8">
          <h2 className="text-4xl md:text-5xl font-semibold mb-3 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            {headline}
          </h2>
          <div className="w-16 h-px bg-white/60 mb-3" />
          <p className="text-base md:text-lg mb-6 text-white/90">{sub}</p>
          <button
            className="text-white px-6 py-2.5 rounded-md text-sm font-semibold tracking-wide transition hover:opacity-90"
            style={{ backgroundColor: "#2E1054" }}
          >
            SHOP NOW
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-white/90" : "w-6 bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
