"use client";
import { useState } from "react";
import type { Product } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "./FavoriteButton";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantityInput, setQuantityInput] = useState("1");
  const quantity = Math.max(1, Number.parseInt(quantityInput, 10) || 1);

  return (
    <div className="flex items-center gap-3">
      {/* Quantity stepper */}
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => setQuantityInput(String(Math.max(1, quantity - 1)))}
          className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition text-lg leading-none"
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
          className="quantity-input w-14 border-0 bg-transparent py-2 text-center text-sm font-semibold text-gray-900 outline-none"
        />
        <button
          type="button"
          onClick={() => setQuantityInput(String(quantity + 1))}
          className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition text-lg leading-none"
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
        className="flex-1 rounded-lg py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
      />

      {/* Wishlist */}
      <FavoriteButton
        slug={product.slug}
        title={product.title}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-500 transition hover:border-purple-700 hover:text-purple-700"
      />
    </div>
  );
}
