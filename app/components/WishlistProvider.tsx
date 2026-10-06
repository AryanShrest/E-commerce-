"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

type WishlistContextValue = {
  slugs: string[];
  isLoaded: boolean;
  toggleWishlist: (slug: string) => boolean;
  removeFromWishlist: (slug: string) => void;
  clearWishlist: () => void;
};

const WISHLIST_STORAGE_KEY = "zymowine-wishlist";
const WISHLIST_CHANGE_EVENT = "zymowine-wishlist-change";
const WishlistContext = createContext<WishlistContextValue | null>(null);

function subscribeToWishlist(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(WISHLIST_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(WISHLIST_CHANGE_EVENT, callback);
  };
}

function getWishlistSnapshot() {
  return window.localStorage.getItem(WISHLIST_STORAGE_KEY);
}

function parseWishlistSnapshot(snapshot: string | null): string[] {
  if (!snapshot) return [];
  try {
    const parsed: unknown = JSON.parse(snapshot);
    if (Array.isArray(parsed) && parsed.every((slug) => typeof slug === "string")) {
      return [...new Set(parsed)];
    }
    console.error("Saved wishlist data is invalid and could not be restored.");
  } catch (error) {
    console.error("Could not parse the saved wishlist.", error);
  }
  return [];
}

function updateStoredWishlist(update: (slugs: string[]) => string[]) {
  const slugs = parseWishlistSnapshot(getWishlistSnapshot());
  window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(update(slugs)));
  window.dispatchEvent(new Event(WISHLIST_CHANGE_EVENT));
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(subscribeToWishlist, getWishlistSnapshot, () => undefined);
  const slugs = useMemo(() => parseWishlistSnapshot(snapshot ?? null), [snapshot]);

  const toggleWishlist = useCallback((slug: string) => {
    let added = false;
    updateStoredWishlist((currentSlugs) => {
      if (currentSlugs.includes(slug)) {
        return currentSlugs.filter((currentSlug) => currentSlug !== slug);
      }
      added = true;
      return [...currentSlugs, slug];
    });
    return added;
  }, []);

  const removeFromWishlist = useCallback((slug: string) => {
    updateStoredWishlist((currentSlugs) => currentSlugs.filter((currentSlug) => currentSlug !== slug));
  }, []);

  const clearWishlist = useCallback(() => updateStoredWishlist(() => []), []);

  return (
    <WishlistContext.Provider
      value={{ slugs, isLoaded: snapshot !== undefined, toggleWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider.");
  return context;
}
