import Link from "next/link";

const categories = [
  { label: "Champagne & Sparkling", slug: "champagne-and-sparkling", color: "#F7E7CE", border: "#fde68a" },
  { label: "Dessert, Sherry, & Port", slug: "dessert-sherry-and-port", color: "#8B4513", border: "#92400e" },
  { label: "Rosé Wine", slug: "rose-wine", color: "#E8B4B8", border: "#fda4af" },
  { label: "Red Wine", slug: "red-wine", color: "#722F37", border: "#9f1239" },
  { label: "White Wine", slug: "white-wine", color: "#F5E6A3", border: "#d97706" },
];

export default function CategoryPills() {
  return (
    <section className="mx-auto max-w-7xl overflow-hidden px-4 pb-5 sm:px-6 sm:pb-8">
      <div className="category-scroll flex items-center justify-start gap-2 overflow-x-auto sm:flex-wrap sm:justify-center sm:gap-3">
        {categories.map(({ label, slug, color, border }) => (
          <Link
            key={label}
            href={`/wines/${slug}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 transition hover:shadow-md group sm:px-5 sm:py-2.5"
            style={{ ["--hover-border" as string]: "#4B1D7B" }}
          >
            <span
              className="h-5 w-5 flex-shrink-0 rounded-full border-2 sm:h-6 sm:w-6"
              style={{ backgroundColor: color, borderColor: border }}
            />
            <span className="text-xs font-medium text-gray-700 group-hover:text-purple-700 sm:text-sm">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
