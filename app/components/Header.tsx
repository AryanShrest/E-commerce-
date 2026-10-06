import WineLogo from "./WineLogo";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5">
        {/* Top row */}
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-12 h-14 bg-white border border-gray-200 flex items-center justify-center">
              <WineLogo />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                Zymowine.com
              </h1>
              <p className="text-sm text-gray-500 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                &ldquo;the science of fine wine&rdquo;
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search wines, regions, producers..."
                className="w-full py-3 px-5 pr-12 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 transition"
                style={{ "--tw-ring-color": "#4B1D7B33" } as React.CSSProperties}
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-700 transition">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-5 flex-shrink-0">
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">Ship to</span>
              <select className="bg-transparent text-sm font-medium text-gray-900 focus:outline-none cursor-pointer pr-1">
                <option>NY</option>
                <option>CA</option>
                <option>TX</option>
                <option>FL</option>
              </select>
              <i className="fas fa-chevron-down text-xs text-gray-400" />
            </div>
            <button className="text-gray-700 hover:text-purple-700 transition text-lg">
              <i className="far fa-user" />
            </button>
            <button className="text-gray-700 hover:text-purple-700 transition text-lg">
              <i className="far fa-heart" />
            </button>
            <button className="text-gray-700 hover:text-purple-700 transition text-lg">
              <i className="fas fa-shopping-cart" />
            </button>
          </div>
        </div>

        {/* Secondary nav */}
        <div className="mt-5 flex items-center gap-8 border-b border-gray-100 pb-2">
          <div className="flex items-center gap-1 text-sm font-medium text-gray-700 cursor-pointer hover:text-purple-700 transition">
            <span>Wine</span>
            <i className="fas fa-chevron-down text-xs text-gray-400 ml-1" />
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-gray-700 cursor-pointer hover:text-purple-700 transition">
            <span>Top Rated</span>
            <i className="fas fa-chevron-down text-xs text-gray-400 ml-1" />
          </div>
        </div>
      </div>
    </header>
  );
}
