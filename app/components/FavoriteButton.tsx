"use client";

import { useWishlist } from "./WishlistProvider";
import { useToast } from "./ToastProvider";

export default function FavoriteButton({
  slug,
  title,
  className = "",
}: {
  slug: string;
  title: string;
  className?: string;
}) {
  const { slugs, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const isFavorite = slugs.includes(slug);

  function handleToggle() {
    const added = toggleWishlist(slug);
    showToast(added ? "Added to favorites" : "Removed from favorites", title);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`${isFavorite ? "Remove" : "Add"} ${title} ${isFavorite ? "from" : "to"} wishlist`}
      aria-pressed={isFavorite}
      className={className}
    >
      <i className={`${isFavorite ? "fas" : "far"} fa-heart`} aria-hidden="true" />
    </button>
  );
}
