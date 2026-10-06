"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

type CartItem = {
  slug: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  isLoaded: boolean;
  addItem: (slug: string, quantity?: number) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
};

const CART_STORAGE_KEY = "zymowine-cart";
const CartContext = createContext<CartContextValue | null>(null);
const CART_CHANGE_EVENT = "zymowine-cart-change";

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return typeof item.slug === "string" && Number.isInteger(item.quantity) && Number(item.quantity) > 0;
}

function subscribeToCart(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CART_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CART_CHANGE_EVENT, callback);
  };
}

function getCartSnapshot() {
  return window.localStorage.getItem(CART_STORAGE_KEY);
}

function parseCartSnapshot(snapshot: string | null): CartItem[] {
  if (!snapshot) return [];
  try {
    const parsed: unknown = JSON.parse(snapshot);
    if (Array.isArray(parsed) && parsed.every(isCartItem)) return parsed;
    console.error("Saved cart data is invalid and could not be restored.");
  } catch (error) {
    console.error("Could not parse the saved cart.", error);
  }
  return [];
}

function updateStoredCart(update: (items: CartItem[]) => CartItem[]) {
  const items = parseCartSnapshot(getCartSnapshot());
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(update(items)));
  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(subscribeToCart, getCartSnapshot, () => undefined);
  const items = useMemo(() => parseCartSnapshot(snapshot ?? null), [snapshot]);

  const addItem = useCallback((slug: string, quantity = 1) => {
    updateStoredCart((currentItems) => {
      const existingItem = currentItems.find((item) => item.slug === slug);
      if (existingItem) {
        return currentItems.map((item) =>
          item.slug === slug ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [...currentItems, { slug, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    updateStoredCart((currentItems) =>
      currentItems.map((item) => (item.slug === slug ? { ...item, quantity } : item)),
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    updateStoredCart((currentItems) => currentItems.filter((item) => item.slug !== slug));
  }, []);

  const clearCart = useCallback(() => updateStoredCart(() => []), []);

  return (
    <CartContext.Provider
      value={{ items, isLoaded: snapshot !== undefined, addItem, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider.");
  return context;
}
