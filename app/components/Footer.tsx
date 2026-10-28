import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#F9FAFB" }} className="hidden text-gray-900 sm:block">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" aria-label="Beauticuty home" className="inline-flex items-center gap-3">
            <Image
              src="/zymowine-logo.png"
              alt="Beauticuty"
              width={551}
              height={551}
              className="h-20 w-20 object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
            <span
              className="font-serif text-2xl font-medium leading-none tracking-[0.06em] text-gray-900"
              style={{ fontVariantCaps: "small-caps" }}
            >
              Beauticuty
            </span>
          </Link>
          <p className="mt-5 text-sm text-gray-700">© 2026 Beauticuty. All rights reserved.</p>
          <p className="mt-2 text-sm text-gray-600">Powered by CoreCraft Technologies</p>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold text-gray-900">Quick Links</p>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <Link href="/shop" className="transition hover:text-gray-900">All Products</Link>
            </li>
            <li>
              <Link href="/shop/makeup" className="transition hover:text-gray-900">Make Up</Link>
            </li>
            <li>
              <Link href="/shop/skin-care" className="transition hover:text-gray-900">Skin Care</Link>
            </li>
            <li>
              <Link href="/shop/hair-care" className="transition hover:text-gray-900">Hair Care</Link>
            </li>
            <li>
              <Link href="/gift-card" className="transition hover:text-gray-900">Gift Card</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold text-gray-900">Social</p>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <a href="#" className="transition hover:text-gray-900">Facebook</a>
            </li>
            <li>
              <a href="#" className="transition hover:text-gray-900">Instagram</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold text-gray-900">Contact</p>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>Durbar Marg, Kathmandu</li>
            <li>
              <a href="mailto:service@zymowine.com" className="transition hover:text-gray-900">
                service@zymowine.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
