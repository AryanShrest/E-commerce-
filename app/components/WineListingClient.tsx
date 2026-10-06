"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import ProductSection from "./ProductSection";

const purple = "#4B1D7B";
const categoryFilters = [
  { label: "Red Wine", slug: "red-wine" },
  { label: "Rosé Wine", slug: "rose-wine" },
  { label: "White Wine", slug: "white-wine" },
];
const collapsibleFilters = [
  { title: "Vintage", options: ["2015–2020", "2019", "2014", "2013"] },
  { title: "Size", options: ["750 ML", "1.5 L", "6/750 ML"] },
  { title: "Critic Score", options: ["90+", "95+"] },
  { title: "Critic Source", options: ["James Suckling", "Decanter"] },
  { title: "Producer", options: ["Caiarossa", "Opus One Winery"] },
];

const categoryNames: Record<string, string> = {
  "champagne-and-sparkling": "Champagne and Sparkling",
  "dessert-sherry-and-port": "Dessert, Sherry, and Port",
  "rose-wine": "Rosé Wine",
  "red-wine": "Red Wine",
  "white-wine": "White Wine",
};

export default function WineListingClient({ category }: { category?: string }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [openFilters, setOpenFilters] = useState<string[]>(["Category", "Price"]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [minimumPrice, setMinimumPrice] = useState("2.99");
  const [maximumPrice, setMaximumPrice] = useState("605.99");
  const [sortOrder, setSortOrder] = useState("Newest");
  const selectedCategoryName = category ? categoryNames[category] : "All";

  const filteredProducts = useMemo(() => {
    const categoryFiltered = products.filter((product) => {
      if (!category) return true;
      if (category === "champagne-and-sparkling" || category === "dessert-sherry-and-port") return false;
      if (category === "rose-wine" || category === "white-wine") return product.category === category;
      if (category === "red-wine") return product.category === "red-wine";
      return true;
    });
    const filtersApplied = selectedCategories.length
      ? categoryFiltered.filter((product) => selectedCategories.includes(product.category))
      : categoryFiltered;
    const inPriceRange = filtersApplied.filter((product) => {
      const price = Number(product.price.replace(/[^0-9.]/g, ""));
      return price >= (Number(minimumPrice) || 0) && price <= (Number(maximumPrice) || Infinity);
    });
    return sortOrder === "Price: Low to High"
      ? [...inPriceRange].sort((a, b) => Number(a.price.replace(/[^0-9.]/g, "")) - Number(b.price.replace(/[^0-9.]/g, "")))
      : sortOrder === "Price: High to Low"
        ? [...inPriceRange].sort((a, b) => Number(b.price.replace(/[^0-9.]/g, "")) - Number(a.price.replace(/[^0-9.]/g, "")))
        : inPriceRange;
  }, [category, maximumPrice, minimumPrice, selectedCategories, sortOrder]);

  function toggleFilter(title: string) {
    setOpenFilters((current) =>
      current.includes(title) ? current.filter((filter) => filter !== title) : [...current, title],
    );
  }

  function toggleCategory(slug: string) {
    setSelectedCategories((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  }

  function clearFilters() {
    setSelectedCategories([]);
    setMinimumPrice("2.99");
    setMaximumPrice("605.99");
  }

  function renderFilterOptions() {
    return (
      <>
        <section className="border-t border-gray-100 py-3">
          <button type="button" onClick={() => toggleFilter("Category")} className="flex w-full items-center justify-between text-xs font-semibold uppercase text-gray-700">
            <span>Category <span className="ml-1 text-[9px] font-normal text-gray-400">(3)</span></span>
            <i className={`fas fa-chevron-${openFilters.includes("Category") ? "up" : "down"} text-[10px]`} aria-hidden="true" />
          </button>
          {openFilters.includes("Category") && (
            <div className="mt-3 space-y-2">
              {categoryFilters.map((filter) => (
                <label key={filter.slug} className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
                  <input type="checkbox" checked={selectedCategories.includes(filter.slug)} onChange={() => toggleCategory(filter.slug)} />
                  {filter.label}
                </label>
              ))}
            </div>
          )}
        </section>

        <section className="border-t border-gray-100 py-3">
          <button type="button" onClick={() => toggleFilter("Price")} className="flex w-full items-center justify-between text-xs font-semibold uppercase text-gray-700">
            Price <i className={`fas fa-chevron-${openFilters.includes("Price") ? "up" : "down"} text-[10px]`} aria-hidden="true" />
          </button>
          {openFilters.includes("Price") && (
            <div className="mt-3">
              <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
                <label className="text-[10px] text-gray-500">MIN
                  <input type="number" min="0" value={minimumPrice} onChange={(event) => setMinimumPrice(event.target.value)} className="mt-1 w-full rounded border border-gray-200 px-2 py-1.5 text-xs text-gray-800" />
                </label>
                <span className="pb-2 text-[10px] text-gray-400">TO</span>
                <label className="text-[10px] text-gray-500">MAX
                  <input type="number" min="0" value={maximumPrice} onChange={(event) => setMaximumPrice(event.target.value)} className="mt-1 w-full rounded border border-gray-200 px-2 py-1.5 text-xs text-gray-800" />
                </label>
              </div>
              <input
                type="range"
                min="2.99"
                max="605.99"
                value={Math.min(Number(maximumPrice) || 605.99, 605.99)}
                onChange={(event) => setMaximumPrice(event.target.value)}
                aria-label="Maximum price"
                className="mt-4 w-full accent-purple-800"
              />
              <div className="mt-1 flex justify-between text-[10px] text-gray-400"><span>$2</span><span>$2,804</span><span>$5,606</span></div>
            </div>
          )}
        </section>

        {collapsibleFilters.map(({ title, options }) => (
          <section key={title} className="border-t border-gray-100 py-3">
            <button type="button" onClick={() => toggleFilter(title)} className="flex w-full items-center justify-between text-xs font-semibold uppercase text-gray-700">
              {title} <i className={`fas fa-chevron-${openFilters.includes(title) ? "up" : "down"} text-[10px]`} aria-hidden="true" />
            </button>
            {openFilters.includes(title) && (
              <div className="mt-3 space-y-2">
                {options.map((option) => (
                  <label key={option} className="flex items-center gap-2 text-xs text-gray-600">
                    <input type="checkbox" />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </section>
        ))}
      </>
    );
  }

  if (category && !selectedCategoryName) {
    return (
      <main className="min-h-72 flex-1 bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold text-gray-900">Shop All Wines</h1>
          <p className="mt-2 text-sm text-gray-500">This wine category could not be found.</p>
          <Link href="/" className="mt-4 inline-block text-sm font-semibold hover:underline" style={{ color: purple }}>Browse all wines</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[26rem] flex-1 bg-gray-50 px-4 py-4 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Shop All Wines</h1>
            <p className="mt-2 hidden text-sm text-gray-500 lg:block">{filteredProducts.length} products</p>
          </div>
          <label className="hidden items-center gap-2 text-sm text-gray-600 lg:flex">
            <span className="sr-only">Sort products</span>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-purple-700"
            >
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex items-center justify-between lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700"
            aria-haspopup="dialog"
          >
            <i className="fas fa-sliders-h text-[10px]" aria-hidden="true" />
            Filters
          </button>
          <span className="text-xs text-gray-700"><strong>{filteredProducts.length}</strong> products</span>
        </div>
        <label className="mt-3 block lg:hidden">
          <span className="sr-only">Sort products</span>
          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-purple-700"
          >
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </label>

        {category && (
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-gray-700">
              Category: {category.replaceAll("-", " ")}
              <Link href="/wines" aria-label="Remove category filter" className="ml-2 text-gray-500 hover:text-gray-900">×</Link>
            </span>
          </div>
        )}
        <div className={`${category ? "mt-2" : "mt-5"} flex flex-wrap items-center gap-2 text-xs`}>
          {(selectedCategories.length > 0 || minimumPrice !== "2.99" || maximumPrice !== "605.99") && (
            <button type="button" onClick={clearFilters} className="text-gray-600 hover:text-gray-900">Clear all</button>
          )}
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden h-fit rounded-lg border border-gray-200 bg-white p-4 lg:block">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900">Filters</h2>
              <button type="button" onClick={clearFilters} className="text-xs text-gray-500 hover:text-gray-900">Clear all</button>
            </div>
            {renderFilterOptions()}
          </aside>
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <button
                type="button"
                className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
                aria-label="Close filters"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <aside
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-filters-title"
                className="absolute inset-y-0 left-0 w-[72vw] max-w-sm overflow-y-auto bg-white px-4 pb-8 pt-3 shadow-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 id="mobile-filters-title" className="text-sm font-semibold text-gray-900">Filters</h2>
                  <button type="button" aria-label="Close filters" onClick={() => setMobileFiltersOpen(false)} className="p-1 text-sm text-gray-700">
                    <i className="fas fa-times" aria-hidden="true" />
                  </button>
                </div>
                {renderFilterOptions()}
              </aside>
            </div>
          )}

          <section aria-live="polite">
            {filteredProducts.length === 0 ? (
              <div className="flex min-h-[20rem] flex-col items-center justify-center px-4 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <i className="fas fa-wine-glass-alt text-xl" aria-hidden="true" />
                </span>
                <h2 className="mt-3 text-sm font-semibold text-gray-900">No products found</h2>
                <p className="mt-1 text-xs text-gray-500">Try adjusting your filters or search criteria.</p>
              </div>
            ) : (
              <ProductSection title={category ? `${selectedCategoryName} Wines` : "All Wines"} products={filteredProducts} mobileCarousel={false} showHeading={false} />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
