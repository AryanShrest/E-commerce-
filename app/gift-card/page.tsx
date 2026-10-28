import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gift Card | Zymowine.com",
};

export default function GiftCardPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-pink-700">Gift Card</p>
        <h1
          className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Give the gift of beauty
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          Zymowine gift cards are coming soon. In the meantime, explore our shop or email{" "}
          <a href="mailto:service@zymowine.com" className="font-medium text-pink-700 hover:underline">
            service@zymowine.com
          </a>{" "}
          for gift enquiries.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: "#E45D89" }}
        >
          Shop all products
        </Link>
      </main>
      <Footer />
    </>
  );
}
