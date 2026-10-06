"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { products } from "@/lib/products";
import { useCart } from "./CartProvider";

const purple = "#4B1D7B";

function priceOf(price: string) {
  return Number(price.replace(/[^0-9.]/g, ""));
}

function formatPrice(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export default function CartPageClient() {
  const { items, isLoaded, updateQuantity, removeItem, clearCart } = useCart();
  const cartItems = items.flatMap((item) => {
    const product = products.find((candidate) => candidate.slug === item.slug);
    return product ? [{ ...item, product }] : [];
  });
  const subtotal = cartItems.reduce(
    (total, item) => total + priceOf(item.product.price) * item.quantity,
    0,
  );
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (!isLoaded) {
    return (
      <main className="min-h-72 flex-1 bg-gray-50 px-6 py-12 text-center text-gray-500">
        Loading your cart…
      </main>
    );
  }

  return (
    <main className="min-h-72 flex-1 bg-gray-50 px-6 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Your cart</h1>
          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition hover:border-gray-400"
            >
              Clear cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-900">Your cart is empty</p>
            <p className="mt-2 text-sm text-gray-500">Add a wine and it will appear here.</p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-lg px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: purple }}
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.88fr)]">
            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-5 py-3 text-sm text-gray-500">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </div>
              <ul className="max-h-[520px] overflow-y-auto">
                {cartItems.map(({ product, quantity }) => (
                  <li
                    key={product.slug}
                    className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-4 border-b border-gray-200 p-4 last:border-b-0 sm:grid-cols-[84px_minmax(0,1fr)_auto_auto]"
                  >
                    <div className="flex h-20 items-center justify-center rounded-lg bg-gray-50 p-2">
                      <Image
                        src={product.img}
                        alt={product.title}
                        width={60}
                        height={80}
                        className="h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/product/${product.slug}`}
                        className="line-clamp-2 text-sm font-semibold text-gray-900 hover:text-purple-700"
                      >
                        {product.title}
                      </Link>
                      <p className="mt-1 text-sm text-gray-500">{product.price} each</p>
                      <div className="mt-3 flex items-center gap-3 sm:hidden">
                        <QuantityControl
                          quantity={quantity}
                          onChange={(nextQuantity) => updateQuantity(product.slug, nextQuantity)}
                        />
                        <span className="text-sm font-semibold text-gray-900">
                          {formatPrice(priceOf(product.price) * quantity)}
                        </span>
                      </div>
                    </div>
                    <QuantityControl
                      quantity={quantity}
                      onChange={(nextQuantity) => updateQuantity(product.slug, nextQuantity)}
                      className="hidden sm:flex"
                    />
                    <div className="hidden items-center gap-3 sm:flex">
                      <span className="min-w-16 text-right text-sm font-semibold text-gray-900">
                        {formatPrice(priceOf(product.price) * quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItem(product.slug)}
                        className="p-2 text-gray-400 transition hover:text-red-600"
                        aria-label={`Remove ${product.title} from cart`}
                      >
                        <i className="fas fa-trash-alt" aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(product.slug)}
                      className="col-start-2 justify-self-start p-1 text-sm text-gray-500 hover:text-red-600 sm:hidden"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <aside className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="text-gray-500">Calculated at checkout</span>
              </div>
              <p className="mt-4 text-xs text-gray-500">Sign in to apply a coupon at checkout preview.</p>
              <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
                <span className="text-sm font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                className="mt-6 block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: purple }}
              >
                Proceed to Checkout
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

function QuantityControl({
  quantity,
  onChange,
  className = "",
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  className?: string;
}) {
  const [quantityInput, setQuantityInput] = useState(String(quantity));

  function updateInput(value: string) {
    if (!/^\d*$/.test(value)) return;
    setQuantityInput(value);
    const nextQuantity = Number.parseInt(value, 10);
    if (Number.isInteger(nextQuantity) && nextQuantity > 0) onChange(nextQuantity);
  }

  return (
    <div className={`flex items-center overflow-hidden rounded-md text-white ${className}`} style={{ backgroundColor: purple }}>
      <button
        type="button"
        onClick={() => {
          const nextQuantity = Math.max(1, quantity - 1);
          setQuantityInput(String(nextQuantity));
          onChange(nextQuantity);
        }}
        className="px-3 py-2 transition hover:bg-black/15"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <input
        type="number"
        min="1"
        step="1"
        value={quantityInput}
        onChange={(event) => updateInput(event.target.value)}
        onBlur={() => {
          const nextQuantity = Math.max(1, Number.parseInt(quantityInput, 10) || quantity);
          setQuantityInput(String(nextQuantity));
          onChange(nextQuantity);
        }}
        aria-label="Cart item quantity"
        className="quantity-input w-12 border-0 bg-transparent py-2 text-center text-sm font-semibold text-white outline-none"
      />
      <button
        type="button"
        onClick={() => {
          const nextQuantity = quantity + 1;
          setQuantityInput(String(nextQuantity));
          onChange(nextQuantity);
        }}
        className="px-3 py-2 transition hover:bg-black/15"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
