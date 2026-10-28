"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const SLIDE_INTERVAL_MS = 5000;

const slides = [
  {
    img: "/hero/banner-minimalist.png",
    alt: "Minimalist clinical solutions for skin, hair and body — flat 5% off",
    href: "/shop",
  },
  {
    img: "/hero/banner-uvdoux.png",
    alt: "UV Doux sun protection for bright summer days — flat 10% off",
    href: "/shop/skin-care",
  },
  {
    img: "/hero/banner-korean.png",
    alt: "Korean beauty — up to 40% off, direct from Korea",
    href: "/shop/skin-care",
  },
];

export default function HeroBanner() {
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a - 1 + slides.length) % slides.length);
  const next = () => setActive((a) => (a + 1) % slides.length);
  const { img, alt, href } = slides[active];

  useEffect(() => {
    const timer = setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      SLIDE_INTERVAL_MS,
    );
    return () => clearInterval(timer);
  }, [active]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-6">
      <div className="group relative aspect-[11/5] overflow-hidden rounded-xl bg-pink-50 sm:aspect-[1600/450] sm:rounded-2xl">
        <Link href={href} aria-label="Shop the promotion" className="absolute inset-0 z-0 block">
          <img src={img} alt={alt} className="h-full w-full object-contain object-center sm:object-cover" />
        </Link>

        <button
          onClick={prev}
          aria-label="Previous promotion"
          className="absolute left-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60 sm:left-4 sm:h-9 sm:w-9"
        >
          <i className="fas fa-chevron-left text-sm" />
        </button>
        <button
          onClick={next}
          aria-label="Next promotion"
          className="absolute right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60 sm:right-4 sm:h-9 sm:w-9"
        >
          <i className="fas fa-chevron-right text-sm" />
        </button>

        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show promotion ${i + 1}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full shadow-sm transition-all ${
                i === active ? "w-6 bg-[#E45D89]" : "w-2.5 bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
