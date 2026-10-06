"use client";
import { useState } from "react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="relative py-1.5 px-4 text-center text-white text-xs sm:py-2 sm:text-sm" style={{ backgroundColor: "#2E1054" }}>
      Save 10% on all French Wines
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-gray-300 transition"
        aria-label="Dismiss"
      >
        <i className="fas fa-times" />
      </button>
    </div>
  );
}
