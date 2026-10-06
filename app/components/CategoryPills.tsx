const categories = [
  { label: "Champagne & Sparkling", color: "#F7E7CE", border: "#fde68a" },
  { label: "Dessert, Sherry, & Port", color: "#8B4513", border: "#92400e" },
  { label: "Rosé Wine", color: "#E8B4B8", border: "#fda4af" },
  { label: "Red Wine", color: "#722F37", border: "#9f1239" },
  { label: "White Wine", color: "#F5E6A3", border: "#d97706" },
];

export default function CategoryPills() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-8">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map(({ label, color, border }) => (
          <button
            key={label}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full hover:shadow-md transition group"
            style={{ ["--hover-border" as string]: "#4B1D7B" }}
          >
            <span
              className="w-6 h-6 rounded-full flex-shrink-0 border-2"
              style={{ backgroundColor: color, borderColor: border }}
            />
            <span className="text-sm text-gray-700 group-hover:text-purple-700 font-medium">{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
