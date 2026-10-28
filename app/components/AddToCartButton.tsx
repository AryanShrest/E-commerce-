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
    showToast("Added to cart", quantity === 1 ? title : `${quantity} × ${title}`);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className={className}
      style={{ backgroundColor: "#E45D89" }}
    >
      Add to Cart
    </button>
  );
}
