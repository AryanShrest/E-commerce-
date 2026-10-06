"use client";
import { useState } from "react";
import type { Product } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "./FavoriteButton";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantityInput, setQuantityInput] = useState("1");
  const quantity = Math.max(1, Number.parseInt(quantityInput, 10) || 1);

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Quantity stepper */}
      <div className="flex items-center overflow-hidden rounded-md border border-gray-300 sm:rounded-lg">
        <button
          type="button"
          onClick={() => setQuantityInput(String(Math.max(1, quantity - 1)))}
          className="px-2 py-1.5 text-base leading-none text-gray-600 transition hover:bg-gray-100 sm:px-3 sm:py-2 sm:text-lg"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <input
          type="number"
          min="1"
          step="1"
          value={quantityInput}
          onChange={(event) => {
            const value = event.target.value;
            if (value === "" || /^\d+$/.test(value)) setQuantityInput(value);
          }}
          onBlur={() => setQuantityInput(String(quantity))}
          aria-label="Product quantity"
          className="quantity-input w-8 border-0 bg-transparent py-1.5 text-center text-xs font-semibold text-gray-900 outline-none sm:w-14 sm:py-2 sm:text-sm"
        />
        <button
          type="button"
          onClick={() => setQuantityInput(String(quantity + 1))}
          className="px-2 py-1.5 text-base leading-none text-gray-600 transition hover:bg-gray-100 sm:px-3 sm:py-2 sm:text-lg"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Add to Cart */}
      <AddToCartButton
        slug={product.slug}
        title={product.title}
        quantity={quantity}
        className="flex-1 rounded-md py-1.5 text-xs font-semibold text-white transition hover:opacity-90 sm:rounded-lg sm:py-2.5 sm:text-sm"
      />

      {/* Wishlist */}
      <FavoriteButton
        slug={product.slug}
        title={product.title}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-xs text-gray-500 transition hover:border-purple-700 hover:text-purple-700 sm:h-10 sm:w-10 sm:rounded-lg sm:text-base"
      />
    </div>
  );
}
