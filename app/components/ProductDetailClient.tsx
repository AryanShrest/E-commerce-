"use client";
import { useState } from "react";

export default function ProductDetailClient() {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex items-center gap-3">
      {/* Quantity stepper */}
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition text-lg leading-none"
        >
          −
        </button>
        <span className="px-4 py-2 text-sm font-semibold text-gray-900 min-w-[40px] text-center">
          {qty}
        </span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition text-lg leading-none"
        >
          +
        </button>
      </div>

      {/* Add to Cart */}
      <button
        className="flex-1 py-2.5 rounded-lg text-white text-sm font-semibold transition hover:opacity-90"
        style={{ backgroundColor: "#4B1D7B" }}
      >
        Add to Cart
      </button>

      {/* Wishlist */}
      <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:border-purple-700 hover:text-purple-700 transition text-gray-500">
        <i className="far fa-heart" />
      </button>
    </div>
  );
}
