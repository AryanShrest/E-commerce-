"use client";
import { useCart } from "./CartProvider";
import { useToast } from "./ToastProvider";

export default function AddToCartButton({
  slug,
  title,
  quantity = 1,
  className,
}: {
  slug: string;
  title: string;
  quantity?: number;
  className: string;
}) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  function handleAddToCart() {
    addItem(slug, quantity);
    showToast("Added to cart", `${quantity} × ${title}`);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className={className}
      style={{ backgroundColor: "#4B1D7B" }}
    >
      Add to Cart
    </button>
  );
}
